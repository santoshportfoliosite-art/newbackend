import rateLimit from "express-rate-limit";


export const messageLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30, 
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { success: false, message: "Too many requests. Please try again later." }
});

export const apiLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  limit: 300,
  standardHeaders: "draft-7",
  legacyHeaders: false
});
