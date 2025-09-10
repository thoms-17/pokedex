import express, { Application, Request, Response } from "express";
import cors from "cors";

// Création de l'application Express
const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
import healthRouter from "./routes/health";
app.use("/api/health", healthRouter);

import pokemonRouter from "./routes/pokemon";
app.use("/api/pokemon", pokemonRouter);

// Route par défaut (fallback)
app.get("/", (req: Request, res: Response) => {
  res.send("Bienvenue sur l'API Pokédex 🚀");
});

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`✅ Backend démarré sur http://localhost:${PORT}`);
});
