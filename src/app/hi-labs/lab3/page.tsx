'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { InteractiveBrain, type RegionKey } from '@/components/interactive-brain/InteractiveBrain';
import styles from '../styles.module.css';

const labData = {
  id: 3,
  title: "Inner Focus in a Noisy World",
  description: "Master the art of maintaining focus and attention in a distraction-filled environment",
  activeRegions: ['Frontal' as RegionKey, 'Parietal' as RegionKey],
  brainParts: {
    'Frontal': {
      title: "Executive Attention Network",
      description: "Regions responsible for maintaining focus and filtering distractions.",
      functions: [
        "Sustained attention",
        "Goal-directed focus",
        "Distraction filtering",
        "Task switching",
        "Mind wandering control",
        "Self-reflection"
      ],
      details: [
        {
          name: "Dorsal Attention Network",
          role: "Your focus spotlight",
          functions: ["Sustained attention", "Goal-directed focus", "Distraction filtering", "Task switching"]
        },
        {
          name: "Default Mode Network",
          role: "Internal thought manager",
          functions: ["Mind wandering control", "Self-reflection", "Future planning", "Memory consolidation"]
        }
      ]
    },
    'Parietal': {
      title: "Attention Control Centers",
      description: "Areas that help direct and maintain attention in space and time.",
      functions: [
        "Spatial awareness",
        "Attention shifting",
        "Visual-motor coordination",
        "Multi-sensory integration",
        "Sustained attention",
        "Working memory"
      ],
      details: [
        {
          name: "Posterior Parietal Cortex",
          role: "Spatial attention director",
          functions: ["Spatial awareness", "Attention shifting", "Visual-motor coordination", "Multi-sensory integration"]
        },
        {
          name: "Superior Parietal Lobule",
          role: "Focus maintainer",
          functions: ["Sustained attention", "Working memory", "Spatial processing", "Motor planning"]
        }
      ]
    }
  }
};

export default function Lab3Page() {
  const router = useRouter();
  const [autoRotate, setAutoRotate] = useState(true);
  const [activeSection, setActiveSection] = useState('welcome');
  const [activeBrainRegion, setActiveBrainRegion] = useState<RegionKey>(labData.activeRegions[0]);

  const sections = {
    welcome: 'Welcome',
    brain: 'Brain Activation',
    tools: 'Focus Tools',
    cases: 'Case Examples',
    games: 'Attention Games',
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
                  <h2 className={styles.sectionTitle}>HI LAB 3: {labData.title.toUpperCase()}</h2>
                  <div className={styles.sectionContent}>
                    <h3>Focus</h3>
                    <p className={styles.focusArea}>Improving focus and Reducing distractions</p>
                    
                    <p>Welcome to Lab 3, where you'll develop laser-sharp focus and unshakeable concentration 
                    amidst the chaos of modern life. This lab trains your brain's attention networks to 
                    filter out distractions and maintain deep focus on what truly matters.</p>
                    
                    <p>Through scientifically-designed exercises, you'll strengthen your ability to sustain 
                    attention, catch your mind when it wanders, and build powerful focus habits that 
                    transform your productivity and peace of mind.</p>

                    <div className={styles.outcomes}>
                      <h3>Lab Outcomes</h3>
                      <ul>
                        <li>Develop sustained attention that cuts through distractions</li>
                        <li>Build awareness of when your mind wanders and how to refocus</li>
                        <li>Create automatic focus habits through repetition and training</li>
                        <li>Strengthen your mental spotlight to stay locked on important tasks</li>
                        <li>Transform your relationship with distractions and mental noise</li>
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
                  <h2 className={styles.sectionTitle}>Focus Tools</h2>
                  <p>Explore practical tools and techniques for maintaining focus.</p>
                  {/* Add focus tools content */}
                </div>
              )}

              {activeSection === 'cases' && (
                <div>
                  <h2 className={styles.sectionTitle}>Case Examples</h2>
                  <p>Learn from real-world scenarios and attention challenges.</p>
                  {/* Add case examples content */}
                </div>
              )}

              {activeSection === 'games' && (
                <div>
                  <h2 className={styles.sectionTitle}>Attention Games</h2>
                  <p>Interactive exercises to strengthen your focus and attention.</p>
                  {/* Add attention games content */}
                </div>
              )}

              {activeSection === 'journey' && (
                <div>
                  <h2 className={styles.sectionTitle}>Journey Beyond</h2>
                  <p>Explore advanced focus and attention concepts.</p>
                  {/* Add journey beyond content */}
                </div>
              )}

              {activeSection === 'reflection' && (
                <div>
                  <h2 className={styles.sectionTitle}>Reflection Corner</h2>
                  <p>Document your progress and insights in focus mastery.</p>
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