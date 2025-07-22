/**
 * Stripe Payment Processor Lambda Function
 * Handles showing payments and subscriptions for Homes2Show
 * Integrates with AWS services for complete payment flow
 */

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const AWS = require('aws-sdk');

// Initialize AWS services
const dynamodb = new AWS.DynamoDB.DocumentClient();
const ses = new AWS.SES();
const cloudwatch = new AWS.CloudWatch();

// Environment variables
const PAYMENTS_TABLE = process.env.DYNAMODB_PAYMENTS_TABLE || 'homes2show-payments';
const AGENTS_TABLE = process.env.DYNAMODB_AGENTS_TABLE || 'homes2show-agent-accounts';
const FROM_EMAIL = process.env.SES_FROM_EMAIL || 'noreply@homes2show.com';

/**
 * Main Lambda handler
 */
exports.handler = async (event, context) => {
    const startTime = Date.now();
    
    try {
        console.log('Payment processor - Request received:', JSON.stringify(event, null, 2));
        
        // Parse request
        const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
        const { action } = body;
        
        let result;
        
        switch (action) {
            case 'create_payment_intent':
                result = await createPaymentIntent(body);
                break;
            case 'create_subscription':
                result = await createSubscription(body);
                break;
            case 'onboard_agent':
                result = await onboardAgent(body);
                break;
            case 'get_payment_status':
                result = await getPaymentStatus(body);
                break;
            default:
                throw new Error(`Unknown action: ${action}`);
        }
        
        // Log success metric
        await logMetric('SuccessfulRequests', 1);
        await logMetric('ResponseTime', Date.now() - startTime);
        
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                success: true,
                data: result
            })
        };
        
    } catch (error) {
        console.error('Payment processor error:', error);
        
        // Log error metric
        await logMetric('Errors', 1);
        
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                success: false,
                error: error.message
            })
        };
    }
};

/**
 * Create payment intent for showing
 */
async function createPaymentIntent(data) {
    const { 
        amount, 
        showingAgentId, 
        showingId, 
        initiatingAgentEmail,
        description = 'Home showing service'
    } = data;
    
    // Validate required fields
    if (!amount || !showingAgentId || !showingId) {
        throw new Error('Missing required fields: amount, showingAgentId, showingId');
    }
    
    // Get showing agent's Stripe account
    const agentAccount = await getAgentStripeAccount(showingAgentId);
    if (!agentAccount) {
        throw new Error('Showing agent not found or not onboarded');
    }
    
    // Calculate platform fee (30% like Showami)
    const platformFee = Math.round(amount * 0.30 * 100); // Convert to cents
    const amountCents = Math.round(amount * 100);
    
    // Create payment intent with application fee
    const paymentIntent = await stripe.paymentIntents.create({
        amount: amountCents,
        currency: 'usd',
        application_fee_amount: platformFee,
        transfer_data: {
            destination: agentAccount.stripeAccountId,
        },
        metadata: {
            showingId: showingId,
            showingAgentId: showingAgentId,
            platform: 'homes2show',
            type: 'showing_payment'
        },
        receipt_email: initiatingAgentEmail,
        description: description
    });
    
    // Store payment record in DynamoDB
    await dynamodb.put({
        TableName: PAYMENTS_TABLE,
        Item: {
            paymentId: paymentIntent.id,
            showingId: showingId,
            showingAgentId: showingAgentId,
            initiatingAgentEmail: initiatingAgentEmail,
            amount: amount,
            platformFee: platformFee / 100, // Convert back to dollars
            agentEarnings: (amountCents - platformFee) / 100,
            status: 'pending',
            type: 'showing',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
    }).promise();
    
    return {
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
        amount: amount,
        platformFee: platformFee / 100,
        agentEarnings: (amountCents - platformFee) / 100
    };
}

/**
 * Create subscription for Pro membership
 */
async function createSubscription(data) {
    const { 
        agentEmail, 
        agentId, 
        priceId = 'price_homes2show_pro_annual' // $45/year
    } = data;
    
    // Create or retrieve customer
    let customer;
    try {
        const customers = await stripe.customers.list({
            email: agentEmail,
            limit: 1
        });
        
        if (customers.data.length > 0) {
            customer = customers.data[0];
        } else {
            customer = await stripe.customers.create({
                email: agentEmail,
                metadata: {
                    agentId: agentId,
                    platform: 'homes2show'
                }
            });
        }
    } catch (error) {
        throw new Error(`Failed to create/retrieve customer: ${error.message}`);
    }
    
    // Create subscription
    const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ price: priceId }],
        payment_behavior: 'default_incomplete',
        expand: ['latest_invoice.payment_intent'],
        metadata: {
            agentId: agentId,
            platform: 'homes2show',
            type: 'pro_subscription'
        }
    });
    
    // Store subscription record
    await dynamodb.put({
        TableName: PAYMENTS_TABLE,
        Item: {
            paymentId: subscription.id,
            agentId: agentId,
            agentEmail: agentEmail,
            customerId: customer.id,
            amount: 45, // Pro subscription price
            status: 'pending',
            type: 'subscription',
            subscriptionId: subscription.id,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
    }).promise();
    
    return {
        subscriptionId: subscription.id,
        clientSecret: subscription.latest_invoice.payment_intent.client_secret,
        customerId: customer.id
    };
}

/**
 * Onboard showing agent with Stripe Connect
 */
async function onboardAgent(data) {
    const { 
        agentId, 
        email, 
        firstName, 
        lastName, 
        businessType = 'individual'
    } = data;
    
    // Check if agent already has Stripe account
    const existingAccount = await getAgentStripeAccount(agentId);
    if (existingAccount) {
        return {
            accountId: existingAccount.stripeAccountId,
            onboardingUrl: null,
            message: 'Agent already onboarded'
        };
    }
    
    // Create Stripe Express account
    const account = await stripe.accounts.create({
        type: 'express',
        country: 'US',
        email: email,
        capabilities: {
            card_payments: { requested: true },
            transfers: { requested: true }
        },
        business_type: businessType,
        individual: {
            first_name: firstName,
            last_name: lastName,
            email: email
        },
        metadata: {
            agentId: agentId,
            platform: 'homes2show'
        }
    });
    
    // Create account link for onboarding
    const accountLink = await stripe.accountLinks.create({
        account: account.id,
        refresh_url: `https://homes2show.com/agent/onboarding/refresh?account=${account.id}`,
        return_url: `https://homes2show.com/agent/onboarding/complete?account=${account.id}`,
        type: 'account_onboarding'
    });
    
    // Store agent account info
    await dynamodb.put({
        TableName: AGENTS_TABLE,
        Item: {
            agentId: agentId,
            stripeAccountId: account.id,
            email: email,
            firstName: firstName,
            lastName: lastName,
            status: 'onboarding',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
    }).promise();
    
    return {
        accountId: account.id,
        onboardingUrl: accountLink.url,
        message: 'Agent onboarding initiated'
    };
}

/**
 * Get payment status
 */
async function getPaymentStatus(data) {
    const { paymentId } = data;
    
    // Get from DynamoDB
    const result = await dynamodb.get({
        TableName: PAYMENTS_TABLE,
        Key: { paymentId: paymentId }
    }).promise();
    
    if (!result.Item) {
        throw new Error('Payment not found');
    }
    
    // Get latest status from Stripe
    let stripeStatus = 'unknown';
    try {
        if (result.Item.type === 'showing') {
            const paymentIntent = await stripe.paymentIntents.retrieve(paymentId);
            stripeStatus = paymentIntent.status;
        } else if (result.Item.type === 'subscription') {
            const subscription = await stripe.subscriptions.retrieve(paymentId);
            stripeStatus = subscription.status;
        }
    } catch (error) {
        console.error('Error retrieving Stripe status:', error);
    }
    
    return {
        ...result.Item,
        stripeStatus: stripeStatus
    };
}

/**
 * Get agent's Stripe account info
 */
async function getAgentStripeAccount(agentId) {
    try {
        const result = await dynamodb.get({
            TableName: AGENTS_TABLE,
            Key: { agentId: agentId }
        }).promise();
        
        return result.Item || null;
    } catch (error) {
        console.error('Error getting agent account:', error);
        return null;
    }
}

/**
 * Log CloudWatch metric
 */
async function logMetric(metricName, value, unit = 'Count') {
    try {
        await cloudwatch.putMetricData({
            Namespace: 'Homes2Show/Payments',
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
