import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./chat.css";

// ✅ Import Firebase Auth
import { auth, provider } from "./firebase"; // create firebase.js with your config
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

function LoginForm({ onLoginSuccess }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [theme, setTheme] = useState('light');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      alert(`Logged in as ${userCredential.user.email}`);
      onLoginSuccess?.();
      navigate("/chat");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      alert(`Welcome ${result.user.displayName}`);
      onLoginSuccess?.();
      navigate("/chat");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div className="input-group">
        <input
          type="email"
          name="email"
          required
          placeholder=" "
          value={formData.email}
          onChange={handleChange}
        />
        <label>Email</label>
      </div>
      <div className="input-group">
        <input
          type="password"
          name="password"
          required
          placeholder=" "
          value={formData.password}
          onChange={handleChange}
        />
        <label>Password</label>
      </div>
      <button type="submit">Login</button>
      <button
        type="button"
        onClick={handleGoogleLogin}
        style={{
          marginTop: "10px",
          backgroundColor: "#4285F4",
          color: "#fff",
          border: "none",
          padding: "10px",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "600",
        }}
      >
        Sign in with Google
      </button>
    </form>
  );
}

function SignupForm({ onSignupSuccess }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      alert(`Account created for: ${formData.username}`);
      onSignupSuccess?.();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <div className="input-group">
        <input
          type="text"
          name="username"
          required
          placeholder=" "
          value={formData.username}
          onChange={handleChange}
        />
        <label>Username</label>
      </div>
      <div className="input-group">
        <input
          type="email"
          name="email"
          required
          placeholder=" "
          value={formData.email}
          onChange={handleChange}
        />
        <label>Email</label>
      </div>
      <div className="input-group">
        <input
          type="password"
          name="password"
          required
          placeholder=" "
          value={formData.password}
          onChange={handleChange}
        />
        <label>Password</label>
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
}

function AuthPage({ onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [theme, setTheme] = useState("light");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const logout = () => signOut(auth);
  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className={`App ${theme}`}>
      <div className="form-container">
        <h2>Welcome</h2>
        <h1>Career Copilot</h1>
        {user ? (
          <>
            <h3>Hello, {user.displayName || user.email}</h3>
            {user.photoURL && (
              <img
                src={user.photoURL}
                alt="Profile"
                style={{ borderRadius: "50%", margin: "10px 0", width: "80px" }}
              />
            )}
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <div className="toggle-buttons">
              <button
                className={isLogin ? "active" : ""}
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
              <button
                className={!isLogin ? "active" : ""}
                onClick={() => setIsLogin(false)}
              >
                Sign Up
              </button>
            </div>

            {isLogin ? (
              <LoginForm onLoginSuccess={onAuthSuccess} />
            ) : (
              <SignupForm onSignupSuccess={onAuthSuccess} />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default AuthPage;
