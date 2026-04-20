import { motion } from "framer-motion";
import { Check } from "lucide-react";

const BOOKING_URL = "https://api.leadconnectorhq.com/widget/bookings/discovery_call_antonio";

const stats = [
  { value: "30+", label: "Years Combined Experience" },
  { value: "AFSL 450822", label: "Licensed & Regulated", gold: true },
  { value: "2–4 Weeks", label: "Fast Onboarding" },
  { value: "Flat Fee", label: "All Inclusive — No Surprises", gold: true },
];

const trustItems = ["AFSL Authorised Fast", "One Flat Fee — No Surprises", "30+ Years Experience"];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.6 } }),
};

export default function HeroSection() {
  return (
    <section id="home" className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <div>
          <motion.div
            variants={fadeUp} initial="hidden" animate="visible" custom={0}
            className="inline-flex items-center gap-2 bg-accent/15 text-accent border border-accent/30 rounded-full px-4 py-1.5 text-sm font-bold mb-6"
          >
            <span>⚖</span> Australia's Trusted AFSL Licensee
          </motion.div>

          <motion.h1
            variants={fadeUp} initial="hidden" animate="visible" custom={1}
            className="text-4xl sm:text-5xl lg:text-6xl font-serif leading-[1.1] mb-6"
          >
            The AFSL Home for{" "}
            <span className="text-accent">Independent Financial</span> Planners
          </motion.h1>

          <motion.p
            variants={fadeUp} initial="hidden" animate="visible" custom={2}
            className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl"
          >
            Iconic Investors provides financial planners with the licence, compliance framework and strategic support to build thriving, independent advisory practices — backed by 30 years of industry experience.
          </motion.p>

          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3} className="flex flex-wrap gap-4 mb-10">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="bg-primary text-primary-foreground font-bold px-7 py-3.5 rounded-lg text-base hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">
              Talk to Us →
            </a>
            <a href="#licensee-services" className="border-2 border-primary text-primary font-bold px-7 py-3.5 rounded-lg text-base hover:bg-primary hover:text-primary-foreground transition-colors">
              Explore Services
            </a>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={4} className="flex flex-wrap gap-6">
            {trustItems.map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <span className="w-5 h-5 rounded-full bg-accent/20 text-accent flex items-center justify-center">
                  <Check className="w-3 h-3" />
                </span>
                {item}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — Stats Card */}
        <motion.div
          variants={fadeUp} initial="hidden" animate="visible" custom={2}
          className="bg-primary text-primary-foreground rounded-2xl p-8 shadow-2xl shadow-primary/30"
        >
          <h3 className="text-xl font-serif mb-6 opacity-90">Why Planners Choose Iconic</h3>
          <div className="space-y-5">
            {stats.map((s) => (
              <div key={s.value} className="flex items-center gap-4">
                <div className={`w-1.5 h-12 rounded-full ${s.gold ? "bg-accent" : "bg-primary-foreground/30"}`} />
                <div>
                  <div className="text-2xl font-extrabold">{s.value}</div>
                  <div className="text-sm opacity-60">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
