import React from 'react';
import { Link } from 'react-router-dom';
import CheckIcon from '../components/common/CheckIcon';
import XIcon from '../components/common/XIcon';

/**
 * PricingPage Component
 * Professional pricing page for Homes2Show AI platform
 * Features enterprise-grade pricing tiers
 */
const PricingPage = () => {
  const tiers = [
    {
      name: 'Starter',
      price: 0,
      period: 'Forever Free',
      description: 'Perfect for new agents getting started with AI-powered real estate',
      features: [
        { text: 'Basic Property Listings', included: true },
        { text: 'Standard Dashboard', included: true },
        { text: 'Email Support', included: true },
        { text: 'Basic Analytics', included: true },
        { text: 'AI Property Matching', included: false },
        { text: 'Advanced Analytics', included: false },
        { text: 'Priority Support', included: false },
        { text: 'Custom Integrations', included: false },
      ],
      cta: 'Start Free',
      route: '/signup',
      primary: false,
      badge: 'Most Popular',
      color: 'gray'
    },
    {
      name: 'Quantum Professional',
      price: 149,
      period: 'per month',
      description: 'Advanced AI-powered platform for serious real estate professionals',
      features: [
        { text: 'Everything in Starter', included: true },
        { text: 'Quantum Property Matching AI', included: true },
        { text: 'Advanced Behavioral Analytics', included: true },
        { text: 'Predictive Client Intelligence', included: true },
        { text: 'Real-time Market Insights', included: true },
        { text: 'Lead Generation & Scoring', included: true },
        { text: 'Professional Dashboard', included: true },
        { text: 'Priority Support', included: true },
      ],
      cta: 'Start Professional Trial',
      route: '/signup?plan=quantum-pro',
      primary: true,
      badge: 'Most Advanced',
      color: 'blue'
    },
    {
      name: 'Enterprise',
      price: 499,
      period: 'per month',
      description: 'Complete AI solution for brokerages and enterprise teams',
      features: [
        { text: 'Everything in Quantum Professional', included: true },
        { text: 'Multi-agent Team Management', included: true },
        { text: 'Advanced Analytics & Reporting', included: true },
        { text: 'Custom AI Model Training', included: true },
        { text: 'White-label Platform', included: true },
        { text: 'API Access & Integrations', included: true },
        { text: 'Dedicated Account Manager', included: true },
        { text: 'Enterprise Security & Compliance', included: true },
      ],
      cta: 'Contact Sales',
      route: '/contact?plan=enterprise',
      primary: false,
      badge: 'Enterprise',
      color: 'purple'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-200 rounded-full mb-6">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 animate-pulse"></div>
            <span className="text-sm font-medium text-blue-700">Professional Pricing</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Choose Your AI-Powered Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional-grade real estate technology trusted by industry leaders. 
            Start free and scale with advanced AI features.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {tiers.map((tier, index) => (
            <div
              key={tier.name}
              className={`relative rounded-2xl border-2 p-8 shadow-lg transition-all duration-300 hover:shadow-xl ${
                tier.primary
                  ? 'border-blue-500 bg-blue-50/50 scale-105'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              {/* Badge */}
              {tier.badge && (
                <div className={`absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full text-sm font-semibold ${
                  tier.primary
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-white'
                }`}>
                  {tier.badge}
                </div>
              )}

              {/* Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                <p className="text-gray-600 mb-6">{tier.description}</p>
                
                <div className="mb-6">
                  {tier.price === 0 ? (
                    <div className="text-4xl font-bold text-gray-900">Free</div>
                  ) : (
                    <div className="flex items-baseline justify-center">
                      <span className="text-5xl font-bold text-gray-900">${tier.price}</span>
                      <span className="text-gray-600 ml-2">/{tier.period}</span>
                    </div>
                  )}
                </div>

                <Link
                  to={tier.route}
                  className={`w-full inline-flex justify-center items-center px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                    tier.primary
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
                      : 'bg-gray-800 text-white hover:bg-gray-900'
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>

              {/* Features */}
              <div className="space-y-4">
                {tier.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      {feature.included ? (
                        <CheckIcon className="w-5 h-5 text-green-500" />
                      ) : (
                        <XIcon className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    <span className={`ml-3 text-sm ${
                      feature.included ? 'text-gray-700' : 'text-gray-400'
                    }`}>
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                What makes Quantum AI different?
              </h3>
              <p className="text-gray-600">
                Our proprietary behavioral analysis technology predicts client preferences with 94% accuracy, 
                revolutionizing how properties are matched to buyers.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Is there a free trial?
              </h3>
              <p className="text-gray-600">
                Yes! Our Starter plan is free forever. Professional plans include a 14-day free trial 
                with full access to all features.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Can I upgrade or downgrade anytime?
              </h3>
              <p className="text-gray-600">
                Absolutely. Change your plan anytime with immediate access to new features. 
                No long-term contracts or cancellation fees.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                What support is included?
              </h3>
              <p className="text-gray-600">
                All plans include comprehensive support. Professional and Enterprise plans 
                receive priority support with dedicated account management.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Real Estate Business?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join thousands of real estate professionals using AI to close more deals, 
              understand clients better, and grow their business faster.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Start Free Today
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              
              <Link
                to="/quantum"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
              >
                Try Quantum AI Demo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
