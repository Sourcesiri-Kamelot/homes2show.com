import React from 'react';

/**
 * SparkleIcon Component
 * AI-themed sparkle icon representing intelligent features
 * Signature element of Homes2Show's AI-powered platform
 */
const SparkleIcon = ({ className = "", size = "w-5 h-5" }) => (
  <svg 
    className={`${size} ${className}`} 
    fill="currentColor" 
    viewBox="0 0 20 20" 
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path d="M10 2.5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5a.75.75 0 01.75-.75zM10 17.5a.75.75 0 01-.75-.75v-3.5a.75.75 0 011.5 0v3.5a.75.75 0 01-.75.75zM5.134 6.866a.75.75 0 011.06 0l2.475 2.475a.75.75 0 01-1.06 1.06L5.134 7.926a.75.75 0 010-1.06zM12.33 14.06a.75.75 0 011.06 0l2.475 2.475a.75.75 0 01-1.06 1.06l-2.475-2.475a.75.75 0 010-1.06zM2.5 10a.75.75 0 01.75-.75h3.5a.75.75 0 010 1.5h-3.5A.75.75 0 012.5 10zM17.5 10a.75.75 0 01-.75.75h-3.5a.75.75 0 010-1.5h3.5a.75.75 0 01.75.75zM6.866 14.866a.75.75 0 010-1.06l2.475-2.475a.75.75 0 011.06 1.06l-2.475 2.475a.75.75 0 01-1.06 0zM14.06 5.196a.75.75 0 010-1.06l2.475-2.475a.75.75 0 111.06 1.06l-2.475 2.475a.75.75 0 01-1.06 0z" />
  </svg>
);

export default SparkleIcon;
