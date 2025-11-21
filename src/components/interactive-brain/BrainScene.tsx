'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Html } from '@react-three/drei';
import * as THREE from 'three';
import type { RegionKey } from './InteractiveBrain';
import { REGION_INFO } from './InteractiveBrain';
import type { MeshStandardMaterial } from 'three';

// Pre-load the model
useGLTF.preload('/models/brain_areas.glb');

// Define colors for each brain region
const regionColors = {
  'Frontal': 0x3B82F6,    // Blue
  'Parietal': 0x10B981,   // Green  
  'Temporal': 0xF59E0B,   // Orange
  'Occipital': 0xEF4444,  // Red
  'Cerebellum': 0x8B5CF6, // Purple
  'Brainstem': 0x06B6D4   // Cyan
} as const;

// Lab highlight color (brighter for lab mode)
const labHighlightColor = 0x06FFA5; // Bright green

interface BrainSceneProps {
  activeRegions?: RegionKey[];
  labHighlight?: boolean;
  autoRotate?: boolean;
  onLoad?: () => void;
  onRegionSelect?: (region: RegionKey | null) => void;
  isolationOpacity?: number;
}

export function BrainScene({ 
  activeRegions = [], 
  labHighlight = true,
  autoRotate = true,
  onLoad,
  onRegionSelect,
  isolationOpacity = 0.12
}: BrainSceneProps) {
  const { scene } = useGLTF('/models/brain_areas.glb');
  const [hoveredRegion, setHoveredRegion] = useState<RegionKey | null>(null);
  const [hoveredMesh, setHoveredMesh] = useState<THREE.Mesh | null>(null);
  const [hoveredPosition, setHoveredPosition] = useState<[number, number, number]>([0, 0, 0]);

  // Adjust scene position and rotation
  useEffect(() => {
    if (scene) {
      // Center the model
      const box = new THREE.Box3().setFromObject(scene);
      const center = box.getCenter(new THREE.Vector3());
      scene.position.sub(center);
      
      // Initial rotation for better view
      scene.rotation.x = -0.2; // Tilt forward slightly
      scene.rotation.y = 0.5;  // Turn slightly to show more detail
      
      // Call onLoad when scene is ready
      onLoad?.();
    }
  }, [scene, onLoad]);

  // Handle auto-rotation
  useFrame((state, delta) => {
    if (autoRotate && scene) {
      scene.rotation.y += delta * 0.5;
    }
  });

  // Map mesh names to region keys
  function nameToRegionKey(name: string, meshIndex = 0): RegionKey | null {
    if (!name) return null;
    const n = name.toLowerCase();
    
    if (n.includes('frontal') || n.includes('front')) return 'Frontal';
    if (n.includes('parietal') || n.includes('pariet')) return 'Parietal';
    if (n.includes('temporal') || n.includes('tempor')) return 'Temporal';
    if (n.includes('occipital') || n.includes('occipit')) return 'Occipital';
    if (n.includes('cerebell') || n.includes('cerebel')) return 'Cerebellum';
    if (n.includes('brainstem') || n.includes('stem') || n.includes('brain_stem')) return 'Brainstem';
    
    // Additional common brain region names
    if (n.includes('cortex') || n.includes('lobe')) {
      if (n.includes('front')) return 'Frontal';
      if (n.includes('pariet')) return 'Parietal';
      if (n.includes('temp')) return 'Temporal';
      if (n.includes('occip')) return 'Occipital';
    }
    
    // Handle numbered patterns
    if (n.includes('001') || n.includes('_1')) return 'Frontal';
    if (n.includes('002') || n.includes('_2')) return 'Parietal';
    if (n.includes('003') || n.includes('_3')) return 'Temporal';
    if (n.includes('004') || n.includes('_4')) return 'Occipital';
    if (n.includes('005') || n.includes('_5')) return 'Cerebellum';
    if (n.includes('006') || n.includes('_6')) return 'Brainstem';
    
    // Fallback: distribute meshes evenly
    const regions: RegionKey[] = ['Frontal', 'Parietal', 'Temporal', 'Occipital', 'Cerebellum', 'Brainstem'];
    return regions[meshIndex % regions.length];
  }
  
  // Prepare meshes with materials
  const meshes = useMemo(() => {
    const m: THREE.Mesh<THREE.BufferGeometry, MeshStandardMaterial>[] = [];
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // Clone and ensure material is MeshStandardMaterial
        const material = new THREE.MeshStandardMaterial();
        Object.assign(material, child.material);
        child.material = material;
        child.material.transparent = true;
        
        const regionKey = nameToRegionKey(child.name, m.length);
        child.userData.regionKey = regionKey;
        
        if (regionKey && regionColors[regionKey]) {
          child.material.color.setHex(regionColors[regionKey]);
        }
        m.push(child as THREE.Mesh<THREE.BufferGeometry, MeshStandardMaterial>);
      }
    });
    return m;
  }, [scene]);

  // Update mesh materials based on active regions
  useEffect(() => {
    meshes.forEach((mesh) => {
      const material = mesh.material;
      const r = mesh.userData.regionKey as RegionKey;
      const isHovered = mesh === hoveredMesh;
      const isActive = activeRegions.includes(r);
      
      if (labHighlight && activeRegions.length > 0) {
        if (isActive) {
          material.opacity = 1;
          material.color.setHex(labHighlightColor);
          material.emissive.setHex(isHovered ? 0x444444 : 0x222222);
        } else {
          material.opacity = isolationOpacity;
          if (r && regionColors[r]) {
            material.color.setHex(regionColors[r]);
          }
          material.emissive.setHex(0x000000);
        }
      } else {
        material.opacity = 1;
        if (r && regionColors[r]) {
          material.color.setHex(regionColors[r]);
          if (isHovered) {
            material.emissive.setHex(0x888888);
            const baseColor = new THREE.Color(regionColors[r]);
            baseColor.multiplyScalar(1.5);
            material.color.set(baseColor);
          } else {
            material.emissive.setHex(0x000000);
          }
        }
      }
      
      material.depthWrite = material.opacity > 0.5;
      material.needsUpdate = true;
    });
  }, [meshes, activeRegions, labHighlight, hoveredMesh, isolationOpacity]);

  // Event handlers
  function onPointerEnter(e: any) {
    e.stopPropagation();
    const picked = e.object;
    const region = picked.userData.regionKey as RegionKey;
    
    const intersectionPoint = e.point;
    if (intersectionPoint) {
      setHoveredPosition([intersectionPoint.x, intersectionPoint.y, intersectionPoint.z]);
    } else {
      const boundingBox = new THREE.Box3().setFromObject(picked);
      const center = boundingBox.getCenter(new THREE.Vector3());
      setHoveredPosition([center.x, center.y, center.z]);
    }
    
    setHoveredMesh(picked);
    setHoveredRegion(region);
    
    if (typeof document !== 'undefined') {
      document.body.style.cursor = 'pointer';
    }
  }

  function onPointerLeave(e: any) {
    e.stopPropagation();
    setHoveredMesh(null);
    setHoveredRegion(null);
    setHoveredPosition([0, 0, 0]);
    
    if (typeof document !== 'undefined') {
      document.body.style.cursor = 'default';
    }
  }

  function onPointerMove(e: any) {
    if (hoveredRegion) {
      const intersectionPoint = e.point;
      if (intersectionPoint) {
        setHoveredPosition([intersectionPoint.x, intersectionPoint.y, intersectionPoint.z]);
      }
    }
  }

  function onPointerDown(e: any) {
    e.stopPropagation();
    if (onRegionSelect) {
      const region = e.object.userData.regionKey as RegionKey;
      onRegionSelect(region);
    }
  }

  return (
    <>
      <primitive 
        object={scene}
        scale={2}
        position={[0, -0.5, 0]}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        onPointerMove={onPointerMove}
        onPointerDown={onPointerDown}
      />
      
      {hoveredRegion && (
        <Html
          position={[hoveredPosition[0] + 0.3, hoveredPosition[1] + 0.5, hoveredPosition[2] + 0.2]}
          center
          style={{
            pointerEvents: 'none',
            transform: 'translate(-50%, -100%)',
            zIndex: 100000,
            width: 'auto',
            maxHeight: '80vh',
            display: 'flex',
            flexDirection: 'column'
          }}
          portal={{ current: document.body }}
        >
          <div style={{
            background: 'rgba(0, 0, 0, 0.95)',
            padding: '16px',
            borderRadius: '12px',
            border: '1px solid rgba(6, 255, 165, 0.3)',
            backdropFilter: 'blur(10px)',
            minWidth: '250px',
            maxWidth: '350px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
            overflowY: 'auto',
            maxHeight: '300px',
            position: 'relative',
            scrollbarWidth: 'thin',
            scrollbarColor: '#06ffa5 rgba(0, 0, 0, 0.3)'
          }}>
            <div style={{ 
              color: '#06ffa5', 
              fontWeight: '600',
              fontSize: '1.2em',
              marginBottom: '8px',
              borderBottom: '1px solid rgba(6, 255, 165, 0.2)',
              paddingBottom: '8px'
            }}>
              {REGION_INFO[hoveredRegion].title}
            </div>
            <div style={{ 
              color: '#ffffff',
              fontSize: '0.95em',
              marginBottom: '12px',
              lineHeight: '1.5'
            }}>
              {REGION_INFO[hoveredRegion].short}
            </div>
            <div style={{
              color: '#cbd5e1',
              fontSize: '0.9em',
              lineHeight: '1.5',
              opacity: 0.9
            }}>
              {REGION_INFO[hoveredRegion].details}
            </div>
            {activeRegions.includes(hoveredRegion) && (
              <div style={{ 
                color: '#00d4ff',
                fontSize: '0.9em',
                marginTop: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px',
                background: 'rgba(0, 212, 255, 0.1)',
                borderRadius: '6px'
              }}>
                <span style={{ fontSize: '1.2em' }}>✨</span>
                Active in this lab
              </div>
            )}
          </div>
        </Html>
      )}
    </>
  );
}