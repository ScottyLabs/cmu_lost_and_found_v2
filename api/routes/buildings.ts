import Building from "../models/Building";

import { Router } from "express";

const router = Router();

router.get("/all", async (_req, res) => {
  try {
    const buildings = await Building.find({});
    return res.json(buildings);
  } catch (err) {
    return res.status(500).send(err);
  }
});

export default router;
