import { useState } from 'react';
import GameCanvas from '../game/GameCanvas';
import ResourceHeader from '../game/ResourceHeader';
import BuildMenu from '../game/BuildMenu';
import AttackMode from '../game/AttackMode';
import { Button } from '@/components/ui/button';
import { Swords, Home } from 'lucide-react';

export default function GameLayout() {
  const [isAttackMode, setIsAttackMode] = useState(false);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-gradient-to-b from-sky-400 to-green-300">
      {/* Resource Header */}
      <ResourceHeader />

      {/* Mode Toggle */}
      <div className="absolute top-4 right-4 z-20 flex gap-2">
        <Button
          onClick={() => setIsAttackMode(false)}
          variant={!isAttackMode ? 'default' : 'outline'}
          className="bg-amber-600 hover:bg-amber-700 text-white border-2 border-amber-800"
        >
          <Home className="mr-2 h-4 w-4" />
          My Base
        </Button>
        <Button
          onClick={() => setIsAttackMode(true)}
          variant={isAttackMode ? 'default' : 'outline'}
          className="bg-red-600 hover:bg-red-700 text-white border-2 border-red-800"
        >
          <Swords className="mr-2 h-4 w-4" />
          Attack
        </Button>
      </div>

      {/* Main Game Area */}
      {isAttackMode ? (
        <AttackMode onExit={() => setIsAttackMode(false)} />
      ) : (
        <>
          <GameCanvas />
          <BuildMenu />
        </>
      )}

      {/* Footer */}
      <footer className="absolute bottom-2 left-0 right-0 text-center text-xs text-white/80 z-10">
        © {new Date().getFullYear()} Built with love using{' '}
        <a
          href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-white"
        >
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}
