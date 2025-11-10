import React, { useState, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, Html } from '@react-three/drei'
import * as THREE from 'three'

// Pre-load the model
useGLTF.preload('/models/brain_areas.glb')

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

/* Enhanced BrainScene component for lab pages */
export function BrainScene({ 
  activeRegions = [], 
  labHighlight = true,
  autoRotate = true
}) {
  const { scene } = useGLTF('/models/brain_areas.glb')
  const [hoveredRegion, setHoveredRegion] = useState(null)
  const [hoveredMesh, setHoveredMesh] = useState(null)
  const [hoveredPosition, setHoveredPosition] = useState([0, 0, 0])

  // Adjust scene position and rotation
  useEffect(() => {
    if (scene) {
      // Center the model
      const box = new THREE.Box3().setFromObject(scene)
      const center = box.getCenter(new THREE.Vector3())
      scene.position.sub(center)
      
      // Initial rotation for better view
      scene.rotation.x = -0.2 // Tilt forward slightly
      scene.rotation.y = 0.5  // Turn slightly to show more detail
    }
  }, [scene])

  // Handle auto-rotation
  useFrame((state, delta) => {
    if (autoRotate && scene) {
      scene.rotation.y += delta * 0.5
    }
  })

  // Map mesh names to region keys
  function nameToRegionKey(name, meshIndex = 0) {
    if (!name) return null
    const n = name.toLowerCase()
    
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
    
    // Handle numbered patterns
    if (n.includes('001') || n.includes('_1')) return 'Frontal'
    if (n.includes('002') || n.includes('_2')) return 'Parietal'
    if (n.includes('003') || n.includes('_3')) return 'Temporal'
    if (n.includes('004') || n.includes('_4')) return 'Occipital'
    if (n.includes('005') || n.includes('_5')) return 'Cerebellum'
    if (n.includes('006') || n.includes('_6')) return 'Brainstem'
    
    // Fallback: distribute meshes evenly
    const regions = ['Frontal', 'Parietal', 'Temporal', 'Occipital', 'Cerebellum', 'Brainstem']
    return regions[meshIndex % regions.length]
  }
  
  // Prepare meshes with materials
  const meshes = useMemo(() => {
    const m = []
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = child.material.clone()
        child.material.transparent = true
        const regionKey = nameToRegionKey(child.name, m.length)
        child.userData.regionKey = regionKey
        
        if (regionColors[regionKey]) {
          child.material.color.setHex(regionColors[regionKey])
        }
        m.push(child)
      }
    })
    return m
  }, [scene])

  // Update mesh materials based on active regions
  useEffect(() => {
    meshes.forEach((mesh) => {
      const r = mesh.userData.regionKey
      const isHovered = mesh === hoveredMesh
      const isActive = activeRegions.includes(r)
      
      if (labHighlight && activeRegions.length > 0) {
        if (isActive) {
          mesh.material.opacity = 1
          mesh.material.color.setHex(labHighlightColor)
          mesh.material.emissive.setHex(isHovered ? 0x444444 : 0x222222)
        } else {
          mesh.material.opacity = 0.15
          if (r && regionColors[r]) {
            mesh.material.color.setHex(regionColors[r])
          }
          mesh.material.emissive.setHex(0x000000)
        }
      } else {
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
  }, [meshes, activeRegions, labHighlight, hoveredMesh])

  // Event handlers
  function onPointerEnter(e) {
    e.stopPropagation()
    const picked = e.object
    const region = picked.userData.regionKey
    
    const intersectionPoint = e.point
    if (intersectionPoint) {
      setHoveredPosition([intersectionPoint.x, intersectionPoint.y, intersectionPoint.z])
    } else {
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
        scale={2} // Increased scale for better visibility
        position={[0, -0.5, 0]} // Adjusted position
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        onPointerMove={onPointerMove}
      />
      
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
          <div style={{
            background: 'rgba(0, 0, 0, 0.8)',
            padding: '8px 12px',
            borderRadius: '8px',
            border: '1px solid rgba(6, 255, 165, 0.3)',
            backdropFilter: 'blur(4px)'
          }}>
            <div style={{ color: '#06ffa5', fontWeight: '600' }}>
              {hoveredRegion}
            </div>
            {activeRegions.includes(hoveredRegion) && (
              <div style={{ 
                color: '#00d4ff',
                fontSize: '0.8em',
                marginTop: '4px'
              }}>
                ✨ Active in this lab
              </div>
            )}
          </div>
        </Html>
      )}
    </>
  )
}