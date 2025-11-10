'use client';

import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, Html, useGLTF } from '@react-three/drei';
import { Group } from 'three';
import * as THREE from 'three';

export type RegionKey = 'Frontal' | 'Parietal' | 'Temporal' | 'Occipital' | 'Cerebellum' | 'Brainstem';

// Define colors for each brain region
const regionColors = {
  'Frontal': 0x3B82F6,    // Blue
  'Parietal': 0x10B981,   // Green  
  'Temporal': 0xF59E0B,   // Orange
  'Occipital': 0xEF4444,  // Red
  'Cerebellum': 0x8B5CF6, // Purple
  'Brainstem': 0x06B6D4   // Cyan
};

interface InteractiveBrainProps {
  activeRegions?: RegionKey[];
  labHighlight?: boolean;
  autoRotate?: boolean;
  onRegionSelect?: (region: RegionKey | null) => void;
  isolationOpacity?: number;
}

// Import and enhance the BrainScene component
function BrainScene({
  activeRegions = [],
  labHighlight = true,
  autoRotate = true,
  onRegionSelect,
  isolationOpacity = 0.12
}: InteractiveBrainProps) {
  const group = React.useRef<Group>(null);
  const { nodes } = useGLTF('/models/brain_areas.glb') as any;

  React.useEffect(() => {
    if (nodes) {
      Object.entries(nodes).forEach(([key, node]: [string, THREE.Mesh]) => {
        if (node instanceof THREE.Mesh && node.material instanceof THREE.MeshStandardMaterial) {
          const isActive = activeRegions.some(region => 
            key.toLowerCase().includes(region.toLowerCase())
          );

          // Base color for all regions
          node.material.color = new THREE.Color(labHighlight ? '#333333' : '#666666');
          node.material.opacity = isActive ? 0.8 : (labHighlight ? isolationOpacity : 0.5);
          node.material.transparent = true;
          node.material.needsUpdate = true;

          // Highlight active regions
          if (isActive) {
            node.material.color = new THREE.Color(regionColors[key as RegionKey] || '#06ffa5');
            node.material.needsUpdate = true;
          }
        }
      });
    }
  }, [nodes, activeRegions, labHighlight, isolationOpacity]);

  return (
    <group ref={group} dispose={null}>
      {nodes && Object.entries(nodes).map(([key, node]: [string, THREE.Mesh]) => {
        if (node instanceof THREE.Mesh) {
          return (
            <mesh
              key={key}
              geometry={node.geometry}
              material={node.material}
              position={node.position}
              rotation={node.rotation}
              scale={node.scale}
              onClick={(e) => {
                e.stopPropagation();
                onRegionSelect?.(key as RegionKey);
              }}
            >
              <Html>
                <div style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '10px',
                  pointerEvents: 'none'
                }}>
                  {key}
                </div>
              </Html>
            </mesh>
          );
        }
        return null;
      })}
    </group>
  );
}

export function InteractiveBrain({
  activeRegions = [],
  labHighlight = true,
  autoRotate = true,
  onRegionSelect,
  isolationOpacity = 0.12
}: InteractiveBrainProps) {
  const [isLoading, setIsLoading] = useState(true);

  const handleModelLoad = () => {
    setIsLoading(false);
  };

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas>
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <directionalLight position={[-5, -5, -5]} intensity={0.4} />
        <Suspense fallback={null}>
          <Stage intensity={0.8} environment="city" adjustCamera={false}>
            <BrainScene 
              activeRegions={activeRegions}
              labHighlight={labHighlight}
              autoRotate={autoRotate}
              onRegionSelect={onRegionSelect}
              isolationOpacity={isolationOpacity}
            />
          </Stage>
        </Suspense>
        <OrbitControls 
          enablePan={false} 
          enableZoom={true}
          enableRotate={true}
          autoRotate={autoRotate}
          autoRotateSpeed={0.5}
          minDistance={2}
          maxDistance={6}
        />
      </Canvas>

      {isLoading && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0, 0, 0, 0.5)',
          color: '#fff'
        }}>
          <div>Loading Brain Model...</div>
        </div>
      )}
    </div>
  );
}

useGLTF.preload('/models/brain_areas.glb');