'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './styles.module.css';
import { InteractiveBrain, RegionKey, REGION_INFO } from '@/components/interactive-brain/InteractiveBrain';
import { Search, ArrowRight } from 'lucide-react';

// Define swatch colors (mirror BrainScene)
const REGION_COLORS: Record<RegionKey, string> = {
  Frontal: '#3B82F6',
  Parietal: '#10B981',
  Temporal: '#F59E0B',
  Occipital: '#EF4444',
  Cerebellum: '#8B5CF6',
  Brainstem: '#06B6D4'
};

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
  const [isolationOpacity, setIsolationOpacity] = useState(0.06); // lowered default transparency
  const [selectedLab, setSelectedLab] = useState<keyof typeof LAB_BRAIN_MAP | null>(null);
  const [labStats, setLabStats] = useState<LabStatsMap>({});
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleLabClick = (labKey: keyof typeof LAB_BRAIN_MAP) => {
    // Toggle same lab off if clicking again
    setSelectedLab(prev => prev === labKey ? null : labKey);
    setSelectedRegion(null); // prioritize lab mapping when lab selected
  };

  const navigateToLab = (labNumber: number) => {
    router.push(`/hi-labs/lab${labNumber}`);
  };

  const clearSelection = () => {
    setSelectedLab(null);
    setSelectedRegion(null);
  };

  const filteredLabs = Object.entries(LAB_BRAIN_MAP).filter(([_, lab]) => {
    const q = searchQuery.toLowerCase();
    return !q || lab.name.toLowerCase().includes(q) || lab.description.toLowerCase().includes(q);
  });

  return (
    <div className={styles.hiLabsContainer}>
      {/* Lab Neural Mapping + Brain Filter Panel */}
      <div className={styles.labMappingGrid}>
        <div className={styles.brainFilterPanel}>
          <h2 className={styles.panelTitle}>Interactive 3D Brain</h2>
          <p className={styles.panelSubtitle}>Rotate the neural model with mouse drag, zoom with scroll. Click any brain region to isolate it and explore neural pathways.</p>
          <div className={styles.brainFilterButtons}>
            <button
              className={`${styles.brainFilterBtn} ${(!selectedRegion && !selectedLab) ? styles.brainFilterBtnActive : ''}`}
              onClick={() => { setSelectedRegion(null); setSelectedLab(null); }}
            >Show All</button>
            {(Object.keys(REGION_INFO) as RegionKey[]).map((region, idx) => (
              <button
                key={region}
                className={`${styles.brainFilterBtn} ${selectedRegion === region ? styles.brainFilterBtnActive : ''}`}
                onClick={() => { setSelectedRegion(region); setSelectedLab(null); }}
              >{idx+1}. {region}</button>
            ))}
            <button
              className={styles.resetMapBtn}
              onClick={clearSelection}
            >Reset Neural Map</button>
          </div>
          <div className={styles.networkMappingBlock}>
            <h4>Neural Network Mapping:</h4>
            <ul className={styles.networkList}>
              {(Object.keys(REGION_INFO) as RegionKey[]).map((region, idx) => (
                <li key={region} className={styles.networkItem}>
                  <span className={styles.networkDot} style={{ background: REGION_COLORS[region] }} />
                  <span>{idx+1}. {REGION_INFO[region].title}</span>
                </li>
              ))}
            </ul>
            <div className={styles.opacityControlInline}>
              <label>Neural Isolation Opacity: {isolationOpacity.toFixed(2)}</label>
              <input type="range" min={0.02} max={0.5} step={0.01} value={isolationOpacity} onChange={e=>setIsolationOpacity(parseFloat(e.target.value))} />
            </div>
          </div>
        </div>
        <div className={styles.labMappingPanel}>
          <h3 className={styles.panelTitleSecondary}>Lab Neural Mapping</h3>
          <div className={styles.labMappingButtons}>
            {Object.keys(LAB_BRAIN_MAP).map((labKey, i) => {
              const active = selectedLab === labKey;
              return (
                <button
                  key={labKey}
                  className={`${styles.labMapBtn} ${active ? styles.labMapBtnActive : ''}`}
                  onClick={() => handleLabClick(labKey as keyof typeof LAB_BRAIN_MAP)}
                  title={LAB_BRAIN_MAP[labKey as keyof typeof LAB_BRAIN_MAP].name}
                >Lab {i+1}</button>
              );
            })}
          </div>
          <div className={styles.labMappingActions}>
            <button onClick={clearSelection} className={styles.clearAllBtn}>Clear All</button>
            {selectedLab && (
              <button onClick={() => navigateToLab(Object.keys(LAB_BRAIN_MAP).indexOf(selectedLab)+1)} className={styles.exploreLabBtn}>Explore Lab →</button>
            )}
          </div>
          <p className={styles.mappingHint}>Select a lab to highlight its active brain regions in the 3D model</p>
          {selectedLab && (
            <div className={styles.activeLabDetails}>
              <div className={styles.activeLabHeader}>NEURAL SCAN ACTIVE</div>
              <h4>{LAB_BRAIN_MAP[selectedLab].name}</h4>
              <p>{LAB_BRAIN_MAP[selectedLab].description}</p>
              <div className={styles.activeRegionsWrap}>
                {LAB_BRAIN_MAP[selectedLab].regions.map(r => (
                  <span key={r} className={styles.activeRegionTag} style={{ background: REGION_COLORS[r] }}>{r}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={styles.brainModelSection}>
        <InteractiveBrain
          activeRegions={selectedRegion ? [selectedRegion] : (selectedLab ? LAB_BRAIN_MAP[selectedLab].regions : [])}
          labHighlight={!!(selectedRegion || selectedLab)}
          autoRotate={!selectedLab && !selectedRegion}
          onRegionSelect={setSelectedRegion}
          isolationOpacity={isolationOpacity}
        />
      </div>

      {/* Region Legend */}
      <div className={styles.regionLegend}>
        {Object.keys(REGION_INFO).map((key) => {
          const region = key as RegionKey;
          const active = selectedRegion === region || (selectedLab && LAB_BRAIN_MAP[selectedLab].regions.includes(region));
          return (
            <div
              key={region}
              className={`${styles.regionLegendItem} ${active ? styles.regionLegendActive : ''}`}
              onClick={() => setSelectedRegion(region)}
              style={{borderColor: active ? '#06ffa5' : undefined}}
            >
              <span className={styles.regionSwatch} style={{background: REGION_COLORS[region]}} />
              <span style={{color:'#fff'}}>{REGION_INFO[region].title}</span>
            </div>
          );
        })}
      </div>
      { (selectedLab || selectedRegion) && (
        <button className={styles.clearSelectionBtn} onClick={clearSelection}>✖ Clear Selection</button>
      )}
      {/* Opacity control */}
      <div style={{maxWidth:'380px',margin:'0 auto 2.5rem'}}>
        <label style={{display:'block',color:'#cbd5e1',fontSize:'0.75rem',marginBottom:4}}>Non-active region transparency ({isolationOpacity.toFixed(2)})</label>
        <input type="range" min={0.02} max={0.5} step={0.01} value={isolationOpacity} onChange={e=>setIsolationOpacity(parseFloat(e.target.value))} style={{width:'100%'}} />
      </div>

      <div className={styles.labsHeader}>
        <h1>Human Intelligence Labs</h1>
        <p>Explore our advanced human intelligence research facilities and cutting-edge brain analysis tools</p>
      </div>

      <div style={{maxWidth:'520px',margin:'0 auto 2rem',display:'flex',gap:'0.5rem',alignItems:'center'}}>
        <div style={{position:'relative',flex:1}}>
          <Search size={18} style={{position:'absolute',left:10,top:'50%',transform:'translateY(-50%)',color:'#06ffa5'}} />
          <input
            value={searchQuery}
            onChange={e=>setSearchQuery(e.target.value)}
            placeholder="Search labs by name or description"
            style={{width:'100%',padding:'0.75rem 0.75rem 0.75rem 2.2rem',borderRadius:8,border:'1px solid rgba(6,255,165,0.3)',background:'rgba(6,255,165,0.05)',color:'#fff',outline:'none'}}
          />
        </div>
        {searchQuery && (
          <button onClick={()=>setSearchQuery('')} style={{padding:'0.65rem 0.9rem',borderRadius:8,border:'1px solid rgba(6,255,165,0.3)',background:'rgba(6,255,165,0.1)',cursor:'pointer',color:'#06ffa5'}}>Clear</button>
        )}
      </div>

      <div className={styles.labsGrid}>
        {filteredLabs.map(([key, lab], index) => {
          const labNumber = Object.keys(LAB_BRAIN_MAP).indexOf(key) + 1;
          const stats = labStats[key];
          
          return (
            <div 
              key={key} 
              className={styles.labCard} 
              onClick={() => handleLabClick(key as keyof typeof LAB_BRAIN_MAP)}
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

                <button onClick={(e)=>{e.stopPropagation(); navigateToLab(labNumber);}} className={styles.exploreButton} style={{display:'flex',justifyContent:'center',alignItems:'center',gap:6}}>
                  Open Lab {labNumber} <ArrowRight size={18} />
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