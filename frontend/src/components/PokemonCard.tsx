import type { Pokemon } from "../types/pokemon";

interface Props {
  pokemon: Pokemon;
}

export default function PokemonCard({ pokemon }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center hover:shadow-lg transition">
      <img src={pokemon.image} alt={pokemon.name} className="w-20 h-20 mb-2" />
      <h2 className="text-lg font-bold capitalize">{pokemon.name}</h2>
      <div className="flex gap-2 mt-2">
        {pokemon.types.map((type) => (
          <span
            key={type}
            className="px-2 py-1 text-xs rounded-full bg-gray-200 capitalize"
          >
            {type}
          </span>
        ))}
      </div>
    </div>
  );
}
