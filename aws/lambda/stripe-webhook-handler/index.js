/**
 * Stripe Webhook Handler Lambda Function
 * Processes Stripe events for Homes2Show platform
 * Handles payment confirmations, transfers, and account updates
 */

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const AWS = require('aws-sdk');

// Initialize AWS services
const dynamodb = new AWS.DynamoDB.DocumentClient();
const ses = new AWS.SES();
const cloudwatch = new AWS.CloudWatch();

// Environment variables
const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;
const PAYMENTS_TABLE = process.env.DYNAMODB_PAYMENTS_TABLE || 'homes2show-payments';
const AGENTS_TABLE = process.env.DYNAMODB_AGENTS_TABLE || 'homes2show-agent-accounts';
const FROM_EMAIL = process.env.SES_FROM_EMAIL || 'noreply@homes2show.com';

/**
 * Main Lambda handler
 */
exports.handler = async (event, context) => {
    const startTime = Date.now();
    
    try {
        console.log('Webhook handler - Event received');
        
        // Verify webhook signature
        const sig = event.headers['stripe-signature'] || event.headers['Stripe-Signature'];
        if (!sig) {
            throw new Error('Missing Stripe signature');
        }
        
        let stripeEvent;
        try {
            stripeEvent = stripe.webhooks.constructEvent(event.body, sig, WEBHOOK_SECRET);
        } catch (err) {
            console.error('Webhook signature verification failed:', err.message);
            return {
                statusCode: 400,
                body: `Webhook Error: ${err.message}`
            };
        }
        
        console.log('Processing event:', stripeEvent.type);
        
        // Process the event
        await processStripeEvent(stripeEvent);
        
        // Log success metric
        await logMetric('WebhookProcessed', 1);
        await logMetric('WebhookResponseTime', Date.now() - startTime);
        
        return {
            statusCode: 200,
            body: JSON.stringify({ received: true })
        };
        
    } catch (error) {
        console.error('Webhook processing error:', error);
        
        // Log error metric
        await logMetric('WebhookErrors', 1);
        
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};

/**
 * Process different types of Stripe events
 */
async function processStripeEvent(event) {
    switch (event.type) {
        case 'payment_intent.succeeded':
            await handlePaymentSuccess(event.data.object);
            break;
            
        case 'payment_intent.payment_failed':
            await handlePaymentFailure(event.data.object);
            break;
            
        case 'transfer.created':
            await handleTransferCreated(event.data.object);
            break;
            
        case 'transfer.paid':
            await handleTransferPaid(event.data.object);
            break;
            
        case 'account.updated':
            await handleAccountUpdated(event.data.object);
            break;
            
        case 'invoice.payment_succeeded':
            await handleSubscriptionPayment(event.data.object);
            break;
            
        case 'customer.subscription.created':
        case 'customer.subscription.updated':
            await handleSubscriptionUpdate(event.data.object);
            break;
            
        default:
            console.log(`Unhandled event type: ${event.type}`);
    }
}

/**
 * Handle successful payment
 */
async function handlePaymentSuccess(paymentIntent) {
    console.log('Processing payment success:', paymentIntent.id);
    
    try {
        // Update payment status in DynamoDB
        await dynamodb.update({
            TableName: PAYMENTS_TABLE,
            Key: { paymentId: paymentIntent.id },
            UpdateExpression: 'SET #status = :status, updatedAt = :updatedAt, stripeStatus = :stripeStatus',
            ExpressionAttributeNames: { '#status': 'status' },
            ExpressionAttributeValues: {
                ':status': 'completed',
                ':updatedAt': new Date().toISOString(),
                ':stripeStatus': paymentIntent.status
            }
        }).promise();
        
        // Get payment details for email
        const paymentRecord = await dynamodb.get({
            TableName: PAYMENTS_TABLE,
            Key: { paymentId: paymentIntent.id }
        }).promise();
        
        if (paymentRecord.Item) {
            // Send confirmation email to initiating agent
            if (paymentRecord.Item.initiatingAgentEmail) {
                await sendPaymentConfirmationEmail(paymentRecord.Item);
            }
            
            // If it's a showing payment, notify the showing agent
            if (paymentRecord.Item.type === 'showing' && paymentRecord.Item.showingAgentId) {
                await notifyShowingAgent(paymentRecord.Item);
            }
        }
        
        // Log revenue metric
        await logMetric('Revenue', paymentRecord.Item?.platformFee || 0, 'None');
        
    } catch (error) {
        console.error('Error handling payment success:', error);
        throw error;
    }
}

/**
 * Handle payment failure
 */
async function handlePaymentFailure(paymentIntent) {
    console.log('Processing payment failure:', paymentIntent.id);
    
    try {
        // Update payment status
        await dynamodb.update({
            TableName: PAYMENTS_TABLE,
            Key: { paymentId: paymentIntent.id },
            UpdateExpression: 'SET #status = :status, updatedAt = :updatedAt, stripeStatus = :stripeStatus, failureReason = :reason',
            ExpressionAttributeNames: { '#status': 'status' },
            ExpressionAttributeValues: {
                ':status': 'failed',
                ':updatedAt': new Date().toISOString(),
                ':stripeStatus': paymentIntent.status,
                ':reason': paymentIntent.last_payment_error?.message || 'Unknown error'
            }
        }).promise();
        
        // Send failure notification email
        const paymentRecord = await dynamodb.get({
            TableName: PAYMENTS_TABLE,
            Key: { paymentId: paymentIntent.id }
        }).promise();
        
        if (paymentRecord.Item?.initiatingAgentEmail) {
            await sendPaymentFailureEmail(paymentRecord.Item);
        }
        
    } catch (error) {
        console.error('Error handling payment failure:', error);
        throw error;
    }
}

/**
 * Handle transfer created (money sent to showing agent)
 */
async function handleTransferCreated(transfer) {
    console.log('Processing transfer created:', transfer.id);
    
    try {
        // Find the related payment
        const paymentId = transfer.source_transaction;
        
        await dynamodb.update({
            TableName: PAYMENTS_TABLE,
            Key: { paymentId: paymentId },
            UpdateExpression: 'SET transferId = :transferId, transferStatus = :status, updatedAt = :updatedAt',
            ExpressionAttributeValues: {
                ':transferId': transfer.id,
                ':status': 'pending',
                ':updatedAt': new Date().toISOString()
            }
        }).promise();
        
    } catch (error) {
        console.error('Error handling transfer created:', error);
    }
}

/**
 * Handle transfer paid (showing agent received money)
 */
async function handleTransferPaid(transfer) {
    console.log('Processing transfer paid:', transfer.id);
    
    try {
        // Update transfer status
        const result = await dynamodb.scan({
            TableName: PAYMENTS_TABLE,
            FilterExpression: 'transferId = :transferId',
            ExpressionAttributeValues: {
                ':transferId': transfer.id
            }
        }).promise();
        
        if (result.Items.length > 0) {
            const payment = result.Items[0];
            
            await dynamodb.update({
                TableName: PAYMENTS_TABLE,
                Key: { paymentId: payment.paymentId },
                UpdateExpression: 'SET transferStatus = :status, paidAt = :paidAt, updatedAt = :updatedAt',
                ExpressionAttributeValues: {
                    ':status': 'paid',
                    ':paidAt': new Date().toISOString(),
                    ':updatedAt': new Date().toISOString()
                }
            }).promise();
            
            // Notify showing agent of payment
            await sendAgentPaymentNotification(payment, transfer);
        }
        
    } catch (error) {
        console.error('Error handling transfer paid:', error);
    }
}

/**
 * Handle account updates (showing agent onboarding)
 */
async function handleAccountUpdated(account) {
    console.log('Processing account updated:', account.id);
    
    try {
        // Update agent account status
        await dynamodb.update({
            TableName: AGENTS_TABLE,
            Key: { stripeAccountId: account.id },
            UpdateExpression: 'SET #status = :status, updatedAt = :updatedAt, chargesEnabled = :chargesEnabled, payoutsEnabled = :payoutsEnabled',
            ExpressionAttributeNames: { '#status': 'status' },
            ExpressionAttributeValues: {
                ':status': account.charges_enabled && account.payouts_enabled ? 'active' : 'pending',
                ':updatedAt': new Date().toISOString(),
                ':chargesEnabled': account.charges_enabled,
                ':payoutsEnabled': account.payouts_enabled
            }
        }).promise();
        
    } catch (error) {
        console.error('Error handling account update:', error);
    }
}

/**
 * Handle subscription payment success
 */
async function handleSubscriptionPayment(invoice) {
    console.log('Processing subscription payment:', invoice.id);
    
    try {
        const subscription = await stripe.subscriptions.retrieve(invoice.subscription);
        
        // Update subscription status
        await dynamodb.update({
            TableName: PAYMENTS_TABLE,
            Key: { paymentId: subscription.id },
            UpdateExpression: 'SET #status = :status, updatedAt = :updatedAt, lastPayment = :lastPayment',
            ExpressionAttributeNames: { '#status': 'status' },
            ExpressionAttributeValues: {
                ':status': 'active',
                ':updatedAt': new Date().toISOString(),
                ':lastPayment': new Date().toISOString()
            }
        }).promise();
        
        // Send Pro activation email
        const paymentRecord = await dynamodb.get({
            TableName: PAYMENTS_TABLE,
            Key: { paymentId: subscription.id }
        }).promise();
        
        if (paymentRecord.Item) {
            await sendProActivationEmail(paymentRecord.Item);
        }
        
    } catch (error) {
        console.error('Error handling subscription payment:', error);
    }
}

/**
 * Handle subscription updates
 */
async function handleSubscriptionUpdate(subscription) {
    console.log('Processing subscription update:', subscription.id);
    
    try {
        await dynamodb.update({
            TableName: PAYMENTS_TABLE,
            Key: { paymentId: subscription.id },
            UpdateExpression: 'SET subscriptionStatus = :status, updatedAt = :updatedAt',
            ExpressionAttributeValues: {
                ':status': subscription.status,
                ':updatedAt': new Date().toISOString()
            }
        }).promise();
        
    } catch (error) {
        console.error('Error handling subscription update:', error);
    }
}

/**
 * Send payment confirmation email
 */
async function sendPaymentConfirmationEmail(payment) {
    const emailParams = {
        Source: FROM_EMAIL,
        Destination: {
            ToAddresses: [payment.initiatingAgentEmail]
        },
        Message: {
            Subject: {
                Data: 'Payment Confirmed - Homes2Show'
            },
            Body: {
                Html: {
                    Data: `
                        <h2>Payment Confirmed</h2>
                        <p>Your showing payment has been processed successfully.</p>
                        <ul>
                            <li><strong>Amount:</strong> $${payment.amount}</li>
                            <li><strong>Showing ID:</strong> ${payment.showingId}</li>
                            <li><strong>Date:</strong> ${new Date().toLocaleDateString()}</li>
                        </ul>
                        <p>The showing agent will receive their payment within 24 hours.</p>
                        <p>Thank you for using Homes2Show!</p>
                    `
                }
            }
        }
    };
    
    try {
        await ses.sendEmail(emailParams).promise();
        console.log('Payment confirmation email sent');
    } catch (error) {
        console.error('Error sending confirmation email:', error);
    }
}

/**
 * Send payment failure email
 */
async function sendPaymentFailureEmail(payment) {
    const emailParams = {
        Source: FROM_EMAIL,
        Destination: {
            ToAddresses: [payment.initiatingAgentEmail]
        },
        Message: {
            Subject: {
                Data: 'Payment Failed - Homes2Show'
            },
            Body: {
                Html: {
                    Data: `
                        <h2>Payment Failed</h2>
                        <p>Unfortunately, your payment could not be processed.</p>
                        <ul>
                            <li><strong>Amount:</strong> $${payment.amount}</li>
                            <li><strong>Showing ID:</strong> ${payment.showingId}</li>
                            <li><strong>Reason:</strong> ${payment.failureReason}</li>
                        </ul>
                        <p>Please try again or contact support for assistance.</p>
                    `
                }
            }
        }
    };
    
    try {
        await ses.sendEmail(emailParams).promise();
        console.log('Payment failure email sent');
    } catch (error) {
        console.error('Error sending failure email:', error);
    }
}

/**
 * Send Pro activation email
 */
async function sendProActivationEmail(subscription) {
    const emailParams = {
        Source: FROM_EMAIL,
        Destination: {
            ToAddresses: [subscription.agentEmail]
        },
        Message: {
            Subject: {
                Data: 'Welcome to Homes2Show Pro!'
            },
            Body: {
                Html: {
                    Data: `
                        <h2>Welcome to Homes2Show Pro!</h2>
                        <p>Your Pro subscription is now active. You now have access to:</p>
                        <ul>
                            <li>$2 off every showing</li>
                            <li>Next-day expedited payouts</li>
                            <li>Priority agent matching</li>
                            <li>Advanced analytics dashboard</li>
                            <li>And much more!</li>
                        </ul>
                        <p>Start saving money on your next showing!</p>
                        <p><a href="https://homes2show.com/dashboard">Go to Dashboard</a></p>
                    `
                }
            }
        }
    };
    
    try {
        await ses.sendEmail(emailParams).promise();
        console.log('Pro activation email sent');
    } catch (error) {
        console.error('Error sending Pro activation email:', error);
    }
}

/**
 * Notify showing agent of payment
 */
async function notifyShowingAgent(payment) {
    // Get agent email from agents table
    const agentResult = await dynamodb.get({
        TableName: AGENTS_TABLE,
        Key: { agentId: payment.showingAgentId }
    }).promise();
    
    if (agentResult.Item?.email) {
        const emailParams = {
            Source: FROM_EMAIL,
            Destination: {
                ToAddresses: [agentResult.Item.email]
            },
            Message: {
                Subject: {
                    Data: 'Showing Payment Received - Homes2Show'
                },
                Body: {
                    Html: {
                        Data: `
                            <h2>Showing Payment Received</h2>
                            <p>A payment has been received for your showing service.</p>
                            <ul>
                                <li><strong>Your Earnings:</strong> $${payment.agentEarnings}</li>
                                <li><strong>Showing ID:</strong> ${payment.showingId}</li>
                                <li><strong>Payout:</strong> Within 24 hours</li>
                            </ul>
                            <p>Thank you for providing excellent service!</p>
                        `
                    }
                }
            }
        };
        
        try {
            await ses.sendEmail(emailParams).promise();
            console.log('Showing agent notification sent');
        } catch (error) {
            console.error('Error sending agent notification:', error);
        }
    }
}

/**
 * Send agent payment notification
 */
async function sendAgentPaymentNotification(payment, transfer) {
    const agentResult = await dynamodb.get({
        TableName: AGENTS_TABLE,
        Key: { agentId: payment.showingAgentId }
    }).promise();
    
    if (agentResult.Item?.email) {
        const emailParams = {
            Source: FROM_EMAIL,
            Destination: {
                ToAddresses: [agentResult.Item.email]
            },
            Message: {
                Subject: {
                    Data: 'Payment Sent - Homes2Show'
                },
                Body: {
                    Html: {
                        Data: `
                            <h2>Payment Sent to Your Account</h2>
                            <p>Your showing payment has been transferred to your bank account.</p>
                            <ul>
                                <li><strong>Amount:</strong> $${payment.agentEarnings}</li>
                                <li><strong>Transfer ID:</strong> ${transfer.id}</li>
                                <li><strong>Date:</strong> ${new Date().toLocaleDateString()}</li>
                            </ul>
                            <p>It may take 1-2 business days to appear in your account.</p>
                        `
                    }
                }
            }
        };
        
        try {
            await ses.sendEmail(emailParams).promise();
            console.log('Agent payment notification sent');
        } catch (error) {
            console.error('Error sending payment notification:', error);
        }
    }
}

/**
 * Log CloudWatch metric
 */
async function logMetric(metricName, value, unit = 'Count') {
    try {
        await cloudwatch.putMetricData({
            Namespace: 'Homes2Show/Webhooks',
            MetricData: [{
                MetricName: metricName,
                Value: value,
                Unit: unit,
                Timestamp: new Date()
            }]
        }).promise();
    } catch (error) {
        console.error('Error logging metric:', error);
    }
}
