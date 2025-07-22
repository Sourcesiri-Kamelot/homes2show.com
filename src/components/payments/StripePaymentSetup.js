import React, { useState } from 'react';

/**
 * Stripe Payment Setup Component
 * Handles payment processing for Homes2Show platform
 * Matches Showami's payment model exactly
 */

const StripePaymentSetup = () => {
  const [setupStep, setSetupStep] = useState(1);
  const [stripeConfig, setStripeConfig] = useState({
    publishableKey: '',
    secretKey: '',
    connectClientId: '',
    webhookSecret: ''
  });

  const stripeSetupSteps = [
    {
      step: 1,
      title: "Create Stripe Account",
      description: "Set up your Stripe business account",
      tasks: [
        "Go to https://stripe.com and click 'Start now'",
        "Create business account with these details:",
        "• Business name: Homes2Show, Inc.",
        "• Business type: Technology/Software", 
        "• Industry: Real Estate Technology",
        "• Website: homes2show.com",
        "Complete business verification process",
        "Add bank account for payouts"
      ]
    },
    {
      step: 2,
      title: "Enable Stripe Connect",
      description: "Set up marketplace functionality",
      tasks: [
        "In Stripe Dashboard → Settings → Connect",
        "Enable 'Express accounts' for showing agents",
        "Set platform fee: 30% (matches Showami)",
        "Configure payout schedule: 24-hour delay",
        "Set up automatic transfers to agents",
        "Enable international payments (all 50 states)"
      ]
    },
    {
      step: 3,
      title: "Get API Keys",
      description: "Retrieve keys for integration",
      tasks: [
        "Go to Developers → API keys",
        "Copy Publishable key (pk_live_...)",
        "Copy Secret key (sk_live_...)",
        "Go to Connect → Settings",
        "Copy Connect Client ID (ca_...)",
        "Set up webhook endpoint"
      ]
    },
    {
      step: 4,
      title: "Configure Webhooks",
      description: "Set up event notifications",
      tasks: [
        "Go to Developers → Webhooks",
        "Add endpoint: https://homes2show.com/api/stripe/webhook",
        "Select events:",
        "• payment_intent.succeeded",
        "• transfer.created", 
        "• account.updated",
        "• payout.paid",
        "Copy webhook signing secret"
      ]
    }
  ];

  const paymentFlowExamples = [
    {
      title: "Showing Payment Flow",
      steps: [
        "1. Initiating agent requests $60 showing",
        "2. Stripe charges credit card immediately", 
        "3. Funds held in platform account",
        "4. After 24 hours + showing completion:",
        "   • Platform keeps $18 (30% fee)",
        "   • Transfer $42 to showing agent",
        "5. Agent receives direct deposit"
      ]
    },
    {
      title: "Subscription Payment Flow", 
      steps: [
        "1. Agent upgrades to Pro ($45/year)",
        "2. Stripe processes annual subscription",
        "3. Pro features activated immediately",
        "4. Automatic renewal next year",
        "5. Email confirmation sent"
      ]
    },
    {
      title: "Tip Processing Flow",
      steps: [
        "1. Agent adds $10 tip after showing",
        "2. Platform keeps $0.30 (3% transaction fee)",
        "3. Showing agent gets $9.70 (97%)",
        "4. Added to next payout cycle",
        "5. Notification sent to agent"
      ]
    }
  ];

  const handleConfigUpdate = (field, value) => {
    setStripeConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateConfig = () => {
    const { publishableKey, secretKey, connectClientId } = stripeConfig;
    return publishableKey.startsWith('pk_') && 
           secretKey.startsWith('sk_') && 
           connectClientId.startsWith('ca_');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          💳 Stripe Payment System Setup
        </h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h2 className="font-semibold text-red-800 mb-2">🚨 CRITICAL: Payment System Missing</h2>
          <p className="text-red-700 text-sm">
            Your Homes2Show platform is complete but has no payment processing. 
            This setup will enable you to collect payments from agents and pay showing agents, 
            matching Showami's exact payment model.
          </p>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {stripeSetupSteps.map((step) => (
            <div key={step.step} className={`flex items-center ${
              setupStep >= step.step ? 'text-blue-600' : 'text-gray-400'
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                setupStep >= step.step ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}>
                {step.step}
              </div>
              <span className="ml-2 font-medium hidden sm:block">{step.title}</span>
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(setupStep / stripeSetupSteps.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Current Step */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Step {setupStep}: {stripeSetupSteps[setupStep - 1].title}
        </h2>
        <p className="text-gray-600 mb-6">
          {stripeSetupSteps[setupStep - 1].description}
        </p>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Tasks to Complete:</h3>
          <ul className="space-y-2">
            {stripeSetupSteps[setupStep - 1].tasks.map((task, index) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span className="text-gray-700 text-sm">{task}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 flex justify-between">
          <button
            onClick={() => setSetupStep(Math.max(1, setupStep - 1))}
            disabled={setupStep === 1}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={() => setSetupStep(Math.min(stripeSetupSteps.length, setupStep + 1))}
            disabled={setupStep === stripeSetupSteps.length}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next Step
          </button>
        </div>
      </div>

      {/* API Configuration */}
      {setupStep >= 3 && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            🔑 API Configuration
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Publishable Key (pk_live_...)
              </label>
              <input
                type="text"
                value={stripeConfig.publishableKey}
                onChange={(e) => handleConfigUpdate('publishableKey', e.target.value)}
                placeholder="pk_live_..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Secret Key (sk_live_...)
              </label>
              <input
                type="password"
                value={stripeConfig.secretKey}
                onChange={(e) => handleConfigUpdate('secretKey', e.target.value)}
                placeholder="sk_live_..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Connect Client ID (ca_...)
              </label>
              <input
                type="text"
                value={stripeConfig.connectClientId}
                onChange={(e) => handleConfigUpdate('connectClientId', e.target.value)}
                placeholder="ca_..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Webhook Secret (whsec_...)
              </label>
              <input
                type="password"
                value={stripeConfig.webhookSecret}
                onChange={(e) => handleConfigUpdate('webhookSecret', e.target.value)}
                placeholder="whsec_..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          {validateConfig() && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 font-medium">✅ Configuration looks valid!</p>
              <p className="text-green-700 text-sm mt-1">
                Ready to implement payment processing in your application.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Payment Flow Examples */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {paymentFlowExamples.map((flow, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">{flow.title}</h3>
            <ul className="space-y-2">
              {flow.steps.map((step, stepIndex) => (
                <li key={stepIndex} className="text-sm text-gray-700">
                  {step}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Revenue Projections */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-bold text-green-900 mb-4">
          💰 Revenue Projections (Based on Showami Model)
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">$216,000</div>
            <div className="text-sm text-green-800">Annual showing revenue</div>
            <div className="text-xs text-green-700 mt-1">1,000 showings/month × $18 fee</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">$22,500</div>
            <div className="text-sm text-green-800">Annual subscription revenue</div>
            <div className="text-xs text-green-700 mt-1">500 Pro members × $45/year</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">$238,500</div>
            <div className="text-sm text-green-800">Total projected revenue</div>
            <div className="text-xs text-green-700 mt-1">First year conservative estimate</div>
          </div>
        </div>
      </div>

      {/* Cost Analysis */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-bold text-blue-900 mb-4">
          📊 Stripe Fee Analysis
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-blue-800 mb-2">Per Transaction:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Stripe fee: 2.9% + 30¢</li>
              <li>• On $60 showing: $2.04 fee</li>
              <li>• Net platform revenue: $15.96</li>
              <li>• Effective platform fee: 26.6%</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-blue-800 mb-2">Monthly Costs:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Stripe fees: ~$2,000</li>
              <li>• Net revenue: ~$16,000</li>
              <li>• ROI: 800% return</li>
              <li>• Still highly profitable</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h3 className="text-xl font-bold text-yellow-900 mb-4">
          🚀 Next Steps After Stripe Setup
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-yellow-800 mb-2">Technical Implementation:</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Install Stripe SDK in React app</li>
              <li>• Create payment processing components</li>
              <li>• Set up webhook handlers</li>
              <li>• Implement agent onboarding flow</li>
              <li>• Test payment flows end-to-end</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-yellow-800 mb-2">Business Launch:</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Recruit first 10 showing agents</li>
              <li>• Process test transactions</li>
              <li>• Launch beta with real payments</li>
              <li>• Scale agent network</li>
              <li>• Compete directly with Showami</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StripePaymentSetup;
