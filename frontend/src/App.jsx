import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import PokemonList from "./components/PokemonList";
import PokemonDetail from "./components/PokemonDetail";

function App() {
  // État pour la recherche (barre en haut)
  const [searchTerm, setSearchTerm] = useState("");

  // Liste complète de tous les Pokémon (nom + id + sprite pixel)
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoadingList, setIsLoadingList] = useState(false);
  const [listError, setListError] = useState(null);

  // Pokémon actuellement sélectionné (détails complets)
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [detailError, setDetailError] = useState(null);

  // Chargement de la liste complète des Pokémon au montage
  useEffect(() => {
    async function fetchPokemonList() {
      try {
        setIsLoadingList(true);
        setListError(null);

        const response = await fetch("http://localhost:3001/api/pokemon-list");

        if (!response.ok) {
          throw new Error("Impossible de récupérer la liste des Pokémon");
        }

        const data = await response.json();
        setPokemonList(data);

        if (data.length > 0) {
          fetchPokemonDetail(data[0].id);
        }
      } catch (err) {
        setListError(err.message);
      } finally {
        setIsLoadingList(false);
      }
    }
    fetchPokemonList();
  }, []);

  async function fetchPokemonDetail(identifier) {
    try {
      setIsLoadingDetail(true);
      setDetailError(null);

      const response = await fetch(
        `http://localhost:3001/api/pokemon/${String(identifier).toLowerCase()}`
      );

      if (!response.ok) {
        throw new Error("Pokémon non trouvé");
      }

      const data = await response.json();
      setSelectedPokemon({ ...data });
    } catch (err) {
      setSelectedPokemon(null);
      setDetailError(err.message);
    } finally {
      setIsLoadingDetail(false);
    }
  }

  function handleSelectPokemon(pokemon) {
    fetchPokemonDetail(pokemon.id);
  }

  const trimmedSearch = searchTerm.trim().toLowerCase();
  const filteredPokemon = trimmedSearch
    ? pokemonList.filter(
        (p) =>
          (p.nameFr && p.nameFr.toLowerCase().includes(trimmedSearch)) ||
          String(p.id).includes(trimmedSearch)
      )
    : pokemonList;

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-700 via-red-600 to-red-800 text-slate-100 flex flex-col">
      <Navbar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <main className="flex-1 max-w-6xl mx-auto px-4 py-6">
        <section className="bg-white/95 border border-red-600 rounded-3xl p-4 md:p-6 shadow-xl shadow-red-900/40">
          <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1.2fr)_minmax(0,2fr)] gap-4 md:gap-6 h-[520px]">
            <PokemonList
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              filteredPokemon={filteredPokemon}
              isLoadingList={isLoadingList}
              listError={listError}
              onSelectPokemon={handleSelectPokemon}
            />

            <PokemonDetail
              selectedPokemon={selectedPokemon}
              isLoadingDetail={isLoadingDetail}
              detailError={detailError}
            />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
