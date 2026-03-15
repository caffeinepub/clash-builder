import { BuildingType } from '@/backend';

export const BUILDING_METADATA = {
  [BuildingType.townHall]: {
    size: [2, 2, 2] as [number, number, number],
    color: '#8b7355',
    materials: {
      primary: { color: '#8b7355', metalness: 0.05, roughness: 0.85 },
      secondary: { color: '#6b5d52', metalness: 0.1, roughness: 0.9 },
      accent: { color: '#ffd700', metalness: 0.9, roughness: 0.2 },
    },
  },
  [BuildingType.goldMine]: {
    size: [1.5, 1.5, 1.5] as [number, number, number],
    color: '#ffd700',
    materials: {
      primary: { color: '#8b7355', metalness: 0.1, roughness: 0.9 },
      ore: { color: '#ffd700', metalness: 0.8, roughness: 0.3 },
    },
  },
  [BuildingType.elixirCollector]: {
    size: [1.5, 1.5, 1.5] as [number, number, number],
    color: '#9b59b6',
    materials: {
      primary: { color: '#7a5c8f', metalness: 0.4, roughness: 0.3 },
      glow: { color: '#c39bd3', metalness: 0.1, roughness: 0.1, emissive: '#9b59b6', emissiveIntensity: 0.4 },
    },
  },
  [BuildingType.goldStorage]: {
    size: [1.8, 1.8, 1.8] as [number, number, number],
    color: '#daa520',
    materials: {
      primary: { color: '#daa520', metalness: 0.7, roughness: 0.2 },
      reinforcement: { color: '#4a4a4a', metalness: 0.9, roughness: 0.3 },
    },
  },
  [BuildingType.elixirStorage]: {
    size: [1.8, 1.8, 1.8] as [number, number, number],
    color: '#8e44ad',
    materials: {
      primary: { color: '#8e44ad', metalness: 0.4, roughness: 0.4 },
      reinforcement: { color: '#4a4a4a', metalness: 0.9, roughness: 0.3 },
    },
  },
  [BuildingType.barracks]: {
    size: [1.5, 1.5, 1.5] as [number, number, number],
    color: '#8b4513',
    materials: {
      primary: { color: '#8b4513', metalness: 0.0, roughness: 0.9 },
      secondary: { color: '#654321', metalness: 0.0, roughness: 0.8 },
    },
  },
  [BuildingType.cannon]: {
    size: [1, 2, 1] as [number, number, number],
    color: '#696969',
    materials: {
      stone: { color: '#808080', metalness: 0.1, roughness: 0.85 },
      metal: { color: '#2c3e50', metalness: 0.8, roughness: 0.3 },
    },
  },
  [BuildingType.archerTower]: {
    size: [1, 2.5, 1] as [number, number, number],
    color: '#808080',
    materials: {
      stone: { color: '#808080', metalness: 0.1, roughness: 0.85 },
      wood: { color: '#8b4513', metalness: 0.0, roughness: 0.8 },
    },
  },
  [BuildingType.wall]: {
    size: [1, 1, 0.3] as [number, number, number],
    color: '#a9a9a9',
    materials: {
      primary: { color: '#a9a9a9', metalness: 0.05, roughness: 0.9 },
      mortar: { color: '#8a8a8a', metalness: 0.0, roughness: 1.0 },
    },
  },
};

export function getBuildingGeometry(buildingType: BuildingType): [number, number, number] {
  return BUILDING_METADATA[buildingType]?.size || [1, 1, 1];
}

export function getBuildingMaterials(buildingType: BuildingType) {
  return BUILDING_METADATA[buildingType]?.materials || {};
}
