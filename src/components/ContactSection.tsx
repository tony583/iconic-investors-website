import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const BOOKING_URL = "https://api.leadconnectorhq.com/widget/bookings/discovery_call_antonio";

type FormState = {
  name: string;
  email: string;
  phone: string;
  state: string;
  message: string;
};

const INITIAL: FormState = { name: "", email: "", phone: "", state: "", message: "" };

export default function ContactSection() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      setForm(INITIAL);
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  return (
    <section id="contact" className="bg-primary py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-accent mb-3">Get in Touch</p>
        <h2 className="text-3xl sm:text-4xl font-serif text-primary-foreground mb-4">Talk to Our Team</h2>
        <p className="text-lg text-primary-foreground/60 max-w-3xl mb-14">No obligation, no sales pitch. Just an honest conversation about your practice and how we can help.</p>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="space-y-5 mb-8">
              <div className="flex items-center gap-3">
                <span className="text-xl">📧</span>
                <a href="mailto:connect@iconicinvestors.com.au" className="text-primary-foreground text-base hover:text-accent transition-colors">connect@iconicinvestors.com.au</a>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xl">🌐</span>
                <a href="https://www.iconicinvestors.com.au/" target="_blank" rel="noopener noreferrer" className="text-primary-foreground text-base hover:text-accent transition-colors">iconicinvestors.com.au</a>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xl">📞</span>
                <a href="tel:+61434530361" className="text-primary-foreground text-base hover:text-accent transition-colors">0434 530 361</a>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xl">📍</span>
                <span className="text-primary-foreground/75 text-base">31 Coolaroo Road, Lane Cove NSW 2066</span>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/40 mb-8">AFSL 450822 | ACN 167 051 470</p>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-primary-foreground text-primary font-bold px-7 py-3.5 rounded-lg text-base hover:opacity-90 transition-opacity">
              📅 Book a Call Directly →
            </a>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="bg-card rounded-2xl p-8 shadow-xl"
          >
            <h3 className="text-xl font-bold text-foreground font-sans mb-6">Send Us a Message</h3>

            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="text-5xl mb-4">✅</div>
                  <h4 className="text-xl font-bold text-foreground mb-2">Message Sent!</h4>
                  <p className="text-muted-foreground text-sm max-w-xs">Thanks for reaching out. We'll be in touch within 1 business day.</p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-6 text-sm font-semibold text-accent hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-muted-foreground mb-1.5">Full Name <span className="text-accent">*</span></label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        required
                        className="w-full px-4 py-3 border border-border rounded-lg bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-muted-foreground mb-1.5">Email Address <span className="text-accent">*</span></label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                        className="w-full px-4 py-3 border border-border rounded-lg bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-muted-foreground mb-1.5">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="04xx xxx xxx"
                        className="w-full px-4 py-3 border border-border rounded-lg bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-muted-foreground mb-1.5">State</label>
                      <select
                        name="state"
                        value={form.state}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-border rounded-lg bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
                      >
                        <option value="">Select state</option>
                        <option>VIC</option><option>NSW</option><option>QLD</option><option>WA</option><option>SA</option><option>TAS</option><option>ACT</option><option>NT</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-muted-foreground mb-1.5">Tell us about your practice <span className="text-accent">*</span></label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={4}
                      required
                      placeholder="Brief description of your practice and what you're looking for..."
                      className="w-full px-4 py-3 border border-border rounded-lg bg-secondary text-foreground text-sm resize-y focus:outline-none focus:ring-2 focus:ring-accent/40"
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-sm text-red-500 font-medium">{errorMsg || "Something went wrong. Please try again."}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full bg-primary text-primary-foreground font-bold py-3.5 rounded-lg text-base hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === "submitting" ? "Sending…" : "Send Message →"}
                  </button>
                  <p className="text-center text-xs text-muted-foreground">We respond within 1 business day.</p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
