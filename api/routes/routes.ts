import * as bodyParser from "body-parser";
import { Router } from "express";
import UserRouter from "./user";

// Init router and path
const router = Router();

// Add sub-routes
router.use('/users', UserRouter);

export default router;