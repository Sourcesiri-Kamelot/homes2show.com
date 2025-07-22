import React, { useState } from 'react';

/**
 * Property Information Assistant (Compliant Version)
 * 
 * IMPORTANT: This component provides general property information only.
 * It does NOT provide valuations, appraisals, or investment advice.
 * All information is for educational purposes and requires verification
 * by licensed real estate professionals.
 */

const PropertyInfoAssistant = ({ propertyData }) => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);

  const prohibitedQueries = [
    'price', 'value', 'worth', 'appraisal', 'market value', 'investment',
    'profit', 'appreciation', 'forecast', 'predict', 'estimate cost',
    'how much', 'valuation', 'cma', 'comparative market analysis'
  ];

  const isProhibitedQuery = (query) => {
    const lowerQuery = query.toLowerCase();
    return prohibitedQueries.some(term => lowerQuery.includes(term));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!disclaimerAccepted) {
      alert('Please accept the disclaimer before using the AI assistant.');
      return;
    }

    if (!query.trim()) return;

    // Check for prohibited queries
    if (isProhibitedQuery(query)) {
      setResponse(`
        ⚠️ I cannot provide property valuations, price estimates, or investment advice. 
        
        For property values, market analysis, or investment guidance, please consult with:
        • Licensed real estate agents
        • Certified appraisers  
        • Real estate brokers
        • Financial advisors
        
        I can help with general property information, neighborhood details, 
        property features, and connecting you with licensed professionals.
      `);
      return;
    }

    setIsLoading(true);
    
    try {
      // This would call a compliant AI service
      const aiResponse = await fetch('/api/property-info-assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          propertyData,
          complianceMode: true
        })
      });

      const data = await aiResponse.json();
      
      if (data.success) {
        setResponse(data.response + '\n\n📋 Remember: This information is for general purposes only. Always verify with licensed professionals.');
      } else {
        setResponse('I apologize, but I cannot process that request. Please try asking about general property features or neighborhood information.');
      }
    } catch (error) {
      console.error('AI Assistant error:', error);
      setResponse('I\'m temporarily unavailable. Please try again later or contact a licensed real estate professional for assistance.');
    } finally {
      setIsLoading(false);
    }
  };

  const suggestedQuestions = [
    "What are the property features?",
    "Tell me about the neighborhood",
    "What schools are nearby?",
    "What are the property taxes?",
    "How can I contact a licensed agent?",
    "What documents do I need for viewing?",
    "What are the HOA details?",
    "Tell me about local amenities"
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Compliance Disclaimer */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">
              AI Information Assistant Disclaimer
            </h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>
                This AI assistant provides general property information only. It does NOT provide:
                valuations, appraisals, investment advice, or market predictions. All information 
                must be verified by licensed real estate professionals.
              </p>
              <label className="flex items-center mt-3">
                <input
                  type="checkbox"
                  checked={disclaimerAccepted}
                  onChange={(e) => setDisclaimerAccepted(e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm">I understand and accept these limitations</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          🤖 Property Information Assistant
        </h2>
        <p className="text-gray-600">
          Ask me about property features, neighborhood information, or how to connect with licensed professionals.
        </p>
      </div>

      {/* Suggested Questions */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Suggested Questions:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {suggestedQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => setQuery(question)}
              className="text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm text-gray-700 transition-colors"
              disabled={!disclaimerAccepted}
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      {/* Query Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask about property features, neighborhood, or how to contact licensed professionals..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!disclaimerAccepted || isLoading}
          />
          <button
            type="submit"
            disabled={!disclaimerAccepted || isLoading || !query.trim()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Processing...' : 'Ask'}
          </button>
        </div>
      </form>

      {/* Response */}
      {response && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-2">AI Response:</h3>
          <div className="text-gray-700 whitespace-pre-line">
            {response}
          </div>
        </div>
      )}

      {/* Professional Contact CTA */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">
          Need Professional Assistance?
        </h3>
        <p className="text-blue-800 text-sm mb-3">
          For property valuations, market analysis, or real estate transactions, 
          connect with licensed professionals in your area.
        </p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Find Licensed Agents
        </button>
      </div>

      {/* Prohibited Queries Notice */}
      <div className="mt-4 text-xs text-gray-500">
        <p>
          <strong>Cannot provide:</strong> Property valuations, price estimates, investment advice, 
          market predictions, comparative market analysis (CMA), or appraisals.
        </p>
        <p className="mt-1">
          <strong>Can provide:</strong> General property information, neighborhood details, 
          feature explanations, and connections to licensed professionals.
        </p>
      </div>
    </div>
  );
};

export default PropertyInfoAssistant;
