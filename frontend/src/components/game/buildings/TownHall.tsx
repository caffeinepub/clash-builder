import { useRef } from 'react';
import * as THREE from 'three';

interface TownHallProps {
  level: number;
  constructionProgress?: number;
}

export default function TownHall({ level, constructionProgress = 1 }: TownHallProps) {
  const size = 2 + level * 0.2;
  const height = 2 + level * 0.3;
  const groupRef = useRef<THREE.Group>(null);

  return (
    <group ref={groupRef} scale={constructionProgress}>
      {/* Stone foundation */}
      <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
        <boxGeometry args={[size * 1.1, 0.3, size * 1.1]} />
        <meshStandardMaterial
          color="#6b5d52"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>

      {/* Main stone walls with detail */}
      <mesh position={[0, height / 2 + 0.15, 0]} castShadow receiveShadow>
        <boxGeometry args={[size, height, size]} />
        <meshStandardMaterial
          color="#8b7355"
          roughness={0.85}
          metalness={0.05}
        />
      </mesh>

      {/* Wall decorative bands */}
      <mesh position={[0, height * 0.3 + 0.15, 0]} castShadow>
        <boxGeometry args={[size * 1.02, 0.15, size * 1.02]} />
        <meshStandardMaterial
          color="#6b5d52"
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>
      <mesh position={[0, height * 0.7 + 0.15, 0]} castShadow>
        <boxGeometry args={[size * 1.02, 0.15, size * 1.02]} />
        <meshStandardMaterial
          color="#6b5d52"
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* Corner towers */}
      {[
        [size * 0.45, 0, size * 0.45],
        [-size * 0.45, 0, size * 0.45],
        [size * 0.45, 0, -size * 0.45],
        [-size * 0.45, 0, -size * 0.45],
      ].map((pos, i) => (
        <group key={i} position={pos as [number, number, number]}>
          <mesh position={[0, height * 0.6 + 0.15, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.25, 0.3, height * 1.2, 8]} />
            <meshStandardMaterial
              color="#7a6a58"
              roughness={0.85}
              metalness={0.05}
            />
          </mesh>
          <mesh position={[0, height * 1.2 + 0.3, 0]} castShadow>
            <coneGeometry args={[0.35, 0.4, 8]} />
            <meshStandardMaterial
              color="#a52a2a"
              roughness={0.7}
              metalness={0.1}
            />
          </mesh>
        </group>
      ))}

      {/* Entrance archway */}
      <mesh position={[0, height * 0.25 + 0.15, size * 0.51]} castShadow>
        <boxGeometry args={[0.8, height * 0.5, 0.1]} />
        <meshStandardMaterial
          color="#3a2f28"
          roughness={0.9}
          metalness={0.0}
        />
      </mesh>

      {/* Main roof */}
      <mesh position={[0, height + 0.45, 0]} castShadow>
        <coneGeometry args={[size * 0.75, 1.0, 4]} />
        <meshStandardMaterial
          color="#a52a2a"
          roughness={0.6}
          metalness={0.15}
        />
      </mesh>

      {/* Gold trim on roof */}
      <mesh position={[0, height + 0.9, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 0.3]} />
        <meshStandardMaterial
          color="#ffd700"
          roughness={0.2}
          metalness={0.9}
          emissive="#ffa500"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Flag pole */}
      <mesh position={[0, height + 1.5, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 1.0]} />
        <meshStandardMaterial
          color="#4a4a4a"
          roughness={0.4}
          metalness={0.7}
        />
      </mesh>

      {/* Flag */}
      <mesh position={[0.3, height + 1.7, 0]}>
        <planeGeometry args={[0.5, 0.3]} />
        <meshStandardMaterial
          color="#c41e3a"
          side={THREE.DoubleSide}
          roughness={0.8}
        />
      </mesh>
    </group>
  );
}
