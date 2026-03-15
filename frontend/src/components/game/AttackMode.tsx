import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import GridTerrain from './GridTerrain';
import BuildingRenderer from './buildings/BuildingRenderer';
import TroopDeploymentUI from './troops/TroopDeploymentUI';
import TroopRenderer from './troops/TroopRenderer';
import { useAttackMode } from '@/hooks/useAttackMode';
import { Building } from '@/backend';

interface AttackModeProps {
  onExit: () => void;
}

export default function AttackMode({ onExit }: AttackModeProps) {
  const { enemyBase, deployTroop, troops, battleEnded, battleResult } = useAttackMode();
  const [buildings, setBuildings] = useState<Building[]>([]);

  useEffect(() => {
    if (enemyBase) {
      setBuildings(enemyBase);
    }
  }, [enemyBase]);

  return (
    <div className="absolute inset-0 z-10">
      {/* Back Button */}
      <Button
        onClick={onExit}
        className="absolute top-20 left-4 z-20 bg-gray-700 hover:bg-gray-800"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Base
      </Button>

      {/* Battle Result */}
      {battleEnded && battleResult && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 bg-black/80 p-8 rounded-lg border-4 border-yellow-500">
          <h2 className="text-3xl font-bold text-yellow-400 mb-4 text-center">Battle Complete!</h2>
          <div className="text-white space-y-2">
            <p className="text-xl">Destruction: {Number(battleResult.destructionPercentage)}%</p>
            <p className="flex items-center gap-2">
              <img src="/assets/generated/gold-icon.dim_64x64.png" alt="Gold" className="w-6 h-6" />
              +{Number(battleResult.lootGold)} Gold
            </p>
            <p className="flex items-center gap-2">
              <img src="/assets/generated/elixir-icon.dim_64x64.png" alt="Elixir" className="w-6 h-6" />
              +{Number(battleResult.lootElixir)} Elixir
            </p>
            <div className="flex gap-1 justify-center mt-4">
              {[1, 2, 3].map((star) => (
                <img
                  key={star}
                  src="/assets/generated/star-icon.dim_64x64.png"
                  alt="Star"
                  className="w-8 h-8"
                  style={{
                    opacity: Number(battleResult.destructionPercentage) >= star * 33 ? 1 : 0.3
                  }}
                />
              ))}
            </div>
          </div>
          <Button onClick={onExit} className="w-full mt-6 bg-green-600 hover:bg-green-700">
            Return to Base
          </Button>
        </div>
      )}

      {/* 3D Battle View with enhanced lighting */}
      <Canvas
        camera={{ position: [20, 20, 20], fov: 50 }}
        shadows
        gl={{ antialias: true }}
      >
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

        {troops.map((troop, index) => (
          <TroopRenderer key={index} troop={troop} />
        ))}
      </Canvas>

      {/* Troop Deployment UI */}
      {!battleEnded && <TroopDeploymentUI onDeploy={deployTroop} />}
    </div>
  );
}
