# Pokédex React / Node

Application Pokédex full‑stack construite avec un frontend React (Vite) et un backend Node/Express qui consomme l’API publique PokeAPI.

## Fonctionnalités

- Liste complète des Pokémon avec :
  - ID
  - nom en français (généré depuis PokeAPI puis mis en cache dans un JSON)
  - sprite "pixel" officiel
- Recherche par nom français ou par ID (filtrage en temps réel)
- Détail d’un Pokémon avec :
  - nom FR
  - sprite HD
  - taille / poids (en m / kg)
  - types avec petites icônes
  - statistiques de base avec barres colorées
- Thème UI rouge/blanc inspiré d’un Pokédex / Pokéball

## Architecture

- `backend/`
  - `index.js` : serveur Express, routes API
    - `GET /api/health` : status du backend
    - `GET /api/pokemon-list` : liste des Pokémon (id, nameFr, sprite), avec cache mémoire
    - `GET /api/pokemon/:nameOrId` : détail complet d’un Pokémon, enrichi avec `nameFr`
  - `pokemonNamesFr.json` : mapping `id -> nom français` généré depuis PokeAPI
- `frontend/`
  - App React (Vite)
  - composants : `Navbar`, `PokemonList`, `PokemonDetail`
  - styles via Tailwind CSS + quelques utilitaires personnalisés (scrollbar)

## Prérequis

- Node.js (version 18+ recommandée)
- npm

## Installation

Cloner le dépôt puis installer les dépendances dans le backend et le frontend :

```bash
cd pokedex

# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

## Lancer le projet

### Option 1 : lancer chaque partie séparément

Dans un premier terminal (backend) :

```bash
cd backend
npm run dev
```

Dans un second terminal (frontend) :

```bash
cd frontend
npm run dev
```

- Backend : http://localhost:3001
- Frontend : http://localhost:5173 (par défaut Vite)

### Option 2 : commande unique à la racine

À la racine du projet (`pokedex/`), un `package.json` permet de lancer front + back en une seule commande :

```bash
npm run dev
```

## Endpoints backend

- `GET /api/health`
- `GET /api/pokemon-list`
- `GET /api/pokemon/:nameOrId`

## Technologies

- **Frontend** : React, Vite, Tailwind CSS
- **Backend** : Node.js, Express, `node-fetch` (via l’API globale `fetch`), PokeAPI

## Idées d’améliorations

- Pagination ou chargement progressif de la liste des Pokémon
- Filtre par type
- Favoris (stockés en localStorage ou en base de données)
- Ajout d’un mode sombre/clair ou d’autres thèmes Pokédex
