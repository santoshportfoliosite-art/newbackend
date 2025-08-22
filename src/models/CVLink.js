import mongoose from "mongoose";

const cvLinkSchema = new mongoose.Schema(
  {
    url: { type: String, required: true }
  },
  { timestamps: true }
);


export const CVLink = mongoose.model("CVLink", cvLinkSchema);
