import React, { useState, useEffect } from 'react';
import adminAuthService from '../../services/adminAuthService';

/**
 * Admin Dashboard Component
 * Special VIP dashboard with full feature access
 * Created by: Nyasha Bivins | Powered by: Helo IM AI Inc.
 */
const AdminDashboard = ({ userEmail }) => {
  const [adminConfig, setAdminConfig] = useState(null);
  const [marketingMode, setMarketingMode] = useState(false);

  useEffect(() => {
    // Load admin configuration
    const config = adminAuthService.getAdminDashboardConfig(userEmail);
    setAdminConfig(config);
    
    // Enable marketing mode by default for VIP users
    const marketing = adminAuthService.getMarketingMode(userEmail);
    setMarketingMode(marketing.enabled);
  }, [userEmail]);

  if (!adminConfig) {
    return null; // Not an admin user
  }

  return (
    <div className="bg-gradient-to-br from-purple-50 via-white to-orange-50 min-h-screen">
      {/* VIP Header */}
      <div className="bg-gradient-to-r from-purple-600 to-orange-600 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">
                🌟 VIP Admin Dashboard
              </h1>
              <p className="text-purple-100 mt-2">
                {adminConfig.user.description} - Full Platform Access
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-sm font-medium">
                  Plan: {adminConfig.user.plan}
                </span>
              </div>
              <div className="bg-green-500/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-sm font-medium">
                  ✅ All Features Unlocked
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Marketing Mode Toggle */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                🎯 Marketing Presentation Mode
              </h2>
              <p className="text-gray-600">
                Perfect for showcasing all platform capabilities to potential clients
              </p>
            </div>
            <button
              onClick={() => setMarketingMode(!marketingMode)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
                marketingMode ? 'bg-orange-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  marketingMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* AI Features Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* AI Pricing Assistant */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-orange-200">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 3C6.13 3 3 6.13 3 10s3.13 7 7 7 7-3.13 7-7-3.13-7-7-7zm1 10.93c0 .04-.02.06-.07.06H8.93c-.05 0-.07-.02-.07-.06v-.86c0-.05.02-.07.07-.07h.54c.72 0 1.3-.58 1.3-1.3 0-.72-.58-1.3-1.3-1.3H8.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h.97c1.28 0 2.3 1.02 2.3 2.3 0 .85-.46 1.58-1.14 1.98v.25zm0-3.43c0 .05-.02.07-.07.07H9.07c-.05 0-.07-.02-.07-.07V9.64c0-.05.02-.07.07-.07h1.86c.05 0 .07.02.07.07v.86z"/>
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">AI Pricing Assistant</h3>
                <span className="text-green-600 text-sm font-medium">✅ UNLIMITED ACCESS</span>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Advanced AI-powered pricing recommendations with 95% accuracy
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center text-green-600">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                Real-time market analysis
              </div>
              <div className="flex items-center text-green-600">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                Custom AI models
              </div>
              <div className="flex items-center text-green-600">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                Unlimited requests
              </div>
            </div>
          </div>

          {/* Smart Matching */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-purple-200">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"/>
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Smart Matching</h3>
                <span className="text-green-600 text-sm font-medium">✅ PRIORITY ACCESS</span>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              AI-powered agent matching with advanced algorithms
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center text-green-600">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                Priority matching
              </div>
              <div className="flex items-center text-green-600">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                Advanced filters
              </div>
              <div className="flex items-center text-green-600">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                Unlimited matches
              </div>
            </div>
          </div>

          {/* Market Intelligence */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-blue-200">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Market Intelligence</h3>
                <span className="text-green-600 text-sm font-medium">✅ FULL ANALYTICS</span>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Advanced market insights with predictive analytics
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center text-green-600">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                Real-time data
              </div>
              <div className="flex items-center text-green-600">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                Custom reports
              </div>
              <div className="flex items-center text-green-600">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                Export capabilities
              </div>
            </div>
          </div>
        </div>

        {/* Demo Account Instructions */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl shadow-xl p-8 border border-green-200">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              🎯 Perfect for Marketing & Demos!
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              This VIP account showcases all premium features of Homes2Show. Perfect for:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Client Presentations</h3>
                <p className="text-gray-600 text-sm">Show potential clients the full power of AI</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Feature Testing</h3>
                <p className="text-gray-600 text-sm">Test all features without limitations</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Marketing Material</h3>
                <p className="text-gray-600 text-sm">Create screenshots and marketing content</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                🔑 Demo Account Credentials
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
                <div className="mb-2">
                  <strong>Email:</strong> demo@homes2show.com
                </div>
                <div>
                  <strong>Password:</strong> DemoAdmin2025!
                </div>
              </div>
              <p className="text-gray-500 text-sm mt-4">
                This account has unlimited access to all features for marketing and demonstration purposes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
