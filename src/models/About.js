import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema(
  {
    image: {
      public_id: { type: String, default: null },
      url: { type: String, default: null }
    },
    description: { type: String, maxlength: 2000, default: "" }
  },
  { timestamps: true }
);

// Optional: enforce singleton by always using the first document
export const About = mongoose.model("About", aboutSchema);
