import { asyncHandler } from "../utils/asyncHandler.js";
import { CVLink } from "../models/CVLink.js";
import { validate, schemas } from "../utils/validate.js";

async function getOrCreate() {
  let doc = await CVLink.findOne();
  if (!doc) doc = await CVLink.create({ url: "https://example.com/cv.pdf" });
  return doc;
}

export const getCV = asyncHandler(async (_req, res) => {
  const doc = await CVLink.findOne().lean();
  res.json({ success: true, data: doc || { url: "" } });
});

export const updateCV = asyncHandler(async (req, res) => {
  const { url } = validate(schemas.cvUpdate, req.body);
  const doc = await getOrCreate();
  doc.url = url;
  await doc.save();
  res.json({ success: true, message: "CV link updated", data: doc });
});
