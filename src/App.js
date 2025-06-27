import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import CookieConsent from './components/common/CookieConsent';
import LoadingSpinner from './components/common/LoadingSpinner';

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/HomePage'));
const PricingPage = lazy(() => import('./pages/PricingPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const SignUpPage = lazy(() => import('./pages/SignUpPage'));
const SignInPage = lazy(() => import('./pages/SignInPage'));
const PaymentPage = lazy(() => import('./pages/PaymentPage'));
const VirtualShowingStudio = lazy(() => import('./components/virtual/VirtualShowingStudio'));
const QuantumDashboard = lazy(() => import('./pages/QuantumDashboard'));

/**
 * Main App Component - Homes2Show AI Platform
 * Created by: Nyasha Bivins
 * Powered by: Helo IM AI Inc. | https://www.helo-im.ai
 * 
 * 🌟 QUANTUM BREAKTHROUGH UPDATE 🌟
 * Now featuring the world's first Quantum Property Matching System!
 * Revolutionary AI that predicts perfect properties before clients know they want them.
 * 
 * Phase 4: AWS Authentication & Payment Integration
 * Phase 5: QUANTUM REAL ESTATE REVOLUTION (NEW!)
 * - Quantum behavioral analysis and property matching
 * - AI-enhanced lead generation with subconscious preference detection
 * - Real-time emotional resonance tracking
 * - Predictive desire mapping technology
 */
export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-gray-50">
        {/* Navigation */}
        <Navbar />
        
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
