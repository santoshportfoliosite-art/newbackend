import { env } from "../config/env.js";

const allowlist = new Set([
  env.CLIENT_ORIGIN,
  ...env.CORS_ALLOWED_ORIGINS
].filter(Boolean));

export const corsOptions = {
  origin(origin, callback) {
    // Allow non-browser clients (like curl/postman) where origin is undefined
    if (!origin || allowlist.has(origin)) {
      return callback(null, true);
    }
    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
  optionsSuccessStatus: 200
};
