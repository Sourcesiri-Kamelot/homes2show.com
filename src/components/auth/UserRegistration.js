import React, { useState } from 'react';
import { getRealEstateCommission } from '../../data/stateRealEstateCommissions';

/**
 * User Registration Component
 * Implements Showami's exact user categories and verification process
 * 
 * User Types (Matching Showami Exactly):
 * - Initiating Agent: Licensed agent seeking showing services
 * - Showing Agent: Licensed agent providing showing services  
 * - Property Manager: Property management company
 * - Client: Individual seeking property access
 * - Brokerage: Licensed brokerage monitoring agents
 */

const UserRegistration = ({ onRegistrationSuccess, onRegistrationFailure }) => {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState('');
  const [formData, setFormData] = useState({
    // Basic Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // User Type Specific
    licenseNumber: '',
    state: '',
    brokerageName: '',
    mlsId: '',
    
    // For Property Managers
    companyName: '',
    propertyCount: '',
    
    // For Brokerages
    brokerageType: '',
    agentCount: '',
    
    // For Agents
    supervisingBroker: '',
    supervisingBrokerLicense: '',
    yearsExperience: ''
  });
  
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [errors, setErrors] = useState({});

  const userTypes = [
    {
      id: 'initiating-agent',
      title: 'Initiating Agent',
      description: 'Licensed real estate agent/broker seeking showing services for clients',
      icon: '🏠',
      requiresLicense: true,
      details: 'Real estate agent/broker actively licensed to represent buyers and sellers with MLS access'
    },
    {
      id: 'showing-agent',
      title: 'Showing Agent',
      description: 'Licensed real estate agent providing property access services',
      icon: '🔑',
      requiresLicense: true,
      details: 'Licensed real estate agent seeking to provide property access for other agents\' clients'
    },
    {
      id: 'property-manager',
      title: 'Property Manager',
      description: 'Property management company showing rental properties',
      icon: '🏢',
      requiresLicense: false,
      details: 'Person or company that oversees rental properties and shows them to potential tenants'
    },
    {
      id: 'client',
      title: 'Client',
      description: 'Individual seeking to view properties directly',
      icon: '👤',
      requiresLicense: false,
      details: 'Person attempting to view real estate on their own behalf'
    },
    {
      id: 'brokerage',
      title: 'Brokerage',
      description: 'Licensed real estate brokerage monitoring agents',
      icon: '🏛️',
      requiresLicense: true,
      details: 'Duly licensed real estate brokerage monitoring agents who use the platform'
    }
  ];

  const states = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];

  const selectedUserType = userTypes.find(type => type.id === userType);
  const stateCommissionInfo = formData.state ? getRealEstateCommission(formData.state) : null;

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

  const validateStep = (stepNumber) => {
    const newErrors = {};
    
    if (stepNumber === 1) {
      if (!userType) {
        newErrors.userType = 'Please select a user type';
      }
    }
    
    if (stepNumber === 2) {
      if (!formData.firstName.trim()) {
        newErrors.firstName = 'First name is required';
      }
      if (!formData.lastName.trim()) {
        newErrors.lastName = 'Last name is required';
      }
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      }
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required';
      }
      
      // License requirements for licensed user types
      if (selectedUserType?.requiresLicense) {
        if (!formData.licenseNumber.trim()) {
          newErrors.licenseNumber = 'License number is required';
        }
        if (!formData.state) {
          newErrors.state = 'State is required';
        }
        if (!formData.brokerageName.trim()) {
          newErrors.brokerageName = 'Brokerage name is required';
        }
      }
      
      // Property Manager specific
      if (userType === 'property-manager') {
        if (!formData.companyName.trim()) {
          newErrors.companyName = 'Company name is required';
        }
      }
      
      // Brokerage specific
      if (userType === 'brokerage') {
        if (!formData.brokerageType) {
          newErrors.brokerageType = 'Brokerage type is required';
        }
      }
      
      // Agent specific (for showing agents)
      if (userType === 'showing-agent' || userType === 'initiating-agent') {
        if (!formData.supervisingBroker.trim()) {
          newErrors.supervisingBroker = 'Supervising broker is required';
        }
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep(2)) return;
    
    setIsVerifying(true);
    setVerificationStatus(null);
    
    try {
      const registrationData = {
        userType,
        ...formData,
        stateCommissionInfo,
        requiresLicense: selectedUserType?.requiresLicense
      };
      
      const response = await fetch('/api/register-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData)
      });
      
      const result = await response.json();
      
      if (result.success) {
        setVerificationStatus({
          type: 'success',
          message: 'Registration successful!',
          details: result.message
        });
        
        if (onRegistrationSuccess) {
          onRegistrationSuccess(result);
        }
      } else {
        setVerificationStatus({
          type: 'error',
          message: 'Registration failed',
          details: result.message || 'Unable to complete registration'
        });
        
        if (onRegistrationFailure) {
          onRegistrationFailure(result);
        }
      }
    } catch (error) {
      console.error('Registration error:', error);
      setVerificationStatus({
        type: 'error',
        message: 'Registration system temporarily unavailable',
        details: 'Please try again later or contact support'
      });
      
      if (onRegistrationFailure) {
        onRegistrationFailure({ error: error.message });
      }
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className={`flex items-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}>
              1
            </div>
            <span className="ml-2 font-medium">User Type</span>
          </div>
          <div className={`flex items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}>
              2
            </div>
            <span className="ml-2 font-medium">Information</span>
          </div>
          <div className={`flex items-center ${step >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}>
              3
            </div>
            <span className="ml-2 font-medium">Verification</span>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Step 1: User Type Selection */}
      {step === 1 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Select Your User Type
          </h2>
          <p className="text-gray-600 mb-6">
            Choose the category that best describes how you'll use Homes2Show:
          </p>
          
          <div className="space-y-4">
            {userTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setUserType(type.id)}
                className={`w-full p-4 text-left border rounded-lg transition-colors ${
                  userType === type.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start">
                  <div className="text-2xl mr-4">{type.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {type.title}
                      {type.requiresLicense && (
                        <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                          License Required
                        </span>
                      )}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">{type.description}</p>
                    <p className="text-gray-500 text-xs">{type.details}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
          
          {errors.userType && (
            <p className="text-red-500 text-sm mt-2">{errors.userType}</p>
          )}
          
          <div className="mt-8 flex justify-end">
            <button
              onClick={handleNext}
              disabled={!userType}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Information Form */}
      {step === 2 && selectedUserType && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {selectedUserType.title} Information
          </h2>
          
          <form className="space-y-4">
            {/* Basic Information */}
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
                />
                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>

            {/* License Information (for licensed user types) */}
            {selectedUserType.requiresLicense && (
              <>
                <div className="border-t pt-4 mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    License Information
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
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
                  />
                  {errors.brokerageName && <p className="text-red-500 text-xs mt-1">{errors.brokerageName}</p>}
                </div>

                {/* State Commission Information */}
                {stateCommissionInfo && (
                  <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                    <h4 className="font-semibold text-blue-900 text-sm mb-2">
                      {stateCommissionInfo.state} Real Estate Commission
                    </h4>
                    <div className="text-xs text-blue-800 space-y-1">
                      <div>
                        <strong>Commission:</strong> {stateCommissionInfo.name}
                      </div>
                      <div>
                        <strong>Phone:</strong> {stateCommissionInfo.phone}
                      </div>
                      <div className="flex space-x-4 mt-2">
                        <a
                          href={stateCommissionInfo.licenseVerification}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 underline"
                        >
                          Verify License
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* User Type Specific Fields */}
            {userType === 'property-manager' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name *
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.companyName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>}
              </div>
            )}
          </form>

          <div className="mt-8 flex justify-between">
            <button
              onClick={handleBack}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Verification */}
      {step === 3 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Account Verification
          </h2>
          
          {verificationStatus && (
            <div className={`mb-6 p-4 rounded-md ${
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

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-gray-900 mb-4">Registration Summary</h3>
            <div className="space-y-2 text-sm">
              <div><strong>User Type:</strong> {selectedUserType.title}</div>
              <div><strong>Name:</strong> {formData.firstName} {formData.lastName}</div>
              <div><strong>Email:</strong> {formData.email}</div>
              <div><strong>Phone:</strong> {formData.phone}</div>
              {selectedUserType.requiresLicense && (
                <>
                  <div><strong>License:</strong> {formData.licenseNumber} ({formData.state})</div>
                  <div><strong>Brokerage:</strong> {formData.brokerageName}</div>
                </>
              )}
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-yellow-800 mb-2">Important Notice</h4>
            <p className="text-yellow-700 text-sm">
              {selectedUserType.requiresLicense 
                ? 'Your license will be verified through state regulatory databases. This may take 24-48 hours.'
                : 'Your account will be activated immediately upon submission.'
              }
            </p>
          </div>

          <div className="flex justify-between">
            <button
              onClick={handleBack}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={isVerifying || verificationStatus?.type === 'success'}
              className={`px-6 py-2 rounded-lg font-medium ${
                isVerifying || verificationStatus?.type === 'success'
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              } text-white transition-colors`}
            >
              {isVerifying ? 'Creating Account...' : 
               verificationStatus?.type === 'success' ? 'Account Created ✓' : 
               'Create Account'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserRegistration;
