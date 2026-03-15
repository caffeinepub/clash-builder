export interface CombatState {
  troopsAlive: number;
  buildingsDestroyed: number;
  totalBuildings: number;
}

export function calculateDestructionPercentage(state: CombatState): number {
  if (state.totalBuildings === 0) return 0;
  return Math.floor((state.buildingsDestroyed / state.totalBuildings) * 100);
}

export function calculateStars(destructionPercentage: number): number {
  if (destructionPercentage >= 100) return 3;
  if (destructionPercentage >= 50) return 2;
  if (destructionPercentage >= 33) return 1;
  return 0;
}

export function calculateLoot(destructionPercentage: number, maxLoot: number): number {
  return Math.floor((destructionPercentage / 100) * maxLoot);
}
