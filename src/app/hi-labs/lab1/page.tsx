'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, Html } from '@react-three/drei';
import { InteractiveBrain, RegionKey } from '@/components/interactive-brain/InteractiveBrain';
import * as THREE from 'three';
import styles from '../styles.module.css';

const labData = {
  id: 1,
  title: "Clarity as Culture",
  description: "Breaking confusion, Building thinking clarity",
  activeRegions: ['Frontal'] as const,
  brainParts: {
    'Frontal': {
      title: "Prefrontal Cortex & Anterior Cingulate Cortex",
      description: "The CEO of your thinking and error detection system",
      details: [
        {
          name: "Prefrontal Cortex (PFC)",
          role: "The CEO of your thinking",
          functions: ["Executive control", "Decision making", "Logical processing", "Planning"]
        },
        {
          name: "Anterior Cingulate Cortex (ACC)",
          role: "Your brain's error detector",
          functions: ["Error detection", "Conflict monitoring", "Attention control", "Self-correction"]
        }
      ]
    }
  }
};

export default function Lab1Page() {
  const [activeSection, setActiveSection] = useState('welcome');
  const [autoRotate, setAutoRotate] = useState(true);
  const [activeBrainRegion, setActiveBrainRegion] = useState<RegionKey>('Frontal');

  const sections = {
    welcome: 'Welcome',
    about: 'About Us',
    clarity: 'Clarity as Culture',
    brain: 'Brain Activation',
    tools: 'Clarity Tools',
    cases: 'Case Examples',
    games: 'Games & Activities',
    culture: 'Team Culture',
    journey: 'Journey Beyond',
    reflection: 'Reflection Corner'
  };

  return (
    <main className={styles.labContainer}>
      <div className={styles.contentOverlay} />
      
      <div className={styles.mainContent}>
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <div className={styles.headerLeft}>
              <Link href="/hi-labs" className={styles.backButton}>
                ← Back to Labs
              </Link>
              <div className={styles.labTitle}>
                <h1>HI LAB {labData.id}</h1>
                <p>{labData.title}</p>
              </div>
            </div>
            <Link href="/" className={styles.homeButton}>
              Home
            </Link>
          </div>
        </header>

        <div className={styles.brainViewerContainer}>
          <div className={styles.brainViewer} style={{ width: '100%', height: '500px', position: 'relative' }}>
            <Canvas
              gl={{ 
                antialias: true,
                toneMapping: THREE.ACESFilmicToneMapping,
                outputColorSpace: THREE.SRGBColorSpace
              }}
              camera={{ 
                position: [0, 0, 5], 
                fov: 45,
                near: 0.1,
                far: 1000
              }}
              style={{ background: 'transparent' }}
            >
              <Suspense fallback={<Html center>Loading Brain Model...</Html>}>
                <Stage 
                  intensity={0.8}
                  environment="city"
                  adjustCamera={false}
                >
                  <InteractiveBrain 
                    activeRegions={[activeBrainRegion]}
                    labHighlight={true}
                    autoRotate={autoRotate}
                    onRegionSelect={(region) => region && setActiveBrainRegion(region)}
                  />
                </Stage>
                <OrbitControls 
                  enablePan={false}
                  enableZoom={true}
                  enableRotate={true}
                  autoRotate={autoRotate}
                  autoRotateSpeed={0.5}
                  minDistance={2}
                  maxDistance={6}
                />
              </Suspense>
            </Canvas>

            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className={styles.controlButton}
              style={{
                position: 'absolute',
                bottom: '20px',
                right: '20px',
                background: autoRotate ? 'rgba(6, 255, 165, 0.3)' : 'rgba(6, 255, 165, 0.15)'
              }}
            >
              {autoRotate ? '⏸ Pause Rotation' : '▶️ Auto Rotate'}
            </button>
          </div>

          <div className={styles.infoPanel}>
            <h2 className={styles.infoTitle}>Active Brain Regions</h2>
            {Object.entries(labData.brainParts).map(([region, info]) => (
              <div key={region} className={styles.infoGrid}>
                {info.details.map((detail, index) => (
                  <div key={index} className={styles.infoCard}>
                    <h3 className={styles.infoCardTitle}>{detail.name}</h3>
                    <p className={styles.infoCardDescription}>{detail.role}</p>
                    <div className={styles.tagContainer}>
                      {detail.functions.map((func, i) => (
                        <span key={i} className={styles.tag}>{func}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.navigationSection}>
          <div className={styles.contentGrid}>
            <div className={styles.navSidebar}>
              <h2 className={styles.navTitle}>Lab Navigation</h2>
              <div className={styles.navButtons}>
                {Object.entries(sections).map(([key, title]) => (
                  <button
                    key={key}
                    onClick={() => setActiveSection(key)}
                    className={`${styles.navButton} ${
                      activeSection === key ? styles.navButtonActive : styles.navButtonInactive
                    }`}
                  >
                    {title}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.mainPanel}>
              {activeSection === 'welcome' && (
                <div>
                  <h2 className={styles.sectionTitle}>Welcome to Lab 1: Clarity as Culture</h2>
                  <p className={styles.sectionDescription}>
                    Welcome to Lab 1, where we transform the way you think, process information, and make decisions. 
                    This lab is designed to activate your brain's executive control centers, helping you develop 
                    crystal-clear thinking patterns that cut through confusion and uncertainty.
                  </p>
                  <div className={styles.focusArea}>
                    <h3 className={styles.focusTitle}>Lab Outcomes</h3>
                    <ul>
                      <li>Develop systematic thinking processes that eliminate mental clutter</li>
                      <li>Strengthen your brain's error detection and self-correction abilities</li>
                      <li>Build sustainable habits for clear decision-making under pressure</li>
                      <li>Transform reactive thinking into intentional, strategic responses</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeSection === 'brain' && (
                <div>
                  <h2 className={styles.sectionTitle}>Brain Activation Details</h2>
                  {Object.entries(labData.brainParts).map(([region, info]) => (
                    <div key={region} className={styles.brainRegionCard}>
                      <h3>{info.title}</h3>
                      <p>{info.description}</p>
                      {info.details.map((detail, index) => (
                        <div key={index} className={styles.focusArea}>
                          <h4 className={styles.focusTitle}>{detail.name}</h4>
                          <p>{detail.role}</p>
                          <div className={styles.tagContainer}>
                            {detail.functions.map((func, i) => (
                              <span key={i} className={styles.tag}>{func}</span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}

              {/* Additional section content can be added here following the same pattern */}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}