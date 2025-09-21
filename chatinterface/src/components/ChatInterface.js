import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './Sidebar';
import MessageBubble from './MessageBubble';
import LanguageSelector from './LanguageSelector';
import AddfilesButton from './AddfilesButton.js';
import { loadHistory, saveHistory, clearHistory } from './Storage';
import { useTranslation } from 'react-i18next';
import { translateText } from './translateText';
import './chat.css';

function ChatInterface({ onToggleView }) {
  const chatEndRef = useRef(null);
  const { t, i18n } = useTranslation();

  const [input, setInput] = useState('');
  const [conversations, setConversations] = useState(() => loadHistory());
  const [activeId, setActiveId] = useState(conversations[0]?.id || 'default');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [theme, setTheme] = useState('light');
  const [translating, setTranslating] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const activeMessages = conversations.find(c => c.id === activeId)?.messages || [];

  // Save history and scroll
  useEffect(() => {
    saveHistory(conversations);
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversations]);

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

  // Send message
  const handleSend = async () => {
    if (!input.trim() && selectedFiles.length === 0) return;

    const newMessage = {
      sender: 'user',
      text: input,
      files: selectedFiles.map(f => f.name)
    };

    setConversations(prev =>
      prev.map(c =>
        c.id === activeId ? { ...c, messages: [...c.messages, newMessage] } : c
      )
    );

    setInput('');
    setSelectedFiles([]);

    // Call backend for Gemini API
    try {
      const res = await fetch('http://localhost:5000/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: newMessage.text }),
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
    }
  };

  const handleNewConversation = () => {
    const newId = `conv-${Date.now()}`;
    const newConv = {
      id: newId,
      title: t('newChat'),
      messages: [{ sender: 'bot', text: t('hiUser') }],
    };
    setConversations([newConv, ...conversations]);
    setActiveId(newId);
  };

  const handleClear = () => {
    clearHistory();
    const fresh = {
      id: 'default',
      title: t('defaultChat'),
      messages: [{ sender: 'bot', text: t('hiUser') }],
    };
    setConversations([fresh]);
    setActiveId('default');
  };

  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  return (
    <div className={`chat-wrapper ${theme}`}>
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
            <button className="toggle-button" onClick={toggleTheme}>
              {theme === 'light' ? t('darkMode') : t('lightMode')}
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
