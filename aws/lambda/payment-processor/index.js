/**
 * Payment Processor Lambda Function
 * Handles Stripe payment processing with AWS integration
 * Created by: Nyasha Bivins | Powered by: Helo IM AI Inc.
 */

const AWS = require('aws-sdk');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Initialize AWS services
const dynamodb = new AWS.DynamoDB.DocumentClient();
const cognito = new AWS.CognitoIdentityServiceProvider();

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type,Authorization,X-Amz-Date,X-Api-Key,X-Amz-Security-Token',
  'Access-Control-Allow-Methods': 'POST,OPTIONS'
};

/**
 * Main Lambda handler
 */
exports.handler = async (event) => {
  console.log('Payment processing request:', JSON.stringify(event, null, 2));

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ message: 'CORS preflight successful' })
    };
  }

  try {
    const requestBody = JSON.parse(event.body);
    const { 
      paymentMethod,
      customerInfo,
      planType,
      amount,
      currency = 'usd'
    } = requestBody;

    // Validate required fields
    if (!paymentMethod || !customerInfo || !planType || !amount) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({
          success: false,
          error: 'Missing required payment information'
        })
      };
    }

    // Create or retrieve Stripe customer
    const customer = await createOrGetStripeCustomer(customerInfo);
    
    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: currency,
      customer: customer.id,
      payment_method: paymentMethod.id,
      confirmation_method: 'manual',
      confirm: true,
      metadata: {
        plan_type: planType,
        customer_email: customerInfo.email,
        platform: 'homes2show'
      }
    });

    // Handle payment result
    if (paymentIntent.status === 'succeeded') {
      // Create subscription record in DynamoDB
      await createSubscriptionRecord({
        customerId: customer.id,
        customerInfo,
        planType,
        amount,
        paymentIntentId: paymentIntent.id
      });

      // Create or update Cognito user
      await createCognitoUser(customerInfo, planType);

      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify({
          success: true,
          paymentIntent: {
            id: paymentIntent.id,
            status: paymentIntent.status
          },
          customer: {
            id: customer.id,
            email: customer.email
          },
          subscription: {
            plan: planType,
            amount: amount,
            status: 'active'
          }
        })
      };
    } else {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({
          success: false,
          error: 'Payment failed',
          paymentIntent: {
            id: paymentIntent.id,
            status: paymentIntent.status
          }
        })
      };
    }

  } catch (error) {
    console.error('Payment processing error:', error);
    
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({
        success: false,
        error: 'Payment processing failed',
        details: error.message
      })
    };
  }
};

/**
 * Create or get existing Stripe customer
 */
async function createOrGetStripeCustomer(customerInfo) {
  try {
    // Check if customer already exists
    const existingCustomers = await stripe.customers.list({
      email: customerInfo.email,
      limit: 1
    });

    if (existingCustomers.data.length > 0) {
      return existingCustomers.data[0];
    }

    // Create new customer
    const customer = await stripe.customers.create({
      email: customerInfo.email,
      name: `${customerInfo.firstName} ${customerInfo.lastName}`,
      phone: customerInfo.phone,
      metadata: {
        platform: 'homes2show',
        agent_license: customerInfo.agentLicense || '',
        brokerage: customerInfo.brokerage || ''
      }
    });

    return customer;
  } catch (error) {
    console.error('Error creating/getting Stripe customer:', error);
    throw error;
  }
}

/**
 * Create subscription record in DynamoDB
 */
async function createSubscriptionRecord(subscriptionData) {
  const params = {
    TableName: process.env.SUBSCRIPTIONS_TABLE || 'homes2show-subscriptions-prod',
    Item: {
      subscription_id: `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      customer_id: subscriptionData.customerId,
      email: subscriptionData.customerInfo.email,
      first_name: subscriptionData.customerInfo.firstName,
      last_name: subscriptionData.customerInfo.lastName,
      phone: subscriptionData.customerInfo.phone,
      plan_type: subscriptionData.planType,
      amount: subscriptionData.amount,
      currency: 'usd',
      status: 'active',
      payment_intent_id: subscriptionData.paymentIntentId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      billing_cycle: 'monthly',
      next_billing_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
      agent_license: subscriptionData.customerInfo.agentLicense || '',
      brokerage: subscriptionData.customerInfo.brokerage || ''
    }
  };

  try {
    await dynamodb.put(params).promise();
    console.log('Subscription record created successfully');
  } catch (error) {
    console.error('Error creating subscription record:', error);
    throw error;
  }
}

/**
 * Create or update Cognito user
 */
async function createCognitoUser(customerInfo, planType) {
  const userPoolId = process.env.COGNITO_USER_POOL_ID;
  
  if (!userPoolId) {
    console.log('No Cognito User Pool ID provided, skipping user creation');
    return;
  }

  const params = {
    UserPoolId: userPoolId,
    Username: customerInfo.email,
    UserAttributes: [
      {
        Name: 'email',
        Value: customerInfo.email
      },
      {
        Name: 'given_name',
        Value: customerInfo.firstName
      },
      {
        Name: 'family_name',
        Value: customerInfo.lastName
      },
      {
        Name: 'phone_number',
        Value: customerInfo.phone
      },
      {
        Name: 'custom:plan_type',
        Value: planType
      },
      {
        Name: 'custom:agent_license',
        Value: customerInfo.agentLicense || ''
      },
      {
        Name: 'custom:brokerage',
        Value: customerInfo.brokerage || ''
      }
    ],
    TemporaryPassword: generateTemporaryPassword(),
    MessageAction: 'SUPPRESS' // Don't send welcome email, we'll handle this
  };

  try {
    await cognito.adminCreateUser(params).promise();
    console.log('Cognito user created successfully');
  } catch (error) {
    if (error.code === 'UsernameExistsException') {
      // User already exists, update their attributes
      const updateParams = {
        UserPoolId: userPoolId,
        Username: customerInfo.email,
        UserAttributes: [
          {
            Name: 'custom:plan_type',
            Value: planType
          }
        ]
      };
      
      await cognito.adminUpdateUserAttributes(updateParams).promise();
      console.log('Cognito user updated successfully');
    } else {
      console.error('Error creating/updating Cognito user:', error);
      throw error;
    }
  }
}

/**
 * Generate temporary password for Cognito user
 */
function generateTemporaryPassword() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let password = '';
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}
