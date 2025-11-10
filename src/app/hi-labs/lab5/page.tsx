'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { InteractiveBrain, type RegionKey } from '@/components/interactive-brain/InteractiveBrain';
import styles from '../styles.module.css';

const labData = {
  id: 5,
  title: "Intelligent Conflict and Recovery",
  description: "Master the art of handling conflicts with wisdom and emotional intelligence",
  activeRegions: ['Frontal' as RegionKey, 'Temporal' as RegionKey, 'Cerebellum' as RegionKey],
  brainParts: {
    'Frontal': {
      title: "Emotional Regulation Centers",
      description: "Regions responsible for managing emotional responses in conflicts.",
      functions: [
        "Impulse control",
        "Response inhibition",
        "Value assessment",
        "Social adaptation",
        "Emotional balance",
        "Decision making"
      ],
      details: [
        {
          name: "Orbitofrontal Cortex (OFC)",
          role: "Emotional regulator",
          functions: ["Impulse control", "Response inhibition", "Value assessment", "Social adaptation"]
        },
        {
          name: "Ventromedial PFC",
          role: "Conflict resolution hub",
          functions: ["Emotional balance", "Decision making", "Social judgment", "Stress regulation"]
        }
      ]
    },
    'Temporal': {
      title: "Emotional Memory Network",
      description: "Areas that process emotional experiences and memories.",
      functions: [
        "Threat detection",
        "Emotional learning",
        "Memory formation",
        "Context processing",
        "Pattern recognition",
        "Emotional memory"
      ],
      details: [
        {
          name: "Amygdala",
          role: "Emotional response center",
          functions: ["Threat detection", "Emotional learning", "Stress response", "Fear modulation"]
        },
        {
          name: "Hippocampus",
          role: "Experience integrator",
          functions: ["Memory formation", "Context processing", "Pattern recognition", "Emotional memory"]
        }
      ]
    },
    'Cerebellum': {
      title: "Emotional Balance System",
      description: "Region that helps coordinate emotional responses and learning.",
      functions: [
        "Emotional timing",
        "Response refinement",
        "Learning from mistakes",
        "Behavioral adaptation"
      ],
      details: [
        {
          name: "Cerebellar Networks",
          role: "Response coordinator",
          functions: ["Emotional timing", "Response refinement", "Learning from mistakes", "Behavioral adaptation"]
        }
      ]
    }
  }
};

export default function Lab5Page() {
  const router = useRouter();
  const [autoRotate, setAutoRotate] = useState(true);
  const [activeSection, setActiveSection] = useState('welcome');
  const [activeBrainRegion, setActiveBrainRegion] = useState<RegionKey>(labData.activeRegions[0]);

  const sections = {
    welcome: 'Welcome',
    brain: 'Brain Activation',
    tools: 'Conflict Tools',
    cases: 'Case Studies',
    practice: 'Practice Sessions',
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
                  <h2 className={styles.sectionTitle}>HI LAB 5: {labData.title.toUpperCase()}</h2>
                  <div className={styles.sectionContent}>
                    <h3>Focus</h3>
                    <p className={styles.focusArea}>Handling conflicts with emotional maturity</p>
                    
                    <p>Welcome to Lab 5, where you'll master the art of handling conflicts with wisdom 
                    and emotional intelligence. This lab trains your brain to stay balanced during 
                    challenging situations, transforming conflicts from sources of stress into 
                    opportunities for growth and deeper understanding.</p>
                    
                    <p>Through scientifically-designed exercises, you'll strengthen your ability to 
                    regulate emotions, understand different perspectives, and navigate conflicts 
                    with clarity and compassion. Learn to recover quickly from emotional triggers 
                    and maintain relationships even in disagreement.</p>

                    <div className={styles.outcomes}>
                      <h3>Lab Outcomes</h3>
                      <ul>
                        <li>Develop emotional resilience during conflicts</li>
                        <li>Master quick recovery from triggering situations</li>
                        <li>Build skills for maintaining relationships through disagreements</li>
                        <li>Learn to transform conflicts into opportunities for growth</li>
                        <li>Create lasting patterns of wise response to challenges</li>
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
                  <h2 className={styles.sectionTitle}>Conflict Tools</h2>
                  <p>Explore practical tools and techniques for managing conflicts.</p>
                  {/* Add conflict tools content */}
                </div>
              )}

              {activeSection === 'cases' && (
                <div>
                  <h2 className={styles.sectionTitle}>Case Studies</h2>
                  <p>Learn from real-world conflict scenarios and their resolutions.</p>
                  {/* Add case studies content */}
                </div>
              )}

              {activeSection === 'practice' && (
                <div>
                  <h2 className={styles.sectionTitle}>Practice Sessions</h2>
                  <p>Interactive exercises to strengthen your conflict resolution skills.</p>
                  {/* Add practice sessions content */}
                </div>
              )}

              {activeSection === 'journey' && (
                <div>
                  <h2 className={styles.sectionTitle}>Journey Beyond</h2>
                  <p>Explore advanced conflict resolution concepts.</p>
                  {/* Add journey beyond content */}
                </div>
              )}

              {activeSection === 'reflection' && (
                <div>
                  <h2 className={styles.sectionTitle}>Reflection Corner</h2>
                  <p>Document your progress and insights in conflict resolution.</p>
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