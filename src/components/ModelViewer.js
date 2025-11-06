import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function AvatarWithLipSync({ lipSyncData, audioRef }) {
  // Fix the path to the GLB model
  const { scene } = useGLTF("/models/casual_man.glb");
  const meshRef = useRef();

  useFrame(() => {
    if (!audioRef.current || !meshRef.current) return;
    const currentTime = audioRef.current.currentTime;

    if (meshRef.current.morphTargetInfluences) {
      for (let i = 0; i < meshRef.current.morphTargetInfluences.length; i++) {
        meshRef.current.morphTargetInfluences[i] = 0;
      }
    }

    const currentCue = lipSyncData.find(
      (cue) => currentTime >= cue.start && currentTime < cue.end
    );

    if (currentCue && meshRef.current.morphTargetDictionary) {
      const index = meshRef.current.morphTargetDictionary[currentCue.morphTargetName];
      if (index !== undefined) {
        meshRef.current.morphTargetInfluences[index] = 1;
      }
    }
  });

  return (
    <primitive
      ref={meshRef}
      object={scene}
      position={[1.1, -6.7, 0]}
      rotation={[0, 0, 0]}
      scale={4}
      dispose={null}
    />
  );
}

function SpeechTextBox({ text }) {
  return (
    <div
      style={{
        position: "absolute",
        left: 40,
        top: "22%",
        width: "28vw",
        height: "fit-content",
        background: "rgba(255,255,255,0.18)",
        color: "#21334a",
        borderRadius: "18px",
        boxShadow: "0 2px 14px rgba(0,0,0,0.04)",
        fontSize: "1.6rem",
        padding: "2rem",
        zIndex: 2,
        pointerEvents: "none"
      }}
    >
      {text}
    </div>
  );
}

export default function ModelViewer({ speechText, setSpeechText, audioRef, lipSyncData }) {
  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <SpeechTextBox text={speechText} />
      <audio ref={audioRef} src="/path-to-your-tts-audio.mp3" style={{ display: "none" }} autoPlay />
      <Canvas
        style={{ background: "linear-gradient(135deg, #43cea2 0%, #185a9d 100%)" }}
        camera={{ position: [0.75, 1.1, 2.75], fov: 38 }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 10, 5]} intensity={1} />
        <AvatarWithLipSync lipSyncData={lipSyncData} audioRef={audioRef} />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate={false}
          minPolarAngle={Math.PI / 2.3}
          maxPolarAngle={Math.PI / 2.5}
        />
      </Canvas>
    </div>
  );
}