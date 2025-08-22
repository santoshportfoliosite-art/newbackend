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


import apiRouter from "./routes/index.js";

const app = express();


app.set("trust proxy", 1);


app.use(
  helmet({
  })
);
app.use(compression());


app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));

if (env.NODE_ENV !== "production") app.use(morgan("dev"));


const openCors = cors({ origin: true, credentials: false });


app.get("/health", openCors, (_req, res) => {
  
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).json({ ok: true, ts: Date.now() });
});


app.get("/healthz", openCors, (_req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).json({ ok: true });
});


app.use("/api", (req, res, next) => {

  res.setHeader("Cache-Control", "no-store");
 
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  next();
});


app.use("/api", apiRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
