import { useRef } from 'react';
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
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = 0.5 + Math.sin(state.clock.elapsedTime * 3) * 0.1;
    }
  });

  const color = troop.type === 'barbarian' ? '#ff6b6b' : troop.type === 'archer' ? '#4ecdc4' : '#95e1d3';

  return (
    <group position={troop.position}>
      <mesh ref={meshRef} castShadow>
        <capsuleGeometry args={[0.3, 0.6, 8, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* HP Bar */}
      <mesh position={[0, 1.5, 0]}>
        <planeGeometry args={[0.8, 0.1]} />
        <meshBasicMaterial color="#ff0000" />
      </mesh>
      <mesh position={[0, 1.5, 0.01]}>
        <planeGeometry args={[0.8 * (troop.hp / troop.maxHp), 0.1]} />
        <meshBasicMaterial color="#00ff00" />
      </mesh>
    </group>
  );
}
