import { env } from "../config/env.js";

/** Normalize any env value into a string array */
function toArray(val) {
  if (val == null) return [];
  if (Array.isArray(val)) return val.map(String).map(s => s.trim()).filter(Boolean);

  const t = typeof val;

  // If it’s an object (but not array), try to stringify -> not common, but safe
  if (t === "object") {
    try {
      return Object.values(val).map(String).map(s => s.trim()).filter(Boolean);
    } catch {
      return [];
    }
  }

  // For booleans/numbers -> cast to string (e.g., true -> "true")
  let s = String(val).trim();
  if (!s) return [];

  // If JSON array as string: '["http://a","http://b"]'
  if (s.startsWith("[") && s.endsWith("]")) {
    try {
      const parsed = JSON.parse(s);
      if (Array.isArray(parsed)) {
        return parsed.map(String).map(x => x.trim()).filter(Boolean);
      }
    } catch {
      // fall through to CSV parsing
    }
  }

  // CSV: "http://a, https://b"
  return s.split(",").map(x => x.trim()).filter(Boolean);
}

// Build allow list
const allowList = Array.from(
  new Set([
    ...(toArray(env.CLIENT_ORIGIN).length ? toArray(env.CLIENT_ORIGIN) : [env.CLIENT_ORIGIN].filter(Boolean)),
    ...toArray(env.CORS_ALLOWED_ORIGINS),
    ...toArray(env.CLIENT_ORIGINS), // optional extra var if you use it
  ])
).filter(Boolean);

/**
 * CORS options:
 * - Allows requests from CLIENT_ORIGIN and any in CORS_ALLOWED_ORIGINS
 * - Sends credentials (cookies) for cross-origin requests
 * - Allows SSR/no-origin tools (like curl/Postman)
 */
export const corsOptions = {
  origin(origin, cb) {
    // Allow requests with no origin (curl, server-to-server) and exact matches
    if (!origin || allowList.includes(origin)) return cb(null, true);
    return cb(new Error(`CORS blocked for ${origin}`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Set-Cookie"],
};
