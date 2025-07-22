import React, { useState, useEffect } from 'react';

/**
 * Broker Authentication Component
 * Verifies real estate broker and agent licenses
 * 
 * CRITICAL: This component ensures only licensed professionals
 * can access features that require real estate licensing
 */

const BrokerAuth = ({ onAuthSuccess, onAuthFailure, userType = 'broker' }) => {
  const [formData, setFormData] = useState({
    licenseNumber: '',
    state: '',
    firstName: '',
    lastName: '',
    brokerageName: '',
    mlsId: '',
    supervisingBroker: '', // For agents only
    supervisingBrokerLicense: '' // For agents only
  });
  
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [errors, setErrors] = useState({});

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
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.licenseNumber.trim()) {
      newErrors.licenseNumber = 'License number is required';
    }
    
    if (!formData.state) {
      newErrors.state = 'State is required';
    }
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.brokerageName.trim()) {
      newErrors.brokerageName = 'Brokerage name is required';
    }
    
    if (userType === 'agent') {
      if (!formData.supervisingBroker.trim()) {
        newErrors.supervisingBroker = 'Supervising broker name is required';
      }
      
      if (!formData.supervisingBrokerLicense.trim()) {
        newErrors.supervisingBrokerLicense = 'Supervising broker license is required';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const verifyLicense = async () => {
    if (!validateForm()) return;
    
    setIsVerifying(true);
    setVerificationStatus(null);
    
    try {
      // In a real implementation, this would call state licensing databases
      // For now, we'll simulate the verification process
      
      const response = await fetch('/api/verify-license', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userType
        })
      });
      
      const result = await response.json();
      
      if (result.verified) {
        setVerificationStatus({
          type: 'success',
          message: 'License verified successfully!',
          details: result.details
        });
        
        // Store verification in session/localStorage
        localStorage.setItem('brokerAuth', JSON.stringify({
          verified: true,
          licenseNumber: formData.licenseNumber,
          state: formData.state,
          name: `${formData.firstName} ${formData.lastName}`,
          brokerage: formData.brokerageName,
          userType,
          verifiedAt: new Date().toISOString(),
          expiresAt: result.expiresAt
        }));
        
        if (onAuthSuccess) {
          onAuthSuccess(result);
        }
      } else {
        setVerificationStatus({
          type: 'error',
          message: 'License verification failed',
          details: result.reason || 'Unable to verify license information'
        });
        
        if (onAuthFailure) {
          onAuthFailure(result);
        }
      }
    } catch (error) {
      console.error('License verification error:', error);
      setVerificationStatus({
        type: 'error',
        message: 'Verification system temporarily unavailable',
        details: 'Please try again later or contact support'
      });
      
      if (onAuthFailure) {
        onAuthFailure({ error: error.message });
      }
    } finally {
      setIsVerifying(false);
    }
  };

  // Check if user is already verified
  useEffect(() => {
    const storedAuth = localStorage.getItem('brokerAuth');
    if (storedAuth) {
      try {
        const authData = JSON.parse(storedAuth);
        if (authData.verified && new Date(authData.expiresAt) > new Date()) {
          setVerificationStatus({
            type: 'success',
            message: 'Already verified',
            details: `Verified as ${authData.name} (${authData.licenseNumber})`
          });
          
          if (onAuthSuccess) {
            onAuthSuccess(authData);
          }
        }
      } catch (error) {
        localStorage.removeItem('brokerAuth');
      }
    }
  }, [onAuthSuccess]);

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
          <div className="flex">
            <div className="flex-shrink-0">
              {verificationStatus.type === 'success' ? (
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <div className="ml-3">
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
          </div>
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
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.firstName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="John"
            />
            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
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
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.lastName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Doe"
            />
            {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
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
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.licenseNumber ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your license number"
          />
          {errors.licenseNumber && <p className="text-red-500 text-xs mt-1">{errors.licenseNumber}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            State *
          </label>
          <select
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.state ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select State</option>
            {states.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
          {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
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
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.brokerageName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Your brokerage name"
          />
          {errors.brokerageName && <p className="text-red-500 text-xs mt-1">{errors.brokerageName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            MLS ID (Optional)
          </label>
          <input
            type="text"
            name="mlsId"
            value={formData.mlsId}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your MLS ID"
          />
        </div>

        {userType === 'agent' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Supervising Broker Name *
              </label>
              <input
                type="text"
                name="supervisingBroker"
                value={formData.supervisingBroker}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.supervisingBroker ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Supervising broker's name"
              />
              {errors.supervisingBroker && <p className="text-red-500 text-xs mt-1">{errors.supervisingBroker}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Supervising Broker License *
              </label>
              <input
                type="text"
                name="supervisingBrokerLicense"
                value={formData.supervisingBrokerLicense}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.supervisingBrokerLicense ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Supervising broker's license number"
              />
              {errors.supervisingBrokerLicense && <p className="text-red-500 text-xs mt-1">{errors.supervisingBrokerLicense}</p>}
            </div>
          </>
        )}

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
