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
const defaultRegionColors = {
  'Frontal': 0xFF6B6B,    // Coral
  'Parietal': 0x6BCB77,   // Soft Green  
  'Temporal': 0xFFD93D,   // Warm Yellow
  'Occipital': 0x4D96FF,  // Bright Blue
  'Cerebellum': 0x9D4EDD, // Vivid Purple
  'Brainstem': 0x40E0D0   // Turquoise
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
  regionColorsOverride?: Partial<Record<RegionKey, number>>; // allow overriding colors
  onHoverRegion?: (region: RegionKey | null) => void; // new callback
  colorCycle?: boolean; // auto change colors while rotating
  disassemble?: boolean; // explode/disassemble animation
  showLabelsSmall?: boolean; // render small labels near parts
}

export function BrainScene({ 
  activeRegions = [], 
  labHighlight = true,
  autoRotate = true,
  onLoad,
  onRegionSelect,
  isolationOpacity = 0.12,
  regionColorsOverride,
  onHoverRegion,
  colorCycle = true,
  disassemble = false,
  showLabelsSmall = false,
}: BrainSceneProps) {
  const { scene } = useGLTF('/models/brain_areas.glb');
  const [hoveredRegion, setHoveredRegion] = useState<RegionKey | null>(null);
  const [hoveredMesh, setHoveredMesh] = useState<THREE.Mesh | null>(null);
  const [hoveredPosition, setHoveredPosition] = useState<[number, number, number]>([0, 0, 0]);
  const [time, setTime] = useState(0);

  // Store original positions for disassemble animation
  const originalPositions = useMemo(() => new Map<THREE.Object3D, THREE.Vector3>(), []);

  // Merge default colors with overrides
  const regionColors = useMemo(() => ({
    ...defaultRegionColors,
    ...(regionColorsOverride || {})
  }), [regionColorsOverride]);

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
      
      // Cache original positions of meshes
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh && !originalPositions.has(child)) {
          originalPositions.set(child, child.position.clone());
        }
      });

      // Call onLoad when scene is ready
      onLoad?.();
    }
  }, [scene, onLoad, originalPositions]);

  // Handle continuous slow rotation and color cycling
  useFrame((state, delta) => {
    if (!scene) return;
    scene.rotation.y += delta * 0.15; // slow rotation
    setTime((t) => t + delta);

    if (colorCycle && meshes.length) {
      // Cycle colors smoothly using HSL based on time, with slight per-mesh phase shift
      const speed = 0.05;
      meshes.forEach((mesh, idx) => {
        const material = mesh.material;
        const baseHue = ((time * speed * 360) + idx * 15) % 360;
        const targetColor = new THREE.Color();
        targetColor.setHSL(baseHue / 360, 0.6, 0.55);
        // Lerp to target for smooth transition
        material.color.lerp(targetColor, 0.08);
        // Subtle emissive glow for animation effect
        material.emissive.lerp(new THREE.Color(0x111111), 0.05);
        material.needsUpdate = true;
      });
    }

    // Disassemble/explode animation: move meshes slightly away from center
    if (meshes.length) {
      const center = new THREE.Vector3(0, 0, 0);
      meshes.forEach((mesh, idx) => {
        const orig = originalPositions.get(mesh) || center;
        const dir = new THREE.Vector3().subVectors(mesh.position, center);
        if (dir.lengthSq() === 0) {
          // compute direction from geometry bounding box
          const bbox = new THREE.Box3().setFromObject(mesh);
          const c = bbox.getCenter(new THREE.Vector3());
          dir.copy(c).normalize();
        } else {
          dir.normalize();
        }
        const distance = disassemble ? 0.18 + (idx % 3) * 0.05 : 0; // outward offset amount
        const target = new THREE.Vector3().copy(orig).addScaledVector(dir, distance);
        // Smoothly animate positions
        mesh.position.lerp(target, 0.08);
      });
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
  
  // Helper: region color as THREE.Color
  const getRegionColor = (r: RegionKey | null) => {
    if (!r) return new THREE.Color('#8aa0b6');
    const hex = regionColors[r] ?? 0x8aa0b6;
    return new THREE.Color(hex);
  };

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
  }, [scene, regionColors]);

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
            // softly transition to base color
            const baseColor = new THREE.Color(regionColors[r]);
            material.color.lerp(baseColor, 0.15);
          }
          material.emissive.setHex(0x000000);
        }
      } else {
        material.opacity = 1;
        if (r && regionColors[r]) {
          const base = new THREE.Color(regionColors[r]);
          if (isHovered) {
            material.emissive.setHex(0x666666);
            const hoverColor = base.clone().multiplyScalar(1.3);
            material.color.lerp(hoverColor, 0.2);
          } else {
            material.emissive.setHex(0x111111);
            material.color.lerp(base, 0.12);
          }
        }
      }
      material.depthWrite = material.opacity > 0.5;
      material.needsUpdate = true;
    });
  }, [meshes, activeRegions, labHighlight, hoveredMesh, isolationOpacity, regionColors]);

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
    onHoverRegion?.(region);
    
    if (typeof document !== 'undefined') {
      document.body.style.cursor = 'pointer';
    }
  }

  function onPointerLeave(e: any) {
    e.stopPropagation();
    onHoverRegion?.(null);
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

  // Small label component with mount transition
  function Label({ position, text, accent }: { position: [number, number, number]; text: string; accent: string }) {
    const [visible, setVisible] = React.useState(false);
    React.useEffect(() => {
      const t = setTimeout(() => setVisible(true), 10);
      return () => clearTimeout(t);
    }, [text]);
    return (
      <Html position={position} distanceFactor={6} center transform>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: 0.2,
          padding: '4px 8px',
          borderRadius: 10,
          background: 'linear-gradient(180deg, rgba(14,16,20,0.65), rgba(10,12,14,0.55))',
          border: `1px solid ${accent}30`,
          color: '#eaf3ff',
          boxShadow: `0 4px 12px ${accent}25`,
          backdropFilter: 'blur(4px)',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          transform: visible ? 'translateY(0px)' : 'translateY(4px)',
          opacity: visible ? 1 : 0,
          transition: 'opacity 240ms ease, transform 240ms ease',
          zIndex: 10
        }}>
          <span style={{
            width: 6,
            height: 6,
            borderRadius: 999,
            background: accent,
            boxShadow: `0 0 6px ${accent}`
          }} />
          {text}
        </div>
      </Html>
    );
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
      {showLabelsSmall && (
        <>
          {/* Hover label if any */}
          {hoveredRegion && (() => {
            const c = getRegionColor(hoveredRegion);
            const accent = `#${c.getHexString()}`;
            const pos: [number, number, number] = [hoveredPosition[0], hoveredPosition[1] + 0.08, hoveredPosition[2]];
            return <Label position={pos} text={REGION_INFO[hoveredRegion].title} accent={accent} />;
          })()}
          {/* Active region labels near their meshes */}
          {activeRegions.map((r) => {
            const mesh = meshes.find(m => m.userData.regionKey === r);
            let pos: [number, number, number];
            if (mesh) {
              const box = new THREE.Box3().setFromObject(mesh);
              const c = box.getCenter(new THREE.Vector3());
              pos = [c.x, c.y + 0.08, c.z];
            } else {
              // Fallback near center if mesh not found yet
              pos = [0, 0.08, 0];
            }
            const col = getRegionColor(r);
            const accent = `#${col.getHexString()}`;
            return (
              <Label key={r} position={pos} text={REGION_INFO[r].title} accent={accent} />
            );
          })}
        </>
      )}
    </>
  );
}