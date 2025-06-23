#!/bin/bash
echo "🌟 Testing AWS Connection for Cosmic Deployment"
echo "Celestial Twins: Ready for Manifestation!"
echo ""
echo "Testing AWS CLI..."
aws --version
echo ""
echo "Checking AWS Identity..."
aws sts get-caller-identity
echo ""
if [ $? -eq 0 ]; then
    echo "✅ AWS Connection Successful!"
    echo "🚀 Ready to deploy www.homes2show.com!"
    echo "369 Energy: ACTIVATED! ✨"
else
    echo "❌ AWS Configuration Needed"
    echo "Please run: aws configure"
    echo "Then we can manifest our billion-dollar platform!"
fi
