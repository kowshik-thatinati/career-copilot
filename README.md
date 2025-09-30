# 🎓 Career Copilot – AI-Powered Education Advisor

## Overview

Career Copilot is a full-stack AI web application that provides personalized education and career guidance. The platform supports text chat and live human-like voice interactions. Users can type queries or speak to a human avatar, and the system uses Google’s Gemini API to generate accurate, context-aware responses.

The live human bot records audio, converts it to text, sends it to Gemini API, and then converts the AI response back to audio with lip-synced animation, simulating a real human conversation.

## 🛠️ Tech Stack

- **Frontend:** React.js + Chakra UI  
- **Backend:** Node.js + Express  
- **Database / Auth:** Firebase (Authentication & Firestore)  
- **AI Integration:** Google Gemini API  
- **Speech-to-Text / Text-to-Speech:** Web APIs / React libraries  
- **Deployment:** Vercel / Netlify / Streamlit  

## 🤖 Key Features

### 1️⃣ User Login
- Secure login using Firebase Authentication.
- Supports Google account, GitHub, or email/password.

### 2️⃣ Text Chatbot 💬
- Users can type educational or career-related queries.
- Gemini API generates context-aware, precise responses.

### 3️⃣ Live Human Bot 🤖🗣️
- Click mic to record voice input.
- Converts speech → text → Gemini API → text → audio → lip-synced playback.
- Features: Stop Audio ⏹️, Retry Audio 🔄, Dark Mode 🌙

### 4️⃣ Personalized Advice 🎯
- Provides recommendations based on user input, skills, and interests.

## 🖥️ Project Structure
career-copilot/ ├── backend/
│ ├── server.js # Node.js / Express backend
│ └── other backend files
│ ├── frontend/
│ ├── ChatBot.jsx # Text chatbot interface
│ ├── HumanBot.jsx # Human avatar + voice chat
│ └── other React components
│ ├── .env # API keys & Firebase config
├── package.json
└── README.md # Project documentation


## 🚀Future Enhancements
Multi-language support 🌐
Higher accuracy lip-sync & speech recognition 🎤
Expanded educational resources 📚
## 👨‍💻 Author
Kowshik Thatinati
GitHub: https://github.com/kowshik-thatinati

Project: career-copilot
