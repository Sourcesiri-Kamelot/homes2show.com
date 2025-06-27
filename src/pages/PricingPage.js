import React from 'react';
import { Link } from 'react-router-dom';
import CheckIcon from '../components/common/CheckIcon';
import XIcon from '../components/common/XIcon';
import SparkleIcon from '../components/common/SparkleIcon';

/**
 * PricingPage Component
 * AI-enhanced pricing page with intelligent tier recommendations
 * Features dynamic pricing and conversion optimization
 */
const PricingPage = () => {
  const tiers = [
    {
      name: 'Starter Agent',
      price: 0,
      period: 'Forever Free',
      description: 'Perfect for new agents getting started with AI-powered showings',
      features: [
        { text: 'Post up to 5 Showing Requests/month', included: true },
        { text: 'Show Unlimited Homes for Others', included: true },
        { text: 'Basic Activity Dashboard', included: true },
        { text: 'Standard Payouts', included: true },
        { text: 'Share to Earn Credits (Stack up to 5)', included: true },
        { text: 'AI Description Enhancer (3/month)', included: true },
        { text: 'AI Feedback Summarizer (3/month)', included: true },
        { text: 'AI Pricing Assistant', included: false },
        { text: 'AI Market Insights', included: false },
        { text: 'Priority Matching', included: false },
        { text: 'Community & Email Support', included: true },
      ],
      cta: 'Start Free Forever',
      route: '/signup',
      primary: false,
      badge: 'Most Popular',
      color: 'gray'
    },
    {
      name: 'Growing Agent',
      price: 19,
      period: 'per month',
      description: 'Ideal for active agents ready to scale with advanced AI features',
      features: [
        { text: 'Post up to 25 Showing Requests/month', included: true },
        { text: 'Show Unlimited Homes for Others', included: true },
        { text: 'Detailed Activity Dashboard', included: true },
        { text: 'Expedited Payouts', included: true },
        { text: 'Referral Program (5% off Subscription)', included: true },
        { text: 'AI Description Enhancer (Unlimited)', included: true },
        { text: 'AI Feedback Summarizer (Unlimited)', included: true },
        { text: 'AI Pricing Assistant', included: true },
        { text: 'AI Market Insights', included: false },
        { text: 'Priority Matching', included: false },
        { text: 'Priority Email Support', included: true },
      ],
      cta: 'Upgrade to Pro',
      route: '/payment?plan=pro',
      primary: true,
      badge: 'Best Value',
      color: 'orange'
    },
    {
      name: 'Power Agent',
      price: 49,
      period: 'per month',
      description: 'For top performers who need unlimited access and premium AI intelligence',
      features: [
        { text: 'Post Unlimited Showing Requests', included: true },
        { text: 'Show Unlimited Homes for Others', included: true },
        { text: 'Advanced Analytics Dashboard', included: true },
        { text: 'Instant Payouts', included: true },
        { text: 'Referral Program (10% off Subscription)', included: true },
        { text: 'AI Description Enhancer (Unlimited)', included: true },
        { text: 'AI Feedback Summarizer (Unlimited)', included: true },
        { text: 'AI Pricing Assistant', included: true },
        { text: 'AI Market Insights', included: true },
        { text: 'Priority Matching in Search', included: true },
        { text: 'Dedicated Phone & Chat Support', included: true },
      ],
      cta: 'Go Premium',
      route: '/payment?plan=enterprise',
      primary: false,
      badge: 'Full AI Suite',
      color: 'purple'
    },
  ];

  const getColorClasses = (color, primary = false) => {
    const colors = {
      gray: {
        bg: 'bg-gray-50',
        border: 'border-gray-200',
        button: primary ? 'bg-gray-800 hover:bg-gray-900 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800',
        badge: 'bg-gray-100 text-gray-800'
      },
      orange: {
        bg: 'bg-orange-50',
        border: 'border-orange-200 ring-2 ring-orange-500',
        button: 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl',
        badge: 'bg-orange-100 text-orange-800'
      },
      purple: {
        bg: 'bg-purple-50',
        border: 'border-purple-200',
        button: 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white',
        badge: 'bg-purple-100 text-purple-800'
      }
    };
    return colors[color];
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* AI Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Header Section */}
      <div className="relative pt-16 pb-8 sm:pt-24 sm:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* AI Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full mb-6">
              <SparkleIcon className="w-4 h-4 text-orange-500 mr-2" />
              <span className="text-orange-600 text-sm font-medium">AI-Powered Pricing Plans</span>
            </div>

            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl mb-6">
              Plans for Every
              <span className="block bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent">
                Intelligent Agent
              </span>
            </h1>
            
            <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the perfect AI-enhanced plan to grow your business and reclaim your time. 
              All plans include our core intelligent features.
            </p>

            {/* Value Proposition */}
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center">
                <CheckIcon size="w-4 h-4" className="mr-2" />
                <span>No Setup Fees</span>
              </div>
              <div className="flex items-center">
                <CheckIcon size="w-4 h-4" className="mr-2" />
                <span>Cancel Anytime</span>
              </div>
              <div className="flex items-center">
                <CheckIcon size="w-4 h-4" className="mr-2" />
                <span>AI Features Included</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="relative pb-16 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
            {tiers.map((tier, index) => {
              const colorClasses = getColorClasses(tier.color, tier.primary);
              
              return (
                <div 
                  key={tier.name} 
                  className={`
                    relative bg-white rounded-2xl shadow-xl border-2 transition-all duration-300 hover:shadow-2xl hover:scale-105
                    ${colorClasses.border}
                    ${tier.primary ? 'transform scale-105 z-10' : ''}
                  `}
                >
                  {/* Badge */}
                  {tier.badge && (
                    <div className={`absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full text-xs font-semibold ${colorClasses.badge}`}>
                      {tier.badge}
                    </div>
                  )}

                  <div className="p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                      <p className="text-gray-600 text-sm mb-6">{tier.description}</p>
                      
                      <div className="flex items-baseline justify-center">
                        <span className="text-5xl font-extrabold text-gray-900">${tier.price}</span>
                        <span className="text-lg text-gray-500 ml-2">/{tier.period === 'Forever Free' ? 'free' : 'month'}</span>
                      </div>
                      
                      {tier.period === 'Forever Free' && (
                        <p className="text-green-600 font-medium text-sm mt-2">No credit card required</p>
                      )}
                    </div>

                    {/* Features List */}
                    <ul className="space-y-4 mb-8">
                      {tier.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <div className="flex-shrink-0 mt-0.5">
                            {feature.included ? (
                              <CheckIcon size="w-5 h-5" className="text-green-500" />
                            ) : (
                              <XIcon size="w-5 h-5" className="text-gray-300" />
                            )}
                          </div>
                          <p className={`ml-3 text-sm ${feature.included ? 'text-gray-700' : 'text-gray-400'}`}>
                            {feature.text}
                          </p>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <Link 
                      to={tier.route}
                      className={`
                        w-full py-4 px-6 rounded-xl font-semibold text-base transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-offset-2 inline-flex items-center justify-center
                        ${colorClasses.button}
                        ${tier.primary ? 'focus:ring-orange-500/50' : 'focus:ring-gray-500/50'}
                      `}
                    >
                      {tier.cta}
                      {tier.primary && (
                        <SparkleIcon className="inline-block w-4 h-4 ml-2" />
                      )}
                    </Link>

                    {/* Additional Info */}
                    {tier.primary && (
                      <p className="text-center text-xs text-gray-500 mt-4">
                        Most popular choice • Upgrade anytime
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="relative bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to know about our AI-powered platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How does the AI pricing work?</h3>
              <p className="text-gray-600 text-sm">Our AI analyzes real-time market data, location factors, and demand patterns to suggest optimal showing fees that maximize your earnings.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Can I change plans anytime?</h3>
              <p className="text-gray-600 text-sm">Yes! Upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing differences.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What makes this AI-powered?</h3>
              <p className="text-gray-600 text-sm">Our platform uses machine learning for smart matching, predictive pricing, market insights, and automated feedback analysis to optimize your success.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Is there a free trial?</h3>
              <p className="text-gray-600 text-sm">Our Starter plan is free forever! You can also try any paid plan free for 14 days with full access to all AI features.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
