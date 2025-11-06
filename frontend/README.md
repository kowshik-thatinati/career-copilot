# Career Compass Frontend

React application for the Career Compass career guidance platform.

## Features

- AI-powered chat interface
- 3D voice assistant (Teacher Joe)
- Firebase authentication
- Multi-language support
- Dark/light theme
- Conversation history sync

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env` file:
   ```env
   REACT_APP_API_URL=http://localhost:5000
   ```

3. Update Firebase config in `src/services/firebase.js`

4. Run development server:
   ```bash
   npm start
   ```

5. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── components/     # Reusable components
├── pages/         # Page components
├── services/      # API and external services
├── contexts/      # React contexts
├── config/        # Configuration files
├── styles/        # CSS files
└── utils/         # Helper functions
```

## Available Scripts

- `npm start` - Run development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## Key Components

- **ChatInterface** - Main chat UI
- **TeacherJoeAvatar** - 3D voice assistant
- **Sidebar** - Navigation and conversation list
- **MessageBubble** - Chat message display
- **ThinkingAnimation** - Loading indicator
