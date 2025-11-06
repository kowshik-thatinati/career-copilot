# Career Copilot 🎓

Your AI-Powered Education & Career Assistant

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Configuration](#configuration)

---

## 🎯 Overview

Career Copilot is an intelligent AI assistant designed to help students and professionals with:
- **Career Guidance** - Personalized career advice and planning
- **Educational Resources** - Access to learning materials and recommendations
- **Job & Internship Help** - Assistance with job searching and applications
- **Live Voice Assistant** - Interactive 3D avatar with speech recognition and synthesis

---

## ✨ Features

### 1. **AI Chat Interface**
- Real-time conversations with Gemini AI
- Multi-language support (12 languages)
- Chat history saved to Firebase
- Dark/Light mode toggle
- File attachment support

### 2. **Voice Assistant (Teacher Joe)**
- Realistic 3D human avatar
- Speech recognition (speak your questions)
- Text-to-speech responses
- Visual speaking indicators
- Full conversation history

### 3. **Authentication**
- Email/Password login
- Google Sign-In
- Firebase authentication
- Persistent sessions

### 4. **Theming**
- Global dark/light mode
- Synchronized across all pages
- Persists in localStorage
- Smooth transitions

---

## 🛠️ Tech Stack

### Frontend
- **React** 18.x - UI framework
- **React Router** - Navigation
- **React Three Fiber** - 3D rendering
- **i18next** - Internationalization
- **CSS3** - Styling with modern features

### Backend
- **Node.js** - Runtime
- **Express** - Web server
- **Google Gemini API** - AI responses

### Services
- **Firebase Authentication** - User management
- **Firebase Firestore** - Chat history storage
- **Web Speech API** - Speech recognition & synthesis

---

## 📁 Project Structure

```
career-guru/
├── public/
│   ├── models/
│   │   └── teacher-joe.glb          # 3D avatar model
│   └── index.html
│
├── src/
│   ├── components/                   # Reusable components
│   │   ├── AddfilesButton.js
│   │   ├── ChatInterface.js         # Main chat UI
│   │   ├── LanguageSelector.js
│   │   ├── MessageBubble.js
│   │   └── Sidebar.js
│   │
│   ├── contexts/                     # React contexts
│   │   └── ThemeContext.js          # Global theme management
│   │
│   ├── pages/                        # Page components
│   │   ├── Auth.js                  # Authentication modal
│   │   ├── LandingPage.js           # Landing page
│   │   └── TeacherJoeAvatar.jsx     # 3D voice assistant
│   │
│   ├── services/                     # External services
│   │   ├── firebase.js              # Firebase config
│   │   ├── FirebaseStorage.js       # Firestore operations
│   │   ├── geminiApi.js             # Gemini API calls
│   │   └── translateText.js         # Translation service
│   │
│   ├── styles/                       # CSS files
│   │   ├── auth-beautiful.css
│   │   ├── chat-professional.css
│   │   ├── landing-beautiful.css
│   │   ├── LanguageSelector.css
│   │   └── TeacherJoeAvatar.css
│   │
│   ├── utils/                        # Utility functions
│   │   ├── languages.js             # Language codes
│   │   └── Storage.js               # Local storage helpers
│   │
│   ├── App.js                        # Main app component
│   ├── i18n.js                       # i18n configuration
│   └── index.js                      # Entry point
│
├── server.js                         # Express backend server
├── package.json                      # Dependencies
└── README.md                         # This file
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- **Firebase account** (for authentication)
- **Google Gemini API key**

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd career-guru
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   - Create a Firebase project at [firebase.google.com](https://firebase.google.com)
   - Enable Authentication (Email/Password and Google)
   - Enable Firestore Database
   - Copy your Firebase config to `src/services/firebase.js`

4. **Configure Gemini API**
   - Get API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Add to `server.js`:
     ```javascript
     const API_KEY = 'your-gemini-api-key';
     ```

5. **Add 3D Model** (Optional)
   - Download a 3D model (GLB format)
   - Place in `public/models/teacher-joe.glb`
   - Or use any free model from [Sketchfab](https://sketchfab.com)

---

## 🎮 Usage

### Starting the Application

**You need to run TWO servers:**

#### 1. Start Backend Server
```bash
node server.js
```
✅ Server runs at `http://localhost:5000`

#### 2. Start React Frontend
```bash
npm start
```
✅ App opens at `http://localhost:3000`

### Using the App

1. **Landing Page**
   - Toggle theme (☀️/🌙)
   - Click "Login" or "Sign Up"

2. **Authentication**
   - Sign up with email/password
   - Or use Google Sign-In
   - Click "Continue to Chat" if already logged in

3. **Chat Interface**
   - Type messages and get AI responses
   - Change language (top-right dropdown)
   - Toggle theme
   - Clear chat history
   - Create new conversations

4. **Voice Assistant**
   - Click "Talk Live" in sidebar
   - Click "🎤 Start Speaking"
   - Speak your question
   - Watch Teacher Joe respond with voice
   - Toggle theme

---

## ⚙️ Configuration

### Environment Variables

Create a `.env` file (optional):
```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
```

### Supported Languages

The app supports 12 languages:
- English (en)
- Spanish (es)
- French (fr)
- German (de)
- Chinese (zh)
- Japanese (ja)
- Korean (ko)
- Hindi (hi)
- Arabic (ar)
- Portuguese (pt)
- Russian (ru)
- Italian (it)

### Theme Configuration

- **Default Theme**: Dark mode
- **Storage**: localStorage (`theme` key)
- **Values**: `'dark'` or `'light'`
- **Sync**: Automatic across all pages

---

## 🎨 Features Breakdown

### Chat Interface
- **AI Responses**: Powered by Google Gemini
- **History**: Saved to Firebase Firestore
- **Translation**: Real-time message translation
- **Files**: Attach files to conversations
- **Themes**: Dark/Light mode with smooth transitions

### Voice Assistant
- **3D Avatar**: Realistic human model
- **Speech Input**: Web Speech API recognition
- **Voice Output**: Text-to-speech synthesis
- **Visual Feedback**: Sound waves and status indicators
- **Conversation**: Full chat history display

### Landing Page
- **Modern Design**: Glass-morphism effects
- **Animations**: Smooth transitions and hover effects
- **Responsive**: Works on all screen sizes
- **Theme Toggle**: Persistent across sessions

---

## 🔧 Troubleshooting

### Common Issues

**1. Backend not connecting**
- Ensure `server.js` is running on port 5000
- Check Gemini API key is correct

**2. Firebase errors**
- Verify Firebase config in `src/services/firebase.js`
- Check Firebase console for enabled services

**3. Voice not working**
- Use Chrome, Edge, or Safari (best support)
- Allow microphone permissions
- Ensure backend server is running

**4. 3D model not loading**
- Check file is at `public/models/teacher-joe.glb`
- Verify file format is GLB
- Check browser console for errors

---

## 📝 Scripts

```bash
# Start development server
npm start

# Build for production
npm run build

# Run backend server
node server.js

# Install dependencies
npm install
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

