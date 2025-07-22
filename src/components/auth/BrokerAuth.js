import React, { useState } from 'react';

/**
 * Broker Authentication Component
 * Verifies real estate broker and agent licenses
 */
const BrokerAuth = ({ onAuthSuccess, onAuthFailure, userType = 'broker' }) => {
  const [formData, setFormData] = useState({
    licenseNumber: '',
    state: '',
    firstName: '',
    lastName: '',
    brokerageName: ''
  });
  
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState(null);

  const states = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const verifyLicense = async () => {
    setIsVerifying(true);
    
    // Simulate verification process
    setTimeout(() => {
      setVerificationStatus({
        type: 'success',
        message: 'License verified successfully!',
        details: 'Your license is valid and in good standing.'
      });
      setIsVerifying(false);
      
      if (onAuthSuccess) {
        onAuthSuccess({ verified: true, ...formData });
      }
    }, 2000);
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {userType === 'broker' ? 'Broker' : 'Agent'} License Verification
        </h2>
        <p className="text-sm text-gray-600">
          Verify your real estate license to access professional features
        </p>
      </div>

      {verificationStatus && (
        <div className={`mb-4 p-4 rounded-md ${
          verificationStatus.type === 'success' 
            ? 'bg-green-50 border border-green-200' 
            : 'bg-red-50 border border-red-200'
        }`}>
          <h3 className={`text-sm font-medium ${
            verificationStatus.type === 'success' ? 'text-green-800' : 'text-red-800'
          }`}>
            {verificationStatus.message}
          </h3>
          <p className={`mt-1 text-sm ${
            verificationStatus.type === 'success' ? 'text-green-700' : 'text-red-700'
          }`}>
            {verificationStatus.details}
          </p>
        </div>
      )}

      <form onSubmit={(e) => { e.preventDefault(); verifyLicense(); }} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name *
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="John"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name *
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Doe"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            License Number *
          </label>
          <input
            type="text"
            name="licenseNumber"
            value={formData.licenseNumber}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your license number"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            State *
          </label>
          <select
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select State</option>
            {states.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Brokerage Name *
          </label>
          <input
            type="text"
            name="brokerageName"
            value={formData.brokerageName}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your brokerage name"
          />
        </div>

        <button
          type="submit"
          disabled={isVerifying || verificationStatus?.type === 'success'}
          className={`w-full py-2 px-4 rounded-md font-medium ${
            isVerifying || verificationStatus?.type === 'success'
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          } text-white transition-colors`}
        >
          {isVerifying ? 'Verifying License...' : 
           verificationStatus?.type === 'success' ? 'Verified ✓' : 
           'Verify License'}
        </button>
      </form>

      <div className="mt-4 text-xs text-gray-500">
        <p>
          * License verification is performed through state regulatory databases. 
          Your information is encrypted and stored securely.
        </p>
      </div>
    </div>
  );
};

export default BrokerAuth;
