'use client';

import { Suspense, memo, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, AdaptiveDpr } from '@react-three/drei';
import ParticleField from './ParticleField';

interface SceneProps {
  showParticles?: boolean;
  className?: string;
}

// Memoized scene content to prevent unnecessary re-renders
const SceneContent = memo(function SceneContent({ showParticles = true }: SceneProps) {
  return (
    <>
      {/* Camera */}
      <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={50} />

      {/* Simplified lighting for performance */}
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} intensity={1.0} />

      {/* Particles */}
      {showParticles && <ParticleField count={150} spread={5} />}
    </>
  );
});

export default function Scene({ showParticles = true, className }: SceneProps) {
  // Memoize canvas config for performance
  const glConfig = useMemo(() => ({
    antialias: false,
    alpha: true,
    powerPreference: 'high-performance' as const,
    stencil: false,
    depth: true,
  }), []);

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <Canvas
        dpr={[1, 1.5]}
        gl={glConfig}
        style={{ background: 'transparent' }}
        frameloop="demand" // Only render when needed
        performance={{ min: 0.5 }} // Allow frame drops for performance
      >
        {/* Adaptive DPR based on performance */}
        <AdaptiveDpr pixelated />
        
        <Suspense fallback={null}>
          <SceneContent showParticles={showParticles} />
        </Suspense>
      </Canvas>
    </div>
  );
}
