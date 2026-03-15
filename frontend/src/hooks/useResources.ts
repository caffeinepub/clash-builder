import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';

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
