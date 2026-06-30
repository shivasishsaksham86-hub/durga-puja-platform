"use client";
import { useRouter, usePathname } from "next/navigation";
import styles from "./NavigationButtons.module.css";

const routes = ["/", "/heritage", "/timeline", "/gallery", "/map", "/ai-assistant"];

export default function NavigationButtons() {
  const router = useRouter();
  const pathname = usePathname();

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
