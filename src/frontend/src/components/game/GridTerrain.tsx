import { useMemo } from 'react';
import * as THREE from 'three';

export default function GridTerrain() {
  const gridSize = 30;
  const cellSize = 1;

  const gridHelper = useMemo(() => {
    return new THREE.GridHelper(gridSize, gridSize, 0x444444, 0x666666);
  }, [gridSize]);

  return (
    <group>
      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[gridSize, gridSize]} />
        <meshStandardMaterial color="#4a7c3a" />
      </mesh>

      {/* Grid lines */}
      <primitive object={gridHelper} position={[0, 0, 0]} />
    </group>
  );
}
