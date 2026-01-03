const express = require("express");
const cors = require("cors");
const pokemonNamesFr = require("./pokemonNamesFr.json");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Cache pour la liste complète des Pokémon
let allPokemonCache = null;
let allPokemonCacheTimestamp = 0;
const ALL_POKEMON_CACHE_TTL = 1000 * 60 * 60; 

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Backend Pokedex opérationnel" });
});

// Route qui renvoie tous les Pokémon (id + nom FR + sprite pixel)
app.get("/api/pokemon-list", async (req, res) => {
  try {
    const now = Date.now();
    if (
      allPokemonCache &&
      now - allPokemonCacheTimestamp < ALL_POKEMON_CACHE_TTL
    ) {
      return res.json(allPokemonCache);
    }

    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=1010&offset=0"
    );

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: "Impossible de récupérer la liste des Pokémon" });
    }

    const data = await response.json();

    const list = data.results
      .map((p) => {
        const match = p.url.match(/\/pokemon\/(\d+)\//);
        if (!match) return null;

        const id = Number(match[1]);
        const nameFr = pokemonNamesFr[id];

        return {
          id,
          nameFr,
          sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
        };
      })
      .filter(Boolean)
      .sort((a, b) => a.id - b.id);

    allPokemonCache = list;
    allPokemonCacheTimestamp = now;

    res.json(list);
  } catch (error) {
    console.error("Erreur lors de la récupération de la liste des Pokémon :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});


// Détail d'un Pokémon
app.get("/api/pokemon/:nameOrId", async (req, res) => {
  const { nameOrId } = req.params;

  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${nameOrId.toLowerCase()}`
    );

    if (!response.ok) {
      return res.status(response.status).json({ error: "Pokémon non trouvé" });
    }

    const data = await response.json();

    // Ajout du nom français à partir du mapping local
    const id = data.id;
    const nameFr = pokemonNamesFr[id] || data.name;

    res.json({
      ...data,
      nameFr,
    });
  } catch (error) {
    console.error("Erreur lors de l'appel à PokeAPI :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend Pokedex démarré sur http://localhost:${PORT}`);
});
