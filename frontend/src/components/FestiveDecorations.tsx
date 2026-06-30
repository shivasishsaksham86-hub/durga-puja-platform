import styles from "./FestiveDecorations.module.css";

export default function FestiveDecorations() {
  return (
    <div className={styles.decorationsContainer}>
      {/* Jhalar Lights */}
      <div className={styles.jhalarLights}>
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} className={styles.light} style={{ animationDelay: `${(i % 5) * 0.3}s` }}></div>
        ))}
      </div>

      {/* Mango Leaves & Marigold Toran */}
      <div className={styles.toran}>
        {Array.from({ length: 25 }).map((_, i) => (
          <div key={i} className={styles.toranItem} style={{ animationDelay: `${(i % 3) * 0.5}s` }}>
            <span className={styles.leaf}>🌿</span>
            <span className={styles.flower}>🌼</span>
          </div>
        ))}
      </div>

      {/* Corner Diyas */}
      <div className={`${styles.diya} ${styles.diyaLeft}`}>🪔</div>
      <div className={`${styles.diya} ${styles.diyaRight}`}>🪔</div>
    </div>
  );
}
