import { useEffect, useState } from 'react';
import { Building, BuildingType } from '@/backend';
import TownHall from './TownHall';
import ResourceBuilding from './ResourceBuilding';
import DefensiveBuilding from './DefensiveBuilding';
import StorageBuilding from './StorageBuilding';
import Wall from './Wall';
import ConstructionIndicator from '../ConstructionIndicator';

interface BuildingRendererProps {
  building: Building;
}

export default function BuildingRenderer({ building }: BuildingRendererProps) {
  const x = Number(building.location.x);
  const z = Number(building.location.y);
  const isUnderConstruction = building.constructionEnd && building.constructionStart;
  
  const [constructionProgress, setConstructionProgress] = useState(1);

  useEffect(() => {
    if (isUnderConstruction) {
      const startTime = Number(building.constructionStart);
      const endTime = Number(building.constructionEnd);
      const totalDuration = endTime - startTime;

      const updateProgress = () => {
        const now = Date.now() * 1_000_000; // Convert to nanoseconds
        const elapsed = now - startTime;
        const progress = Math.min(Math.max(elapsed / totalDuration, 0), 1);
        
        // Smooth easing function for construction animation
        const easedProgress = progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        
        setConstructionProgress(easedProgress);

        if (progress < 1) {
          requestAnimationFrame(updateProgress);
        }
      };

      updateProgress();
    } else {
      setConstructionProgress(1);
    }
  }, [isUnderConstruction, building.constructionStart, building.constructionEnd]);

  const renderBuilding = () => {
    const props = {
      level: Number(building.level),
      constructionProgress: isUnderConstruction ? constructionProgress : 1,
    };

    switch (building.buildingType) {
      case BuildingType.townHall:
        return <TownHall {...props} />;
      case BuildingType.goldMine:
      case BuildingType.elixirCollector:
        return <ResourceBuilding type={building.buildingType} {...props} />;
      case BuildingType.cannon:
      case BuildingType.archerTower:
        return <DefensiveBuilding type={building.buildingType} {...props} />;
      case BuildingType.goldStorage:
      case BuildingType.elixirStorage:
        return <StorageBuilding type={building.buildingType} {...props} />;
      case BuildingType.wall:
        return <Wall {...props} />;
      case BuildingType.barracks:
        return <ResourceBuilding type={building.buildingType} {...props} />;
      default:
        return null;
    }
  };

  return (
    <group position={[x, 0, z]}>
      {renderBuilding()}
      {isUnderConstruction && (
        <ConstructionIndicator
          constructionEnd={building.constructionEnd}
          constructionStart={building.constructionStart}
        />
      )}
    </group>
  );
}
