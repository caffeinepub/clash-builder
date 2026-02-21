import { BuildingType } from '@/backend';

interface DefensiveBuildingProps {
  type: BuildingType;
  level: number;
}

export default function DefensiveBuilding({ type, level }: DefensiveBuildingProps) {
  const isCannon = type === BuildingType.cannon;
  const height = 2 + level * 0.3;

  return (
    <group>
      {/* Base */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.8, 1, 1, 8]} />
        <meshStandardMaterial color="#696969" />
      </mesh>

      {/* Tower */}
      <mesh position={[0, height / 2 + 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.6, 0.7, height, 8]} />
        <meshStandardMaterial color="#808080" />
      </mesh>

      {/* Weapon */}
      {isCannon ? (
        <mesh position={[0.5, height + 0.5, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.15, 0.15, 1]} />
          <meshStandardMaterial color="#2c3e50" />
        </mesh>
      ) : (
        <mesh position={[0, height + 1, 0]}>
          <coneGeometry args={[0.4, 0.8, 4]} />
          <meshStandardMaterial color="#8b4513" />
        </mesh>
      )}
    </group>
  );
}
