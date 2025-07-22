import React, { useState } from 'react';

/**
 * Legal Disclaimers Component
 * Ensures compliance with real estate laws and regulations
 * 
 * CRITICAL: This component must be displayed on every page
 * to maintain legal compliance and protect against liability
 */

const LegalDisclaimers = ({ variant = 'full', className = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const primaryDisclaimer = (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">
            🏠 IMPORTANT LEGAL NOTICE
          </h3>
          <div className="mt-2 text-sm text-red-700">
            <p>
              <strong>Homes2Show is NOT a real estate brokerage, agent, or licensed professional.</strong> 
              We are a technology platform that connects consumers with licensed real estate professionals. 
              All real estate transactions must be conducted through properly licensed brokers and agents. 
              We do not provide real estate advice, valuations, or brokerage services.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const aiDisclaimer = (
    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-blue-800">
            🤖 AI ASSISTANCE NOTICE
          </h3>
          <div className="mt-2 text-sm text-blue-700">
            <p>
              Our AI tools provide general information only and should not be considered professional 
              real estate advice. All property decisions should be made in consultation with licensed 
              real estate professionals. AI-generated content is for informational purposes only.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const dataDisclaimer = (
    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-4">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-yellow-800">
            📊 DATA ACCURACY NOTICE
          </h3>
          <div className="mt-2 text-sm text-yellow-700">
            <p>
              Property information is sourced from public records and third-party providers. 
              We do not guarantee accuracy, completeness, or timeliness of data. Always verify 
              information with licensed professionals and official sources.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const expandedDisclaimers = (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mt-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Complete Legal Disclaimers</h3>
      
      <div className="space-y-4 text-sm text-gray-700">
        <div>
          <h4 className="font-semibold text-gray-900">No Brokerage Services</h4>
          <p>
            Homes2Show does not provide real estate brokerage services, act as a real estate agent, 
            or provide real estate advice. We are solely a technology platform that facilitates 
            connections between consumers and licensed real estate professionals.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900">Licensed Professional Requirement</h4>
          <p>
            All real estate transactions, advice, and services must be provided by properly licensed 
            real estate brokers and agents in accordance with state and local laws. Users must verify 
            the license status of any real estate professional before engaging their services.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900">No Valuations or Appraisals</h4>
          <p>
            We do not provide property valuations, appraisals, comparative market analyses (CMAs), 
            or investment advice. Any property information displayed is for general informational 
            purposes only and should not be relied upon for financial decisions.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900">State Compliance</h4>
          <p>
            Real estate laws vary by state and locality. Users are responsible for ensuring compliance 
            with applicable laws in their jurisdiction. This platform may not be available in all areas.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900">Limitation of Liability</h4>
          <p>
            Homes2Show disclaims all liability for any decisions made based on information provided 
            through this platform. Users assume all risks associated with real estate transactions 
            and should seek professional advice.
          </p>
        </div>
      </div>
    </div>
  );

  if (variant === 'compact') {
    return (
      <div className={`${className}`}>
        <div className="bg-red-100 border border-red-300 rounded-md p-3">
          <p className="text-xs text-red-800">
            <strong>Legal Notice:</strong> Homes2Show is NOT a real estate brokerage. 
            All transactions must be conducted through licensed professionals.
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="ml-2 text-red-600 underline hover:text-red-800"
            >
              {isExpanded ? 'Hide Details' : 'View Full Disclaimers'}
            </button>
          </p>
        </div>
        {isExpanded && expandedDisclaimers}
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      {primaryDisclaimer}
      {aiDisclaimer}
      {dataDisclaimer}
      
      <div className="text-center">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm text-gray-600 hover:text-gray-800 underline"
        >
          {isExpanded ? 'Hide Complete Legal Disclaimers' : 'View Complete Legal Disclaimers'}
        </button>
      </div>
      
      {isExpanded && expandedDisclaimers}
    </div>
  );
};

export default LegalDisclaimers;
