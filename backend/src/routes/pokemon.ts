import { Router, Request, Response } from "express";
import { getPokemonList, getPokemonByNameOrId } from "../services/pokemonService";

const router = Router();

// GET /api/pokemon?limit=20&offset=0
router.get("/", async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 20;
    const offset = parseInt(req.query.offset as string) || 0;
    const data = await getPokemonList(limit, offset);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Impossible de récupérer la liste des Pokémon" });
  }
});

// GET /api/pokemon/:nameOrId
router.get("/:nameOrId", async (req: Request, res: Response) => {
  try {
    const { nameOrId } = req.params;
    const data = await getPokemonByNameOrId(nameOrId);
    res.json(data);
  } catch (error) {
    res.status(404).json({ error: "Pokémon introuvable" });
  }
});

export default router;
