import React, { useState, useRef, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, PerspectiveCamera } from "@react-three/drei";
import { useTheme } from "../contexts/ThemeContext";
import "../styles/TeacherJoeAvatar.css";

// Teacher Joe 3D Model Component
function TeacherJoeModel({ isSpeaking, audioLevel }) {
  const { scene } = useGLTF("/models/teacher-joe.glb");
  const modelRef = useRef();
  const headRef = useRef();

  // Find the head mesh for animation
  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh) {
          // Look for head or face mesh
          if (child.name.toLowerCase().includes('head') || 
              child.name.toLowerCase().includes('face')) {
            headRef.current = child;
            console.log('Found head mesh:', child.name);
          }
          
          // Check for morph targets (for facial animation)
          if (child.morphTargetInfluences && child.morphTargetInfluences.length > 0) {
            console.log('Found mesh with morph targets:', child.name, 
                       'Targets:', child.morphTargetInfluences.length);
          }
        }
      });
    }
  }, [scene]);

  // Keep model completely fixed - no animation
  useFrame(() => {
    // Animation disabled to keep model in fixed position
  });

  return (
    <primitive 
      ref={modelRef}
      object={scene} 
      scale={8} 
      position={[0, -1.25, 0]} 
      rotation={[-0.1, 0, 0]}
      dispose={null}
    />
  );
}

// Loading fallback
function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#2563eb" />
    </mesh>
  );
}

// Main Component
export default function TeacherJoeAvatar({ onToggleView }) {
  const [listening, setListening] = useState(false);
  const [userSpeech, setUserSpeech] = useState("");
  const [interimSpeech, setInterimSpeech] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [botResponse, setBotResponse] = useState("");
  const [recognition, setRecognition] = useState(null);
  const [conversation, setConversation] = useState([]);
  const [audioLevel, setAudioLevel] = useState(0);

  const speakWithAnimation = async (text) => {
    speechSynthesis.cancel();
    
    setIsSpeaking(true);
    setBotResponse(text);

    await new Promise(resolve => setTimeout(resolve, 100));

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    let animationInterval;
    
    utterance.onstart = () => {
      console.log('🎤 Teacher Joe started speaking');
      animationInterval = setInterval(() => {
        const intensity = 0.3 + Math.random() * 0.7;
        setAudioLevel(intensity);
      }, 100);
    };

    utterance.onend = () => {
      console.log('✅ Teacher Joe finished speaking');
      clearInterval(animationInterval);
      setIsSpeaking(false);
      setAudioLevel(0);
      setTimeout(() => setBotResponse(""), 2000);
    };

    utterance.onerror = (error) => {
      console.error('❌ Speech error:', error);
      clearInterval(animationInterval);
      setIsSpeaking(false);
      setAudioLevel(0);
    };

    speechSynthesis.speak(utterance);
  };

  const handleMicClick = () => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      alert("Speech recognition not supported. Use Chrome, Edge, or Safari.");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recog = new SpeechRecognition();
    recog.lang = "en-US";
    recog.interimResults = true;
    recog.continuous = false;

    recog.onresult = (event) => {
      let interim = "";
      let final = "";

      for (let i = 0; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          final += transcript;
        } else {
          interim += transcript;
        }
      }

      setInterimSpeech(interim);
      if (final) {
        console.log('🎤 You said:', final);
        setUserSpeech(final);
        setInterimSpeech("");
      }
    };

    recog.onend = () => {
      setListening(false);
    };

    recog.onerror = (err) => {
      console.error("❌ Speech error:", err);
      setListening(false);
      setInterimSpeech("");
    };

    recog.start();
    setListening(true);
    setRecognition(recog);
    setUserSpeech("");
    setInterimSpeech("");
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
    }
    setListening(false);
  };

  const stopSpeaking = () => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
    setAudioLevel(0);
  };

  useEffect(() => {
    if (userSpeech && userSpeech.trim() && !listening) {
      handleSendToGemini();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userSpeech, listening]);

  const handleSendToGemini = async () => {
    if (!userSpeech.trim()) return;

    setConversation(prev => [...prev, { sender: 'user', text: userSpeech }]);
    setIsProcessing(true);

    try {
      const res = await fetch("http://localhost:5000/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userSpeech }),
      });
      const data = await res.json();
      const reply = data.text || "Sorry, I couldn't process that.";
      
      setConversation(prev => [...prev, { sender: 'bot', text: reply }]);
      setIsProcessing(false);
      await speakWithAnimation(reply);
    } catch (err) {
      console.error("Error:", err);
      setIsProcessing(false);
      const errorMsg = "Sorry, I'm having trouble connecting.";
      setConversation(prev => [...prev, { sender: 'bot', text: errorMsg }]);
      await speakWithAnimation(errorMsg);
    }
  };

  useEffect(() => {
    return () => {
      speechSynthesis.cancel();
    };
  }, []);

  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className={`teacher-joe-container ${isDarkMode ? 'dark' : 'light'}`}>
      {/* Header */}
      <div className="joe-header">
        <button className="back-btn" onClick={() => onToggleView(false)}>
          ← Back to Chat
        </button>
        <h2>Teacher Joe - AI Assistant</h2>
        <button className="theme-toggle-btn" onClick={toggleTheme} title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </div>

      {/* Main Content */}
      <div className="joe-content">
        {/* Conversation Panel */}
        <div className="conversation-panel">
          <div className="conversation-messages">
            {conversation.map((msg, idx) => (
              <div key={idx} className={`msg ${msg.sender}`}>
                <div className="msg-label">
                  {msg.sender === 'user' ? 'You' : 'Teacher Joe'}
                </div>
                <div className="msg-text">{msg.text}</div>
              </div>
            ))}
            {interimSpeech && (
              <div className="msg user interim">
                <div className="msg-label">You (listening)</div>
                <div className="msg-text">{interimSpeech}...</div>
              </div>
            )}
            {isProcessing && (
              <div className="msg bot processing">
                <div className="thinking">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 3D Avatar Display */}
        <div className="avatar-display">
          <div className="canvas-container">
            <Canvas 
              shadows
              camera={{ position: [0, 0.8, 3], fov: 45 }}
            >
              
              {/* Lighting */}
              <ambientLight intensity={0.6} />
              <directionalLight 
                position={[5, 5, 5]} 
                intensity={1} 
                castShadow 
              />
              <directionalLight 
                position={[-5, 3, -5]} 
                intensity={0.4} 
              />
              <spotLight 
                position={[0, 10, 0]} 
                intensity={0.3} 
                angle={0.3} 
                penumbra={1} 
              />

              {/* 3D Model */}
              <Suspense fallback={<LoadingFallback />}>
                <TeacherJoeModel 
                  isSpeaking={isSpeaking} 
                  audioLevel={audioLevel} 
                />
              </Suspense>

              {/* Controls - Completely disabled, fixed position */}
              <OrbitControls 
                enablePan={false}
                enableZoom={false}
                enableRotate={false}
              />
            </Canvas>

            {/* Speaking Indicator */}
            {isSpeaking && (
              <div className="speaking-indicator">
                <div className="sound-waves">
                  <div className="wave" style={{ height: `${20 + audioLevel * 30}px` }}></div>
                  <div className="wave" style={{ height: `${15 + audioLevel * 35}px` }}></div>
                  <div className="wave" style={{ height: `${25 + audioLevel * 25}px` }}></div>
                </div>
                <span>Speaking...</span>
              </div>
            )}
          </div>

          {/* Status */}
          <div className="status-bar">
            {listening && <span className="badge listening">🎤 Listening</span>}
            {isProcessing && <span className="badge processing">⚙️ Processing</span>}
            {isSpeaking && <span className="badge speaking">🔊 Speaking</span>}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="joe-controls">
        <button
          className={`ctrl-btn mic ${listening ? 'active' : ''}`}
          onClick={listening ? stopListening : handleMicClick}
          disabled={isProcessing || isSpeaking}
        >
          {listening ? '⏹ Stop Listening' : '🎤 Start Speaking'}
        </button>

        {isSpeaking && (
          <button className="ctrl-btn stop" onClick={stopSpeaking}>
            ⏹ Stop Speaking
          </button>
        )}
      </div>
    </div>
  );
}
