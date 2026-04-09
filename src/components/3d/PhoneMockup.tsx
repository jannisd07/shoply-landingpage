'use client';

import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useMousePosition } from '@/hooks';

interface PhoneMockupProps {
  screenshots?: string[];
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}

export default function PhoneMockup({
  screenshots = [
    '/images/screenshots/screenshot-1.png',
    '/images/screenshots/screenshot-2.png',
    '/images/screenshots/screenshot-3.png',
  ],
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
}: PhoneMockupProps) {
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useMousePosition();
  const [currentScreenshot, setCurrentScreenshot] = useState(0);
  const targetRotation = useRef({ x: 0, y: 0 });

  // Cycle through screenshots
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentScreenshot((prev) => (prev + 1) % screenshots.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [screenshots.length]);

  useFrame((state) => {
    if (!groupRef.current) return;

    const time = state.clock.elapsedTime;

    // Mouse-based rotation with lerp
    targetRotation.current.x = mouse.normalizedY * 0.2;
    targetRotation.current.y = mouse.normalizedX * 0.3;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      rotation[0] + targetRotation.current.x,
      0.05
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      rotation[1] + targetRotation.current.y + time * 0.05,
      0.05
    );

    // Subtle floating animation
    groupRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.1;
  });

  // Phone dimensions (iPhone-like proportions)
  const phoneWidth = 0.75 * scale;
  const phoneHeight = 1.6 * scale;
  const phoneDepth = 0.08 * scale;
  const screenWidth = phoneWidth * 0.92;
  const screenHeight = phoneHeight * 0.95;

  return (
    <group ref={groupRef} position={position}>
      {/* Phone body */}
      <RoundedBox
        args={[phoneWidth, phoneHeight, phoneDepth]}
        radius={0.06 * scale}
        smoothness={4}
      >
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.8}
          roughness={0.2}
          envMapIntensity={1}
        />
      </RoundedBox>

      {/* Screen bezel */}
      <RoundedBox
        args={[screenWidth, screenHeight, 0.01]}
        radius={0.04 * scale}
        smoothness={4}
        position={[0, 0, phoneDepth / 2 + 0.005]}
      >
        <meshStandardMaterial color="#000000" />
      </RoundedBox>

      {/* Screen with HTML content */}
      <Html
        transform
        occlude
        position={[0, 0, phoneDepth / 2 + 0.02]}
        style={{
          width: `${screenWidth * 200}px`,
          height: `${screenHeight * 200}px`,
          borderRadius: '16px',
          overflow: 'hidden',
          background: '#000',
        }}
      >
        <div className="relative w-full h-full">
          {screenshots.map((src, index) => (
            <div
              key={src}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentScreenshot ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={src}
                alt={`App screenshot ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </Html>

      {/* Camera notch */}
      <mesh position={[0, phoneHeight / 2 - 0.08, phoneDepth / 2 + 0.01]} rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[0.02, 0.08, 4, 8]} />
        <meshStandardMaterial color="#0a0a0a" />
      </mesh>

      {/* Side buttons */}
      <mesh position={[phoneWidth / 2 + 0.01, 0.2, 0]}>
        <boxGeometry args={[0.02, 0.15, 0.03]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.9} roughness={0.3} />
      </mesh>

      {/* Rim light effect */}
      <pointLight
        position={[-1, 0.5, 1]}
        intensity={0.5}
        color="#10b981"
        distance={3}
      />
      <pointLight
        position={[1, -0.5, 1]}
        intensity={0.3}
        color="#3b82f6"
        distance={3}
      />
    </group>
  );
}
