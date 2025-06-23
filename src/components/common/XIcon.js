import React from 'react';

/**
 * XIcon Component
 * Professional X mark icon for negative states and feature exclusions
 * Part of Homes2Show AI-powered platform design system
 */
const XIcon = ({ className = "", size = "w-6 h-6" }) => (
  <svg 
    className={`${size} text-red-500 ${className}`} 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth="2" 
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

export default XIcon;
