import { v2 as cloudinary } from "cloudinary";
import { env } from "./env.js";

if (env.CLOUDINARY_URL) {
  cloudinary.config({ secure: true, cloudinary_url: env.CLOUDINARY_URL });
} else if (env.CLOUDINARY_CLOUD_NAME && env.CLOUDINARY_API_KEY && env.CLOUDINARY_API_SECRET) {
  cloudinary.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET,
    secure: true
  });
} else {
  console.warn("⚠️ Cloudinary not fully configured. Image uploads will fail until env is set.");
}

export async function uploadImage(buffer, folder = "portfolio") {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "image" },
      (err, result) => (err ? reject(err) : resolve(result))
    );
    stream.end(buffer);
  });
}

export async function deleteImage(publicId) {
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
  } catch (err) {
    console.warn("Cloudinary destroy failed:", err?.message || err);
  }
}

export { cloudinary };
