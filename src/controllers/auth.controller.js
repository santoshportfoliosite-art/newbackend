import { asyncHandler } from "../utils/asyncHandler.js";
import { validate, schemas } from "../utils/validate.js";
import { login as loginSvc, verifyToken } from "../services/auth.service.js";

export const login = asyncHandler(async (req, res) => {
  const { email, password } = validate(schemas.login, req.body);
  const { admin, token, cookieOptions } = await loginSvc(email, password);

  
  res.cookie("token", token, cookieOptions);
  res.status(200).json({
    success: true,
    message: "Login success",
    data: { admin, token }
  });
});

export const me = asyncHandler(async (req, res) => {
  const bearer = req.headers.authorization?.split(" ")[1];
  const token = req.cookies?.token || bearer;
  if (!token) return res.status(401).json({ success: false, message: "Unauthorized" });
  const admin = await verifyToken(token);
  res.json({ success: true, data: { admin } });
});

export const logout = asyncHandler(async (_req, res) => {
  res.clearCookie("token", { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production" });
  res.json({ success: true, message: "Logged out" });
});
