import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './Sidebar';
import MessageBubble from './MessageBubble';
import ThinkingAnimation from './ThinkingAnimation';
import LanguageSelector from './LanguageSelector';
import AddfilesButton from './AddfilesButton.js';
import { loadHistory, saveHistory, clearHistory } from '../utils/Storage';
import { loadHistoryFromFirebase, saveHistoryToFirebase } from '../services/FirebaseStorage';
import { auth } from '../services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useTranslation } from 'react-i18next';
import { translateText } from '../services/translateText';
import { useTheme } from '../contexts/ThemeContext';
import '../styles/chat-professional.css';

function ChatInterface({ onToggleView }) {
  const chatEndRef = useRef(null);
  const { t, i18n } = useTranslation();
  const { isDarkMode, toggleTheme } = useTheme();

  const [input, setInput] = useState('');
  const [conversations, setConversations] = useState([{
    id: 'default',
    title: 'New Chat',
    messages: [],
  }]);
  const [activeId, setActiveId] = useState('default');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [translating, setTranslating] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [isThinking, setIsThinking] = useState(false);

  const activeMessages = conversations.find(c => c.id === activeId)?.messages || [];

  // Load chat history from Firebase when user logs in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log('👤 User logged in:', user.email);
        setIsLoadingHistory(true);
        
        // Add a small delay to ensure Firebase is ready
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Try to load from Firebase first
        const firebaseHistory = await loadHistoryFromFirebase(user);
        
        if (firebaseHistory && firebaseHistory.length > 0) {
          console.log('📥 Loading history from Firebase:', firebaseHistory.length, 'conversations');
          setConversations(firebaseHistory);
          setActiveId(firebaseHistory[0].id);
        } else {
          // Fallback to local storage
          const localHistory = loadHistory();
          if (localHistory && localHistory.length > 0) {
            console.log('📥 Loading history from local storage');
            setConversations(localHistory);
            setActiveId(localHistory[0].id);
            // Save to Firebase for future use
            await saveHistoryToFirebase(localHistory);
          } else {
            // Start fresh
            console.log('📝 Starting with fresh chat');
            const defaultConv = {
              id: 'default',
              title: 'New Chat',
              messages: [],
            };
            setConversations([defaultConv]);
            setActiveId('default');
          }
        }
        
        setIsLoadingHistory(false);
      } else {
        console.log('👤 User logged out');
        // Reset to default state
        const defaultConv = {
          id: 'default',
          title: 'New Chat',
          messages: [],
        };
        setConversations([defaultConv]);
        setActiveId('default');
        setIsLoadingHistory(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Save history and scroll
  useEffect(() => {
    if (!isLoadingHistory) {
      saveHistory(conversations);
      saveHistoryToFirebase(conversations); // Also save to Firebase
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [conversations, isLoadingHistory]);

  // Translation effect (FIXED infinite loop)
  useEffect(() => {
    async function translateAll() {
      const targetLang = i18n.language;
      if (!targetLang || targetLang === 'en') return;

      setTranslating(true);

      const updatedConversations = await Promise.all(
        conversations.map(async conv => {
          const translatedMessages = await Promise.all(
            conv.messages.map(async (msg) => {
              try {
                const translatedText = await translateText(msg.text, targetLang);
                return { ...msg, text: translatedText };
              } catch {
                return msg;
              }
            })
          );
          return { ...conv, messages: translatedMessages };
        })
      );

      setConversations(updatedConversations);
      setTranslating(false);
    }

    translateAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language]); // <-- only depend on language

  // Generate smart title for conversation
  const generateChatTitle = async (firstMessage) => {
    console.log('🔄 Generating title for:', firstMessage);
    try {
      const res = await fetch('http://localhost:5000/api/generate-title', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: firstMessage }),
      });
      const data = await res.json();
      console.log('✅ Title generated:', data.title);
      return data.title || 'New Chat';
    } catch (err) {
      console.error('❌ Title generation error:', err);
      return 'New Chat';
    }
  };

  // Send message
  const handleSend = async () => {
    if (!input.trim() && selectedFiles.length === 0) return;

    const newMessage = {
      sender: 'user',
      text: input,
      files: selectedFiles.map(f => f.name)
    };

    const currentConv = conversations.find(c => c.id === activeId);
    const isFirstMessage = currentConv?.messages.length === 0;

    setConversations(prev =>
      prev.map(c =>
        c.id === activeId ? { ...c, messages: [...c.messages, newMessage] } : c
      )
    );

    const userInput = input;
    setInput('');
    setSelectedFiles([]);
    setIsThinking(true);

    // Generate title for first message
    if (isFirstMessage) {
      const newTitle = await generateChatTitle(userInput);
      setConversations(prev =>
        prev.map(c =>
          c.id === activeId ? { ...c, title: newTitle } : c
        )
      );
    }

    // Call backend for Gemini API
    try {
      const res = await fetch('http://localhost:5000/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userInput }),
      });
      const data = await res.json();
      const botReply = { sender: 'bot', text: data.text || "Sorry, no response from Gemini." };

      setConversations(prev =>
        prev.map(c =>
          c.id === activeId ? { ...c, messages: [...c.messages, botReply] } : c
        )
      );
    } catch (err) {
      console.error('Gemini API Error:', err);
      const botReply = { sender: 'bot', text: "Sorry, something went wrong with Gemini API." };
      setConversations(prev =>
        prev.map(c =>
          c.id === activeId ? { ...c, messages: [...c.messages, botReply] } : c
        )
      );
    } finally {
      setIsThinking(false);
    }
  };

  const handleNewConversation = () => {
    const newId = `conv-${Date.now()}`;
    const newConv = {
      id: newId,
      title: 'New Chat',
      messages: [], // Start with empty messages
    };
    setConversations([newConv, ...conversations]);
    setActiveId(newId);
  };

  const handleClear = () => {
    clearHistory();
    const fresh = {
      id: 'default',
      title: 'New Chat',
      messages: [], // Start fresh with no messages
    };
    setConversations([fresh]);
    setActiveId('default');
  };

  
  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  return (
    <div className={`chat-wrapper ${isDarkMode ? 'dark' : 'light'}`}>
      <Sidebar
        conversations={conversations}
        activeId={activeId}
        setActiveId={setActiveId}
        handleNewConversation={handleNewConversation}
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        onToggleView={onToggleView} 
      />
      <div className={`chat-main ${sidebarOpen ? '' : 'full-width'}`}>
        {!sidebarOpen && (
          <button
            className="sidebar-toggle open"
            onClick={toggleSidebar}
            aria-label="Open sidebar"
            style={{ position: 'absolute', left: 0, top: 0, margin: 16, zIndex: 2 }}
          >
            ☰
          </button>
        )}
        <div className="chat-header">
          <h2>{conversations.find(c => c.id === activeId)?.title || t('defaultChat')}</h2>
          <div className="header-buttons">
            <button className="clear-button" onClick={handleClear} disabled={translating}>{t('clear')}</button>
            <button className="toggle-button theme-toggle" onClick={toggleTheme}>
              {isDarkMode ? '☀️ Light' : '🌙 Dark'}
            </button>
            <LanguageSelector />
          </div>
        </div>
        <div className="chat-window" aria-live="polite" aria-atomic="true">
          {translating && <div className="translating-indicator">Translating...</div>}
          {activeMessages.map((msg, idx) => (
            <MessageBubble key={idx} sender={msg.sender} text={msg.text}>
              {msg.files && msg.files.length > 0 && (
                <div className="file-attachment">
                  {msg.files.map((fname, i) => (
                    <div key={i}>📎 {fname}</div>
                  ))}
                </div>
              )}
            </MessageBubble>
          ))}
          {isThinking && <ThinkingAnimation />}
          <div ref={chatEndRef} />
        </div>
        <div className="chat-input-area">
          <div className="input-container">
            {selectedFiles.length > 0 && (
              <div className="file-preview">
                {selectedFiles.map((file, i) => (
                  <div key={i} className="file-tag">
                    <span>📎 {file.name}</span>
                    <button onClick={() =>
                      setSelectedFiles(prev => prev.filter((_, idx) => idx !== i))
                    }>✖</button>
                  </div>
                ))}
              </div>
            )}
            <textarea
              className="input-box"
              value={input}
              placeholder={t('placeholder')}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
              rows={1}
              aria-label="Chat Input"
              disabled={translating}
            />
            <div className="input-action-buttons">
              <AddfilesButton onFileSelect={(files) => {
                setSelectedFiles(prev => [...prev, ...files]);
              }} />
              <button
                className="send-button"
                onClick={handleSend}
                aria-label="Send message"
                disabled={translating || (!input.trim() && selectedFiles.length === 0)}
              >
                ➤
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatInterface;
