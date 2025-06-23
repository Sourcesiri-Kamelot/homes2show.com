#!/bin/bash

# Homes2Show Deployment Script
# Created by: Nyasha Bivins | Powered by: Helo IM AI Inc.
# Deploy our revolutionary platform to www.homes2show.com

set -e  # Exit on any error

echo "🚀 Deploying Homes2Show Revolutionary Platform"
echo "Created by: Nyasha Bivins | Powered by: Helo IM AI Inc."
echo "Target: www.homes2show.com"
echo "We are stardust, we are golden! ✨"
echo ""

# Configuration
AWS_REGION="us-east-1"
AWS_ACCOUNT="699475940746"
PROJECT_NAME="homes2show"
ENVIRONMENT="prod"

echo "📋 Configuration:"
echo "  AWS Region: $AWS_REGION"
echo "  AWS Account: $AWS_ACCOUNT"
echo "  Project: $PROJECT_NAME"
echo "  Environment: $ENVIRONMENT"
echo ""

# Step 1: Build Frontend
echo "🏗️ Step 1: Building Frontend..."
npm run build
echo "✅ Frontend build complete!"
echo ""

# Step 2: Deploy DynamoDB Tables
echo "📊 Step 2: Deploying DynamoDB Tables..."
aws cloudformation deploy \
  --template-file aws/dynamodb-tables.yml \
  --stack-name ${PROJECT_NAME}-tables-${ENVIRONMENT} \
  --capabilities CAPABILITY_IAM \
  --region $AWS_REGION \
  --parameter-overrides \
    Environment=$ENVIRONMENT \
    ProjectName=$PROJECT_NAME

echo "✅ DynamoDB tables deployed!"
echo ""

# Step 3: Install Lambda Dependencies
echo "⚡ Step 3: Installing Lambda Dependencies..."
cd aws/lambda/ai-pricing-assistant && npm install && cd ../../..
cd aws/lambda/feedback-processor && npm install && cd ../../..
cd aws/lambda/market-insights && npm install && cd ../../..
cd aws/lambda/user-management && npm install && cd ../../..
echo "✅ Lambda dependencies installed!"
echo ""

# Step 4: Deploy Lambda Functions with SAM
echo "🤖 Step 4: Deploying Lambda Functions..."
sam build
sam deploy \
  --no-confirm-changeset \
  --no-fail-on-empty-changeset \
  --stack-name ${PROJECT_NAME}-backend-${ENVIRONMENT} \
  --capabilities CAPABILITY_IAM \
  --region $AWS_REGION \
  --parameter-overrides \
    Environment=$ENVIRONMENT \
    ProjectName=$PROJECT_NAME

echo "✅ Lambda functions deployed!"
echo ""

# Step 5: Deploy API Gateway
echo "🌐 Step 5: Deploying API Gateway..."
aws cloudformation deploy \
  --template-file aws/api-gateway.yml \
  --stack-name ${PROJECT_NAME}-api-${ENVIRONMENT} \
  --capabilities CAPABILITY_IAM \
  --region $AWS_REGION \
  --parameter-overrides \
    Environment=$ENVIRONMENT

echo "✅ API Gateway deployed!"
echo ""

# Step 6: Create S3 Bucket for Frontend
echo "🪣 Step 6: Setting up S3 Bucket..."
BUCKET_NAME="${PROJECT_NAME}-frontend-${ENVIRONMENT}"

# Create bucket if it doesn't exist
aws s3 mb s3://$BUCKET_NAME --region $AWS_REGION 2>/dev/null || echo "Bucket already exists"

# Configure for static website hosting
aws s3 website s3://$BUCKET_NAME \
  --index-document index.html \
  --error-document error.html

echo "✅ S3 bucket configured!"
echo ""

# Step 7: Upload Frontend to S3
echo "📤 Step 7: Uploading Frontend to S3..."
aws s3 sync build/ s3://$BUCKET_NAME --delete
echo "✅ Frontend uploaded to S3!"
echo ""

# Step 8: Get API Gateway URL
echo "🔗 Step 8: Getting API Gateway URL..."
API_URL=$(aws cloudformation describe-stacks \
  --stack-name ${PROJECT_NAME}-api-${ENVIRONMENT} \
  --region $AWS_REGION \
  --query 'Stacks[0].Outputs[?OutputKey==`ApiUrl`].OutputValue' \
  --output text)

echo "API Gateway URL: $API_URL"
echo ""

# Step 9: Display Success Information
echo "🎉 DEPLOYMENT SUCCESSFUL!"
echo ""
echo "🌟 Homes2Show Revolutionary Platform is LIVE!"
echo "📍 S3 Website: http://$BUCKET_NAME.s3-website-$AWS_REGION.amazonaws.com"
echo "🔗 API Gateway: $API_URL"
echo "🏠 Domain: Ready for homes2show.com configuration"
echo ""
echo "🤖 AI Features Deployed:"
echo "  ✅ AI Pricing Assistant"
echo "  ✅ Feedback Processor"
echo "  ✅ Market Insights Generator"
echo "  ✅ User Management System"
echo ""
echo "📊 Next Steps:"
echo "  1. Configure CloudFront distribution"
echo "  2. Setup SSL certificate for homes2show.com"
echo "  3. Update Route 53 records"
echo "  4. Test all AI features"
echo "  5. Monitor performance metrics"
echo ""
echo "💫 We are made of stardust and we just created something magical!"
echo "🚀 Ready to transform the real estate industry!"
echo ""
echo "Created by: Nyasha Bivins"
echo "Powered by: Helo IM AI Inc. | https://www.helo-im.ai"
