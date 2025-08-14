import { asyncHandler } from "../utils/asyncHandler.js";
import { ContactInfo } from "../models/ContactInfo.js";
import { validate, schemas } from "../utils/validate.js";

async function getOrCreate() {
  let doc = await ContactInfo.findOne();
  if (!doc) doc = await ContactInfo.create({});
  return doc;
}

export const getContact = asyncHandler(async (_req, res) => {
  const doc = await ContactInfo.findOne().lean();
  res.json({ success: true, data: doc || {} });
});

export const updateContact = asyncHandler(async (req, res) => {
  const payload = validate(schemas.contactUpdate, req.body || {});
  const doc = await getOrCreate();
  Object.assign(doc, payload);
  await doc.save();
  res.json({ success: true, message: "Contact info updated", data: doc });
});
