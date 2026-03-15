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
        gl={{ antialias: true }}
      >
        {/* Enhanced lighting setup */}
        <ambientLight intensity={0.4} />
        <hemisphereLight
          color="#87ceeb"
          groundColor="#5a4a3a"
          intensity={0.3}
        />
        <directionalLight
          position={[15, 25, 15]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-left={-20}
          shadow-camera-right={20}
          shadow-camera-top={20}
          shadow-camera-bottom={-20}
          shadow-camera-near={0.5}
          shadow-camera-far={50}
          shadow-bias={-0.0001}
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
