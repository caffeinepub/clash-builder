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
      metalness: 0.1,
      roughness: 0.85,
    },
    wood: {
      color: '#8b4513',
      metalness: 0.0,
      roughness: 0.9,
    },
    gold: {
      color: '#ffd700',
      metalness: 0.9,
      roughness: 0.2,
      emissive: '#ffa500',
      emissiveIntensity: 0.2,
    },
    bronze: {
      color: '#cd7f32',
      metalness: 0.8,
      roughness: 0.3,
    },
    iron: {
      color: '#4a4a4a',
      metalness: 0.8,
      roughness: 0.4,
    },
    elixir: {
      color: '#9b59b6',
      metalness: 0.4,
      roughness: 0.3,
      emissive: '#9b59b6',
      emissiveIntensity: 0.3,
    },
  },
  terrain: {
    grassTexture: '/assets/generated/grass-terrain.dim_512x512.png',
    stoneTexture: '/assets/generated/stone-path.dim_512x512.png',
    textureRepeat: 15,
  },
  grid: {
    primaryColor: 'rgba(60, 80, 40, 0.3)',
    secondaryColor: 'rgba(70, 90, 50, 0.2)',
  },
  troops: {
    barbarian: {
      bodyColor: '#ff6b6b',
      scale: 1.0,
    },
    archer: {
      bodyColor: '#4ecdc4',
      scale: 0.8,
    },
    giant: {
      bodyColor: '#95e1d3',
      scale: 1.5,
    },
  },
  particles: {
    gold: {
      color: '#ffd700',
      size: 0.08,
      count: 50,
    },
    elixir: {
      color: '#c39bd3',
      size: 0.1,
      count: 50,
    },
  },
} as const;
