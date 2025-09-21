import React, { useState } from 'react';
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import logo from './Gemini_Generated_Image_u4fr21u4fr21u4fr.png';

function Sidebar({ conversations, activeId, setActiveId, handleNewConversation, sidebarOpen, toggleSidebar, onToggleView }) {
  const [showMenu, setShowMenu] = useState(false);
  const [showLogoModal, setShowLogoModal] = useState(false);
  
  if (!sidebarOpen) return null;

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      // Use console.error for better debugging in the console
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="sidebar open">
      <div className="sidebar-header">
        <img
          src={logo}
          alt="Career Copilot Logo"
          className="logo"
          onClick={() => setShowLogoModal(true)}
        />
        <h3>Career Copilot</h3>
        <button onClick={toggleSidebar} aria-label="Close sidebar">
          ✖
        </button>
      </div>

      <button className="new-button" onClick={handleNewConversation}>+ New Chat</button>

      <ul className="conversation-list" role="listbox" aria-label="Conversation list">
        {conversations.map(conv => (
          <li
            key={conv.id}
            className={conv.id === activeId ? 'active' : ''}
            onClick={() => setActiveId(conv.id)}
            role="option"
            aria-selected={conv.id === activeId}
            tabIndex={0}
            onKeyDown={e => { if (e.key === 'Enter') setActiveId(conv.id); }}
          >
            {conv.title}
          </li>
        ))}
      </ul>

      <button
        className='new-button'
        onClick={() => onToggleView(true)} // Call the prop function to show the model
      >
        Talk Live
      </button>

      <div className="more-menu-wrapper">
        <button
          className="settings-open button"
          onClick={handleLogout}
        >
          🚪 Log out
        </button>
      </div>

      {showLogoModal && (
        <div className="logo-modal-overlay">
          <div className="logo-modal-content">
            <button className="modal-close-btn" onClick={() => setShowLogoModal(false)}>✖</button>
            <img src={logo} alt="Career Copilot Logo" className="logo-large" />
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
