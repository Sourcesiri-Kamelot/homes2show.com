# Lil Playbook - AWS Implementation

This document provides instructions for setting up and deploying the Lil Playbook application on AWS using your domain lilplaybook.com.

## Project Overview

Lil Playbook is a sports training and highlight sharing application for young athletes aged 4-17. The application features:

- Age-appropriate interfaces (kids mode for younger users)
- Sports training content with drills and tutorials
- Highlight video sharing
- Interactive games for younger users
- User profiles with achievements

## AWS Services Used

- **Amazon Cognito**: User authentication and management
- **AWS AppSync**: GraphQL API for data operations
- **Amazon DynamoDB**: NoSQL database for storing application data
- **Amazon S3**: Storage for media files and static website hosting
- **AWS Amplify**: Full-stack development framework and hosting
- **Amazon CloudFront**: Content delivery network
- **AWS Lambda**: Serverless functions for backend logic
- **Amazon Route 53**: Domain management for lilplaybook.com

## Project Structure

```
/
├── public/                  # Public assets
│   └── sprites/             # Sprite images for kids interface
├── src/
│   ├── components/          # React components
│   │   ├── KidsHomeScreen.js
│   │   ├── KidsTrainingScreen.js
│   │   ├── KidsHighlightsScreen.js
│   │   ├── KidsGamesScreen.js
│   │   └── KidsProfileScreen.js
│   ├── graphql/             # GraphQL queries and mutations
│   │   ├── queries.js
│   │   └── mutations.js
│   ├── aws-app.js           # Main application file
│   └── index.js             # Entry point
├── amplify/                 # AWS Amplify configuration
├── amplify.yml              # Amplify build configuration
├── amplify-config.js        # AWS Amplify configuration
├── aws-deployment.md        # Deployment instructions
└── package.json             # Project dependencies
```

## Getting Started

### Prerequisites

1. Node.js and npm installed
2. AWS account
3. AWS CLI configured
4. Amplify CLI installed (`npm install -g @aws-amplify/cli`)
5. Domain ownership of lilplaybook.com

### Initial Setup

1. **Initialize Amplify**:
   ```bash
   amplify init
   ```
   Follow the prompts to configure your project.

2. **Add Authentication**:
   ```bash
   amplify add auth
   ```
   Configure with:
   - Default configuration with social provider (optional)
   - Email as username
   - Additional attributes: name, age (number)

3. **Add API**:
   ```bash
   amplify add api
   ```
   Choose GraphQL and use the schema provided in `src/graphql/schema.graphql`.

4. **Add Storage**:
   ```bash
   amplify add storage
   ```
   Configure S3 bucket for content and user uploads.

5. **Push Configuration**:
   ```bash
   amplify push
   ```

### Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Option 1: AWS Amplify Console (Recommended)

1. Connect your GitHub repository to AWS Amplify Console
2. Follow the setup wizard to configure your build settings
3. Deploy the application

### Option 2: Manual Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Deploy to S3:
   ```bash
   aws s3 sync build/ s3://your-bucket-name --delete
   ```

3. Configure CloudFront distribution pointing to your S3 bucket

## Domain Configuration

1. In Route 53, create or update your hosted zone for lilplaybook.com
2. Create an A record pointing to your CloudFront distribution
3. In AWS Amplify Console or CloudFront, configure your custom domain

## Sprite Assets

The application uses sprite images for the kids interface. These should be placed in the `public/sprites/` directory:

- `character-sprite.png`: Character animation sprite sheet
- `training-icon.png`: Training section icon
- `highlights-icon.png`: Highlights section icon
- `games-icon.png`: Games section icon
- `profile-icon.png`: Profile section icon
- `soccer-icon.png`: Soccer sport icon
- `basketball-icon.png`: Basketball sport icon
- `football-icon.png`: Football sport icon
- `baseball-icon.png`: Baseball sport icon
- `cloud.png`: Cloud image for background animations

## Additional Resources

- [AWS Amplify Documentation](https://docs.amplify.aws/)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [GraphQL Documentation](https://graphql.org/learn/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
