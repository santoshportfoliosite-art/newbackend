import mongoose from "mongoose";
import { env } from "./env.js";

export async function connectDB() {
  mongoose.set("strictQuery", true);

  /* [ADD] Robust connection options to avoid flaky first queries */
  await mongoose.connect(env.MONGODB_URI, {
    autoIndex: env.NODE_ENV !== "production",
    serverSelectionTimeoutMS: 10_000, // fail fast if cluster is unreachable
    socketTimeoutMS: 45_000,          // keep sockets alive long enough on cold starts
    maxPoolSize: 10,                  // sensible default
    retryWrites: true,
  });

  /* [ADD] Ensure DB is actually reachable (not just socket opened). */
  try {
    // Will throw if the admin command can't be executed yet
    await mongoose.connection.db.admin().command({ ping: 1 });
  } catch (e) {
    console.error("MongoDB ping failed right after connect:", e);
    throw e;
  }

  mongoose.connection.on("connected", () => {
    console.log("🗄️  MongoDB connected");
  });

  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
  });

  mongoose.connection.on("disconnected", () => {
    console.warn("MongoDB disconnected");
  });
}
