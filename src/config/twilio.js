import twilio from "twilio";
import { env } from "./env.js";

let twilioClient = null;

if (env.TWILIO_ACCOUNT_SID && env.TWILIO_AUTH_TOKEN && env.TWILIO_FROM) {
  twilioClient = twilio(env.TWILIO_ACCOUNT_SID, env.TWILIO_AUTH_TOKEN);
} else {
  console.warn("⚠️ Twilio not fully configured. SMS/WhatsApp alerts disabled.");
}

export async function sendTwilioMessage({ to, body }) {
  if (!twilioClient) return { disabled: true };
  if (!to || !body) throw new Error("Twilio: 'to' and 'body' are required");
  return twilioClient.messages.create({
    from: env.TWILIO_FROM,
    to,
    body
  });
}
