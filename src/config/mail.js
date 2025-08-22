import nodemailer from "nodemailer";
import { env } from "./env.js";

export const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: env.SMTP_PORT === 465, 
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS
  }
});

export async function sendMail({ to, subject, text, html }) {
  const info = await transporter.sendMail({
    from: env.MAIL_FROM,
    to,
    subject,
    text,
    html
  });
  return info;
}
