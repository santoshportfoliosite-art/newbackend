import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    message: { type: String, required: true, maxlength: 5000 },
    status: { type: String, enum: ["unread", "read"], default: "unread" }
  },
  { timestamps: true }
);

messageSchema.index({ status: 1, createdAt: -1 });

export const Message = mongoose.model("Message", messageSchema);
