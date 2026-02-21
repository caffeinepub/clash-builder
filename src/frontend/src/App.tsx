import { useEffect } from 'react';
import { useActor } from './hooks/useActor';
import GameLayout from './components/layout/GameLayout';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';

function App() {
  const { actor } = useActor();

  useEffect(() => {
    if (!actor) return;

    // Initialize player on first load
    const initPlayer = async () => {
      try {
        await actor.initializePlayer();
      } catch (error) {
        // Player already exists, which is fine
        if (error instanceof Error && !error.message.includes('already exists')) {
          toast.error('Failed to initialize player');
        }
      }
    };

    initPlayer();
  }, [actor]);

  return (
    <>
      <GameLayout />
      <Toaster />
    </>
  );
}

export default App;
