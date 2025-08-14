import rateLimit from "express-rate-limit";

/** Strict limiter for public message submission */
export const messageLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30, // 30 requests/15min per IP
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { success: false, message: "Too many requests. Please try again later." }
});

/** Generic API limiter (optional) */
export const apiLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  limit: 300,
  standardHeaders: "draft-7",
  legacyHeaders: false
});
