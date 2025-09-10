import { useState } from "react";
import { usePokemonList } from "../hooks/usePokemonList";
import PokemonCard from "../components/PokemonCard";
import Pagination from "../components/Pagination";

export default function PokemonList() {
  const [page, setPage] = useState(1);
  const { pokemons, loading, error } = usePokemonList(page, 20);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Pokédex</h1>

      {loading && <p className="text-center">Chargement...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {pokemons.map((p) => (
          <PokemonCard key={p.id} pokemon={p} />
        ))}
      </div>

      <Pagination page={page} setPage={setPage} />
    </div>
  );
}
