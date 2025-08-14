import mongoose from "mongoose";

const adminUserSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true }
  },
  { timestamps: true }
);

adminUserSchema.index({ email: 1 }, { unique: true });

export const AdminUser = mongoose.model("AdminUser", adminUserSchema);
