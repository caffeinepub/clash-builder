import { useState } from 'react';
import { BuildingType, Location } from '@/backend';
import { usePlaceBuilding } from './useQueries';
import { toast } from 'sonner';

export function useBuildingPlacement() {
  const [placementMode, setPlacementMode] = useState<BuildingType | null>(null);
  const [ghostPosition, setGhostPosition] = useState<[number, number, number]>([0, 0, 0]);
  const [canPlace, setCanPlace] = useState(true);
  const placeBuildingMutation = usePlaceBuilding();

  const startPlacement = (buildingType: BuildingType) => {
    setPlacementMode(buildingType);
    toast.info('Click on the map to place the building');
  };

  const cancelPlacement = () => {
    setPlacementMode(null);
  };

  const confirmPlacement = async (location: Location) => {
    if (!placementMode) return;

    try {
      await placeBuildingMutation.mutateAsync({ location, buildingType: placementMode });
      toast.success('Building placed successfully!');
      setPlacementMode(null);
    } catch (error) {
      toast.error('Failed to place building');
    }
  };

  return {
    placementMode,
    ghostPosition,
    canPlace,
    startPlacement,
    cancelPlacement,
    confirmPlacement,
  };
}
