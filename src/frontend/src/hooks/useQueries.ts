import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { Building, BuildingType, Location, TroopType, AttackResult } from '@/backend';

export function useResources() {
  const { actor, isFetching } = useActor();

  return useQuery<[bigint, bigint]>({
    queryKey: ['resources'],
    queryFn: async () => {
      if (!actor) return [BigInt(0), BigInt(0)];
      return actor.getResources();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 5000, // Poll every 5 seconds
  });
}

export function useBuildings() {
  const { actor, isFetching } = useActor();

  return useQuery<Building[]>({
    queryKey: ['buildings'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getBuildings();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 10000, // Poll every 10 seconds
  });
}

export function usePlaceBuilding() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ location, buildingType }: { location: Location; buildingType: BuildingType }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.placeBuilding(location, buildingType);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['buildings'] });
      queryClient.invalidateQueries({ queryKey: ['resources'] });
    },
  });
}

export function useTrainTroop() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (troopType: TroopType) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.trainTroop(troopType);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resources'] });
    },
  });
}

export function useFindMatch() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.findMatch();
    },
  });
}

export function useRecordAttack() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (result: AttackResult) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.recordAttack(result);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resources'] });
    },
  });
}
