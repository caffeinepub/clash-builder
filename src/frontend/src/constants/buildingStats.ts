import { BuildingType } from '@/backend';

export const BUILDING_METADATA = {
  [BuildingType.townHall]: {
    size: [2, 2, 2] as [number, number, number],
    color: '#8b7355',
  },
  [BuildingType.goldMine]: {
    size: [1.5, 1.5, 1.5] as [number, number, number],
    color: '#ffd700',
  },
  [BuildingType.elixirCollector]: {
    size: [1.5, 1.5, 1.5] as [number, number, number],
    color: '#9b59b6',
  },
  [BuildingType.goldStorage]: {
    size: [1.8, 1.8, 1.8] as [number, number, number],
    color: '#daa520',
  },
  [BuildingType.elixirStorage]: {
    size: [1.8, 1.8, 1.8] as [number, number, number],
    color: '#8e44ad',
  },
  [BuildingType.barracks]: {
    size: [1.5, 1.5, 1.5] as [number, number, number],
    color: '#8b4513',
  },
  [BuildingType.cannon]: {
    size: [1, 2, 1] as [number, number, number],
    color: '#696969',
  },
  [BuildingType.archerTower]: {
    size: [1, 2.5, 1] as [number, number, number],
    color: '#808080',
  },
  [BuildingType.wall]: {
    size: [1, 1, 0.3] as [number, number, number],
    color: '#a9a9a9',
  },
};

export function getBuildingGeometry(buildingType: BuildingType): [number, number, number] {
  return BUILDING_METADATA[buildingType]?.size || [1, 1, 1];
}
