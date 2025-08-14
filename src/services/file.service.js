import { uploadImage, deleteImage } from "../config/cloudinary.js";

/**
 * Upload a single image buffer to Cloudinary; returns { public_id, url }
 */
export async function uploadCover(buffer, folder) {
  const result = await uploadImage(buffer, folder);
  return { public_id: result.public_id, url: result.secure_url };
}

/**
 * Delete a Cloudinary image by public_id (no throw on failure)
 */
export async function removeCover(publicId) {
  await deleteImage(publicId);
}
