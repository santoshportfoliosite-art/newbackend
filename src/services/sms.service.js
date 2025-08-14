import { sendTwilioMessage } from "../config/twilio.js";

/**
 * Send SMS/WhatsApp using Twilio.
 * NOTE: env.TWILIO_FROM may be a phone or 'whatsapp:+XXXXXXXX'
 *       and 'to' must match the same channel.
 */
export async function sendOwnerAlert({ to, body }) {
  if (!to) return { skipped: true };
  try {
    return await sendTwilioMessage({ to, body });
  } catch (e) {
    // don't fail the request just because SMS fails
    console.warn("Twilio send error:", e?.message || e);
    return { error: true, message: e?.message };
  }
}
