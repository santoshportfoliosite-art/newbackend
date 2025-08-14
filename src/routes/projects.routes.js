import { Router } from "express";
import { listProjects, createProject, deleteProject } from "../controllers/projects.controller.js";
import { auth } from "../middleware/auth.js";
import { requireAdmin } from "../middleware/requireAdmin.js";
import { upload } from "../libs/multer.js";

const router = Router();

// Public
router.get("/", listProjects);

// Admin
router.post("/", auth, requireAdmin, upload.single("cover"), createProject);
router.delete("/:id", auth, requireAdmin, deleteProject);

export default router;
