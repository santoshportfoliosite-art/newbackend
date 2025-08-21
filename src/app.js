import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";

import { env } from "./config/env.js";
import { corsOptions } from "./middleware/cors.js";
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";

// Routes
import apiRouter from "./routes/index.js";

const app = express();

/** ✅ Needed for Secure cookies behind Render/Netlify/NGINX proxies */
app.set("trust proxy", 1);

// Security & utils
app.use(
  helmet({
    // If you serve cross-origin assets, consider disabling CORP:
    // crossOriginResourcePolicy: false
  })
);
app.use(compression());

/** ✅ CORS with credentials BEFORE routes */
app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));

if (env.NODE_ENV !== "production") app.use(morgan("dev"));

/* [ADD] Per-route open CORS for health endpoints (no credentials).
   This avoids CORS errors when your frontend (or pingers) hit /health from another origin. */
const openCors = cors({ origin: true, credentials: false });

/* [MODIFIED with openCors + header] Extra health endpoint commonly used by uptime pingers/warmers */
app.get("/health", openCors, (_req, res) => {
  // Explicit wildcard since no credentials are used on this route
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).json({ ok: true, ts: Date.now() });
});

// Existing health check (kept) with open CORS as well
app.get("/healthz", openCors, (_req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).json({ ok: true });
});

/* [ADD] Prevent stale/empty cached API responses through CDNs/proxies.
   Safe: headers only, does NOT alter handler logic or responses. */
app.use("/api", (req, res, next) => {
  // No-store for GETs; also fine for others
  res.setHeader("Cache-Control", "no-store");
  // Helpful when traversing multiple proxies
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  next();
});

// API
app.use("/api", apiRouter);

// 404 & error handler
app.use(notFound);
app.use(errorHandler);

export default app;
