import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import "../styles/landing-beautiful.css";
import AuthPage from "./Auth";

function LandingPage({ onAuthSuccess }) {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleAuthClick = () => {
    setShowAuthModal(true);
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    onAuthSuccess?.();
    navigate("/chat");
  };

  const closeModal = () => {
    setShowAuthModal(false);
  };

  return (
    <div className={`landing-page ${isDarkMode ? 'dark' : 'light'}`}>
      {/* Header with Login/Signup buttons */}
      <header className="landing-header">
        <div className="header-content">
          <div className="logo-section">
            <img src="https://img.icons8.com/fluency/96/graduation-cap.png" alt="Career Copilot" className="logo-img" />
            <h1 className="logo-text">Career Copilot</h1>
          </div>
          <div className="header-buttons">
            <button className="theme-toggle-btn" onClick={toggleTheme} title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
              {isDarkMode ? '☀️' : '🌙'}
            </button>
            <button className="btn-login" onClick={handleAuthClick}>Login</button>
            <button className="btn-signup" onClick={handleAuthClick}>Sign Up</button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-icon">
            <img src="https://img.icons8.com/fluency/200/graduation-cap.png" alt="Career Copilot Icon" />
          </div>
          <h1 className="hero-title">Career Copilot</h1>
          <p className="hero-subtitle">Your AI-Powered Education & Career Assistant</p>
          <p className="hero-description">
            Get personalized career guidance, access educational resources, explore tech stacks, 
            find internships, and plan your professional journey with our intelligent AI assistant.
          </p>
          <div className="hero-features">
            <div className="feature-item">
              <span className="feature-icon">🎯</span>
              <span>Career Guidance</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📚</span>
              <span>Educational Resources</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">💼</span>
              <span>Job & Internship Help</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🎙️</span>
              <span>Live Talk Option</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2 className="cta-title">Ready to Start Your Journey?</h2>
        <p className="cta-description">Join thousands of students and professionals advancing their careers</p>
        <div className="cta-buttons">
          <button className="btn-cta-login" onClick={handleAuthClick}>Login</button>
          <button className="btn-cta-signup" onClick={handleAuthClick}>Sign Up</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <p>&copy; 2025 Career Copilot. All rights reserved.</p>
        <p>Empowering your education and career decisions with AI</p>
      </footer>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="auth-modal-overlay" onClick={closeModal}>
          <div className="auth-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal}>&times;</button>
            <AuthPage onAuthSuccess={handleAuthSuccess} />
          </div>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
