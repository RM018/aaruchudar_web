'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from '../app/hi-labs/styles.module.css';

const LABS = [
  {
    id: 1,
    name: "Clarity as Culture",
    description: "Breaking confusion, Building thinking clarity",
    regions: ["Frontal"],
    details: "Activates Prefrontal Cortex and Anterior Cingulate Cortex for clear thinking and error detection"
  },
  {
    id: 2,
    name: "Decision Making Without Drama",
    description: "Emotional Intelligence, decision-making",
    regions: ["Frontal", "Temporal"],
    details: "Activates multiple prefrontal regions, amygdala, and insula for balanced decision-making"
  },
  {
    id: 3,
    name: "Inner Focus in a Noisy World",
    description: "Improving focus and Reducing distractions",
    regions: ["Frontal", "Parietal"],
    details: "Activates attention networks, basal ganglia, and insula for sustained focus"
  },
  {
    id: 4,
    name: "The Power of Listening",
    description: "Listening deeply and Understanding others",
    regions: ["Temporal", "Frontal"],
    details: "Activates temporal lobes, mirror neuron system, and social cognition networks"
  },
  {
    id: 5,
    name: "Intelligent Conflict and Recovery",
    description: "Handling conflicts with emotional maturity",
    regions: ["Frontal", "Temporal", "Cerebellum"],
    details: "Activates amygdala, orbitofrontal cortex, hippocampus, and prefrontal regions"
  },
  {
    id: 6,
    name: "Systematic Thinking",
    description: "Complex Thinking and Patterns forming",
    regions: ["Frontal", "Parietal", "Cerebellum"],
    details: "Activates prefrontal cortex, parietal regions, precuneus, and cerebellum"
  },
  {
    id: 7,
    name: "Voice, Value, and Vulnerability",
    description: "Speaking truth and Building confidence",
    regions: ["Frontal", "Temporal"],
    details: "Activates ventromedial prefrontal cortex, insula, PAG, and posterior cingulate"
  },
  {
    id: 8,
    name: "Leadership Without Imitation",
    description: "Leading with originality and Inner clarity",
    regions: ["Frontal", "Parietal"],
    details: "Activates medial and ventrolateral prefrontal regions, default mode network, and motor circuits"
  }
];

const HILabs = () => {
  const router = useRouter();

  const handleLabClick = (labId: number) => {
    router.push(`/hi-labs/lab${labId}`);
  };

  return (
    <div className={styles.hiLabsContainer}>
      <div className={styles.labsHeader}>
        <h1>Human Intelligence Labs</h1>
        <p>Explore our advanced human intelligence research facilities and cutting-edge brain analysis tools</p>
      </div>

      <div className={styles.labsGrid}>
        {LABS.map((lab) => (
          <div key={lab.id} className={styles.labCard} onClick={() => handleLabClick(lab.id)}>
            <div className={styles.labContent}>
              <div className={styles.labIcon}>🧪</div>
              <h3>{lab.name}</h3>
              <p>{lab.description}</p>
              
              <div className={styles.labRegions}>
                <h4>Active Brain Regions:</h4>
                <div className={styles.regionTags}>
                  {lab.regions.map((region, index) => (
                    <span key={index} className={styles.regionTag}>
                      {region}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.labStats}>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>{Math.floor(Math.random() * 50) + 20}</span>
                  <span className={styles.statLabel}>Experiments</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>{Math.floor(Math.random() * 100) + 50}%</span>
                  <span className={styles.statLabel}>Success Rate</span>
                </div>
              </div>

              <button className={styles.exploreButton}>
                Explore Lab {lab.id}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.dashboardPromo}>
        <div className={styles.promoContent}>
          <h2>Download Research Dashboard</h2>
          <p>Access comprehensive analytics and visualization tools for brain pattern analysis</p>
          <button className={styles.downloadButton}>
            Get Sample Report ⬇️
          </button>
        </div>
      </div>
    </div>
  );
};

export default HILabs;