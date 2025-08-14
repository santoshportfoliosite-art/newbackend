import { asyncHandler } from "../utils/asyncHandler.js";
import { validate, schemas } from "../utils/validate.js";
import * as msgSvc from "../services/message.service.js";
import ApiError from "../utils/ApiError.js";

export const createMessage = asyncHandler(async (req, res) => {
  const { name, email, message } = validate(schemas.messageCreate, req.body);
  const doc = await msgSvc.createMessage({ name, email, message });
  res.status(201).json({ success: true, message: "Message received", data: { id: doc._id } });
});

export const listMessages = asyncHandler(async (req, res) => {
  const { status = "unread", page = 1, limit = 20 } = req.query;
  const data = await msgSvc.listMessages({
    status: String(status),
    page: Number(page),
    limit: Number(limit)
  });
  res.json({ success: true, data });
});

export const getMessage = asyncHandler(async (req, res) => {
  const doc = await msgSvc.getMessageById(req.params.id);
  if (!doc) throw ApiError.notFound("Message not found");
  res.json({ success: true, data: doc });
});

export const markRead = asyncHandler(async (req, res) => {
  const updated = await msgSvc.markAsRead(req.params.id);
  if (!updated) throw ApiError.notFound("Message not found");
  res.json({ success: true, message: "Marked as read", data: updated });
});
