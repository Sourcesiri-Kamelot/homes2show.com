# Homes2Show Developer Guide
**AI-Powered Real Estate Platform - Developer Reference**  
**Lead Developer**: AI Development Team  
**Last Updated**: June 23, 2025  
**AWS Best Practices Compliant**

---

## 🏗️ Foundation Architecture

### Project Structure (LOCKED - DO NOT MODIFY)
```
homes2show.com/
├── 🔒 PROTECTED FILES (NEVER DELETE)
│   ├── public/index.html (STYLE LOCKED)
│   ├── package-lock.json (DEPENDENCY LOCKED)
│   ├── .env (CREDENTIAL PROTECTED)
│   └── .gitignore (SECURITY LOCKED)
├── 📱 Source Architecture
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/ (Reusable UI components)
│   │   │   ├── forms/ (Form components for Phase 4)
│   │   │   ├── ui/ (Advanced UI elements)
│   │   │   └── ai/ (AI-specific components for Phase 5)
│   │   ├── pages/ (Route components)
│   │   ├── utils/ (Helper functions)
│   │   ├── hooks/ (Custom React hooks)
│   │   ├── context/ (React Context providers)
│   │   └── assets/ (Static assets)
├── 🔧 Configuration
│   ├── tailwind.config.js (AI-themed styling)
│   ├── postcss.config.js (CSS processing)
│   └── package.json (Dependencies & scripts)
└── 📋 Documentation
    ├── IMPLEMENTATION_TRACKER.md (Project roadmap)
    ├── PHASE_1_COMPLETE.md (Completed work)
    └── DEV_GUIDE.md (This file)
```

---

## 🤖 AI-Enhanced Development Standards

### Component Creation Rules
1. **Always use SparkleIcon** for AI features
2. **Implement AI-themed colors**: orange-500, purple-600, blue-500
3. **Add intelligent animations**: hover effects, transitions
4. **Include accessibility**: ARIA labels, semantic HTML
5. **Mobile-first responsive**: Tailwind breakpoints

### File Naming Conventions
```
Components: PascalCase (HomePage.js, SparkleIcon.js)
Utilities: camelCase (apiHelpers.js, formatters.js)
Constants: UPPER_SNAKE_CASE (API_ENDPOINTS.js)
Styles: kebab-case (ai-components.css)
```

### Code Quality Standards
- **ESLint**: Enforce consistent code style
- **Prettier**: Auto-format on save
- **TypeScript**: Gradual adoption for type safety
- **Comments**: Document AI logic and complex functions

---

## 🔐 AWS Security Best Practices

### Environment Variables (CRITICAL)
```bash
# NEVER commit these to Git
REACT_APP_FIREBASE_API_KEY=your_key_here
REACT_APP_OPENAI_API_KEY=sk-your_key_here
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_your_key
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
```

### Security Checklist
- ✅ All secrets in .env files
- ✅ .env files in .gitignore
- ✅ Environment-specific configurations
- ✅ API key rotation strategy
- ✅ HTTPS enforcement in production
- ✅ CORS properly configured
- ✅ Input validation on all forms
- ✅ SQL injection prevention
- ✅ XSS protection implemented

### AWS IAM Best Practices
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject"
      ],
      "Resource": "arn:aws:s3:::homes2show-assets/*"
    }
  ]
}
```

---

## 🚀 Deployment Architecture (AWS)

### Production Stack
```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   CloudFront    │────│     Vercel       │────│    Firebase     │
│   (CDN/SSL)     │    │   (Frontend)     │    │   (Backend)     │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                        │                        │
         │                        │                        │
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Route 53      │    │     S3 Bucket    │    │   OpenAI API    │
│   (DNS)         │    │    (Assets)      │    │  (AI Features)  │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

### Environment Strategy
- **Development**: Local + Firebase Emulator
- **Staging**: Vercel Preview + Firebase Test Project
- **Production**: Vercel + Firebase Production + CloudFront

---

## 🔧 MCP Server Configuration

### Available MCP Servers
```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-filesystem", "/path/to/homes2show.com"],
      "env": {
        "NODE_ENV": "development"
      }
    },
    "git": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-git", "--repository", "/path/to/homes2show.com"],
      "env": {
        "GIT_AUTHOR_NAME": "Homes2Show AI",
        "GIT_AUTHOR_EMAIL": "ai@homes2show.com"
      }
    },
    "aws": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-aws"],
      "env": {
        "AWS_REGION": "us-east-1",
        "AWS_PROFILE": "homes2show-dev"
      }
    },
    "database": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-postgres"],
      "env": {
        "DATABASE_URL": "postgresql://localhost:5432/homes2show_dev"
      }
    }
  }
}
```

### MCP Tool Usage
```javascript
// Example: Using MCP filesystem tool
const result = await mcp.call('filesystem___read_file', {
  path: './src/components/common/SparkleIcon.js'
});

// Example: Using MCP git tool
const status = await mcp.call('git___status', {
  repository: '/path/to/homes2show.com'
});

// Example: Using MCP AWS tool
const buckets = await mcp.call('aws___s3_list_buckets', {
  region: 'us-east-1'
});
```

---

## 📊 Development Workflow

### Phase-Based Development
```
Phase 1: ✅ Foundation & Architecture (COMPLETE)
├── Component extraction
├── AI-themed design system
├── Security implementation
└── Professional structure

Phase 2: 🔄 React Router (IN PROGRESS)
├── BrowserRouter setup
├── Protected routes
├── Mobile navigation
└── URL-based navigation

Phase 3: 📋 Firebase Backend
├── Authentication setup
├── Firestore database
├── Security rules
└── Cloud functions

Phase 4: 🔐 User Management
├── Login/signup pages
├── User context
├── Protected routes
└── Profile management

Phase 5: 🤖 AI Features
├── OpenAI integration
├── Pricing assistant
├── Feedback summarizer
└── Market insights

Phase 6: 🚀 Production Deployment
├── Vercel deployment
├── Domain configuration
├── Performance optimization
└── Monitoring setup
```

### Git Workflow
```bash
# Feature development
git checkout -b feature/phase-2-routing
git add .
git commit -m "🚀 Phase 2: React Router implementation

✅ FEATURES:
- BrowserRouter with protected routes
- Mobile navigation menu
- URL-based page navigation
- Route guards for authentication

🤖 AI ENHANCEMENTS:
- Intelligent route transitions
- Smart navigation highlighting
- Context-aware mobile menu

📊 IMPACT:
- Improved user experience
- SEO-friendly URLs
- Better navigation flow"

git push origin feature/phase-2-routing
```

---

## 🎨 AI Design System

### Color Palette
```css
:root {
  /* Primary AI Colors */
  --ai-orange: #f97316;
  --ai-orange-dark: #ea580c;
  --ai-purple: #8b5cf6;
  --ai-blue: #3b82f6;
  
  /* Semantic Colors */
  --success: #10b981;
  --warning: #f59e0b;
  --error: #ef4444;
  --info: #06b6d4;
}
```

### Component Templates
```jsx
// AI-Enhanced Component Template
import React from 'react';
import SparkleIcon from '../common/SparkleIcon';

const AIComponent = ({ children, className = "" }) => {
  return (
    <div className={`
      bg-gradient-to-br from-orange-50 to-purple-50 
      border border-orange-200 rounded-xl p-6 
      hover:shadow-lg transition-all duration-300
      ${className}
    `}>
      <div className="flex items-center mb-4">
        <SparkleIcon className="w-5 h-5 text-orange-500 mr-2" />
        <h3 className="font-semibold text-gray-900">AI-Powered Feature</h3>
      </div>
      {children}
    </div>
  );
};

export default AIComponent;
```

### Animation Library
```css
/* AI-Themed Animations */
@keyframes ai-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

@keyframes ai-glow {
  0% { box-shadow: 0 0 20px rgba(249, 115, 22, 0.3); }
  100% { box-shadow: 0 0 30px rgba(249, 115, 22, 0.6); }
}

@keyframes ai-shimmer {
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
}

.ai-pulse { animation: ai-pulse 2s infinite; }
.ai-glow { animation: ai-glow 2s alternate infinite; }
.ai-shimmer { animation: ai-shimmer 1.5s infinite; }
```

---

## 🔍 Testing Strategy

### Testing Pyramid
```
┌─────────────────┐
│   E2E Tests     │ ← Cypress (User journeys)
├─────────────────┤
│ Integration     │ ← React Testing Library
├─────────────────┤
│  Unit Tests     │ ← Jest (Components, utilities)
└─────────────────┘
```

### Test Commands
```bash
# Unit tests
npm test

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e

# Coverage report
npm run test:coverage

# AI feature tests
npm run test:ai
```

---

## 📈 Performance Monitoring

### Core Web Vitals
```javascript
// Performance monitoring setup
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  // Send to AWS CloudWatch or Google Analytics
  if (process.env.NODE_ENV === 'production') {
    // Analytics implementation
  }
}

// Monitor all Core Web Vitals
getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

### Performance Targets
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **First Input Delay**: < 100ms
- **Cumulative Layout Shift**: < 0.1
- **Time to First Byte**: < 600ms

---

## 🚨 Emergency Procedures

### Rollback Strategy
```bash
# Quick rollback to last known good state
git log --oneline -10
git reset --hard <commit-hash>
git push --force-with-lease origin main

# Vercel rollback
vercel --prod rollback
```

### Incident Response
1. **Identify**: Monitor alerts, user reports
2. **Assess**: Determine impact and severity
3. **Respond**: Implement fix or rollback
4. **Communicate**: Update stakeholders
5. **Document**: Post-incident review

---

## 📚 Key Resources

### Documentation
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Firebase Documentation](https://firebase.google.com/docs)
- [AWS Best Practices](https://aws.amazon.com/architecture/well-architected/)
- [OpenAI API Reference](https://platform.openai.com/docs)

### Development Tools
- **IDE**: VS Code with React extensions
- **Version Control**: Git with conventional commits
- **Package Manager**: npm (locked versions)
- **Build Tool**: React Scripts (Create React App)
- **Deployment**: Vercel with automatic deployments

---

## 🎯 Success Metrics

### Technical KPIs
- **Code Coverage**: > 80%
- **Performance Score**: > 90
- **Accessibility Score**: > 95
- **SEO Score**: > 90
- **Security Audit**: Pass

### Business KPIs
- **User Registration**: > 15% conversion
- **Dashboard Engagement**: > 60%
- **Payment Conversion**: > 8%
- **User Retention (30-day)**: > 40%

---

## 🔮 Future Roadmap

### Phase 7: Advanced AI Features
- Machine learning model integration
- Predictive analytics dashboard
- Natural language processing
- Computer vision for property analysis

### Phase 8: Mobile App
- React Native implementation
- Native AI features
- Offline functionality
- Push notifications

### Phase 9: Enterprise Features
- Multi-tenant architecture
- Advanced analytics
- API marketplace
- White-label solutions

---

## 📞 Support & Escalation

### Development Issues
1. **Check documentation** (this file)
2. **Review implementation tracker**
3. **Check Git history** for similar solutions
4. **Escalate to lead developer** if needed

### Production Issues
1. **Check monitoring dashboards**
2. **Review error logs**
3. **Implement immediate fix or rollback**
4. **Document incident**

---

## ✅ Developer Checklist

### Before Starting Work
- [ ] Pull latest changes from main branch
- [ ] Check implementation tracker for current phase
- [ ] Review security requirements
- [ ] Ensure environment variables are set
- [ ] Run tests to ensure clean baseline

### Before Committing
- [ ] Run linting and formatting
- [ ] Execute test suite
- [ ] Check for security vulnerabilities
- [ ] Update documentation if needed
- [ ] Use conventional commit messages

### Before Deployment
- [ ] Performance audit passed
- [ ] Security scan completed
- [ ] Accessibility check passed
- [ ] Cross-browser testing done
- [ ] Mobile responsiveness verified

---

**Remember**: We're building an AI-powered platform that showcases intelligence and innovation. Every component should reflect our advanced capabilities while maintaining professional quality standards.

**Foundation Status**: ✅ Complete - Professional Grade Architecture  
**Current Phase**: Phase 2 - React Router Implementation  
**Next Milestone**: URL-based navigation with protected routes  

*This guide is living documentation - update as the platform evolves.*
