'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { InteractiveBrain, type RegionKey } from '@/components/interactive-brain/InteractiveBrain';
import styles from '../styles.module.css';

const labData = {
  id: 2,
  title: "Decision Making Without Drama",
  description: "Master the art of making clear, balanced decisions without emotional overwhelm",
  activeRegions: ['Frontal' as RegionKey, 'Temporal' as RegionKey],
  brainParts: {
    'Frontal': {
      title: "Prefrontal Decision Centers",
      description: "Critical regions for balanced decision-making and emotional processing",
      functions: [
        "Value assessment",
        "Emotional regulation",
        "Logical analysis",
        "Strategic planning",
        "Working memory",
        "Cognitive control"
      ],
      details: [
        {
          name: "Ventromedial PFC (vmPFC)",
          role: "Value assessment and emotional regulation",
          functions: ["Decision value calculation", "Emotional processing", "Risk assessment", "Reward evaluation"]
        },
        {
          name: "Dorsolateral PFC (dlPFC)",
          role: "Rational decision-making",
          functions: ["Logical analysis", "Working memory", "Cognitive control", "Strategic planning"]
        }
      ]
    },
    'Temporal': {
      title: "Emotional Memory Centers",
      description: "Regions responsible for emotional memory and response",
      functions: [
        "Emotional processing",
        "Fear response",
        "Memory enhancement",
        "Social signals",
        "Interoception",
        "Risk processing"
      ],
      details: [
        {
          name: "Amygdala",
          role: "Emotional significance detector",
          functions: ["Emotional processing", "Fear response", "Memory enhancement", "Social signals"]
        },
        {
          name: "Anterior Insula",
          role: "Emotional awareness hub",
          functions: ["Interoception", "Risk processing", "Emotional awareness", "Social emotions"]
        }
      ]
    }
  }
};

export default function Lab2Page() {
  const router = useRouter();
  const [autoRotate, setAutoRotate] = useState(true);
  const [activeSection, setActiveSection] = useState('welcome');
  const [activeBrainRegion, setActiveBrainRegion] = useState<RegionKey>(labData.activeRegions[0]);

  const sections = {
    welcome: 'Welcome',
    brain: 'Brain Activation',
    tools: 'Decision Tools',
    cases: 'Case Examples',
    games: 'Games & Activities',
    journey: 'Journey Beyond',
    reflection: 'Reflection Corner'
  };

  const handleBackToLabs = () => {
    router.push('/hi-labs');
  };

  return (
    <main className={styles.labContainer}>
      <div className={styles.contentOverlay} />
      
      <div className={styles.mainContent}>
        <div className={styles.brainViewerContainer}>
          <div className={styles.brainViewer}>
            <InteractiveBrain 
              activeRegions={[activeBrainRegion]}
              labHighlight={true}
              autoRotate={autoRotate}
              onRegionSelect={(region) => region && setActiveBrainRegion(region)}
              isolationOpacity={0.12}
            />
          </div>
        </div>

        <header className={styles.header}>
          <div className={styles.headerContent}>
            <div className={styles.headerLeft}>
              <button onClick={handleBackToLabs} className={styles.backButton}>
                ← Back to Labs
              </button>
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

        <div className={styles.navigationSection}>
          <div className={styles.contentGrid}>
            <div className={styles.navSidebar}>
              <h2 className={styles.navTitle}>Navigation</h2>
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
                  <h2 className={styles.sectionTitle}>HI LAB 2: {labData.title.toUpperCase()}</h2>
                  <div className={styles.sectionContent}>
                    <h3>Focus</h3>
                    <p className={styles.focusArea}>Emotional Intelligence, Decision-making</p>
                    
                    <p>Welcome to Lab 2, where you'll master the art of making clear, balanced decisions without 
                    emotional overwhelm. This lab trains your brain to harmonize logic and emotion, creating 
                    a powerful decision-making system that serves you in every aspect of life.</p>
                    
                    <p>Through targeted exercises, you'll strengthen the neural networks responsible for emotional 
                    regulation, strategic thinking, and intuitive wisdom. Learn to navigate complex choices with 
                    confidence and clarity, free from the drama of emotional reactivity.</p>

                    <div className={styles.outcomes}>
                      <h3>Lab Outcomes</h3>
                      <ul>
                        <li>Balance emotional input with logical analysis in decision-making</li>
                        <li>Develop resistance to impulsive reactions and emotional hijacking</li>
                        <li>Strengthen your ability to read emotional signals and gut feelings</li>
                        <li>Create a personal decision-making framework that reduces stress</li>
                        <li>Build confidence in your choices through integrated thinking</li>
                      </ul>
                    </div>
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
                      
                      <div className={styles.detailsGrid}>
                        {info.details?.map((detail, index) => (
                          <div key={index} className={styles.detailCard}>
                            <h4>{detail.name}</h4>
                            <p className={styles.role}>{detail.role}</p>
                            <div className={styles.functionTags}>
                              {detail.functions.map((func, i) => (
                                <span key={i} className={styles.tag}>{func}</span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeSection === 'tools' && (
                <div>
                  <h2 className={styles.sectionTitle}>Decision Tools</h2>
                  <p>Explore practical tools and frameworks for making balanced decisions.</p>
                  {/* Add decision tools content */}
                </div>
              )}

              {activeSection === 'cases' && (
                <div>
                  <h2 className={styles.sectionTitle}>Case Examples</h2>
                  <p>Learn from real-world scenarios and decision-making challenges.</p>
                  {/* Add case examples content */}
                </div>
              )}

              {activeSection === 'games' && (
                <div>
                  <h2 className={styles.sectionTitle}>Games & Activities</h2>
                  <p>Interactive exercises to strengthen your decision-making skills.</p>
                  {/* Add games and activities content */}
                </div>
              )}

              {activeSection === 'journey' && (
                <div>
                  <h2 className={styles.sectionTitle}>Journey Beyond</h2>
                  <p>Explore advanced decision-making concepts and applications.</p>
                  {/* Add journey beyond content */}
                </div>
              )}

              {activeSection === 'reflection' && (
                <div>
                  <h2 className={styles.sectionTitle}>Reflection Corner</h2>
                  <p>Document your progress and insights in decision-making mastery.</p>
                  {/* Add reflection corner content */}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}