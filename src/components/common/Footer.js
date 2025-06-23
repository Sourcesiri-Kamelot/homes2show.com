import React from 'react';

/**
 * Footer Component
 * Professional footer for Homes2Show AI platform
 * Features AI branding and comprehensive site links
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    { label: 'About', href: '#', category: 'company' },
    { label: 'AI Features', href: '#', category: 'product' },
    { label: 'Community Guidelines', href: '#', category: 'support' },
    { label: 'Contact', href: '#', category: 'support' },
    { label: 'Terms', href: '#', category: 'legal' },
    { label: 'Privacy', href: '#', category: 'legal' }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-800 via-gray-900 to-black relative overflow-hidden">
      {/* AI-themed background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-orange-500/10 to-purple-500/10"></div>
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <svg 
                className="w-8 h-8 text-orange-500" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
                />
              </svg>
              <span className="ml-3 text-2xl font-bold text-white">Homes2Show</span>
              <span className="ml-2 text-xs font-semibold text-orange-400 bg-orange-500/20 px-2 py-1 rounded-full">
                AI-Powered
              </span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed max-w-md">
              Revolutionizing real estate showings with artificial intelligence. 
              Connect with agents, optimize schedules, and close more deals with 
              our advanced AI platform.
            </p>
            <div className="flex items-center mt-4 space-x-4">
              <div className="flex items-center text-xs text-gray-400">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                AI Systems Online
              </div>
              <div className="text-xs text-gray-400">
                99.9% Uptime
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Platform</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-orange-400 text-sm transition-colors duration-200">AI Dashboard</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-400 text-sm transition-colors duration-200">Smart Matching</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-400 text-sm transition-colors duration-200">Analytics</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-400 text-sm transition-colors duration-200">API Access</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-orange-400 text-sm transition-colors duration-200">Help Center</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-400 text-sm transition-colors duration-200">AI Training</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-400 text-sm transition-colors duration-200">Community</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-400 text-sm transition-colors duration-200">Status Page</a></li>
            </ul>
          </div>
        </div>

        {/* Footer Links */}
        <div className="border-t border-gray-700 pt-8">
          <nav className="flex flex-wrap justify-center space-x-6 mb-6">
            {footerLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-gray-400 hover:text-orange-400 text-sm transition-colors duration-200 hover:underline"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Copyright and AI Attribution */}
          <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} Homes2Show. All rights reserved. 
              <span className="ml-2 text-orange-400">Powered by Advanced AI</span>
            </p>
            <div className="flex items-center mt-4 sm:mt-0 space-x-4">
              <div className="flex items-center text-xs text-gray-500">
                <svg className="w-3 h-3 mr-1 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2.5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5a.75.75 0 01.75-.75z"/>
                </svg>
                Built with Intelligence
              </div>
              <div className="text-xs text-gray-500">
                Version 1.0.0
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
