'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { InteractiveBrain, type RegionKey } from '@/components/interactive-brain/InteractiveBrain';
import styles from '../styles.module.css';

const labData = {
  id: 7,
  title: "Voice, Value, and Vulnerability",
  description: "Master the art of authentic self-expression and emotional courage",
  activeRegions: ['Frontal' as RegionKey, 'Temporal' as RegionKey, 'Parietal' as RegionKey],
  brainParts: {
    'Frontal': {
      title: "Creative Processing Network",
      description: "Regions responsible for innovative thinking and idea generation.",
      functions: [
        "Idea generation",
        "Cognitive flexibility",
        "Novel combinations",
        "Abstract thinking",
        "Creative synthesis",
        "Future thinking"
      ],
      details: [
        {
          name: "Dorsolateral PFC",
          role: "Creative director",
          functions: ["Idea generation", "Cognitive flexibility", "Novel combinations", "Abstract thinking"]
        },
        {
          name: "Anterior PFC",
          role: "Innovation integrator",
          functions: ["Creative synthesis", "Future thinking", "Possibility exploration", "Conceptual blending"]
        }
      ]
    },
    'Temporal': {
      title: "Memory Integration Network",
      description: "Areas that combine memories and experiences into new ideas.",
      functions: [
        "Pattern completion",
        "Memory integration",
        "Novel associations",
        "Concept linking",
        "Story creation",
        "Knowledge synthesis"
      ],
      details: [
        {
          name: "Hippocampus",
          role: "Memory recombination hub",
          functions: ["Pattern completion", "Memory integration", "Novel associations", "Scenario simulation"]
        },
        {
          name: "Temporal Poles",
          role: "Semantic integrator",
          functions: ["Concept linking", "Story creation", "Metaphor processing", "Knowledge synthesis"]
        }
      ]
    },
    'Parietal': {
      title: "Creative Visualization Network",
      description: "Regions that help visualize and manipulate mental images.",
      functions: [
        "Mental rotation",
        "Spatial creativity",
        "Visual imagination",
        "Abstract visualization",
        "Metaphorical thinking",
        "Conceptual integration"
      ],
      details: [
        {
          name: "Superior Parietal Lobule",
          role: "Mental workspace",
          functions: ["Mental rotation", "Spatial creativity", "Visual imagination", "Abstract visualization"]
        },
        {
          name: "Angular Gyrus",
          role: "Cross-modal hub",
          functions: ["Metaphorical thinking", "Conceptual integration", "Semantic creativity", "Insight generation"]
        }
      ]
    }
  }
};

export default function Lab7Page() {
  const router = useRouter();
  const [autoRotate, setAutoRotate] = useState(true);
  const [activeSection, setActiveSection] = useState('welcome');
  const [activeBrainRegion, setActiveBrainRegion] = useState<RegionKey>(labData.activeRegions[0]);

  const sections = {
    welcome: 'Welcome',
    brain: 'Brain Activation',
    tools: 'Voice Tools',
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
                  <h2 className={styles.sectionTitle}>HI LAB 7: {labData.title.toUpperCase()}</h2>
                  <div className={styles.sectionContent}>
                    <h3>Focus</h3>
                    <p className={styles.focusArea}>Speaking truth and Building confidence</p>
                    
                    <p>Welcome to Lab 7, where you'll develop the courage to speak your truth, 
                    embrace your authentic value, and transform vulnerability into strength. 
                    This lab activates brain regions responsible for self-worth, emotional courage, 
                    and authentic self-expression.</p>
                    
                    <p>Through targeted exercises, you'll build neural pathways that support 
                    confidence, emotional resilience, and the ability to communicate with 
                    authenticity and impact. Learn to turn fear into fuel for growth.</p>

                    <div className={styles.outcomes}>
                      <h3>Lab Outcomes</h3>
                      <ul>
                        <li>Build unshakeable self-worth and inner confidence</li>
                        <li>Develop courage to face uncertainty and discomfort</li>
                        <li>Transform vulnerability into authentic strength</li>
                        <li>Strengthen your sense of identity and personal values</li>
                        <li>Communicate with truth, compassion, and impact</li>
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
                  <h2 className={styles.sectionTitle}>Voice Tools</h2>
                  <p>Explore practical tools for authentic self-expression.</p>
                  {/* Add voice tools content */}
                </div>
              )}

              {activeSection === 'cases' && (
                <div>
                  <h2 className={styles.sectionTitle}>Case Examples</h2>
                  <p>Learn from real-world examples of voice and vulnerability.</p>
                  {/* Add case examples content */}
                </div>
              )}

              {activeSection === 'games' && (
                <div>
                  <h2 className={styles.sectionTitle}>Games & Activities</h2>
                  <p>Interactive exercises to strengthen your authentic voice.</p>
                  {/* Add games and activities content */}
                </div>
              )}

              {activeSection === 'journey' && (
                <div>
                  <h2 className={styles.sectionTitle}>Journey Beyond</h2>
                  <p>Explore advanced concepts in self-expression and vulnerability.</p>
                  {/* Add journey beyond content */}
                </div>
              )}

              {activeSection === 'reflection' && (
                <div>
                  <h2 className={styles.sectionTitle}>Reflection Corner</h2>
                  <p>Document your progress in finding your authentic voice.</p>
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