'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import styles from './styles.module.css';

// Type & data extraction for clarity and scalability
interface Workshop {
  type: string;
  icon: string;
  title: string;
  items: string[];
  accent: string; // semantic accent label
}

const WORKSHOPS: Workshop[] = [
  {
    type: 'psychological',
    icon: '🧠',
    title: 'Mind Architecture',
    accent: 'Psychological Pathway',
    items: [
      'Neural Detox Protocol – Advanced stress release + cognitive restructuring',
      'Emotional Intelligence Engine – Master emotional processing algorithms',
      'Decision Matrix Optimization – High-speed clarity and choice frameworks'
    ]
  },
  {
    type: 'intellectual',
    icon: '⚡',
    title: 'Cognitive Networks',
    accent: 'Intellectual Pathway',
    items: [
      'Critical Thinking Accelerator – Process complex problems with AI-like precision',
      'Deep Listening Protocols – Enhanced neural reception and processing',
      'Conflict Resolution Engine – Transform chaos into structured solutions'
    ]
  },
  {
    type: 'innovative',
    icon: '🚀',
    title: 'Innovation Circuits',
    accent: 'Innovation Pathway',
    items: [
      'Creative Neural Networks – Rapid ideation under pressure conditions',
      'Leadership Algorithm Labs – Authentic influence without replication',
      'Innovation Sprint Engine – Build and deploy breakthrough ideas fast'
    ]
  }
];

// Predefined pattern positions to avoid hydration mismatch
const PATTERN_POSITIONS = [
  { left: 10, top: 20 },
  { left: 20, top: 40 },
  { left: 30, top: 60 },
  { left: 40, top: 30 },
  { left: 50, top: 70 },
  { left: 60, top: 20 },
  { left: 70, top: 50 },
  { left: 80, top: 30 },
  { left: 15, top: 80 },
  { left: 25, top: 45 },
  { left: 35, top: 65 },
  { left: 45, top: 25 },
  { left: 55, top: 85 },
  { left: 65, top: 35 },
  { left: 75, top: 75 },
  { left: 85, top: 15 },
  { left: 90, top: 40 },
  { left: 20, top: 90 },
  { left: 40, top: 10 },
  { left: 60, top: 60 }
];

export default function HIWorkshopsPage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange(setScrollProgress);
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Placeholder action – would navigate or open modal in future
  const logExplore = (type: string) => {
    console.log(`Workshop path selected: ${type}`);
  };

  return (
    <div className={styles.hiWorkshops} role="main" aria-label="HI Workshops professional development pathways">
      {/* Background Patterns (decorative) */}
      <div className={`${styles.patternOverlay} hidden xs:block`} aria-hidden="true">
        {PATTERN_POSITIONS.map((position, i) => (
          <motion.div
            key={i}
            className={styles.pattern}
            initial={{ opacity: 0, scale: 0 }}
            animate={prefersReducedMotion ? {} : { opacity: [0.08, 0.25, 0.08], scale: [1, 1.15, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 24, delay: i * 0.4, repeat: Infinity, ease: 'linear' }}
            style={{ left: `${position.left}%`, top: `${position.top}%` }}
          />
        ))}
      </div>

      {/* Scroll Progress */}
      <motion.div className={styles.scrollProgress} style={{ scaleX: scrollProgress }} aria-hidden="true" />

      {/* Hero Section */}
      <section className={styles.hero} aria-labelledby="hero-heading" aria-describedby="hero-tagline">
        <motion.div className={styles.neuralNetwork} style={{ opacity, scale }} aria-hidden="true">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className={`${styles.neuralNode} ${styles[`node${i + 1}`]}`}
              animate={prefersReducedMotion ? {} : { scale: [1, 1.15, 1], boxShadow: ['0 0 16px rgba(0, 153, 255, 0.25)', '0 0 32px rgba(0, 153, 255, 0.45)', '0 0 16px rgba(0, 153, 255, 0.25)'] }}
              transition={{ duration: 6, repeat: Infinity, delay: i * 0.4, ease: 'easeInOut' }}
            />
          ))}
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className={styles.neuralConnection}
              style={{ top: `${15 + i * 7}%`, left: `${12 + (i % 5) * 15}%`, width: '140px', transform: `rotate(${(i * 27) % 360}deg)` }}
              animate={prefersReducedMotion ? {} : { opacity: [0.15, 0.5, 0.15] }}
              transition={{ duration: 5, repeat: Infinity, delay: i * 0.25, ease: 'linear' }}
            />
          ))}
        </motion.div>

        {/* Brain Inspired Orbs */}
        {!prefersReducedMotion && (
          <>
            <motion.div className={`${styles.brainOrb} ${styles.orbLarge}`} animate={{ y: [0, -30, 0], x: [0, 20, 0] }} transition={{ duration: 26, repeat: Infinity }} aria-hidden="true" />
            <motion.div className={`${styles.brainOrb} ${styles.orbMedium}`} animate={{ y: [0, -35, 0], x: [0, -18, 0] }} transition={{ duration: 24, repeat: Infinity, delay: -6 }} aria-hidden="true" />
            <motion.div className={`${styles.brainOrb} ${styles.orbSmall}`} animate={{ y: [0, -20, 0] }} transition={{ duration: 18, repeat: Infinity, delay: -9 }} aria-hidden="true" />
          </>
        )}

        <motion.div className={styles.heroContent} initial={{ opacity: 0, y: 64 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
          <motion.h1 id="hero-heading" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.5 }}>
            HI Workshops
          </motion.h1>
          <motion.p className={styles.heroSubtitle} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.7 }}>
            Neural Networks of Learning
          </motion.p>
          <motion.p id="hero-tagline" className={styles.heroTagline} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.9 }}>
            Enhance professional capabilities through structured, evidence-based workshops developing advanced cognitive skills and strategic thinking methodology.
          </motion.p>
          <Link href="#workshops" aria-label="Explore professional development programs">
            <motion.div className={styles.ctaPrimary} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 1.1 }} whileHover={{ scale: 1.04, y: -6 }} whileTap={{ scale: 0.95 }}>
              Explore Programs
            </motion.div>
          </Link>
        </motion.div>
      </section>

      {/* Workshops Section */}
      <section className={`${styles.scrollSection} ${styles.workshopsSection}`} id="workshops" aria-labelledby="workshops-heading">
        <div className={styles.container}>
          <motion.h2 id="workshops-heading" className={styles.sectionTitle} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
            Professional Development Pathways
          </motion.h2>
          <motion.p className={styles.sectionSubtitle} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }} viewport={{ once: true }}>
            Specialized programs enhancing leadership, decision-making, and strategic cognition.
          </motion.p>

          <div className={styles.workshopsGrid} role="list" aria-label="Workshop pathways">
            {WORKSHOPS.map((workshop, index) => (
              <motion.article
                key={workshop.type}
                className={`${styles.workshopCard} ${styles[workshop.type]}`}
                initial={{ opacity: 0, y: 72 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ y: -12, scale: 1.015 }}
                role="listitem"
                aria-label={`${workshop.title} – ${workshop.accent}`}
              >
                <div className={styles.workshopIcon} aria-hidden="true">{workshop.icon}</div>
                <h3 className={styles.workshopTitle}>{workshop.title}</h3>
                <ul className={styles.workshopList} aria-label={`${workshop.title} key modules`}>
                  {workshop.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <Link
                  href={`/hi-workshops/${workshop.type}`}
                  onClick={() => logExplore(workshop.type)}
                  aria-label={`Explore ${workshop.title} pathway`}
                >
                  <motion.div className={styles.ctaPrimary} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.95 }}>
                    Explore Path
                  </motion.div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`${styles.scrollSection} ${styles.ctaSection}`} aria-labelledby="cta-heading">
        <div className={styles.container}>
          <motion.h2 id="cta-heading" className={styles.sectionTitle} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
            Ready to Rewire Your Mind?
          </motion.h2>
          <motion.p className={styles.sectionSubtitle} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }} viewport={{ once: true }}>
            Join our network and transform cognitive capability through immersive workshops.
          </motion.p>
          <motion.div className={styles.ctaButtons} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} viewport={{ once: true }}>
            <Link href="#signup" aria-label="Start your professional development journey">
              <motion.div className={styles.ctaPrimary} whileHover={{ scale: 1.04, y: -4 }} whileTap={{ scale: 0.95 }}>
                Start Your Neural Upgrade
              </motion.div>
            </Link>
            <Link href="#calendar" aria-label="View workshop calendar">
              <motion.div className={styles.ctaSecondary} whileHover={{ y: -4 }} whileTap={{ scale: 0.95 }}>
                Explore Workshop Calendar
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
