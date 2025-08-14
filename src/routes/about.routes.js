import { Router } from "express";
import { getAbout, updateAbout, deleteAboutImage } from "../controllers/about.controller.js";
import { auth } from "../middleware/auth.js";
import { requireAdmin } from "../middleware/requireAdmin.js";
import { upload } from "../libs/multer.js";

const router = Router();

// Public
router.get("/", getAbout);

// Admin
router.put("/", auth, requireAdmin, upload.single("image"), updateAbout);
router.delete("/image", auth, requireAdmin, deleteAboutImage);

export default router;
