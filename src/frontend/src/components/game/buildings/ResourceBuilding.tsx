import { BuildingType } from '@/backend';

interface ResourceBuildingProps {
  type: BuildingType;
  level: number;
}

export default function ResourceBuilding({ type, level }: ResourceBuildingProps) {
  const isGoldMine = type === BuildingType.goldMine;
  const isElixir = type === BuildingType.elixirCollector;
  const isBarracks = type === BuildingType.barracks;
  
  const color = isGoldMine ? '#ffd700' : isElixir ? '#9b59b6' : '#8b4513';
  const size = 1.5 + level * 0.1;

  return (
    <group>
      <mesh position={[0, size / 2, 0]} castShadow>
        <boxGeometry args={[size, size, size]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {isGoldMine && (
        <mesh position={[0, size + 0.3, 0]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial color="#ffed4e" emissive="#ffd700" emissiveIntensity={0.3} />
        </mesh>
      )}
      
      {isElixir && (
        <mesh position={[0, size + 0.3, 0]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial color="#c39bd3" emissive="#9b59b6" emissiveIntensity={0.3} />
        </mesh>
      )}
    </group>
  );
}
