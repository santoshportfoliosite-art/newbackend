import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (_req, file, cb) => {
  const ok = /^image\/(png|jpe?g|webp|gif|bmp|svg\+xml)$/.test(file.mimetype);
  if (ok) cb(null, true);
  else cb(new Error("Only image files are allowed"));
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024, files: 1 } // 5MB, single file
});
