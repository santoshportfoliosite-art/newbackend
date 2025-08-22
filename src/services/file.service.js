import { uploadImage, deleteImage } from "../config/cloudinary.js";


export async function uploadCover(buffer, folder) {
  const result = await uploadImage(buffer, folder);
  return { public_id: result.public_id, url: result.secure_url };
}


export async function removeCover(publicId) {
  await deleteImage(publicId);
}
