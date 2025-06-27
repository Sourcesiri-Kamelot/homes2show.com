/**
 * Admin Configuration for Homes2Show
 * Special VIP access for marketing and demo purposes
 * Created by: Nyasha Bivins | Powered by: Helo IM AI Inc.
 */

const adminConfig = {
  // VIP Admin Users - Full Access Always
  vipUsers: [
    {
      email: 'admin@homes2show.com',
      role: 'SUPER_ADMIN',
      plan: 'VIP_UNLIMITED',
      permissions: 'ALL',
      description: 'Platform Creator - Nyasha Bivins'
    },
    {
      email: 'demo@homes2show.com', 
      role: 'DEMO_ADMIN',
      plan: 'VIP_UNLIMITED',
      permissions: 'ALL',
      description: 'Marketing Demo Account - Full Capabilities'
    },
    {
      email: 'marketing@homes2show.com',
      role: 'MARKETING_ADMIN', 
      plan: 'VIP_UNLIMITED',
      permissions: 'ALL',
      description: 'Marketing Showcase Account'
    }
  ],

  // Admin Features - Always Enabled
  adminFeatures: {
    // AI Features - Full Access
    aiPricingAssistant: {
      enabled: true,
      unlimited: true,
      advancedAnalytics: true,
      customModels: true
    },
    
    smartMatching: {
      enabled: true,
      unlimited: true,
      priorityMatching: true,
      advancedFilters: true
    },
    
    marketIntelligence: {
      enabled: true,
      unlimited: true,
      realTimeData: true,
      predictiveAnalytics: true,
      customReports: true
    },

    // Platform Features - Full Access
    userManagement: {
      enabled: true,
      unlimited: true,
      bulkOperations: true,
      advancedSearch: true
    },

    // Premium Features - All Unlocked
    whiteLabel: {
      enabled: true,
      customBranding: true,
      customDomain: true
    },

    analytics: {
      enabled: true,
      realTime: true,
      advanced: true,
      export: true
    },

    support: {
      priority: 'HIGHEST',
      dedicatedManager: true,
      phoneSupport: true,
      chatSupport: true
    }
  },

  // Demo Data - For Showcasing
  demoData: {
    sampleListings: 50,
    sampleAgents: 25,
    sampleTransactions: 100,
    sampleAnalytics: true,
    sampleReports: true
  },

  // Marketing Tools
  marketingTools: {
    screenshotMode: true,
    demoMode: true,
    presentationMode: true,
    fullFeatureAccess: true
  }
};

export default adminConfig;
