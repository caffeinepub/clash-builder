import { useMemo } from 'react';
import * as THREE from 'three';

export default function GridTerrain() {
  const gridSize = 30;

  // Load textures
  const grassTexture = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const texture = loader.load('/assets/generated/grass-terrain.dim_512x512.png');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(15, 15);
    return texture;
  }, []);

  const gridHelper = useMemo(() => {
    return new THREE.GridHelper(
      gridSize,
      gridSize,
      'rgba(60, 80, 40, 0.3)',
      'rgba(70, 90, 50, 0.2)'
    );
  }, [gridSize]);

  return (
    <group>
      {/* Textured ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[gridSize, gridSize]} />
        <meshStandardMaterial
          map={grassTexture}
          roughness={0.9}
          metalness={0.0}
        />
      </mesh>

      {/* Subtle grid lines */}
      <primitive object={gridHelper} position={[0, 0, 0]} />
    </group>
  );
}
