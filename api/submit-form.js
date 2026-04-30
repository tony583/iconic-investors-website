// AR Application handler — forwards to ARIA relay server for Supabase save + Gmail delivery
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const response = await fetch("http://72.60.64.35:8234", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });
    const result = await response.json();
    return res.status(200).json(result);
  } catch (err) {
    console.error("Relay error:", err);
    return res.status(500).json({ error: "Submission failed, please try again." });
  }
}
