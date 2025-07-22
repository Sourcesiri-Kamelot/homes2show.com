import React, { useState } from 'react';
import { getRealEstateCommission, getAllStates, searchStates } from '../../data/stateRealEstateCommissions';

/**
 * State Compliance Information Component
 * Provides links to official state real estate commissions
 * and compliance information for each state
 */

const StateComplianceInfo = ({ selectedState, onStateChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllStates, setShowAllStates] = useState(false);

  const states = getAllStates();
  const filteredStates = searchQuery ? searchStates(searchQuery) : [];
  const currentStateInfo = selectedState ? getRealEstateCommission(selectedState) : null;

  const handleStateSelect = (stateAbbr) => {
    if (onStateChange) {
      onStateChange(stateAbbr);
    }
    setShowAllStates(false);
    setSearchQuery('');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          State Real Estate Commission Information
        </h2>
        <p className="text-gray-600">
          Find your state's official real estate regulatory authority for license verification and compliance information.
        </p>
      </div>

      {/* State Search/Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Your State
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="Search for your state..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowAllStates(true);
            }}
            onFocus={() => setShowAllStates(true)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          {showAllStates && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {(searchQuery ? filteredStates : states.map(abbr => ({ ...getRealEstateCommission(abbr), abbreviation: abbr })))
                .map((state) => (
                  <button
                    key={state.abbreviation}
                    onClick={() => handleStateSelect(state.abbreviation)}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                  >
                    <div className="font-medium">{state.state} ({state.abbreviation})</div>
                    <div className="text-sm text-gray-600">{state.name}</div>
                  </button>
                ))}
            </div>
          )}
        </div>
      </div>

      {/* Selected State Information */}
      {currentStateInfo && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-blue-900 mb-4">
            {currentStateInfo.state} Real Estate Commission
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Commission Information</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium">Official Name:</span>
                  <br />
                  {currentStateInfo.name}
                </div>
                <div>
                  <span className="font-medium">Phone:</span>
                  <br />
                  <a href={`tel:${currentStateInfo.phone}`} className="text-blue-600 hover:text-blue-800">
                    {currentStateInfo.phone}
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Important Links</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <a
                    href={currentStateInfo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline block"
                  >
                    🏛️ Official Commission Website
                  </a>
                </div>
                <div>
                  <a
                    href={currentStateInfo.licenseVerification}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline block"
                  >
                    🔍 License Verification Portal
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Compliance Notice */}
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Compliance Notice</h4>
            <p className="text-yellow-700 text-sm">
              All real estate professionals must be properly licensed in {currentStateInfo.state}. 
              Verify license status through the official portal above before engaging any real estate services.
            </p>
          </div>
        </div>
      )}

      {/* General Compliance Information */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Why State Commission Information Matters
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">🛡️ Consumer Protection</h4>
            <p className="text-gray-700">
              State real estate commissions protect consumers by regulating real estate professionals, 
              investigating complaints, and enforcing licensing requirements.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">📋 License Verification</h4>
            <p className="text-gray-700">
              Always verify that your real estate professional is properly licensed and in good standing 
              with their state commission before engaging their services.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">⚖️ Legal Compliance</h4>
            <p className="text-gray-700">
              Each state has specific laws and regulations governing real estate transactions. 
              State commissions ensure compliance with these requirements.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">📞 File Complaints</h4>
            <p className="text-gray-700">
              If you have issues with a real estate professional, contact your state commission 
              to file a complaint and seek resolution.
            </p>
          </div>
        </div>
      </div>

      {/* Platform Disclaimer */}
      <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
        <h4 className="font-semibold text-red-800 mb-2">🏠 Platform Disclaimer</h4>
        <p className="text-red-700 text-sm">
          <strong>Homes2Show is NOT a real estate brokerage or licensed real estate service provider.</strong> 
          We are a technology platform that connects consumers with licensed real estate professionals. 
          All real estate transactions must be conducted through properly licensed brokers and agents 
          regulated by the appropriate state commission.
        </p>
      </div>

      {/* Quick Access to All States */}
      <div className="mt-6 text-center">
        <button
          onClick={() => setShowAllStates(!showAllStates)}
          className="text-blue-600 hover:text-blue-800 underline"
        >
          {showAllStates ? 'Hide' : 'View'} All State Commissions
        </button>
      </div>
    </div>
  );
};

export default StateComplianceInfo;
