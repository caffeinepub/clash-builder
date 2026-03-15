import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Troop {
  id: string;
  type: string;
  position: [number, number, number];
  hp: number;
  maxHp: number;
}

interface TroopRendererProps {
  troop: Troop;
}

export default function TroopRenderer({ troop }: TroopRendererProps) {
  const groupRef = useRef<THREE.Group>(null);
  const weaponRef = useRef<THREE.Mesh>(null);

  const isBarbarian = troop.type === 'barbarian';
  const isArcher = troop.type === 'archer';
  const isGiant = troop.type === 'giant';

  const scale = isGiant ? 1.5 : isArcher ? 0.8 : 1.0;

  useFrame((state) => {
    if (groupRef.current) {
      // Walking bobbing animation
      const bobAmount = 0.08;
      const bobSpeed = 4;
      groupRef.current.position.y = 0.5 + Math.sin(state.clock.elapsedTime * bobSpeed) * bobAmount;
    }

    if (weaponRef.current && isBarbarian) {
      // Sword swing animation
      weaponRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 3) * 0.3;
    }
  });

  const bodyColor = useMemo(() => {
    if (isBarbarian) return '#ff6b6b';
    if (isArcher) return '#4ecdc4';
    return '#95e1d3';
  }, [isBarbarian, isArcher]);

  return (
    <group position={troop.position} ref={groupRef} scale={scale}>
      {isBarbarian && (
        <group>
          {/* Body */}
          <mesh position={[0, 0.5, 0]} castShadow>
            <capsuleGeometry args={[0.25, 0.5, 8, 16]} />
            <meshStandardMaterial
              color={bodyColor}
              roughness={0.8}
              metalness={0.1}
            />
          </mesh>

          {/* Head */}
          <mesh position={[0, 1.1, 0]} castShadow>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial
              color="#ffdbac"
              roughness={0.9}
              metalness={0.0}
            />
          </mesh>

          {/* Helmet */}
          <mesh position={[0, 1.2, 0]} castShadow>
            <coneGeometry args={[0.22, 0.3, 8]} />
            <meshStandardMaterial
              color="#4a4a4a"
              roughness={0.4}
              metalness={0.8}
            />
          </mesh>

          {/* Helmet spike */}
          <mesh position={[0, 1.45, 0]} castShadow>
            <coneGeometry args={[0.05, 0.15, 6]} />
            <meshStandardMaterial
              color="#ffd700"
              roughness={0.3}
              metalness={0.9}
            />
          </mesh>

          {/* Sword */}
          <mesh
            ref={weaponRef}
            position={[0.35, 0.6, 0]}
            rotation={[0, 0, -Math.PI / 4]}
            castShadow
          >
            <boxGeometry args={[0.08, 0.6, 0.08]} />
            <meshStandardMaterial
              color="#c0c0c0"
              roughness={0.2}
              metalness={0.9}
            />
          </mesh>

          {/* Sword handle */}
          <mesh position={[0.35, 0.3, 0]} castShadow>
            <boxGeometry args={[0.12, 0.15, 0.12]} />
            <meshStandardMaterial
              color="#654321"
              roughness={0.8}
              metalness={0.1}
            />
          </mesh>

          {/* Shield */}
          <mesh position={[-0.3, 0.5, 0]} rotation={[0, Math.PI / 6, 0]} castShadow>
            <cylinderGeometry args={[0.2, 0.2, 0.05, 8]} />
            <meshStandardMaterial
              color="#8b4513"
              roughness={0.7}
              metalness={0.2}
            />
          </mesh>
        </group>
      )}

      {isArcher && (
        <group>
          {/* Body */}
          <mesh position={[0, 0.5, 0]} castShadow>
            <capsuleGeometry args={[0.2, 0.5, 8, 16]} />
            <meshStandardMaterial
              color={bodyColor}
              roughness={0.8}
              metalness={0.1}
            />
          </mesh>

          {/* Head */}
          <mesh position={[0, 1.0, 0]} castShadow>
            <sphereGeometry args={[0.18, 16, 16]} />
            <meshStandardMaterial
              color="#ffdbac"
              roughness={0.9}
              metalness={0.0}
            />
          </mesh>

          {/* Hood */}
          <mesh position={[0, 1.1, 0]} castShadow>
            <coneGeometry args={[0.2, 0.3, 8]} />
            <meshStandardMaterial
              color="#2d5016"
              roughness={0.9}
              metalness={0.0}
            />
          </mesh>

          {/* Bow */}
          <mesh position={[-0.3, 0.6, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <torusGeometry args={[0.25, 0.02, 8, 16, Math.PI]} />
            <meshStandardMaterial
              color="#654321"
              roughness={0.8}
              metalness={0.0}
            />
          </mesh>

          {/* Quiver */}
          <mesh position={[0.2, 0.7, -0.15]} castShadow>
            <cylinderGeometry args={[0.08, 0.06, 0.4]} />
            <meshStandardMaterial
              color="#654321"
              roughness={0.8}
              metalness={0.0}
            />
          </mesh>

          {/* Arrows in quiver */}
          {[0, 1, 2].map((i) => (
            <mesh
              key={i}
              position={[0.2 + i * 0.03, 0.95, -0.15]}
              rotation={[Math.PI / 12, 0, 0]}
              castShadow
            >
              <cylinderGeometry args={[0.015, 0.015, 0.3]} />
              <meshStandardMaterial
                color="#8b4513"
                roughness={0.7}
                metalness={0.0}
              />
            </mesh>
          ))}
        </group>
      )}

      {isGiant && (
        <group>
          {/* Body */}
          <mesh position={[0, 0.7, 0]} castShadow>
            <capsuleGeometry args={[0.35, 0.8, 8, 16]} />
            <meshStandardMaterial
              color={bodyColor}
              roughness={0.8}
              metalness={0.1}
            />
          </mesh>

          {/* Head */}
          <mesh position={[0, 1.6, 0]} castShadow>
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshStandardMaterial
              color="#ffdbac"
              roughness={0.9}
              metalness={0.0}
            />
          </mesh>

          {/* Hair/beard */}
          <mesh position={[0, 1.5, 0]} castShadow>
            <sphereGeometry args={[0.32, 16, 16]} />
            <meshStandardMaterial
              color="#654321"
              roughness={1.0}
              metalness={0.0}
            />
          </mesh>

          {/* Club */}
          <mesh
            ref={weaponRef}
            position={[0.5, 0.8, 0]}
            rotation={[0, 0, -Math.PI / 3]}
            castShadow
          >
            <cylinderGeometry args={[0.15, 0.08, 1.0]} />
            <meshStandardMaterial
              color="#654321"
              roughness={0.9}
              metalness={0.0}
            />
          </mesh>

          {/* Club spikes */}
          {[0, 1, 2, 3].map((i) => (
            <mesh
              key={i}
              position={[
                0.5 + Math.cos((i * Math.PI) / 2) * 0.12,
                1.2,
                Math.sin((i * Math.PI) / 2) * 0.12,
              ]}
              castShadow
            >
              <coneGeometry args={[0.05, 0.15, 6]} />
              <meshStandardMaterial
                color="#4a4a4a"
                roughness={0.5}
                metalness={0.7}
              />
            </mesh>
          ))}

          {/* Belt */}
          <mesh position={[0, 0.5, 0]} castShadow>
            <cylinderGeometry args={[0.36, 0.36, 0.15, 16]} />
            <meshStandardMaterial
              color="#654321"
              roughness={0.8}
              metalness={0.2}
            />
          </mesh>
        </group>
      )}

      {/* HP Bar background */}
      <mesh position={[0, 1.8 * scale, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.8, 0.1]} />
        <meshBasicMaterial color="#ff0000" side={THREE.DoubleSide} />
      </mesh>

      {/* HP Bar foreground */}
      <mesh position={[0, 1.8 * scale, 0.01]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.8 * (troop.hp / troop.maxHp), 0.1]} />
        <meshBasicMaterial color="#00ff00" side={THREE.DoubleSide} />
      </mesh>

      {/* HP Bar border */}
      <mesh position={[0, 1.8 * scale, 0.02]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.82, 0.12]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}
