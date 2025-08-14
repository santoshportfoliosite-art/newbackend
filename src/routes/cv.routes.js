import { Router } from "express";
import { getCV, updateCV } from "../controllers/cv.controller.js";
import { auth } from "../middleware/auth.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

const router = Router();

// Public
router.get("/", getCV);

// Admin
router.put("/", auth, requireAdmin, updateCV);

export default router;
