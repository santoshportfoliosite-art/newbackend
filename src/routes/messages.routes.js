import { Router } from "express";
import { createMessage, listMessages, getMessage, markRead } from "../controllers/messages.controller.js";
import { auth } from "../middleware/auth.js";
import { requireAdmin } from "../middleware/requireAdmin.js";
import { messageLimiter } from "../middleware/rateLimit.js";

const router = Router();


router.post("/", messageLimiter, createMessage);


router.get("/", auth, requireAdmin, listMessages);
router.get("/:id", auth, requireAdmin, getMessage);
router.patch("/:id/read", auth, requireAdmin, markRead);

export default router;
