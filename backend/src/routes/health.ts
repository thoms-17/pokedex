import { Router, Request, Response } from "express";

const router = Router();

// GET /api/health
router.get("/", (req: Request, res: Response) => {
  res.json({ status: "ok", message: "API en ligne 🚀" });
});

export default router;
