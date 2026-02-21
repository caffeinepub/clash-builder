interface TownHallProps {
  level: number;
}

export default function TownHall({ level }: TownHallProps) {
  const size = 2 + level * 0.2;
  const height = 2 + level * 0.3;

  return (
    <group>
      {/* Main building */}
      <mesh position={[0, height / 2, 0]} castShadow>
        <boxGeometry args={[size, height, size]} />
        <meshStandardMaterial color="#8b7355" />
      </mesh>
      
      {/* Roof */}
      <mesh position={[0, height + 0.3, 0]} castShadow>
        <coneGeometry args={[size * 0.7, 0.8, 4]} />
        <meshStandardMaterial color="#a52a2a" />
      </mesh>

      {/* Flag */}
      <mesh position={[0, height + 1.2, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.8]} />
        <meshStandardMaterial color="#4a4a4a" />
      </mesh>
    </group>
  );
}
