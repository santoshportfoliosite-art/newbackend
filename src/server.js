import http from "http";
import { env } from "./config/env.js";
import { connectDB } from "./config/db.js";
import app from "./app.js";

const server = http.createServer(app);

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

process.on("unhandledRejection", (reason) => {
  console.error("UNHANDLED REJECTION:", reason);
  server.close(() => process.exit(1));
});

process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION:", err);
  process.exit(1);
});

bootstrap();
