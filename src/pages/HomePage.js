import React from 'react';
import { Link } from 'react-router-dom';
import MarketInformation from '../components/market/MarketInformation';

/**
 * HomePage Component
 * AI-enhanced landing page for Homes2Show platform
 */
const HomePage = () => {
  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?q=80&w=2070&auto=format&fit=crop"
            alt="Modern luxury home interior"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/70 via-gray-800/60 to-gray-900/70"></div>
        </div>

        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* AI Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-orange-500/20 backdrop-blur-sm border border-orange-500/30 rounded-full mb-8">
              <span className="text-orange-300 text-sm font-medium">🤖 AI-Enhanced Real Estate Platform</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              <span className="block">The Future of</span>
              <span className="block bg-gradient-to-r from-orange-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                Real Estate Showings
              </span>
            </h1>

            {/* Subheadline */}
            <p className="max-w-3xl mx-auto text-xl sm:text-2xl text-gray-300 mb-8 leading-relaxed">
              AI-powered platform connecting licensed professionals with clients. 
              <span className="text-orange-300 font-semibold"> Better than Showami</span> with 
              superior technology and enhanced compliance.
            </p>

            {/* Value Propositions */}
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2">
                <span className="text-white text-sm">⚖️ Fully Compliant</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2">
                <span className="text-white text-sm">🤖 AI-Enhanced</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2">
                <span className="text-white text-sm">🏠 All 50 States</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2">
                <span className="text-white text-sm">💰 Better Pricing</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="bg-gradient-to-r from-orange-500 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-orange-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Start Free Trial
              </Link>
              <Link
                to="/pricing"
                className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/20 transition-all duration-300"
              >
                View Pricing
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-gray-400">
              <div className="flex items-center">
                <span className="text-green-400 mr-2">✓</span>
                <span className="text-sm">Licensed Professionals Only</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-400 mr-2">✓</span>
                <span className="text-sm">NAR Settlement Compliant</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-400 mr-2">✓</span>
                <span className="text-sm">State Commission Verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Market Information Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              📊 Market Information
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access educational market data and neighborhood information. 
              <span className="text-orange-600 font-semibold"> Enhanced feature</span> not available on Showami.
            </p>
          </div>
          <MarketInformation location="National" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Homes2Show Over Showami?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Same proven business model with superior technology and enhanced features
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-6 rounded-lg bg-gradient-to-br from-orange-50 to-purple-50 border border-orange-100">
              <div className="bg-orange-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white">🤖</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI-Enhanced Matching</h3>
              <p className="text-gray-600">
                Advanced AI algorithms for better agent-client matching. Superior to Showami's manual system.
              </p>
              <div className="mt-4 text-sm text-orange-600 font-medium">
                ✨ Enhanced Feature
              </div>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-6 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100">
              <div className="bg-blue-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white">💰</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Better Value</h3>
              <p className="text-gray-600">
                $45/year Pro subscription vs Showami's $50. $2 showing discount vs their $1.
              </p>
              <div className="mt-4 text-sm text-green-600 font-medium">
                💵 Better Pricing
              </div>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-6 rounded-lg bg-gradient-to-br from-green-50 to-blue-50 border border-green-100">
              <div className="bg-green-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white">⚖️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Enhanced Compliance</h3>
              <p className="text-gray-600">
                Industry-leading compliance with real-time license verification and state integration.
              </p>
              <div className="mt-4 text-sm text-green-600 font-medium">
                🛡️ Superior Protection
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Homes2Show vs Showami
            </h2>
            <p className="text-xl text-gray-600">
              Same proven legal model + Superior technology = Better platform
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Feature</th>
                    <th className="px-6 py-4 text-center text-sm font-medium text-gray-600">Showami</th>
                    <th className="px-6 py-4 text-center text-sm font-medium text-blue-600">Homes2Show</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Legal Compliance</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">✅ Proven</td>
                    <td className="px-6 py-4 text-center text-sm text-green-600 font-medium">✅ Same + Enhanced</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">AI Technology</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">❌ None</td>
                    <td className="px-6 py-4 text-center text-sm text-blue-600 font-medium">🚀 Advanced</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Pro Subscription</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">$50/year</td>
                    <td className="px-6 py-4 text-center text-sm text-green-600 font-medium">$45/year</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Showing Discount</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">$1 per showing</td>
                    <td className="px-6 py-4 text-center text-sm text-green-600 font-medium">$2 per showing</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Market Information</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">❌ Not available</td>
                    <td className="px-6 py-4 text-center text-sm text-blue-600 font-medium">✅ Enhanced feature</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Switch from Showami?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Join thousands of licensed professionals who've upgraded to our superior platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Start Free Trial
            </Link>
            <Link
              to="/broker-auth"
              className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/20 transition-colors"
            >
              Verify License
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
