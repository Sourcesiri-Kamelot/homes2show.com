import React, { useState } from 'react';
import SparkleIcon from '../components/common/SparkleIcon';

/**
 * DashboardPage Component
 * AI-powered agent dashboard with intelligent features
 * Showcases advanced AI capabilities and user analytics
 */
const DashboardPage = () => {
  const [feedbackNotes, setFeedbackNotes] = useState("Client loved the natural light and the high ceilings. The kitchen felt a bit dated for them. They asked about the age of the HVAC system and if the appliances are included. They disliked the color of the master bedroom.");
  const [summarizedFeedback, setSummarizedFeedback] = useState("");
  const [isSummarizing, setIsSummarizing] = useState(false);
  
  // Pricing Assistant state
  const [suggestedPrice, setSuggestedPrice] = useState("");
  const [isPricing, setIsPricing] = useState(false);
  const [propertyAddress, setPropertyAddress] = useState("");
  const [showingDateTime, setShowingDateTime] = useState("");

  // User data (would come from Firebase in production)
  const userTier = "Power Agent";
  const userStats = {
    reputationScore: 4.9,
    completedShowings: 127,
    totalEarnings: 8450,
    activeRequests: 5
  };

  const handleSummarize = async () => {
    setIsSummarizing(true);
    setSummarizedFeedback("🤖 AI is analyzing feedback...");
    
    // Simulate AI processing
    setTimeout(() => {
      setSummarizedFeedback(`**✅ Likes:**
• Natural light throughout the home
• High ceilings creating spacious feel
• Overall layout and flow

**❌ Dislikes:**
• Kitchen feels dated and needs updating
• Master bedroom color scheme

**❓ Questions & Concerns:**
• Age and condition of HVAC system
• Whether appliances are included in sale
• Potential renovation costs for kitchen

**🎯 AI Recommendation:**
Focus on highlighting the home's architectural features while addressing renovation potential as an investment opportunity.`);
      setIsSummarizing(false);
    }, 2000);
  };
  
  const handleGetPrice = async () => {
    setIsPricing(true);
    setSuggestedPrice("🤖 AI is analyzing market data...");
    
    // Simulate AI processing
    setTimeout(() => {
      setSuggestedPrice(`**💰 AI Pricing Analysis:**

**Suggested Fee:** $55 - $65
**Confidence:** 94%

**Market Factors:**
• High demand area (+$10)
• Weekend showing (+$5)
• Premium property type (+$5)

**Optimization Tip:** Price at $60 for optimal booking rate while maximizing earnings.`);
      setIsPricing(false);
    }, 2500);
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50 min-h-screen relative overflow-hidden">
      {/* AI Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-500/3 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/3 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="relative max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <header className="mb-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
            <div>
              <div className="flex items-center mb-2">
                <h1 className="text-4xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  AI Agent Dashboard
                </h1>
                <div className="ml-3 flex items-center px-3 py-1 bg-orange-100 rounded-full">
                  <SparkleIcon className="w-4 h-4 text-orange-500 mr-1" />
                  <span className="text-orange-600 text-sm font-medium">AI-Powered</span>
                </div>
              </div>
              <p className="text-lg text-gray-600">Welcome back, {userTier}! Your AI assistant is ready.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
                <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide">Reputation</h3>
                <p className="mt-1 text-2xl font-bold text-green-600 flex items-center">
                  {userStats.reputationScore} 
                  <span className="text-yellow-400 ml-1">★</span>
                </p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
                <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide">Showings</h3>
                <p className="mt-1 text-2xl font-bold text-blue-600">{userStats.completedShowings}</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
                <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide">Earnings</h3>
                <p className="mt-1 text-2xl font-bold text-purple-600">${userStats.totalEarnings.toLocaleString()}</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
                <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide">Active</h3>
                <p className="mt-1 text-2xl font-bold text-orange-600">{userStats.activeRequests}</p>
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column: AI Tools */}
          <div className="xl:col-span-2 space-y-8">
            {/* AI Pricing Assistant */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <SparkleIcon className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <h2 className="text-2xl font-bold text-gray-900">AI Pricing Assistant</h2>
                  <p className="text-gray-600">Get intelligent fee suggestions based on market data</p>
                </div>
                <span className="ml-auto px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full">
                  PRO
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Property Address</label>
                  <input 
                    type="text" 
                    placeholder="123 Main St, City, State" 
                    value={propertyAddress}
                    onChange={(e) => setPropertyAddress(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Showing Date & Time</label>
                  <input 
                    type="datetime-local" 
                    value={showingDateTime}
                    onChange={(e) => setShowingDateTime(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200" 
                  />
                </div>
              </div>

              <button 
                onClick={handleGetPrice} 
                disabled={isPricing || !propertyAddress} 
                className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-purple-800 disabled:from-gray-400 disabled:to-gray-500 transition-all duration-200 transform hover:scale-105 disabled:transform-none shadow-lg hover:shadow-xl"
              >
                {isPricing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    AI Analyzing...
                  </>
                ) : (
                  <>
                    <SparkleIcon className="w-5 h-5 mr-2" />
                    Get AI Price Suggestion
                  </>
                )}
              </button>

              {suggestedPrice && (
                <div className="mt-6 p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                  <div className="prose prose-sm max-w-none">
                    <div className="whitespace-pre-wrap text-purple-900 font-medium">
                      {suggestedPrice}
                    </div>
                  </div>
                </div>
              )}
            </div>
        
            {/* AI Feedback Summarizer */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-orange-100 rounded-xl">
                  <SparkleIcon className="w-6 h-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <h2 className="text-2xl font-bold text-gray-900">AI Feedback Summarizer</h2>
                  <p className="text-gray-600">Transform client feedback into actionable insights</p>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Client Feedback Notes</label>
                <textarea 
                  rows="6" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 resize-none" 
                  value={feedbackNotes} 
                  onChange={(e) => setFeedbackNotes(e.target.value)}
                  placeholder="Enter client feedback, comments, and observations from the showing..."
                />
              </div>

              <button 
                onClick={handleSummarize} 
                disabled={isSummarizing || !feedbackNotes.trim()} 
                className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-orange-700 disabled:from-gray-400 disabled:to-gray-500 transition-all duration-200 transform hover:scale-105 disabled:transform-none shadow-lg hover:shadow-xl"
              >
                {isSummarizing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    AI Processing...
                  </>
                ) : (
                  <>
                    <SparkleIcon className="w-5 h-5 mr-2" />
                    Generate AI Summary
                  </>
                )}
              </button>

              {summarizedFeedback && (
                <div className="mt-6 p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200">
                  <div className="prose prose-sm max-w-none">
                    <div className="whitespace-pre-wrap text-orange-900 font-medium">
                      {summarizedFeedback}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Right Column: Market Insights */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-blue-100 rounded-xl">
                <SparkleIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-bold text-gray-900">AI Market Insights</h2>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
                  PREMIUM
                </span>
              </div>
            </div>

            {userTier === "Power Agent" ? (
              <div className="space-y-6">
                {/* Market Activity Chart */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    Peak Showing Times - Your Area
                  </h3>
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 h-32 rounded-xl flex items-center justify-center border border-blue-200">
                    <div className="text-center">
                      <div className="text-blue-600 font-semibold">📊 Interactive Chart</div>
                      <div className="text-blue-500 text-sm mt-1">Weekend: 2-5 PM Peak</div>
                    </div>
                  </div>
                </div>

                {/* Top Features */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Most Requested Features
                  </h3>
                  <div className="space-y-2">
                    {[
                      { feature: 'Home Office', percentage: 89 },
                      { feature: 'Fenced Yard', percentage: 76 },
                      { feature: 'Updated Kitchen', percentage: 71 }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">{item.feature}</span>
                        <div className="flex items-center">
                          <div className="w-16 h-2 bg-gray-200 rounded-full mr-2">
                            <div 
                              className="h-2 bg-gradient-to-r from-green-400 to-green-600 rounded-full" 
                              style={{width: `${item.percentage}%`}}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-500 w-8">{item.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing Insights */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                    Average Showing Fees
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg border border-purple-100">
                      <span className="text-sm font-medium text-gray-700">Single Family</span>
                      <span className="text-purple-600 font-bold">$55</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg border border-purple-100">
                      <span className="text-sm font-medium text-gray-700">Condo/Townhouse</span>
                      <span className="text-purple-600 font-bold">$45</span>
                    </div>
                  </div>
                </div>

                {/* AI Recommendation */}
                <div className="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl border border-yellow-200">
                  <div className="flex items-start">
                    <SparkleIcon className="w-5 h-5 text-yellow-600 mr-2 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-yellow-800 text-sm">AI Recommendation</h4>
                      <p className="text-yellow-700 text-xs mt-1">
                        Focus on properties with home offices this week. Demand is 23% higher than average.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <SparkleIcon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Unlock AI Market Intelligence</h3>
                <p className="text-gray-600 text-sm mb-6">
                  Get powerful insights on market trends, pricing optimization, and demand patterns.
                </p>
                <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Upgrade to Premium
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
