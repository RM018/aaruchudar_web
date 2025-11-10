'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import styles from './styles.module.css';

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
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      setScrollProgress(latest);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const exploreWorkshop = (type: string) => {
    // TODO: Implement workshop exploration functionality
    console.log(`Exploring ${type} workshop`);
  };

  return (
    <div className={styles.hiWorkshops}>
      {/* Background Patterns */}
      <div className={styles.patternOverlay}>
        {PATTERN_POSITIONS.map((position, i) => (
          <motion.div
            key={i}
            className={styles.pattern}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 20,
              delay: i * 0.5,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              left: `${position.left}%`,
              top: `${position.top}%`,
            }}
          />
        ))}
      </div>

      {/* Scroll Progress */}
      <motion.div 
        className={styles.scrollProgress} 
        style={{ scaleX: scrollProgress }}
      />

      {/* Hero Section */}
      <section className={styles.hero}>
        {/* Neural Network Elements */}
        <motion.div 
          className={styles.neuralNetwork}
          style={{ opacity, scale }}
        >
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className={`${styles.neuralNode} ${styles[`node${i + 1}`]}`}
              animate={{ 
                scale: [1, 1.2, 1],
                boxShadow: [
                  '0 0 20px rgba(0, 255, 255, 0.3)',
                  '0 0 40px rgba(0, 255, 255, 0.5)',
                  '0 0 20px rgba(0, 255, 255, 0.3)'
                ]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                delay: i * 0.5,
                ease: "easeInOut"
              }}
            />
          ))}
          
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className={styles.neuralConnection}
              style={{
                top: `${15 + i * 15}%`,
                left: `${15 + (i % 4) * 20}%`,
                width: '150px',
                transform: `rotate(${(i * 30) % 360}deg)`
              }}
              animate={{ 
                opacity: [0.2, 0.5, 0.2],
                height: ['2px', '3px', '2px']
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                delay: i * 0.2,
                ease: "linear"
              }}
            />
          ))}
        </motion.div>

        {/* Brain-Inspired Floating Orbs */}
        <motion.div 
          className={`${styles.brainOrb} ${styles.orbLarge}`}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            rotateY: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div 
          className={`${styles.brainOrb} ${styles.orbMedium}`}
          animate={{
            y: [0, -40, 0],
            x: [0, -20, 0],
            rotateX: [0, 180, 360]
          }}
          transition={{ duration: 18, repeat: Infinity, delay: -5 }}
        />
        <motion.div 
          className={`${styles.brainOrb} ${styles.orbSmall}`}
          animate={{
            y: [0, -25, 0],
            rotateZ: [0, 360]
          }}
          transition={{ duration: 12, repeat: Infinity, delay: -8 }}
        />
        
        <motion.div 
          className={styles.heroContent}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.8 }}
          >
            HI Workshops
          </motion.h1>
          <motion.p 
            className={styles.heroSubtitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            🧠 Neural Networks of Learning
          </motion.p>
          <motion.p 
            className={styles.heroTagline}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            Enhance your professional capabilities through structured, evidence-based workshops designed to develop advanced cognitive skills and strategic thinking methodologies.
          </motion.p>
          <Link href="#workshops">
            <motion.div 
              className={styles.ctaPrimary}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.8 }}
              whileHover={{ scale: 1.05, y: -8 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Programs
            </motion.div>
          </Link>
        </motion.div>
      </section>

      {/* Workshops Section */}
      <section className={`${styles.scrollSection} ${styles.workshopsSection}`} id="workshops">
        <div className={styles.container}>
          <motion.h2 
            className={styles.sectionTitle}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Professional Development Pathways
          </motion.h2>
          <motion.p 
            className={styles.sectionSubtitle}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Specialized programs designed to enhance leadership, decision-making, and strategic thinking capabilities
          </motion.p>
          
          <div className={styles.workshopsGrid}>
            {[
              {
                type: 'psychological',
                icon: '🧠',
                title: 'Mind Architecture',
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
                items: [
                  'Creative Neural Networks – Rapid ideation under pressure conditions',
                  'Leadership Algorithm Labs – Authentic influence without replication',
                  'Innovation Sprint Engine – Build and deploy breakthrough ideas fast'
                ]
              }
            ].map((workshop, index) => (
              <motion.div 
                key={index}
                className={`${styles.workshopCard} ${styles[workshop.type]}`}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -15, scale: 1.02 }}
              >
                <div className={styles.workshopIcon}>{workshop.icon}</div>
                <h3 className={styles.workshopTitle}>{workshop.title}</h3>
                <ul className={styles.workshopList}>
                  {workshop.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                <motion.button 
                  className={styles.ctaPrimary}
                  onClick={() => exploreWorkshop(workshop.type)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore Path
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`${styles.scrollSection} ${styles.ctaSection}`}>
        <div className={styles.container}>
          <motion.h2 
            className={styles.sectionTitle}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Ready to Rewire Your Mind?
          </motion.h2>
          <motion.p 
            className={styles.sectionSubtitle}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Join our neural network of learners and transform your cognitive capabilities through immersive workshops
          </motion.p>
          
          <motion.div 
            className={styles.ctaButtons}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link href="#signup">
              <motion.div 
                className={styles.ctaPrimary}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Neural Upgrade
              </motion.div>
            </Link>
            <Link href="#calendar">
              <motion.div 
                className={styles.ctaSecondary}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Workshop Calendar
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
