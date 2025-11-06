import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./services/firebase";
import { ThemeProvider } from "./contexts/ThemeContext";
import LandingPage from "./pages/LandingPage";
import ChatInterface from "./components/ChatInterface";
import TeacherJoeAvatar from "./pages/TeacherJoeAvatar";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showModel, setShowModel] = useState(false);

  // Check authentication state on mount and persist
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Function to toggle between chat and model views
  const toggleModelView = (shouldShow) => {
    setShowModel(shouldShow);
  };

  // Show loading while checking auth
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        color: '#f1f5f9',
        fontSize: '1.25rem'
      }}>
        Loading...
      </div>
    );
  }

  return (
    <ThemeProvider>
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
                    // Teacher Joe Avatar
                    <TeacherJoeAvatar onToggleView={toggleModelView} /> 
                  ) : (
                    // Chat Interface
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
    </ThemeProvider>
  );
}

export default App;