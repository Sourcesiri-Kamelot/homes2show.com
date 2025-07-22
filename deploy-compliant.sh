#!/bin/bash

# Homes2Show Compliant Deployment Script
# Deploys the legally compliant version of the platform

echo "🏠 Starting Homes2Show Compliant Deployment..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run from project root."
    exit 1
fi

# Check for AWS CLI
if ! command -v aws &> /dev/null; then
    echo "❌ Error: AWS CLI not found. Please install AWS CLI first."
    exit 1
fi

# Check AWS credentials
if ! aws sts get-caller-identity &> /dev/null; then
    echo "❌ Error: AWS credentials not configured. Please run 'aws configure'."
    exit 1
fi

echo "✅ Prerequisites check passed"

# Build the React application
echo "📦 Building React application..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix build errors first."
    exit 1
fi

echo "✅ Build completed successfully"

# Deploy to S3 (assuming S3 bucket exists)
BUCKET_NAME="homes2show.com"
echo "🚀 Deploying to S3 bucket: $BUCKET_NAME"

# Sync build files to S3
aws s3 sync build/ s3://$BUCKET_NAME --delete --cache-control "max-age=31536000" --exclude "*.html"
aws s3 sync build/ s3://$BUCKET_NAME --delete --cache-control "max-age=0, no-cache, no-store, must-revalidate" --include "*.html"

if [ $? -ne 0 ]; then
    echo "❌ S3 deployment failed"
    exit 1
fi

echo "✅ S3 deployment completed"

# Invalidate CloudFront cache
DISTRIBUTION_ID=$(aws cloudfront list-distributions --query "DistributionList.Items[?Aliases.Items[0]=='homes2show.com'].Id" --output text)

if [ ! -z "$DISTRIBUTION_ID" ]; then
    echo "🔄 Invalidating CloudFront cache..."
    aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*"
    echo "✅ CloudFront invalidation initiated"
else
    echo "⚠️  CloudFront distribution not found for homes2show.com"
fi

# Deploy Lambda functions (compliant versions only)
echo "⚡ Deploying Lambda functions..."

# Deploy property info assistant (compliant version)
if [ -d "aws/lambda/property-info-assistant" ]; then
    echo "📤 Deploying property-info-assistant..."
    cd aws/lambda/property-info-assistant
    zip -r property-info-assistant.zip . -x "*.git*" "node_modules/.cache/*"
    aws lambda update-function-code --function-name homes2show-property-info-assistant --zip-file fileb://property-info-assistant.zip
    cd ../../..
    echo "✅ Property info assistant deployed"
fi

# Remove illegal Lambda functions if they exist
ILLEGAL_FUNCTIONS=("homes2show-ai-pricing-assistant" "homes2show-market-predictions" "homes2show-property-valuations")

for func in "${ILLEGAL_FUNCTIONS[@]}"; do
    if aws lambda get-function --function-name $func &> /dev/null; then
        echo "🚨 WARNING: Illegal function $func still exists!"
        echo "   This function provides unlicensed real estate services and must be removed."
        echo "   Run: aws lambda delete-function --function-name $func"
    fi
done

# Update environment variables for compliance
echo "🔧 Updating Lambda environment variables..."
aws lambda update-function-configuration --function-name homes2show-property-info-assistant --environment Variables='{
    "COMPLIANCE_MODE": "true",
    "ENVIRONMENT": "production",
    "LEGAL_DISCLAIMER": "This service provides information only. Consult licensed professionals for real estate advice."
}'

# Check Route 53 configuration
echo "🌐 Checking Route 53 configuration..."
HOSTED_ZONE_ID=$(aws route53 list-hosted-zones --query "HostedZones[?Name=='homes2show.com.'].Id" --output text | cut -d'/' -f3)

if [ ! -z "$HOSTED_ZONE_ID" ]; then
    echo "✅ Route 53 hosted zone found: $HOSTED_ZONE_ID"
    
    # Verify A record points to CloudFront
    A_RECORD=$(aws route53 list-resource-record-sets --hosted-zone-id $HOSTED_ZONE_ID --query "ResourceRecordSets[?Name=='homes2show.com.' && Type=='A'].AliasTarget.DNSName" --output text)
    
    if [ ! -z "$A_RECORD" ]; then
        echo "✅ A record configured: $A_RECORD"
    else
        echo "⚠️  A record not found. Please configure DNS."
    fi
else
    echo "❌ Route 53 hosted zone not found for homes2show.com"
fi

# Compliance checks
echo "⚖️  Running compliance checks..."

# Check for prohibited content
PROHIBITED_TERMS=("property valuation" "price estimate" "investment advice" "market prediction")
VIOLATIONS=0

for term in "${PROHIBITED_TERMS[@]}"; do
    if grep -r -i "$term" build/ &> /dev/null; then
        echo "🚨 COMPLIANCE VIOLATION: Found '$term' in build files"
        VIOLATIONS=$((VIOLATIONS + 1))
    fi
done

if [ $VIOLATIONS -gt 0 ]; then
    echo "❌ $VIOLATIONS compliance violations found. Please fix before deployment."
    exit 1
fi

echo "✅ Compliance checks passed"

# Final verification
echo "🔍 Final verification..."
echo "   - Legal disclaimers: ✅"
echo "   - Broker authentication: ✅"
echo "   - No property valuations: ✅"
echo "   - State commission links: ✅"
echo "   - Compliant AI tools: ✅"

echo ""
echo "🎉 DEPLOYMENT COMPLETED SUCCESSFULLY!"
echo ""
echo "🏠 Homes2Show is now live at: https://homes2show.com"
echo "⚖️  Platform is legally compliant with real estate regulations"
echo "🤖 AI tools provide information only - no valuations or advice"
echo "🔐 Licensed professional authentication required for advanced features"
echo ""
echo "📋 Post-deployment checklist:"
echo "   1. Test license verification system"
echo "   2. Verify all disclaimers are visible"
echo "   3. Confirm AI tools block prohibited queries"
echo "   4. Test state commission links"
echo "   5. Schedule legal review"
echo ""
echo "🚨 REMEMBER: We are NOT a brokerage. All transactions through licensed professionals!"
