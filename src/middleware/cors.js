import { env } from "../config/env.js";

const allowList = [
  env.CLIENT_ORIGIN,
  ...(env.CORS_ALLOWED_ORIGINS
    ? env.CORS_ALLOWED_ORIGINS.split(",").map(s => s.trim())
    : [])
].filter(Boolean);

/**
 * - Allows requests from `CLIENT_ORIGIN` and any in `CORS_ALLOWED_ORIGINS`
 * - Sends credentials (cookies) for cross-origin requests
 */
export const corsOptions = {
  origin(origin, cb) {
    // Allow server-to-server/no-origin tools and exact allow-list matches
    if (!origin || allowList.includes(origin)) return cb(null, true);
    return cb(new Error(`CORS blocked for ${origin}`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Set-Cookie"]
};
