


# 🎓 Career Compass

**Navigate your career journey with precision** - An AI-powered career guidance platform that helps students and professionals make informed decisions about their education, career paths, and professional development.

## ✨ Features

- 🤖 **AI-Powered Chat**: Get personalized career advice using Google's Gemini AI
- 🎙️ **Voice Assistant (Teacher Joe)**: Interactive 3D avatar with voice recognition and text-to-speech
- 🔐 **Firebase Authentication**: Secure user login and signup
- 💾 **Cloud Storage**: Save and sync your conversation history across devices
- 🌍 **Multi-language Support**: Translate conversations to multiple languages
- 🌓 **Dark/Light Mode**: Comfortable viewing in any lighting condition
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 📎 **File Attachments**: Upload and share files in conversations
- 🎯 **Smart Chat Titles**: Automatically generated conversation titles
- 🔒 **Secure API**: Backend proxy for secure Gemini API access

## 📋 Table of Contents

- [Project Structure](#-project-structure)
- [Technology Stack](#-technology-stack)
- [Getting Started](#-getting-started)
- [Development Setup](#-development-setup)
- [Production Deployment](#-production-deployment)
- [API Documentation](#-api-documentation)
- [Architecture](#-architecture)
- [Contributing](#-contributing)

## 🏗️ Project Structure

```
career-compass/
├── frontend/                    # React application (Port 3000)
│   ├── public/                 # Static assets
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/         # Reusable React components
│   │   │   ├── ChatInterface.js       # Main chat UI with message handling
│   │   │   ├── MessageBubble.js       # Individual message display
│   │   │   ├── ThinkingAnimation.js   # Loading indicator
│   │   │   ├── Sidebar.js             # Navigation and conversation list
│   │   │   ├── LanguageSelector.js    # Multi-language selector
│   │   │   ├── AddfilesButton.js      # File upload component
│   │   │   └── ModelViewer.js         # 3D model viewer
│   │   ├── pages/              # Page-level components
│   │   │   ├── LandingPage.js         # Home/welcome page
│   │   │   ├── Auth.js                # Login/Signup page
│   │   │   └── TeacherJoeAvatar.jsx   # Voice assistant with 3D avatar
│   │   ├── services/           # External service integrations
│   │   │   ├── firebase.js            # Firebase configuration
│   │   │   ├── FirebaseStorage.js     # Cloud storage operations
│   │   │   ├── geminiApi.js           # Gemini API client
│   │   │   └── translateText.js       # Translation service
│   │   ├── contexts/           # React Context providers
│   │   │   └── ThemeContext.js        # Dark/Light mode state
│   │   ├── config/             # Configuration files
│   │   │   └── api.js                 # API endpoints configuration
│   │   ├── styles/             # CSS stylesheets
│   │   ├── utils/              # Utility functions
│   │   │   ├── Storage.js             # Local storage helpers
│   │   │   └── languages.js           # Language options
│   │   ├── i18n.js             # Internationalization setup
│   │   ├── App.js              # Main app component with routing
│   │   └── index.js            # React entry point
│   └── package.json            # Frontend dependencies
│
├── backend/                     # Express server (Port 5000)
│   ├── server.js               # Main server file
│   │   ├── Express app setup
│   │   ├── CORS middleware
│   │   ├── Body parser
│   │   ├── API routes
│   │   └── Gemini AI integration
│   ├── .env                    # Environment variables (not in git)
│   ├── .env.example            # Environment template
│   └── package.json            # Backend dependencies
│
├── node_modules/               # Root dependencies
├── package.json                # Root package with scripts
├── package-lock.json
├── .gitignore
├── README.md                   # This file
├── ARCHITECTURE.md             # Detailed architecture documentation
├── DEPLOYMENT.md               # Deployment guide
├── QUICKSTART.md               # Quick start guide
├── SETUP_CHECKLIST.md          # Setup checklist
└── LICENSE                     # MIT License
```

## 🛠️ Technology Stack

### Frontend Technologies
| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.1.1 | Core UI framework |
| **React Router DOM** | 7.8.2 | Client-side routing |
| **Three.js** | 0.181.0 | 3D graphics rendering |
| **React Three Fiber** | 9.4.0 | React renderer for Three.js |
| **React Three Drei** | 10.7.6 | Three.js helpers and abstractions |
| **Firebase** | 12.2.1 | Authentication & Firestore database |
| **i18next** | 25.4.0 | Internationalization framework |
| **react-i18next** | 15.7.0 | React bindings for i18next |
| **Web Speech API** | Browser Native | Voice recognition and synthesis |

### Backend Technologies
| Technology | Version | Purpose |
|------------|---------|---------|
| **Express** | 5.1.0 | Web server framework |
| **Axios** | 1.12.2 | HTTP client for API calls |
| **CORS** | 2.8.5 | Cross-origin resource sharing |
| **Body Parser** | 2.2.0 | Request body parsing middleware |
| **Dotenv** | 16.0.3 | Environment variable management |
| **Nodemon** | 3.0.1 | Development auto-restart (dev dependency) |

### External Services
- **Google Gemini AI** (gemini-2.5-flash) - AI-powered responses
- **Firebase Authentication** - User authentication
- **Firestore** - Cloud database for conversation storage
- **Web Speech API** - Voice recognition and text-to-speech

### Development Tools
- **Concurrently** 8.2.0 - Run multiple commands simultaneously
- **React Scripts** 5.0.1 - Create React App build tools

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** (v8.0.0 or higher) - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)

You'll also need:
- **Gemini API Key** - Get it from [Google AI Studio](https://makersuite.google.com/app/apikey)
- **Firebase Project** - Create one at [Firebase Console](https://console.firebase.google.com/)

### Quick Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/career-compass.git
   cd career-compass
   ```

2. **Install all dependencies** (root, frontend, and backend)
   ```bash
   npm run install-all
   ```

   This single command installs dependencies for:
   - Root directory (concurrently)
   - Frontend (React and all dependencies)
   - Backend (Express and all dependencies)

## 💻 Development Setup

### Step 1: Backend Configuration

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create environment file**
   ```bash
   # Copy the example file
   cp .env.example .env
   ```

3. **Edit `.env` file** with your credentials:
   ```env
   PORT=5000
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

   **Getting your Gemini API Key:**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Sign in with your Google account
   - Click "Create API Key"
   - Copy and paste into `.env` file

### Step 2: Frontend Configuration

1. **Navigate to frontend directory**
   ```bash
   cd ../frontend
   ```

2. **Create environment file**
   ```bash
   # Create .env file
   echo REACT_APP_API_URL=http://localhost:5000 > .env
   ```

   Or manually create `frontend/.env`:
   ```env
   REACT_APP_API_URL=http://localhost:5000
   ```

3. **Configure Firebase**
   
   Edit `frontend/src/services/firebase.js` with your Firebase credentials:
   ```javascript
   const firebaseConfig = {
     apiKey: "your-api-key",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "your-sender-id",
     appId: "your-app-id"
   };
   ```

   **Getting Firebase Credentials:**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project or select existing
   - Go to Project Settings > General
   - Scroll to "Your apps" section
   - Click "Web app" icon to create web app
   - Copy the configuration object

   **Enable Firebase Services:**
   - **Authentication**: Go to Authentication > Sign-in method > Enable Email/Password
   - **Firestore**: Go to Firestore Database > Create database > Start in production mode

### Step 3: Running the Application

#### Option 1: Run Everything Together (Recommended for Development)

From the **root directory**:

```bash
# Start both frontend and backend concurrently
npm start
```

This will:
- ✅ Start backend server on `http://localhost:5000`
- ✅ Start frontend dev server on `http://localhost:3000`
- ✅ Open browser automatically
- ✅ Enable hot-reload for both

#### Option 2: Run with Auto-Restart (Development Mode)

```bash
# Run backend with nodemon (auto-restart on changes)
npm run dev
```

This uses nodemon for the backend, which automatically restarts when you modify backend files.

#### Option 3: Run Separately (Manual Control)

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

### Available Scripts

From the **root directory**:

| Command | Description |
|---------|-------------|
| `npm run install-all` | Install dependencies for root, frontend, and backend |
| `npm start` | Start both frontend and backend together |
| `npm run dev` | Start with nodemon (auto-restart backend) |
| `npm run start:frontend` | Start only frontend |
| `npm run start:backend` | Start only backend |
| `npm run build` | Build frontend for production |

From the **frontend directory**:

| Command | Description |
|---------|-------------|
| `npm start` | Start development server (port 3000) |
| `npm run build` | Create production build |
| `npm test` | Run tests |
| `npm run eject` | Eject from Create React App (irreversible) |

From the **backend directory**:

| Command | Description |
|---------|-------------|
| `npm start` | Start server with node |
| `npm run dev` | Start server with nodemon (auto-restart) |

### Verification

Once running, verify everything works:

1. **Backend Health Check**
   - Open `http://localhost:5000` in browser
   - Should see: "✅ Gemini Proxy Server is running!"

2. **Frontend Access**
   - Open `http://localhost:3000` in browser
   - Should see the Career Compass landing page

3. **Test Chat**
   - Sign up for a new account
   - Send a test message
   - Verify AI response appears

## 🚀 Production Deployment

### Building for Production

#### Frontend Build

```bash
cd frontend
npm run build
```

This creates an optimized production build in `frontend/build/` with:
- Minified JavaScript and CSS
- Optimized assets
- Service worker for PWA support
- Source maps for debugging

#### Test Production Build Locally

```bash
# Install serve globally
npm install -g serve

# Serve the build
cd frontend
serve -s build -l 3000
```

### Deployment Options

#### Backend Deployment

**Option 1: Railway (Recommended)**

1. Sign up at [Railway.app](https://railway.app)
2. Click "New Project" > "Deploy from GitHub repo"
3. Select your repository
4. Configure:
   - Root directory: `backend`
   - Environment variables:
     ```
     PORT=5000
     GEMINI_API_KEY=your_api_key
     NODE_ENV=production
     ```
5. Deploy automatically
6. Copy the generated URL (e.g., `https://career-compass-backend.railway.app`)

**Option 2: Render**

1. Sign up at [Render.com](https://render.com)
2. Create "Web Service"
3. Connect GitHub repository
4. Settings:
   - Root directory: `backend`
   - Build command: `npm install`
   - Start command: `npm start`
5. Add environment variables:
   ```
   PORT=5000
   GEMINI_API_KEY=your_api_key
   NODE_ENV=production
   ```

**Option 3: Heroku**

```bash
# Install Heroku CLI
heroku login

# Create app
heroku create career-compass-backend

# Set environment variables
heroku config:set GEMINI_API_KEY=your_api_key
heroku config:set NODE_ENV=production

# Deploy
cd backend
git init
git add .
git commit -m "Deploy backend"
heroku git:remote -a career-compass-backend
git push heroku main
```

#### Frontend Deployment

**Option 1: Vercel (Recommended)**

1. Sign up at [Vercel.com](https://vercel.com)
2. Click "New Project" > Import from GitHub
3. Configure:
   - Root directory: `frontend`
   - Framework preset: Create React App
   - Build command: `npm run build`
   - Output directory: `build`
4. Add environment variable:
   ```
   REACT_APP_API_URL=https://your-backend-url.railway.app
   ```
5. Deploy

**Option 2: Netlify**

1. Sign up at [Netlify.com](https://netlify.com)
2. "New site from Git"
3. Settings:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/build`
4. Environment variables:
   ```
   REACT_APP_API_URL=https://your-backend-url.railway.app
   ```

**Option 3: Firebase Hosting**

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize
cd frontend
firebase init hosting

# Build
npm run build

# Deploy
firebase deploy --only hosting
```

### Post-Deployment Checklist

- [ ] Backend URL is accessible and returns health check
- [ ] Frontend can connect to backend API
- [ ] Firebase authentication works in production
- [ ] CORS is properly configured for production domain
- [ ] All environment variables are set correctly
- [ ] HTTPS is enabled on both frontend and backend
- [ ] Test all features (chat, voice, file upload)
- [ ] Check browser console for errors
- [ ] Verify mobile responsiveness

### Environment Variables Summary

**Backend Production (.env)**
```env
PORT=5000
GEMINI_API_KEY=your_actual_gemini_api_key
NODE_ENV=production
```

**Frontend Production (.env.production)**
```env
REACT_APP_API_URL=https://your-backend-domain.com
```

## 📡 API Documentation

### Base URL
- **Development**: `http://localhost:5000`
- **Production**: `https://your-backend-domain.com`

### Endpoints

#### 1. Health Check
```http
GET /
```

**Response:**
```json
"✅ Gemini Proxy Server is running!"
```

#### 2. Chat with Gemini AI
```http
POST /api/gemini
Content-Type: application/json
```

**Request Body:**
```json
{
  "prompt": "What career paths are available in computer science?"
}
```

**Response:**
```json
{
  "text": "There are several exciting career paths in computer science including..."
}
```

**Error Response:**
```json
{
  "error": "❌ Prompt is required"
}
```

#### 3. Generate Chat Title
```http
POST /api/generate-title
Content-Type: application/json
```

**Request Body:**
```json
{
  "message": "How do I learn Python programming?"
}
```

**Response:**
```json
{
  "title": "Python Learning Guide"
}
```

### API Configuration

The frontend uses centralized API configuration in `frontend/src/config/api.js`:

```javascript
export const API_ENDPOINTS = {
  BASE: 'http://localhost:5000',
  GEMINI: 'http://localhost:5000/api/gemini',
  GENERATE_TITLE: 'http://localhost:5000/api/generate-title',
  HEALTH: 'http://localhost:5000/api/health'
};
```

## 🏛️ Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         User Browser                         │
│                     (http://localhost:3000)                  │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ HTTP Requests
                         │
┌────────────────────────▼────────────────────────────────────┐
│                    Frontend (React)                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  Landing     │  │    Chat      │  │  Teacher Joe │     │
│  │   Page       │  │  Interface   │  │   Avatar     │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ API Calls
                         │
┌────────────────────────▼────────────────────────────────────┐
│                   Backend (Express)                          │
│                 (http://localhost:5000)                      │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  • POST /api/gemini                                 │  │
│  │  • POST /api/generate-title                         │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ API Requests
                         │
┌────────────────────────▼────────────────────────────────────┐
│                  Google Gemini AI                            │
│            (generativelanguage.googleapis.com)               │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│                      Firebase Services                        │
│  • Authentication (Email/Password)                           │
│  • Firestore (Conversation Storage)                          │
└──────────────────────────────────────────────────────────────┘
```

### Data Flow

**Chat Message Flow:**
1. User types message in ChatInterface
2. Frontend adds message to local state
3. POST request to `/api/gemini`
4. Backend adds system prompt and calls Gemini API
5. Gemini processes and returns response
6. Backend extracts text and returns to frontend
7. Frontend displays response and saves to Firebase

**Voice Interaction Flow:**
1. User clicks "Start Speaking"
2. Web Speech API captures audio
3. Browser converts speech to text
4. Text sent to backend (same as chat)
5. Response converted to speech via Speech Synthesis API
6. 3D avatar animates while speaking

For detailed architecture documentation, see [ARCHITECTURE.md](ARCHITECTURE.md).

## 📖 Usage Guide

### Chat Interface

1. **Sign Up/Login**
   - Click "Get Started" on landing page
   - Create account with email and password
   - Or login with existing credentials

2. **Start Chatting**
   - Type your career-related question
   - Press Enter or click Send button
   - Wait for AI response (thinking animation appears)

3. **Manage Conversations**
   - **New Chat**: Click "New Chat" button in sidebar
   - **Switch Chats**: Click on conversation in sidebar
   - **Auto-Save**: Conversations automatically saved to cloud
   - **Clear History**: Click "Clear" to delete all conversations

### Voice Assistant (Teacher Joe)

1. **Access Voice Mode**
   - Click "Talk Live" button in sidebar
   - 3D avatar appears with microphone button

2. **Voice Interaction**
   - Click "Start Speaking" button
   - Speak your question clearly
   - See real-time transcript
   - Teacher Joe responds with voice and text
   - Click "Stop Speaking" to interrupt

3. **Tips for Best Results**
   - Speak clearly and at normal pace
   - Use quiet environment
   - Wait for response before asking next question
   - Check microphone permissions in browser

### Additional Features

- **File Attachments**: Click 📎 icon to upload files (note: display only, not processed by AI)
- **Language Translation**: Select language from dropdown to translate interface
- **Dark/Light Mode**: Click 🌙/☀️ button to toggle theme
- **Responsive Design**: Works on desktop, tablet, and mobile

### Supported Topics

Career Compass specializes in:
- ✅ Career guidance and planning
- ✅ Education and courses
- ✅ Job search and applications
- ✅ Resume and interview help
- ✅ Skills development
- ✅ Academic subjects
- ✅ Professional development
- ✅ Workplace advice

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Getting Started

1. **Fork the repository**
   ```bash
   # Click "Fork" button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/your-username/career-compass.git
   cd career-compass
   ```

3. **Create a branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

4. **Make your changes**
   - Follow existing code style
   - Add comments for complex logic
   - Test your changes thoroughly

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "Add amazing feature"
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

7. **Open a Pull Request**
   - Go to original repository
   - Click "New Pull Request"
   - Select your branch
   - Describe your changes

### Code Style Guidelines

- Use meaningful variable and function names
- Add JSDoc comments for functions
- Follow React best practices
- Keep components small and focused
- Use functional components with hooks
- Handle errors gracefully

### Reporting Issues

Found a bug? Have a suggestion?

1. Check existing issues first
2. Create new issue with:
   - Clear title
   - Detailed description
   - Steps to reproduce (for bugs)
   - Expected vs actual behavior
   - Screenshots if applicable

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### MIT License Summary

- ✅ Commercial use
- ✅ Modification
- ✅ Distribution
- ✅ Private use
- ❌ Liability
- ❌ Warranty

## 🙏 Acknowledgments

- **Google Gemini AI** - Powering intelligent career guidance
- **Firebase** - Authentication and cloud storage infrastructure
- **Three.js Community** - 3D graphics support and resources
- **React Community** - Amazing ecosystem and tools
- **Open Source Contributors** - All the libraries that made this possible

## 📧 Support

Need help? Have questions?

- 📧 **Email**: chinna4812@example.com
- 🐛 **Issues**: [GitHub Issues](https://github.com/yourusername/career-compass/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/yourusername/career-compass/discussions)
- 📖 **Documentation**: [Wiki](https://github.com/yourusername/career-compass/wiki)

( NOTE : AFTER OPENING THE ABOVE LINK IN URL REPLACE "yourusername" WITH YOUR GITHUB USERNAME. OTHERWISE THE LINK WONT'T WORK. )

## 🔮 Future Enhancements

### Planned Features
- [ ] Resume builder and analyzer with AI feedback
- [ ] Job search integration with major job boards
- [ ] Interactive career path visualization
- [ ] Mock interview preparation with AI interviewer
- [ ] Skill assessment tests and certifications
- [ ] Mentor matching system
- [ ] Company reviews and insights
- [ ] Salary comparison tools by location and role
- [ ] Learning path recommendations
- [ ] Portfolio builder for showcasing projects

### Technical Improvements
- [ ] Progressive Web App (PWA) support
- [ ] Offline mode with service workers
- [ ] Real-time collaboration features
- [ ] Advanced analytics dashboard
- [ ] API rate limiting and caching
- [ ] Comprehensive test coverage
- [ ] Docker containerization
- [ ] CI/CD pipeline setup

## 📊 Project Status

- ✅ Core chat functionality
- ✅ Voice assistant with 3D avatar
- ✅ Firebase authentication
- ✅ Cloud storage for conversations
- ✅ Multi-language support
- ✅ Dark/Light mode
- ✅ Responsive design
- 🚧 Resume analyzer (planned)
- 🚧 Job search integration (planned)
- 🚧 Interview preparation (planned)

## 🌟 Star History

If you find this project helpful, please consider giving it a star on GitHub! ⭐

---

**Made with ❤️ for students and professionals navigating their career journey**


**Version**: 1.0.0  
**Last Updated**: November 2025  
**Maintained by**: TEAM CRYPT

