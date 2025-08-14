import { asyncHandler } from "../utils/asyncHandler.js";
import { Skill } from "../models/Skill.js";
import { validate, schemas } from "../utils/validate.js";
import { uploadCover, removeCover } from "../services/file.service.js";
import ApiError from "../utils/ApiError.js";

export const listSkills = asyncHandler(async (_req, res) => {
  const items = await Skill.find().sort({ createdAt: -1 }).lean();
  res.json({ success: true, data: items });
});

export const createSkill = asyncHandler(async (req, res) => {
  const data = validate(schemas.skillCreate, req.body);
  const file = req.file;
  if (!file?.buffer) throw ApiError.badRequest("Cover image is required");

  const cover = await uploadCover(file.buffer, "portfolio/skills");
  const doc = await Skill.create({ ...data, cover });
  res.status(201).json({ success: true, message: "Skill added", data: doc });
});

export const deleteSkill = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const doc = await Skill.findById(id);
  if (!doc) throw ApiError.notFound("Skill not found");
  await removeCover(doc.cover?.public_id);
  await doc.deleteOne();
  res.json({ success: true, message: "Skill deleted" });
});
