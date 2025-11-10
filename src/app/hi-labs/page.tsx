'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { InteractiveBrain, type RegionKey } from '@/components/interactive-brain/InteractiveBrain';
import styles from './styles.module.css';

// Lab data with proper typing for Next.js implementation
const labData = {
  lab1: {
    id: 1,
    name: "Clarity as Culture",
    description: "Breaking confusion, Building thinking clarity",
    regions: ['Frontal' as RegionKey],
    brainParts: {
      'Frontal': {
        title: "Prefrontal Cortex & Anterior Cingulate Cortex",
        description: "The CEO of your thinking and error detection system",
        functions: ["Executive control", "Decision making", "Error detection", "Attention control"]
      }
    }
  },
  lab2: {
    id: 2,
    name: "Decision Making Without Drama",
    description: "Emotional Intelligence, decision-making",
    regions: ['Frontal' as RegionKey, 'Temporal' as RegionKey],
    brainParts: {
      'Frontal': {
        title: "Prefrontal Decision Centers",
        description: "Rational decision making and emotional regulation",
        functions: ["Decision processing", "Emotional regulation", "Planning", "Judgment"]
      },
      'Temporal': {
        title: "Emotional Memory Processing",
        description: "Memory integration with decision making",
        functions: ["Emotional processing", "Memory consolidation", "Social cognition"]
      }
    }
  },
  lab3: {
    id: 3,
    name: "Inner Focus in a Noisy World",
    description: "Improving focus and Reducing distractions",
    regions: ['Frontal' as RegionKey, 'Parietal' as RegionKey],
    brainParts: {
      'Frontal': {
        title: "Attention Control Network",
        description: "Executive attention and distraction management",
        functions: ["Sustained attention", "Task switching", "Inhibitory control"]
      },
      'Parietal': {
        title: "Spatial and Sensory Integration",
        description: "Processing and filtering sensory information",
        functions: ["Spatial attention", "Sensory integration", "Attention orientation"]
      }
    }
  },
  lab4: {
    id: 4,
    name: "The Power of Listening",
    description: "Listening deeply and Understanding others",
    regions: ['Temporal' as RegionKey, 'Frontal' as RegionKey],
    brainParts: {
      'Temporal': {
        title: "Auditory Processing Centers",
        description: "Language comprehension and social cue processing",
        functions: ["Language processing", "Social cognition", "Emotional recognition"]
      },
      'Frontal': {
        title: "Social Mirror Network",
        description: "Understanding others' intentions and emotions",
        functions: ["Empathy", "Social understanding", "Communication"]
      }
    }
  },
  lab5: {
    id: 5,
    name: "Intelligent Conflict and Recovery",
    description: "Handling conflicts with emotional maturity",
    regions: ['Frontal' as RegionKey, 'Temporal' as RegionKey, 'Cerebellum' as RegionKey],
    brainParts: {
      'Frontal': {
        title: "Emotional Regulation Center",
        description: "Managing emotions and conflict response",
        functions: ["Conflict resolution", "Emotional control", "Response inhibition"]
      },
      'Temporal': {
        title: "Emotional Memory & Learning",
        description: "Processing emotional experiences and memories",
        functions: ["Emotional processing", "Memory formation", "Pattern recognition"]
      },
      'Cerebellum': {
        title: "Emotional Balance",
        description: "Coordinating emotional responses",
        functions: ["Response timing", "Emotional balance", "Learning from experience"]
      }
    }
  },
  lab6: {
    id: 6,
    name: "Systematic Thinking",
    description: "Complex Thinking and Patterns forming",
    regions: ['Frontal' as RegionKey, 'Parietal' as RegionKey, 'Cerebellum' as RegionKey],
    brainParts: {
      'Frontal': {
        title: "Pattern Recognition Network",
        description: "Complex problem solving and pattern identification",
        functions: ["Pattern recognition", "Strategic thinking", "Problem solving"]
      },
      'Parietal': {
        title: "Information Integration Hub",
        description: "Connecting multiple streams of information",
        functions: ["Data integration", "Spatial reasoning", "Abstract thinking"]
      },
      'Cerebellum': {
        title: "Learning Optimization",
        description: "Fine-tuning cognitive processes",
        functions: ["Cognitive automation", "Skill refinement", "Process optimization"]
      }
    }
  },
  lab7: {
    id: 7,
    name: "Voice, Value, and Vulnerability",
    description: "Speaking truth and Building confidence",
    regions: ['Frontal' as RegionKey, 'Temporal' as RegionKey],
    brainParts: {
      'Frontal': {
        title: "Self-Expression Network",
        description: "Confidence and authentic communication",
        functions: ["Self-expression", "Confidence building", "Truth speaking"]
      },
      'Temporal': {
        title: "Social Understanding Center",
        description: "Processing social context and feedback",
        functions: ["Social awareness", "Communication", "Emotional expression"]
      }
    }
  },
  lab8: {
    id: 8,
    name: "Leadership Without Imitation",
    description: "Leading with originality and Inner clarity",
    regions: ['Frontal' as RegionKey, 'Parietal' as RegionKey],
    brainParts: {
      'Frontal': {
        title: "Leadership Command Center",
        description: "Original thinking and decision making",
        functions: ["Original thinking", "Decision making", "Vision creation"]
      },
      'Parietal': {
        title: "Strategic Integration Hub",
        description: "Connecting vision with execution",
        functions: ["Strategic planning", "Resource integration", "Execution planning"]
      }
    }
  }
};

export default function HILabsPage() {
  const router = useRouter();
  const [autoRotate, setAutoRotate] = useState(true);
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedLab, setSelectedLab] = useState('lab1');
  const [activeBrainRegion, setActiveBrainRegion] = useState<RegionKey>('Frontal');
  const [isolationOpacity, setIsolationOpacity] = useState(0.12);

  const sections = {
    overview: 'Lab Overview',
    brain: 'Brain Activation',
    exercises: 'Lab Exercises',
    progress: 'Progress Tracking'
  };

  // Function to handle lab selection
  const handleLabSelect = (labId: string) => {
    setSelectedLab(labId);
    const lab = labData[labId as keyof typeof labData];
    if (lab && lab.regions.length > 0) {
      setActiveBrainRegion(lab.regions[0]);
    }
  };

  return (
    <main className={styles.labContainer}>
      <div className={styles.contentOverlay} />
      
      <div className={styles.mainContent}>
        {/* Brain Viewer Section */}
        <div className={styles.brainViewerContainer}>
          <div className={styles.brainViewer}>
            <InteractiveBrain 
              activeRegions={selectedLab ? labData[selectedLab as keyof typeof labData].regions : [activeBrainRegion]}
              labHighlight={true}
              autoRotate={autoRotate}
              onRegionSelect={(region) => region && setActiveBrainRegion(region)}
              isolationOpacity={isolationOpacity}
            />
          </div>
        </div>

        {/* Header Section */}
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <div className={styles.headerLeft}>
              <Link href="/labs" className={styles.backButton}>
                ← Back to Labs
              </Link>
              <div className={styles.labTitle}>
                <h1>AARUCHUDAR HI LABS</h1>
                <p>Advanced Human Intelligence Research</p>
              </div>
            </div>
            <Link href="/" className={styles.homeButton}>
              Home
            </Link>
          </div>
        </header>

        {/* Main Content Grid */}
        <div className={styles.navigationSection}>
          <div className={styles.contentGrid}>
            {/* Navigation Sidebar */}
            <div className={styles.navSidebar}>
              <h2 className={styles.navTitle}>Lab Navigation</h2>
              <div className={styles.navButtons}>
                {Object.entries(sections).map(([key, title]) => (
                  <button
                    key={key}
                    onClick={() => setActiveSection(key)}
                    className={`${styles.navButton} ${
                      activeSection === key ? styles.navButtonActive : ''
                    }`}
                  >
                    {title}
                  </button>
                ))}
              </div>
              
              {/* Lab Selection Controls */}
              <div className={styles.labControls}>
                <h3 className={styles.labControlsTitle}>Select Lab</h3>
                <div className={styles.labButtons}>
                  {Object.entries(labData).map(([labId, lab]) => (
                    <button
                      key={labId}
                      onClick={() => {
                        handleLabSelect(labId);
                        router.push(`/hi-labs/${labId}`);
                      }}
                      className={`${styles.labButton} ${
                        selectedLab === labId ? styles.labButtonActive : ''
                      }`}
                    >
                      Lab {lab.id}: {lab.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brain Controls */}
              <div className={styles.brainControls}>
                <div className={styles.opacityControl}>
                  <label>Neural Isolation: {isolationOpacity.toFixed(2)}</label>
                  <input
                    type="range"
                    min="0.02"
                    max="0.9"
                    step="0.01"
                    value={isolationOpacity}
                    onChange={(e) => setIsolationOpacity(parseFloat(e.target.value))}
                  />
                </div>
                <button
                  onClick={() => setAutoRotate(!autoRotate)}
                  className={styles.rotateButton}
                >
                  {autoRotate ? 'Pause Rotation' : 'Auto Rotate'}
                </button>
              </div>
            </div>

            {/* Main Content Panel */}
            <div className={styles.mainPanel}>
              {selectedLab && labData[selectedLab as keyof typeof labData] && (
                <div className={styles.labContent}>
                  <h2 className={styles.labContentTitle}>
                    {labData[selectedLab as keyof typeof labData].name}
                  </h2>
                  
                  {activeSection === 'overview' && (
                    <div className={styles.overviewSection}>
                      <p className={styles.labDescription}>
                        {labData[selectedLab as keyof typeof labData].description}
                      </p>
                      <div className={styles.labHighlights}>
                        <h3>Key Focus Areas</h3>
                        <ul>
                          {labData[selectedLab as keyof typeof labData].regions.map((region) => (
                            <li key={region}>
                              {labData[selectedLab as keyof typeof labData].brainParts[region]?.title}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {activeSection === 'brain' && (
                    <div className={styles.brainSection}>
                      <div className={styles.regionDetails}>
                        {labData[selectedLab as keyof typeof labData].regions.map((region) => (
                          <div key={region} className={styles.regionCard}>
                            <h3>{labData[selectedLab as keyof typeof labData].brainParts[region]?.title}</h3>
                            <p>{labData[selectedLab as keyof typeof labData].brainParts[region]?.description}</p>
                            <div className={styles.functions}>
                              {labData[selectedLab as keyof typeof labData].brainParts[region]?.functions.map((func, i) => (
                                <span key={i} className={styles.function}>{func}</span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeSection === 'exercises' && (
                    <div className={styles.exercisesSection}>
                      <div className={styles.exerciseCards}>
                        <div className={styles.exerciseCard}>
                          <h3>Cognitive Training</h3>
                          <p>Interactive exercises designed to strengthen neural pathways.</p>
                        </div>
                        <div className={styles.exerciseCard}>
                          <h3>Practical Applications</h3>
                          <p>Real-world scenarios for applying learned cognitive skills.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeSection === 'progress' && (
                    <div className={styles.progressSection}>
                      <div className={styles.progressCards}>
                        <div className={styles.progressCard}>
                          <h3>Neural Metrics</h3>
                          <p>Track improvements in brain region activation and function.</p>
                        </div>
                        <div className={styles.progressCard}>
                          <h3>Performance Analytics</h3>
                          <p>Detailed analysis of cognitive enhancement progress.</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
