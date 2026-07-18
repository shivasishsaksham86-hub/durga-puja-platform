"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Volume2, VolumeX } from "lucide-react";
import styles from "./NavigationButtons.module.css";

const routes = ["/", "/heritage", "/timeline", "/gallery", "/map", "/ai-assistant"];

export default function NavigationButtons() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio("/audio/9471-4f83-45ac-9e07-f6687f891063.mp3");
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
      if (audioRef.current.currentTime === 0) {
        audioRef.current.currentTime = 106;
      }
      audioRef.current.play().catch(e => console.error("Audio play failed:", e));
      audioRef.current.muted = false;
      setIsMuted(false);
    } else {
      audioRef.current.pause();
      setIsMuted(true);
    }
  };

  const currentIndex = routes.indexOf(pathname || "/");
  
  const handleBack = () => {
    if (currentIndex > 0) {
      router.push(routes[currentIndex - 1]);
    }
  };

  const handleForward = () => {
    if (currentIndex < routes.length - 1 && currentIndex !== -1) {
      router.push(routes[currentIndex + 1]);
    }
  };

  return (
    <div className={styles.navContainer}>
      <button 
        onClick={toggleMute} 
        className={styles.navBtn} 
        title={isMuted ? "Play Music" : "Mute Music"}
      >
        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>

      <button 
        onClick={handleBack} 
        className={`${styles.navBtn} ${currentIndex <= 0 ? styles.disabled : ''}`} 
        title="Previous Page"
        disabled={currentIndex <= 0}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      <button 
        onClick={handleForward} 
        className={`${styles.navBtn} ${currentIndex >= routes.length - 1 || currentIndex === -1 ? styles.disabled : ''}`} 
        title="Next Page"
        disabled={currentIndex >= routes.length - 1 || currentIndex === -1}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </div>
  );
}
