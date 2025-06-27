/**
 * AWS Configuration for Homes2Show
 * Cognito User Pool and Identity Pool settings
 * Created by: Nyasha Bivins | Powered by: Helo IM AI Inc.
 */

const awsConfig = {
  // AWS Region
  region: 'us-east-1',
  
  // Cognito User Pool Configuration
  userPool: {
    UserPoolId: 'us-east-1_9qid8Ndlb',
    ClientId: '5rotte2876nt9pnl1ts1mhinuh'
  },
  
  // Cognito Identity Pool Configuration
  identityPool: {
    IdentityPoolId: 'us-east-1:bbb32e37-3c90-4e58-982b-714c92e61541'
  },
  
  // API Gateway Configuration
  api: {
    baseUrl: 'https://gtuo970nr7.execute-api.us-east-1.amazonaws.com/prod',
    endpoints: {
      pricing: '/api/pricing',
      feedback: '/api/feedback',
      marketInsights: '/api/market-insights',
      users: '/api/users',
      payment: '/api/payment'
    }
  },
  
  // SES Configuration for emails
  ses: {
    fromEmail: 'info@homes2show.com',
    supportEmail: 'info@homes2show.com'
  },
  
  // Application Configuration
  app: {
    name: 'Homes2Show',
    domain: 'homes2show.com',
    creator: 'Nyasha Bivins',
    poweredBy: 'Helo IM AI Inc.'
  }
};

export default awsConfig;
