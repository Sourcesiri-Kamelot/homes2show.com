import React, { useState, useEffect } from 'react';

/**
 * Market Information Component (Legally Compliant)
 * Provides educational market data without predictions or valuations
 * 
 * CRITICAL: This component provides information only, NOT insights, analysis, or advice
 * All content is educational and requires professional verification
 */

const MarketInformation = ({ location = 'National' }) => {
  const [marketData, setMarketData] = useState(null);
  const [selectedMetric, setSelectedMetric] = useState('activity');
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);

  // Sample market data (in production, this would come from public APIs)
  const sampleMarketData = {
    activity: {
      title: 'Market Activity',
      data: [
        { label: 'Active Listings', value: '12,456', change: '+2.3%', period: 'vs last month' },
        { label: 'Recent Sales', value: '3,789', change: '+5.1%', period: 'last 30 days' },
        { label: 'Average Days on Market', value: '28 days', change: '-3 days', period: 'vs last month' },
        { label: 'New Listings', value: '4,123', change: '+1.8%', period: 'last 30 days' }
      ]
    },
    demographics: {
      title: 'Area Demographics',
      data: [
        { label: 'Population', value: '125,000', change: '+1.2%', period: 'annual growth' },
        { label: 'Median Age', value: '34 years', change: 'stable', period: 'vs last year' },
        { label: 'Households', value: '48,500', change: '+0.8%', period: 'annual growth' },
        { label: 'Employment Rate', value: '94.2%', change: '+0.5%', period: 'vs last year' }
      ]
    },
    amenities: {
      title: 'Neighborhood Amenities',
      data: [
        { label: 'Schools (Rated 8+)', value: '15', change: '+2', period: 'new this year' },
        { label: 'Parks & Recreation', value: '23', change: '+1', period: 'new facilities' },
        { label: 'Shopping Centers', value: '8', change: 'stable', period: 'major centers' },
        { label: 'Public Transit', value: '12 routes', change: '+2', period: 'new routes' }
      ]
    }
  };

  useEffect(() => {
    // Simulate API call for market data
    setMarketData(sampleMarketData);
  }, [location]);

  const metrics = [
    { id: 'activity', label: 'Market Activity', icon: '📊' },
    { id: 'demographics', label: 'Demographics', icon: '👥' },
    { id: 'amenities', label: 'Amenities', icon: '🏫' }
  ];

  if (!disclaimerAccepted) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            📊 Market Information
          </h2>
          <p className="text-gray-600">
            Access educational market data and neighborhood information
          </p>
        </div>

        {/* Legal Disclaimer */}
        <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-6">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-red-800 mb-3">
                ⚠️ IMPORTANT LEGAL NOTICE
              </h3>
              <div className="text-sm text-red-700 space-y-2">
                <p>
                  <strong>This market information is for educational purposes only</strong> and should not be considered:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Professional real estate advice or analysis</li>
                  <li>Property valuations or appraisals</li>
                  <li>Investment recommendations or guidance</li>
                  <li>Market predictions or forecasts</li>
                  <li>Comparative market analysis (CMA)</li>
                </ul>
                <p className="mt-3">
                  <strong>Homes2Show is not a real estate brokerage, regulatory agency, or trade association.</strong> 
                  We do not provide professional real estate services. All real estate decisions should be made in 
                  consultation with licensed real estate professionals.
                </p>
                <p className="mt-2">
                  Market information is sourced from public records and third-party data providers. We do not 
                  guarantee accuracy, completeness, or timeliness. Always verify information with licensed 
                  professionals and official sources.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Acceptance Checkbox */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <label className="flex items-start cursor-pointer">
            <input
              type="checkbox"
              checked={disclaimerAccepted}
              onChange={(e) => setDisclaimerAccepted(e.target.checked)}
              className="mt-1 mr-3"
            />
            <span className="text-sm text-gray-700">
              I understand that this information is educational only and not professional real estate advice. 
              I will consult with licensed real estate professionals for any real estate decisions.
            </span>
          </label>
        </div>

        <div className="text-center">
          <button
            onClick={() => setDisclaimerAccepted(true)}
            disabled={!disclaimerAccepted}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            View Market Information
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          📊 Market Information - {location}
        </h2>
        <p className="text-gray-600">
          Educational market data and neighborhood information
        </p>
        
        {/* Compact Disclaimer */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-4">
          <p className="text-yellow-800 text-sm">
            <strong>Educational Information Only:</strong> Not professional advice. 
            Consult licensed real estate professionals for market analysis.
          </p>
        </div>
      </div>

      {/* Metric Selector */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 p-1 rounded-lg">
          {metrics.map((metric) => (
            <button
              key={metric.id}
              onClick={() => setSelectedMetric(metric.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedMetric === metric.id
                  ? 'bg-white text-gray-900 shadow'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span className="mr-2">{metric.icon}</span>
              {metric.label}
            </button>
          ))}
        </div>
      </div>

      {/* Market Data Display */}
      {marketData && marketData[selectedMetric] && (
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
            {marketData[selectedMetric].title}
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {marketData[selectedMetric].data.map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">
                  {item.value}
                </div>
                <div className="text-sm font-medium text-gray-900 mb-1">
                  {item.label}
                </div>
                <div className="text-xs text-gray-600">
                  <span className={`font-medium ${
                    item.change.includes('+') ? 'text-green-600' : 
                    item.change.includes('-') ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {item.change}
                  </span>
                  <span className="ml-1">{item.period}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Data Sources */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-blue-900 mb-2">📋 Data Sources</h4>
        <div className="text-blue-800 text-sm space-y-1">
          <p>• Public records and government databases</p>
          <p>• Census and demographic data</p>
          <p>• Municipal planning and zoning information</p>
          <p>• School district and amenity databases</p>
          <p className="mt-2 font-medium">
            All data is historical and for educational purposes only.
          </p>
        </div>
      </div>

      {/* Professional Referral CTA */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <h3 className="text-lg font-bold text-green-900 mb-2">
          🏠 Need Professional Market Analysis?
        </h3>
        <p className="text-green-800 text-sm mb-4">
          For property valuations, investment advice, and professional market analysis, 
          connect with licensed real estate professionals in your area.
        </p>
        <div className="space-x-4">
          <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
            Find Licensed Agents
          </button>
          <button className="bg-white text-green-600 border border-green-600 px-6 py-2 rounded-lg hover:bg-green-50 transition-colors">
            Get Professional CMA
          </button>
        </div>
      </div>

      {/* Educational Resources */}
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        <div className="text-center">
          <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
            <span className="text-2xl">📚</span>
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">Learn About Markets</h4>
          <p className="text-gray-600 text-sm">
            Educational resources about reading and understanding real estate market data.
          </p>
        </div>
        
        <div className="text-center">
          <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
            <span className="text-2xl">🏠</span>
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">Find Professionals</h4>
          <p className="text-gray-600 text-sm">
            Connect with licensed real estate agents and brokers for professional guidance.
          </p>
        </div>
        
        <div className="text-center">
          <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
            <span className="text-2xl">📊</span>
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">Request Analysis</h4>
          <p className="text-gray-600 text-sm">
            Get professional comparative market analysis from licensed professionals.
          </p>
        </div>
      </div>

      {/* Final Disclaimer */}
      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <p className="text-xs text-gray-600 text-center">
          <strong>Reminder:</strong> This information is educational only. Homes2Show is not a real estate 
          brokerage and does not provide professional real estate services. Always consult with licensed 
          real estate professionals for advice, valuations, and market analysis.
        </p>
      </div>
    </div>
  );
};

export default MarketInformation;
