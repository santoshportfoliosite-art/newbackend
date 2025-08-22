import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AdminUser } from "../models/AdminUser.js";
import { env } from "../config/env.js";
import ApiError from "../utils/ApiError.js";

function cookieBaseOptions() {
  const isProd = env.NODE_ENV === "production";
  return {
    httpOnly: true,
    sameSite: isProd ? "None" : "Lax",
    secure: isProd, 
    path: "/"
  };
}

function parseJwtExpiryToMs(exp) {
  if (!exp) return 7 * 24 * 60 * 60 * 1000; 
  if (/^\d+$/.test(exp)) return parseInt(exp, 10) * 1000;
  const m = /^(\d+)([smhd])$/.exec(exp);
  const n = parseInt(m?.[1] || "7", 10);
  const u = m?.[2] || "d";
  const map = { s: 1000, m: 60 * 1000, h: 3600 * 1000, d: 24 * 3600 * 1000 };
  return n * map[u];
}

export async function login(email, password) {
  const admin = await AdminUser.findOne({ email: String(email).toLowerCase() });
  if (!admin) throw ApiError.unauthorized("Incorrect email");

  const match = await bcrypt.compare(password, admin.passwordHash);
  if (!match) throw ApiError.unauthorized("Incorrect password");

  const token = jwt.sign({ id: admin._id }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN
  });

  const cookieOptions = {
    ...cookieBaseOptions(),
    maxAge: parseJwtExpiryToMs(env.JWT_EXPIRES_IN)
  };

  return {
    admin: { id: admin._id.toString(), email: admin.email },
    token,
    cookieOptions
  };
}

export async function verifyToken(token) {
  try {
    const payload = jwt.verify(token, env.JWT_SECRET);
    const admin = await AdminUser.findById(payload.id).lean();
    if (!admin) throw ApiError.unauthorized("Invalid token");
    return { id: admin._id.toString(), email: admin.email };
  } catch {
    throw ApiError.unauthorized("Invalid token");
  }
}

export function cookieClearOptions() {
  return cookieBaseOptions();
}
