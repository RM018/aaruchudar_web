'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { InteractiveBrain, type RegionKey } from '@/components/interactive-brain/InteractiveBrain';
import styles from '../styles.module.css';

const labData = {
  id: 6,
  title: "Systemic Thinking",
  description: "Master the art of seeing patterns and understanding complex systems",
  activeRegions: ['Frontal' as RegionKey, 'Parietal' as RegionKey, 'Cerebellum' as RegionKey],
  brainParts: {
    'Frontal': {
      title: "Executive Processing Centers",
      description: "Regions responsible for complex thinking and pattern analysis.",
      functions: [
        "Complex analysis",
        "Pattern recognition",
        "Strategic planning",
        "Abstract thinking",
        "System integration",
        "Multi-level thinking"
      ],
      details: [
        {
          name: "Prefrontal Cortex",
          role: "Pattern integration master",
          functions: ["Complex analysis", "Pattern recognition", "Strategic planning", "Abstract thinking"]
        },
        {
          name: "Anterior Prefrontal Cortex",
          role: "Meta-cognitive hub",
          functions: ["System integration", "Multi-level thinking", "Goal coordination", "Complex reasoning"]
        }
      ]
    },
    'Parietal': {
      title: "Pattern Recognition Network",
      description: "Areas that help identify and process complex patterns.",
      functions: [
        "Spatial relations",
        "Pattern matching",
        "Information integration",
        "Visual-spatial processing",
        "Mental imagery",
        "Pattern visualization"
      ],
      details: [
        {
          name: "Posterior Parietal Cortex",
          role: "Pattern analyzer",
          functions: ["Spatial relations", "Pattern matching", "Information integration", "Visual-spatial processing"]
        },
        {
          name: "Precuneus",
          role: "Mental modeling center",
          functions: ["Mental imagery", "Pattern visualization", "Self-reflection", "Cognitive mapping"]
        }
      ]
    },
    'Cerebellum': {
      title: "Learning Optimization System",
      description: "Region that refines thinking patterns and cognitive sequences.",
      functions: [
        "Pattern refinement",
        "Cognitive timing",
        "Learning automation",
        "Sequence optimization"
      ],
      details: [
        {
          name: "Cognitive Cerebellum",
          role: "Thought sequence optimizer",
          functions: ["Pattern refinement", "Cognitive timing", "Learning automation", "Sequence optimization"]
        }
      ]
    }
  }
};

export default function Lab6Page() {
  const router = useRouter();
  const [autoRotate, setAutoRotate] = useState(true);
  const [activeSection, setActiveSection] = useState('welcome');
  const [activeBrainRegion, setActiveBrainRegion] = useState<RegionKey>(labData.activeRegions[0]);

  const sections = {
    welcome: 'Welcome',
    brain: 'Brain Activation',
    about: 'About Us',
    systemic: 'Systemic Thinking',
    principles: 'Core Principles',
    tools: 'Thinking Tools',
    cases: 'Case Examples',
    games: 'Games & Activities',
    culture: 'Team Culture',
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
                  <h2 className={styles.sectionTitle}>HI LAB 6: {labData.title.toUpperCase()}</h2>
                  <div className={styles.sectionContent}>
                    <h3>Welcome Statement</h3>
                    <p>Welcome to a space where the way you see, think, and understand the world changes. In this lab, 
                    we see beyond individual events and decisions to uncover the patterns, relationships, and ripple 
                    effects that govern the whole systems.</p>
                    
                    <p>Here, you will learn to realize the ties that are often overlooked and to trace the link between 
                    a small action and the significant effect it is causing. Moreover, understanding so, you will be 
                    able to determine the future results before they happen.</p>

                    <p>You will learn to take a problem to several angles, doubt the assumptions, and see the world as 
                    a network of interconnected components rather than isolated ones through hands-on activities, 
                    imagination exercises, and group discussions.</p>

                    <p>This lab is more than just problem-solving. It is about thinking more intensively, acting more 
                    consciously and developing the awareness needed to make choices that matter and last. As a result 
                    of this journey, you will witness a clearer picture of patterns and a deeper understanding of your 
                    part in them, thus, you will be able to engage thoughtfully and make meaningful contributions to 
                    the systems around you.</p>

                    <div className={styles.outcomes}>
                      <h3>Lab Outcomes</h3>
                      <ul>
                        <li>Grasp the idea of systems ripple through which actions influence people, processes, and outcomes</li>
                        <li>Practice skills of predicting results, assessing options, and making thoughtful, grounded choices</li>
                        <li>Recognize recurring patterns, feedback loops, and root causes instead of isolating issues</li>
                        <li>Communicate better and collaborate more effectively through understanding interconnections</li>
                        <li>Develop mindset for stopping, reflecting, and responding intentionally rather than reacting impulsively</li>
                        <li>Embody automatic thinking about connections, dependencies, and long-term impact</li>
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

              {activeSection === 'about' && (
                <div>
                  <h2 className={styles.sectionTitle}>About Us</h2>
                  <p>Learn about our approach to systemic thinking and pattern recognition.</p>
                  {/* Add about content */}
                </div>
              )}

              {activeSection === 'systemic' && (
                <div>
                  <h2 className={styles.sectionTitle}>Systemic Thinking</h2>
                  <p>Explore the fundamentals of systemic thinking and its applications.</p>
                  {/* Add systemic thinking content */}
                </div>
              )}

              {activeSection === 'principles' && (
                <div>
                  <h2 className={styles.sectionTitle}>Core Principles</h2>
                  <p>Understand the key principles that guide systemic thinking.</p>
                  {/* Add principles content */}
                </div>
              )}

              {activeSection === 'tools' && (
                <div>
                  <h2 className={styles.sectionTitle}>Thinking Tools</h2>
                  <p>Practical tools and techniques for systemic thinking.</p>
                  {/* Add thinking tools content */}
                </div>
              )}

              {activeSection === 'cases' && (
                <div>
                  <h2 className={styles.sectionTitle}>Case Examples</h2>
                  <p>Real-world examples of systemic thinking in action.</p>
                  {/* Add case examples content */}
                </div>
              )}

              {activeSection === 'games' && (
                <div>
                  <h2 className={styles.sectionTitle}>Games & Activities</h2>
                  <p>Interactive exercises to practice systemic thinking.</p>
                  {/* Add games and activities content */}
                </div>
              )}

              {activeSection === 'culture' && (
                <div>
                  <h2 className={styles.sectionTitle}>Team Culture</h2>
                  <p>Building a culture of systemic thinking in teams.</p>
                  {/* Add team culture content */}
                </div>
              )}

              {activeSection === 'journey' && (
                <div>
                  <h2 className={styles.sectionTitle}>Journey Beyond</h2>
                  <p>Advanced concepts in systemic thinking.</p>
                  {/* Add journey beyond content */}
                </div>
              )}

              {activeSection === 'reflection' && (
                <div>
                  <h2 className={styles.sectionTitle}>Reflection Corner</h2>
                  <p>Document your progress in systemic thinking.</p>
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