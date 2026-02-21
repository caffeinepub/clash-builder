interface WallProps {
  level: number;
}

export default function Wall({ level }: WallProps) {
  const height = 1 + level * 0.2;

  return (
    <mesh position={[0, height / 2, 0]} castShadow>
      <boxGeometry args={[1, height, 0.3]} />
      <meshStandardMaterial color="#a9a9a9" />
    </mesh>
  );
}
