import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const GHL_API_KEY = process.env.GHL_API_KEY;
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID;

async function createGHLContact({ name, email, phone, state, message }) {
  if (!GHL_API_KEY || !GHL_LOCATION_ID) return null;

  const [firstName, ...rest] = name.trim().split(" ");
  const lastName = rest.join(" ") || "";

  // Create or update contact
  const contactRes = await fetch("https://services.leadconnectorhq.com/contacts/", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${GHL_API_KEY}`,
      "Content-Type": "application/json",
      "Version": "2021-07-28",
    },
    body: JSON.stringify({
      locationId: GHL_LOCATION_ID,
      firstName,
      lastName,
      email,
      phone: phone || undefined,
      address1: state ? `${state}` : undefined,
      source: "Website Contact Form",
      tags: ["website-enquiry"],
    }),
  });

  if (!contactRes.ok) {
    console.error("GHL contact creation failed:", await contactRes.text());
    return null;
  }

  const contactData = await contactRes.json();
  const contactId = contactData?.contact?.id;
  if (!contactId) return null;

  // Add note with the message
  const noteRes = await fetch(`https://services.leadconnectorhq.com/contacts/${contactId}/notes`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${GHL_API_KEY}`,
      "Content-Type": "application/json",
      "Version": "2021-07-28",
    },
    body: JSON.stringify({
      userId: GHL_LOCATION_ID,
      body: `Website enquiry from ${name}:\n\n${message}${state ? `\n\nState: ${state}` : ""}`,
    }),
  });

  if (!noteRes.ok) {
    console.error("GHL note creation failed:", await noteRes.text());
  }

  return contactId;
}

async function sendEmail({ name, email, phone, state, message }) {
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

  return resend.emails.send({
    from: "Iconic Investors Website <onboarding@resend.dev>",
    to: "antonio@iconicinvestors.com.au",
    replyTo: email,
    subject: `Website Enquiry from ${name}`,
    html: htmlBody,
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, phone, state, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email and message are required." });
  }

  try {
    // Run email + GHL in parallel
    const [, ghlContactId] = await Promise.allSettled([
      sendEmail({ name, email, phone, state, message }),
      createGHLContact({ name, email, phone, state, message }),
    ]);

    console.log("Contact form submitted:", { name, email, ghlContactId: ghlContactId?.value });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return res.status(500).json({ error: "Failed to send message." });
  }
}
