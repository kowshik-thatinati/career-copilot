# 🏗️ Career Compass Architecture

## System Overview

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
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  Landing     │  │    Chat      │  │  Teacher Joe │     │
│  │   Page       │  │  Interface   │  │   Avatar     │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │           API Config (api.js)                        │  │
│  │  - GEMINI: /api/gemini                              │  │
│  │  - GENERATE_TITLE: /api/generate-title             │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ API Calls
                         │
┌────────────────────────▼────────────────────────────────────┐
│                   Backend (Express)                          │
│                 (http://localhost:5000)                      │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              API Endpoints                           │  │
│  │  • POST /api/gemini                                 │  │
│  │  • POST /api/generate-title                         │  │
│  │  • GET  /api/health                                 │  │
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

## Data Flow

### Chat Message Flow

```
1. User types message
   ↓
2. Frontend (ChatInterface.js)
   - Adds message to local state
   - Shows thinking animation
   ↓
3. API Call (API_ENDPOINTS.GEMINI)
   - POST to backend /api/gemini
   ↓
4. Backend (server.js)
   - Receives prompt
   - Adds system prompt
   - Calls Gemini API
   ↓
5. Gemini AI
   - Processes request
   - Returns response
   ↓
6. Backend
   - Extracts text from response
   - Returns to frontend
   ↓
7. Frontend
   - Hides thinking animation
   - Displays bot response
   - Saves to Firebase
```

### Voice Interaction Flow (Teacher Joe)

```
1. User clicks "Start Speaking"
   ↓
2. Web Speech API (Browser)
   - Captures audio
   - Converts to text
   ↓
3. Frontend (TeacherJoeAvatar.jsx)
   - Displays interim transcript
   - Sends final text to backend
   ↓
4. Backend → Gemini AI
   - Same as chat flow
   ↓
5. Frontend receives response
   ↓
6. Speech Synthesis API
   - Converts text to speech
   - Plays audio
   - Animates 3D model
```

## Component Architecture

### Frontend Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── ChatInterface.js      # Main chat UI
│   │   ├── MessageBubble.js      # Message display
│   │   ├── ThinkingAnimation.js  # Loading indicator
│   │   ├── Sidebar.js            # Navigation
│   │   ├── LanguageSelector.js   # i18n selector
│   │   └── AddfilesButton.js     # File upload
│   │
│   ├── pages/
│   │   ├── LandingPage.js        # Home page
│   │   ├── Auth.js               # Login/Signup
│   │   └── TeacherJoeAvatar.jsx  # 3D voice assistant
│   │
│   ├── services/
│   │   ├── firebase.js           # Firebase config
│   │   ├── FirebaseStorage.js    # Cloud storage
│   │   ├── geminiApi.js          # API calls
│   │   └── translateText.js      # Translation
│   │
│   ├── contexts/
│   │   └── ThemeContext.js       # Dark/Light mode
│   │
│   ├── config/
│   │   └── api.js                # ✨ API endpoints
│   │
│   └── utils/
│       ├── Storage.js            # Local storage
│       └── languages.js          # Language options
```

### Backend Structure

```
backend/
├── server.js                     # Express server
│   ├── Middleware
│   │   ├── CORS
│   │   └── Body Parser
│   │
│   ├── Routes
│   │   ├── GET  /
│   │   ├── GET  /api/health
│   │   ├── POST /api/gemini
│   │   └── POST /api/generate-title
│   │
│   └── Gemini Integration
│       └── API calls to Google AI
```

## Technology Stack

### Frontend
- **React 19.1.1** - UI framework
- **React Router 7.8.2** - Routing
- **Three.js 0.181.0** - 3D graphics
- **React Three Fiber 9.4.0** - React + Three.js
- **Firebase 12.2.1** - Auth & Storage
- **i18next 25.4.0** - Internationalization

### Backend
- **Express 5.1.0** - Web framework
- **Axios 1.12.2** - HTTP client
- **CORS 2.8.5** - Cross-origin requests
- **Body Parser 2.2.0** - Request parsing
- **Dotenv 16.0.3** - Environment variables

### External Services
- **Google Gemini AI** - AI responses
- **Firebase Auth** - User authentication
- **Firestore** - Cloud database
- **Web Speech API** - Voice recognition/synthesis

## Security Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Security Layers                       │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  1. Environment Variables                               │
│     • API keys not in code                              │
│     • .env files in .gitignore                          │
│                                                          │
│  2. Firebase Authentication                             │
│     • Email/password authentication                     │
│     • Secure token management                           │
│                                                          │
│  3. CORS Configuration                                  │
│     • Controlled origin access                          │
│     • Prevents unauthorized requests                    │
│                                                          │
│  4. Input Validation                                    │
│     • Backend validates all inputs                      │
│     • Prevents injection attacks                        │
│                                                          │
│  5. HTTPS (Production)                                  │
│     • Encrypted communication                           │
│     • Secure data transmission                          │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

## Deployment Architecture

### Development
```
localhost:3000 (Frontend) → localhost:5000 (Backend) → Gemini AI
                          ↓
                      Firebase
```

### Production
```
vercel.app (Frontend) → railway.app (Backend) → Gemini AI
                      ↓
                  Firebase
```

## Scalability Considerations

### Current Setup (Small Scale)
- Single backend instance
- Direct API calls
- Client-side state management

### Future Enhancements (Large Scale)
- Load balancer for backend
- Redis caching layer
- Message queue (RabbitMQ/Redis)
- Database for conversation history
- CDN for static assets
- Microservices architecture

## Performance Optimization

### Frontend
- Code splitting
- Lazy loading components
- Image optimization
- Service worker (PWA)
- Memoization (React.memo)

### Backend
- Response caching
- Connection pooling
- Rate limiting
- Compression middleware
- Database indexing

## Monitoring & Logging

### Frontend
- Google Analytics
- Error tracking (Sentry)
- Performance monitoring
- User behavior analytics

### Backend
- Server logs
- API response times
- Error tracking
- Resource usage monitoring

---

**This architecture provides a solid foundation for Career Compass while remaining flexible for future enhancements! 🏗️**
