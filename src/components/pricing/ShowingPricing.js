import React, { useState, useEffect } from 'react';

/**
 * Showing Pricing Component
 * Matches Showami's exact pricing model and calculator
 * 
 * Pricing Range: $45 - $400 per showing
 * Platform Fee: ~30% (matches Showami's structure)
 * Average: $32 per showing
 * Showing Agent Earnings: $28 - $367 per showing
 */

const ShowingPricing = ({ onPriceSelect, defaultPrice = 50 }) => {
  const [showingPrice, setShowingPrice] = useState(defaultPrice);
  const [numberOfShowings, setNumberOfShowings] = useState(1);
  const [tip, setTip] = useState(0);
  const [isRushHour, setIsRushHour] = useState(false);
  const [isShortNotice, setIsShortNotice] = useState(false);
  const [distance, setDistance] = useState('local');

  // Showami's fee structure (approximately 30%)
  const calculateShowamiFee = (price) => {
    // Based on actual Showami example: $60 showing = $18.30 fee
    return Math.round(price * 0.305 * 100) / 100;
  };

  const calculateShowingAgentEarnings = (price, tipAmount = 0) => {
    const showamiFee = calculateShowamiFee(price);
    const tipAfterFees = tipAmount * 0.97; // 97% of tip goes to agent
    return Math.round((price - showamiFee + tipAfterFees) * 100) / 100;
  };

  const calculateTotal = () => {
    let basePrice = showingPrice;
    
    // Apply modifiers based on Showami's pricing factors
    if (isRushHour) basePrice += 10;
    if (isShortNotice) basePrice += 15;
    if (distance === 'far') basePrice += 20;
    
    const subtotal = basePrice * numberOfShowings;
    const totalTip = tip;
    return subtotal + totalTip;
  };

  const total = calculateTotal();
  const showamiFee = calculateShowamiFee(showingPrice) * numberOfShowings;
  const agentEarnings = calculateShowingAgentEarnings(showingPrice, tip) * numberOfShowings;

  useEffect(() => {
    if (onPriceSelect) {
      onPriceSelect({
        basePrice: showingPrice,
        numberOfShowings,
        tip,
        total,
        agentEarnings,
        platformFee: showamiFee
      });
    }
  }, [showingPrice, numberOfShowings, tip, total, agentEarnings, showamiFee, onPriceSelect]);

  const priceRanges = [
    { value: 45, label: '$45 - Basic', description: 'Standard showing, local area' },
    { value: 60, label: '$60 - Standard', description: 'Most popular option' },
    { value: 80, label: '$80 - Premium', description: 'Rush hour or short notice' },
    { value: 120, label: '$120 - Extended', description: 'Multiple properties or far distance' },
    { value: 200, label: '$200 - Luxury', description: 'High-end properties or special requirements' },
    { value: 400, label: '$400 - Executive', description: 'Maximum tier for complex showings' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Showing Pricing Calculator
        </h2>
        <p className="text-gray-600">
          Set your showing price based on location, timing, and requirements. 
          Showing agents earn between $28-$367 per showing.
        </p>
      </div>

      {/* Pricing Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Select Base Price Range
        </label>
        <div className="grid md:grid-cols-2 gap-3">
          {priceRanges.map((range) => (
            <button
              key={range.value}
              onClick={() => setShowingPrice(range.value)}
              className={`p-3 text-left border rounded-lg transition-colors ${
                showingPrice === range.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="font-medium text-gray-900">{range.label}</div>
              <div className="text-sm text-gray-600">{range.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Price Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Custom Price ($45 - $400)
        </label>
        <div className="flex items-center space-x-2">
          <span className="text-gray-500">$</span>
          <input
            type="number"
            min="45"
            max="400"
            value={showingPrice}
            onChange={(e) => setShowingPrice(Math.max(45, Math.min(400, parseInt(e.target.value) || 45)))}
            className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="range"
            min="45"
            max="400"
            value={showingPrice}
            onChange={(e) => setShowingPrice(parseInt(e.target.value))}
            className="flex-1"
          />
        </div>
      </div>

      {/* Pricing Factors */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Pricing Factors
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={isRushHour}
                onChange={(e) => setIsRushHour(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">Rush hour/Evening (+$10)</span>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={isShortNotice}
                onChange={(e) => setIsShortNotice(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">Short notice (+$15)</span>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <label className="text-sm text-gray-700 mr-4">Distance:</label>
            <select
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm"
            >
              <option value="local">Local area</option>
              <option value="far">Far distance (+$20)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Number of Showings */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Number of Showings
        </label>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setNumberOfShowings(Math.max(1, numberOfShowings - 1))}
            className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
          >
            -
          </button>
          <span className="text-lg font-medium w-8 text-center">{numberOfShowings}</span>
          <button
            onClick={() => setNumberOfShowings(numberOfShowings + 1)}
            className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
          >
            +
          </button>
        </div>
      </div>

      {/* Tip Option */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Optional Tip (97% goes to showing agent)
        </label>
        <div className="flex items-center space-x-2">
          <span className="text-gray-500">$</span>
          <input
            type="number"
            min="0"
            max="100"
            value={tip}
            onChange={(e) => setTip(Math.max(0, parseInt(e.target.value) || 0))}
            className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex space-x-2">
            {[5, 10, 15, 20].map((amount) => (
              <button
                key={amount}
                onClick={() => setTip(amount)}
                className={`px-3 py-1 text-sm rounded ${
                  tip === amount
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                ${amount}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Breakdown */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-gray-900 mb-3">Pricing Breakdown</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>{numberOfShowings} Showing(s) × ${showingPrice}</span>
            <span>${showingPrice * numberOfShowings}</span>
          </div>
          {tip > 0 && (
            <div className="flex justify-between">
              <span>Tip</span>
              <span>+ ${tip}</span>
            </div>
          )}
          <div className="border-t pt-2 flex justify-between font-medium">
            <span>Total</span>
            <span>${total}</span>
          </div>
          <div className="flex justify-between text-red-600">
            <span>Homes2Show Fee</span>
            <span>- ${showamiFee}</span>
          </div>
          <div className="flex justify-between font-semibold text-green-600">
            <span>Showing Agent Earns</span>
            <span>${agentEarnings}</span>
          </div>
        </div>
      </div>

      {/* Counter-Proposal Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-blue-900 mb-2">
          💡 Counter-Proposal System
        </h4>
        <p className="text-blue-800 text-sm">
          Showing agents can submit counter-proposals based on the fee, location, and timing. 
          This helps ensure fair pricing for all parties and improves acceptance rates.
        </p>
      </div>

      {/* Acceptance Rate Info */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-green-900">97% Acceptance Rate</h4>
            <p className="text-green-800 text-sm">
              Our showing requests have a 97% acceptance rate across all 50 states.
            </p>
          </div>
          <div className="text-2xl">✅</div>
        </div>
      </div>

      {/* Pricing Guidelines */}
      <div className="mt-6 text-xs text-gray-500">
        <h5 className="font-semibold mb-2">Pricing Guidelines:</h5>
        <ul className="space-y-1">
          <li>• $45-60: Standard local showings</li>
          <li>• $60-80: Rush hour, evening, or short notice</li>
          <li>• $80-120: Multiple properties or longer distance</li>
          <li>• $120-200: Luxury properties or special requirements</li>
          <li>• $200-400: Executive tier for complex showings</li>
        </ul>
      </div>
    </div>
  );
};

export default ShowingPricing;
