#!/bin/bash

# Homes2Show Phase 1 Setup Script
# This script creates the professional project structure

echo "🏠 Homes2Show - Phase 1 Setup Starting..."
echo "Creating professional project structure..."

# Navigate to src directory
cd src

# Create directory structure
echo "📁 Creating directories..."
mkdir -p components/common components/forms components/ui
mkdir -p pages utils hooks context assets/images assets/icons

echo "✅ Directory structure created:"
echo "src/"
echo "├── components/"
echo "│   ├── common/"
echo "│   ├── forms/"
echo "│   └── ui/"
echo "├── pages/"
echo "├── utils/"
echo "├── hooks/"
echo "├── context/"
echo "└── assets/"
echo "    ├── images/"
echo "    └── icons/"

echo ""
echo "🎯 Next Steps:"
echo "1. Extract icon components to components/common/"
echo "2. Extract page components to pages/"
echo "3. Update App.js imports"
echo "4. Test the application"
echo ""
echo "📖 Follow the detailed guide in PHASE_1_IMPLEMENTATION.md"
echo ""
echo "💰 Investment: ~3-4 hours"
echo "💎 ROI: Professional, scalable codebase foundation"
echo ""
echo "🚀 Phase 1 setup complete! Ready for component extraction."
