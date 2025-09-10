import axios from "axios";
import cache from "../utils/cache";

const BASE_URL = "https://pokeapi.co/api/v2";

export async function getPokemonList(limit: number = 20, offset: number = 0) {
  const cacheKey = `pokemon_list_${limit}_${offset}`;
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  const response = await axios.get(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
  cache.set(cacheKey, response.data, 60); // TTL 60 sec
  return response.data;
}

export async function getPokemonByNameOrId(nameOrId: string) {
  const cacheKey = `pokemon_${nameOrId}`;
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  const response = await axios.get(`${BASE_URL}/pokemon/${nameOrId}`);
  cache.set(cacheKey, response.data, 60);
  return response.data;
}
