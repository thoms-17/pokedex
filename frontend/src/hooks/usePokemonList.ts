import { useEffect, useState } from "react";
import type { Pokemon } from "../types/pokemon";

interface usePokemonListResult {
  pokemons: Pokemon[];
  loading: boolean;
  error: string | null;
}

export function usePokemonList(page: number, limit: number = 20): usePokemonListResult {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const offset = (page - 1) * limit;

    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        // Appel backend
        const res = await fetch(`http://localhost:3000/api/pokemon?limit=${limit}&offset=${offset}`);
        const data = await res.json();

        // data.results contient name + url → il faut aller chercher chaque Pokémon en détail
        const detailed = await Promise.all(
          data.results.map(async (p: { name: string; url: string }) => {
            const res = await fetch(`http://localhost:3000/api/pokemon/${p.name}`);
            const details = await res.json();

            return {
              id: details.id,
              name: details.name,
              image: details.sprites.front_default,
              types: details.types.map((t: any) => t.type.name),
            } as Pokemon;
          })
        );

        setPokemons(detailed);
      } catch (err) {
        setError("Erreur lors du chargement des Pokémon");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [page, limit]);

  return { pokemons, loading, error };
}
