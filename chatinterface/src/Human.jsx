import React, { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

// ---------- Avatar with Lip Sync ----------
function ManAvatarWithLipSync({ lipSyncRef }) {
  const { scene } = useGLTF("/models/casual_man.glb");
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current && meshRef.current.morphTargetInfluences) {
      meshRef.current.morphTargetInfluences[0] = lipSyncRef.current.intensity;
    }
  });

  // Move down slightly so head + shoulders visible
  return <primitive ref={meshRef} object={scene} scale={4} position={[0, -1.5, 0]} dispose={null} />;
}

// ---------- Main Human Component ----------
export default function Human({ onToggleView }) {
  const lipSyncRef = useRef({ intensity: 0 });
  const [listening, setListening] = useState(false);
  const [userSpeech, setUserSpeech] = useState("");
  const [showThinkingBtn, setShowThinkingBtn] = useState(false);
  const [thinkingMsg, setThinkingMsg] = useState("");
  const [recognition, setRecognition] = useState(null);

  // Lip sync speaking
  const speakWithLipSync = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";

    const interval = setInterval(() => {
      lipSyncRef.current.intensity = Math.random();
    }, 100);

    utterance.onend = () => {
      clearInterval(interval);
      lipSyncRef.current.intensity = 0;
    };

    speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    speechSynthesis.cancel();
    lipSyncRef.current.intensity = 0;
  };

  // Start recording user speech
  const handleMicClick = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech recognition not supported");
      return;
    }

    const recog = new window.webkitSpeechRecognition();
    recog.lang = "en-US";
    recog.interimResults = false;

    recog.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setUserSpeech(transcript);
      setListening(false);
      setShowThinkingBtn(true); // show the button after user finishes speaking
    };

    recog.onerror = (err) => {
      console.error("Speech recognition error:", err);
      setListening(false);
    };

    recog.start();
    setListening(true);
    setRecognition(recog);
  };

  const stopListening = () => {
    if (recognition) recognition.stop();
    setListening(false);
  };

  // Send user speech to Gemini after clicking "Thinking"
  const handleThinkingClick = async () => {
    if (!userSpeech) return;

    setThinkingMsg("Thinking...");
    setShowThinkingBtn(false);

    try {
      const res = await fetch("http://localhost:5000/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userSpeech }),
      });
      const data = await res.json();
      const reply = data.text || "Sorry, I couldn't process that.";
      setThinkingMsg("");
      speakWithLipSync(reply);
    } catch (err) {
      console.error("Error connecting to Gemini:", err);
      setThinkingMsg("Error connecting to Gemini.");
    }
  };

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <button
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          zIndex: 10,
          background: "black",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: 5,
          cursor: "pointer",
        }}
        onClick={() => onToggleView(false)}
      >
        Back
      </button>

      {/* Mic button */}
      <button
        onClick={handleMicClick}
        disabled={listening}
        style={{
          position: "absolute",
          left: 40,
          bottom: 120,
          width: 60,
          height: 60,
          borderRadius: "50%",
          background: listening ? "red" : "#21334a",
          color: "#fff",
          fontSize: "2rem",
          border: "none",
          cursor: "pointer",
          zIndex: 2,
        }}
      >
        🎤
      </button>

      {/* Thinking button appears only after user finishes speaking */}
      {showThinkingBtn && (
        <button
          onClick={handleThinkingClick}
          style={{
            position: "absolute",
            left: 120,
            bottom: 120,
            width: 120,
            height: 60,
            borderRadius: 10,
            background: "#4caf50",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            zIndex: 2,
          }}
        >
          Thinking 🤔
        </button>
      )}

      {/* Stop Speaking */}
      <button
        onClick={stopSpeaking}
        style={{
          position: "absolute",
          left: 260,
          bottom: 120,
          width: 100,
          height: 60,
          borderRadius: 10,
          background: "#ff9800",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          zIndex: 2,
        }}
      >
        Stop Audio ⏹️
      </button>

      {/* Thinking message */}
      {thinkingMsg && (
        <div
          style={{
            position: "absolute",
            left: 40,
            bottom: 200,
            background: "rgba(255,255,255,0.7)",
            padding: "10px 20px",
            borderRadius: 10,
            fontSize: "1.2rem",
            zIndex: 2,
          }}
        >
          {thinkingMsg}
        </div>
      )}

      <Canvas
        style={{ background: "linear-gradient(135deg, #43cea2 0%, #185a9d 100%)" }}
        camera={{ position: [0, 0, 2.5], fov: 50 }} // zoomed on head + shoulders
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 10, 5]} intensity={1} />
        <ManAvatarWithLipSync lipSyncRef={lipSyncRef} />
        <OrbitControls enablePan={false} enableZoom={false} enableRotate={false} />
      </Canvas>
    </div>
  );
}
