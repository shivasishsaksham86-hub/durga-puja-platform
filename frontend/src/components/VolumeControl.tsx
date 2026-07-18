"use client";
import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function VolumeControl() {
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element only on the client
    const audio = new Audio("/audio/9471-4f83-45ac-9e07-f6687f891063.mp3");
    audio.loop = true;
    audioRef.current = audio;

    // Optional: when the audio loops, do you want it to restart at 106s or 0s? 
    // Usually looping restarts at 0s, but we will start it at 106 initially.
    
    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const toggleMute = () => {
    if (!audioRef.current) return;
    
    if (isMuted) {
      // Set to 1m46s (106 seconds) if it's starting from 0
      if (audioRef.current.currentTime === 0) {
        audioRef.current.currentTime = 106;
      }
      // User interacting lets us play audio
      audioRef.current.play().catch(e => console.error("Audio play failed:", e));
      audioRef.current.muted = false;
      setIsMuted(false);
    } else {
      audioRef.current.pause();
      setIsMuted(true);
    }
  };

  return (
    <button
      onClick={toggleMute}
      style={{
        position: "fixed",
        bottom: "30px",
        left: "30px",
        zIndex: 1000,
        background: "rgba(26, 26, 26, 0.8)",
        backdropFilter: "blur(8px)",
        border: "1px solid rgba(253, 240, 213, 0.2)",
        borderRadius: "50%",
        width: "50px",
        height: "50px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fdf0d5",
        cursor: "pointer",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        transition: "all 0.3s ease",
      }}
      title={isMuted ? "Play Background Music" : "Mute Background Music"}
    >
      {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
    </button>
  );
}
