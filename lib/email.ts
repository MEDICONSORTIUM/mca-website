import { Resend } from "resend";

// Spec 7.1 (Contact Form Email Integration) — Resend preferred, Nodemailer
// with SMTP as the documented fallback. This file implements Resend; if
// MCA's domain can't be verified with Resend in time, swap the body of
// sendContactEmail() for a nodemailer.createTransport(...) SMTP call —
// the function signature and callers don't need to change.

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactEmailPayload {
  fullName: string;
  email: string;
  organisation?: string;
  subject: string;
  message: string;
}

export async function sendContactEmail(payload: ContactEmailPayload): Promise<void> {
  const recipient = process.env.CONTACT_EMAIL_ADDRESS;
  const sender = process.env.CONTACT_SENDER_ADDRESS;

  if (!recipient || !sender) {
    throw new Error(
      "CONTACT_EMAIL_ADDRESS or CONTACT_SENDER_ADDRESS is not configured"
    );
  }

  const { fullName, email, organisation, subject, message } = payload;

  // Spec 7.1 — Email Subject Format: "New Contact Form Submission: {Subject}"
  // Email Body: Full Name, Email, Organisation, Subject, Message.
  await resend.emails.send({
    from: sender,
    to: recipient,
    replyTo: email,
    subject: `New Contact Form Submission: ${subject}`,
    text: [
      `Full Name: ${fullName}`,
      `Email: ${email}`,
      `Organisation: ${organisation || "—"}`,
      `Subject: ${subject}`,
      "",
      "Message:",
      message,
    ].join("\n"),
  });
}
