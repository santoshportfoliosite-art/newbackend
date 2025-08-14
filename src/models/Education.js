import mongoose from "mongoose";

const educationSchema = new mongoose.Schema(
  {
    level: { type: String, required: true, trim: true },
    institution: { type: String, required: true, trim: true },
    year: { type: Number, required: true }
  },
  { timestamps: true }
);

export const Education = mongoose.model("Education", educationSchema);
