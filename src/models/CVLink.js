import mongoose from "mongoose";

const cvLinkSchema = new mongoose.Schema(
  {
    url: { type: String, required: true }
  },
  { timestamps: true }
);

// Singleton-style usage.
export const CVLink = mongoose.model("CVLink", cvLinkSchema);
