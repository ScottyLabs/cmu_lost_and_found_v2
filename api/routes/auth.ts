import { Request, Response, Router } from "express";
import * as mongoose from "mongoose";
import User from "../models/User"
// const User = require("../models/User")
const router = Router();

router.get("/all", async (req: Request, res: Response) => {
  let richard = new User({name: "Richard"});

  return res.status(200).json({ bob: "hello" });
});

export default router;