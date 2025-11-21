'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './styles.module.css';
import { InteractiveBrain, RegionKey } from '@/components/interactive-brain/InteractiveBrain';

const LAB_BRAIN_MAP = {
  lab1: {
    name: "Clarity as Culture",
    description: "Breaking confusion, Building thinking clarity",
    regions: ["Frontal"] as RegionKey[],
    details: "Activates Prefrontal Cortex and Anterior Cingulate Cortex for clear thinking and error detection"
  },
  lab2: {
    name: "Decision Making Without Drama",
    description: "Emotional Intelligence, decision-making",
    regions: ["Frontal", "Temporal"] as RegionKey[],
    details: "Activates multiple prefrontal regions, amygdala, and insula for balanced decision-making"
  },
  lab3: {
    name: "Inner Focus in a Noisy World",
    description: "Improving focus and Reducing distractions",
    regions: ["Frontal", "Parietal"] as RegionKey[],
    details: "Activates attention networks, basal ganglia, and insula for sustained focus"
  },
  lab4: {
    name: "The Power of Listening",
    description: "Listening deeply and Understanding others",
    regions: ["Temporal", "Frontal"] as RegionKey[],
    details: "Activates temporal lobes, mirror neuron system, and social cognition networks"
  },
  lab5: {
    name: "Intelligent Conflict and Recovery",
    description: "Handling conflicts with emotional maturity",
    regions: ["Frontal", "Temporal", "Cerebellum"] as RegionKey[],
    details: "Activates amygdala, orbitofrontal cortex, hippocampus, and prefrontal regions"
  },
  lab6: {
    name: "Systematic Thinking",
    description: "Complex Thinking and Patterns forming",
    regions: ["Frontal", "Parietal", "Cerebellum"] as RegionKey[],
    details: "Activates prefrontal cortex, parietal regions, precuneus, and cerebellum"
  },
  lab7: {
    name: "Voice, Value, and Vulnerability",
    description: "Speaking truth and Building confidence",
    regions: ["Frontal", "Temporal"] as RegionKey[],
    details: "Activates ventromedial prefrontal cortex, insula, PAG, and posterior cingulate"
  },
  lab8: {
    name: "Leadership Without Imitation",
    description: "Leading with originality and Inner clarity",
    regions: ["Frontal", "Parietal"] as RegionKey[],
    details: "Activates medial and ventrolateral prefrontal regions, default mode network, and motor circuits"
  }
} as const;

interface LabStats {
  experiments: number;
  successRate: number;
}

type LabStatsMap = {
  [key: string]: LabStats;
};

export default function HILabs() {
  const router = useRouter();
  const [selectedRegion, setSelectedRegion] = useState<RegionKey | null>(null);
  const [isolationOpacity, setIsolationOpacity] = useState(0.12);
  const [selectedLab, setSelectedLab] = useState<keyof typeof LAB_BRAIN_MAP | null>(null);
  const [labStats, setLabStats] = useState<LabStatsMap>({});

  // Generate random stats once when component mounts
  useEffect(() => {
    const stats: LabStatsMap = {};
    Object.keys(LAB_BRAIN_MAP).forEach(key => {
      stats[key] = {
        experiments: Math.floor(Math.random() * 50) + 20,
        successRate: Math.floor(Math.random() * 100) + 50
      };
    });
    setLabStats(stats);
  }, []);

  const handleLabClick = (labId: number) => {
    router.push(`/hi-labs/lab${labId}`);
  };

  return (
    <div className={styles.hiLabsContainer}>
      <div className={styles.brainModelSection}>
        <InteractiveBrain
          activeRegions={selectedLab ? LAB_BRAIN_MAP[selectedLab].regions as RegionKey[] : []}
          labHighlight={!!selectedLab}
          autoRotate={!selectedLab && !selectedRegion}
          onRegionSelect={setSelectedRegion}
          isolationOpacity={isolationOpacity}
        />
      </div>
      
      <div className={styles.labsHeader}>
        <h1>Human Intelligence Labs</h1>
        <p>Explore our advanced human intelligence research facilities and cutting-edge brain analysis tools</p>
      </div>

      <div className={styles.labsGrid}>
        {Object.entries(LAB_BRAIN_MAP).map(([key, lab], index) => {
          const labNumber = index + 1;
          const stats = labStats[key];
          
          return (
            <div 
              key={key} 
              className={styles.labCard} 
              onClick={() => handleLabClick(labNumber)}
            >
              <div className={styles.labContent}>
                <div className={styles.labIcon}>🧪</div>
                <h3>{lab.name}</h3>
                <p>{lab.description}</p>
                
                <div className={styles.labRegions}>
                  <h4>Active Brain Regions:</h4>
                  <div className={styles.regionTags}>
                    {lab.regions.map((region, i) => (
                      <span key={i} className={styles.regionTag}>
                        {region}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={styles.labStats}>
                  <div className={styles.statItem}>
                    <span className={styles.statValue}>
                      {stats?.experiments || '-'}
                    </span>
                    <span className={styles.statLabel}>Experiments</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statValue}>
                      {stats?.successRate ? `${stats.successRate}%` : '-'}
                    </span>
                    <span className={styles.statLabel}>Success Rate</span>
                  </div>
                </div>

                <button className={styles.exploreButton}>
                  Explore Lab {labNumber}
                </button>
              </div>
            </div>
          );
        })}
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
}