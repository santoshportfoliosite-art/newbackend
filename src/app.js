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

// Health check
app.get("/healthz", (_req, res) => res.status(200).json({ ok: true }));

// API
app.use("/api", apiRouter);

// 404 & error handler
app.use(notFound);
app.use(errorHandler);

export default app;
