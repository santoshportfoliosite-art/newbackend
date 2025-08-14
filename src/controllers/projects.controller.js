import { asyncHandler } from "../utils/asyncHandler.js";
import { Project } from "../models/Project.js";
import { validate, schemas } from "../utils/validate.js";
import { uploadCover, removeCover } from "../services/file.service.js";
import ApiError from "../utils/ApiError.js";

export const listProjects = asyncHandler(async (_req, res) => {
  const items = await Project.find().sort({ createdAt: -1 }).lean();
  res.json({ success: true, data: items });
});

export const createProject = asyncHandler(async (req, res) => {
  const data = validate(schemas.projectCreate, req.body);
  const file = req.file;
  if (!file?.buffer) throw ApiError.badRequest("Cover image is required");

  const cover = await uploadCover(file.buffer, "portfolio/projects");
  const doc = await Project.create({ ...data, cover });
  res.status(201).json({ success: true, message: "Project added", data: doc });
});

export const deleteProject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const doc = await Project.findById(id);
  if (!doc) throw ApiError.notFound("Project not found");
  await removeCover(doc.cover?.public_id);
  await doc.deleteOne();
  res.json({ success: true, message: "Project deleted" });
});
