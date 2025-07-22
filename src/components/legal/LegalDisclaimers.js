import React, { useState } from 'react';

/**
 * Legal Disclaimers Component (Updated to match Showami model)
 * Ensures compliance with real estate laws using proven Showami approach
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
              cooperate with each other to comply with state laws. It is typically the responsibility 
              of the initiating agent to communicate with their client and get any necessary forms signed.
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
              or trade association. There are scenarios within the NAR Settlement Agreement that allow 
              property tours without a buyer agency agreement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const aiDisclaimer = (
    <div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-4">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-purple-800">
            🤖 AI ASSISTANCE NOTICE
          </h3>
          <div className="mt-2 text-sm text-purple-700">
            <p>
              Our AI tools provide general property information and facilitate connections with 
              licensed professionals. AI-generated content is for informational purposes only 
              and should not be considered professional real estate advice. All property decisions 
              should be made in consultation with licensed real estate professionals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const expandedDisclaimers = (
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
          <h4 className="font-semibold text-gray-900">Agent Cooperation</h4>
          <p>
            Our platform supports cooperation between showing agents and initiating agents in 
            compliance with state laws and NAR guidelines. Licensed professionals maintain 
            responsibility for their client relationships and required documentation.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900">Showing Scenarios</h4>
          <p>
            We support various showing scenarios including: listing agents showing to unrepresented 
            buyers, agent delegation for represented buyers, open houses, rental showings, and 
            property access for inspectors and appraisers.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900">State Compliance</h4>
          <p>
            Real estate laws vary by state. We provide links to all 50 state Real Estate Commissions 
            to help users understand their local requirements. Licensed professionals are responsible 
            for compliance with applicable state and local laws.
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
        {isExpanded && expandedDisclaimers}
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      {primaryDisclaimer}
      {narSettlementNotice}
      {buyerAgreementNotice}
      {aiDisclaimer}
      
      <div className="text-center">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm text-gray-600 hover:text-gray-800 underline"
        >
          {isExpanded ? 'Hide Complete Legal Information' : 'View Complete Legal Information'}
        </button>
      </div>
      
      {isExpanded && expandedDisclaimers}

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
