import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import GridTerrain from './GridTerrain';
import BuildingRenderer from './buildings/BuildingRenderer';
import { useBuildings } from '@/hooks/useQueries';
import BuildingPlacement from './BuildingPlacement';

export default function GameCanvas() {
  const { data: buildings = [] } = useBuildings();

  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [20, 20, 20], fov: 50 }}
        shadows
      >
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[10, 20, 10]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        
        <OrbitControls
          enableRotate={true}
          enablePan={true}
          enableZoom={true}
          minDistance={10}
          maxDistance={50}
          maxPolarAngle={Math.PI / 2.5}
        />

        <GridTerrain />
        
        {buildings.map((building, index) => (
          <BuildingRenderer key={index} building={building} />
        ))}

        <BuildingPlacement />
      </Canvas>
    </div>
  );
}
