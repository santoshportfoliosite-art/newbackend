import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    url: { type: String, required: true, trim: true },
    cover: {
      public_id: { type: String, required: true },
      url: { type: String, required: true }
    }
  },
  { timestamps: true }
);

export const Project = mongoose.model("Project", projectSchema);
