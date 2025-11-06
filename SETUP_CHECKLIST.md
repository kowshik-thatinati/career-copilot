# ✅ Setup Checklist

Follow this checklist to ensure Career Compass is properly set up.

## Pre-Setup

- [ ] Node.js (v16+) installed
- [ ] npm or yarn installed
- [ ] Git installed
- [ ] Code editor (VS Code recommended)

## Installation

- [ ] Clone/navigate to project directory
- [ ] Run `npm install` in root directory
- [ ] Run `npm run install-all` OR manually install in frontend and backend

## Backend Configuration

- [ ] Navigate to `backend/` directory
- [ ] Copy `.env.example` to `.env`
- [ ] Add Gemini API key to `.env`
- [ ] Verify `PORT=5000` in `.env`
- [ ] Test backend: `cd backend && npm start`
- [ ] Visit http://localhost:5000 - should see "✅ Career Compass API Server is running!"

## Frontend Configuration

- [ ] Navigate to `frontend/` directory
- [ ] Copy `.env.example` to `.env`
- [ ] Set `REACT_APP_API_URL=http://localhost:5000`
- [ ] Update Firebase config in `src/services/firebase.js`
- [ ] Test frontend: `cd frontend && npm start`
- [ ] Visit http://localhost:3000 - should see landing page

## Firebase Setup

- [ ] Create Firebase project at https://console.firebase.google.com
- [ ] Enable Authentication (Email/Password)
- [ ] Enable Firestore Database
- [ ] Copy Firebase config to `frontend/src/services/firebase.js`
- [ ] Update security rules if needed

## Testing Features

### Authentication
- [ ] Sign up with new account
- [ ] Log in with existing account
- [ ] Log out successfully

### Chat Interface
- [ ] Send a message
- [ ] Receive AI response
- [ ] Create new conversation
- [ ] Switch between conversations
- [ ] Clear conversation history
- [ ] Conversations persist after refresh

### Talk Live (Teacher Joe)
- [ ] Click "Talk Live" button
- [ ] 3D model loads correctly
- [ ] Click "Start Speaking"
- [ ] Speak a question
- [ ] Receive voice response
- [ ] Stop speaking works

### UI Features
- [ ] Dark/Light mode toggle works
- [ ] Language selector works
- [ ] File attachment button appears
- [ ] Sidebar toggle works
- [ ] Responsive design on mobile

### API Integration
- [ ] Chat messages get AI responses
- [ ] Conversation titles auto-generate
- [ ] Thinking animation appears while loading
- [ ] Error messages display properly

## Production Readiness

- [ ] Remove console.logs from production code
- [ ] Update Firebase security rules
- [ ] Set up proper error handling
- [ ] Configure CORS for production domains
- [ ] Set up environment variables on hosting platform
- [ ] Test production build locally
- [ ] Set up monitoring/analytics

## Deployment

### Backend
- [ ] Choose hosting platform (Railway/Render/Heroku)
- [ ] Set environment variables
- [ ] Deploy backend
- [ ] Test API endpoints
- [ ] Note backend URL

### Frontend
- [ ] Update `REACT_APP_API_URL` to production backend URL
- [ ] Build frontend: `npm run build`
- [ ] Deploy to Vercel/Netlify/Firebase
- [ ] Test production site
- [ ] Verify all features work

## Post-Deployment

- [ ] Test authentication flow
- [ ] Test chat functionality
- [ ] Test voice assistant
- [ ] Check mobile responsiveness
- [ ] Monitor error logs
- [ ] Set up analytics (optional)
- [ ] Configure custom domain (optional)

## Documentation

- [ ] Read README.md
- [ ] Read QUICKSTART.md
- [ ] Read DEPLOYMENT.md
- [ ] Update team documentation
- [ ] Share access credentials securely

## Security

- [ ] `.env` files not committed to git
- [ ] API keys stored securely
- [ ] Firebase security rules configured
- [ ] HTTPS enabled in production
- [ ] CORS properly configured
- [ ] Input validation in place

## Troubleshooting

If something doesn't work:

1. **Backend not starting**
   - Check if port 5000 is available
   - Verify `.env` file exists
   - Check for syntax errors in server.js

2. **Frontend not connecting to backend**
   - Verify `REACT_APP_API_URL` is correct
   - Check if backend is running
   - Check browser console for CORS errors

3. **Firebase errors**
   - Verify Firebase config is correct
   - Check Firebase console for errors
   - Ensure authentication is enabled

4. **Build errors**
   - Delete `node_modules` and reinstall
   - Clear npm cache: `npm cache clean --force`
   - Check Node.js version compatibility

## Need Help?

- 📖 Check README.md
- 🚀 Check QUICKSTART.md
- 🌐 Check DEPLOYMENT.md
- 💬 Open GitHub issue
- 📧 Contact support

---

**Once all items are checked, you're ready to go! 🎉**
