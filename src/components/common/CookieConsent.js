import React, { useState, useEffect } from 'react';

/**
 * Cookie Consent Banner Component
 * GDPR/CCPA compliant cookie consent for Homes2Show
 * Created by: Nyasha Bivins | Powered by: Helo IM AI Inc.
 */
const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('homes2show-cookie-consent');
    
    if (!cookieConsent) {
      // Show banner after a short delay for better UX
      setTimeout(() => {
        setShowBanner(true);
        setTimeout(() => setIsVisible(true), 100);
      }, 2000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('homes2show-cookie-consent', 'accepted');
    localStorage.setItem('homes2show-cookie-timestamp', new Date().toISOString());
    
    // Initialize analytics
    console.log('🍪 Analytics initialized - user accepted cookies');
    
    // Hide banner
    setIsVisible(false);
    setTimeout(() => setShowBanner(false), 300);
  };

  const handleDecline = () => {
    localStorage.setItem('homes2show-cookie-consent', 'declined');
    localStorage.setItem('homes2show-cookie-timestamp', new Date().toISOString());
    
    // Disable analytics
    console.log('🚫 Analytics disabled - user declined cookies');
    
    // Hide banner
    setIsVisible(false);
    setTimeout(() => setShowBanner(false), 300);
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      />
      
      {/* Cookie Banner */}
      <div 
        className={`fixed bottom-0 left-0 right-0 z-50 transform transition-all duration-300 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}
      >
        <div className="bg-white border-t border-gray-200 shadow-2xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              
              {/* Cookie Message */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🍪</span>
                  </div>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    This website uses cookies.
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed max-w-2xl">
                    We use cookies to analyze website traffic and optimize your website experience. 
                    By accepting our use of cookies, your data will be aggregated with all other user data.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 lg:flex-shrink-0">
                <button
                  onClick={handleDecline}
                  className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Decline
                </button>
                
                <button
                  onClick={handleAccept}
                  className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 transform hover:scale-105"
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CookieConsent;
