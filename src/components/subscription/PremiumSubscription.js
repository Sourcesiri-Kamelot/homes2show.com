import React, { useState } from 'react';

/**
 * Premium Subscription Component
 * Matches and enhances Showami Platinum offering
 * 
 * Showami Platinum: $50/year
 * Our Enhanced Version: Homes2Show Pro
 */

const PremiumSubscription = ({ currentPlan = 'free', onUpgrade }) => {
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [billingCycle, setBillingCycle] = useState('annual');

  const plans = {
    free: {
      name: 'Free',
      price: 0,
      description: 'Basic showing services',
      features: [
        'Standard showing requests',
        'Basic agent matching',
        'Standard payment processing',
        'Email support',
        'Basic mobile app access'
      ],
      limitations: [
        'No price discounts',
        'Standard payout timing',
        'Limited special requests',
        'No priority support',
        'Basic reporting only'
      ]
    },
    pro: {
      name: 'Homes2Show Pro',
      price: 45, // Slightly less than Showami's $50
      annualPrice: 45,
      monthlyPrice: 5,
      description: 'Enhanced features for professional agents',
      popular: true,
      features: [
        '$2 off every showing (vs Showami\'s $1)',
        'Next-day expedited payouts',
        'Priority agent matching',
        'Advanced referral network',
        'Client dashboard access',
        'Downloadable analytics reports',
        'Special request services',
        'Open house coordination',
        'Inspection & appraisal scheduling',
        'Multi-media showing services',
        'Minimum pricing access',
        'Professional coaching videos',
        'Advanced training modules',
        'Priority customer support',
        'Enhanced mobile app features'
      ],
      enhancements: [
        'AI-powered agent matching',
        'Real-time analytics dashboard',
        'Advanced lead management',
        'Marketing automation tools',
        'Performance insights',
        'Custom branding options'
      ]
    },
    enterprise: {
      name: 'Enterprise',
      price: 99,
      annualPrice: 99,
      monthlyPrice: 10,
      description: 'Complete solution for brokerages',
      features: [
        'All Pro features included',
        'Brokerage dashboard',
        'Agent performance monitoring',
        'Bulk showing management',
        'Custom integrations',
        'White-label options',
        'Dedicated account manager',
        'Advanced compliance tools',
        'Custom reporting',
        'API access',
        'Priority phone support',
        'Training for entire team'
      ]
    }
  };

  const currentPlanData = plans[currentPlan];
  const selectedPlanData = plans[selectedPlan];

  const calculateSavings = () => {
    if (selectedPlan === 'pro') {
      // Based on average 16 showings per month (industry average)
      const monthlyShowings = 16;
      const annualShowings = monthlyShowings * 12;
      const discountPerShowing = 2; // $2 off each showing
      const annualSavings = annualShowings * discountPerShowing;
      const netSavings = annualSavings - selectedPlanData.annualPrice;
      return { annualSavings, netSavings, breakEvenShowings: Math.ceil(selectedPlanData.annualPrice / discountPerShowing) };
    }
    return null;
  };

  const savings = calculateSavings();

  const handleUpgrade = () => {
    if (onUpgrade) {
      onUpgrade({
        plan: selectedPlan,
        billingCycle,
        price: billingCycle === 'annual' ? selectedPlanData.annualPrice : selectedPlanData.monthlyPrice * 12
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Choose Your Plan
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Upgrade to Homes2Show Pro for enhanced features, better pricing, and professional tools. 
          Compare with Showami Platinum and see why we offer more value.
        </p>
      </div>

      {/* Billing Toggle */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              billingCycle === 'monthly'
                ? 'bg-white text-gray-900 shadow'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('annual')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              billingCycle === 'annual'
                ? 'bg-white text-gray-900 shadow'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Annual (Save 25%)
          </button>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {Object.entries(plans).map(([planKey, plan]) => (
          <div
            key={planKey}
            className={`relative bg-white rounded-lg shadow-lg border-2 transition-all ${
              selectedPlan === planKey
                ? 'border-blue-500 transform scale-105'
                : 'border-gray-200 hover:border-gray-300'
            } ${plan.popular ? 'ring-2 ring-blue-500' : ''}`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
            )}
            
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <p className="text-gray-600 mb-4">{plan.description}</p>
              
              <div className="mb-6">
                {plan.price === 0 ? (
                  <span className="text-4xl font-bold text-gray-900">Free</span>
                ) : (
                  <div>
                    <span className="text-4xl font-bold text-gray-900">
                      ${billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-gray-600 ml-2">
                      /{billingCycle === 'annual' ? 'year' : 'month'}
                    </span>
                    {billingCycle === 'monthly' && plan.annualPrice && (
                      <div className="text-sm text-gray-500 mt-1">
                        ${plan.annualPrice}/year when billed annually
                      </div>
                    )}
                  </div>
                )}
              </div>

              <button
                onClick={() => setSelectedPlan(planKey)}
                className={`w-full py-2 px-4 rounded-lg font-medium transition-colors mb-6 ${
                  selectedPlan === planKey
                    ? 'bg-blue-600 text-white'
                    : currentPlan === planKey
                    ? 'bg-gray-200 text-gray-600 cursor-default'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
                disabled={currentPlan === planKey}
              >
                {currentPlan === planKey ? 'Current Plan' : 
                 selectedPlan === planKey ? 'Selected' : 'Select Plan'}
              </button>

              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">Features:</h4>
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan.enhancements && (
                  <div className="mt-4">
                    <h4 className="font-semibold text-blue-900">Enhanced Features:</h4>
                    <ul className="space-y-2 mt-2">
                      {plan.enhancements.map((enhancement, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          <span className="text-sm text-blue-700 font-medium">{enhancement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {plan.limitations && (
                  <div className="mt-4">
                    <h4 className="font-semibold text-gray-600">Limitations:</h4>
                    <ul className="space-y-2 mt-2">
                      {plan.limitations.map((limitation, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-5 h-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          <span className="text-sm text-gray-500">{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Savings Calculator for Pro Plan */}
      {selectedPlan === 'pro' && savings && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-bold text-green-900 mb-4">
            💰 Your Potential Savings with Homes2Show Pro
          </h3>
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">${savings.annualSavings}</div>
              <div className="text-sm text-green-800">Annual savings on showings</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">${savings.netSavings}</div>
              <div className="text-sm text-green-800">Net savings after subscription</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{savings.breakEvenShowings}</div>
              <div className="text-sm text-green-800">Showings to break even</div>
            </div>
          </div>
          <p className="text-sm text-green-700 mt-4 text-center">
            Based on industry average of 16 showings per month. Your actual savings may vary.
          </p>
        </div>
      )}

      {/* Comparison with Showami */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-bold text-blue-900 mb-4">
          🏆 How We Compare to Showami Platinum
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-blue-200">
                <th className="text-left py-2">Feature</th>
                <th className="text-center py-2">Showami Platinum</th>
                <th className="text-center py-2">Homes2Show Pro</th>
              </tr>
            </thead>
            <tbody className="space-y-2">
              <tr className="border-b border-blue-100">
                <td className="py-2">Annual Price</td>
                <td className="text-center py-2">$50</td>
                <td className="text-center py-2 font-bold text-green-600">$45</td>
              </tr>
              <tr className="border-b border-blue-100">
                <td className="py-2">Showing Discount</td>
                <td className="text-center py-2">$1 per showing</td>
                <td className="text-center py-2 font-bold text-green-600">$2 per showing</td>
              </tr>
              <tr className="border-b border-blue-100">
                <td className="py-2">AI-Powered Matching</td>
                <td className="text-center py-2">❌</td>
                <td className="text-center py-2 font-bold text-green-600">✅</td>
              </tr>
              <tr className="border-b border-blue-100">
                <td className="py-2">Advanced Analytics</td>
                <td className="text-center py-2">Basic</td>
                <td className="text-center py-2 font-bold text-green-600">Advanced</td>
              </tr>
              <tr className="border-b border-blue-100">
                <td className="py-2">Mobile App</td>
                <td className="text-center py-2">Standard</td>
                <td className="text-center py-2 font-bold text-green-600">Enhanced</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Upgrade Button */}
      {selectedPlan !== currentPlan && (
        <div className="text-center">
          <button
            onClick={handleUpgrade}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium text-lg hover:bg-blue-700 transition-colors"
          >
            Upgrade to {selectedPlanData.name}
          </button>
          <p className="text-sm text-gray-600 mt-2">
            30-day money-back guarantee • Cancel anytime
          </p>
        </div>
      )}

      {/* FAQ Section */}
      <div className="mt-12 bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Frequently Asked Questions
        </h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-900">How does the showing discount work?</h4>
            <p className="text-gray-700 text-sm mt-1">
              Pro members get $2 off every showing request. This discount is automatically applied 
              when you schedule showings through the platform.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">What are expedited payouts?</h4>
            <p className="text-gray-700 text-sm mt-1">
              Instead of the standard 24-hour payment delay, Pro members can receive payments 
              as fast as the next business day after showing completion.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">Can I cancel anytime?</h4>
            <p className="text-gray-700 text-sm mt-1">
              Yes, you can cancel your subscription at any time. We also offer a 30-day 
              money-back guarantee for new subscribers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumSubscription;
