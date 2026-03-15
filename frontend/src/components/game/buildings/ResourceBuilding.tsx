import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { BuildingType } from '@/backend';

interface ResourceBuildingProps {
  type: BuildingType;
  level: number;
  constructionProgress?: number;
}

export default function ResourceBuilding({ type, level, constructionProgress = 1 }: ResourceBuildingProps) {
  const isGoldMine = type === BuildingType.goldMine;
  const isElixir = type === BuildingType.elixirCollector;
  const isBarracks = type === BuildingType.barracks;
  
  const size = 1.5 + level * 0.1;
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Particle system for resource generation
  const particles = useMemo(() => {
    if (!isGoldMine && !isElixir) return null;
    
    const count = 50;
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 0.5;
      positions[i * 3 + 1] = Math.random() * 0.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
      velocities[i * 3 + 1] = 0.01 + Math.random() * 0.02;
    }
    
    return { positions, velocities };
  }, [isGoldMine, isElixir]);

  useFrame((state) => {
    if (particlesRef.current && particles) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < positions.length / 3; i++) {
        positions[i * 3 + 1] += particles.velocities[i * 3 + 1];
        
        if (positions[i * 3 + 1] > size + 1) {
          positions[i * 3 + 1] = size * 0.5;
        }
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  if (isGoldMine) {
    return (
      <group ref={groupRef} scale={constructionProgress}>
        {/* Mine entrance */}
        <mesh position={[0, size * 0.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[size, size * 0.8, size]} />
          <meshStandardMaterial
            color="#8b7355"
            roughness={0.9}
            metalness={0.1}
          />
        </mesh>

        {/* Mine shaft opening */}
        <mesh position={[0, size * 0.3, size * 0.51]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.4, 0.4, 0.6, 8]} />
          <meshStandardMaterial
            color="#2a2a2a"
            roughness={1.0}
            metalness={0.0}
          />
        </mesh>

        {/* Support beams */}
        {[-0.5, 0.5].map((x, i) => (
          <mesh key={i} position={[x, size * 0.7, 0]} castShadow>
            <boxGeometry args={[0.15, size * 1.4, 0.15]} />
            <meshStandardMaterial
              color="#654321"
              roughness={0.9}
              metalness={0.0}
            />
          </mesh>
        ))}

        {/* Minecart */}
        <group position={[0.6, 0.2, 0.6]}>
          <mesh castShadow>
            <boxGeometry args={[0.4, 0.25, 0.3]} />
            <meshStandardMaterial
              color="#4a4a4a"
              roughness={0.5}
              metalness={0.6}
            />
          </mesh>
        </group>

        {/* Ore pile */}
        <mesh position={[-0.5, 0.15, 0.5]} castShadow>
          <dodecahedronGeometry args={[0.3]} />
          <meshStandardMaterial
            color="#ffd700"
            roughness={0.3}
            metalness={0.8}
            emissive="#ffa500"
            emissiveIntensity={0.3}
          />
        </mesh>

        {/* Gold sparkle particles */}
        {particles && (
          <points ref={particlesRef} position={[0, size * 0.5, 0]}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[particles.positions, 3]}
                count={particles.positions.length / 3}
                itemSize={3}
              />
            </bufferGeometry>
            <pointsMaterial
              size={0.08}
              color="#ffd700"
              transparent
              opacity={0.8}
              sizeAttenuation
            />
          </points>
        )}
      </group>
    );
  }

  if (isElixir) {
    return (
      <group ref={groupRef} scale={constructionProgress}>
        {/* Base platform */}
        <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[size * 0.6, size * 0.7, 0.4, 8]} />
          <meshStandardMaterial
            color="#6b5d52"
            roughness={0.8}
            metalness={0.2}
          />
        </mesh>

        {/* Main containment vessel */}
        <mesh position={[0, size * 0.5, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[size * 0.5, size * 0.6, size, 8]} />
          <meshStandardMaterial
            color="#7a5c8f"
            roughness={0.3}
            metalness={0.4}
            emissive="#9b59b6"
            emissiveIntensity={0.2}
          />
        </mesh>

        {/* Glass viewing window */}
        <mesh position={[0, size * 0.5, size * 0.55]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.3, 0.3, 0.1, 8]} />
          <meshStandardMaterial
            color="#c39bd3"
            transparent
            opacity={0.6}
            roughness={0.1}
            metalness={0.1}
            emissive="#9b59b6"
            emissiveIntensity={0.4}
          />
        </mesh>

        {/* Collection pipes */}
        {[0, Math.PI / 2, Math.PI, -Math.PI / 2].map((angle, i) => (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * size * 0.5,
              size * 0.3,
              Math.sin(angle) * size * 0.5,
            ]}
            rotation={[0, angle, Math.PI / 2]}
            castShadow
          >
            <cylinderGeometry args={[0.08, 0.08, 0.4]} />
            <meshStandardMaterial
              color="#4a4a4a"
              roughness={0.4}
              metalness={0.7}
            />
          </mesh>
        ))}

        {/* Top cap */}
        <mesh position={[0, size + 0.2, 0]} castShadow>
          <cylinderGeometry args={[size * 0.4, size * 0.5, 0.3, 8]} />
          <meshStandardMaterial
            color="#5a4a6f"
            roughness={0.5}
            metalness={0.5}
          />
        </mesh>

        {/* Magical elixir particles */}
        {particles && (
          <points ref={particlesRef} position={[0, size * 0.5, 0]}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[particles.positions, 3]}
                count={particles.positions.length / 3}
                itemSize={3}
              />
            </bufferGeometry>
            <pointsMaterial
              size={0.1}
              color="#c39bd3"
              transparent
              opacity={0.7}
              sizeAttenuation
            />
          </points>
        )}
      </group>
    );
  }

  // Barracks
  return (
    <group ref={groupRef} scale={constructionProgress}>
      {/* Main building */}
      <mesh position={[0, size * 0.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[size * 1.2, size * 0.8, size]} />
        <meshStandardMaterial
          color="#8b4513"
          roughness={0.9}
          metalness={0.0}
        />
      </mesh>

      {/* Roof */}
      <mesh position={[0, size * 0.8 + 0.3, 0]} castShadow>
        <boxGeometry args={[size * 1.3, 0.1, size * 1.1]} />
        <meshStandardMaterial
          color="#654321"
          roughness={0.8}
          metalness={0.0}
        />
      </mesh>
      <mesh position={[0, size * 0.8 + 0.5, 0]} rotation={[0, 0, 0]} castShadow>
        <boxGeometry args={[size * 1.3, 0.4, size * 0.1]} />
        <meshStandardMaterial
          color="#654321"
          roughness={0.8}
          metalness={0.0}
        />
      </mesh>

      {/* Training yard fence */}
      {[-0.7, 0.7].map((x, i) => (
        <mesh key={i} position={[x, 0.3, 0.8]} castShadow>
          <boxGeometry args={[0.1, 0.6, 0.1]} />
          <meshStandardMaterial
            color="#654321"
            roughness={0.9}
            metalness={0.0}
          />
        </mesh>
      ))}

      {/* Door */}
      <mesh position={[0, 0.3, size * 0.51]} castShadow>
        <boxGeometry args={[0.5, 0.6, 0.05]} />
        <meshStandardMaterial
          color="#3a2f28"
          roughness={0.9}
          metalness={0.0}
        />
      </mesh>

      {/* Windows */}
      {[-0.4, 0.4].map((x, i) => (
        <mesh key={i} position={[x, 0.5, size * 0.51]} castShadow>
          <boxGeometry args={[0.2, 0.2, 0.05]} />
          <meshStandardMaterial
            color="#ffa500"
            emissive="#ff8800"
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
}
