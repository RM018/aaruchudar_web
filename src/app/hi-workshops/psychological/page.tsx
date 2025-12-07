'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Layers, Star } from 'lucide-react';
import styles from '../styles.module.css';

export default function PsychologicalWorkshop() {
  const title = 'Mind Architecture';
  const details = {
    duration: '2 days',
    level: 'Intermediate',
    rating: 4.8,
    price: '$199',
    modules: [
      'Neural Detox Protocol – stress release + cognitive restructuring',
      'Emotional Intelligence Engine – processing algorithms',
      'Decision Matrix Optimization – clarity frameworks'
    ],
    description:
      'An immersive, hands-on workshop to restructure thinking patterns, improve emotional processing, and build decision clarity using evidence-based methods.'
  };

  return (
    <div className={styles.hiWorkshops}>
      {/* Back */}
      <Link href="/hi-workshops" className={styles.backLink} aria-label="Back to workshops">
        <ArrowLeft size={16} /> Back
      </Link>

      {/* Hero */}
      <header className={styles.hero}>
        <div className={styles.heroBanner} aria-hidden style={{ backgroundImage: "url('/images/hi-workshops-banner.jpg')" }} />
        <div className={styles.heroContent}>
          <motion.h1 className="heading-1" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            {title}
          </motion.h1>
          <motion.p style={{ color: 'var(--text-secondary)' }} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            Psychological Pathway
          </motion.p>
        </div>
      </header>

      {/* Content */}
      <main className={`${styles.scrollSection} ${styles.workshopsSection}`}>
        <div className={styles.container}>
          <div className={`${styles.workshopCard} ${styles.psychological}`}>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className={styles.badge}><Clock size={14} /> {details.duration}</span>
              <span className={styles.badge}><Layers size={14} /> {details.level}</span>
              <span className={styles.badge}><Star size={14} /> {details.rating}</span>
            </div>

            <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>{details.description}</p>

            <ul className={styles.workshopList} aria-label="Modules">
              {details.modules.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>

            <div className="flex items-center justify-between mt-4">
              <div style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{details.price}</div>
              <div className={styles.cardActions}>
                <Link href={{ pathname: '/productpage', query: { workshop: title } }} className={styles.ctaSecondary} aria-label="Learn more">
                  Learn More
                </Link>
                <Link href="/hi-workshops" className={styles.ctaPrimary} aria-label="All workshops">
                  Browse More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
