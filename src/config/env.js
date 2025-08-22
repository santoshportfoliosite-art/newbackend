import dotenv from "dotenv";
dotenv.config();

function required(name, fallback = undefined) {
  const v = process.env[name] ?? fallback;
  if (v === undefined || v === "") {
    throw new Error(`Missing required env var: ${name}`);
  }
  return v;
}

export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: parseInt(process.env.PORT || "5000", 10),

  // CORS
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  CORS_ALLOWED_ORIGINS:
    (process.env.CORS_ALLOWED_ORIGINS || "").split(",").filter(Boolean),

  // Mongo
  MONGODB_URI: required("MONGODB_URI"),

  // Auth
  JWT_SECRET: required("JWT_SECRET"),
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",
  BCRYPT_SALT_ROUNDS: parseInt(process.env.BCRYPT_SALT_ROUNDS || "10", 10),

  // Cloudinary
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  CLOUDINARY_URL: process.env.CLOUDINARY_URL, 

  // Mail
  SMTP_HOST: required("SMTP_HOST"),
  SMTP_PORT: parseInt(process.env.SMTP_PORT || "587", 10),
  SMTP_USER: required("SMTP_USER"),
  SMTP_PASS: required("SMTP_PASS"),
  MAIL_FROM: process.env.MAIL_FROM || `Portfolio Bot <${process.env.SMTP_USER}>`,

  // Twilio
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  TWILIO_FROM: process.env.TWILIO_FROM,
  OWNER_NUMBER: process.env.OWNER_NUMBER,

  // Seed
  SEED_ADMIN_EMAIL: process.env.SEED_ADMIN_EMAIL,
  SEED_ADMIN_PASSWORD: process.env.SEED_ADMIN_PASSWORD
};
