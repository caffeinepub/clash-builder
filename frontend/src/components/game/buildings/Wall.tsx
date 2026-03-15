import { useRef } from 'react';
import * as THREE from 'three';

interface WallProps {
  level: number;
  constructionProgress?: number;
}

export default function Wall({ level, constructionProgress = 1 }: WallProps) {
  const height = 1 + level * 0.2;
  const groupRef = useRef<THREE.Group>(null);

  return (
    <group ref={groupRef} scale={constructionProgress}>
      {/* Foundation */}
      <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.1, 0.2, 0.4]} />
        <meshStandardMaterial
          color="#6b5d52"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>

      {/* Main wall with stone blocks */}
      <mesh position={[0, height / 2 + 0.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[1, height, 0.3]} />
        <meshStandardMaterial
          color="#a9a9a9"
          roughness={0.9}
          metalness={0.05}
        />
      </mesh>

      {/* Stone block details - horizontal mortar lines */}
      {[0.25, 0.5, 0.75].map((ratio, i) => (
        <mesh key={`h-${i}`} position={[0, height * ratio + 0.1, 0.16]} castShadow>
          <boxGeometry args={[1.02, 0.03, 0.02]} />
          <meshStandardMaterial
            color="#8a8a8a"
            roughness={1.0}
            metalness={0.0}
          />
        </mesh>
      ))}

      {/* Vertical mortar lines */}
      {[-0.3, 0, 0.3].map((x, i) => (
        <mesh key={`v-${i}`} position={[x, height / 2 + 0.1, 0.16]} castShadow>
          <boxGeometry args={[0.03, height * 1.02, 0.02]} />
          <meshStandardMaterial
            color="#8a8a8a"
            roughness={1.0}
            metalness={0.0}
          />
        </mesh>
      ))}

      {/* Crenellations on top */}
      {[-0.35, -0.1, 0.15, 0.4].map((x, i) => (
        <mesh key={i} position={[x, height + 0.25, 0]} castShadow>
          <boxGeometry args={[0.2, 0.3, 0.3]} />
          <meshStandardMaterial
            color="#a9a9a9"
            roughness={0.9}
            metalness={0.05}
          />
        </mesh>
      ))}

      {/* Top cap */}
      <mesh position={[0, height + 0.12, 0]} castShadow>
        <boxGeometry args={[1.05, 0.05, 0.35]} />
        <meshStandardMaterial
          color="#8a8a8a"
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>
    </group>
  );
}
