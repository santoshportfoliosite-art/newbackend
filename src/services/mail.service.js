import { sendMail as send } from "../config/mail.js";


export async function sendMail({ to, subject, text, html }) {
  return send({ to, subject, text, html });
}


export function templates() {
  return {
    senderAcknowledgement: ({ name }) => ({
      subject: "Thanks for your message ✉️",
      text:
        `Hello ${name},\n` +
        `I received your message and will respond you ASAP.\n` +
        `This message is not just a message for me—it's our beginning point for our valuable collab.`,
      html:
        `<p>Hello <strong>${name}</strong>,</p>` +
        `<p>I received your message and will respond you ASAP.</p>` +
        `<p>This message is not just a message for me—it's our beginning point for our valuable collab.</p>`
    }),
    adminNotification: ({ name }) => ({
      subject: `New portfolio message from ${name}`,
      text: `Hello Admin,\nYou got a new message from ${name}.\nPlease check.`,
      html: `<p>Hello Admin,</p><p>You got a new message from <strong>${name}</strong>.</p><p>Please check.</p>`
    })
  };
}
