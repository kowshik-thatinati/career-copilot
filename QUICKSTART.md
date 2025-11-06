# 🚀 Quick Start Guide

Get Career Compass up and running in 5 minutes!

## Step 1: Install Dependencies

```bash
npm run install-all
```

Or install root dependencies first:
```bash
npm install
```

## Step 2: Configure Backend

1. Go to backend folder and create `.env` file:
   ```bash
   cd backend
   ```

2. Create `.env` file with:
   ```env
   PORT=5000
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

3. Get your Gemini API key from: https://makersuite.google.com/app/apikey

## Step 3: Configure Frontend

1. Go to frontend folder:
   ```bash
   cd ../frontend
   ```

2. Create `.env` file with:
   ```env
   REACT_APP_API_URL=http://localhost:5000
   ```

3. Update Firebase config in `src/services/firebase.js` with your Firebase project credentials

## Step 4: Run the Application

From the root directory:
```bash
npm start
```

This will start both:
- Backend on http://localhost:5000
- Frontend on http://localhost:3000

## Step 5: Access the Application

Open your browser and go to: **http://localhost:3000**

1. Sign up for a new account
2. Start chatting with Career Compass!

## Troubleshooting

### Port Already in Use

If port 3000 or 5000 is already in use:

**Backend:** Change PORT in `backend/.env`
**Frontend:** React will automatically prompt to use a different port

### API Connection Error

Make sure:
1. Backend server is running on port 5000
2. `REACT_APP_API_URL` in frontend `.env` matches backend URL
3. CORS is enabled in backend (already configured)

### Firebase Error

Update your Firebase configuration in `frontend/src/services/firebase.js`:
```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  // ... other config
};
```

## Development Mode

For development with auto-reload:
```bash
npm run dev
```

## Need Help?

Check the main README.md for detailed documentation or open an issue on GitHub.

Happy coding! 🎓✨
