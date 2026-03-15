import { useState, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useBuildingPlacement } from '@/hooks/useBuildingPlacement';
import { getBuildingGeometry } from '@/constants/buildingStats';

export default function BuildingPlacement() {
  const { placementMode, ghostPosition, canPlace, cancelPlacement } = useBuildingPlacement();
  const meshRef = useRef<THREE.Mesh>(null);
  const { camera, raycaster, pointer } = useThree();

  useFrame(() => {
    if (!placementMode || !meshRef.current) return;

    // Raycast to find grid position
    raycaster.setFromCamera(pointer, camera);
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const intersection = new THREE.Vector3();
    raycaster.ray.intersectPlane(plane, intersection);

    if (intersection) {
      // Snap to grid
      const x = Math.round(intersection.x);
      const z = Math.round(intersection.z);
      meshRef.current.position.set(x, 0.5, z);
    }
  });

  if (!placementMode) return null;

  const geometry = getBuildingGeometry(placementMode);

  return (
    <mesh ref={meshRef} position={ghostPosition}>
      <boxGeometry args={geometry} />
      <meshStandardMaterial
        color={canPlace ? '#00ff00' : '#ff0000'}
        transparent
        opacity={0.5}
      />
    </mesh>
  );
}
