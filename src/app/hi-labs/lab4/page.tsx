'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { InteractiveBrain, type RegionKey } from '@/components/interactive-brain/InteractiveBrain';
import styles from '../styles.module.css';

const labData = {
  id: 4,
  title: "The Power of Listening",
  description: "Master the art of deep listening and understanding others",
  activeRegions: ['Temporal' as RegionKey, 'Frontal' as RegionKey],
  brainParts: {
    'Temporal': {
      title: "Language and Emotion Processing Centers",
      description: "Regions responsible for understanding speech, tone, and emotional signals.",
      functions: [
        "Speech comprehension",
        "Emotional tone detection",
        "Social cue processing",
        "Voice recognition",
        "Auditory processing",
        "Emotional memory"
      ],
      details: [
        {
          name: "Temporal Lobes (Wernicke's Area)",
          role: "Your language decoder",
          functions: ["Speech comprehension", "Language processing", "Auditory processing", "Semantic memory"]
        },
        {
          name: "Superior Temporal Sulcus (STS)",
          role: "Your tone and emotion detector",
          functions: ["Voice tone analysis", "Facial expression processing", "Social cue detection", "Emotion recognition"]
        }
      ]
    },
    'Frontal': {
      title: "Social Understanding Network",
      description: "Areas that enable empathy and social cognition.",
      functions: [
        "Empathy processing",
        "Theory of mind",
        "Action understanding",
        "Emotional mirroring",
        "Social cognition",
        "Perspective taking"
      ],
      details: [
        {
          name: "Mirror Neuron System",
          role: "Your brain's empathy engine",
          functions: ["Action understanding", "Emotional mirroring", "Empathy processing", "Social learning"]
        },
        {
          name: "Medial Prefrontal Cortex (mPFC)",
          role: "Your social thinker",
          functions: ["Theory of mind", "Social cognition", "Self-awareness", "Emotional understanding"]
        }
      ]
    }
  }
};

export default function Lab4Page() {
  const router = useRouter();
  const [autoRotate, setAutoRotate] = useState(false);
  const [activeSection, setActiveSection] = useState('welcome');
  const [activeBrainRegion, setActiveBrainRegion] = useState<RegionKey>(labData.activeRegions[0]);

  const sections = {
    welcome: 'Welcome',
    brain: 'Brain Activation',
    tools: 'Listening Tools',
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
                  <h2 className={styles.sectionTitle}>HI LAB 4: {labData.title.toUpperCase()}</h2>
                  <div className={styles.sectionContent}>
                    <h3>Focus</h3>
                    <p className={styles.focusArea}>Listening deeply and Understanding others</p>
                    
                    <p>Welcome to Lab 4, where you'll develop the profound skill of deep listening - 
                    the foundation of meaningful connection, empathy, and understanding. This lab 
                    activates your brain's social cognition networks to enhance your ability to 
                    truly hear and understand others at multiple levels.</p>
                    
                    <p>Through targeted exercises, you'll strengthen your capacity to decode language, 
                    read emotional signals, understand perspectives, and respond with empathy and wisdom. 
                    Transform your relationships through the power of authentic listening.</p>

                    <div className={styles.outcomes}>
                      <h3>Lab Outcomes</h3>
                      <ul>
                        <li>Decode both words and emotions in communication</li>
                        <li>Develop empathy through mirror neuron activation</li>
                        <li>Read subtle cues in tone, expression, and body language</li>
                        <li>Understand others' thoughts, feelings, and perspectives</li>
                        <li>Build deeper, more meaningful connections through listening</li>
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
                  <h2 className={styles.sectionTitle}>Listening Tools</h2>
                  <p>Explore practical tools and techniques for deep listening.</p>
                  {/* Add listening tools content */}
                </div>
              )}

              {activeSection === 'cases' && (
                <div>
                  <h2 className={styles.sectionTitle}>Case Examples</h2>
                  <p>Learn from real-world scenarios and listening challenges.</p>
                  {/* Add case examples content */}
                </div>
              )}

              {activeSection === 'games' && (
                <div>
                  <h2 className={styles.sectionTitle}>Games & Activities</h2>
                  <p>Interactive exercises to strengthen your listening skills.</p>
                  {/* Add games and activities content */}
                </div>
              )}

              {activeSection === 'journey' && (
                <div>
                  <h2 className={styles.sectionTitle}>Journey Beyond</h2>
                  <p>Explore advanced listening and empathy concepts.</p>
                  {/* Add journey beyond content */}
                </div>
              )}

              {activeSection === 'reflection' && (
                <div>
                  <h2 className={styles.sectionTitle}>Reflection Corner</h2>
                  <p>Document your progress and insights in listening mastery.</p>
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