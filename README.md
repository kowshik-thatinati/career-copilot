🚀 **Career Copilot – AI-Powered Education Advisor**






Career Copilot is an advanced AI-driven education advisor providing personalized guidance through text chat and live human-like interactions. The project uses Google Gemini API, speech-to-text, text-to-speech, and lip-synced human avatars to simulate a live conversation.

✨ **Features**
1️⃣ **User Login** 🔑

Secure login using Firebase Authentication.

Supports Google account, GitHub, or email/password sign-in.

2️⃣ **Text Chatbot** 💬

Users can type educational or career-related queries.

Gemini API generates precise, context-aware replies.

Instant, clean text-based interaction.

3️⃣**Live Human Bot**🤖🗣️

Interactive Human Avatar on screen.

Voice Input: Click mic → record audio → convert to text → send to Gemini API.

Voice Output: Gemini API response → converted to audio → lip-synced playback.

Stop Audio ⏹️: Stop bot speech anytime.

Retry Audio 🔄: Prompts user again if audio isn’t clear.

Dark Mode 🌙: Switch theme for comfortable viewing.

4️⃣**Personalized Advice** 🎯

Provides recommendations based on user queries, interests, and goals.

🛠️ **Tech Stack**

**Frontend**: React.js

**Backend**: Node.js + Express

**Database / Auth**: Firebase (Authentication & Firestore)

**AI Integration**: Google Gemini API

**Speech-to-Text / Text-to-Speech**: Web APIs / React libraries


⚡**How It Works**
Phase 1 – Text Chat 💬
User Login 🔑
       │
       ▼
User Types Message ✍️
       │
       ▼
Gemini API 🤖
(Generates Response)
       │
       ▼
Display Text Reply 📝

Phase 2 – Live Human Bot 🤖🗣️
User Clicks Mic 🎤
       │
       ▼
Record Audio 🔊
       │
       ▼
Convert to Text 📝
       │
       ▼
Send to Gemini API 🤖
       │
       ▼
Generate Response 🗨️
       │
       ▼
Convert Text → Audio 🔊
       │
       ▼
Play Audio + Lip-Sync 🤯👄
       │
       ├─> Stop Audio ⏹️ (Optional)
       └─> Retry Audio 🔄 (If unclear)

**Features Highlight** 🌟

✅ Text & Voice interaction

✅ Live human-like avatar with lip-sync

✅ Stop / Retry audio for clarity

✅ Dark mode 🌙 for comfortable viewing



🚀 **Future Enhancements**

Multi-language support 🌐

Higher accuracy lip-sync & speech recognition 🎤

Expanded educational resources 📚

⚙️**Setup Instructions**

Clone the repository

git clone https://github.com/kowshik-thatinati/career-copilot.git
cd career-copilot


Install dependencies

npm install


Add Firebase Configuration

Create a .env file in the root folder with:

REACT_APP_FIREBASE_API_KEY=your_api_key_here
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_GEMINI_API_KEY=your_gemini_api_key


Start the Development Server

npm start


Open in your browser
http://localhost:3000

👨‍💻 Author

Kowshik Thatinati

GitHub: https://github.com/kowshik-thatinati

Project: career-copilot
