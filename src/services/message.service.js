import { Message } from "../models/Message.js";
import { sendMail, templates } from "./mail.service.js";
import { sendOwnerAlert } from "./sms.service.js";
import { env } from "../config/env.js";

export async function createMessage({ name, email, message }) {
  const doc = await Message.create({ name, email, message, status: "unread" });

  
  const t = templates();

  try {
    const { subject, text, html } = t.senderAcknowledgement({ name });
    await sendMail({ to: email, subject, text, html });
  } catch (e) {
    console.warn("Ack email failed:", e?.message || e);
  }


  try {
    const { subject, text, html } = t.adminNotification({ name });
    await sendMail({ to: env.SMTP_USER, subject, text, html });
  } catch (e) {
    console.warn("Admin email failed:", e?.message || e);
  }


  try {
    await sendOwnerAlert({
      to: env.OWNER_NUMBER,
      body: `Hello Admin, You got a new message from ${name}. Please check.`
    });
  } catch (e) {
    console.warn("Twilio alert failed:", e?.message || e);
  }

  return doc;
}

export async function listMessages({ status, page = 1, limit = 20 }) {
  const query = {};
  if (status && status !== "all") query.status = status;

  const [items, total] = await Promise.all([
    Message.find(query)
      .sort({ status: 1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    Message.countDocuments(query)
  ]);

  return {
    items,
    total,
    page,
    pages: Math.ceil(total / limit)
  };
}

export async function getMessageById(id) {
  return Message.findById(id).lean();
}

export async function markAsRead(id) {
  const updated = await Message.findByIdAndUpdate(
    id,
    { $set: { status: "read" } },
    { new: true }
  ).lean();
  return updated;
}
