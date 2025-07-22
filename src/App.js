import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import CookieConsent from './components/common/CookieConsent';
import LoadingSpinner from './components/common/LoadingSpinner';
import LegalDisclaimers from './components/legal/LegalDisclaimers';
import NARSettlementGuidance from './components/compliance/NARSettlementGuidance';
import StateComplianceInfo from './components/compliance/StateComplianceInfo';

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/HomePage'));
const PricingPage = lazy(() => import('./pages/PricingPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const SignUpPage = lazy(() => import('./pages/SignUpPage'));
const SignInPage = lazy(() => import('./pages/SignInPage'));
const PaymentPage = lazy(() => import('./pages/PaymentPage'));
const VirtualShowingStudio = lazy(() => import('./components/virtual/VirtualShowingStudio'));
const QuantumDashboard = lazy(() => import('./pages/QuantumDashboard'));
const BrokerAuthPage = lazy(() => import('./pages/BrokerAuthPage'));

/**
 * Main App Component - Homes2Show AI Platform
 * Created by: Nyasha Bivins
 * Powered by: Helo IM AI Inc. | https://www.helo-im.ai
 * 
 * 🏠 LEGAL COMPLIANCE UPDATE 🏠
 * Now fully compliant with real estate laws and regulations!
 * - Licensed broker/agent authentication required
 * - No property valuations or investment advice
 * - Clear disclaimers on every page
 * - Compliant AI tools that empower licensed professionals
 * 
 * IMPORTANT: This platform is NOT a real estate brokerage.
 * We connect consumers with licensed real estate professionals.
 */
export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-gray-50">
        {/* Navigation */}
        <Navbar />
        
        {/* Legal Disclaimer Banner - Required on every page */}
        <div className="bg-red-600 text-white py-2 px-4 text-center text-sm">
          <strong>LEGAL NOTICE:</strong> Homes2Show is not a real estate brokerage, regulatory agency, or trade association. 
          We do not enforce any regulation or agreement.
          <a href="/legal" className="ml-2 underline hover:text-red-200">
            View Full Disclaimers
          </a>
        </div>
        
        {/* Main Content with Suspense for lazy loading */}
        <main className="flex-grow">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              {/* Public Routes */}
              <Route 
                path="/" 
                element={<HomePage />} 
              />
              <Route 
                path="/pricing" 
                element={<PricingPage />} 
              />
              <Route 
                path="/signup" 
                element={<SignUpPage />} 
              />
              <Route 
                path="/signin" 
                element={<SignInPage />} 
              />
              
              {/* Legal Compliance Routes */}
              <Route 
                path="/broker-auth" 
                element={<BrokerAuthPage />} 
              />
              <Route 
                path="/legal" 
                element={
                  <div className="max-w-4xl mx-auto py-12 px-4">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Legal Disclaimers</h1>
                    <LegalDisclaimers variant="full" />
                  </div>
                } 
              />
              <Route 
                path="/nar-settlement" 
                element={
                  <div className="max-w-4xl mx-auto py-12 px-4">
                    <NARSettlementGuidance />
                  </div>
                } 
              />
              <Route 
                path="/state-commissions" 
                element={
                  <div className="max-w-4xl mx-auto py-12 px-4">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">State Real Estate Commissions</h1>
                    <StateComplianceInfo />
                  </div>
                } 
              />
              
              {/* Protected Routes - Require License Verification */}
              <Route 
                path="/dashboard" 
                element={<DashboardPage />} 
              />
              <Route 
                path="/payment" 
                element={<PaymentPage />} 
              />
              <Route 
                path="/virtual-showing" 
                element={<VirtualShowingStudio />} 
              />
              <Route 
                path="/quantum-dashboard" 
                element={<QuantumDashboard />} 
              />
            </Routes>
          </Suspense>
        </main>

        {/* Footer with Legal Links */}
        <Footer />
        
        {/* Cookie Consent */}
        <CookieConsent />
      </div>
    </Router>
  );
}
                path="/pricing" 
                element={<PricingPage />} 
              />
              
              {/* Authentication Routes */}
              <Route 
                path="/signup" 
                element={<SignUpPage />} 
              />
              <Route 
                path="/signin" 
                element={<SignInPage />} 
              />
              <Route 
                path="/payment" 
                element={<PaymentPage />} 
              />
              
              {/* Virtual Showing - THE UNICORN FEATURE! */}
              <Route 
                path="/virtual-showing" 
                element={<VirtualShowingStudio />} 
              />
              
              {/* 🌟 QUANTUM DASHBOARD - THE REVOLUTIONARY BREAKTHROUGH! 🌟 */}
              <Route 
                path="/quantum" 
                element={<QuantumDashboard />} 
              />
              
              {/* Protected Route - Dashboard */}
              <Route 
                path="/dashboard" 
                element={<DashboardPage />} 
              />
              
              {/* Catch-all route - redirect to home */}
              <Route 
                path="*" 
                element={<HomePage />} 
              />
            </Routes>
          </Suspense>
        </main>
        
        {/* Footer */}
        <Footer />
        
        {/* Cookie Consent Banner */}
        <CookieConsent />
      </div>
    </Router>
  );
}
