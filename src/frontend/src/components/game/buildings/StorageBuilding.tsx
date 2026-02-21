import { BuildingType } from '@/backend';

interface StorageBuildingProps {
  type: BuildingType;
  level: number;
}

export default function StorageBuilding({ type, level }: StorageBuildingProps) {
  const isGold = type === BuildingType.goldStorage;
  const color = isGold ? '#daa520' : '#8e44ad';
  const size = 1.8 + level * 0.15;

  return (
    <group>
      <mesh position={[0, size / 2, 0]} castShadow>
        <boxGeometry args={[size, size, size]} />
        <meshStandardMaterial color={color} metalness={0.5} roughness={0.3} />
      </mesh>
      
      {/* Lid */}
      <mesh position={[0, size + 0.2, 0]} castShadow>
        <boxGeometry args={[size * 1.1, 0.3, size * 1.1]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
    </group>
  );
}
