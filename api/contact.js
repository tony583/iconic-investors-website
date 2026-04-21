import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, phone, state, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email and message are required." });
  }

  const htmlBody = `
    <h1 style="font-family:sans-serif;color:#1a1a2e;">New Website Enquiry — Iconic Investors</h1>

    <table style="font-family:sans-serif;font-size:15px;border-collapse:collapse;width:100%;max-width:600px;">
      <tr>
        <td style="padding:8px 12px;font-weight:bold;color:#444;width:140px;">Name</td>
        <td style="padding:8px 12px;color:#1a1a2e;">${name}</td>
      </tr>
      <tr style="background:#f9f9f9;">
        <td style="padding:8px 12px;font-weight:bold;color:#444;">Email</td>
        <td style="padding:8px 12px;"><a href="mailto:${email}" style="color:#2563eb;">${email}</a></td>
      </tr>
      <tr>
        <td style="padding:8px 12px;font-weight:bold;color:#444;">Phone</td>
        <td style="padding:8px 12px;color:#1a1a2e;">${phone || "Not provided"}</td>
      </tr>
      <tr style="background:#f9f9f9;">
        <td style="padding:8px 12px;font-weight:bold;color:#444;">State</td>
        <td style="padding:8px 12px;color:#1a1a2e;">${state || "Not provided"}</td>
      </tr>
    </table>

    <h2 style="font-family:sans-serif;color:#444;margin-top:24px;border-bottom:1px solid #eee;padding-bottom:8px;">Message</h2>
    <p style="font-family:sans-serif;font-size:15px;color:#1a1a2e;line-height:1.6;white-space:pre-wrap;">${message}</p>

    <hr style="margin-top:32px;border:none;border-top:1px solid #eee;"/>
    <p style="color:#888;font-size:12px;font-family:sans-serif;">Submitted via iconicinvestors.com.au contact form</p>
  `;

  try {
    await resend.emails.send({
      from: "Iconic Investors Website <onboarding@resend.dev>",
      to: "antonio@iconicinvestors.com.au",
      replyTo: email,
      subject: `Website Enquiry from ${name}`,
      html: htmlBody,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    return res.status(500).json({ error: "Failed to send message." });
  }
}
