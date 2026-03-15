import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { TroopType } from '@/backend';

interface TroopDeploymentUIProps {
  onDeploy: (type: TroopType, x: number, z: number) => void;
}

export default function TroopDeploymentUI({ onDeploy }: TroopDeploymentUIProps) {
  const [selectedTroop, setSelectedTroop] = useState<TroopType | null>(null);

  const troops = [
    { type: TroopType.barbarian, name: 'Barbarian', icon: '/assets/generated/barbarian-portrait.dim_96x96.png', count: 10 },
    { type: TroopType.archer, name: 'Archer', icon: '/assets/generated/archer-portrait.dim_96x96.png', count: 10 },
    { type: TroopType.giant, name: 'Giant', icon: '/assets/generated/giant-portrait.dim_96x96.png', count: 5 },
  ];

  const handleCanvasClick = (event: React.MouseEvent) => {
    if (!selectedTroop) return;
    
    // Simple deployment at random position for demo
    const x = Math.floor(Math.random() * 20) - 10;
    const z = Math.floor(Math.random() * 20) - 10;
    onDeploy(selectedTroop, x, z);
  };

  return (
    <>
      {selectedTroop && (
        <div 
          className="absolute inset-0 z-15 cursor-crosshair"
          onClick={handleCanvasClick}
        />
      )}
      
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20 bg-black/80 p-4 rounded-lg border-2 border-yellow-600">
        <div className="flex gap-4">
          {troops.map((troop) => (
            <Button
              key={troop.type}
              onClick={() => setSelectedTroop(troop.type)}
              variant={selectedTroop === troop.type ? 'default' : 'outline'}
              className="flex flex-col items-center gap-2 h-auto p-3"
            >
              <img src={troop.icon} alt={troop.name} className="w-12 h-12" />
              <span className="text-xs">{troop.name}</span>
              <span className="text-xs font-bold">{troop.count}</span>
            </Button>
          ))}
        </div>
        {selectedTroop && (
          <p className="text-white text-center mt-2 text-sm">Click on the map to deploy</p>
        )}
      </div>
    </>
  );
}
