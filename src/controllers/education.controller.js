import { asyncHandler } from "../utils/asyncHandler.js";
import { Education } from "../models/Education.js";
import { validate, schemas } from "../utils/validate.js";
import ApiError from "../utils/ApiError.js";

export const listEducation = asyncHandler(async (_req, res) => {
  const items = await Education.find().sort({ createdAt: -1 }).lean();
  res.json({ success: true, data: items });
});

export const createEducation = asyncHandler(async (req, res) => {
  const data = validate(schemas.educationCreate, req.body);
  const doc = await Education.create(data);
  res.status(201).json({ success: true, message: "Education added", data: doc });
});

export const deleteEducation = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const doc = await Education.findById(id);
  if (!doc) throw ApiError.notFound("Education not found");
  await doc.deleteOne();
  res.json({ success: true, message: "Education deleted" });
});
