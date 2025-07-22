import React from 'react';
import { Link } from 'react-router-dom';
import nyashaImage from '../assets/images/neenew.png';
import QuantumSection from '../components/QuantumSection';
import MarketInformation from '../components/market/MarketInformation';

/**
 * HomePage Component
 * AI-enhanced landing page for Homes2Show platform
 * Features intelligent design and conversion optimization
 * Created by: Nyasha Bivins | Powered by: Helo IM AI Inc.
 */
const HomePage = () => {
  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* AI-themed background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-3/4 left-1/2 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?q=80&w=2070&auto=format&fit=crop"
            alt="Modern luxury home interior showcasing AI-powered real estate technology"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/70 via-gray-800/60 to-gray-900/70"></div>
          
          {/* AI Grid Overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full" style={{
              backgroundImage: `
                linear-gradient(rgba(249, 115, 22, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(249, 115, 22, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}></div>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* AI Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-orange-500/20 backdrop-blur-sm border border-orange-500/30 rounded-full mb-8">
              <svg className="w-4 h-4 text-orange-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
              </svg>
              <span className="text-orange-300 text-sm font-medium">AI-Enhanced Real Estate Platform</span>
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

      {/* Quantum Section */}
      <QuantumSection />

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
              </svg>
              <span className="text-orange-300 text-sm font-medium">Powered by Advanced AI</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl mb-6">
              <span className="block">Smarter Showings,</span>
              <span className="block bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                Better Business
              </span>
            </h1>

            {/* Subheadline */}
            <p className="mt-6 text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Leverage <span className="text-orange-400 font-semibold">artificial intelligence</span> to connect with showing agents, 
              optimize your schedule, and close more deals. Never miss an opportunity with our 
              <span className="text-orange-400 font-semibold"> intelligent automation</span>.
            </p>

            {/* AI Features Preview */}
            <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-gray-300">
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-3 py-2 rounded-full">
                <svg className="w-4 h-4 text-orange-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 3C6.13 3 3 6.13 3 10s3.13 7 7 7 7-3.13 7-7-3.13-7-7-7zm1 10.93c0 .04-.02.06-.07.06H8.93c-.05 0-.07-.02-.07-.06v-.86c0-.05.02-.07.07-.07h.54c.72 0 1.3-.58 1.3-1.3 0-.72-.58-1.3-1.3-1.3H8.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h.97c1.28 0 2.3 1.02 2.3 2.3 0 .85-.46 1.58-1.14 1.98v.25zm0-3.43c0 .05-.02.07-.07.07H9.07c-.05 0-.07-.02-.07-.07V9.64c0-.05.02-.07.07-.07h1.86c.05 0 .07.02.07.07v.86z"/>
                </svg>
                AI Pricing Assistant
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-3 py-2 rounded-full">
                <svg className="w-4 h-4 text-purple-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"/>
                </svg>
                Smart Matching
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-3 py-2 rounded-full">
                <svg className="w-4 h-4 text-blue-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
                </svg>
                Market Insights
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-12 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
              <Link
                to="/signup"
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-2xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-500/50"
              >
                <span className="relative z-10">Start Your Free Trial</span>
                <svg className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                
                {/* Button glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-gray-300">
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full border-2 border-white/20"></div>
                  ))}
                </div>
                <span className="ml-3 text-sm">500+ Active Agents</span>
              </div>
              <div className="flex items-center">
                <div className="flex text-yellow-400">
                  {[1,2,3,4,5].map((i) => (
                    <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-sm">4.9/5 Rating</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                <span className="text-sm">AI Online 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Preview Section */}
      <div className="relative py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Intelligence That Works For You
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our AI doesn't just automate—it optimizes, predicts, and adapts to make you more successful.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* AI Feature 1 */}
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-orange-500 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 3C6.13 3 3 6.13 3 10s3.13 7 7 7 7-3.13 7-7-3.13-7-7-7zm1 10.93c0 .04-.02.06-.07.06H8.93c-.05 0-.07-.02-.07-.06v-.86c0-.05.02-.07.07-.07h.54c.72 0 1.3-.58 1.3-1.3 0-.72-.58-1.3-1.3-1.3H8.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h.97c1.28 0 2.3 1.02 2.3 2.3 0 .85-.46 1.58-1.14 1.98v.25zm0-3.43c0 .05-.02.07-.07.07H9.07c-.05 0-.07-.02-.07-.07V9.64c0-.05.02-.07.07-.07h1.86c.05 0 .07.02.07.07v.86z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Pricing</h3>
              <p className="text-gray-600 text-sm">AI analyzes market data to suggest optimal showing fees in real-time.</p>
            </div>

            {/* AI Feature 2 */}
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-purple-500 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Intelligent Matching</h3>
              <p className="text-gray-600 text-sm">Connect with the right agents based on location, availability, and expertise.</p>
            </div>

            {/* AI Feature 3 */}
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-blue-500 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Market Intelligence</h3>
              <p className="text-gray-600 text-sm">Get insights on demand patterns, pricing trends, and optimal timing.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quantum AI Section */}
      <QuantumSection />

      {/* Founder/Creator Section */}
      <div className="relative py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-white">
              <div className="inline-flex items-center px-4 py-2 bg-orange-500/20 backdrop-blur-sm border border-orange-500/30 rounded-full mb-6">
                <svg className="w-4 h-4 text-orange-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                <span className="text-orange-300 text-sm font-medium">Visionary Creator</span>
              </div>

              <h2 className="text-4xl font-bold mb-6">
                Meet the Mind Behind the
                <span className="block bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                  Revolution
                </span>
              </h2>

              <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                <span className="text-orange-400 font-semibold">Nyasha Bivins</span>, the visionary creator of Homes2Show, 
                combines deep real estate expertise with cutting-edge AI technology to transform how the industry operates.
              </p>

              <p className="text-gray-400 mb-8 leading-relaxed">
                Powered by <span className="text-orange-400 font-semibold">Helo IM AI Inc.</span>, this platform represents 
                the future of real estate technology—where artificial intelligence meets human insight to create 
                unprecedented value for agents and clients alike.
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                  <span className="text-sm text-gray-300">AI Innovation Leader</span>
                </div>
                <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 animate-pulse"></div>
                  <span className="text-sm text-gray-300">Real Estate Expert</span>
                </div>
                <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 animate-pulse"></div>
                  <span className="text-sm text-gray-300">Technology Visionary</span>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="relative z-10">
                <img
                  src={nyashaImage}
                  alt="Nyasha Bivins - Creator and Visionary of Homes2Show"
                  className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
                  loading="lazy"
                />
              </div>
              
              {/* Clean decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full opacity-20 blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full opacity-20 blur-xl"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="relative py-16 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Transform Your Real Estate Business?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join the AI revolution and experience the future of real estate technology today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105"
            >
              <span className="relative z-10">Start Your Free Trial</span>
              <svg className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-gray-700 bg-gray-100 border border-gray-300 rounded-xl hover:bg-gray-200 transition-all duration-300"
            >
              View Demo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
