"use client";
import { useState, useMemo, useRef } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('./MapComponent'), { 
  ssr: false,
  loading: () => <div className={styles.mapLoading}>Loading Interactive Map...</div>
});

export default function SmartMap() {
  const [activePandal, setActivePandal] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  const allPandals = [
    { name: "Sreebhumi Sporting Club", area: "Lake Town", crowd: "High", theme: "Vatican City Replica", lat: 22.6033, lng: 88.4063 },
    { name: "Suruchi Sangha", area: "New Alipore", crowd: "Medium", theme: "Eco-friendly Bengal", lat: 22.5126, lng: 88.3312 },
    { name: "College Square", area: "Central Kolkata", crowd: "High", theme: "Traditional Lighting", lat: 22.5760, lng: 88.3637 },
    { name: "Deshapriya Park", area: "South Kolkata", crowd: "Very High", theme: "Grand Architecture", lat: 22.5192, lng: 88.3533 },
    { name: "Bosepukur Sitala Mandir", area: "Kasba", crowd: "Medium", theme: "Tribal Art", lat: 22.5144, lng: 88.3888 },
    { name: "Bagbazar Sarbojanin", area: "North Kolkata", crowd: "High", theme: "Traditional Ekchala", lat: 22.6021, lng: 88.3685 },
    { name: "Kumartuli Park", area: "North Kolkata", crowd: "Medium", theme: "Modern Abstract", lat: 22.5997, lng: 88.3632 },
    // Bari Pujos added
    { name: "Sovabazar Rajbari", area: "North Kolkata", crowd: "High", theme: "Bonedi Bari Traditional", lat: 22.6015, lng: 88.3638 },
    { name: "Sabarna Roy Choudhury", area: "Barisha", crowd: "Medium", theme: "Oldest Family Puja", lat: 22.4827, lng: 88.3155 },
    { name: "Laha Bari", area: "Central Kolkata", crowd: "Medium", theme: "Bonedi Bari Heritage", lat: 22.5802, lng: 88.3635 }
  ];

  const filteredPandals = useMemo(() => {
    return allPandals.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.theme.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className={styles.page}>
      <nav className="navbar">
        <div className="container">
          <div className="navContent">
            <Link href="/" className="logo">
              <span className="text-gradient">আগমনী</span> AGOMONI
            </Link>
            <div className="navLinks">
              <Link href="/heritage" className="navLink">Heritage Hub</Link>
              <Link href="/timeline" className="navLink">Timeline</Link>
              <Link href="/gallery" className="navLink">Gallery</Link>
              <Link href="/map" className="navLink text-gradient">Smart Map</Link>
              <Link href="/login" className="navLink">Dashboard</Link>
              <Link href="/ai-assistant" className="btn-primary">Ask AI Assistant</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className={styles.mapContainer}>
        {/* Sidebar */}
        <div className={`glass-panel ${styles.sidebar}`}>
          <div className={styles.sidebarHeader}>
            <h2>Pandal Radar</h2>
            <p>Interactive real-time navigation</p>
          </div>
          
          <div className={styles.searchBar}>
            <input 
              type="text" 
              placeholder="Search pandals, areas, or themes..." 
              className={styles.searchInput} 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className={styles.pandalListContainer}>
            <div className={styles.pandalList} ref={listRef}>
              {filteredPandals.length === 0 ? (
                <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginTop: '20px' }}>No pandals found.</p>
              ) : (
                filteredPandals.map((pandal, idx) => (
                  <div 
                    key={idx} 
                    className={`${styles.pandalCard} ${activePandal?.name === pandal.name ? styles.activeCard : ''}`}
                    onClick={() => setActivePandal(pandal)}
                  >
                    <div className={styles.pandalInfo}>
                      <h3>{pandal.name}</h3>
                      <span className={styles.areaBadge}>{pandal.area}</span>
                      <p className={styles.themeInfo}>Theme: {pandal.theme}</p>
                    </div>
                    <div className={styles.crowdIndicator}>
                      <div className={`${styles.crowdDot} ${pandal.crowd === 'Very High' ? styles.red : pandal.crowd === 'High' ? styles.orange : styles.green}`}></div>
                      <span className={styles.crowdText}>{pandal.crowd}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            {/* Scroll Up Button */}
            <button 
              className={styles.scrollUpBtn} 
              onClick={() => listRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
              title="Scroll to top"
            >
              ↑
            </button>
          </div>
          
          <div className={styles.sidebarFooter}>
            <Link href="/ai-assistant" className="btn-primary" style={{ width: '100%' }}>
              Auto-Plan Route with AI
            </Link>
          </div>
        </div>

        {/* Interactive Map Area */}
        <div className={styles.mapArea}>
          <MapComponent pandals={filteredPandals} activePandal={activePandal} />
        </div>
      </div>
    </div>
  );
}
