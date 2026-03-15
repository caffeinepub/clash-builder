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
  isAttacking?: boolean;
}

export function useAttackMode() {
  const [enemyBase, setEnemyBase] = useState<Building[] | null>(null);
  const [troops, setTroops] = useState<Troop[]>([]);
  const [battleEnded, setBattleEnded] = useState(false);
  const [battleResult, setBattleResult] = useState<AttackResult | null>(null);
  const [attackEffects, setAttackEffects] = useState<Array<{ id: string; position: [number, number, number]; timestamp: number }>>([]);
  
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
      isAttacking: false,
    };
    setTroops((prev) => [...prev, newTroop]);
    toast.success(`${type} deployed!`);

    // Simulate battle ending after 5 seconds
    setTimeout(() => {
      endBattle();
    }, 5000);
  };

  const triggerAttackEffect = (position: [number, number, number]) => {
    const effect = {
      id: Math.random().toString(),
      position,
      timestamp: Date.now(),
    };
    setAttackEffects((prev) => [...prev, effect]);

    // Remove effect after animation
    setTimeout(() => {
      setAttackEffects((prev) => prev.filter((e) => e.id !== effect.id));
    }, 500);
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
    attackEffects,
    triggerAttackEffect,
  };
}
