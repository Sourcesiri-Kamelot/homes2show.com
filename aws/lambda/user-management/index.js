/**
 * User Management Lambda Function
 * Homes2Show - Revolutionary Real Estate Platform
 * 
 * Created by: Nyasha Bivins
 * Powered by: Helo IM AI Inc. | https://www.helo-im.ai
 */

const AWS = require('aws-sdk');

// Initialize AWS services
let dynamodb, cloudwatch;
if (process.env.NODE_ENV !== 'test') {
  const AWSXRay = require('aws-xray-sdk-core');
  dynamodb = AWSXRay.captureAWSClient(new AWS.DynamoDB.DocumentClient());
  cloudwatch = AWSXRay.captureAWSClient(new AWS.CloudWatch());
} else {
  dynamodb = new AWS.DynamoDB.DocumentClient();
  cloudwatch = new AWS.CloudWatch();
}

const USERS_TABLE = process.env.USERS_TABLE;

/**
 * Main Lambda handler
 */
exports.handler = async (event, context) => {
  const startTime = Date.now();
  
  try {
    const { httpMethod, pathParameters, body } = event;
    const userId = pathParameters?.userId;
    
    let result;
    
    switch (httpMethod) {
      case 'GET':
        result = userId ? await getUser(userId) : await listUsers();
        break;
      case 'POST':
        result = await createUser(JSON.parse(body));
        break;
      case 'PUT':
        result = await updateUser(userId, JSON.parse(body));
        break;
      case 'DELETE':
        result = await deleteUser(userId);
        break;
      default:
        return createResponse(405, { error: 'Method not allowed' });
    }
    
    await sendPerformanceMetrics('UserManagement', Date.now() - startTime);
    
    return createResponse(200, {
      success: true,
      data: result,
      metadata: { requestId: context.awsRequestId, timestamp: new Date().toISOString() }
    });
    
  } catch (error) {
    console.error('User Management - Error:', error);
    await sendErrorMetrics('UserManagement', error.message);
    
    return createResponse(500, {
      error: 'Internal server error',
      requestId: context.awsRequestId
    });
  }
};

/**
 * Get user by ID
 */
async function getUser(userId) {
  const result = await dynamodb.get({
    TableName: USERS_TABLE,
    Key: { userId }
  }).promise();
  
  if (!result.Item) {
    throw new Error('User not found');
  }
  
  return result.Item;
}

/**
 * List users (with pagination)
 */
async function listUsers() {
  const result = await dynamodb.scan({
    TableName: USERS_TABLE,
    Limit: 50
  }).promise();
  
  return {
    users: result.Items,
    count: result.Count
  };
}

/**
 * Create new user
 */
async function createUser(userData) {
  const timestamp = new Date().toISOString();
  const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  const user = {
    userId,
    email: userData.email,
    name: userData.name,
    role: userData.role || 'agent',
    createdAt: timestamp,
    updatedAt: timestamp,
    status: 'active',
    analytics: {
      totalFeedback: 0,
      averageSentiment: 0,
      riskLevel: 'low'
    }
  };
  
  await dynamodb.put({
    TableName: USERS_TABLE,
    Item: user,
    ConditionExpression: 'attribute_not_exists(userId)'
  }).promise();
  
  return user;
}

/**
 * Update user
 */
async function updateUser(userId, updates) {
  const timestamp = new Date().toISOString();
  
  const updateExpression = [];
  const expressionAttributeValues = { ':timestamp': timestamp };
  const expressionAttributeNames = {};
  
  Object.keys(updates).forEach(key => {
    if (key !== 'userId' && key !== 'createdAt') {
      updateExpression.push(`#${key} = :${key}`);
      expressionAttributeNames[`#${key}`] = key;
      expressionAttributeValues[`:${key}`] = updates[key];
    }
  });
  
  updateExpression.push('#updatedAt = :timestamp');
  expressionAttributeNames['#updatedAt'] = 'updatedAt';
  
  await dynamodb.update({
    TableName: USERS_TABLE,
    Key: { userId },
    UpdateExpression: `SET ${updateExpression.join(', ')}`,
    ExpressionAttributeNames: expressionAttributeNames,
    ExpressionAttributeValues: expressionAttributeValues
  }).promise();
  
  return { userId, ...updates, updatedAt: timestamp };
}

/**
 * Delete user
 */
async function deleteUser(userId) {
  await dynamodb.delete({
    TableName: USERS_TABLE,
    Key: { userId }
  }).promise();
  
  return { userId, deleted: true };
}

/**
 * Utility functions
 */
function createResponse(statusCode, body) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type,Authorization',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
      'X-Powered-By': 'Helo IM AI Inc',
      'X-Created-By': 'Nyasha Bivins'
    },
    body: JSON.stringify(body)
  };
}

async function sendPerformanceMetrics(functionName, duration) {
  try {
    await cloudwatch.putMetricData({
      Namespace: 'Homes2Show/Lambda',
      MetricData: [{
        MetricName: `${functionName}Duration`,
        Value: duration,
        Unit: 'Milliseconds'
      }]
    }).promise();
  } catch (error) {
    console.error('Error sending metrics:', error);
  }
}

async function sendErrorMetrics(functionName, errorMessage) {
  try {
    await cloudwatch.putMetricData({
      Namespace: 'Homes2Show/Lambda',
      MetricData: [{
        MetricName: `${functionName}Errors`,
        Value: 1,
        Unit: 'Count'
      }]
    }).promise();
  } catch (error) {
    console.error('Error sending error metrics:', error);
  }
}
