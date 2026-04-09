'use client';

import { useRef, memo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  count?: number;
  size?: number;
  spread?: number;
}

// Seeded pseudo-random number generator for consistent results
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

// Pre-generate particle data outside component for pure rendering
function generateParticleData(count: number, spread: number) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  const color1Vec = new THREE.Color('#ffffff');
  const color2Vec = new THREE.Color('#a1a1aa');

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const seed1 = i * 3 + 1;
    const seed2 = i * 3 + 2;
    const seed3 = i * 3 + 3;
    const seed4 = i * 3 + 4;

    // Deterministic positions in a sphere
    const theta = seededRandom(seed1) * Math.PI * 2;
    const phi = Math.acos(2 * seededRandom(seed2) - 1);
    const radius = seededRandom(seed3) * spread;

    positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i3 + 2] = radius * Math.cos(phi);

    // Deterministic gradient colors
    const mixFactor = seededRandom(seed4);
    const color = color1Vec.clone().lerp(color2Vec, mixFactor);
    colors[i3] = color.r;
    colors[i3 + 1] = color.g;
    colors[i3 + 2] = color.b;
  }

  return { positions, colors };
}

// Pre-generate default particle data
const defaultParticleData = generateParticleData(150, 8);

// Memoized for performance
const ParticleField = memo(function ParticleField({
  count = 150,
  size = 0.02,
  spread = 8,
}: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const frameCount = useRef(0);

  // Use pre-generated data for default values, generate new for custom
  const { positions, colors } = count === 150 && spread === 8
    ? defaultParticleData
    : generateParticleData(count, spread);

  // Simplified animation - only rotate, skip frames for performance
  useFrame((state) => {
    if (!pointsRef.current) return;
    
    frameCount.current++;
    if (frameCount.current % 4 !== 0) return; // Only update every 4th frame
    
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.015;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
});

export default ParticleField;
