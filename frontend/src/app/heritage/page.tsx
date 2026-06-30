"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";

function AccordionSection({ title, children, defaultOpen = false }: { title: string, children: React.ReactNode, defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={styles.accordionWrapper}>
      <div className={styles.accordionHeader} onClick={() => setIsOpen(!isOpen)}>
        <h2>{title}</h2>
        <span className={`${styles.accordionIcon} ${isOpen ? styles.open : ''}`}>
          ▼
        </span>
      </div>
      <div className={`${styles.accordionContent} ${isOpen ? styles.open : ''}`}>
        {children}
      </div>
    </div>
  );
}

export default function HeritageHub() {
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
              <Link href="/heritage" className="navLink text-gradient">Heritage Hub</Link>
              <Link href="/timeline" className="navLink">Timeline</Link>
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
            <h1 className="animate-fade-up">Digital <span className="text-gradient">Heritage Hub</span></h1>
            <p className={`animate-fade-up delay-1 ${styles.subtitle}`}>
              Explore the history, mythology, rituals, and the iconic traditions of Kolkata's greatest festival.
            </p>
          </div>
        </section>

        <section className={`section-padding ${styles.contentSection}`}>
          <div className="container">

            {/* Kumartuli Section */}
            <AccordionSection title="Kumartuli: The Artisan's Canvas" defaultOpen={true}>
              <div className={`glass-panel ${styles.contentCard}`}>
                <div className={styles.textColumn}>
                  <p>Long before the festival begins, the narrow, winding alleys of Kumartuli—the traditional potters' quarter in North Kolkata—breathe life into clay. It is here that generations of artisans (Pal family lineages) craft the majestic idols of Goddess Durga.</p>
                  <p>The process starts with a wooden frame (Kathamo), bound with straw, and then meticulously layered with sacred clay (Punnya Mati) gathered from the banks of the Hooghly river and soil from a forbidden territory. This beautifully haunting unfinished idol captures the raw devotion and incredible artistry that serves as the soul of the festival.</p>
                </div>
                <div className={styles.imageColumn}>
                  <div className={styles.imageWrapper}>
                    <Image src="/images/kumartuli.jpg" alt="Unfinished Durga Idol in Kumartuli" fill className={styles.inlineImage} />
                  </div>
                </div>
              </div>
            </AccordionSection>
            
            {/* Mahishasur Mardini Section */}
            <AccordionSection title="Mahishasur Mardini: The Mythology">
              <div className={`glass-panel ${styles.contentCard} ${styles.reversed}`}>
                <div className={styles.textColumn}>
                  <p>Durga Puja celebrates the victory of Goddess Durga over the shape-shifting buffalo demon, Mahishasura. According to Hindu mythology, when the gods were unable to defeat Mahishasura, who was granted a boon that no man or god could kill him, they combined their divine energies to create Maa Durga.</p>
                  <p>Armed with weapons gifted by the gods and riding a fierce lion, she battled the demon for ten days, ultimately slaying him. This victory symbolizes the triumph of good over evil, the ultimate power of the divine feminine (Shakti).</p>
                </div>
                <div className={styles.imageColumn}>
                  <div className={styles.imageWrapper}>
                    <Image src="/images/mahishasur_mardini_1782587467101.png" alt="Mahishasur Mardini" fill className={styles.inlineImage} />
                  </div>
                </div>
              </div>
            </AccordionSection>

            {/* Birendra Krishna Bhadra Section */}
            <AccordionSection title="Mahalaya & Birendra Krishna Bhadra">
              <div className={`glass-panel ${styles.contentCard}`}>
                <div className={styles.textColumn}>
                  <p>For every Bengali, Durga Puja begins not on Shashthi, but at 4:00 AM on the dawn of Mahalaya. The airwaves crackle to life with the timeless radio broadcast of <em>Mahishasura Mardini</em>, anchored by the legendary Birendra Krishna Bhadra.</p>
                  <p>His sonorous, hypnotic chanting of Sanskrit shlokas and narration of the Goddess's descent to Earth has been a sacred tradition since 1931. It is a moment of profound nostalgia that unites millions of Bengalis worldwide, signaling that Maa Durga is on her way home.</p>
                </div>
                <div className={styles.imageColumn}>
                  <div className={styles.imageWrapper}>
                    <Image src="/images/mahalaya_radio_1782587503733.png" alt="Mahalaya Radio Broadcast" fill className={styles.inlineImage} />
                  </div>
                </div>
              </div>
            </AccordionSection>

            {/* Belur Math Section */}
            <AccordionSection title="Tradition at Belur Math">
              <div className={`glass-panel ${styles.contentCard} ${styles.reversed}`}>
                <div className={styles.textColumn}>
                  <p>Started by Swami Vivekananda in 1901, the Durga Puja at Belur Math (the headquarters of the Ramakrishna Math and Mission) is one of the most spiritually profound celebrations in Bengal.</p>
                  <p>Unlike commercial pandals, the Puja here is characterized by strict adherence to scriptures, serene devotion, and the iconic <strong>Kumari Puja</strong> on Ashtami, where a young prepubescent girl is worshipped as the living embodiment of the Goddess, demonstrating the divine in the pure and innocent.</p>
                </div>
                <div className={styles.imageColumn}>
                  <div className={styles.imageWrapper}>
                    <Image src="/images/belur_math_new.jpg" alt="Belur Math Puja" fill className={styles.inlineImage} />
                  </div>
                </div>
              </div>
            </AccordionSection>

            {/* Boron & Sindoor Khela Section */}
            <AccordionSection title="Boron and Sindoor Khela on Vijaya Dashami">
              <div className={`glass-panel ${styles.contentCard}`} style={{ flexDirection: 'column' }}>
                <div className={styles.imageColumn} style={{ width: '100%', marginBottom: '30px' }}>
                  <div className={styles.imageWrapper} style={{ height: '400px' }}>
                    <Image src="/images/sindoor_khela_1782587491839.png" alt="Sindoor Khela" fill className={styles.inlineImage} style={{ objectFit: 'cover', objectPosition: 'center 20%' }} />
                  </div>
                </div>
                <div className={styles.textColumn} style={{ width: '100%', paddingRight: '0' }}>
                  <p>On <strong>Vijaya Dashami</strong>, the final day of <strong>Durga Puja</strong>, the celebrations conclude with an emotional farewell to Goddess Durga before her idol is taken for <strong>Visarjan (immersion)</strong>. According to Bengali tradition, the Goddess is regarded not merely as a deity but as a beloved daughter who returns to her maternal home on Earth for four days during Durga Puja and then departs for her divine abode, <strong>Mount Kailash</strong>, where Lord Shiva resides. Her departure symbolizes the end of her annual visit and is marked with rituals filled with devotion, affection, and hope for her return the following year.</p>

                  <h3 style={{ marginTop: '20px', marginBottom: '10px', color: 'var(--accent-gold)' }}>Boron (Baran)</h3>
                  <p>The farewell ceremony, known as <strong>Boron</strong> (also spelled <em>Baran</em>), is traditionally performed by married Hindu women (<em>sadhabas</em>) before the immersion procession begins. In this ritual, the Goddess is lovingly honored as a daughter preparing to leave her parents' home after a joyful visit.</p>
                  <p>The women welcome and bid farewell to the Goddess by offering <strong>sweets</strong>, <strong>betel leaves (paan)</strong>, <strong>betel nuts (supari)</strong>, <strong>rice</strong>, <strong>durba grass</strong>, and <strong>lighted lamps (deepa)</strong>. They gently touch and wipe the face of the Goddess with the edge of their sarees, symbolizing maternal affection and expressing prayers for her safe journey back to Kailash. Offerings of sweets signify wishes for happiness and prosperity, while betel leaves and nuts represent respect, hospitality, and auspiciousness. During the ceremony, devotees chant prayers seeking the Goddess's blessings for peace, prosperity, good health, family harmony, and protection from misfortune.</p>
                  <p>The atmosphere during Boron is deeply emotional. Many devotees shed tears, viewing the departure of the Goddess as the farewell of a cherished daughter. As chants of <strong>"Asche Bochor Abar Hobe"</strong> ("She will return next year") fill the air, the ritual transforms grief into hope and anticipation for her next annual visit.</p>

                  <h3 style={{ marginTop: '20px', marginBottom: '10px', color: 'var(--accent-gold)' }}>Sindoor Khela</h3>
                  <p>Immediately after Boron comes <strong>Sindoor Khela</strong>, one of the most iconic and visually striking traditions of Bengali Durga Puja. Traditionally, married women first apply <strong>vermilion (sindoor)</strong> to the forehead and feet of Goddess Durga, especially to her forehead and the parting of her hair, praying for the long life, health, and well-being of their husbands and families.</p>
                  <p>After offering sindoor to the Goddess, the women joyfully apply vermilion to one another's foreheads, cheeks, and faces while exchanging warm embraces and blessings. This colorful celebration symbolizes <strong>marital bliss, fertility, prosperity, sisterhood, and the enduring strength of womanhood</strong>. Women wish one another happiness, good fortune, and protection from adversity, reinforcing bonds of affection and community.</p>
                  <p>Although Sindoor Khela has traditionally been observed by married women, many contemporary celebrations have become more inclusive, welcoming women from diverse backgrounds as a symbol of unity, friendship, and shared devotion.</p>

                  <h3 style={{ marginTop: '20px', marginBottom: '10px', color: 'var(--accent-gold)' }}>Spiritual and Cultural Significance</h3>
                  <p>Together, <strong>Boron</strong> and <strong>Sindoor Khela</strong> represent much more than ritual practices. They reflect the profound emotional bond between devotees and the Divine Mother, expressing gratitude for her blessings during her earthly stay and faith in her promise to return. The rituals celebrate the nurturing qualities of motherhood, the dignity and strength of women, and the enduring values of family, compassion, and community.</p>
                  <p>As the immersion procession begins, devotees chant <strong>"Bolo Durga Mai Ki Jai!"</strong> and <strong>"Asche Bochor Abar Hobe!"</strong>, carrying the idol to the river amidst the sounds of <strong>dhak</strong> drums, conch shells, and devotional songs. The immersion signifies the Goddess's return to her celestial home while reminding devotees that, although her physical form departs, her divine presence and blessings remain in their hearts throughout the year.</p>
                </div>
              </div>
            </AccordionSection>

            {/* Durga Saptashati Section */}
            <AccordionSection title="Durga Saptashati">
              <div className={`glass-panel ${styles.contentCard}`}>
                <div className={styles.textColumn} style={{ flex: '1 1 100%' }}>
                  <p>The <strong>Durga Saptashati</strong>, also known as the <strong>Devi Mahatmya</strong>, <strong>Chandi Path</strong>, or <strong>Sri Sri Chandi</strong>, is one of the most sacred scriptures of the Shakta tradition in Hinduism. Comprising <strong>700 Sanskrit verses (shlokas)</strong> arranged in <strong>13 chapters</strong>, it forms chapters 81–93 of the <strong>Markandeya Purana</strong> and is traditionally attributed to the sage <strong>Markandeya</strong>. The text is believed to have been composed between the 5th and 7th centuries CE.</p>
                  <p>The scripture glorifies <strong>Goddess Durga</strong> as the Supreme Divine Mother (<em>Adi Shakti</em>), the eternal source of creation, preservation, and dissolution of the universe. It emphasizes that the Divine Feminine is the ultimate cosmic power behind all existence and portrays the Goddess as the protector of righteousness (<em>dharma</em>) and the destroyer of evil.</p>
                  
                  <h3 style={{ marginTop: '20px', marginBottom: '10px', color: 'var(--accent-gold)' }}>The Three Major Sections (Charitas)</h3>
                  <ul style={{ paddingLeft: '20px', marginBottom: '20px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                    <li style={{ marginBottom: '8px' }}><strong>Prathama Charita (Chapter 1):</strong> Describes Goddess Mahakali slaying the demons Madhu and Kaitabha.</li>
                    <li style={{ marginBottom: '8px' }}><strong>Madhyama Charita (Chapters 2–4):</strong> Narrates Goddess Mahalakshmi's battle against the buffalo demon Mahishasura, symbolizing the victory of divine power over arrogance and ignorance.</li>
                    <li style={{ marginBottom: '8px' }}><strong>Uttama Charita (Chapters 5–13):</strong> Details Goddess Mahasaraswati's defeat of Shumbha, Nishumbha, Raktabija, Chanda, Munda, and other demons, representing the triumph of wisdom, courage, and righteousness over negativity and ego.</li>
                  </ul>

                  <p>Beyond its mythological narratives, the Durga Saptashati conveys profound spiritual and philosophical teachings. The demons symbolize inner weaknesses such as ego, greed, anger, attachment, fear, and ignorance, while the Goddess represents the divine energy within every individual that overcomes these obstacles. The text teaches that unwavering devotion, self-discipline, and faith in the Divine Mother lead to inner strength, protection, prosperity, and ultimately liberation (<em>moksha</em>).</p>
                  
                  <p>The scripture is most commonly recited during <strong>Sharadiya Navratri</strong> and <strong>Chaitra Navratri</strong>, although many devotees perform daily or weekly recitations. Traditional recitation is accompanied by auxiliary hymns such as the <strong>Devi Kavacham</strong>, <strong>Argala Stotram</strong>, <strong>Keelaka Stotram</strong>, and the <strong>Navarna Mantra</strong>, which are believed to enhance the spiritual benefits of the practice.</p>

                  <p>The Durga Saptashati occupies a central place in Hindu worship and philosophy, inspiring millions of devotees across India and beyond. It is regarded not only as a sacred text of devotion but also as a profound guide to spiritual transformation, teaching that the Divine Mother's grace enables individuals to overcome adversity, uphold righteousness, and attain both worldly well-being and spiritual enlightenment.</p>
                </div>
              </div>
            </AccordionSection>

            {/* UNESCO Section */}
            <AccordionSection title="UNESCO Intangible Cultural Heritage">
              <div className={`glass-panel ${styles.contentCard}`}>
                <div className={styles.textColumn}>
                  <p>In 2021, UNESCO inscribed "Durga Puja in Kolkata" on the Representative List of the Intangible Cultural Heritage of Humanity. It is a recognition of the festival's unique blend of creativity, inclusivity, and unparalleled social participation. The streets transform into a mesmerizing open-air art gallery.</p>
                </div>
              </div>
            </AccordionSection>

          </div>
        </section>
      </div>
    </div>
  );
}
