import React, { useState } from 'react';

/**
 * Client Dashboard Component
 * For homeowners/clients who need agents for showings
 * Created by: Nyasha Bivins | Powered by: Helo IM AI Inc.
 */
const ClientDashboard = ({ userInfo }) => {
  const [showingRequests] = useState([
    {
      id: 1,
      address: "123 Maple Street, Beverly Hills, CA 90210",
      status: "active",
      applicants: 8,
      selectedAgent: null,
      datePosted: "2025-06-24",
      showingDate: "2025-06-26",
      budget: 75,
      propertyType: "Luxury Condo"
    },
    {
      id: 2,
      address: "456 Oak Avenue, Santa Monica, CA 90401", 
      status: "completed",
      applicants: 12,
      selectedAgent: "Sarah Wilson",
      datePosted: "2025-06-20",
      showingDate: "2025-06-22",
      budget: 60,
      propertyType: "Beach House"
    }
  ]);

  const [availableAgents] = useState([
    {
      id: 1,
      name: "Sarah Wilson",
      rating: 4.9,
      completedShowings: 156,
      specialties: ["Luxury Properties", "First-Time Buyers"],
      hourlyRate: 65,
      availability: "Available Today",
      superstar: true,
      profileImage: "/api/placeholder/64/64",
      bio: "Luxury real estate specialist with 8+ years experience in Beverly Hills and surrounding areas."
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      rating: 4.7,
      completedShowings: 89,
      specialties: ["Investment Properties", "Commercial"],
      hourlyRate: 55,
      availability: "Available Tomorrow",
      superstar: false,
      profileImage: "/api/placeholder/64/64",
      bio: "Investment property expert helping clients find the perfect rental and commercial opportunities."
    },
    {
      id: 3,
      name: "Jennifer Chen",
      rating: 4.8,
      completedShowings: 134,
      specialties: ["Family Homes", "School Districts"],
      hourlyRate: 60,
      availability: "Available This Week",
      superstar: true,
      profileImage: "/api/placeholder/64/64",
      bio: "Family-focused agent specializing in finding perfect homes near top-rated schools."
    }
  ]);

  const [showPostForm, setShowPostForm] = useState(false);
  const [newRequest, setNewRequest] = useState({
    address: '',
    propertyType: '',
    showingDate: '',
    showingTime: '',
    budget: '',
    requirements: '',
    clientNotes: ''
  });

  const handlePostRequest = (e) => {
    e.preventDefault();
    // Handle posting new showing request
    console.log('Posting new showing request:', newRequest);
    setShowPostForm(false);
    // Reset form
    setNewRequest({
      address: '',
      propertyType: '',
      showingDate: '',
      showingTime: '',
      budget: '',
      requirements: '',
      clientNotes: ''
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-8">
      {/* Client Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Client Dashboard</h1>
            <p className="text-blue-100">
              Find the perfect agents for your property showings
            </p>
          </div>
          <button
            onClick={() => setShowPostForm(true)}
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            + Post New Showing Request
          </button>
        </div>
      </div>

      {/* Post New Request Form */}
      {showPostForm && (
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">🏡 Post New Showing Request</h2>
            <button
              onClick={() => setShowPostForm(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handlePostRequest} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Address
                </label>
                <input
                  type="text"
                  value={newRequest.address}
                  onChange={(e) => setNewRequest({...newRequest, address: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="123 Main Street, City, State ZIP"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Type
                </label>
                <select
                  value={newRequest.propertyType}
                  onChange={(e) => setNewRequest({...newRequest, propertyType: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select Property Type</option>
                  <option value="Single Family Home">Single Family Home</option>
                  <option value="Condo">Condo</option>
                  <option value="Townhouse">Townhouse</option>
                  <option value="Luxury Property">Luxury Property</option>
                  <option value="Investment Property">Investment Property</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Showing Date
                </label>
                <input
                  type="date"
                  value={newRequest.showingDate}
                  onChange={(e) => setNewRequest({...newRequest, showingDate: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Showing Time
                </label>
                <input
                  type="time"
                  value={newRequest.showingTime}
                  onChange={(e) => setNewRequest({...newRequest, showingTime: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget (per showing)
                </label>
                <input
                  type="number"
                  value={newRequest.budget}
                  onChange={(e) => setNewRequest({...newRequest, budget: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="75"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Requirements
                </label>
                <input
                  type="text"
                  value={newRequest.requirements}
                  onChange={(e) => setNewRequest({...newRequest, requirements: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Licensed, Weekend availability, etc."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes for Agents
              </label>
              <textarea
                value={newRequest.clientNotes}
                onChange={(e) => setNewRequest({...newRequest, clientNotes: e.target.value})}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Tell agents what you're looking for, any specific needs, or preferences..."
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setShowPostForm(false)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700"
              >
                Post Showing Request
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Your Showing Requests */}
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-6">📋 Your Showing Requests</h2>
        
        <div className="space-y-4">
          {showingRequests.map((request) => (
            <div key={request.id} className="border border-gray-200 rounded-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 mr-3">
                      {request.address}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(request.status)}`}>
                      {request.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">
                    <strong>Property Type:</strong> {request.propertyType} • <strong>Budget:</strong> ${request.budget}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <strong>Showing Date:</strong> {request.showingDate} • <strong>Posted:</strong> {request.datePosted}
                  </p>
                  {request.selectedAgent && (
                    <p className="text-green-600 font-medium">
                      <strong>Selected Agent:</strong> {request.selectedAgent}
                    </p>
                  )}
                </div>

                <div className="text-right ml-6">
                  <div className="text-2xl font-bold text-blue-600 mb-2">
                    {request.applicants}
                  </div>
                  <p className="text-gray-500 text-sm mb-4">Agent Applications</p>
                  
                  {request.status === 'active' && (
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600">
                      View Applications
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Browse Available Agents */}
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">🤝 Browse Available Agents</h2>
          <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            {availableAgents.length} agents available
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableAgents.map((agent) => (
            <div key={agent.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                  </svg>
                </div>
                
                <div className="flex items-center justify-center mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 mr-2">{agent.name}</h3>
                  {agent.superstar && (
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-bold">
                      ⭐ SUPERSTAR
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-center mb-2">
                  <div className="flex items-center mr-3">
                    <span className="text-yellow-400 mr-1">★</span>
                    <span className="font-medium">{agent.rating}</span>
                  </div>
                  <span className="text-gray-600 text-sm">{agent.completedShowings} showings</span>
                </div>

                <p className="text-gray-600 text-sm mb-3">{agent.bio}</p>

                <div className="mb-3">
                  <div className="flex flex-wrap gap-1 justify-center">
                    {agent.specialties.map((specialty, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-center mb-4">
                  <div className="text-lg font-bold text-green-600">${agent.hourlyRate}/hour</div>
                  <div className="text-green-600 text-sm">{agent.availability}</div>
                </div>

                <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all">
                  Book This Agent
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
