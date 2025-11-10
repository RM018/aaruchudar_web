'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { InteractiveBrain, type RegionKey } from '@/components/interactive-brain/InteractiveBrain';
import styles from '../styles.module.css';

const labData = {
  id: 8,
  title: "Leadership and Influence",
  description: "Master the art of authentic leadership and positive influence",
  activeRegions: ['Frontal' as RegionKey, 'Temporal' as RegionKey, 'Parietal' as RegionKey],
  brainParts: {
    'Frontal': {
      title: "Leadership Command Center",
      description: "Regions responsible for executive function and social influence.",
      functions: [
        "Social cognition",
        "Strategic planning",
        "Value assessment",
        "Decision making",
        "Social adaptation",
        "Emotional insight"
      ],
      details: [
        {
          name: "Medial PFC",
          role: "Social strategist",
          functions: ["Social cognition", "Strategic planning", "Value assessment", "Decision making"]
        },
        {
          name: "Orbitofrontal Cortex",
          role: "Emotional intelligence hub",
          functions: ["Social adaptation", "Reward processing", "Behavior regulation", "Emotional insight"]
        }
      ]
    },
    'Temporal': {
      title: "Social Understanding Network",
      description: "Areas that process social signals and group dynamics.",
      functions: [
        "Social perception",
        "Intention reading",
        "Non-verbal cues",
        "Group dynamics",
        "Social knowledge",
        "Cultural understanding"
      ],
      details: [
        {
          name: "Superior Temporal Sulcus",
          role: "Social signal processor",
          functions: ["Social perception", "Intention reading", "Non-verbal cues", "Group dynamics"]
        },
        {
          name: "Temporal Poles",
          role: "Social context integrator",
          functions: ["Social knowledge", "Story comprehension", "Value integration", "Cultural understanding"]
        }
      ]
    },
    'Parietal': {
      title: "Social Navigation Network",
      description: "Regions that help understand and navigate social spaces.",
      functions: [
        "Mental state attribution",
        "Empathy",
        "Social prediction",
        "Action understanding",
        "Social positioning",
        "Status perception"
      ],
      details: [
        {
          name: "Temporoparietal Junction",
          role: "Perspective taking center",
          functions: ["Mental state attribution", "Empathy", "Social prediction", "Action understanding"]
        },
        {
          name: "Inferior Parietal Lobule",
          role: "Social space navigator",
          functions: ["Social positioning", "Group awareness", "Status perception", "Action planning"]
        }
      ]
    }
  }
};

export default function Lab8Page() {
  const router = useRouter();
  const [autoRotate, setAutoRotate] = useState(true);
  const [activeSection, setActiveSection] = useState('welcome');
  const [activeBrainRegion, setActiveBrainRegion] = useState<RegionKey>(labData.activeRegions[0]);

  const sections = {
    welcome: 'Welcome',
    brain: 'Brain Activation',
    tools: 'Leadership Tools',
    practice: 'Influence Practice',
    cases: 'Case Studies',
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
                  <h2 className={styles.sectionTitle}>HI LAB 8: {labData.title.toUpperCase()}</h2>
                  <div className={styles.sectionContent}>
                    <h3>Focus</h3>
                    <p className={styles.focusArea}>Developing Leadership Presence and Influence</p>
                    
                    <p>Welcome to Lab 8, where you'll develop the neural networks responsible for 
                    authentic leadership and positive influence. This lab strengthens your brain's 
                    social cognition systems, helping you understand and guide others while 
                    maintaining genuine connection and trust.</p>
                    
                    <p>Through advanced social-emotional training, you'll enhance your ability to read 
                    group dynamics, inspire others, and create positive change while staying true 
                    to your values. Master the art of leading with both wisdom and heart.</p>

                    <div className={styles.outcomes}>
                      <h3>Lab Outcomes</h3>
                      <ul>
                        <li>Develop authentic leadership presence</li>
                        <li>Master the art of positive influence</li>
                        <li>Build strong social understanding and empathy</li>
                        <li>Learn to inspire and motivate others effectively</li>
                        <li>Create lasting positive impact in your sphere of influence</li>
                        <li>Lead with both strategic vision and emotional intelligence</li>
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
                  <h2 className={styles.sectionTitle}>Leadership Tools</h2>
                  <p>Explore practical tools for developing leadership capabilities.</p>
                  {/* Add leadership tools content */}
                </div>
              )}

              {activeSection === 'practice' && (
                <div>
                  <h2 className={styles.sectionTitle}>Influence Practice</h2>
                  <p>Practice exercises for developing positive influence skills.</p>
                  {/* Add influence practice content */}
                </div>
              )}

              {activeSection === 'cases' && (
                <div>
                  <h2 className={styles.sectionTitle}>Case Studies</h2>
                  <p>Learn from real-world leadership scenarios and solutions.</p>
                  {/* Add case studies content */}
                </div>
              )}

              {activeSection === 'journey' && (
                <div>
                  <h2 className={styles.sectionTitle}>Journey Beyond</h2>
                  <p>Explore advanced leadership and influence concepts.</p>
                  {/* Add journey beyond content */}
                </div>
              )}

              {activeSection === 'reflection' && (
                <div>
                  <h2 className={styles.sectionTitle}>Reflection Corner</h2>
                  <p>Document your growth in leadership and influence.</p>
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