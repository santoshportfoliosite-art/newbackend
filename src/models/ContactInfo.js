import mongoose from "mongoose";

const contactInfoSchema = new mongoose.Schema(
  {
    mobile: { type: String, default: "" },
    whatsapp: { type: String, default: "" },
    email: { type: String, default: "" },
    facebook: { type: String, default: "" },
    instagram: { type: String, default: "" },
    youtube: { type: String, default: "" },
    tiktok: { type: String, default: "" },
    fbPage: { type: String, default: "" }
  },
  { timestamps: true }
);


export const ContactInfo = mongoose.model("ContactInfo", contactInfoSchema);
