import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Comprehensive Footer Component
 * Matches and enhances Showami's footer structure
 * Includes all product categories and legal compliance
 */

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = {
    products: {
      title: 'Products',
      links: [
        { name: 'Standard Showings Platform', href: '/platform' },
        { name: 'Buyer\'s Agent Best Practices', href: '/buyers-agent-practices' },
        { name: 'Showing Agent Best Practices', href: '/showing-agent-practices' },
        { name: 'Listing Agent Assistance', href: '/listing-agent-assistance' },
        { name: 'Consumer Showings', href: '/consumer-showings' },
        { name: 'Brokerage Solution', href: '/brokerage-solution' },
        { name: 'Elite Brokerage Solution', href: '/elite-brokerage' },
        { name: 'Property Management', href: '/property-management' },
        { name: 'Rental Showings', href: '/rental-showings' },
        { name: 'Rental Open Houses', href: '/rental-open-houses' },
        { name: 'Property Management Pro', href: '/property-management-pro' },
        { name: 'Landlords', href: '/landlords' },
        { name: 'Enterprise Solutions', href: '/enterprise' },
        { name: 'Advanced Enterprise Solutions', href: '/advanced-enterprise' }
      ]
    },
    premium: {
      title: 'Homes2Show Pro',
      links: [
        { name: 'General Information', href: '/pro' },
        { name: 'Referral Network', href: '/pro/referrals' },
        { name: 'Open Houses', href: '/pro/open-houses' },
        { name: 'Inspections', href: '/pro/inspections' },
        { name: 'Appraisals', href: '/pro/appraisals' },
        { name: 'Multimedia Showing Requests', href: '/pro/multimedia' },
        { name: 'Client Portal', href: '/pro/client-portal' },
        { name: 'Tasks - Lock Box Runner', href: '/pro/lockbox-runner' },
        { name: 'Tasks - Condition Reports', href: '/pro/condition-reports' },
        { name: 'Groups Feature', href: '/pro/groups' },
        { name: 'AI-Enhanced Matching', href: '/pro/ai-matching', badge: 'Enhanced' },
        { name: 'Advanced Analytics', href: '/pro/analytics', badge: 'Enhanced' }
      ]
    },
    resources: {
      title: 'Resources',
      links: [
        { name: 'Tools & Courses', href: '/resources/tools' },
        { name: 'Pricing', href: '/pricing' },
        { name: 'Showing Agent Coverage', href: '/coverage' },
        { name: 'Homes2Show Blog', href: '/blog' },
        { name: 'Mobile App', href: '/app' },
        { name: 'News and Updates', href: '/news' },
        { name: 'Market Information', href: '/market-information', badge: 'New' },
        { name: 'State Compliance Guide', href: '/state-compliance', badge: 'New' },
        { name: 'NAR Settlement Resources', href: '/nar-settlement' }
      ]
    },
    legal: {
      title: 'Legal',
      links: [
        { name: 'Application End User License Agreement', href: '/terms' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'NAR Settlement Resources', href: '/nar-settlement' },
        { name: 'State Real Estate Commissions', href: '/state-commissions' },
        { name: 'Legal Disclaimers', href: '/legal' },
        { name: 'Compliance Information', href: '/compliance' }
      ]
    },
    company: {
      title: 'Company',
      links: [
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
        { name: 'Support', href: '/support' },
        { name: 'Learn More', href: '/learn' },
        { name: 'Testimonials', href: '/testimonials' },
        { name: 'Frequently Asked Questions', href: '/faq' },
        { name: 'Careers', href: '/careers', badge: 'New' },
        { name: 'Press', href: '/press' }
      ]
    }
  };

  const socialLinks = [
    { name: 'Twitter', href: 'https://twitter.com/homes2show', icon: '🐦' },
    { name: 'LinkedIn', href: 'https://linkedin.com/company/homes2show', icon: '💼' },
    { name: 'Facebook', href: 'https://facebook.com/homes2show', icon: '📘' },
    { name: 'Instagram', href: 'https://instagram.com/homes2show', icon: '📷' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">
                🏠 Homes2Show
              </h3>
              <p className="text-gray-300 text-sm mb-4">
                AI-enhanced real estate showing platform. Better than Showami with superior technology and compliance.
              </p>
              <div className="bg-blue-900 rounded-lg p-3 mb-4">
                <p className="text-blue-200 text-xs font-medium">
                  ⚖️ Fully Compliant Platform
                </p>
                <p className="text-blue-300 text-xs">
                  Licensed professionals only. Not a brokerage.
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  title={social.name}
                >
                  <span className="text-xl">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Footer Sections */}
          {Object.entries(footerSections).map(([key, section]) => (
            <div key={key} className="lg:col-span-1">
              <h4 className="text-lg font-semibold text-white mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.href}
                      className="text-gray-300 hover:text-white text-sm transition-colors flex items-center"
                    >
                      {link.name}
                      {link.badge && (
                        <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                          link.badge === 'New' 
                            ? 'bg-green-600 text-green-100' 
                            : 'bg-blue-600 text-blue-100'
                        }`}>
                          {link.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="max-w-md mx-auto text-center">
            <h4 className="text-lg font-semibold text-white mb-2">
              Stay Updated
            </h4>
            <p className="text-gray-300 text-sm mb-4">
              Get the latest updates on new features and industry insights.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              />
              <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-r-lg transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Copyright */}
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} Homes2Show, Inc. All rights reserved.
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
              <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms
              </Link>
              <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy
              </Link>
              <Link to="/legal" className="text-gray-400 hover:text-white transition-colors">
                Legal
              </Link>
              <Link to="/compliance" className="text-gray-400 hover:text-white transition-colors">
                Compliance
              </Link>
            </div>
          </div>

          {/* Legal Disclaimer */}
          <div className="mt-6 p-4 bg-red-900 rounded-lg">
            <p className="text-red-200 text-xs text-center">
              <strong>IMPORTANT:</strong> Homes2Show is not a real estate brokerage, regulatory agency, or trade association. 
              We do not enforce any regulation or agreement. We are a technology platform that facilitates connections 
              between consumers and licensed real estate professionals. All real estate transactions must be conducted 
              through properly licensed brokers and agents.
            </p>
          </div>

          {/* Competitive Notice */}
          <div className="mt-4 text-center">
            <p className="text-gray-500 text-xs">
              🚀 Enhanced platform with superior AI technology and compliance features
            </p>
          </div>
        </div>
      </div>

      {/* Mobile App Download Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="text-center sm:text-left mb-4 sm:mb-0">
              <h4 className="text-white font-semibold">📱 Get the Homes2Show App</h4>
              <p className="text-blue-100 text-sm">Enhanced mobile experience with AI features</p>
            </div>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors flex items-center"
              >
                <span className="mr-2">📱</span>
                App Store
              </a>
              <a
                href="#"
                className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors flex items-center"
              >
                <span className="mr-2">🤖</span>
                Google Play
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
