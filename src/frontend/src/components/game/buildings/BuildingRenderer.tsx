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

  const renderBuilding = () => {
    switch (building.buildingType) {
      case BuildingType.townHall:
        return <TownHall level={Number(building.level)} />;
      case BuildingType.goldMine:
      case BuildingType.elixirCollector:
        return <ResourceBuilding type={building.buildingType} level={Number(building.level)} />;
      case BuildingType.cannon:
      case BuildingType.archerTower:
        return <DefensiveBuilding type={building.buildingType} level={Number(building.level)} />;
      case BuildingType.goldStorage:
      case BuildingType.elixirStorage:
        return <StorageBuilding type={building.buildingType} level={Number(building.level)} />;
      case BuildingType.wall:
        return <Wall level={Number(building.level)} />;
      case BuildingType.barracks:
        return <ResourceBuilding type={building.buildingType} level={Number(building.level)} />;
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
