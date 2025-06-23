/**
 * Market Insights Lambda Function
 * Homes2Show - Revolutionary Real Estate Platform
 * 
 * Created by: Nyasha Bivins
 * Powered by: Helo IM AI Inc. | https://www.helo-im.ai
 * 
 * This function generates intelligent market insights and trends
 * that will give our users a competitive edge in real estate
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
const MARKET_TABLE = process.env.MARKET_DATA_TABLE;
const PRICING_TABLE = process.env.PRICING_DATA_TABLE;
const FEEDBACK_TABLE = process.env.FEEDBACK_DATA_TABLE;

/**
 * Main Lambda handler - can be triggered by schedule or API call
 */
exports.handler = async (event, context) => {
  const startTime = Date.now();
  
  try {
    console.log('Market Insights Generator - Starting analysis');
    
    // Determine if this is a scheduled run or API call
    const isScheduled = event.source === 'aws.events';
    const region = event.region || event.queryStringParameters?.region || 'all';
    
    // Gather market data
    const marketData = await gatherMarketData(region);
    
    // Generate AI insights
    const insights = await generateMarketInsights(marketData, region);
    
    // Store insights
    await storeMarketInsights(insights, region);
    
    // Send performance metrics
    await sendPerformanceMetrics('MarketInsights', Date.now() - startTime);
    
    console.log('Market Insights - Success:', insights.summary);
    
    if (isScheduled) {
      return { statusCode: 200, body: 'Market insights generated successfully' };
    }
    
    return createResponse(200, {
      success: true,
      data: insights,
      metadata: {
        requestId: context.awsRequestId,
        timestamp: new Date().toISOString(),
        region: region,
        processingTime: Date.now() - startTime
      }
    });
    
  } catch (error) {
    console.error('Market Insights - Error:', error);
    await sendErrorMetrics('MarketInsights', error.message);
    
    return createResponse(500, {
      error: 'Internal server error',
      requestId: context.awsRequestId
    });
  }
};

/**
 * Gather comprehensive market data for analysis
 */
async function gatherMarketData(region) {
  try {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    
    // Get recent pricing data
    const pricingData = await dynamodb.scan({
      TableName: PRICING_TABLE,
      FilterExpression: 'createdAt > :thirtyDaysAgo',
      ExpressionAttributeValues: { ':thirtyDaysAgo': thirtyDaysAgo },
      Limit: 1000
    }).promise();
    
    // Get recent feedback data
    const feedbackData = await dynamodb.scan({
      TableName: FEEDBACK_TABLE,
      FilterExpression: 'createdAt > :thirtyDaysAgo',
      ExpressionAttributeValues: { ':thirtyDaysAgo': thirtyDaysAgo },
      Limit: 500
    }).promise();
    
    // Get historical market data
    const historicalData = await dynamodb.query({
      TableName: MARKET_TABLE,
      KeyConditionExpression: 'region = :region',
      ExpressionAttributeValues: { ':region': region === 'all' ? 'national' : region },
      ScanIndexForward: false,
      Limit: 50
    }).promise();
    
    return {
      pricing: pricingData.Items || [],
      feedback: feedbackData.Items || [],
      historical: historicalData.Items || [],
      region: region,
      dataPoints: (pricingData.Items?.length || 0) + (feedbackData.Items?.length || 0)
    };
    
  } catch (error) {
    console.error('Error gathering market data:', error);
    return { pricing: [], feedback: [], historical: [], region: region, dataPoints: 0 };
  }
}

/**
 * Generate AI-powered market insights
 */
async function generateMarketInsights(marketData, region) {
  const prompt = `
As a senior real estate market analyst, analyze the following data and provide comprehensive market insights:

MARKET DATA SUMMARY:
- Region: ${region}
- Pricing Data Points: ${marketData.pricing.length}
- Feedback Data Points: ${marketData.feedback.length}
- Historical Data Points: ${marketData.historical.length}
- Analysis Period: Last 30 days

RECENT PRICING TRENDS:
${JSON.stringify(marketData.pricing.slice(0, 10), null, 2)}

RECENT FEEDBACK PATTERNS:
${JSON.stringify(marketData.feedback.slice(0, 5), null, 2)}

Provide comprehensive market insights in this JSON format:
{
  "marketTrends": {
    "overallDirection": "bullish|bearish|neutral",
    "priceMovement": "increasing|decreasing|stable",
    "demandLevel": "high|medium|low",
    "supplyLevel": "high|medium|low",
    "marketHealth": "excellent|good|fair|poor"
  },
  "pricingInsights": {
    "averageShowingFee": number,
    "priceRange": {"min": number, "max": number},
    "optimalPricing": number,
    "pricingTrends": ["trend1", "trend2"],
    "competitiveLandscape": "description"
  },
  "demandPatterns": {
    "peakDays": ["Monday", "Tuesday"],
    "peakHours": ["2PM-5PM"],
    "seasonalTrends": ["trend1", "trend2"],
    "popularFeatures": ["feature1", "feature2"]
  },
  "clientSentiment": {
    "overallSatisfaction": "high|medium|low",
    "commonComplaints": ["complaint1", "complaint2"],
    "positiveHighlights": ["highlight1", "highlight2"],
    "improvementAreas": ["area1", "area2"]
  },
  "businessOpportunities": {
    "emergingTrends": ["trend1", "trend2"],
    "underservedSegments": ["segment1", "segment2"],
    "growthAreas": ["area1", "area2"],
    "recommendations": ["rec1", "rec2"]
  },
  "riskFactors": {
    "marketRisks": ["risk1", "risk2"],
    "competitiveThreats": ["threat1", "threat2"],
    "mitigationStrategies": ["strategy1", "strategy2"]
  },
  "forecast": {
    "nextMonth": "prediction for next 30 days",
    "nextQuarter": "prediction for next 90 days",
    "confidence": number_0_to_100
  },
  "actionableInsights": {
    "immediateActions": ["action1", "action2"],
    "strategicMoves": ["move1", "move2"],
    "investmentAreas": ["area1", "area2"]
  },
  "summary": "executive summary of key findings",
  "confidence": number_0_to_100,
  "dataQuality": "excellent|good|fair|limited"
}
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: "You are a senior real estate market analyst with 20+ years of experience. Provide data-driven, actionable insights that help real estate professionals make better business decisions."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.2,
      max_tokens: 2500
    });
    
    let insights;
    try {
      insights = JSON.parse(completion.choices[0].message.content);
    } catch (parseError) {
      insights = createFallbackInsights(marketData, region);
    }
    
    // Add metadata
    insights.metadata = {
      generatedAt: new Date().toISOString(),
      aiModel: "gpt-4-turbo-preview",
      dataPoints: marketData.dataPoints,
      region: region,
      version: "1.0"
    };
    
    return insights;
    
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return createFallbackInsights(marketData, region);
  }
}

/**
 * Create fallback insights when AI fails
 */
function createFallbackInsights(marketData, region) {
  const avgPrice = marketData.pricing.length > 0 
    ? marketData.pricing.reduce((sum, item) => sum + (item.pricingSuggestion?.optimalFee || 50), 0) / marketData.pricing.length
    : 55;
    
  return {
    marketTrends: {
      overallDirection: "neutral",
      priceMovement: "stable",
      demandLevel: "medium",
      supplyLevel: "medium",
      marketHealth: "fair"
    },
    pricingInsights: {
      averageShowingFee: Math.round(avgPrice),
      priceRange: { min: 40, max: 70 },
      optimalPricing: Math.round(avgPrice),
      pricingTrends: ["Stable pricing environment"],
      competitiveLandscape: "Analysis limited - AI service unavailable"
    },
    demandPatterns: {
      peakDays: ["Saturday", "Sunday"],
      peakHours: ["2PM-5PM"],
      seasonalTrends: ["Spring peak season approaching"],
      popularFeatures: ["Updated kitchens", "Home offices"]
    },
    clientSentiment: {
      overallSatisfaction: "medium",
      commonComplaints: ["Limited analysis available"],
      positiveHighlights: ["Professional service"],
      improvementAreas: ["Enhanced AI analysis needed"]
    },
    businessOpportunities: {
      emergingTrends: ["AI-powered services", "Virtual showings"],
      underservedSegments: ["First-time buyers"],
      growthAreas: ["Technology integration"],
      recommendations: ["Implement AI redundancy", "Expand service offerings"]
    },
    riskFactors: {
      marketRisks: ["AI service dependency"],
      competitiveThreats: ["Traditional competitors"],
      mitigationStrategies: ["Diversify AI providers", "Build fallback systems"]
    },
    forecast: {
      nextMonth: "Stable market conditions expected",
      nextQuarter: "Gradual improvement anticipated",
      confidence: 60
    },
    actionableInsights: {
      immediateActions: ["Implement AI service redundancy"],
      strategicMoves: ["Expand market presence"],
      investmentAreas: ["Technology infrastructure"]
    },
    summary: "Market analysis operating in fallback mode. Limited insights available due to AI service unavailability. Recommend implementing service redundancy for comprehensive analysis.",
    confidence: 60,
    dataQuality: "limited",
    metadata: {
      generatedAt: new Date().toISOString(),
      aiModel: "fallback",
      dataPoints: marketData.dataPoints,
      region: region,
      version: "1.0-fallback"
    }
  };
}

/**
 * Store market insights in DynamoDB
 */
async function storeMarketInsights(insights, region) {
  try {
    const timestamp = new Date().toISOString();
    
    await dynamodb.put({
      TableName: MARKET_TABLE,
      Item: {
        region: region,
        timestamp: timestamp,
        dataType: 'market-insights',
        insights: insights,
        generatedBy: 'ai-market-insights-lambda',
        version: '1.0'
      }
    }).promise();
    
    console.log('Market insights stored successfully');
    
  } catch (error) {
    console.error('Error storing market insights:', error);
    throw error;
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
      'Access-Control-Allow-Methods': 'GET,OPTIONS',
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
