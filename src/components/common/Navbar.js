import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SparkleIcon from './SparkleIcon';

/**
 * Navbar Component
 * Professional navigation bar for Homes2Show AI platform
 * Features React Router integration and AI-enhanced branding
 * Created by: Nyasha Bivins | Powered by: Helo IM AI Inc.
 */
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const navItems = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'pricing', label: 'Pricing', path: '/pricing' },
    { id: 'quantum', label: 'Quantum AI', path: '/quantum' },
    { id: 'virtual', label: 'Virtual Tours', path: '/virtual-showing' },
    { id: 'dashboard', label: 'Dashboard', path: '/dashboard' }
  ];

  const isActivePath = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <Link 
            to="/" 
            className="flex-shrink-0 flex items-center group transition-all duration-200 hover:scale-105"
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
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`
                  relative px-3 py-2 text-sm font-medium transition-all duration-200
                  ${isActivePath(item.path)
                    ? 'text-orange-600 border-b-2 border-orange-500' 
                    : 'text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300'
                  }
                  focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-md
                `}
              >
                {item.label}
                {/* Active indicator */}
                {isActivePath(item.path) && (
                  <div className="absolute inset-x-0 -bottom-px h-0.5 bg-gradient-to-r from-orange-400 to-orange-600"></div>
                )}
              </Link>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <Link 
              to="/signin"
              className="hidden md:inline-flex items-center px-4 py-2 border border-orange-500 text-orange-600 font-medium rounded-lg hover:bg-orange-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              Sign In
            </Link>
            <Link 
              to="/signup"
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transform hover:scale-105"
            >
              Sign Up
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="sm:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500"
            >
              <span className="sr-only">Open main menu</span>
              {!isMobileMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200 shadow-lg">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`
                  block px-3 py-2 rounded-md text-base font-medium transition-all duration-200
                  ${isActivePath(item.path)
                    ? 'text-orange-600 bg-orange-50 border-l-4 border-orange-500'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }
                `}
              >
                <div className="flex items-center">
                  {isActivePath(item.path) && (
                    <SparkleIcon className="w-4 h-4 text-orange-500 mr-2" />
                  )}
                  {item.label}
                </div>
              </Link>
            ))}
            
            {/* Mobile action buttons */}
            <div className="pt-4 pb-2 border-t border-gray-200 space-y-2">
              <button className="w-full text-left px-3 py-2 text-base font-medium text-orange-600 hover:bg-orange-50 rounded-md transition-all duration-200">
                Log In
              </button>
              <button className="w-full text-left px-3 py-2 text-base font-medium bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-md hover:from-orange-600 hover:to-orange-700 transition-all duration-200">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
