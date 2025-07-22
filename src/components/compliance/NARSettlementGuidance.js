import React, { useState } from 'react';

/**
 * NAR Settlement Guidance Component
 * Provides guidance on NAR Settlement compliance for showing scenarios
 * Based on Showami's proven compliance model
 */

const NARSettlementGuidance = () => {
  const [selectedScenario, setSelectedScenario] = useState('');

  const showingScenarios = [
    {
      id: 'unrepresented-buyer',
      title: 'Unrepresented Buyer Viewing',
      description: 'Listing agent shows property to buyer without representation',
      buyerAgreementRequired: false,
      narReference: 'Article 61',
      details: 'If a listing agent represents a seller and an unrepresented buyer wants to view their listing, that listing agent or an agent acting on the listing agent\'s behalf may show the property without a "Buyer\'s Agreement".',
      allowedBy: 'NAR Settlement FAQ Article 61'
    },
    {
      id: 'represented-buyer',
      title: 'Represented Buyer with Agent Delegation',
      description: 'Another agent shows home on behalf of buyer\'s agent',
      buyerAgreementRequired: true,
      narReference: 'Article 62',
      details: 'For NAR Members who have a Buyer Agreement with a client being shown a home, it is permissible to have another agent show the home on their behalf.',
      allowedBy: 'NAR Settlement FAQ Article 62'
    },
    {
      id: 'open-house',
      title: 'Open House Events',
      description: 'Public open house showings',
      buyerAgreementRequired: false,
      narReference: 'General Exception',
      details: 'Open houses are generally exempt from buyer agreement requirements as they are public events.',
      allowedBy: 'Standard industry practice'
    },
    {
      id: 'rental-showing',
      title: 'Rental Property Showings',
      description: 'Property management or landlord initiated showings',
      buyerAgreementRequired: false,
      narReference: 'Non-purchase transaction',
      details: 'Rental showings initiated by property management companies or landlords do not require buyer agreements.',
      allowedBy: 'Non-purchase transaction exception'
    },
    {
      id: 'inspection-access',
      title: 'Inspector/Appraiser Access',
      description: 'Property access for inspections and appraisals',
      buyerAgreementRequired: false,
      narReference: 'Service access',
      details: 'Opening doors for inspectors, appraisers, and other service providers does not require buyer agreements.',
      allowedBy: 'Service access exception'
    },
    {
      id: 'non-nar-agent',
      title: 'Non-NAR Affiliated Agent',
      description: 'Agents not affiliated with NAR in states without buyer agreement requirements',
      buyerAgreementRequired: false,
      narReference: 'State-specific',
      details: 'Non-NAR affiliated real estate agents in states where Buyer Agreements are not required would not be required to have a Buyer Agreement.',
      allowedBy: 'State law variation'
    }
  ];

  const selectedScenarioData = showingScenarios.find(s => s.id === selectedScenario);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          📋 NAR Settlement Compliance Guidance
        </h2>
        <p className="text-gray-600">
          Understanding when buyer agreements are required for property showings under the NAR Settlement.
        </p>
      </div>

      {/* Key Information */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-blue-900 mb-2">Important Notice</h3>
        <p className="text-blue-800 text-sm mb-3">
          <strong>Homes2Show does not require Buyer Agreements.</strong> We do not enforce any regulation 
          or agreement because we are not a real estate brokerage, regulatory agency, or trade association.
        </p>
        <div className="flex flex-wrap gap-2">
          <a
            href="https://www.nar.realtor/the-facts/nar-settlement-faqs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full hover:bg-blue-200 transition-colors"
          >
            📖 NAR Settlement FAQ
            <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>

      {/* Scenario Selection */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Select a Showing Scenario:
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {showingScenarios.map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => setSelectedScenario(scenario.id)}
              className={`p-3 text-left border rounded-lg transition-colors ${
                selectedScenario === scenario.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="font-medium text-gray-900 text-sm mb-1">
                {scenario.title}
              </div>
              <div className="text-xs text-gray-600">
                {scenario.description}
              </div>
              <div className={`text-xs mt-2 font-medium ${
                scenario.buyerAgreementRequired ? 'text-orange-600' : 'text-green-600'
              }`}>
                {scenario.buyerAgreementRequired ? '📝 Agreement Required' : '✅ No Agreement Needed'}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Scenario Details */}
      {selectedScenarioData && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            {selectedScenarioData.title}
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Scenario Details</h4>
              <p className="text-gray-700 text-sm mb-4">
                {selectedScenarioData.details}
              </p>
              
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                selectedScenarioData.buyerAgreementRequired
                  ? 'bg-orange-100 text-orange-800'
                  : 'bg-green-100 text-green-800'
              }`}>
                {selectedScenarioData.buyerAgreementRequired ? '📝' : '✅'}
                <span className="ml-1">
                  {selectedScenarioData.buyerAgreementRequired 
                    ? 'Buyer Agreement Required' 
                    : 'No Buyer Agreement Required'}
                </span>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Legal Basis</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Reference:</span>
                  <span className="ml-2 text-gray-600">{selectedScenarioData.narReference}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Allowed by:</span>
                  <span className="ml-2 text-gray-600">{selectedScenarioData.allowedBy}</span>
                </div>
              </div>

              {selectedScenarioData.narReference.includes('Article') && (
                <div className="mt-3">
                  <a
                    href="https://www.nar.realtor/the-facts/nar-settlement-faqs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline text-sm"
                  >
                    View {selectedScenarioData.narReference} in NAR FAQ →
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Agent Cooperation Information */}
      <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
        <h3 className="font-semibold text-green-900 mb-2">
          🤝 Agent Cooperation Guidelines
        </h3>
        <div className="text-green-800 text-sm space-y-2">
          <p>
            <strong>Showing agents and initiating agents are expected to cooperate</strong> with each 
            other to comply with state laws.
          </p>
          <p>
            It is typically the <strong>responsibility of the initiating agent</strong> to communicate 
            with their client and get any necessary forms signed.
          </p>
          <p>
            Our platform facilitates this cooperation by providing communication tools and clear 
            responsibility tracking between licensed professionals.
          </p>
        </div>
      </div>

      {/* Platform Disclaimer */}
      <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
        <h4 className="font-semibold text-red-800 mb-2">⚖️ Platform Disclaimer</h4>
        <p className="text-red-700 text-sm">
          This guidance is for informational purposes only. <strong>Homes2Show is not a real estate 
          brokerage, regulatory agency, or trade association.</strong> We do not provide legal advice 
          or enforce regulations. Licensed professionals should consult with their employing broker 
          and/or legal counsel for specific guidance on compliance requirements.
        </p>
      </div>

      {/* Additional Resources */}
      <div className="mt-6 text-center">
        <h4 className="font-semibold text-gray-900 mb-3">Additional Resources</h4>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="https://www.nar.realtor/the-facts/nar-settlement-faqs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            📖 NAR Settlement FAQ
          </a>
          <a
            href="/state-commissions"
            className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            🏛️ State Real Estate Commissions
          </a>
        </div>
      </div>
    </div>
  );
};

export default NARSettlementGuidance;
