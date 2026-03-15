import { useRef } from 'react';
import * as THREE from 'three';
import { BuildingType } from '@/backend';

interface StorageBuildingProps {
  type: BuildingType;
  level: number;
  constructionProgress?: number;
}

export default function StorageBuilding({ type, level, constructionProgress = 1 }: StorageBuildingProps) {
  const isGold = type === BuildingType.goldStorage;
  const size = 1.8 + level * 0.15;
  const groupRef = useRef<THREE.Group>(null);

  return (
    <group ref={groupRef} scale={constructionProgress}>
      {/* Stone foundation */}
      <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
        <boxGeometry args={[size * 1.15, 0.3, size * 1.15]} />
        <meshStandardMaterial
          color="#6b5d52"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>

      {/* Main storage container with reinforced corners */}
      <mesh position={[0, size / 2 + 0.15, 0]} castShadow receiveShadow>
        <boxGeometry args={[size, size, size]} />
        <meshStandardMaterial
          color={isGold ? '#daa520' : '#8e44ad'}
          metalness={isGold ? 0.7 : 0.4}
          roughness={isGold ? 0.2 : 0.4}
          emissive={isGold ? '#b8860b' : '#7a3d99'}
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Corner bracing */}
      {[
        [size * 0.5, 0, size * 0.5],
        [-size * 0.5, 0, size * 0.5],
        [size * 0.5, 0, -size * 0.5],
        [-size * 0.5, 0, -size * 0.5],
      ].map((pos, i) => (
        <mesh
          key={i}
          position={[pos[0], size / 2 + 0.15, pos[2]]}
          castShadow
        >
          <boxGeometry args={[0.15, size * 1.1, 0.15]} />
          <meshStandardMaterial
            color="#4a4a4a"
            roughness={0.4}
            metalness={0.8}
          />
        </mesh>
      ))}

      {/* Reinforced bands */}
      {[0.3, 0.6].map((y, i) => (
        <mesh key={i} position={[0, size * y + 0.15, 0]} castShadow>
          <boxGeometry args={[size * 1.05, 0.1, size * 1.05]} />
          <meshStandardMaterial
            color="#4a4a4a"
            roughness={0.3}
            metalness={0.9}
          />
        </mesh>
      ))}

      {/* Lid with mechanism */}
      <mesh position={[0, size + 0.3, 0]} castShadow receiveShadow>
        <boxGeometry args={[size * 1.1, 0.3, size * 1.1]} />
        <meshStandardMaterial
          color="#654321"
          roughness={0.7}
          metalness={0.2}
        />
      </mesh>

      {/* Lock mechanism */}
      <mesh position={[0, size / 2 + 0.15, size * 0.51]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.1]} />
        <meshStandardMaterial
          color="#ffd700"
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Keyhole */}
      <mesh position={[0, size / 2 + 0.15, size * 0.52]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.05]} />
        <meshStandardMaterial
          color="#2a2a2a"
          roughness={0.8}
          metalness={0.3}
        />
      </mesh>

      {/* Glow effect for storage type */}
      {isGold ? (
        <mesh position={[0, size / 2 + 0.15, 0]}>
          <boxGeometry args={[size * 0.9, size * 0.9, size * 0.9]} />
          <meshStandardMaterial
            color="#ffd700"
            transparent
            opacity={0.1}
            emissive="#ffd700"
            emissiveIntensity={0.3}
          />
        </mesh>
      ) : (
        <mesh position={[0, size / 2 + 0.15, 0]}>
          <boxGeometry args={[size * 0.9, size * 0.9, size * 0.9]} />
          <meshStandardMaterial
            color="#9b59b6"
            transparent
            opacity={0.1}
            emissive="#9b59b6"
            emissiveIntensity={0.3}
          />
        </mesh>
      )}
    </group>
  );
}
