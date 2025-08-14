import { Router } from "express";
import { listSkills, createSkill, deleteSkill } from "../controllers/skills.controller.js";
import { auth } from "../middleware/auth.js";
import { requireAdmin } from "../middleware/requireAdmin.js";
import { upload } from "../libs/multer.js";

const router = Router();

// Public
router.get("/", listSkills);

// Admin
router.post("/", auth, requireAdmin, upload.single("cover"), createSkill);
router.delete("/:id", auth, requireAdmin, deleteSkill);

export default router;
