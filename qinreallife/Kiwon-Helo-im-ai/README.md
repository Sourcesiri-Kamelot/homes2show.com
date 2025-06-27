# Lil Playbook

A sports training and highlight sharing application for young athletes aged 4-17, with age-appropriate interfaces for different age groups.

## Features

- **Kids Interface**: Interactive, animated interface for younger users (4-9 years old)
- **Training Content**: Age-appropriate sports training drills and tutorials
- **Highlight Sharing**: Upload and share athletic highlights
- **Interactive Games**: Simple sports-themed games for younger users
- **User Profiles**: Customizable profiles with achievements
- **AWS Integration**: Secure backend using AWS services

## Tech Stack

- **Frontend**: React with Tailwind CSS
- **Backend**: AWS (Cognito, AppSync, DynamoDB, S3, Lambda)
- **Authentication**: Amazon Cognito
- **Database**: Amazon DynamoDB
- **Storage**: Amazon S3
- **API**: AWS AppSync (GraphQL)
- **Hosting**: AWS Amplify

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm (v8+)
- AWS account
- AWS CLI configured
- AWS Amplify CLI installed (`npm install -g @aws-amplify/cli`)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/lil-playbook.git
   cd lil-playbook
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up AWS Amplify:
   ```bash
   amplify init
   ```
   Follow the prompts to configure your project.

4. Add required AWS services:
   ```bash
   amplify add auth
   amplify add api
   amplify add storage
   ```

5. Push the configuration to AWS:
   ```bash
   amplify push
   ```

6. Create a `.env.local` file with your configuration:
   ```
   REACT_APP_AWS_REGION=us-east-1
   REACT_APP_USER_POOL_ID=your-user-pool-id
   REACT_APP_USER_POOL_WEB_CLIENT_ID=your-client-id
   REACT_APP_IDENTITY_POOL_ID=your-identity-pool-id
   REACT_APP_S3_BUCKET=your-s3-bucket
   ```

7. Start the development server:
   ```bash
   npm start
   ```

## Project Structure

```
/
├── public/                  # Public assets
│   └── sprites/             # Sprite images for kids interface
├── src/
│   ├── components/          # React components
│   │   ├── KidsHomeScreen.js
│   │   ├── KidsTrainingScreen.js
│   │   └── ...
│   ├── graphql/             # GraphQL queries and mutations
│   ├── aws-app.js           # Main application file
│   └── index.js             # Entry point
├── amplify/                 # AWS Amplify configuration
└── IMPLEMENTATION_PLAN.md   # Project implementation plan
```

## Kids Interface

The application features a special interface for younger users (4-9 years old) with:

- Interactive animated character
- Simple, colorful navigation
- Age-appropriate content
- Educational games
- Animated sprites and visual feedback

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Sports content developed with guidance from youth sports experts
- Sprite animations created by [Designer Name]
- Special thanks to all the young athletes who provided feedback
