export const THEME = {
  colors: {
    gold: '#ffd700',
    elixir: '#9b59b6',
    stone: '#808080',
    wood: '#8b4513',
    grass: '#4a7c3a',
    sky: '#87ceeb',
  },
  materials: {
    stone: {
      color: '#808080',
      metalness: 0.3,
      roughness: 0.7,
    },
    wood: {
      color: '#8b4513',
      metalness: 0,
      roughness: 0.8,
    },
    gold: {
      color: '#ffd700',
      metalness: 0.8,
      roughness: 0.2,
    },
  },
} as const;
