'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Cylinder, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

interface GroceryItem {
  type: 'apple' | 'tomato' | 'bread' | 'milk' | 'cheese' | 'banana' | 'carrot' | 'avocado' | 'orange' | 'broccoli';
  orbitRadius: number;
  orbitSpeed: number;
  rotationSpeed: number;
  verticalOffset: number;
  zOffset: number; // positive = in front, negative = behind
  color: string;
  emissive: string;
  scale: number;
  initialAngle: number;
}

// Items distributed around the text - some in front (positive z), some behind (negative z)
const groceryItems: GroceryItem[] = [
  // Back layer items (negative z - behind text)
  { type: 'apple', orbitRadius: 3.8, orbitSpeed: 0.18, rotationSpeed: 0.3, verticalOffset: 0.8, zOffset: -2.5, color: '#ef4444', emissive: '#991b1b', scale: 1.4, initialAngle: 0 },
  { type: 'bread', orbitRadius: 4.2, orbitSpeed: -0.12, rotationSpeed: 0.2, verticalOffset: -0.6, zOffset: -3.0, color: '#d97706', emissive: '#92400e', scale: 1.5, initialAngle: Math.PI * 0.5 },
  { type: 'milk', orbitRadius: 3.5, orbitSpeed: 0.15, rotationSpeed: 0.15, verticalOffset: 0.3, zOffset: -2.8, color: '#f5f5f5', emissive: '#d4d4d4', scale: 1.3, initialAngle: Math.PI },
  { type: 'broccoli', orbitRadius: 4.0, orbitSpeed: -0.14, rotationSpeed: 0.25, verticalOffset: -0.9, zOffset: -2.2, color: '#22c55e', emissive: '#166534', scale: 1.2, initialAngle: Math.PI * 1.5 },
  
  // Front layer items (positive z - in front of text)
  { type: 'orange', orbitRadius: 3.2, orbitSpeed: -0.2, rotationSpeed: 0.35, verticalOffset: 0.6, zOffset: 2.5, color: '#f97316', emissive: '#c2410c', scale: 1.3, initialAngle: Math.PI * 0.3 },
  { type: 'banana', orbitRadius: 3.6, orbitSpeed: 0.16, rotationSpeed: 0.28, verticalOffset: -0.4, zOffset: 3.0, color: '#facc15', emissive: '#ca8a04', scale: 1.2, initialAngle: Math.PI * 0.8 },
  { type: 'avocado', orbitRadius: 3.0, orbitSpeed: -0.18, rotationSpeed: 0.22, verticalOffset: 0.2, zOffset: 2.2, color: '#65a30d', emissive: '#3f6212', scale: 1.4, initialAngle: Math.PI * 1.2 },
  { type: 'cheese', orbitRadius: 3.8, orbitSpeed: 0.14, rotationSpeed: 0.4, verticalOffset: -0.7, zOffset: 2.8, color: '#fbbf24', emissive: '#b45309', scale: 1.1, initialAngle: Math.PI * 1.7 },
  { type: 'tomato', orbitRadius: 2.8, orbitSpeed: -0.22, rotationSpeed: 0.32, verticalOffset: 0.9, zOffset: 2.0, color: '#dc2626', emissive: '#991b1b', scale: 1.2, initialAngle: Math.PI * 0.1 },
  { type: 'carrot', orbitRadius: 3.4, orbitSpeed: 0.19, rotationSpeed: 0.3, verticalOffset: -0.2, zOffset: 2.6, color: '#f97316', emissive: '#ea580c', scale: 1.0, initialAngle: Math.PI * 1.4 },
];

function GroceryMesh({ item, index }: { item: GroceryItem; index: number }) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;

    // Orbit around center with z-offset for depth
    const angle = item.initialAngle + time * item.orbitSpeed;
    meshRef.current.position.x = Math.cos(angle) * item.orbitRadius;
    meshRef.current.position.z = item.zOffset + Math.sin(angle) * 0.5; // Stay mostly at zOffset with slight movement
    meshRef.current.position.y = item.verticalOffset + Math.sin(time * 0.4 + index) * 0.3;

    // Gentle self rotation
    meshRef.current.rotation.x += item.rotationSpeed * 0.008;
    meshRef.current.rotation.y += item.rotationSpeed * 0.012;
  });

  const renderShape = () => {
    const scale = item.scale;
    switch (item.type) {
      case 'apple':
        return (
          <Sphere args={[0.18 * scale, 24, 24]}>
            <meshStandardMaterial 
              color={item.color} 
              emissive={item.emissive}
              emissiveIntensity={0.15}
              roughness={0.25} 
              metalness={0.1} 
            />
          </Sphere>
        );
      case 'tomato':
        return (
          <Sphere args={[0.16 * scale, 24, 24]}>
            <meshStandardMaterial 
              color={item.color} 
              emissive={item.emissive}
              emissiveIntensity={0.15}
              roughness={0.3} 
              metalness={0.05} 
            />
          </Sphere>
        );
      case 'avocado':
        return (
          <Sphere args={[0.17 * scale, 24, 24]}>
            <meshStandardMaterial 
              color={item.color} 
              emissive={item.emissive}
              emissiveIntensity={0.1}
              roughness={0.4} 
              metalness={0.0} 
            />
          </Sphere>
        );
      case 'bread':
        return (
          <RoundedBox args={[0.28 * scale, 0.18 * scale, 0.18 * scale]} radius={0.04} smoothness={4}>
            <meshStandardMaterial 
              color={item.color} 
              emissive={item.emissive}
              emissiveIntensity={0.1}
              roughness={0.7} 
            />
          </RoundedBox>
        );
      case 'milk':
        return (
          <RoundedBox args={[0.14 * scale, 0.28 * scale, 0.14 * scale]} radius={0.02} smoothness={4}>
            <meshStandardMaterial 
              color={item.color} 
              emissive={item.emissive}
              emissiveIntensity={0.05}
              roughness={0.15} 
              metalness={0.1}
            />
          </RoundedBox>
        );
      case 'cheese':
        return (
          <RoundedBox args={[0.2 * scale, 0.12 * scale, 0.14 * scale]} radius={0.02} smoothness={4}>
            <meshStandardMaterial 
              color={item.color} 
              emissive={item.emissive}
              emissiveIntensity={0.1}
              roughness={0.35} 
            />
          </RoundedBox>
        );
      case 'banana':
        return (
          <Cylinder args={[0.05 * scale, 0.07 * scale, 0.28 * scale, 12]} rotation={[0, 0, Math.PI / 5]}>
            <meshStandardMaterial 
              color={item.color} 
              emissive={item.emissive}
              emissiveIntensity={0.12}
              roughness={0.45} 
            />
          </Cylinder>
        );
      case 'carrot':
        return (
          <Cylinder args={[0.025 * scale, 0.07 * scale, 0.24 * scale, 12]}>
            <meshStandardMaterial 
              color={item.color} 
              emissive={item.emissive}
              emissiveIntensity={0.1}
              roughness={0.5} 
            />
          </Cylinder>
        );
      case 'orange':
        return (
          <Sphere args={[0.17 * scale, 24, 24]}>
            <meshStandardMaterial 
              color={item.color} 
              emissive={item.emissive}
              emissiveIntensity={0.15}
              roughness={0.35} 
              metalness={0.05} 
            />
          </Sphere>
        );
      case 'broccoli':
        return (
          <group>
            {/* Stem */}
            <Cylinder args={[0.03 * scale, 0.04 * scale, 0.12 * scale, 8]} position={[0, -0.06 * scale, 0]}>
              <meshStandardMaterial color="#4ade80" emissive="#166534" emissiveIntensity={0.1} roughness={0.6} />
            </Cylinder>
            {/* Florets */}
            <Sphere args={[0.1 * scale, 16, 16]} position={[0, 0.04 * scale, 0]}>
              <meshStandardMaterial color={item.color} emissive={item.emissive} emissiveIntensity={0.1} roughness={0.7} />
            </Sphere>
            <Sphere args={[0.07 * scale, 12, 12]} position={[0.06 * scale, 0.02 * scale, 0]}>
              <meshStandardMaterial color={item.color} emissive={item.emissive} emissiveIntensity={0.1} roughness={0.7} />
            </Sphere>
            <Sphere args={[0.07 * scale, 12, 12]} position={[-0.06 * scale, 0.02 * scale, 0]}>
              <meshStandardMaterial color={item.color} emissive={item.emissive} emissiveIntensity={0.1} roughness={0.7} />
            </Sphere>
          </group>
        );
      default:
        return (
          <Sphere args={[0.18 * scale, 24, 24]}>
            <meshStandardMaterial 
              color={item.color} 
              emissive={item.emissive}
              emissiveIntensity={0.1}
            />
          </Sphere>
        );
    }
  };

  return (
    <group ref={meshRef}>
      {renderShape()}
    </group>
  );
}

// Back layer groceries (behind text)
export function BackGroceries() {
  const backItems = groceryItems.filter(item => item.zOffset < 0);
  return (
    <group>
      {backItems.map((item, index) => (
        <GroceryMesh key={`back-${item.type}`} item={item} index={index} />
      ))}
    </group>
  );
}

// Front layer groceries (in front of text)
export function FrontGroceries() {
  const frontItems = groceryItems.filter(item => item.zOffset > 0);
  return (
    <group>
      {frontItems.map((item, index) => (
        <GroceryMesh key={`front-${item.type}`} item={item} index={index} />
      ))}
    </group>
  );
}

// Default export for backwards compatibility
export default function FloatingGroceries() {
  return (
    <group>
      {groceryItems.map((item, index) => (
        <GroceryMesh key={item.type} item={item} index={index} />
      ))}
    </group>
  );
}
