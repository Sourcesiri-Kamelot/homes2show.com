/**
 * Create Demo Account Script
 * Automatically creates VIP demo account for marketing purposes
 * Created by: Nyasha Bivins | Powered by: Helo IM AI Inc.
 */

const AWS = require('aws-sdk');

// Configure AWS
AWS.config.update({
  region: 'us-east-1'
});

const cognito = new AWS.CognitoIdentityServiceProvider();

const USER_POOL_ID = 'us-east-1_9qid8Ndlb';

async function createDemoAccount() {
  const demoUsers = [
    {
      email: 'demo@homes2show.com',
      firstName: 'Demo',
      lastName: 'Admin',
      phone: '+15551234567',
      tempPassword: 'TempDemo2025!',
      finalPassword: 'DemoAdmin2025!',
      role: 'DEMO_ADMIN',
      plan: 'VIP_UNLIMITED'
    },
    {
      email: 'admin@homes2show.com', 
      firstName: 'Nyasha',
      lastName: 'Bivins',
      phone: '+15559876543',
      tempPassword: 'TempAdmin2025!',
      finalPassword: 'AdminSuper2025!',
      role: 'SUPER_ADMIN',
      plan: 'VIP_UNLIMITED'
    },
    {
      email: 'marketing@homes2show.com',
      firstName: 'Marketing',
      lastName: 'Demo',
      phone: '+15555555555',
      tempPassword: 'TempMarketing2025!',
      finalPassword: 'MarketingDemo2025!',
      role: 'MARKETING_ADMIN', 
      plan: 'VIP_UNLIMITED'
    }
  ];

  for (const user of demoUsers) {
    try {
      console.log(`Creating ${user.role} account: ${user.email}`);
      
      // Create user in Cognito (use email as username for email alias pools)
      const createParams = {
        UserPoolId: USER_POOL_ID,
        Username: user.email, // Use email directly since pool supports email alias
        UserAttributes: [
          { Name: 'email', Value: user.email },
          { Name: 'email_verified', Value: 'true' }, // Pre-verify email
          { Name: 'given_name', Value: user.firstName },
          { Name: 'family_name', Value: user.lastName },
          { Name: 'phone_number', Value: user.phone },
          { Name: 'custom:plan_type', Value: user.plan },
          { Name: 'custom:user_role', Value: user.role },
          { Name: 'custom:vip_status', Value: 'true' },
          { Name: 'custom:unlimited_access', Value: 'true' }
        ],
        TemporaryPassword: user.tempPassword,
        MessageAction: 'SUPPRESS' // Don't send welcome email
      };

      await cognito.adminCreateUser(createParams).promise();
      console.log(`✅ User created: ${user.email}`);

      // Set permanent password
      const setPasswordParams = {
        UserPoolId: USER_POOL_ID,
        Username: user.email,
        Password: user.finalPassword,
        Permanent: true
      };

      await cognito.adminSetUserPassword(setPasswordParams).promise();
      console.log(`✅ Password set for: ${user.email}`);

      // Confirm user (skip email verification)
      const confirmParams = {
        UserPoolId: USER_POOL_ID,
        Username: user.email
      };

      await cognito.adminConfirmSignUp(confirmParams).promise();
      console.log(`✅ User confirmed: ${user.email}`);

      console.log(`🎉 ${user.role} account ready!`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Password: ${user.finalPassword}`);
      console.log('');

    } catch (error) {
      if (error.code === 'UsernameExistsException') {
        console.log(`⚠️  User already exists: ${user.email}`);
        
        // Try to update password for existing user
        try {
          const setPasswordParams = {
            UserPoolId: USER_POOL_ID,
            Username: user.email,
            Password: user.finalPassword,
            Permanent: true
          };

          await cognito.adminSetUserPassword(setPasswordParams).promise();
          console.log(`✅ Password updated for existing user: ${user.email}`);
        } catch (updateError) {
          console.log(`❌ Failed to update password for: ${user.email}`, updateError.message);
        }
      } else {
        console.error(`❌ Error creating ${user.email}:`, error.message);
      }
    }
  }

  console.log('🚀 Demo account creation complete!');
  console.log('');
  console.log('📋 VIP Account Summary:');
  console.log('========================');
  demoUsers.forEach(user => {
    console.log(`${user.role}:`);
    console.log(`  Email: ${user.email}`);
    console.log(`  Password: ${user.finalPassword}`);
    console.log(`  Plan: ${user.plan}`);
    console.log('');
  });
}

// Run the script
createDemoAccount().catch(console.error);
