import React from 'react';

/**
 * Navbar Component
 * Professional navigation bar for Homes2Show AI platform
 * Features responsive design and AI-enhanced branding
 */
const Navbar = ({ currentPage, setCurrentPage }) => {
  const navItems = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'pricing', label: 'Pricing', path: '/pricing' },
    { id: 'dashboard', label: 'Dashboard', path: '/dashboard' }
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div 
            className="flex-shrink-0 flex items-center cursor-pointer group transition-all duration-200 hover:scale-105" 
            onClick={() => setCurrentPage('home')}
          >
            <div className="relative">
              <svg 
                className="w-8 h-8 text-orange-500 group-hover:text-orange-600 transition-colors duration-200" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
                />
              </svg>
              {/* AI Glow Effect */}
              <div className="absolute inset-0 w-8 h-8 bg-orange-500 rounded-full opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-200"></div>
            </div>
            <span className="ml-3 text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Homes2Show
            </span>
            <span className="ml-2 text-xs font-semibold text-orange-500 bg-orange-50 px-2 py-1 rounded-full">
              AI
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`
                  relative px-3 py-2 text-sm font-medium transition-all duration-200
                  ${currentPage === item.id 
                    ? 'text-orange-600 border-b-2 border-orange-500' 
                    : 'text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300'
                  }
                  focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-md
                `}
              >
                {item.label}
                {/* Active indicator */}
                {currentPage === item.id && (
                  <div className="absolute inset-x-0 -bottom-px h-0.5 bg-gradient-to-r from-orange-400 to-orange-600"></div>
                )}
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <button className="hidden md:inline-flex items-center px-4 py-2 border border-orange-500 text-orange-600 font-medium rounded-lg hover:bg-orange-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
              Log In
            </button>
            <button className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transform hover:scale-105">
              Sign Up
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu (Hidden by default, will be implemented in Phase 2) */}
      <div className="sm:hidden">
        {/* Mobile menu implementation will be added with React Router */}
      </div>
    </nav>
  );
};

export default Navbar;
