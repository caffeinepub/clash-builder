import { useEffect, useState } from 'react';
import { Html } from '@react-three/drei';
import { Time } from '@/backend';

interface ConstructionIndicatorProps {
  constructionStart?: Time;
  constructionEnd?: Time;
}

export default function ConstructionIndicator({ constructionStart, constructionEnd }: ConstructionIndicatorProps) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    if (!constructionEnd) return;

    const interval = setInterval(() => {
      const now = Date.now() * 1_000_000; // Convert to nanoseconds
      const end = Number(constructionEnd);
      const remaining = Math.max(0, end - now);
      
      const seconds = Math.floor(remaining / 1_000_000_000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);

      if (hours > 0) {
        setTimeLeft(`${hours}h ${minutes % 60}m`);
      } else if (minutes > 0) {
        setTimeLeft(`${minutes}m ${seconds % 60}s`);
      } else {
        setTimeLeft(`${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [constructionEnd]);

  return (
    <Html center>
      <div className="bg-amber-600 text-white px-3 py-1 rounded-lg border-2 border-amber-800 shadow-lg flex items-center gap-2">
        <img src="/assets/generated/construction-icon.dim_64x64.png" alt="Construction" className="w-6 h-6" />
        <span className="font-bold text-sm">{timeLeft}</span>
      </div>
    </Html>
  );
}
