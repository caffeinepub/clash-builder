import { useState, useEffect } from 'react';
import { Building, TroopType, AttackResult } from '@/backend';
import { useFindMatch, useRecordAttack, useBuildings } from './useQueries';
import { toast } from 'sonner';

interface Troop {
  id: string;
  type: string;
  position: [number, number, number];
  hp: number;
  maxHp: number;
}

export function useAttackMode() {
  const [enemyBase, setEnemyBase] = useState<Building[] | null>(null);
  const [troops, setTroops] = useState<Troop[]>([]);
  const [battleEnded, setBattleEnded] = useState(false);
  const [battleResult, setBattleResult] = useState<AttackResult | null>(null);
  
  const findMatchMutation = useFindMatch();
  const recordAttackMutation = useRecordAttack();
  const { data: buildings } = useBuildings();

  useEffect(() => {
    // Load enemy base (for demo, use player's own base)
    if (buildings && buildings.length > 0) {
      setEnemyBase(buildings);
    }
  }, [buildings]);

  const deployTroop = (type: TroopType, x: number, z: number) => {
    const newTroop: Troop = {
      id: Math.random().toString(),
      type,
      position: [x, 0, z],
      hp: 100,
      maxHp: 100,
    };
    setTroops((prev) => [...prev, newTroop]);
    toast.success(`${type} deployed!`);

    // Simulate battle ending after 5 seconds
    setTimeout(() => {
      endBattle();
    }, 5000);
  };

  const endBattle = async () => {
    const result: AttackResult = {
      destructionPercentage: BigInt(Math.floor(Math.random() * 100)),
      lootGold: BigInt(Math.floor(Math.random() * 500)),
      lootElixir: BigInt(Math.floor(Math.random() * 500)),
    };

    setBattleResult(result);
    setBattleEnded(true);

    try {
      await recordAttackMutation.mutateAsync(result);
    } catch (error) {
      toast.error('Failed to record attack');
    }
  };

  return {
    enemyBase,
    troops,
    battleEnded,
    battleResult,
    deployTroop,
  };
}
