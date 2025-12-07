'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { BrainScene } from './BrainScene';
import type { RegionKey } from './InteractiveBrain';

export default function BrainShowpiece({
  onRegionSelect,
  activeRegions = [],
  labHighlight = true,
  isolationOpacity = 0.12,
  regionColorsOverride,
  colorCycle = true,
  disassemble = false,
  autoSelect = true,
  showLabelsSmall = false,
}: {
  onRegionSelect?: (region: RegionKey | null) => void;
  activeRegions?: RegionKey[];
  labHighlight?: boolean;
  isolationOpacity?: number;
  regionColorsOverride?: Partial<Record<RegionKey, number>>;
  colorCycle?: boolean;
  disassemble?: boolean;
  autoSelect?: boolean;
  showLabelsSmall?: boolean;
}) {
  return (
    <div style={{ width: '100%', maxWidth: 520, aspectRatio: '1 / 1' }}>
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 3, 5]} intensity={0.8} />
        <pointLight position={[-3, -2, 2]} intensity={0.6} />
        <Suspense fallback={null}>
          <BrainScene 
            autoRotate 
            labHighlight={labHighlight} 
            isolationOpacity={isolationOpacity}
            onRegionSelect={onRegionSelect}
            activeRegions={activeRegions}
            regionColorsOverride={regionColorsOverride}
            colorCycle={colorCycle}
            disassemble={disassemble}
            showLabelsSmall={showLabelsSmall}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}