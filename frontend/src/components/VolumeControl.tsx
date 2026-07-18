"use client";
import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function VolumeControl() {
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element only on the client
    const audio = new Audio("/videos/final.mp4"); // Fallback to video audio if no dedicated track exists
    audio.loop = true;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const toggleMute = () => {
    if (!audioRef.current) return;
    
    if (isMuted) {
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
