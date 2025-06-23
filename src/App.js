import React, { useState } from 'react';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import PricingPage from './pages/PricingPage';
import DashboardPage from './pages/DashboardPage';

/**
 * Main App Component
 * AI-Powered Real Estate Platform - Homes2Show
 * Professional, scalable architecture with intelligent features
 */
export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} />;
      case 'pricing':
        return <PricingPage />;
      case 'dashboard':
        return <DashboardPage />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}
