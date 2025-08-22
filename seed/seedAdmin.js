import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { env } from "../src/config/env.js";
import { AdminUser } from "../src/models/AdminUser.js";

async function run() {
  if (!env.SEED_ADMIN_EMAIL || !env.SEED_ADMIN_PASSWORD) {
    console.error("Set SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD in your .env first.");
    process.exit(1);
  }

  try {
    await mongoose.connect(env.MONGODB_URI);
    const email = String(env.SEED_ADMIN_EMAIL).toLowerCase();

    let user = await AdminUser.findOne({ email });
    if (user) {
      console.log(`ℹAdmin already exists: ${email}`);
    } else {
      const passwordHash = await bcrypt.hash(
        env.SEED_ADMIN_PASSWORD,
        env.BCRYPT_SALT_ROUNDS || 10
      );
      user = await AdminUser.create({ email, passwordHash });
      console.log(`✅ Admin created: ${email}`);
    }
  } catch (err) {
    console.error("❌ Seed failed:", err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

run();
