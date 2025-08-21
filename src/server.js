import http from "http";
import { env } from "./config/env.js";
import { connectDB } from "./config/db.js";
import app from "./app.js";

const server = http.createServer(app);

/* [ADD] Make Node friendlier to cold starts / proxies (Render/Netlify).
   Prevents early timeouts during first DB calls after idle warm-up. */
server.requestTimeout = 0;          // no per-request timeout
server.keepAliveTimeout = 61_000;   // >60s so upstreams don't cut early
server.headersTimeout = 65_000;     // a bit higher than keepAliveTimeout

async function bootstrap() {
  try {
    await connectDB(); // waits for Mongo to be up (with a ping)
    server.listen(env.PORT, () => {
      console.log(`✅ Server running on http://localhost:${env.PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
}

/* [ADD] Graceful shutdown (safe for Render) */
function shutdown(code = 0) {
  console.warn("🔻 Shutting down...");
  server.close(() => {
    console.warn("🔻 HTTP server closed");
    process.exit(code);
  });
}
process.on("SIGINT", () => shutdown(0));
process.on("SIGTERM", () => shutdown(0));

process.on("unhandledRejection", (reason) => {
  console.error("UNHANDLED REJECTION:", reason);
  shutdown(1);
});

process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION:", err);
  shutdown(1);
});

bootstrap();
