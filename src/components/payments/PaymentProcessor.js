import React, { useState } from 'react';

/**
 * Basic Payment Processor Component
 * Handles showing payments and subscriptions
 * Can be integrated with Stripe, PayPal, or other payment providers
 */

const PaymentProcessor = ({ 
  amount, 
  type = 'showing', // 'showing' or 'subscription'
  onPaymentSuccess, 
  onPaymentError 
}) => {
  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
    email: '',
    billingAddress: {
      street: '',
      city: '',
      state: '',
      zip: ''
    }
  });

  const paymentMethods = [
    {
      id: 'stripe',
      name: 'Credit/Debit Card',
      icon: '💳',
      description: 'Visa, Mastercard, American Express',
      fees: '2.9% + 30¢',
      recommended: true
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: '🅿️',
      description: 'Pay with your PayPal account',
      fees: '3.49% + fixed fee',
      recommended: false
    },
    {
      id: 'cashapp',
      name: 'Cash App',
      icon: '💰',
      description: 'Pay with Cash App',
      fees: 'Low fees',
      recommended: false,
      note: 'Limited business features'
    },
    {
      id: 'manual',
      name: 'Manual Payment',
      icon: '📝',
      description: 'Process payment manually',
      fees: 'No processing fees',
      recommended: false,
      note: 'For testing/development only'
    }
  ];

  const calculateFees = (amount, method) => {
    switch (method) {
      case 'stripe':
        return Math.round((amount * 0.029 + 0.30) * 100) / 100;
      case 'paypal':
        return Math.round((amount * 0.0349 + 0.49) * 100) / 100;
      case 'cashapp':
        return Math.round(amount * 0.015 * 100) / 100;
      case 'manual':
        return 0;
      default:
        return 0;
    }
  };

  const fee = calculateFees(amount, paymentMethod);
  const total = amount + fee;

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setPaymentData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setPaymentData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const processPayment = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const paymentResult = {
        success: true,
        paymentId: `pay_${Date.now()}`,
        amount: total,
        method: paymentMethod,
        timestamp: new Date().toISOString(),
        fees: fee
      };

      if (onPaymentSuccess) {
        onPaymentSuccess(paymentResult);
      }
    } catch (error) {
      console.error('Payment processing error:', error);
      if (onPaymentError) {
        onPaymentError(error);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const validateForm = () => {
    if (paymentMethod === 'manual') return true;
    
    const { cardNumber, expiryDate, cvv, name, email } = paymentData;
    return cardNumber && expiryDate && cvv && name && email;
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {type === 'showing' ? '🏠 Pay for Showing' : '⭐ Upgrade to Pro'}
        </h2>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex justify-between text-sm">
            <span>Amount:</span>
            <span className="font-medium">${amount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Processing Fee:</span>
            <span className="font-medium">${fee.toFixed(2)}</span>
          </div>
          <div className="border-t border-blue-200 mt-2 pt-2 flex justify-between font-bold">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Payment Method Selection */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Select Payment Method
        </h3>
        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => setPaymentMethod(method.id)}
              className={`w-full p-3 text-left border rounded-lg transition-colors ${
                paymentMethod === method.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-xl mr-3">{method.icon}</span>
                  <div>
                    <div className="font-medium text-gray-900">
                      {method.name}
                      {method.recommended && (
                        <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                          Recommended
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-600">{method.description}</div>
                    <div className="text-xs text-gray-500">Fees: {method.fees}</div>
                    {method.note && (
                      <div className="text-xs text-yellow-600">{method.note}</div>
                    )}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Payment Form */}
      {paymentMethod !== 'manual' && paymentMethod !== 'paypal' && paymentMethod !== 'cashapp' && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Payment Information
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Number
              </label>
              <input
                type="text"
                value={paymentData.cardNumber}
                onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                placeholder="1234 5678 9012 3456"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date
                </label>
                <input
                  type="text"
                  value={paymentData.expiryDate}
                  onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                  placeholder="MM/YY"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CVV
                </label>
                <input
                  type="text"
                  value={paymentData.cvv}
                  onChange={(e) => handleInputChange('cvv', e.target.value)}
                  placeholder="123"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cardholder Name
              </label>
              <input
                type="text"
                value={paymentData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="John Doe"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={paymentData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="john@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* Alternative Payment Methods */}
      {paymentMethod === 'paypal' && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-800 text-sm">
            You will be redirected to PayPal to complete your payment securely.
          </p>
        </div>
      )}

      {paymentMethod === 'cashapp' && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 text-sm">
            You will be redirected to Cash App to complete your payment.
          </p>
        </div>
      )}

      {paymentMethod === 'manual' && (
        <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <p className="text-gray-800 text-sm mb-2">
            <strong>Manual Payment Instructions:</strong>
          </p>
          <p className="text-gray-700 text-sm">
            This is for testing purposes only. In production, you would process this payment manually 
            and mark it as completed in your admin dashboard.
          </p>
        </div>
      )}

      {/* Payment Button */}
      <button
        onClick={processPayment}
        disabled={!validateForm() || isProcessing}
        className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors ${
          !validateForm() || isProcessing
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {isProcessing ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Processing...
          </div>
        ) : (
          `Pay $${total.toFixed(2)}`
        )}
      </button>

      {/* Security Notice */}
      <div className="mt-4 text-xs text-gray-500 text-center">
        <p>🔒 Your payment information is secure and encrypted.</p>
        <p>We never store your credit card details.</p>
      </div>

      {/* Development Notice */}
      <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-800 text-sm font-medium">⚠️ Development Mode</p>
        <p className="text-red-700 text-xs mt-1">
          This is a demo payment form. To process real payments, you need to:
        </p>
        <ul className="text-red-700 text-xs mt-1 list-disc list-inside">
          <li>Set up Stripe account and get API keys</li>
          <li>Implement actual payment processing</li>
          <li>Add webhook handlers for payment events</li>
          <li>Set up agent payout system</li>
        </ul>
      </div>
    </div>
  );
};

export default PaymentProcessor;
