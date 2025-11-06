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

## 🏗️ Project Structure

```
career-compass/
├── frontend/           # React application
│   ├── public/        # Static assets
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── contexts/      # React contexts
│   │   ├── config/        # Configuration files
│   │   ├── styles/        # CSS files
│   │   └── utils/         # Utility functions
│   └── package.json
│
├── backend/           # Express server
│   ├── server.js     # Main server file
│   └── package.json
│
└── package.json      # Root package file
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Gemini API Key** from [Google AI Studio](https://makersuite.google.com/app/apikey)
- **Firebase Project** (for authentication and storage)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/career-compass.git
   cd career-compass
   ```

2. **Install dependencies for both frontend and backend**
   ```bash
   npm run install-all
   ```

   Or install manually:
   ```bash
   # Install root dependencies
   npm install

   # Install frontend dependencies
   cd frontend
   npm install

   # Install backend dependencies
   cd ../backend
   npm install
   ```

### Configuration

#### Backend Configuration

1. Create a `.env` file in the `backend/` directory:
   ```bash
   cd backend
   cp .env.example .env
   ```

2. Add your Gemini API key to `.env`:
   ```env
   PORT=5000
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

#### Frontend Configuration

1. Create a `.env` file in the `frontend/` directory:
   ```bash
   cd frontend
   cp .env.example .env
   ```

2. Add your configuration:
   ```env
   REACT_APP_API_URL=http://localhost:5000
   ```

3. Update Firebase configuration in `frontend/src/services/firebase.js` with your Firebase project credentials.

### Running the Application

#### Option 1: Run Both Frontend and Backend Together (Recommended)

From the root directory:
```bash
npm start
```

This will start:
- Backend server on `http://localhost:5000`
- Frontend development server on `http://localhost:3000`

#### Option 2: Run Separately

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

#### Development Mode with Auto-Reload

```bash
npm run dev
```

This runs the backend with nodemon for auto-restart on file changes.

## 📖 Usage Guide

### Chat Interface

1. **Sign Up/Login**: Create an account or log in with existing credentials
2. **Start Chatting**: Type your career-related questions in the input box
3. **Get AI Responses**: Receive personalized guidance from Career Compass
4. **Manage Conversations**: 
   - Create new conversations with the "New Chat" button
   - Switch between conversations in the sidebar
   - Conversations are automatically saved to the cloud

### Talk Live (Teacher Joe)

1. Click the **"Talk Live"** button in the sidebar
2. Click **"Start Speaking"** to activate voice recognition
3. Speak your question clearly
4. Teacher Joe will respond with voice and text
5. Click **"Stop Speaking"** to interrupt the response

### Features

- **File Attachments**: Click the 📎 icon to attach files to your messages
- **Language Translation**: Use the language selector to translate conversations
- **Dark/Light Mode**: Toggle between themes using the 🌙/☀️ button
- **Clear History**: Remove all conversations with the "Clear" button

## 🛠️ Tech Stack

### Frontend
- **React** 19.1.1 - UI framework
- **React Router** - Navigation
- **Three.js** & **React Three Fiber** - 3D graphics for Teacher Joe
- **Firebase** - Authentication and cloud storage
- **i18next** - Internationalization
- **Web Speech API** - Voice recognition and synthesis

### Backend
- **Express** - Web server framework
- **Axios** - HTTP client for Gemini API
- **CORS** - Cross-origin resource sharing
- **Body Parser** - Request body parsing
- **Google Gemini AI** - AI-powered responses

## 📦 Building for Production

### Build Frontend

```bash
cd frontend
npm run build
```

This creates an optimized production build in the `frontend/build/` directory.

### Deploy Backend

The backend can be deployed to platforms like:
- **Heroku**
- **Railway**
- **Render**
- **AWS EC2**
- **Google Cloud Platform**

Make sure to set environment variables on your hosting platform.

### Deploy Frontend

The frontend can be deployed to:
- **Vercel**
- **Netlify**
- **GitHub Pages**
- **Firebase Hosting**

Update the `REACT_APP_API_URL` environment variable to point to your deployed backend.

## 🔑 Environment Variables

### Backend (.env)
```env
PORT=5000
GEMINI_API_KEY=your_gemini_api_key
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Google Gemini AI** for powering the AI responses
- **Firebase** for authentication and storage
- **Three.js** community for 3D graphics support
- **React** community for the amazing ecosystem

## 📧 Support

For support, email your-email@example.com or open an issue in the repository.

## 🔮 Future Enhancements

- [ ] Resume builder and analyzer
- [ ] Job search integration
- [ ] Career path visualization
- [ ] Interview preparation tools
- [ ] Skill assessment tests
- [ ] Mentor matching system
- [ ] Company reviews and insights
- [ ] Salary comparison tools

---

**Made with ❤️ for students and professionals navigating their career journey**
