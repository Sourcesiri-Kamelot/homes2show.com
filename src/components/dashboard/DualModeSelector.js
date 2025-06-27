import React, { useState } from 'react';

/**
 * Dual Mode Selector Component
 * Allows users to switch between Client and Agent modes
 * Created by: Nyasha Bivins | Powered by: Helo IM AI Inc.
 */
const DualModeSelector = ({ currentMode, onModeChange }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-orange-200">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          🏠 What brings you to Homes2Show today?
        </h2>
        <p className="text-gray-600">
          Choose your role to access the perfect tools for your needs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Client Mode */}
        <button
          onClick={() => onModeChange('client')}
          className={`p-6 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
            currentMode === 'client'
              ? 'border-orange-500 bg-orange-50 shadow-lg'
              : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50'
          }`}
        >
          <div className="text-center">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
              currentMode === 'client' ? 'bg-orange-500' : 'bg-gray-400'
            }`}>
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              🏡 I Need Agents for Showings
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Post showing requests, browse agents, and book appointments
            </p>
            <div className="space-y-2 text-sm text-left">
              <div className="flex items-center text-green-600">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                Post showing requests
              </div>
              <div className="flex items-center text-green-600">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                Browse available agents
              </div>
              <div className="flex items-center text-green-600">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                AI-powered agent matching
              </div>
            </div>
          </div>
        </button>

        {/* Agent Mode */}
        <button
          onClick={() => onModeChange('agent')}
          className={`p-6 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
            currentMode === 'agent'
              ? 'border-purple-500 bg-purple-50 shadow-lg'
              : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
          }`}
        >
          <div className="text-center">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
              currentMode === 'agent' ? 'bg-purple-500' : 'bg-gray-400'
            }`}>
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              🤝 I Want to Do Showings
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Browse opportunities, apply for showings, and track earnings
            </p>
            <div className="space-y-2 text-sm text-left">
              <div className="flex items-center text-green-600">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                Browse showing opportunities
              </div>
              <div className="flex items-center text-green-600">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                Track earnings & ratings
              </div>
              <div className="flex items-center text-green-600">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                Superstar agent algorithm
              </div>
            </div>
          </div>
        </button>
      </div>

      {/* Quick Switch */}
      <div className="mt-6 text-center">
        <p className="text-gray-500 text-sm">
          You can switch between modes anytime. Many users do both! 
          <span className="text-orange-600 font-medium"> 🚀 Double the opportunities!</span>
        </p>
      </div>
    </div>
  );
};

export default DualModeSelector;
