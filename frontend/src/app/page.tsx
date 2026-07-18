"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { useState, useRef } from "react";

export default function Home() {
  return (
    <div className={styles.page}>
      {/* Navigation */}
      <nav className={styles.navbar}>
        <div className="container">
          <div className={styles.navContent}>
            <div className={styles.logo}>
              <span className="text-gradient">আগমনী</span> AGOMONI
            </div>
            <div className={styles.navLinks}>
              <Link href="/heritage" className={styles.navLink}>Heritage Hub</Link>
              <Link href="/timeline" className={styles.navLink}>Timeline</Link>
              <Link href="/gallery" className={styles.navLink}>Gallery</Link>
              <Link href="/map" className={styles.navLink}>Smart Map</Link>
              <Link href="/login" className={styles.navLink}>Dashboard</Link>
              <Link href="/ai-assistant" className="btn-primary">Ask AI Assistant</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
           <video 
             autoPlay 
             loop 
             muted 
             playsInline 
             className={styles.heroVideo}
           >
             <source src="/videos/final.mp4" type="video/mp4" />
           </video>
           <div className={styles.heroOverlay}></div>
        </div>
        <div className={`container ${styles.heroContent}`}>
          <div className={`glass-panel ${styles.heroCard} animate-fade-up`}>
            <div className={styles.unescoBadge}>UNESCO Intangible Cultural Heritage</div>
            <h1 className={styles.heroTitle}>আগমনী <span className="text-gradient">AGOMONI</span></h1>
            <p className={styles.heroSubtitle}>
              Experience the Living Legacy of Kolkata's Durga Puja
            </p>
            <div className={styles.heroActions}>
              <Link href="/map" className="btn-primary">
                Explore Pandals
              </Link>
              <Link href="/heritage" className="btn-secondary">
                Discover Heritage
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section className={`section-padding ${styles.featuresSection}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className="animate-fade-up delay-1">A Celebration of Art & Culture</h2>
            <p className="animate-fade-up delay-2">From century-old traditions to immersive modern artistry.</p>
          </div>
          
          <div className={styles.featureGrid}>
            <div className={`glass-panel ${styles.featureCard} animate-fade-up delay-1`}>
              <div className={styles.featureImageContainer}>
                 <Image src="/images/dhunuchi_dance_1782586424433.png" alt="Dhunuchi Dance" fill className={styles.featureImage} />
              </div>
              <div className={styles.featureCardContent}>
                <h3>Cultural Pulse</h3>
                <p>Witness the mesmerizing Dhunuchi dance, rhythmic beats of the Dhaak, and traditional rituals.</p>
              </div>
            </div>
            
            <div className={`glass-panel ${styles.featureCard} animate-fade-up delay-2`}>
              <div className={styles.featureCardContent}>
                <h3>AI Travel Assistant</h3>
                <p>Get personalized pandal-hopping itineraries based on real-time crowds, your location, and preferences.</p>
                <Link href="/ai-assistant" className={styles.textLink}>Try it now →</Link>
              </div>
            </div>

            <div className={`glass-panel ${styles.featureCard} animate-fade-up delay-3`}>
              <div className={styles.featureCardContent}>
                <h3>Bonedi Bari Heritage</h3>
                <p>Step back in time and visit the majestic ancestral homes that have celebrated Puja for centuries.</p>
                <Link href="/heritage" className={styles.textLink}>Read More →</Link>
              </div>
            </div>

            <div className={`glass-panel ${styles.featureCard} animate-fade-up delay-1`}>
              <div className={styles.featureCardContent}>
                <h3>Puja Management Dashboard</h3>
                <p>Comprehensive tools for admins and volunteers to manage crowd flow, donations, and events in real-time.</p>
                <Link href="/login" className={styles.textLink}>Access Dashboard →</Link>
              </div>
            </div>

            <div className={`glass-panel ${styles.featureCard} animate-fade-up delay-2`}>
              <div className={styles.featureCardContent}>
                <h3>Digital Ticketing</h3>
                <p>Skip the lines with our instant QR code-based VIP entry passes for exclusive pandal access.</p>
                <Link href="/passes" className={styles.textLink}>Get VIP Pass →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer Placeholder */}
      <footer className={styles.footer}>
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Durga Puja Kolkata Heritage Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
