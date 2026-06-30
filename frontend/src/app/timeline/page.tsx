"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";

function AccordionSection({ title, label, children, defaultOpen = false }: { title: string, label: string, children: React.ReactNode, defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={styles.accordionWrapper}>
      <div className={styles.accordionHeader} onClick={() => setIsOpen(!isOpen)}>
        <div>
          <span className={styles.dayLabel} style={{ display: 'block', fontSize: '0.9rem', marginBottom: '5px' }}>{label}</span>
          <h2 style={{ fontSize: '1.2rem' }}>{title}</h2>
        </div>
        <span className={`${styles.accordionIcon} ${isOpen ? styles.open : ''}`}>
          ▼
        </span>
      </div>
      <div className={`${styles.accordionContent} ${isOpen ? styles.open : ''}`}>
        <div className={`glass-panel`} style={{ marginTop: '0', borderTopLeftRadius: '0', borderTopRightRadius: '0', borderTop: 'none' }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default function Timeline() {
  const days = [
    {
      day: "Mahalaya",
      title: "The Awakening",
      description: "Marks the beginning of Devi Paksha. Artisans paint the eyes of the Goddess (Chokkhu Daan), bringing the idol to life. Homes echo with the chants of Mahishasura Mardini broadcast on the radio at dawn, a tradition started by Birendra Krishna Bhadra.",
      hasImage: true,
      imageSrc: "/images/mahalaya_radio_1782587503733.png",
      imageAlt: "Mahalaya Radio"
    },
    {
      day: "Maha Shashthi",
      title: "The Arrival & Bodhon",
      description: "The Goddess is formally welcomed with 'Bodhon' (awakening). The face of the idol is unveiled to the public, and the festivities officially kick off. The city transforms into a carnival of lights, sound, and massive crowds beginning their pandal-hopping.",
      hasImage: true,
      imageSrc: "/images/shashthi_bodhon_1782587866740.png",
      imageAlt: "Bodhon Ritual"
    },
    {
      day: "Maha Saptami",
      title: "The Holy Bath",
      description: "The morning starts with Nabapatrika Snan (bathing of the nine plants). A banana plant is bathed in the river Hooghly, dressed in a white saree with a red border, and placed next to Lord Ganesha, representing the Goddess's forms.",
      hasImage: true,
      imageSrc: "/images/saptami_nabapatrika_1782587877304.png",
      imageAlt: "Nabapatrika Snan"
    },
    {
      day: "Maha Ashtami",
      title: "The Zenith & Sandhi Puja",
      description: "The most auspicious day. Devotees fast and offer Anjali (floral tributes) in the morning. The dramatic Sandhi Puja takes place at the exact juncture of Ashtami and Navami. It involves the lighting of 108 lamps, intense Dhaak drumming, and the mesmerizing Dhunuchi Naach (a traditional dance with clay censers filled with burning coconut husks and camphor).",
      hasImage: true,
      imageSrc: "/images/dhunuchi_dance_1782586424433.png",
      imageAlt: "Dhunuchi Dance"
    },
    {
      day: "Maha Navami",
      title: "The Final Celebration",
      description: "The last day of the grand puja before farewell. Massive amounts of Bhog (sacred food offering) are distributed. The atmosphere is intense, joyous, and slightly melancholic as devotees realize the festival is almost over. The rhythmic beats of the Dhaak echo everywhere.",
      hasImage: true,
      imageSrc: "/images/navami_dhaaki_1782587889075.png",
      imageAlt: "Dhaaki Drumming"
    },
    {
      day: "Vijaya Dashami",
      title: "The Farewell (Bisarjan)",
      description: "Married women partake in Boron (feeding the Goddess sweets) and Sindoor Khela (smearing vermilion). The idols are then taken in grand processions for immersion (Bisarjan) in the river, bidding a tearful adieu to the Mother Goddess with chants of 'Asche Bochor Abar Hobe' (She will return next year).",
      hasImage: true,
      imageSrc: "/images/visarjan_new.jpg",
      imageAlt: "Goddess Immersion (Bisarjan)"
    }
  ];

  return (
    <div className={styles.page}>
      {/* Background Image */}
      <div className={styles.background}>
        <Image 
          src="/images/durga_face_closeup_1782586952764.png" 
          alt="Durga Idol Background" 
          fill
          className={styles.backgroundImage}
          priority
        />
        <div className={styles.backgroundOverlay}></div>
      </div>

      <nav className="navbar">
        <div className="container">
          <div className="navContent">
            <Link href="/" className="logo">
              <span className="text-gradient">আগমনী</span> AGOMONI
            </Link>
            <div className="navLinks">
              <Link href="/heritage" className="navLink">Heritage Hub</Link>
              <Link href="/timeline" className="navLink text-gradient">Timeline</Link>
              <Link href="/gallery" className="navLink">Gallery</Link>
              <Link href="/map" className="navLink">Smart Map</Link>
              <Link href="/ai-assistant" className="btn-primary">Ask AI Assistant</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className={styles.contentWrapper}>
        <section className={styles.hero}>
          <div className="container">
            <h1 className="animate-fade-up">Festival <span className="text-gradient">Timeline</span></h1>
            <p className={`animate-fade-up delay-1 ${styles.subtitle}`}>
              Journey through the auspicious days of Durga Puja, exploring the daily rituals and cultural significance.
            </p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container">
            <div className={styles.timelineContainer}>
              {days.map((item, index) => (
                <div 
                  key={index} 
                  className={`${styles.timelineItem} animate-fade-up`} 
                  style={{ animationDelay: `${0.2 * (index + 1)}s` }}
                >
                  <div className={styles.timelineDot}></div>
                  <div className={styles.timelineContent} style={{ background: 'none', border: 'none', padding: '0', boxShadow: 'none' }}>
                    <AccordionSection title={item.title} label={item.day} defaultOpen={index === 0}>
                      <p>{item.description}</p>
                      {item.hasImage && (
                        <div className={styles.timelineImageWrapper}>
                          <Image src={item.imageSrc!} alt={item.imageAlt!} fill className={styles.timelineImage} />
                        </div>
                      )}
                    </AccordionSection>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
