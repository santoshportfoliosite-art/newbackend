import { Router } from "express";
import { listEducation, createEducation, deleteEducation } from "../controllers/education.controller.js";
import { auth } from "../middleware/auth.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

const router = Router();

// Public
router.get("/", listEducation);

// Admin
router.post("/", auth, requireAdmin, createEducation);
router.delete("/:id", auth, requireAdmin, deleteEducation);

export default router;
