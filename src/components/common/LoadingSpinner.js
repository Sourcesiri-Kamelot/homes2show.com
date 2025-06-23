import React from 'react';
import SparkleIcon from './SparkleIcon';

/**
 * LoadingSpinner Component
 * AI-themed loading indicator for Homes2Show platform
 * Created by: Nyasha Bivins | Powered by: Helo IM AI Inc.
 */
const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="text-center">
        {/* AI-themed loading animation */}
        <div className="relative">
          {/* Outer rotating ring */}
          <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-4"></div>
          
          {/* Inner sparkle icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <SparkleIcon className="w-6 h-6 text-orange-500 animate-pulse" />
          </div>
        </div>
        
        {/* Loading text */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900">
            Loading AI Platform
          </h3>
          <p className="text-sm text-gray-600">
            Initializing intelligent features...
          </p>
        </div>
        
        {/* AI enhancement indicators */}
        <div className="mt-6 flex justify-center space-x-4 text-xs text-gray-500">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-orange-500 rounded-full mr-2 animate-pulse"></div>
            <span>AI Systems</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse" style={{animationDelay: '0.5s'}}></div>
            <span>Smart Features</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse" style={{animationDelay: '1s'}}></div>
            <span>User Experience</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
