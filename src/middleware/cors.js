import { env } from "../config/env.js";

const allowlist = new Set([
  env.CLIENT_ORIGIN,
  ...(env.CORS_ALLOWED_ORIGINS || [])
].filter(Boolean));

export const corsOptions = {
  origin(origin, callback) {
    // Allow non-browser clients (curl/postman) with no origin
    if (!origin || allowlist.has(origin)) {
      return callback(null, true);
    }
    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  optionsSuccessStatus: 200
};
