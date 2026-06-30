import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";

export default function Gallery() {
  const images = [
    { src: "/images/gallery/media__1782588783971.jpg", alt: "Grand Durga Idol" },
    { src: "/images/gallery/media__1782588783981.jpg", alt: "Traditional Goddess Display" },
    { src: "/images/gallery/media__1782588783984.jpg", alt: "Magnificent Pandal Theme" },
    { src: "/images/gallery/media__1782588783996.jpg", alt: "Intricate Puja Decorations" },
    { src: "/images/gallery/media__1782588962536.jpg", alt: "Kumartuli Artisan Workshop" },
    { src: "/images/gallery/media__1782588962549.jpg", alt: "Festive Grandeur" },
    { src: "/images/gallery/media__1782588962725.jpg", alt: "Traditional Golden Aura" },
    { src: "/images/gallery/media__1782588962748.jpg", alt: "Vibrant Devi Manifestation" },
    { src: "/images/gallery/media__1782589386710.jpg", alt: "Golden Traditional Idol" },
    { src: "/images/gallery/media__1782589386713.jpg", alt: "Pastel Colored Divine Setup" },
    { src: "/images/gallery/media__1782589386716.jpg", alt: "Majestic Grand Pandal" },
    { src: "/images/gallery/media__1782589386719.jpg", alt: "South Indian Style Temple Pandal" }
  ];

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
              <Link href="/gallery" className="navLink text-gradient">Gallery</Link>
              <Link href="/map" className="navLink">Smart Map</Link>
              <Link href="/ai-assistant" className="btn-primary">Ask AI Assistant</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className={styles.contentWrapper}>
        <section className={styles.hero}>
          <div className="container">
            <h1 className="animate-fade-up">Visions of <span className="text-gradient">Devotion</span></h1>
            <p className={`animate-fade-up delay-1 ${styles.subtitle}`}>
              A visual tapestry of grandeur, art, and spirituality capturing the essence of Kolkata's greatest festival.
            </p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container">
            <div className={styles.galleryGrid}>
              {images.map((img, idx) => (
                <div 
                  key={idx} 
                  className={`${styles.imageCard} animate-fade-up`} 
                  style={{ animationDelay: `${0.2 * (idx + 1)}s` }}
                >
                  <Image src={img.src} alt={img.alt} fill className={styles.image} />
                  <div className={styles.imageOverlay}>
                    <span>{img.alt}</span>
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
