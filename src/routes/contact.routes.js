import { Router } from "express";
import { getContact, updateContact } from "../controllers/contact.controller.js";
import { auth } from "../middleware/auth.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

const router = Router();

// Public
router.get("/", getContact);

// Admin
router.put("/", auth, requireAdmin, updateContact);

export default router;
