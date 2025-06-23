import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import LoadingSpinner from './components/common/LoadingSpinner';

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/HomePage'));
const PricingPage = lazy(() => import('./pages/PricingPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));

/**
 * Main App Component - Homes2Show AI Platform
 * Created by: Nyasha Bivins
 * Powered by: Helo IM AI Inc. | https://www.helo-im.ai
 * 
 * Phase 2: React Router Implementation
 * - URL-based navigation with AWS optimization
 * - Protected routes preparation for AWS Cognito
 * - Mobile-responsive design with AI enhancement
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
      </div>
    </Router>
  );
}
