'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, Html, Loader } from '@react-three/drei';
import { BrainScene } from './BrainScene';

export type RegionKey = 'Frontal' | 'Parietal' | 'Temporal' | 'Occipital' | 'Cerebellum' | 'Brainstem';

export const REGION_INFO = {
  Frontal: {
    title: 'Frontal Lobe',
    short: 'Decision-making, planning, voluntary movement, speech (Broca area).',
    details: 'The frontal lobe is involved in higher cognitive functions such as planning, reasoning, problem-solving, and controlling voluntary movements and speech. It also contributes to personality and emotional regulation.'
  },
  Parietal: {
    title: 'Parietal Lobe',
    short: 'Sensory integration, spatial attention, touch perception.',
    details: 'The parietal lobe processes sensory information from different parts of the body and integrates visual and spatial information to guide movement and attention.'
  },
  Temporal: {
    title: 'Temporal Lobe',
    short: 'Memory, language comprehension, auditory processing.',
    details: 'The temporal lobe plays a key role in processing auditory information and is important for the formation of long-term memory and language comprehension.'
  },
  Occipital: {
    title: 'Occipital Lobe',
    short: 'Primary visual processing center.',
    details: 'Primarily responsible for processing visual information, including identification of shapes, colors, and motion.'
  },
  Cerebellum: {
    title: 'Cerebellum',
    short: 'Coordination, balance, fine motor control.',
    details: "Although small in volume, the cerebellum contains a large fraction of the brain's neurons and is essential for motor coordination, timing, and motor learning."
  },
  Brainstem: {
    title: 'Brainstem',
    short: 'Autonomic functions: breathing, heart rate, arousal.',
    details: 'The brainstem controls basic life-sustaining functions such as breathing, heart rate, and sleep-wake cycles, and serves as a conduit between the brain and spinal cord.'
  }
} as const;

interface InteractiveBrainProps {
  activeRegions?: RegionKey[];
  labHighlight?: boolean;
  autoRotate?: boolean;
  onRegionSelect?: (region: RegionKey | null) => void;
  isolationOpacity?: number;
}

class ModelErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Html center>
          <div style={{ 
            background: 'rgba(0, 0, 0, 0.8)', 
            padding: '20px', 
            borderRadius: '10px', 
            textAlign: 'center',
            maxWidth: '300px',
            border: '1px solid rgba(6, 255, 165, 0.3)',
            backdropFilter: 'blur(4px)'
          }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#dc2626' }}>Brain Model Missing</h3>
            <p style={{ margin: '10px 0', fontSize: '14px', color: '#fff' }}>
              Please place a 3D brain model file at:
            </p>
            <code style={{ 
              background: 'rgba(0, 212, 255, 0.1)', 
              padding: '4px 8px', 
              borderRadius: '4px',
              fontSize: '12px',
              color: '#06ffa5'
            }}>
              /public/models/brain_areas.glb
            </code>
            <p style={{ marginTop: '15px', fontSize: '13px', color: '#cbd5e1' }}>
              You can download free brain models from:
              <br />• Sketchfab (free models)
              <br />• OpenNeuro (scientific models)  
              <br />• NIH 3D Print Exchange
            </p>
          </div>
        </Html>
      );
    }

    return this.props.children;
  }
}

export function InteractiveBrain({ 
  activeRegions = [], 
  labHighlight = false,
  autoRotate = true,
  onRegionSelect,
  isolationOpacity = 0.12
}: InteractiveBrainProps) {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '600px', position: 'relative' }}>
      <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={0.6} />
        <Suspense fallback={
          <Html center>
            <div style={{ 
              color: '#06ffa5',
              fontSize: '14px',
              fontWeight: 600,
              textShadow: '0 0 10px rgba(6, 255, 165, 0.3)'
            }}>
              Loading Neural Model...
            </div>
          </Html>
        }>
          <ModelErrorBoundary>
            <Stage 
              intensity={0.6} 
              environment="city"
              adjustCamera={true}
              shadows={false}
            >
              <BrainScene 
                activeRegions={activeRegions}
                labHighlight={labHighlight}
                autoRotate={autoRotate}
                onRegionSelect={onRegionSelect}
                isolationOpacity={isolationOpacity}
              />
            </Stage>
          </ModelErrorBoundary>
        </Suspense>
        <OrbitControls 
          enablePan={false} 
          enableZoom={true}
          enableRotate={true}
          minDistance={1.5}
          maxDistance={5}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI - Math.PI / 6}
          target={[0, 0, 0]}
        />
      </Canvas>
      <Loader />
    </div>
  );
}