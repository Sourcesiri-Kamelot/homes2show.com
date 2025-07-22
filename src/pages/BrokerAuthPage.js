import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BrokerAuth from '../components/auth/BrokerAuth';
import LegalDisclaimers from '../components/legal/LegalDisclaimers';

/**
 * Broker Authentication Page
 * Handles license verification for real estate professionals
 */

const BrokerAuthPage = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('broker');

  const handleAuthSuccess = (authData) => {
    console.log('Authentication successful:', authData);
    // Redirect to dashboard or appropriate page
    navigate('/dashboard');
  };

  const handleAuthFailure = (error) => {
    console.error('Authentication failed:', error);
    // Handle authentication failure
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Professional License Verification
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Verify your real estate license to access professional features and tools. 
            Only licensed brokers and agents can use our advanced platform capabilities.
          </p>
        </div>

        {/* User Type Selection */}
        <div className="mb-8">
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setUserType('broker')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                userType === 'broker'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              I'm a Licensed Broker
            </button>
            <button
              onClick={() => setUserType('agent')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                userType === 'agent'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              I'm a Licensed Agent
            </button>
          </div>
        </div>

        {/* Authentication Component */}
        <div className="mb-12">
          <BrokerAuth
            userType={userType}
            onAuthSuccess={handleAuthSuccess}
            onAuthFailure={handleAuthFailure}
          />
        </div>

        {/* Why Verification is Required */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Why License Verification is Required
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                🏛️ Legal Compliance
              </h3>
              <p className="text-gray-600 mb-4">
                Real estate laws require that only licensed professionals provide 
                certain services. We verify licenses to ensure compliance with 
                state and federal regulations.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                🛡️ Consumer Protection
              </h3>
              <p className="text-gray-600 mb-4">
                License verification protects consumers by ensuring they work 
                with qualified, regulated professionals who are accountable 
                to state licensing boards.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                🔧 Professional Tools
              </h3>
              <p className="text-gray-600 mb-4">
                Our advanced AI tools and features are designed specifically 
                for licensed professionals and require proper credentials 
                to access.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                📊 Data Access
              </h3>
              <p className="text-gray-600 mb-4">
                Access to MLS data, market insights, and professional-grade 
                analytics requires verification of your professional status 
                and licensing.
              </p>
            </div>
          </div>
        </div>

        {/* Features Available After Verification */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Features Available After Verification
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">AI-Powered Analytics</h3>
              <p className="text-gray-600 text-sm">
                Advanced market insights and property analysis tools
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Lead Management</h3>
              <p className="text-gray-600 text-sm">
                Intelligent lead qualification and client matching
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Virtual Showings</h3>
              <p className="text-gray-600 text-sm">
                Professional virtual tour and showing tools
              </p>
            </div>
          </div>
        </div>

        {/* Legal Disclaimers */}
        <LegalDisclaimers variant="compact" />

        {/* Support Information */}
        <div className="text-center mt-8">
          <p className="text-gray-600 mb-4">
            Having trouble with license verification?
          </p>
          <div className="space-x-4">
            <a
              href="mailto:support@homes2show.com"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Contact Support
            </a>
            <span className="text-gray-400">|</span>
            <a
              href="/help/license-verification"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Verification Help
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrokerAuthPage;
