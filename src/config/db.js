import mongoose from "mongoose";
import { env } from "./env.js";

export async function connectDB() {
  mongoose.set("strictQuery", true);

  
  await mongoose.connect(env.MONGODB_URI, {
    autoIndex: env.NODE_ENV !== "production",
    serverSelectionTimeoutMS: 10_000, 
    socketTimeoutMS: 45_000,         
    maxPoolSize: 10,                 
    retryWrites: true,
  });

  
  try {
   
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
