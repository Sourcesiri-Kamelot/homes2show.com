/**
 * Property Information Assistant Lambda Function (COMPLIANT VERSION)
 * Homes2Show - AI-Powered Real Estate Platform
 * 
 * Created by: Nyasha Bivins
 * Powered by: Helo IM AI Inc. | https://www.helo-im.ai
 * 
 * IMPORTANT: This function provides general property information only.
 * It does NOT provide valuations, appraisals, or investment advice.
 * All information is for educational purposes and requires verification
 * by licensed real estate professionals.
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
const PROPERTY_TABLE = process.env.PROPERTY_DATA_TABLE;
const ENVIRONMENT = process.env.ENVIRONMENT || 'prod';

// Prohibited terms that indicate valuation/pricing requests
const PROHIBITED_TERMS = [
  'price', 'value', 'worth', 'appraisal', 'market value', 'investment',
  'profit', 'appreciation', 'forecast', 'predict', 'estimate cost',
  'how much', 'valuation', 'cma', 'comparative market analysis',
  'roi', 'return on investment', 'market prediction', 'price trend'
];

/**
 * Check if query contains prohibited terms
 */
function containsProhibitedTerms(query) {
  const lowerQuery = query.toLowerCase();
  return PROHIBITED_TERMS.some(term => lowerQuery.includes(term));
}

/**
 * Generate compliant property information response
 */
async function generatePropertyInfo(query, propertyData) {
  const systemPrompt = `
You are a compliant real estate information assistant. You provide general property information only.

CRITICAL RESTRICTIONS - YOU MUST NEVER:
- Provide property valuations, appraisals, or price estimates
- Give investment advice or market predictions
- Perform comparative market analysis (CMA)
- Suggest property values or worth
- Provide financial advice related to real estate

YOU CAN PROVIDE:
- General property features and descriptions
- Neighborhood information (schools, amenities, etc.)
- Property history from public records
- Explanation of property features
- General real estate process information
- Connections to licensed professionals

Always end responses with: "For professional real estate advice, valuations, or transactions, please consult with licensed real estate professionals."

If asked about pricing, values, or investments, respond: "I cannot provide property valuations or investment advice. Please consult with licensed real estate professionals for this information."
`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        { 
          role: 'user', 
          content: `Property Data: ${JSON.stringify(propertyData, null, 2)}\n\nUser Query: ${query}` 
        }
      ],
      max_tokens: 500,
      temperature: 0.7
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error('AI service temporarily unavailable');
  }
}

/**
 * Log compliance violation attempt
 */
async function logComplianceViolation(query, userInfo) {
  try {
    await dynamodb.put({
      TableName: process.env.COMPLIANCE_LOG_TABLE || 'homes2show-compliance-log',
      Item: {
        id: `violation-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date().toISOString(),
        query: query,
        userInfo: userInfo,
        violationType: 'PROHIBITED_QUERY',
        environment: ENVIRONMENT
      }
    }).promise();
  } catch (error) {
    console.error('Failed to log compliance violation:', error);
  }
}

/**
 * Main Lambda handler
 */
exports.handler = async (event, context) => {
  const startTime = Date.now();
  
  try {
    console.log('Property Information Assistant - Request received:', JSON.stringify(event, null, 2));
    
    // Parse request body
    const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
    const { query, propertyData, userInfo } = body;
    
    // Validate required fields
    if (!query || !query.trim()) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          success: false,
          error: 'Query is required'
        })
      };
    }

    // Check for prohibited terms
    if (containsProhibitedTerms(query)) {
      // Log the compliance violation attempt
      await logComplianceViolation(query, userInfo);
      
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          success: true,
          response: `⚠️ I cannot provide property valuations, price estimates, or investment advice.

For property values, market analysis, or investment guidance, please consult with:
• Licensed real estate agents
• Certified appraisers  
• Real estate brokers
• Financial advisors

I can help with general property information, neighborhood details, property features, and connecting you with licensed professionals.

For professional real estate advice, valuations, or transactions, please consult with licensed real estate professionals.`,
          complianceNotice: true
        })
      };
    }

    // Generate compliant property information
    const response = await generatePropertyInfo(query, propertyData);
    
    // Log successful request
    await cloudwatch.putMetricData({
      Namespace: 'Homes2Show/PropertyInfoAssistant',
      MetricData: [
        {
          MetricName: 'SuccessfulRequests',
          Value: 1,
          Unit: 'Count',
          Dimensions: [
            {
              Name: 'Environment',
              Value: ENVIRONMENT
            }
          ]
        },
        {
          MetricName: 'ResponseTime',
          Value: Date.now() - startTime,
          Unit: 'Milliseconds',
          Dimensions: [
            {
              Name: 'Environment',
              Value: ENVIRONMENT
            }
          ]
        }
      ]
    }).promise();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        success: true,
        response: response,
        disclaimer: 'This information is for general purposes only. Always verify with licensed professionals.',
        complianceNotice: false
      })
    };

  } catch (error) {
    console.error('Property Information Assistant error:', error);
    
    // Log error metric
    await cloudwatch.putMetricData({
      Namespace: 'Homes2Show/PropertyInfoAssistant',
      MetricData: [
        {
          MetricName: 'Errors',
          Value: 1,
          Unit: 'Count',
          Dimensions: [
            {
              Name: 'Environment',
              Value: ENVIRONMENT
            }
          ]
        }
      ]
    }).promise();

    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        success: false,
        error: 'Service temporarily unavailable. Please try again later or contact a licensed real estate professional.',
        complianceNotice: true
      })
    };
  }
};
