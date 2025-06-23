/**
 * AI Pricing Assistant Lambda Function
 * Homes2Show - AI-Powered Real Estate Platform
 * 
 * Created by: Nyasha Bivins
 * Powered by: Helo IM AI Inc. | https://www.helo-im.ai
 * 
 * This function provides intelligent pricing suggestions for real estate showings
 * using OpenAI GPT-4 and market data analysis.
 */

const AWS = require('aws-sdk');
const { OpenAI } = require('openai');

// Initialize AWS services with conditional X-Ray tracing
let dynamodb, cloudwatch;

if (process.env.NODE_ENV !== 'test') {
  const AWSXRay = require('aws-xray-sdk-core');
  dynamodb = AWSXRay.captureAWSClient(new AWS.DynamoDB.DocumentClient());
  cloudwatch = AWSXRay.captureAWSClient(new AWS.CloudWatch());
} else {
  dynamodb = new AWS.DynamoDB.DocumentClient();
  cloudwatch = new AWS.CloudWatch();
}

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Environment variables
const PRICING_TABLE = process.env.PRICING_DATA_TABLE;
const MARKET_TABLE = process.env.MARKET_DATA_TABLE;
const ENVIRONMENT = process.env.ENVIRONMENT || 'prod';

/**
 * Main Lambda handler
 */
exports.handler = async (event, context) => {
  // Start performance monitoring
  const startTime = Date.now();
  
  try {
    console.log('AI Pricing Assistant - Request received:', JSON.stringify(event, null, 2));
    
    // Parse request body
    const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
    const { propertyAddress, propertyType, showingDateTime, additionalInfo } = body;
    
    // Validate required fields
    if (!propertyAddress || !propertyType) {
      return createResponse(400, {
        error: 'Missing required fields: propertyAddress and propertyType are required'
      });
    }
    
    // Extract region from property address for market data lookup
    const region = extractRegion(propertyAddress);
    
    // Get cached pricing data if available
    const cachedPricing = await getCachedPricing(propertyAddress, propertyType);
    
    // Get market data for the region
    const marketData = await getMarketData(region);
    
    // Generate AI pricing suggestion
    const pricingSuggestion = await generatePricingSuggestion({
      propertyAddress,
      propertyType,
      showingDateTime,
      additionalInfo,
      marketData,
      cachedPricing
    });
    
    // Cache the pricing suggestion
    await cachePricingSuggestion(propertyAddress, propertyType, pricingSuggestion);
    
    // Send performance metrics
    await sendPerformanceMetrics('AIPricingAssistant', Date.now() - startTime);
    
    console.log('AI Pricing Assistant - Success:', pricingSuggestion);
    
    return createResponse(200, {
      success: true,
      data: pricingSuggestion,
      metadata: {
        requestId: context.awsRequestId,
        timestamp: new Date().toISOString(),
        processingTime: Date.now() - startTime
      }
    });
    
  } catch (error) {
    console.error('AI Pricing Assistant - Error:', error);
    
    // Send error metrics
    await sendErrorMetrics('AIPricingAssistant', error.message);
    
    return createResponse(500, {
      error: 'Internal server error',
      requestId: context.awsRequestId,
      message: ENVIRONMENT === 'dev' ? error.message : 'An error occurred processing your request'
    });
  }
};

/**
 * Generate AI-powered pricing suggestion using OpenAI GPT-4
 */
async function generatePricingSuggestion(params) {
  const { propertyAddress, propertyType, showingDateTime, additionalInfo, marketData, cachedPricing } = params;
  
  // Construct AI prompt with market intelligence
  const prompt = `
As an expert real estate pricing analyst, provide a showing fee recommendation for the following property:

Property Details:
- Address: ${propertyAddress}
- Type: ${propertyType}
- Showing Date/Time: ${showingDateTime || 'Not specified'}
- Additional Info: ${additionalInfo || 'None provided'}

Market Data Context:
${marketData ? JSON.stringify(marketData, null, 2) : 'No recent market data available'}

Cached Pricing History:
${cachedPricing ? JSON.stringify(cachedPricing, null, 2) : 'No cached pricing data'}

Please provide:
1. Recommended showing fee range (min-max)
2. Optimal fee for maximum bookings
3. Premium fee for high-demand times
4. Key factors influencing the pricing
5. Market trends affecting pricing
6. Confidence level (1-100%)

Format your response as a JSON object with the following structure:
{
  "recommendedRange": { "min": number, "max": number },
  "optimalFee": number,
  "premiumFee": number,
  "keyFactors": ["factor1", "factor2", ...],
  "marketTrends": ["trend1", "trend2", ...],
  "confidenceLevel": number,
  "reasoning": "detailed explanation",
  "lastUpdated": "ISO timestamp"
}
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: "You are an expert real estate pricing analyst with deep knowledge of showing fees, market trends, and property valuation. Always provide data-driven, actionable pricing recommendations."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.3, // Lower temperature for more consistent pricing
      max_tokens: 1000
    });
    
    const aiResponse = completion.choices[0].message.content;
    
    // Parse AI response
    let pricingSuggestion;
    try {
      pricingSuggestion = JSON.parse(aiResponse);
    } catch (parseError) {
      // Fallback if AI doesn't return valid JSON
      pricingSuggestion = {
        recommendedRange: { min: 45, max: 65 },
        optimalFee: 55,
        premiumFee: 70,
        keyFactors: ["Property type", "Location", "Market demand"],
        marketTrends: ["Stable pricing", "Moderate demand"],
        confidenceLevel: 75,
        reasoning: "AI response parsing failed, using fallback pricing",
        lastUpdated: new Date().toISOString()
      };
    }
    
    // Add metadata
    pricingSuggestion.lastUpdated = new Date().toISOString();
    pricingSuggestion.aiModel = "gpt-4-turbo-preview";
    pricingSuggestion.dataSource = "OpenAI + Market Analysis";
    
    return pricingSuggestion;
    
  } catch (error) {
    console.error('OpenAI API Error:', error);
    
    // Fallback pricing logic
    return {
      recommendedRange: { min: 45, max: 65 },
      optimalFee: 55,
      premiumFee: 70,
      keyFactors: ["Standard market rates", "Property type baseline"],
      marketTrends: ["Unable to analyze - using baseline"],
      confidenceLevel: 60,
      reasoning: "AI service unavailable, using fallback pricing based on market standards",
      lastUpdated: new Date().toISOString(),
      aiModel: "fallback",
      dataSource: "Baseline Market Data"
    };
  }
}

/**
 * Get cached pricing data from DynamoDB
 */
async function getCachedPricing(propertyAddress, propertyType) {
  try {
    const propertyId = generatePropertyId(propertyAddress, propertyType);
    
    const params = {
      TableName: PRICING_TABLE,
      KeyConditionExpression: 'propertyId = :propertyId',
      ExpressionAttributeValues: {
        ':propertyId': propertyId
      },
      ScanIndexForward: false, // Get most recent first
      Limit: 5 // Last 5 pricing records
    };
    
    const result = await dynamodb.query(params).promise();
    return result.Items || [];
    
  } catch (error) {
    console.error('Error getting cached pricing:', error);
    return null;
  }
}

/**
 * Get market data for the region
 */
async function getMarketData(region) {
  try {
    const params = {
      TableName: MARKET_TABLE,
      KeyConditionExpression: 'region = :region',
      ExpressionAttributeValues: {
        ':region': region
      },
      ScanIndexForward: false, // Get most recent first
      Limit: 10 // Recent market data
    };
    
    const result = await dynamodb.query(params).promise();
    return result.Items || [];
    
  } catch (error) {
    console.error('Error getting market data:', error);
    return null;
  }
}

/**
 * Cache pricing suggestion in DynamoDB
 */
async function cachePricingSuggestion(propertyAddress, propertyType, pricingSuggestion) {
  try {
    const propertyId = generatePropertyId(propertyAddress, propertyType);
    const timestamp = new Date().toISOString();
    
    const params = {
      TableName: PRICING_TABLE,
      Item: {
        propertyId,
        timestamp,
        propertyAddress,
        propertyType,
        pricingSuggestion,
        region: extractRegion(propertyAddress),
        expiresAt: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60), // 7 days TTL
        createdBy: 'AI Pricing Assistant',
        version: '1.0'
      }
    };
    
    await dynamodb.put(params).promise();
    console.log('Pricing suggestion cached successfully');
    
  } catch (error) {
    console.error('Error caching pricing suggestion:', error);
    // Don't throw error - caching failure shouldn't break the response
  }
}

/**
 * Utility functions
 */
function generatePropertyId(address, type) {
  return `${address.toLowerCase().replace(/\s+/g, '-')}-${type.toLowerCase()}`;
}

function extractRegion(address) {
  // Simple region extraction - in production, use geocoding service
  const parts = address.split(',');
  return parts.length > 1 ? parts[parts.length - 2].trim() : 'unknown';
}

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

/**
 * Send performance metrics to CloudWatch
 */
async function sendPerformanceMetrics(functionName, duration) {
  try {
    const params = {
      Namespace: 'Homes2Show/Lambda',
      MetricData: [
        {
          MetricName: `${functionName}Duration`,
          Value: duration,
          Unit: 'Milliseconds',
          Timestamp: new Date()
        },
        {
          MetricName: `${functionName}Invocations`,
          Value: 1,
          Unit: 'Count',
          Timestamp: new Date()
        }
      ]
    };
    
    await cloudwatch.putMetricData(params).promise();
  } catch (error) {
    console.error('Error sending performance metrics:', error);
  }
}

/**
 * Send error metrics to CloudWatch
 */
async function sendErrorMetrics(functionName, errorMessage) {
  try {
    const params = {
      Namespace: 'Homes2Show/Lambda',
      MetricData: [
        {
          MetricName: `${functionName}Errors`,
          Value: 1,
          Unit: 'Count',
          Timestamp: new Date(),
          Dimensions: [
            {
              Name: 'ErrorType',
              Value: errorMessage.substring(0, 50) // Truncate for dimension
            }
          ]
        }
      ]
    };
    
    await cloudwatch.putMetricData(params).promise();
  } catch (error) {
    console.error('Error sending error metrics:', error);
  }
}
