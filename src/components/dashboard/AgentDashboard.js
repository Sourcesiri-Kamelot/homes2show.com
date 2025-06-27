import React, { useState } from 'react';

/**
 * Agent Dashboard Component
 * Shows earnings, ratings, showings, and superstar status
 * Created by: Nyasha Bivins | Powered by: Helo IM AI Inc.
 */
const AgentDashboard = ({ userInfo }) => {
  // Mock data - would come from API in production
  const [agentStats] = useState({
    totalEarnings: 2847.50,
    thisMonthEarnings: 485.00,
    totalShowings: 23,
    completedShowings: 21,
    starRating: 4.8,
    superstarStatus: true,
    algorithmRank: 3,
    totalAgents: 156
  });

  const [availableShowings] = useState([
    {
      id: 1,
      address: "123 Maple Street, Beverly Hills, CA 90210",
      clientName: "Sarah Johnson",
      showingDate: "2025-06-26",
      showingTime: "2:00 PM",
      estimatedEarning: 75,
      propertyType: "Luxury Condo",
      clientNotes: "Looking for 2-3 bedrooms, modern kitchen, good schools nearby",
      urgency: "high",
      requirements: ["Licensed Agent", "Luxury Experience", "Available Weekends"]
    },
    {
      id: 2,
      address: "456 Oak Avenue, Santa Monica, CA 90401",
      clientName: "Michael Chen",
      showingDate: "2025-06-27",
      showingTime: "10:00 AM",
      estimatedEarning: 60,
      propertyType: "Beach House",
      clientNotes: "First-time buyer, needs guidance on process",
      urgency: "medium",
      requirements: ["Patient with First-Time Buyers", "Weekend Availability"]
    },
    {
      id: 3,
      address: "789 Pine Road, Malibu, CA 90265",
      clientName: "Jennifer Davis",
      showingDate: "2025-06-28",
      showingTime: "4:00 PM",
      estimatedEarning: 120,
      propertyType: "Oceanfront Estate",
      clientNotes: "High-net-worth client, looking for investment property",
      urgency: "high",
      requirements: ["Luxury Market Expert", "Investment Knowledge", "Flexible Schedule"]
    }
  ]);

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-8">
      {/* Agent Status Header */}
      <div className="bg-gradient-to-r from-purple-600 to-orange-600 text-white rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center mb-2">
              <h1 className="text-2xl font-bold mr-3">Agent Dashboard</h1>
              {agentStats.superstarStatus && (
                <div className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold flex items-center">
                  ⭐ SUPERSTAR AGENT
                </div>
              )}
            </div>
            <p className="text-purple-100">
              Welcome back! You're ranked #{agentStats.algorithmRank} of {agentStats.totalAgents} agents
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">${agentStats.totalEarnings.toFixed(2)}</div>
            <div className="text-purple-200 text-sm">Total Earnings</div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* This Month Earnings */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">This Month</p>
              <p className="text-2xl font-bold text-green-600">${agentStats.thisMonthEarnings.toFixed(2)}</p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Star Rating */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Star Rating</p>
              <div className="flex items-center">
                <p className="text-2xl font-bold text-yellow-600 mr-2">{agentStats.starRating}</p>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(agentStats.starRating) ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Total Showings */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Showings</p>
              <p className="text-2xl font-bold text-blue-600">{agentStats.totalShowings}</p>
              <p className="text-green-600 text-xs">{agentStats.completedShowings} completed</p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Algorithm Rank */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Algorithm Rank</p>
              <p className="text-2xl font-bold text-purple-600">#{agentStats.algorithmRank}</p>
              <p className="text-purple-600 text-xs">of {agentStats.totalAgents} agents</p>
            </div>
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Available Showings */}
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">🏡 Available Showings</h2>
          <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
            {availableShowings.length} opportunities
          </div>
        </div>

        <div className="space-y-4">
          {availableShowings.map((showing) => (
            <div key={showing.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 mr-3">
                      {showing.address}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(showing.urgency)}`}>
                      {showing.urgency.toUpperCase()} PRIORITY
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">
                    <strong>Client:</strong> {showing.clientName} • <strong>Type:</strong> {showing.propertyType}
                  </p>
                  <p className="text-gray-600 mb-3">
                    <strong>When:</strong> {showing.showingDate} at {showing.showingTime}
                  </p>
                  <p className="text-gray-700 mb-3">
                    <strong>Client Notes:</strong> {showing.clientNotes}
                  </p>
                  
                  {/* Requirements */}
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Requirements:</p>
                    <div className="flex flex-wrap gap-2">
                      {showing.requirements.map((req, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="text-right ml-6">
                  <div className="text-2xl font-bold text-green-600 mb-2">
                    ${showing.estimatedEarning}
                  </div>
                  <p className="text-gray-500 text-sm mb-4">Estimated Earning</p>
                  
                  <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200 transform hover:scale-105">
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Superstar Benefits */}
      {agentStats.superstarStatus && (
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl shadow-xl p-6 border border-yellow-200">
          <div className="text-center">
            <div className="text-4xl mb-4">⭐</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Congratulations! You're a Superstar Agent!
            </h2>
            <p className="text-gray-600 mb-6">
              Your excellent ratings and performance have earned you special benefits
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 border border-yellow-200">
                <div className="text-2xl mb-2">🚀</div>
                <h3 className="font-semibold text-gray-900 mb-1">Priority Algorithm</h3>
                <p className="text-gray-600 text-sm">You appear first in agent searches</p>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-yellow-200">
                <div className="text-2xl mb-2">💰</div>
                <h3 className="font-semibold text-gray-900 mb-1">Higher Earnings</h3>
                <p className="text-gray-600 text-sm">Access to premium showing opportunities</p>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-yellow-200">
                <div className="text-2xl mb-2">🏆</div>
                <h3 className="font-semibold text-gray-900 mb-1">Exclusive Badge</h3>
                <p className="text-gray-600 text-sm">Superstar badge on your profile</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentDashboard;
