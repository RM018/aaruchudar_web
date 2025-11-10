import React, { useRef, useState, Suspense, useMemo, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stage, useGLTF, Html, Loader } from '@react-three/drei'
import * as THREE from 'three'
import AaruchudarLogo from './assets/A_Logo.png'
import Lab1 from './Lab1'
import Lab2 from './Lab2'
import Lab3 from './Lab3'
import Lab4 from './Lab4'
import Lab5 from './Lab5'
import Lab6 from './Lab6'
import Lab7 from './Lab7'
import Lab8 from './Lab8'

/**
 * LAB TO BRAIN REGION MAPPING
 * Each lab activates specific brain regions for targeted neural analysis
 * Updated according to detailed lab specifications
 */
const LAB_BRAIN_MAP = {
  lab1: {
    name: "Clarity as Culture",
    description: "Breaking confusion, Building thinking clarity",
    regions: ["Frontal"], // Prefrontal Cortex (PFC) + Anterior Cingulate Cortex (ACC)
    details: "Activates Prefrontal Cortex and Anterior Cingulate Cortex for clear thinking and error detection"
  },
  lab2: {
    name: "Decision Making Without Drama",
    description: "Emotional Intelligence, decision-making",
    regions: ["Frontal", "Temporal"], // vmPFC, dlPFC, Amygdala, Anterior Insula
    details: "Activates multiple prefrontal regions, amygdala, and insula for balanced decision-making"
  },
  lab3: {
    name: "Inner Focus in a Noisy World",
    description: "Improving focus and Reducing distractions",
    regions: ["Frontal", "Parietal"], // Dorsal Attention Network, Default Mode Network, Basal Ganglia, Anterior Insula
    details: "Activates attention networks, basal ganglia, and insula for sustained focus"
  },
  lab4: {
    name: "The Power of Listening",
    description: "Listening deeply and Understanding others",
    regions: ["Temporal", "Frontal"], // Temporal Lobes (Wernicke's), Mirror Neurons, mPFC, STS
    details: "Activates temporal lobes, mirror neuron system, and social cognition networks"
  },
  lab5: {
    name: "Intelligent Conflict and Recovery",
    description: "Handling conflicts with emotional maturity",
    regions: ["Frontal", "Temporal", "Cerebellum"], // Amygdala, OFC, Hippocampus, PFC
    details: "Activates amygdala, orbitofrontal cortex, hippocampus, and prefrontal regions"
  },
  lab6: {
    name: "Systematic Thinking",
    description: "Complex Thinking and Patterns forming",
    regions: ["Frontal", "Parietal", "Cerebellum"], // PFC, Posterior Parietal Cortex, Precuneus, Cerebellum
    details: "Activates prefrontal cortex, parietal regions, precuneus, and cerebellum"
  },
  lab7: {
    name: "Voice, Value, and Vulnerability",
    description: "Speaking truth and Building confidence",
    regions: ["Frontal", "Temporal"], // vmPFC, Anterior Insula, PAG, PCC
    details: "Activates ventromedial prefrontal cortex, insula, PAG, and posterior cingulate"
  },
  lab8: {
    name: "Leadership Without Imitation",
    description: "Leading with originality and Inner clarity",
    regions: ["Frontal", "Parietal"], // mPFC, vlPFC, DMN, Fronto-Striatal Circuits
    details: "Activates medial and ventrolateral prefrontal regions, default mode network, and motor circuits"
  }
}

/**
 * REGION metadata
 * Edit text here if you want to change the info shown on click.
 */
const REGION_INFO = {
  Frontal: {
    title: 'Frontal Lobe',
    short: 'Decision-making, planning, voluntary movement, speech (Broca area).',
    details:
      'The frontal lobe is involved in higher cognitive functions such as planning, reasoning, problem-solving, and controlling voluntary movements and speech. It also contributes to personality and emotional regulation.'
  },
  Parietal: {
    title: 'Parietal Lobe',
    short: 'Sensory integration, spatial attention, touch perception.',
    details:
      'The parietal lobe processes sensory information from different parts of the body and integrates visual and spatial information to guide movement and attention.'
  },
  Temporal: {
    title: 'Temporal Lobe',
    short: 'Memory, language comprehension, auditory processing.',
    details:
      'The temporal lobe plays a key role in processing auditory information and is important for the formation of long-term memory and language comprehension.'
  },
  Occipital: {
    title: 'Occipital Lobe',
    short: 'Primary visual processing center.',
    details:
      'Primarily responsible for processing visual information, including identification of shapes, colors, and motion.'
  },
  Cerebellum: {
    title: 'Cerebellum',
    short: 'Coordination, balance, fine motor control.',
    details:
      "Although small in volume, the cerebellum contains a large fraction of the brain's neurons and is essential for motor coordination, timing, and motor learning."
  },
  Brainstem: {
    title: 'Brainstem',
    short: 'Autonomic functions: breathing, heart rate, arousal.',
    details:
      'The brainstem controls basic life-sustaining functions such as breathing, heart rate, and sleep-wake cycles, and serves as a conduit between the brain and spinal cord.'
  }
}

/* map mesh name -> region key by substring matching */
function nameToRegionKey(name, meshIndex = 0) {
  if (!name) return null
  const n = name.toLowerCase()
  
  // Log mesh names for debugging
  console.log('Mesh name:', name, '-> normalized:', n)
  
  // More comprehensive matching patterns
  if (n.includes('frontal') || n.includes('front')) return 'Frontal'
  if (n.includes('parietal') || n.includes('pariet')) return 'Parietal'
  if (n.includes('temporal') || n.includes('tempor')) return 'Temporal'
  if (n.includes('occipital') || n.includes('occipit')) return 'Occipital'
  if (n.includes('cerebell') || n.includes('cerebel')) return 'Cerebellum'
  if (n.includes('brainstem') || n.includes('stem') || n.includes('brain_stem')) return 'Brainstem'
  
  // Additional common brain region names
  if (n.includes('cortex') || n.includes('lobe')) {
    if (n.includes('front')) return 'Frontal'
    if (n.includes('pariet')) return 'Parietal'
    if (n.includes('temp')) return 'Temporal'
    if (n.includes('occip')) return 'Occipital'
  }
  
  // Handle numbered patterns (001, 002, etc.)
  if (n.includes('001') || n.includes('_1') || n.includes('1_')) return 'Frontal'
  if (n.includes('002') || n.includes('_2') || n.includes('2_')) return 'Parietal'
  if (n.includes('003') || n.includes('_3') || n.includes('3_')) return 'Temporal'
  if (n.includes('004') || n.includes('_4') || n.includes('4_')) return 'Occipital'
  if (n.includes('005') || n.includes('_5') || n.includes('5_')) return 'Cerebellum'
  if (n.includes('006') || n.includes('_6') || n.includes('6_')) return 'Brainstem'
  
  // Use mesh index for even distribution
  const regions = ['Frontal', 'Parietal', 'Temporal', 'Occipital', 'Cerebellum', 'Brainstem']
  const assignedRegion = regions[meshIndex % regions.length]
  
  console.log(`Assigning mesh "${name}" (index: ${meshIndex}) to region: ${assignedRegion}`)
  
  return assignedRegion
}

/* Enhanced BrainScene component - supports both single region and lab-based multi-region highlighting */
function BrainScene({ 
  url = '/models/brain_areas.glb', 
  selectedRegion, 
  setSelectedRegion, 
  isolationOpacity,
  selectedLab,
  setSelectedLab,
  autoRotate
}) {
  const gltf = useGLTF(url)
  const scene = gltf.scene
  const [hoveredRegion, setHoveredRegion] = useState(null)
  const [hoveredMesh, setHoveredMesh] = useState(null)
  const [hoveredPosition, setHoveredPosition] = useState([0, 0, 0])

  // Define colors for each brain region
  const regionColors = {
    'Frontal': 0x3B82F6,    // Blue
    'Parietal': 0x10B981,   // Green  
    'Temporal': 0xF59E0B,   // Orange
    'Occipital': 0xEF4444,  // Red
    'Cerebellum': 0x8B5CF6, // Purple
    'Brainstem': 0x06B6D4   // Cyan
  }
  
  // Lab highlight color (brighter for lab mode)
  const labHighlightColor = 0x06FFA5 // Bright green
  
  // Get active regions based on selected lab
  const activeRegions = selectedLab ? LAB_BRAIN_MAP[selectedLab]?.regions || [] : []
  
  // gather meshes and prepare materials
  const meshes = useMemo(() => {
    const m = []
    const regions = ['Frontal', 'Parietal', 'Temporal', 'Occipital', 'Cerebellum', 'Brainstem']
    
    scene.traverse((child) => {
      if (child.isMesh) {
        // clone material so changes don't affect shared material
        child.material = child.material.clone()
        child.material.transparent = true
        
        // Use the mesh array index for distribution instead of a counter
        const regionIndex = m.length % regions.length
        const regionKey = regions[regionIndex]
        child.userData.regionKey = regionKey
        
        // Force set color
        if (regionColors[regionKey]) {
          child.material.color.setHex(regionColors[regionKey])
          console.log(`Mesh ${m.length}: "${child.name}" -> ${regionKey} (${regionIndex}) -> #${regionColors[regionKey].toString(16)}`)
        }
        
        m.push(child)
      }
    })
    
    console.log('=== FINAL MESH DISTRIBUTION ===')
    console.log('Total meshes:', m.length)
    const distribution = {}
    m.forEach((mesh, i) => {
      const region = mesh.userData.regionKey
      distribution[region] = (distribution[region] || 0) + 1
      console.log(`${i}: ${mesh.name} -> ${region}`)
    })
    console.log('Region distribution:', distribution)
    
    return m
  }, [scene, regionColors])

  useEffect(() => {
    meshes.forEach((mesh) => {
      const r = mesh.userData.regionKey
      const isHovered = mesh === hoveredMesh
      
      // Lab mode: highlight specific regions for the selected lab
      if (selectedLab && activeRegions.length > 0) {
        const isActiveInLab = activeRegions.includes(r)
        
        if (isActiveInLab) {
          // Highlight active regions with bright lab color
          mesh.material.opacity = 1
          mesh.material.color.setHex(labHighlightColor)
          mesh.material.emissive.setHex(isHovered ? 0x444444 : 0x222222)
        } else {
          // Dim inactive regions significantly
          mesh.material.opacity = isolationOpacity * 0.3
          if (r && regionColors[r]) {
            mesh.material.color.setHex(regionColors[r])
          }
          mesh.material.emissive.setHex(isHovered ? 0x333333 : 0x000000)
        }
      }
      // Single region mode: existing functionality
      else if (selectedRegion) {
        if (r === selectedRegion) {
          // Highlight selected region
          mesh.material.opacity = 1
          if (regionColors[r]) {
            mesh.material.color.setHex(regionColors[r])
            mesh.material.emissive.setHex(isHovered ? 0xAAAAAA : 0x444444)
          }
        } else {
          // Dim other parts
          mesh.material.opacity = isolationOpacity
          if (r && regionColors[r]) {
            mesh.material.color.setHex(regionColors[r])
          }
          mesh.material.emissive.setHex(isHovered ? 0x555555 : 0x000000)
        }
      }
      // Default mode: show all regions normally
      else {
        mesh.material.opacity = 1
        if (r && regionColors[r]) {
          mesh.material.color.setHex(regionColors[r])
          if (isHovered) {
            mesh.material.emissive.setHex(0x888888)
            const baseColor = new THREE.Color(regionColors[r])
            baseColor.multiplyScalar(1.5)
            mesh.material.color.set(baseColor)
          } else {
            mesh.material.emissive.setHex(0x000000)
          }
        }
      }
      
      mesh.material.depthWrite = mesh.material.opacity > 0.5
      mesh.material.needsUpdate = true
    })
  }, [meshes, selectedRegion, selectedLab, activeRegions, isolationOpacity, regionColors, hoveredMesh, labHighlightColor])

  function onPointerDown(e) {
    e.stopPropagation()
    const picked = e.object
    const region = picked.userData.regionKey || nameToRegionKey(picked.name)
    console.log('Clicked region:', region, 'from mesh:', picked.name)
    
    // Only allow region selection if not in lab mode
    if (!selectedLab) {
      setSelectedRegion((prev) => (prev === region ? null : region))
    }
  }

  function onPointerEnter(e) {
    e.stopPropagation()
    const picked = e.object
    const region = picked.userData.regionKey || nameToRegionKey(picked.name)
    
    // Get the intersection point for more accurate positioning
    const intersectionPoint = e.point
    if (intersectionPoint) {
      setHoveredPosition([intersectionPoint.x, intersectionPoint.y, intersectionPoint.z])
    } else {
      // Fallback to mesh center
      const boundingBox = new THREE.Box3().setFromObject(picked)
      const center = boundingBox.getCenter(new THREE.Vector3())
      setHoveredPosition([center.x, center.y, center.z])
    }
    
    setHoveredMesh(picked)
    setHoveredRegion(region)
    document.body.style.cursor = 'pointer'
  }

  function onPointerLeave(e) {
    e.stopPropagation()
    setHoveredMesh(null)
    setHoveredRegion(null)
    setHoveredPosition([0, 0, 0])
    document.body.style.cursor = 'default'
  }

  function onPointerMove(e) {
    if (hoveredRegion) {
      const intersectionPoint = e.point
      if (intersectionPoint) {
        setHoveredPosition([intersectionPoint.x, intersectionPoint.y, intersectionPoint.z])
      }
    }
  }

  return (
    <>
      <primitive 
        object={scene}
        scale={1.5} // Make brain model bigger 
        position={[0, 0.2, 0]} // Adjust position slightly up
        onPointerDown={onPointerDown}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        onPointerMove={onPointerMove}
      />
      
      {/* Enhanced Hover Info Panel with Lab Context */}
      {hoveredRegion && (
        <Html
          position={[hoveredPosition[0] + 0.3, hoveredPosition[1] + 0.5, hoveredPosition[2] + 0.2]}
          center
          style={{
            pointerEvents: 'none',
            transform: 'translate(-50%, -100%)',
            zIndex: 10000
          }}
        >
          <div className="brain-info-panel-simple">
            <div className="info-header-simple">
              <div className="region-indicator-simple"></div>
              <h3 className="region-name-simple">{REGION_INFO[hoveredRegion]?.title || hoveredRegion}</h3>
            </div>
            <div className="info-content-simple">
              <p className="region-function-simple">{REGION_INFO[hoveredRegion]?.short}</p>
              {selectedLab && activeRegions.includes(hoveredRegion) && (
                <p style={{ 
                  marginTop: '8px', 
                  fontSize: '12px', 
                  color: '#06ffa5', 
                  fontWeight: '600' 
                }}>
                  ✨ Active in {LAB_BRAIN_MAP[selectedLab]?.name}
                </p>
              )}
            </div>
          </div>
        </Html>
      )}
    </>
  )
}

/* Error Boundary for handling model loading errors */
class ModelErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <Html center>
          <div style={{ 
            background: 'white', 
            padding: '20px', 
            borderRadius: '10px', 
            textAlign: 'center',
            maxWidth: '300px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#dc2626' }}>Brain Model Missing</h3>
            <p style={{ margin: '10px 0', fontSize: '14px' }}>Please place a 3D brain model file at:</p>
            <code style={{ 
              background: '#f3f4f6', 
              padding: '4px 8px', 
              borderRadius: '4px',
              fontSize: '12px'
            }}>/public/models/brain-annotated.glb</code>
            <p style={{ marginTop: '15px', fontSize: '13px', color: '#666' }}>
              You can download free brain models from:
              <br />• Sketchfab (free models)
              <br />• OpenNeuro (scientific models)  
              <br />• NIH 3D Print Exchange
            </p>
          </div>
        </Html>
      )
    }

    return this.props.children
  }
}

/* AutoRotate component to handle rotation inside Canvas */
function AutoRotate({ autoRotate, orbitRef }) {
  useFrame(() => {
    if (autoRotate && orbitRef.current) {
      orbitRef.current.autoRotate = true
      orbitRef.current.autoRotateSpeed = 0.5
    } else if (orbitRef.current) {
      orbitRef.current.autoRotate = false
    }
  })
  return null
}

/* Main App */
function HomePage() {
  const [selectedRegion, setSelectedRegion] = useState(null)
  const [isolationOpacity, setIsolationOpacity] = useState(0.12)
  const [selectedLab, setSelectedLab] = useState(null)
  const [autoRotate, setAutoRotate] = useState(true)
  const orbitRef = useRef()
  const navigate = useNavigate()

  const description = selectedRegion ? REGION_INFO[selectedRegion] : null

  function resetView() {
    setSelectedRegion(null)
    setIsolationOpacity(0.12)
  }

  function handleLabClick(labNumber) {
    // Navigate to specific lab pages
    switch(labNumber) {
      case 1:
        navigate('/lab1')
        break
      case 2:
        navigate('/lab2')
        break
      case 3:
        navigate('/lab3')
        break
      case 4:
        navigate('/lab4')
        break
      case 5:
        navigate('/lab5')
        break
      case 6:
        navigate('/lab6')
        break
      case 7:
        navigate('/lab7')
        break
      case 8:
        navigate('/lab8')
        break
      default:
        console.log(`Lab ${labNumber} functionality coming soon`)
    }
  }

  return (
    <div className="app-container">
      {/* Brain Pattern Overlay */}
      <div className="brain-pattern-overlay"></div>
      
      {/* Aaruchudar Header with Brain Visual */}
      <header className="header">
        <div className="header-content">
          <div className="brand-section">
            <div className="logo-container">
              <img 
                src={AaruchudarLogo} 
                alt="Aaruchudar Logo" 
                className="company-logo"
              />
            </div>
            <div className="brand-text">
              <h1 className="company-name">AARUCHUDAR</h1>
              <p className="slogan">You understand, we rewire</p>
            </div>
          </div>
          <div className="neural-stats">
            <div className="stat-item">
              <div className="stat-value">6</div>
              <div className="stat-label">Brain Regions</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">360°</div>
              <div className="stat-label">Neural View</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">HI</div>
              <div className="stat-label">Powered</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content with Frame */}
      <main className="main-content">
        <div className="content-frame">
          <div className="container">
            {/* Control Panel */}
            <div className="left">
              <div className="card">
                <h2 className="neural-title">Interactive 3D Brain</h2>
                <p className="description">Rotate the neural model with mouse drag, zoom with scroll. Click any brain region to isolate it and explore neural pathways.</p>

                <div style={{ marginTop: 20 }}>
                  <h3 className="info-title" style={{ color: '#ffffff', fontSize: '18px', fontWeight: 'bold' }}>Neural Analysis</h3>
                  {!description && (
                    <p style={{ marginTop: 12, color: '#cbd5e1', fontSize: '14px' }}>
                      No region selected — click a cortex area on the 3D brain model to begin neural analysis.
                    </p>
                  )}

                  {description && (
                    <div style={{ marginTop: 12 }}>
                      <div className="info-title" style={{ color: '#ffffff', fontSize: '20px', fontWeight: 'bold' }}>{description.title}</div>
                      <div className="info-short" style={{ color: '#06ffa5', fontSize: '16px', fontWeight: '600', marginTop: '10px' }}>{description.short}</div>
                      <div className="info-details" style={{ color: '#cbd5e1', fontSize: '14px', lineHeight: '1.6', marginTop: '10px' }}>{description.details}</div>
                    </div>
                  )}

                  <div className="controls">
                    <button 
                      className={`button ${!selectedRegion ? 'primary' : ''}`} 
                      onClick={() => setSelectedRegion(null)}
                      style={{
                        backgroundColor: !selectedRegion ? '#00d4ff' : 'rgba(0, 212, 255, 0.15)',
                        borderColor: '#00d4ff',
                        color: !selectedRegion ? '#000' : '#ffffff',
                        fontWeight: '600'
                      }}
                    >
                      Show All
                    </button>
                    <button 
                      className={`button ${selectedRegion === 'Frontal' ? 'selected' : ''}`} 
                      onClick={() => setSelectedRegion('Frontal')} 
                      style={{
                        backgroundColor: selectedRegion === 'Frontal' ? '#3B82F6' : 'rgba(0, 212, 255, 0.15)',
                        color: selectedRegion === 'Frontal' ? '#ffffff' : '#ffffff',
                        borderColor: selectedRegion === 'Frontal' ? '#1D4ED8' : '#00d4ff',
                        fontWeight: '600'
                      }}
                    >
                      1. Frontal
                    </button>
                    <button 
                      className={`button ${selectedRegion === 'Parietal' ? 'selected' : ''}`} 
                      onClick={() => setSelectedRegion('Parietal')} 
                      style={{
                        backgroundColor: selectedRegion === 'Parietal' ? '#10B981' : 'rgba(0, 212, 255, 0.15)',
                        color: selectedRegion === 'Parietal' ? '#ffffff' : '#ffffff',
                        borderColor: selectedRegion === 'Parietal' ? '#059669' : '#00d4ff',
                        fontWeight: '600'
                      }}
                    >
                      2. Parietal
                    </button>
                    <button 
                      className={`button ${selectedRegion === 'Temporal' ? 'selected' : ''}`} 
                      onClick={() => setSelectedRegion('Temporal')} 
                      style={{
                        backgroundColor: selectedRegion === 'Temporal' ? '#F59E0B' : 'rgba(0, 212, 255, 0.15)',
                        color: selectedRegion === 'Temporal' ? '#ffffff' : '#ffffff',
                        borderColor: selectedRegion === 'Temporal' ? '#D97706' : '#00d4ff',
                        fontWeight: '600'
                      }}
                    >
                      3. Temporal
                    </button>
                    <button 
                      className={`button ${selectedRegion === 'Occipital' ? 'selected' : ''}`} 
                      onClick={() => setSelectedRegion('Occipital')} 
                      style={{
                        backgroundColor: selectedRegion === 'Occipital' ? '#EF4444' : 'rgba(0, 212, 255, 0.15)',
                        color: selectedRegion === 'Occipital' ? '#ffffff' : '#ffffff',
                        borderColor: selectedRegion === 'Occipital' ? '#DC2626' : '#00d4ff',
                        fontWeight: '600'
                      }}
                    >
                      4. Occipital
                    </button>
                    <button 
                      className={`button ${selectedRegion === 'Cerebellum' ? 'selected' : ''}`} 
                      onClick={() => setSelectedRegion('Cerebellum')} 
                      style={{
                        backgroundColor: selectedRegion === 'Cerebellum' ? '#8B5CF6' : 'rgba(0, 212, 255, 0.15)',
                        color: selectedRegion === 'Cerebellum' ? '#ffffff' : '#ffffff',
                        borderColor: selectedRegion === 'Cerebellum' ? '#7C3AED' : '#00d4ff',
                        fontWeight: '600'
                      }}
                    >
                      5. Cerebellum
                    </button>
                    <button 
                      className={`button ${selectedRegion === 'Brainstem' ? 'selected' : ''}`} 
                      onClick={() => setSelectedRegion('Brainstem')} 
                      style={{
                        backgroundColor: selectedRegion === 'Brainstem' ? '#06B6D4' : 'rgba(0, 212, 255, 0.15)',
                        color: selectedRegion === 'Brainstem' ? '#ffffff' : '#ffffff',
                        borderColor: selectedRegion === 'Brainstem' ? '#0891B2' : '#00d4ff',
                        fontWeight: '600'
                      }}
                    >
                      6. Brainstem
                    </button>
                    <button 
                      className="button" 
                      onClick={resetView}
                      style={{
                        backgroundColor: 'rgba(139, 92, 246, 0.15)',
                        borderColor: '#8b5cf6',
                        color: '#ffffff',
                        fontWeight: '600'
                      }}
                    >
                      Reset Neural Map
                    </button>
                  </div>

                  {/* Enhanced Color Legend */}
                  <div className="color-legend" style={{ 
                    marginTop: '25px', 
                    padding: '20px', 
                    background: 'rgba(0, 212, 255, 0.08)', 
                    border: '1px solid rgba(6, 255, 165, 0.3)', 
                    borderRadius: '15px' 
                  }}>
                    <h3 style={{ color: '#06ffa5', fontSize: '16px', fontWeight: 'bold', marginBottom: '15px' }}>Neural Network Mapping:</h3>
                    <div className="color-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                      <div className="color-item" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ffffff' }}>
                        <div className="color-dot" style={{ width: '18px', height: '18px', backgroundColor: '#3B82F6', borderRadius: '50%' }}></div>
                        <span style={{ color: '#ffffff', fontSize: '14px' }}>1. Frontal Cortex</span>
                      </div>
                      <div className="color-item" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ffffff' }}>
                        <div className="color-dot" style={{ width: '18px', height: '18px', backgroundColor: '#10B981', borderRadius: '50%' }}></div>
                        <span style={{ color: '#ffffff', fontSize: '14px' }}>2. Parietal Cortex</span>
                      </div>
                      <div className="color-item" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ffffff' }}>
                        <div className="color-dot" style={{ width: '18px', height: '18px', backgroundColor: '#F59E0B', borderRadius: '50%' }}></div>
                        <span style={{ color: '#ffffff', fontSize: '14px' }}>3. Temporal Cortex</span>
                      </div>
                      <div className="color-item" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ffffff' }}>
                        <div className="color-dot" style={{ width: '18px', height: '18px', backgroundColor: '#EF4444', borderRadius: '50%' }}></div>
                        <span style={{ color: '#ffffff', fontSize: '14px' }}>4. Occipital Cortex</span>
                      </div>
                      <div className="color-item" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ffffff' }}>
                        <div className="color-dot" style={{ width: '18px', height: '18px', backgroundColor: '#8B5CF6', borderRadius: '50%' }}></div>
                        <span style={{ color: '#ffffff', fontSize: '14px' }}>5. Cerebellum Unit</span>
                      </div>
                      <div className="color-item" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ffffff' }}>
                        <div className="color-dot" style={{ width: '18px', height: '18px', backgroundColor: '#06B6D4', borderRadius: '50%' }}></div>
                        <span style={{ color: '#ffffff', fontSize: '14px' }}>6. Core Stem</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: 20 }}>
                    <label style={{ color: '#cbd5e1', fontSize: '14px', fontWeight: '500', display: 'block', marginBottom: '8px' }}>
                      Neural Isolation Opacity: {isolationOpacity.toFixed(2)}
                    </label>
                    <input 
                      className="range" 
                      type="range" 
                      min="0.02" 
                      max="0.9" 
                      step="0.01" 
                      value={isolationOpacity} 
                      onChange={(e) => setIsolationOpacity(parseFloat(e.target.value))} 
                      style={{
                        width: '100%',
                        height: '8px',
                        background: 'linear-gradient(90deg, #00d4ff, #06ffa5)',
                        borderRadius: '4px'
                      }}
                    />
                  </div>

                  <div style={{ 
                    marginTop: 15, 
                    fontSize: 13, 
                    color: '#cbd5e1',
                    padding: 12,
                    background: 'rgba(0, 212, 255, 0.05)',
                    borderRadius: 8,
                    border: '1px solid rgba(0, 212, 255, 0.1)'
                  }}>
                    💡 <strong style={{ color: '#06ffa5' }}>Neural Tip:</strong> Click any brain region to activate neural pathway analysis. Use controls to explore different cortical areas and their cognitive functions.
                  </div>
                </div>
              </div>
            </div>

            {/* 3D Viewport */}
            <div className="right">
              <div className="card">
                {/* Lab Selection Controls - Horizontal Layout Above Brain Viewer */}
                <div style={{ 
                  marginBottom: '20px', 
                  padding: '20px', 
                  background: 'rgba(6, 255, 165, 0.05)', 
                  border: '1px solid rgba(6, 255, 165, 0.2)', 
                  borderRadius: '12px' 
                }}>
                  <h3 style={{ 
                    color: '#06ffa5', 
                    fontSize: '18px', 
                    fontWeight: 'bold', 
                    marginBottom: '15px',
                    textAlign: 'center'
                  }}>
                    🧪 Lab Neural Mapping
                  </h3>
                  
                  {selectedLab && (
                    <div style={{ 
                      textAlign: 'center', 
                      marginBottom: '15px',
                      padding: '12px',
                      background: 'rgba(6, 255, 165, 0.1)',
                      borderRadius: '8px'
                    }}>
                      <div style={{ color: '#06ffa5', fontSize: '16px', fontWeight: '600' }}>
                        {LAB_BRAIN_MAP[selectedLab]?.name}
                      </div>
                      <div style={{ color: '#ffffff', fontSize: '14px', marginTop: '4px' }}>
                        {LAB_BRAIN_MAP[selectedLab]?.description}
                      </div>
                      <div style={{ color: '#00d4ff', fontSize: '12px', marginTop: '8px' }}>
                        Active Regions: {LAB_BRAIN_MAP[selectedLab]?.regions.join(', ')}
                      </div>
                    </div>
                  )}
                  
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(4, 1fr)', 
                    gap: '8px',
                    marginBottom: '12px'
                  }}>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((labNum) => {
                      const labKey = `lab${labNum}`
                      const isSelected = selectedLab === labKey
                      const labInfo = LAB_BRAIN_MAP[labKey]
                      
                      return (
                        <button
                          key={labNum}
                          onClick={() => {
                            // Clear single region selection when lab is selected
                            setSelectedRegion(null)
                            setSelectedLab(prev => prev === labKey ? null : labKey)
                          }}
                          style={{
                            padding: '10px 8px',
                            backgroundColor: isSelected ? '#06ffa5' : 'rgba(0, 212, 255, 0.15)',
                            color: isSelected ? '#000' : '#ffffff',
                            border: `1px solid ${isSelected ? '#06ffa5' : '#00d4ff'}`,
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            fontSize: '14px',
                            transition: 'all 0.3s ease',
                            textAlign: 'center'
                          }}
                          title={`${labInfo?.name}: ${labInfo?.description}`}
                        >
                          Lab {labNum}
                        </button>
                      )
                    })}
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                    <button
                      onClick={() => {
                        setSelectedLab(null)
                        setSelectedRegion(null)
                      }}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: (!selectedLab && !selectedRegion) ? '#00d4ff' : 'rgba(139, 92, 246, 0.15)',
                        color: (!selectedLab && !selectedRegion) ? '#000' : '#ffffff',
                        border: `1px solid ${(!selectedLab && !selectedRegion) ? '#00d4ff' : '#8b5cf6'}`,
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '12px',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      Clear All
                    </button>
                    <button
                      onClick={() => {
                        if (selectedLab) {
                          // Navigate to the specific lab page
                          const labNumber = parseInt(selectedLab.replace('lab', ''))
                          handleLabClick(labNumber)
                        }
                      }}
                      disabled={!selectedLab}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: selectedLab ? '#06ffa5' : 'rgba(139, 92, 246, 0.1)',
                        color: selectedLab ? '#000' : '#666',
                        border: `1px solid ${selectedLab ? '#06ffa5' : '#8b5cf6'}`,
                        borderRadius: '6px',
                        cursor: selectedLab ? 'pointer' : 'not-allowed',
                        fontWeight: '600',
                        fontSize: '12px',
                        transition: 'all 0.3s ease',
                        opacity: selectedLab ? 1 : 0.5
                      }}
                    >
                      Explore Lab →
                    </button>
                  </div>
                  
                  <div style={{ 
                    marginTop: '12px', 
                    fontSize: '11px', 
                    color: '#cbd5e1',
                    textAlign: 'center',
                    fontStyle: 'italic'
                  }}>
                    💡 Select a lab to highlight its active brain regions in the 3D model
                  </div>
                </div>

                <div className="viewport-container">
                  <div className="hud-overlay">
                    <div className="hud-element">NEURAL SCAN ACTIVE</div>
                    <div className="hud-element">
                      {selectedLab ? `LAB MODE: ${LAB_BRAIN_MAP[selectedLab]?.name.toUpperCase()}` : '3D MODEL: BRAIN_AREAS.GLB'}
                    </div>
                  </div>
                  <div className="canvas-wrap">
                    <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
                      <ambientLight intensity={0.8} />
                      <directionalLight position={[5, 5, 5]} intensity={0.6} />
                      <AutoRotate autoRotate={autoRotate} orbitRef={orbitRef} />
                      <Suspense fallback={<Html center style={{ color: 'var(--primary-blue)' }}>Loading Neural Model...</Html>}>
                        <ModelErrorBoundary>
                          <Stage 
                            intensity={0.6} 
                            environment={'city'} 
                            contactShadow={{ opacity: 0.25, blur: 4 }}
                            adjustCamera={true}
                            center={true}
                          >
                            <BrainScene 
                              selectedRegion={selectedRegion} 
                              setSelectedRegion={setSelectedRegion} 
                              isolationOpacity={isolationOpacity} 
                              selectedLab={selectedLab} 
                              setSelectedLab={setSelectedLab}
                              autoRotate={autoRotate}
                            />
                          </Stage>
                        </ModelErrorBoundary>
                      </Suspense>
                      <OrbitControls 
                        ref={orbitRef}
                        enablePan={false} 
                        enableZoom={true}
                        enableRotate={true}
                        minDistance={2}
                        maxDistance={6}
                        minPolarAngle={Math.PI / 6}
                        maxPolarAngle={Math.PI - Math.PI / 6}
                        target={[0, 0.2, 0]}
                      />
                    </Canvas>
                    <Loader />
                  </div>
                  
                  {/* Auto-rotation toggle control */}
                  <div style={{ 
                    position: 'absolute',
                    bottom: 20,
                    right: 20,
                    zIndex: 1000
                  }}>
                    <button
                      onClick={() => setAutoRotate(!autoRotate)}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: autoRotate ? '#06ffa5' : 'rgba(6, 255, 165, 0.15)',
                        color: autoRotate ? '#000' : '#fff',
                        border: '1px solid #06ffa5',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <span>{autoRotate ? '⏸' : '▶️'}</span>
                      {autoRotate ? 'Pause Rotation' : 'Auto Rotate'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Enhanced Footer */}
      <footer className="footer">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          gap: 20,
          flexWrap: 'wrap'
        }}>
          <span style={{ color: 'var(--text-secondary)' }}>
            Advanced Neural Interface powered by
          </span>
          <span style={{ 
            color: 'var(--accent-cyan)', 
            fontWeight: 700,
            textShadow: '0 0 10px rgba(6, 255, 165, 0.3)'
          }}>
            AARUCHUDAR
          </span>
          <span style={{ color: 'var(--text-secondary)' }}>
            — Interactive 3D Brain Visualization
          </span>
        </div>
        <div style={{ 
          marginTop: 10, 
          fontSize: 12, 
          color: 'var(--text-secondary)',
          opacity: 0.7
        }}>
          Neural pathways • Cognitive mapping • Real-time interaction
        </div>
      </footer>

      {/* Lab Cards Section */}
      <section className="labs-section">
        <div className="labs-container">
          <h2 className="labs-title">Human Intelligence Labs</h2>
          <p className="labs-description">Explore our advanced human intelligence research facilities and cutting-edge brain analysis tools</p>
          
          <div className="labs-grid">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((labNumber) => (
              <div key={labNumber} className="lab-card">
                <div className="lab-header">
                  <div className="lab-icon">🧪</div>
                  <h3 className="lab-title">Lab {labNumber}</h3>
                </div>
                <div className="lab-content">
                  <p className="lab-description">
                    {labNumber === 5 
                      ? "Intelligent Conflict and Recovery - Learn to transform disagreements into opportunities for growth and understanding through compassion and skill."
                      : "Advanced human intelligence analysis and cognitive research facility specializing in brain mapping technologies."
                    }
                  </p>
                  <div className="lab-stats">
                    <div className="lab-stat">
                      <span className="stat-value">{Math.floor(Math.random() * 50) + 20}</span>
                      <span className="stat-label">Experiments</span>
                    </div>
                    <div className="lab-stat">
                      <span className="stat-value">{Math.floor(Math.random() * 100) + 50}%</span>
                      <span className="stat-label">Accuracy</span>
                    </div>
                  </div>
                  <button 
                    className="lab-button"
                    onClick={() => handleLabClick(labNumber)}
                    style={{
                      backgroundColor: labNumber === 5 ? '#06ffa5' : undefined,
                      color: labNumber === 5 ? '#000' : undefined,
                      fontWeight: labNumber === 5 ? '700' : undefined
                    }}
                  >
                    {labNumber === 5 ? 'Explore Conflict & Recovery Lab' : `Explore Lab ${labNumber}`}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Download Dashboard Button */}
          <div className="dashboard-section">
            <div className="dashboard-card">
              <div className="dashboard-content">
                <h3 className="dashboard-title">Human Intelligence Report</h3>
                <p className="dashboard-description">
                  Download our comprehensive sample report to analyze brain patterns, track research progress, and visualize human intelligence data in real-time.
                </p>
                <div className="dashboard-features">
                  <div className="feature-item">📊 Real-time Analytics</div>
                  <div className="feature-item">🧠 Brain Pattern Analysis</div>
                  <div className="feature-item">📈 Progress Tracking</div>
                  <div className="feature-item">💾 Data Export Tools</div>
                </div>
                <button className="dashboard-download-btn">
                  <span className="download-icon">⬇️</span>
                  Download Sample Report
                </button>
              </div>
              <div className="dashboard-visual">
                <div className="dashboard-preview">
                  <div className="preview-header"></div>
                  <div className="preview-charts">
                    <div className="chart-item"></div>
                    <div className="chart-item"></div>
                    <div className="chart-item"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/lab1" element={<Lab1 />} />
      <Route path="/lab2" element={<Lab2 />} />
      <Route path="/lab3" element={<Lab3 />} />
      <Route path="/lab4" element={<Lab4 />} />
      <Route path="/lab5" element={<Lab5 />} />
      <Route path="/lab6" element={<Lab6 />} />
      <Route path="/lab7" element={<Lab7 />} />
      <Route path="/lab8" element={<Lab8 />} />
    </Routes>
  )
}
