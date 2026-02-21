import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BuildingType } from '@/backend';
import { useBuildingPlacement } from '@/hooks/useBuildingPlacement';
import { Hammer, X } from 'lucide-react';

export default function BuildMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { startPlacement, placementMode } = useBuildingPlacement();

  const buildings = [
    { type: BuildingType.townHall, name: 'Town Hall', cost: 1000, icon: '/assets/generated/townhall-icon.dim_128x128.png' },
    { type: BuildingType.goldMine, name: 'Gold Mine', cost: 500, icon: '/assets/generated/goldmine-icon.dim_128x128.png' },
    { type: BuildingType.elixirCollector, name: 'Elixir Collector', cost: 500, icon: '/assets/generated/elixir-collector-icon.dim_128x128.png' },
    { type: BuildingType.barracks, name: 'Barracks', cost: 800, icon: '/assets/generated/barracks-icon.dim_128x128.png' },
    { type: BuildingType.cannon, name: 'Cannon', cost: 600, icon: '/assets/generated/cannon-icon.dim_128x128.png' },
    { type: BuildingType.archerTower, name: 'Archer Tower', cost: 700, icon: '/assets/generated/archer-tower-icon.dim_128x128.png' },
  ];

  return (
    <>
      {/* Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute bottom-4 left-4 z-20 bg-amber-600 hover:bg-amber-700 text-white border-2 border-amber-800"
        size="lg"
      >
        {isOpen ? <X className="mr-2 h-5 w-5" /> : <Hammer className="mr-2 h-5 w-5" />}
        {isOpen ? 'Close' : 'Build'}
      </Button>

      {/* Build Menu Panel */}
      {isOpen && (
        <div className="absolute bottom-20 left-4 z-20 bg-gradient-to-br from-amber-900/95 to-amber-950/95 p-4 rounded-lg border-4 border-amber-700 shadow-2xl w-80">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4 text-center">Build Menu</h2>
          <ScrollArea className="h-96">
            <div className="grid grid-cols-2 gap-3">
              {buildings.map((building) => (
                <Button
                  key={building.type}
                  onClick={() => {
                    startPlacement(building.type);
                    setIsOpen(false);
                  }}
                  variant="outline"
                  className="flex flex-col items-center gap-2 h-auto p-3 bg-amber-800/50 hover:bg-amber-700/70 border-2 border-amber-600"
                  disabled={placementMode === building.type}
                >
                  <img src={building.icon} alt={building.name} className="w-16 h-16" />
                  <span className="text-xs text-white font-semibold text-center">{building.name}</span>
                  <div className="flex items-center gap-1">
                    <img src="/assets/generated/gold-icon.dim_64x64.png" alt="Cost" className="w-4 h-4" />
                    <span className="text-xs text-yellow-300">{building.cost}</span>
                  </div>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
    </>
  );
}
