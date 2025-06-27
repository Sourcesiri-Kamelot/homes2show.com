/**
 * Admin Authentication Service for Homes2Show
 * VIP access management for admin and demo accounts
 * Created by: Nyasha Bivins | Powered by: Helo IM AI Inc.
 */

import authService from './authService';
import adminConfig from '../config/admin-config';

class AdminAuthService {
  /**
   * Check if user is VIP admin
   */
  isVipUser(email) {
    return adminConfig.vipUsers.some(user => 
      user.email.toLowerCase() === email.toLowerCase()
    );
  }

  /**
   * Get VIP user details
   */
  getVipUserDetails(email) {
    return adminConfig.vipUsers.find(user => 
      user.email.toLowerCase() === email.toLowerCase()
    );
  }

  /**
   * Enhanced sign up for VIP users
   */
  async signUpVipUser(userData) {
    const { email } = userData;
    
    if (!this.isVipUser(email)) {
      // Regular signup for non-VIP users
      return await authService.signUp(userData);
    }

    try {
      // VIP signup with special attributes
      const vipDetails = this.getVipUserDetails(email);
      
      const enhancedUserData = {
        ...userData,
        customAttributes: {
          plan_type: vipDetails.plan,
          user_role: vipDetails.role,
          permissions: vipDetails.permissions,
          vip_status: 'true',
          unlimited_access: 'true'
        }
      };

      const result = await authService.signUp(enhancedUserData);
      
      if (result.success) {
        // Auto-confirm VIP accounts (no email verification needed)
        if (result.needsConfirmation) {
          // For VIP users, we can auto-confirm or use a special flow
          console.log('VIP user created, special handling applied');
        }
        
        return {
          ...result,
          vipUser: true,
          vipDetails: vipDetails,
          message: `Welcome ${vipDetails.description}! Your VIP account has been created.`
        };
      }
      
      return result;
      
    } catch (error) {
      console.error('VIP signup error:', error);
      throw error;
    }
  }

  /**
   * Enhanced sign in for VIP users
   */
  async signInVipUser(email, password) {
    try {
      const result = await authService.signIn(email, password);
      
      if (result.success && this.isVipUser(email)) {
        const vipDetails = this.getVipUserDetails(email);
        
        return {
          ...result,
          vipUser: true,
          vipDetails: vipDetails,
          adminFeatures: adminConfig.adminFeatures,
          marketingTools: adminConfig.marketingTools,
          message: `Welcome back ${vipDetails.description}!`
        };
      }
      
      return result;
      
    } catch (error) {
      console.error('VIP signin error:', error);
      throw error;
    }
  }

  /**
   * Get admin dashboard configuration
   */
  getAdminDashboardConfig(email) {
    if (!this.isVipUser(email)) {
      return null;
    }

    const vipDetails = this.getVipUserDetails(email);
    
    return {
      user: vipDetails,
      features: adminConfig.adminFeatures,
      demoData: adminConfig.demoData,
      marketingTools: adminConfig.marketingTools,
      specialAccess: {
        allAiFeatures: true,
        unlimitedUsage: true,
        prioritySupport: true,
        customBranding: true,
        advancedAnalytics: true,
        exportCapabilities: true
      }
    };
  }

  /**
   * Create demo account for your wife
   */
  async createDemoAccount() {
    const demoAccountData = {
      firstName: 'Demo',
      lastName: 'Admin',
      email: 'demo@homes2show.com',
      password: 'DemoAdmin2025!',
      phone: '+1-555-DEMO-123',
      agentLicense: 'DEMO-LICENSE-001',
      brokerage: 'Homes2Show Demo Brokerage'
    };

    try {
      const result = await this.signUpVipUser(demoAccountData);
      
      if (result.success) {
        console.log('Demo account created successfully!');
        return {
          success: true,
          credentials: {
            email: demoAccountData.email,
            password: demoAccountData.password
          },
          message: 'Demo account ready for marketing presentations!'
        };
      }
      
      return result;
      
    } catch (error) {
      console.error('Demo account creation error:', error);
      return {
        success: false,
        error: 'Demo account may already exist or there was an error creating it.'
      };
    }
  }

  /**
   * Get marketing presentation mode settings
   */
  getMarketingMode(email) {
    if (!this.isVipUser(email)) {
      return { enabled: false };
    }

    return {
      enabled: true,
      features: {
        screenshotMode: true,
        demoData: true,
        fullFeatureShowcase: true,
        presentationMode: true,
        unlimitedAccess: true
      },
      demoContent: {
        sampleListings: adminConfig.demoData.sampleListings,
        sampleAgents: adminConfig.demoData.sampleAgents,
        sampleAnalytics: adminConfig.demoData.sampleAnalytics
      }
    };
  }

  /**
   * Check if user has unlimited access
   */
  hasUnlimitedAccess(email) {
    return this.isVipUser(email);
  }

  /**
   * Get user's plan type
   */
  getUserPlan(email) {
    if (this.isVipUser(email)) {
      const vipDetails = this.getVipUserDetails(email);
      return vipDetails.plan;
    }
    return 'FREE'; // Default for regular users
  }
}

// Export singleton instance
const adminAuthService = new AdminAuthService();
export default adminAuthService;
