import { sendTwilioMessage } from "../config/twilio.js";


export async function sendOwnerAlert({ to, body }) {
  if (!to) return { skipped: true };
  try {
    return await sendTwilioMessage({ to, body });
  } catch (e) {
 
    console.warn("Twilio send error:", e?.message || e);
    return { error: true, message: e?.message };
  }
}
