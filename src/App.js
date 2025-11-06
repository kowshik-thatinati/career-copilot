import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import ChatInterface from "./components/ChatInterface";
import Human from "./Human"; 
import "./components/chat.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showModel, setShowModel] = useState(false);

  // Function to toggle between chat and model views
  const toggleModelView = (shouldShow) => {
    setShowModel(shouldShow);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<LandingPage onAuthSuccess={() => setIsAuthenticated(true)} />}
        />
        <Route
          path="/chat"
          element={
            isAuthenticated ? (
              <div className="main-layout">
                {showModel ? (
                  // Pass the prop to Human.jsx
                  <Human onToggleView={toggleModelView} /> 
                ) : (
                  // Pass the prop to ChatInterface.js
                  <ChatInterface onToggleView={toggleModelView} />
                )}
              </div>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route path="*" element={<Navigate to={isAuthenticated ? "/chat" : "/"} replace />} />
      </Routes>
    </Router>
  );
}

export default App;