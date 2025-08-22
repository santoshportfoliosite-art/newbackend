import { asyncHandler } from "../utils/asyncHandler.js";
import { About } from "../models/About.js";
import { validate, schemas } from "../utils/validate.js";
import { uploadCover, removeCover } from "../services/file.service.js";

async function getOrCreate() {
  let doc = await About.findOne();
  if (!doc) doc = await About.create({});
  return doc;
}

export const getAbout = asyncHandler(async (_req, res) => {
  const about = await About.findOne().lean();
  res.json({ success: true, data: about || { image: null, description: "" } });
});

export const updateAbout = asyncHandler(async (req, res) => {
  const body = validate(schemas.aboutUpdate, req.body || {});
  const file = req.file;

  const about = await getOrCreate();

  
  if (file?.buffer) {
  
    if (about.image?.public_id) await removeCover(about.image.public_id);
    const uploaded = await uploadCover(file.buffer, "portfolio/about");
    about.image = uploaded;
  }

  if (typeof body.description === "string") about.description = body.description;

  await about.save();
  res.json({ success: true, message: "About updated", data: about });
});

export const deleteAboutImage = asyncHandler(async (_req, res) => {
  const about = await getOrCreate();
  if (about.image?.public_id) {
    await removeCover(about.image.public_id);
  }
  about.image = { public_id: null, url: null };
  await about.save();
  res.json({ success: true, message: "Image removed", data: about });
});
