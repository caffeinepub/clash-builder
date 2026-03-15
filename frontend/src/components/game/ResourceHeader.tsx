import { useResources } from '@/hooks/useResources';

export default function ResourceHeader() {
  const { data: resources } = useResources();

  const gold = resources ? Number(resources[0]) : 0;
  const elixir = resources ? Number(resources[1]) : 0;

  return (
    <div className="absolute top-4 left-4 z-20 flex gap-4">
      {/* Gold */}
      <div className="bg-gradient-to-br from-yellow-500 to-yellow-700 px-4 py-2 rounded-lg border-2 border-yellow-800 shadow-lg flex items-center gap-2">
        <img src="/assets/generated/gold-icon.dim_64x64.png" alt="Gold" className="w-8 h-8" />
        <span className="text-white font-bold text-lg">{gold.toLocaleString()}</span>
      </div>

      {/* Elixir */}
      <div className="bg-gradient-to-br from-purple-500 to-purple-700 px-4 py-2 rounded-lg border-2 border-purple-800 shadow-lg flex items-center gap-2">
        <img src="/assets/generated/elixir-icon.dim_64x64.png" alt="Elixir" className="w-8 h-8" />
        <span className="text-white font-bold text-lg">{elixir.toLocaleString()}</span>
      </div>
    </div>
  );
}
