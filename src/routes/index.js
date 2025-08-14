import { Router } from "express";
import { apiLimiter } from "../middleware/rateLimit.js";

// Routers
import authRoutes from "./auth.routes.js";
import aboutRoutes from "./about.routes.js";
import projectsRoutes from "./projects.routes.js";
import skillsRoutes from "./skills.routes.js";
import educationRoutes from "./education.routes.js";
import contactRoutes from "./contact.routes.js";
import cvRoutes from "./cv.routes.js";
import messagesRoutes from "./messages.routes.js";

const router = Router();

// Optional top-level limiter
router.use(apiLimiter);

// Base
router.get("/", (_req, res) => {
  res.json({ message: "Portfolio API up" });
});

// Mount features
router.use("/auth", authRoutes);
router.use("/about", aboutRoutes);
router.use("/projects", projectsRoutes);
router.use("/skills", skillsRoutes);
router.use("/education", educationRoutes);
router.use("/contact", contactRoutes);
router.use("/cv", cvRoutes);
router.use("/messages", messagesRoutes);

export default router;
