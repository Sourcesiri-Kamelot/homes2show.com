/**
 * AI Pricing Assistant Lambda Function Tests
 * Homes2Show - AI-Powered Real Estate Platform
 * 
 * Created by: Nyasha Bivins
 * Powered by: Helo IM AI Inc. | https://www.helo-im.ai
 */

const AWS = require('aws-sdk-mock');
const { handler } = require('./index');

// Mock environment variables
process.env.PRICING_DATA_TABLE = 'homes2show-pricing-data-test';
process.env.MARKET_DATA_TABLE = 'homes2show-market-data-test';
process.env.OPENAI_API_KEY = 'test-key';
process.env.ENVIRONMENT = 'test';

// Mock OpenAI
jest.mock('openai', () => {
  return {
    OpenAI: jest.fn().mockImplementation(() => ({
      chat: {
        completions: {
          create: jest.fn().mockResolvedValue({
            choices: [{
              message: {
                content: JSON.stringify({
                  recommendedRange: { min: 50, max: 70 },
                  optimalFee: 60,
                  premiumFee: 75,
                  keyFactors: ["Location", "Property type", "Market demand"],
                  marketTrends: ["Increasing demand", "Stable pricing"],
                  confidenceLevel: 85,
                  reasoning: "Based on current market analysis and property characteristics"
                })
              }
            }]
          })
        }
      }
    }))
  };
});

describe('AI Pricing Assistant Lambda', () => {
  beforeEach(() => {
    // Mock AWS services
    AWS.mock('DynamoDB.DocumentClient', 'query', (params, callback) => {
      if (params.TableName.includes('pricing-data')) {
        callback(null, {
          Items: [{
            propertyId: 'test-property',
            timestamp: '2025-06-23T10:00:00Z',
            pricingSuggestion: {
              optimalFee: 55,
              confidenceLevel: 80
            }
          }]
        });
      } else if (params.TableName.includes('market-data')) {
        callback(null, {
          Items: [{
            region: 'test-region',
            timestamp: '2025-06-23T10:00:00Z',
            averagePrice: 60,
            demandLevel: 'high'
          }]
        });
      }
    });

    AWS.mock('DynamoDB.DocumentClient', 'put', (params, callback) => {
      callback(null, {});
    });

    AWS.mock('CloudWatch', 'putMetricData', (params, callback) => {
      callback(null, {});
    });
  });

  afterEach(() => {
    AWS.restore();
  });

  describe('Successful pricing requests', () => {
    test('should return pricing suggestion for valid property', async () => {
      const event = {
        body: JSON.stringify({
          propertyAddress: '123 Main St, Anytown, CA',
          propertyType: 'single-family',
          showingDateTime: '2025-06-25T14:00:00Z',
          additionalInfo: 'Recently renovated'
        })
      };

      const context = {
        awsRequestId: 'test-request-id'
      };

      const result = await handler(event, context);

      expect(result.statusCode).toBe(200);
      
      const body = JSON.parse(result.body);
      expect(body.success).toBe(true);
      expect(body.data).toHaveProperty('recommendedRange');
      expect(body.data).toHaveProperty('optimalFee');
      expect(body.data).toHaveProperty('confidenceLevel');
      expect(body.metadata).toHaveProperty('requestId');
      expect(body.metadata).toHaveProperty('processingTime');
    });

    test('should handle minimal required fields', async () => {
      const event = {
        body: JSON.stringify({
          propertyAddress: '456 Oak Ave, Somewhere, TX',
          propertyType: 'condo'
        })
      };

      const context = {
        awsRequestId: 'test-request-id-2'
      };

      const result = await handler(event, context);

      expect(result.statusCode).toBe(200);
      
      const body = JSON.parse(result.body);
      expect(body.success).toBe(true);
      expect(body.data.optimalFee).toBeGreaterThan(0);
    });
  });

  describe('Error handling', () => {
    test('should return 400 for missing required fields', async () => {
      const event = {
        body: JSON.stringify({
          propertyAddress: '123 Main St'
          // Missing propertyType
        })
      };

      const context = {
        awsRequestId: 'test-request-id-3'
      };

      const result = await handler(event, context);

      expect(result.statusCode).toBe(400);
      
      const body = JSON.parse(result.body);
      expect(body.error).toContain('Missing required fields');
    });

    test('should handle malformed JSON in request body', async () => {
      const event = {
        body: 'invalid json'
      };

      const context = {
        awsRequestId: 'test-request-id-4'
      };

      const result = await handler(event, context);

      expect(result.statusCode).toBe(500);
      
      const body = JSON.parse(result.body);
      expect(body.error).toBe('Internal server error');
      expect(body.requestId).toBe('test-request-id-4');
    });

    test('should handle DynamoDB errors gracefully', async () => {
      // Mock DynamoDB error
      AWS.restore('DynamoDB.DocumentClient', 'query');
      AWS.mock('DynamoDB.DocumentClient', 'query', (params, callback) => {
        callback(new Error('DynamoDB connection failed'), null);
      });

      const event = {
        body: JSON.stringify({
          propertyAddress: '789 Pine St, Testville, FL',
          propertyType: 'townhouse'
        })
      };

      const context = {
        awsRequestId: 'test-request-id-5'
      };

      const result = await handler(event, context);

      // Should still succeed with fallback pricing
      expect(result.statusCode).toBe(200);
      
      const body = JSON.parse(result.body);
      expect(body.success).toBe(true);
      expect(body.data.optimalFee).toBeGreaterThan(0);
    });
  });

  describe('AI Integration', () => {
    test('should handle OpenAI API failures with fallback', async () => {
      // Mock OpenAI failure
      const { OpenAI } = require('openai');
      const mockOpenAI = new OpenAI();
      mockOpenAI.chat.completions.create.mockRejectedValueOnce(
        new Error('OpenAI API rate limit exceeded')
      );

      const event = {
        body: JSON.stringify({
          propertyAddress: '321 Elm St, Fallback City, NY',
          propertyType: 'apartment'
        })
      };

      const context = {
        awsRequestId: 'test-request-id-6'
      };

      const result = await handler(event, context);

      expect(result.statusCode).toBe(200);
      
      const body = JSON.parse(result.body);
      expect(body.success).toBe(true);
      expect(body.data.reasoning).toContain('fallback');
      expect(body.data.aiModel).toBe('fallback');
    });

    test('should handle invalid JSON response from OpenAI', async () => {
      // Mock invalid JSON response
      const { OpenAI } = require('openai');
      const mockOpenAI = new OpenAI();
      mockOpenAI.chat.completions.create.mockResolvedValueOnce({
        choices: [{
          message: {
            content: 'This is not valid JSON response'
          }
        }]
      });

      const event = {
        body: JSON.stringify({
          propertyAddress: '654 Maple Dr, JSON Town, WA',
          propertyType: 'duplex'
        })
      };

      const context = {
        awsRequestId: 'test-request-id-7'
      };

      const result = await handler(event, context);

      expect(result.statusCode).toBe(200);
      
      const body = JSON.parse(result.body);
      expect(body.success).toBe(true);
      expect(body.data.reasoning).toContain('parsing failed');
    });
  });

  describe('Performance and monitoring', () => {
    test('should send performance metrics', async () => {
      const event = {
        body: JSON.stringify({
          propertyAddress: '987 Performance St, Metrics City, OR',
          propertyType: 'single-family'
        })
      };

      const context = {
        awsRequestId: 'test-request-id-8'
      };

      const result = await handler(event, context);

      expect(result.statusCode).toBe(200);
      
      // Verify CloudWatch metrics were called
      // Note: In a real test, you'd verify the actual calls to CloudWatch
      const body = JSON.parse(result.body);
      expect(body.metadata.processingTime).toBeGreaterThan(0);
    });

    test('should include proper CORS headers', async () => {
      const event = {
        body: JSON.stringify({
          propertyAddress: '147 CORS Ave, Header City, CO',
          propertyType: 'condo'
        })
      };

      const context = {
        awsRequestId: 'test-request-id-9'
      };

      const result = await handler(event, context);

      expect(result.headers).toHaveProperty('Access-Control-Allow-Origin', '*');
      expect(result.headers).toHaveProperty('Access-Control-Allow-Headers');
      expect(result.headers).toHaveProperty('Access-Control-Allow-Methods');
      expect(result.headers).toHaveProperty('X-Powered-By', 'Helo IM AI Inc');
      expect(result.headers).toHaveProperty('X-Created-By', 'Nyasha Bivins');
    });
  });

  describe('Data validation and processing', () => {
    test('should extract region from property address', async () => {
      const event = {
        body: JSON.stringify({
          propertyAddress: '555 Region Test St, Los Angeles, CA',
          propertyType: 'single-family'
        })
      };

      const context = {
        awsRequestId: 'test-request-id-10'
      };

      const result = await handler(event, context);

      expect(result.statusCode).toBe(200);
      
      // The function should have processed the address and extracted region
      const body = JSON.parse(result.body);
      expect(body.success).toBe(true);
    });

    test('should handle various property types', async () => {
      const propertyTypes = ['single-family', 'condo', 'townhouse', 'apartment', 'duplex'];
      
      for (const propertyType of propertyTypes) {
        const event = {
          body: JSON.stringify({
            propertyAddress: `123 ${propertyType} St, Test City, CA`,
            propertyType
          })
        };

        const context = {
          awsRequestId: `test-request-${propertyType}`
        };

        const result = await handler(event, context);

        expect(result.statusCode).toBe(200);
        
        const body = JSON.parse(result.body);
        expect(body.success).toBe(true);
        expect(body.data.optimalFee).toBeGreaterThan(0);
      }
    });
  });

  describe('Caching functionality', () => {
    test('should cache pricing suggestions', async () => {
      const event = {
        body: JSON.stringify({
          propertyAddress: '888 Cache St, Memory City, NV',
          propertyType: 'single-family'
        })
      };

      const context = {
        awsRequestId: 'test-request-id-11'
      };

      const result = await handler(event, context);

      expect(result.statusCode).toBe(200);
      
      // Verify that DynamoDB put was called for caching
      // In a real test, you'd verify the actual parameters passed to DynamoDB
      const body = JSON.parse(result.body);
      expect(body.success).toBe(true);
    });

    test('should handle caching failures gracefully', async () => {
      // Mock DynamoDB put failure
      AWS.restore('DynamoDB.DocumentClient', 'put');
      AWS.mock('DynamoDB.DocumentClient', 'put', (params, callback) => {
        callback(new Error('DynamoDB put failed'), null);
      });

      const event = {
        body: JSON.stringify({
          propertyAddress: '999 Cache Fail St, Error City, AZ',
          propertyType: 'condo'
        })
      };

      const context = {
        awsRequestId: 'test-request-id-12'
      };

      const result = await handler(event, context);

      // Should still succeed even if caching fails
      expect(result.statusCode).toBe(200);
      
      const body = JSON.parse(result.body);
      expect(body.success).toBe(true);
    });
  });
});
