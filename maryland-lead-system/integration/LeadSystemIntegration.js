/**
 * Maryland Lead System Integration
 * Connects the lead dashboard with Homes2Show main application
 * Created by: Nyasha Bivins | Powered by: Helo IM AI Inc.
 */

// API Configuration
const API_CONFIG = {
  baseUrl: process.env.REACT_APP_API_URL || 'https://api.homes2show.com',
  endpoints: {
    leads: '/maryland-leads',
    properties: '/maryland-properties', 
    outreach: '/outreach-tracking',
    analytics: '/lead-analytics'
  }
};

/**
 * Lead Management Service
 * Handles all lead-related API calls
 */
export class LeadService {
  
  /**
   * Fetch leads from AWS Lambda backend
   */
  static async fetchLeads(filters = {}) {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.leads}?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch leads: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching leads:', error);
      throw error;
    }
  }

  /**
   * Update lead contact status
   */
  static async updateLeadContact(leadId, contactData) {
    try {
      const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.leads}/${leadId}/contact`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({
          contactAttempts: contactData.contactAttempts,
          lastContactDate: contactData.lastContactDate,
          status: contactData.status,
          notes: contactData.notes,
          outcome: contactData.outcome
        })
      });
      
      if (!response.ok) {
        throw new Error(`Failed to update lead: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error updating lead:', error);
      throw error;
    }
  }

  /**
   * Track outreach activity
   */
  static async trackOutreach(leadId, outreachData) {
    try {
      const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.outreach}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({
          leadId,
          agentId: localStorage.getItem('userId'),
          templateUsed: outreachData.templateUsed,
          contactMethod: outreachData.contactMethod,
          outcome: outreachData.outcome,
          notes: outreachData.notes,
          timestamp: new Date().toISOString()
        })
      });
      
      if (!response.ok) {
        throw new Error(`Failed to track outreach: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error tracking outreach:', error);
      throw error;
    }
  }

  /**
   * Get lead analytics
   */
  static async getLeadAnalytics(timeframe = '30d') {
    try {
      const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.analytics}?timeframe=${timeframe}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch analytics: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching analytics:', error);
      throw error;
    }
  }
}

/**
 * Property Data Service
 * Handles Maryland property data integration
 */
export class PropertyService {
  
  /**
   * Search Maryland properties
   */
  static async searchProperties(criteria) {
    try {
      const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.properties}/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({
          county: criteria.county,
          propertyType: criteria.propertyType,
          priceRange: criteria.priceRange,
          saleDate: criteria.saleDate,
          leadType: criteria.leadType
        })
      });
      
      if (!response.ok) {
        throw new Error(`Failed to search properties: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error searching properties:', error);
      throw error;
    }
  }

  /**
   * Get property details
   */
  static async getPropertyDetails(propertyId) {
    try {
      const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.properties}/${propertyId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch property details: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching property details:', error);
      throw error;
    }
  }
}

/**
 * Compliance Service
 * Ensures ethical outreach practices
 */
export class ComplianceService {
  
  /**
   * Check Do Not Call registry
   */
  static async checkDoNotCall(phoneNumber) {
    try {
      const response = await fetch(`${API_CONFIG.baseUrl}/compliance/dnc-check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({ phoneNumber })
      });
      
      if (!response.ok) {
        throw new Error(`Failed to check DNC: ${response.statusText}`);
      }
      
      const result = await response.json();
      return result.isOnDNC;
    } catch (error) {
      console.error('Error checking DNC:', error);
      return false; // Default to allowing contact if check fails
    }
  }

  /**
   * Log compliance activity
   */
  static async logComplianceActivity(activity) {
    try {
      const response = await fetch(`${API_CONFIG.baseUrl}/compliance/log`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({
          agentId: localStorage.getItem('userId'),
          leadId: activity.leadId,
          activityType: activity.type,
          details: activity.details,
          timestamp: new Date().toISOString()
        })
      });
      
      if (!response.ok) {
        throw new Error(`Failed to log compliance activity: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error logging compliance activity:', error);
      throw error;
    }
  }
}

/**
 * Integration Utilities
 */
export const IntegrationUtils = {
  
  /**
   * Format phone number for display
   */
  formatPhoneNumber: (phone) => {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone;
  },

  /**
   * Calculate lead score
   */
  calculateLeadScore: (property) => {
    let score = 50; // Base score
    
    // Recent sale bonus
    const saleDate = new Date(property.lastSaleDate);
    const monthsAgo = (Date.now() - saleDate.getTime()) / (1000 * 60 * 60 * 24 * 30);
    if (monthsAgo < 6) score += 20;
    else if (monthsAgo < 12) score += 15;
    else if (monthsAgo < 24) score += 10;
    
    // Property value bonus
    if (property.currentValue > 500000) score += 15;
    else if (property.currentValue > 300000) score += 10;
    else if (property.currentValue > 200000) score += 5;
    
    // Property type bonus
    if (property.propertyType === 'commercial') score += 10;
    
    // Lead type bonus
    if (property.leadType === 'expired_listing') score += 15;
    else if (property.leadType === 'fsbo') score += 12;
    else if (property.leadType === 'recent_sale') score += 8;
    
    return Math.min(100, Math.max(0, score));
  },

  /**
   * Get Maryland county name
   */
  getCountyName: (countyCode) => {
    const counties = {
      'baltimore': 'Baltimore County',
      'montgomery': 'Montgomery County',
      'princgeorges': 'Prince George\'s County',
      'annearundel': 'Anne Arundel County',
      'howard': 'Howard County',
      'harford': 'Harford County',
      'carroll': 'Carroll County',
      'frederick': 'Frederick County'
    };
    return counties[countyCode] || countyCode;
  },

  /**
   * Validate email address
   */
  isValidEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * Validate phone number
   */
  isValidPhone: (phone) => {
    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return phoneRegex.test(phone);
  }
};

/**
 * Error Handler
 */
export class ErrorHandler {
  static handle(error, context = '') {
    console.error(`Error in ${context}:`, error);
    
    // Log to monitoring service (would integrate with CloudWatch)
    if (process.env.NODE_ENV === 'production') {
      // Send to AWS CloudWatch or other monitoring service
      this.logToMonitoring(error, context);
    }
    
    // Return user-friendly error message
    if (error.message.includes('Failed to fetch')) {
      return 'Network error. Please check your connection and try again.';
    } else if (error.message.includes('401')) {
      return 'Authentication required. Please log in again.';
    } else if (error.message.includes('403')) {
      return 'Access denied. Please contact support.';
    } else {
      return 'An unexpected error occurred. Please try again.';
    }
  }
  
  static logToMonitoring(error, context) {
    // Would integrate with AWS CloudWatch Logs
    const logData = {
      timestamp: new Date().toISOString(),
      error: error.message,
      stack: error.stack,
      context,
      userId: localStorage.getItem('userId'),
      userAgent: navigator.userAgent
    };
    
    console.log('Would log to monitoring:', logData);
  }
}

export default {
  LeadService,
  PropertyService,
  ComplianceService,
  IntegrationUtils,
  ErrorHandler
};
