/**
 * Authentication Service for Homes2Show
 * AWS Cognito integration with custom UI
 * Created by: Nyasha Bivins | Powered by: Helo IM AI Inc.
 */

import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserAttribute
} from 'amazon-cognito-identity-js';
import awsConfig from '../config/aws-config';

// Initialize Cognito User Pool
const userPool = new CognitoUserPool({
  UserPoolId: awsConfig.userPool.UserPoolId,
  ClientId: awsConfig.userPool.ClientId
});

class AuthService {
  /**
   * Sign up a new user
   */
  async signUp(userData) {
    const { email, password, firstName, lastName, phone, agentLicense, brokerage } = userData;
    
    const attributeList = [
      new CognitoUserAttribute({ Name: 'email', Value: email }),
      new CognitoUserAttribute({ Name: 'given_name', Value: firstName }),
      new CognitoUserAttribute({ Name: 'family_name', Value: lastName }),
      new CognitoUserAttribute({ Name: 'phone_number', Value: phone }),
    ];

    // Add optional attributes if provided
    if (agentLicense) {
      attributeList.push(new CognitoUserAttribute({ Name: 'custom:agent_license', Value: agentLicense }));
    }
    if (brokerage) {
      attributeList.push(new CognitoUserAttribute({ Name: 'custom:brokerage', Value: brokerage }));
    }

    return new Promise((resolve, reject) => {
      userPool.signUp(email, password, attributeList, null, (err, result) => {
        if (err) {
          console.error('SignUp error:', err);
          reject(this.formatError(err));
          return;
        }
        
        console.log('SignUp successful:', result);
        resolve({
          success: true,
          user: result.user,
          userSub: result.userSub,
          needsConfirmation: !result.user.confirmationStatus
        });
      });
    });
  }

  /**
   * Confirm user registration with verification code
   */
  async confirmSignUp(email, confirmationCode) {
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool
    });

    return new Promise((resolve, reject) => {
      cognitoUser.confirmRegistration(confirmationCode, true, (err, result) => {
        if (err) {
          console.error('Confirmation error:', err);
          reject(this.formatError(err));
          return;
        }
        
        console.log('Confirmation successful:', result);
        resolve({
          success: true,
          message: 'Account confirmed successfully'
        });
      });
    });
  }

  /**
   * Sign in user
   */
  async signIn(email, password) {
    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password
    });

    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool
    });

    return new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          console.log('SignIn successful:', result);
          
          // Get user attributes
          cognitoUser.getUserAttributes((err, attributes) => {
            if (err) {
              console.error('Error getting user attributes:', err);
            }
            
            const userAttributes = {};
            if (attributes) {
              attributes.forEach(attr => {
                userAttributes[attr.getName()] = attr.getValue();
              });
            }

            resolve({
              success: true,
              accessToken: result.getAccessToken().getJwtToken(),
              idToken: result.getIdToken().getJwtToken(),
              refreshToken: result.getRefreshToken().getToken(),
              user: {
                username: cognitoUser.getUsername(),
                attributes: userAttributes
              }
            });
          });
        },
        onFailure: (err) => {
          console.error('SignIn error:', err);
          reject(this.formatError(err));
        },
        newPasswordRequired: (userAttributes, requiredAttributes) => {
          // Handle new password required scenario
          resolve({
            success: false,
            newPasswordRequired: true,
            userAttributes,
            requiredAttributes,
            cognitoUser
          });
        }
      });
    });
  }

  /**
   * Sign out current user
   */
  async signOut() {
    const currentUser = userPool.getCurrentUser();
    if (currentUser) {
      currentUser.signOut();
      return { success: true, message: 'Signed out successfully' };
    }
    return { success: false, message: 'No user signed in' };
  }

  /**
   * Get current authenticated user
   */
  async getCurrentUser() {
    const currentUser = userPool.getCurrentUser();
    
    if (!currentUser) {
      return { success: false, message: 'No user signed in' };
    }

    return new Promise((resolve, reject) => {
      currentUser.getSession((err, session) => {
        if (err) {
          console.error('Session error:', err);
          reject(this.formatError(err));
          return;
        }

        if (!session.isValid()) {
          resolve({ success: false, message: 'Session expired' });
          return;
        }

        // Get user attributes
        currentUser.getUserAttributes((err, attributes) => {
          if (err) {
            console.error('Error getting user attributes:', err);
            reject(this.formatError(err));
            return;
          }

          const userAttributes = {};
          attributes.forEach(attr => {
            userAttributes[attr.getName()] = attr.getValue();
          });

          resolve({
            success: true,
            user: {
              username: currentUser.getUsername(),
              attributes: userAttributes
            },
            session: {
              accessToken: session.getAccessToken().getJwtToken(),
              idToken: session.getIdToken().getJwtToken(),
              refreshToken: session.getRefreshToken().getToken()
            }
          });
        });
      });
    });
  }

  /**
   * Resend confirmation code
   */
  async resendConfirmationCode(email) {
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool
    });

    return new Promise((resolve, reject) => {
      cognitoUser.resendConfirmationCode((err, result) => {
        if (err) {
          console.error('Resend confirmation error:', err);
          reject(this.formatError(err));
          return;
        }
        
        console.log('Confirmation code resent:', result);
        resolve({
          success: true,
          message: 'Confirmation code sent to your email'
        });
      });
    });
  }

  /**
   * Forgot password - initiate reset
   */
  async forgotPassword(email) {
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool
    });

    return new Promise((resolve, reject) => {
      cognitoUser.forgotPassword({
        onSuccess: (result) => {
          console.log('Forgot password successful:', result);
          resolve({
            success: true,
            message: 'Password reset code sent to your email'
          });
        },
        onFailure: (err) => {
          console.error('Forgot password error:', err);
          reject(this.formatError(err));
        }
      });
    });
  }

  /**
   * Confirm forgot password with new password
   */
  async confirmPassword(email, confirmationCode, newPassword) {
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool
    });

    return new Promise((resolve, reject) => {
      cognitoUser.confirmPassword(confirmationCode, newPassword, {
        onSuccess: () => {
          console.log('Password reset successful');
          resolve({
            success: true,
            message: 'Password reset successfully'
          });
        },
        onFailure: (err) => {
          console.error('Password reset error:', err);
          reject(this.formatError(err));
        }
      });
    });
  }

  /**
   * Format error messages for user-friendly display
   */
  formatError(error) {
    const errorMessages = {
      'UsernameExistsException': 'An account with this email already exists.',
      'InvalidPasswordException': 'Password must be at least 8 characters long and contain uppercase, lowercase, and numbers.',
      'UserNotConfirmedException': 'Please check your email and confirm your account first.',
      'NotAuthorizedException': 'Incorrect email or password.',
      'UserNotFoundException': 'No account found with this email address.',
      'CodeMismatchException': 'Invalid verification code. Please try again.',
      'ExpiredCodeException': 'Verification code has expired. Please request a new one.',
      'LimitExceededException': 'Too many attempts. Please try again later.',
      'TooManyRequestsException': 'Too many requests. Please wait before trying again.'
    };

    const message = errorMessages[error.code] || error.message || 'An unexpected error occurred.';
    
    return {
      success: false,
      error: {
        code: error.code,
        message: message,
        originalMessage: error.message
      }
    };
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated() {
    const currentUser = userPool.getCurrentUser();
    return currentUser !== null;
  }

  /**
   * Get user pool instance
   */
  getUserPool() {
    return userPool;
  }
}

// Export singleton instance
const authService = new AuthService();
export default authService;
