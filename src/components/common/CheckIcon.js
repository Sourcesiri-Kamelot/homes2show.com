import React from 'react';

/**
 * CheckIcon Component
 * Professional check mark icon for success states and feature lists
 * Part of Homes2Show AI-powered platform design system
 */
const CheckIcon = ({ className = "", size = "w-6 h-6" }) => (
  <svg 
    className={`${size} text-green-500 ${className}`} 
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
      d="M5 13l4 4L19 7"
    />
  </svg>
);

export default CheckIcon;
