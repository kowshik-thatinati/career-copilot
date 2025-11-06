import React, { useState, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import "./HumanAvatar.css";

// Avatar component with improved lip-sync
function ManAvatarWithLipSync({ lipSyncRef, isSpeaking }) {
  const { scene } = useGLTF("/models/casual_man.glb");
  const meshRef = useRef();
  const smoothedIntensity = useRef(0);

  useFrame(() => {
    // Smooth interpolation for natural lip movement
    const targetIntensity = lipSyncRef.current.intensity;
    smoothedIntensity.current += (targetIntensity - smoothedIntensity.current) * 0.3;

    if (meshRef.current && meshRef.current.morphTargetInfluences) {
      meshRef.current.morphTargetInfluences[0] = smoothedIntensity.current;
    }
  });

  return <primitive ref={meshRef} object={scene} scale={3.75} position={[0.25, -6.5, 0.5]} dispose={null} />;
}

// ---------- Main Human Component ----------
export default function Human({ onToggleView }) {
  const lipSyncRef = useRef({ intensity: 0 });
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animationFrameRef = useRef(null);
  
  const [listening, setListening] = useState(false);
  const [userSpeech, setUserSpeech] = useState("");
  const [interimSpeech, setInterimSpeech] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [botResponse, setBotResponse] = useState("");
  const [recognition, setRecognition] = useState(null);
  const [audioLevel, setAudioLevel] = useState(0);

  // Initialize Web Audio API for accurate lip-sync
  const initAudioContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
    }
  };

  // Analyze audio and update lip-sync in real-time
  const analyzeAudio = () => {
    if (!analyserRef.current) return;

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    
    const analyze = () => {
      analyserRef.current.getByteFrequencyData(dataArray);
      
      // Calculate average volume in speech frequency range (85-255 Hz)
      const speechRange = dataArray.slice(3, 10);
      const average = speechRange.reduce((a, b) => a + b, 0) / speechRange.length;
      const normalized = Math.min(average / 128, 1);
      
      // Update lip-sync intensity with natural variation
      lipSyncRef.current.intensity = normalized * (0.7 + Math.random() * 0.3);
      setAudioLevel(normalized);
      
      if (isSpeaking) {
        animationFrameRef.current = requestAnimationFrame(analyze);
      }
    };
    
    analyze();
  };

  // Enhanced speech synthesis with improved lip-sync
  const speakWithLipSync = async (text) => {
    setIsSpeaking(true);
    setBotResponse(text);

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    // Simple but effective lip-sync animation
    let lipSyncInterval;
    
    utterance.onstart = () => {
      // Animate lips while speaking
      lipSyncInterval = setInterval(() => {
        // Vary intensity based on word boundaries for more natural movement
        const baseIntensity = 0.4 + Math.random() * 0.4;
        lipSyncRef.current.intensity = baseIntensity;
        setAudioLevel(baseIntensity);
      }, 80); // Faster updates for smoother animation
    };

    utterance.onboundary = (event) => {
      // Extra movement on word boundaries
      if (event.name === 'word') {
        lipSyncRef.current.intensity = 0.7 + Math.random() * 0.3;
      }
    };

    utterance.onend = () => {
      clearInterval(lipSyncInterval);
      setIsSpeaking(false);
      lipSyncRef.current.intensity = 0;
      setAudioLevel(0);
      setTimeout(() => setBotResponse(""), 2000);
    };

    utterance.onerror = () => {
      clearInterval(lipSyncInterval);
      setIsSpeaking(false);
      lipSyncRef.current.intensity = 0;
      setAudioLevel(0);
    };

    speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
    lipSyncRef.current.intensity = 0;
    setBotResponse("");
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };

  // Enhanced speech recognition with interim results
  const handleMicClick = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech recognition is not supported in your browser. Please use Chrome or Edge.");
      return;
    }

    const recog = new window.webkitSpeechRecognition();
    recog.lang = "en-US";
    recog.interimResults = true;
    recog.continuous = false;
    recog.maxAlternatives = 1;

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
        setUserSpeech(final);
        setInterimSpeech("");
      }
    };

    recog.onend = () => {
      setListening(false);
      if (userSpeech) {
        handleSendToGemini();
      }
    };

    recog.onerror = (err) => {
      console.error("Speech recognition error:", err);
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
    setInterimSpeech("");
  };

  // Auto-send to Gemini when speech is finalized
  const handleSendToGemini = async () => {
    if (!userSpeech.trim()) return;

    setIsProcessing(true);

    try {
      const res = await fetch("http://localhost:5000/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userSpeech }),
      });
      const data = await res.json();
      const reply = data.text || "Sorry, I couldn't process that.";
      setIsProcessing(false);
      await speakWithLipSync(reply);
    } catch (err) {
      console.error("Error connecting to Gemini:", err);
      setIsProcessing(false);
      await speakWithLipSync("Sorry, I'm having trouble connecting right now.");
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      speechSynthesis.cancel();
    };
  }, []);

  return (
    <div className="human-avatar-container">
      {/* Header with Back Button */}
      <div className="avatar-header">
        <button className="back-button" onClick={() => onToggleView(false)}>
          <span className="back-icon">←</span>
          <span>Back to Chat</span>
        </button>
        <h2 className="avatar-title">Voice Assistant</h2>
      </div>

      {/* Transcript Display */}
      <div className="transcript-panel">
        {userSpeech && (
          <div className="transcript-bubble user-transcript">
            <div className="transcript-label">You said:</div>
            <div className="transcript-text">{userSpeech}</div>
          </div>
        )}
        {interimSpeech && (
          <div className="transcript-bubble interim-transcript">
            <div className="transcript-text">{interimSpeech}...</div>
          </div>
        )}
        {isProcessing && (
          <div className="transcript-bubble processing-transcript">
            <div className="thinking-animation">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
            <div className="transcript-text">Thinking...</div>
          </div>
        )}
        {botResponse && (
          <div className="transcript-bubble bot-transcript">
            <div className="transcript-label">Assistant:</div>
            <div className="transcript-text">{botResponse}</div>
          </div>
        )}
      </div>

      {/* Control Panel */}
      <div className="control-panel">
        {/* Microphone Button */}
        <button
          className={`control-button mic-button ${listening ? 'listening' : ''}`}
          onClick={listening ? stopListening : handleMicClick}
          disabled={isProcessing || isSpeaking}
          title={listening ? "Stop Listening" : "Start Speaking"}
        >
          <span className="button-icon">{listening ? '⏹' : '🎤'}</span>
          <span className="button-label">
            {listening ? 'Listening...' : 'Speak'}
          </span>
          {listening && (
            <div className="pulse-ring"></div>
          )}
        </button>

        {/* Stop Speaking Button */}
        {isSpeaking && (
          <button
            className="control-button stop-button"
            onClick={stopSpeaking}
            title="Stop Speaking"
          >
            <span className="button-icon">⏹</span>
            <span className="button-label">Stop</span>
          </button>
        )}

        {/* Audio Level Indicator */}
        {isSpeaking && (
          <div className="audio-visualizer">
            <div className="audio-bar" style={{ height: `${audioLevel * 100}%` }}></div>
          </div>
        )}
      </div>

      {/* Status Indicator */}
      <div className="status-indicator">
        {listening && <span className="status-badge listening-badge">🎤 Listening</span>}
        {isProcessing && <span className="status-badge processing-badge">⚙️ Processing</span>}
        {isSpeaking && <span className="status-badge speaking-badge">🔊 Speaking</span>}
      </div>

      {/* 3D Canvas */}
      <Canvas
        className="avatar-canvas"
        camera={{ position: [0, 0, 2.6], fov: 55 }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 10, 5]} intensity={1.2} />
        <directionalLight position={[-5, 5, -5]} intensity={0.5} />
        <spotLight position={[0, 10, 0]} intensity={0.3} angle={0.3} penumbra={1} />
        <ManAvatarWithLipSync lipSyncRef={lipSyncRef} isSpeaking={isSpeaking} />
        <OrbitControls 
          enablePan={false} 
          enableZoom={false} 
          enableRotate={true}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
}