import http from "http";
import { env } from "./config/env.js";
import { connectDB } from "./config/db.js";
import app from "./app.js";
import { startStayAwake } from "./utils/stayAwake.js";
const server = http.createServer(app);

server.requestTimeout = 0;
server.keepAliveTimeout = 61_000;
server.headersTimeout = 65_000;

async function bootstrap() {
  try {
    await connectDB();
    server.listen(env.PORT, () => {
      console.log(`✅ Server running on http://localhost:${env.PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
}
startStayAwake();

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
