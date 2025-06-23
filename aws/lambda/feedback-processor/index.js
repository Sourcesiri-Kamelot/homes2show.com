/**
 * AI Feedback Processor Lambda Function
 * Homes2Show - Revolutionary Real Estate Platform
 * 
 * Created by: Nyasha Bivins
 * Powered by: Helo IM AI Inc. | https://www.helo-im.ai
 */

const AWS = require('aws-sdk');
const { OpenAI } = require('openai');

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

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Environment variables
const FEEDBACK_TABLE = process.env.FEEDBACK_DATA_TABLE;
const USERS_TABLE = process.env.USERS_TABLE;
const ENVIRONMENT = process.env.ENVIRONMENT || 'prod';

/**
 * Main Lambda handler
 */
exports.handler = async (event, context) => {
  const startTime = Date.now();
  
  try {
    console.log('AI Feedback Processor - Request received');
    
    const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
    const { feedbackText, userId, requestId, propertyAddress, clientName } = body;
    
    if (!feedbackText || !userId) {
      return createResponse(400, { error: 'Missing required fields: feedbackText and userId' });
    }
    
    // Generate unique feedback ID
    const feedbackId = `feedback_${userId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Process with AI
    const aiAnalysis = await processWithAI(feedbackText, propertyAddress, clientName);
    
    // Store feedback
    await storeFeedback({
      feedbackId, userId, requestId, feedbackText, aiAnalysis, 
      propertyAddress, clientName
    });
    
    // Update user analytics
    await updateUserAnalytics(userId, aiAnalysis);
    
    // Send metrics
    await sendPerformanceMetrics('FeedbackProcessor', Date.now() - startTime);
    
    return createResponse(200, {
      success: true,
      data: { feedbackId, analysis: aiAnalysis },
      metadata: { requestId: context.awsRequestId, timestamp: new Date().toISOString() }
    });
    
  } catch (error) {
    console.error('AI Feedback Processor - Error:', error);
    await sendErrorMetrics('FeedbackProcessor', error.message);
    
    return createResponse(500, {
      error: 'Internal server error',
      requestId: context.awsRequestId
    });
  }
};

/**
 * Process feedback with AI
 */
async function processWithAI(feedbackText, propertyAddress, clientName) {
  const prompt = `
Analyze this real estate showing feedback and provide insights in JSON format:

Feedback: "${feedbackText}"
Property: ${propertyAddress || 'Not specified'}
Client: ${clientName || 'Anonymous'}

Provide analysis in this JSON structure:
{
  "sentiment": { "overall": "positive|neutral|negative", "score": -1_to_1, "confidence": 0_to_100 },
  "insights": { "likes": [], "dislikes": [], "concerns": [], "suggestions": [] },
  "actionItems": { "immediate": [], "followUp": [], "improvements": [] },
  "riskLevel": "low|medium|high",
  "summary": "brief executive summary",
  "tags": ["relevant", "tags"],
  "confidence": 0_to_100
}
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        { role: "system", content: "You are an expert real estate feedback analyst. Provide comprehensive, actionable insights." },
        { role: "user", content: prompt }
      ],
      temperature: 0.3,
      max_tokens: 1500
    });
    
    let analysis;
    try {
      analysis = JSON.parse(completion.choices[0].message.content);
    } catch (parseError) {
      analysis = createFallbackAnalysis(feedbackText);
    }
    
    analysis.processingMetadata = {
      aiModel: "gpt-4-turbo-preview",
      processedAt: new Date().toISOString(),
      version: "1.0"
    };
    
    return analysis;
    
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return createFallbackAnalysis(feedbackText);
  }
}

/**
 * Fallback analysis when AI fails
 */
function createFallbackAnalysis(feedbackText) {
  const positiveWords = ['good', 'great', 'excellent', 'love', 'like', 'amazing', 'perfect'];
  const negativeWords = ['bad', 'terrible', 'hate', 'dislike', 'awful', 'horrible'];
  
  const text = feedbackText.toLowerCase();
  const positiveCount = positiveWords.filter(word => text.includes(word)).length;
  const negativeCount = negativeWords.filter(word => text.includes(word)).length;
  
  let sentiment = 'neutral';
  let sentimentScore = 0;
  
  if (positiveCount > negativeCount) {
    sentiment = 'positive';
    sentimentScore = Math.min(0.8, positiveCount * 0.2);
  } else if (negativeCount > positiveCount) {
    sentiment = 'negative';
    sentimentScore = Math.max(-0.8, negativeCount * -0.2);
  }
  
  return {
    sentiment: { overall: sentiment, score: sentimentScore, confidence: 60 },
    insights: { likes: ["Analysis limited"], dislikes: ["Analysis limited"], concerns: ["Manual review needed"], suggestions: ["Contact client"] },
    actionItems: { immediate: ["Review manually"], followUp: ["Contact client"], improvements: ["Implement AI redundancy"] },
    riskLevel: "medium",
    summary: "AI analysis temporarily unavailable. Manual review recommended.",
    tags: ["fallback-analysis", "manual-review-needed"],
    confidence: 60,
    processingMetadata: { aiModel: "fallback", processedAt: new Date().toISOString(), version: "1.0-fallback" }
  };
}

/**
 * Store feedback in DynamoDB
 */
async function storeFeedback(data) {
  try {
    const timestamp = new Date().toISOString();
    
    await dynamodb.put({
      TableName: FEEDBACK_TABLE,
      Item: {
        feedbackId: data.feedbackId,
        userId: data.userId,
        requestId: data.requestId,
        createdAt: timestamp,
        feedbackText: data.feedbackText,
        aiAnalysis: data.aiAnalysis,
        propertyAddress: data.propertyAddress,
        clientName: data.clientName,
        status: 'processed'
      }
    }).promise();
    
  } catch (error) {
    console.error('Error storing feedback:', error);
    throw error;
  }
}

/**
 * Update user analytics
 */
async function updateUserAnalytics(userId, analysis) {
  try {
    const timestamp = new Date().toISOString();
    
    await dynamodb.update({
      TableName: USERS_TABLE,
      Key: { userId },
      UpdateExpression: 'ADD feedbackCount :inc SET lastFeedbackAt = :timestamp, lastSentiment = :sentiment',
      ExpressionAttributeValues: {
        ':inc': 1,
        ':timestamp': timestamp,
        ':sentiment': analysis.sentiment.overall
      }
    }).promise();
    
  } catch (error) {
    console.error('Error updating user analytics:', error);
  }
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
      'Access-Control-Allow-Methods': 'POST,OPTIONS',
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
