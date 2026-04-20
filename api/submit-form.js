import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const data = req.body;

  const formatAddress = (addr) => {
    if (!addr) return "N/A";
    return [addr.street, addr.suburb, addr.state, addr.postcode, addr.country]
      .filter(Boolean)
      .join(", ");
  };

  const formatList = (arr) => (Array.isArray(arr) && arr.length ? arr.join(", ") : "None selected");

  const yesNoQuestions = [
    "Has ASIC previously issued you with an Authorised Representative Number?",
    "Are you an Authorised Representative of another AFS Licensee?",
    "Have you been the subject of any findings, judgement or current proceedings in relation to fraud, misrepresentation or dishonesty?",
    "Have you been refused, restricted, banned or disqualified to carry on any trade, business or profession?",
    "Have you been refused membership, suspended, removed or disciplined by any professional body?",
    "Are there any outstanding debts with any insurance company, fund manager or AFS Licensee?",
    "Have you ever been the subject of adverse findings, disciplinary proceedings or investigation by a government regulatory body (e.g. ASIC, ATO, APRA)?",
    "Have you ever been declared bankrupt or entered into a Part IX or Part X Debt Agreement?",
    "Have you been engaged in the management of any entity that was declared insolvent?",
    "Have you ever been the subject of a Professional Indemnity Claim?",
    "Have you been the subject of any complaint made to an external Complaints Resolution body?",
    "Have you ever been engaged in the management of any entity that has had its licence or registration revoked?",
  ];

  const htmlBody = `
    <h1 style="font-family:sans-serif;color:#1a1a2e;">New AR Application — Iconic Investors</h1>

    <h2 style="font-family:sans-serif;color:#444;border-bottom:1px solid #eee;padding-bottom:8px;">Authorisation Types</h2>
    <p><strong>Personal Financial Product Advice:</strong> ${formatList(data.personalAdvice)}</p>
    <p><strong>Limited Financial Product Advice:</strong> ${formatList(data.limitedAdvice)}</p>
    <p><strong>General Financial Product Advice:</strong> ${formatList(data.generalAdvice)}</p>
    <p><strong>Other Authorisations:</strong> ${formatList(data.otherAuthorisations)}</p>

    <h2 style="font-family:sans-serif;color:#444;border-bottom:1px solid #eee;padding-bottom:8px;">Personal Details</h2>
    <p><strong>First Name:</strong> ${data.firstName || "N/A"}</p>
    <p><strong>Last Name:</strong> ${data.lastName || "N/A"}</p>
    <p><strong>Address:</strong> ${formatAddress(data.personalAddress)}</p>

    <h2 style="font-family:sans-serif;color:#444;border-bottom:1px solid #eee;padding-bottom:8px;">Employer / Business Details</h2>
    <p><strong>Business Name:</strong> ${data.businessName || "N/A"}</p>
    <p><strong>Business Address:</strong> ${formatAddress(data.businessAddress)}</p>

    <h2 style="font-family:sans-serif;color:#444;border-bottom:1px solid #eee;padding-bottom:8px;">Authorised Representative Details</h2>
    <p><strong>Authorised as:</strong> ${data.authorisedAs || "N/A"}</p>
    <p><strong>Registered Business Name (corporate):</strong> ${data.registeredBusinessName || "N/A"}</p>
    <p><strong>ABN / ACN (corporate):</strong> ${data.abnAcn || "N/A"}</p>
    <p><strong>CAR / AR Address:</strong> ${formatAddress(data.arAddress)}</p>
    <p><strong>Previous AR Number issued by ASIC:</strong> ${data.hasPreviousArNumber || "N/A"}</p>
    <p><strong>AR Number:</strong> ${data.arNumber || "N/A"}</p>
    <p><strong>AR of another AFS Licensee:</strong> ${data.isArOfOtherLicensee || "N/A"}</p>
    <p><strong>Other Licensee Name:</strong> ${data.otherLicenseeName || "N/A"}</p>

    <h2 style="font-family:sans-serif;color:#444;border-bottom:1px solid #eee;padding-bottom:8px;">Documents to be Provided</h2>
    <p>${formatList(data.documents)}</p>

    <h2 style="font-family:sans-serif;color:#444;border-bottom:1px solid #eee;padding-bottom:8px;">Compliance Questions</h2>
    ${yesNoQuestions
      .map((q, i) => {
        const key = `compliance_${i}`;
        return `<p><strong>${q}</strong><br/>Answer: ${data[key] || "N/A"}</p>`;
      })
      .join("")}
    <p><strong>Details (if YES to any above):</strong><br/>${data.complianceDetails || "N/A"}</p>

    <h2 style="font-family:sans-serif;color:#444;border-bottom:1px solid #eee;padding-bottom:8px;">Declaration</h2>
    <p><strong>Full Name:</strong> ${data.declarationName || "N/A"}</p>
    <p><strong>Agreed to Terms:</strong> ${data.agreedToTerms ? "Yes" : "No"}</p>

    <hr style="margin-top:32px;"/>
    <p style="color:#888;font-size:12px;">Submitted via iconicinvestors.com.au application form</p>
  `;

  try {
    await resend.emails.send({
      from: "Applications <onboarding@resend.dev>",
      to: "antonio@iconicinvestors.com.au",
      subject: `New AR Application — ${data.firstName || ""} ${data.lastName || ""}`,
      html: htmlBody,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    return res.status(500).json({ error: "Failed to send application" });
  }
}
