import React, { useState } from 'react';

/**
 * Legal Disclaimers Component
 * Ensures compliance with real estate laws using proven Showami approach
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
              <strong>Homes2Show is not a real estate brokerage, regulatory agency, or trade association.</strong> 
              We do not enforce any regulation or agreement. We are a technology platform that facilitates 
              connections between consumers and licensed real estate professionals. All real estate transactions 
              must be conducted through properly licensed brokers and agents.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const narSettlementNotice = (
    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-blue-800">
            📋 NAR SETTLEMENT COMPLIANCE
          </h3>
          <div className="mt-2 text-sm text-blue-700">
            <p>
              We are available in all 50 states to both NAR (National Association of Realtors) and 
              non-NAR affiliated licensees. Showing agents and initiating agents are expected to 
              cooperate with each other to comply with state laws.
            </p>
            <div className="mt-2">
              <a 
                href="https://www.nar.realtor/the-facts/nar-settlement-faqs" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                View NAR Settlement FAQ →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const buyerAgreementNotice = (
    <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-green-800">
            📝 BUYER AGREEMENT INFORMATION
          </h3>
          <div className="mt-2 text-sm text-green-700">
            <p>
              <strong>Homes2Show does not require Buyer Agreements.</strong> We do not enforce any 
              regulation or agreement because we are not a real estate brokerage, regulatory agency, 
              or trade association.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  if (variant === 'compact') {
    return (
      <div className={`${className}`}>
        <div className="bg-red-100 border border-red-300 rounded-md p-3">
          <p className="text-xs text-red-800">
            <strong>Legal Notice:</strong> Homes2Show is not a real estate brokerage, regulatory agency, 
            or trade association. We do not enforce regulations or agreements.
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="ml-2 text-red-600 underline hover:text-red-800"
            >
              {isExpanded ? 'Hide Details' : 'View Full Information'}
            </button>
          </p>
        </div>
        {isExpanded && (
          <div className="mt-4 space-y-4">
            {primaryDisclaimer}
            {narSettlementNotice}
            {buyerAgreementNotice}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      {primaryDisclaimer}
      {narSettlementNotice}
      {buyerAgreementNotice}
      
      <div className="text-center">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm text-gray-600 hover:text-gray-800 underline"
        >
          {isExpanded ? 'Hide Complete Legal Information' : 'View Complete Legal Information'}
        </button>
      </div>
      
      {isExpanded && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mt-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Complete Legal Information</h3>
          
          <div className="space-y-4 text-sm text-gray-700">
            <div>
              <h4 className="font-semibold text-gray-900">Platform Purpose</h4>
              <p>
                Homes2Show is a technology platform that connects consumers with licensed real estate 
                professionals. We facilitate property showings, lead generation, and communication 
                between buyers, sellers, and licensed agents.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900">No Brokerage Services</h4>
              <p>
                We do not provide real estate brokerage services, property valuations, investment advice, 
                or market predictions. We do not negotiate transactions, handle contracts, or provide 
                professional real estate services of any kind.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900">Consumer Protection</h4>
              <p>
                Consumers should always verify the license status of real estate professionals before 
                engaging their services. We provide tools and links to help with this verification 
                but are not responsible for the actions of licensed professionals.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* State Commission Links */}
      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-semibold text-blue-900 mb-2">
          📍 State Real Estate Commission Information
        </h4>
        <p className="text-blue-800 text-sm mb-2">
          Find your state's Real Estate Commission for license verification and regulatory information:
        </p>
        <a 
          href="/state-commissions" 
          className="text-blue-600 hover:text-blue-800 underline font-medium"
        >
          View All 50 State Real Estate Commissions →
        </a>
      </div>
    </div>
  );
};

export default LegalDisclaimers;
