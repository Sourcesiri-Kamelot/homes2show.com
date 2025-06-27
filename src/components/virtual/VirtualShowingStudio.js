import React, { useState } from 'react';

/**
 * Virtual Showing Studio - SIMPLIFIED VERSION THAT WORKS! 🦄
 * Step by step implementation - we'll build it up gradually
 * Created by: Nyasha Bivins | Powered by: Helo IM AI Inc.
 */
const VirtualShowingStudio = () => {
  const [isLive, setIsLive] = useState(false);
  const [currentRoom, setCurrentRoom] = useState('living-room');
  const [aiSpeaking, setAiSpeaking] = useState(false);

  // Simple property rooms for now
  const propertyRooms = [
    {
      id: 'entrance',
      name: '🚪 Grand Entrance',
      description: 'Marble flooring with crystal chandelier'
    },
    {
      id: 'living-room',
      name: '🛋️ Living Room',
      description: 'Ocean views with fireplace'
    },
    {
      id: 'kitchen',
      name: '👨‍🍳 Gourmet Kitchen',
      description: 'Granite counters with stainless appliances'
    },
    {
      id: 'master-bedroom',
      name: '🛏️ Master Suite',
      description: 'Walk-in closet with en-suite bathroom'
    },
    {
      id: 'backyard',
      name: '🌳 Backyard Oasis',
      description: 'Swimming pool with outdoor kitchen'
    }
  ];

  // Start virtual showing
  const startVirtualShowing = () => {
    setIsLive(true);
    speakAIResponse("Welcome to your virtual property tour! I'm your AI assistant and I'm excited to show you this incredible property. Let's explore together!");
  };

  // Simple AI response function
  const speakAIResponse = (text) => {
    setAiSpeaking(true);
    
    // Use browser's speech synthesis if available
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      utterance.volume = 0.8;
      
      utterance.onend = () => {
        setAiSpeaking(false);
      };
      
      speechSynthesis.speak(utterance);
    } else {
      // Fallback - just show the text
      setTimeout(() => setAiSpeaking(false), 3000);
    }
  };

  // Navigate to different room
  const navigateToRoom = (roomId) => {
    setCurrentRoom(roomId);
    const room = propertyRooms.find(r => r.id === roomId);
    speakAIResponse(`Welcome to the ${room.name}! ${room.description}. This is a beautiful space with amazing features.`);
  };

  const currentRoomData = propertyRooms.find(r => r.id === currentRoom);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      {/* Header */}
      <div className="bg-black/30 backdrop-blur-sm p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              🦄
            </div>
            <div>
              <h1 className="text-xl font-bold">Virtual Showing Studio</h1>
              <p className="text-purple-200 text-sm">AI-Powered Property Experience</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {isLive && (
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-red-400 font-medium">LIVE</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Virtual Tour View */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Room Display */}
            <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
              <div className="text-center">
                <div className="aspect-video bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white text-lg font-medium mb-4">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🏠</div>
                    <div className="text-2xl font-bold">{currentRoomData?.name}</div>
                    <div className="text-lg opacity-75">{currentRoomData?.description}</div>
                    <div className="text-sm opacity-50 mt-2">Virtual Property Tour</div>
                  </div>
                </div>

                {/* Room Navigation */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {propertyRooms.map((room) => (
                    <button
                      key={room.id}
                      onClick={() => navigateToRoom(room.id)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        currentRoom === room.id
                          ? 'bg-purple-500 text-white'
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      {room.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* AI Assistant Interface */}
            <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
              <div className="flex items-center space-x-4">
                {/* AI Avatar */}
                <div className="relative">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-purple-500">
                    <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl">
                      🤖
                    </div>
                  </div>
                  
                  {/* Speaking Animation */}
                  {aiSpeaking && (
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>

                {/* AI Response Area */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold">AI Assistant</h3>
                    {aiSpeaking && (
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-green-400 text-sm ml-2">Speaking...</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-white/10 rounded-lg p-3">
                    <p className="text-sm">
                      {aiSpeaking 
                        ? "I'm providing insights about this beautiful space..."
                        : "Welcome! I'm your AI real estate assistant. Click 'Start Virtual Showing' to begin your personalized property tour!"
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Controls & Info */}
          <div className="space-y-6">
            {/* Property Info */}
            <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-green-500/30">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-2"></span>
                Property Details
              </h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-300">Address:</span>
                  <span className="text-white">123 Luxury Lane, Beverly Hills</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Price:</span>
                  <span className="text-green-400 font-bold">$2,847,500</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Bedrooms:</span>
                  <span className="text-blue-400">4</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Bathrooms:</span>
                  <span className="text-blue-400">3.5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Square Feet:</span>
                  <span className="text-yellow-400">3,200</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/30">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              
              <div className="space-y-3">
                <button
                  onClick={() => speakAIResponse("This property features incredible ocean views, a gourmet kitchen, and luxurious finishes throughout. The market analysis shows properties like this are selling 15% above asking price!")}
                  className="w-full bg-blue-500/20 hover:bg-blue-500/30 rounded-lg p-3 text-left transition-all"
                >
                  <div className="flex items-center">
                    <span className="text-blue-400 mr-2">💰</span>
                    <span className="text-sm">Get Market Analysis</span>
                  </div>
                </button>
                
                <button
                  onClick={() => speakAIResponse("Let me tell you about the amazing features in this room. The high ceilings, natural light, and premium finishes make this space truly special!")}
                  className="w-full bg-green-500/20 hover:bg-green-500/30 rounded-lg p-3 text-left transition-all"
                >
                  <div className="flex items-center">
                    <span className="text-green-400 mr-2">✨</span>
                    <span className="text-sm">Highlight Features</span>
                  </div>
                </button>
                
                <button
                  onClick={() => speakAIResponse("Based on current market trends, this property offers excellent investment potential with an estimated 8.2% annual appreciation rate!")}
                  className="w-full bg-purple-500/20 hover:bg-purple-500/30 rounded-lg p-3 text-left transition-all"
                >
                  <div className="flex items-center">
                    <span className="text-purple-400 mr-2">📊</span>
                    <span className="text-sm">Investment Insights</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Start Virtual Showing */}
            {!isLive && (
              <button
                onClick={startVirtualShowing}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
              >
                🚀 Start Virtual Showing
              </button>
            )}

            {/* Status */}
            {isLive && (
              <div className="bg-gradient-to-r from-green-50 to-blue-50 text-gray-800 rounded-2xl p-6 border border-green-200">
                <div className="text-center">
                  <div className="text-2xl mb-2">🎉</div>
                  <h3 className="font-bold mb-2">Virtual Tour Active!</h3>
                  <p className="text-sm">
                    Your AI assistant is ready to help. Click the room buttons to explore different areas, or use the quick actions to get insights!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualShowingStudio;
