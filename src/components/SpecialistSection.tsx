import { motion } from "framer-motion";

const BOOKING_URL = "https://api.leadconnectorhq.com/widget/bookings/discovery_call_antonio";

const investmentCards = [
  { tag: "Strategy", title: "Investment Strategy Review", desc: "A comprehensive review of your client's current investment strategy — identifying gaps, risks and opportunities." },
  { tag: "Implementation", title: "Strategy Implementation", desc: "End-to-end implementation of approved investment strategies, managed through our strategic partner network." },
  { tag: "Portfolio", title: "Portfolio Construction & Governance", desc: "Disciplined portfolio construction with ongoing governance oversight — built for performance and compliance." },
  { tag: "Ongoing", title: "Ongoing Portfolio Review", desc: "Regular reviews of portfolio performance, asset allocation and alignment with client objectives." },
  { tag: "Second Opinion", title: "2nd Opinion Service", desc: "An independent, expert second opinion on investment strategies — giving your clients added confidence." },
  { tag: "Trading", title: "Cost Efficient Securities Trading", desc: "Access to a global securities trading and reporting platform — purpose-built for HNW clients." },
];

const consultingCards = [
  { tag: "Funds", title: "Investment Fund Structuring", desc: "End-to-end structuring of investment funds — from entity setup and trust deeds to compliance frameworks and launch." },
  { tag: "Offering", title: "Small-Scale Offering Support", desc: "Expert guidance on small-scale offerings — helping you raise capital compliantly without the burden of a full prospectus." },
  { tag: "AFSL", title: "AFSL Authorisation Uplift", desc: "Transition your existing AFSL to a higher authorisation level, including Managed Investment Scheme (MIS) licensing and compliance." },
  { tag: "Transition", title: "Wholesale to Retail Fund Transition", desc: "Navigate the regulatory requirements of transitioning a wholesale fund to a retail fund — including PDS preparation and ASIC compliance." },
];

const docCards = [
  { tag: "Email", title: "Email Compliance", desc: "Compliant email templates and communication frameworks — ensuring every client interaction meets regulatory standards." },
  { tag: "Documentation", title: "Documentation & Templates", desc: "Professional, ASIC-compliant SOA, FSG and client-facing document templates." },
  { tag: "Investment", title: "Investment Strategy Documents", desc: "Structured investment strategy documentation — from Investment Policy Statements to portfolio mandate templates." },
  { tag: "SMSF", title: "SMSF Compliance Documents", desc: "SMSF compliance documentation including trustee minutes, investment strategies and annual reviews." },
  { tag: "Disclosure", title: "Disclosure Documentation", desc: "Product Disclosure Statements, Target Market Determinations and other key disclosure documents." },
  { tag: "Conflicts", title: "Conflict of Interest Management", desc: "Conflict of interest registers, policies and management frameworks — ensuring transparency and regulatory compliance." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function ServiceCard({ tag, title, desc, bgClass = "bg-card" }: { tag: string; title: string; desc: string; bgClass?: string }) {
  return (
    <motion.div variants={fadeUp} className={`${bgClass} rounded-xl p-6 border border-border`}>
      <span className="inline-block text-[10px] font-bold uppercase tracking-widest bg-primary/10 text-primary px-2.5 py-1 rounded mb-3">{tag}</span>
      <h4 className="text-base font-bold text-foreground font-sans mb-2">{title}</h4>
      <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
    </motion.div>
  );
}

export default function SpecialistSection() {
  return (
    <section id="specialist-services" className="bg-card">
      {/* Header */}
      <div className="py-20 md:py-28 pb-0">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-accent mb-3">Specialist Services</p>
          <h2 className="text-3xl sm:text-4xl font-serif text-foreground mb-4">Specialist Services Offered</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mb-16">Beyond our core Licensee Services offering, the Iconic Investors group provides access to specialist services through our joint venture and strategic partners — adding further value to your practice and meeting the needs of your clients.</p>
        </div>
      </div>

      {/* Investment */}
      <div className="bg-secondary py-16">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-accent mb-2">Investment</p>
          <h3 className="text-2xl sm:text-3xl font-serif text-foreground mb-3">Investment Management</h3>
          <p className="text-base text-muted-foreground max-w-3xl mb-8">Custom investment strategies and portfolio solutions — designed for SMSFs, non-profits and high-net-worth professionals.</p>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ staggerChildren: 0.06 }} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {investmentCards.map((c) => <ServiceCard key={c.title} {...c} />)}
          </motion.div>
        </div>
      </div>

      {/* Consulting */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-accent mb-2">Consulting</p>
          <h3 className="text-2xl sm:text-3xl font-serif text-foreground mb-3">Consulting Services</h3>
          <p className="text-base text-muted-foreground max-w-3xl mb-8">From fund structuring and small-scale offerings to AFSL authorisation uplift and wholesale-to-retail transitions — we help you scale with confidence.</p>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ staggerChildren: 0.06 }} className="grid sm:grid-cols-2 gap-5">
            {consultingCards.map((c) => <ServiceCard key={c.title} {...c} bgClass="bg-secondary" />)}
          </motion.div>
        </div>
      </div>

      {/* Documentation */}
      <div className="bg-secondary py-16">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-accent mb-2">Documentation</p>
          <h3 className="text-2xl sm:text-3xl font-serif text-foreground mb-3">Documentation & Compliance Tools</h3>
          <p className="text-base text-muted-foreground max-w-3xl mb-8">Comprehensive compliance documentation, templates and regulatory resources — covering every aspect of your advisory obligations.</p>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ staggerChildren: 0.06 }} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {docCards.map((c) => <ServiceCard key={c.title} {...c} />)}
          </motion.div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap gap-4">
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="bg-primary text-primary-foreground font-bold px-7 py-3.5 rounded-lg text-base hover:opacity-90 transition-opacity">
            Talk to Us →
          </a>
          <a href="#licensee-services" className="border-2 border-primary text-primary font-bold px-7 py-3.5 rounded-lg text-base hover:bg-primary hover:text-primary-foreground transition-colors">
            View Licensee Services
          </a>
        </div>
      </div>
    </section>
  );
}
