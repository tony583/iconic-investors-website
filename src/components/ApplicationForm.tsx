import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";

// ─── Constants ────────────────────────────────────────────────────────────────

const STATES = ["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT"];

const PERSONAL_ADVICE = [
  "Comprehensive (all financial products covered by the licence)",
  "Managed investments",
  "Life risk insurance",
  "Superannuation (including SMSFs)",
  "Securities",
];
const LIMITED_ADVICE = [
  "Managed investments",
  "Life risk insurance",
  "Superannuation (including SMSFs)",
  "Securities",
];
const GENERAL_ADVICE = [
  "Managed investments",
  "Life risk insurance",
  "Superannuation (including SMSFs)",
  "Securities",
];
const OTHER_AUTH = [
  "Debentures",
  "Estate Planning",
  "Aged Care",
  "Tax (Financial) Advice – if not currently a Registered Tax Agent",
];
const DOCUMENTS = [
  "100 Points Identity Check – certified copies of Drivers Licence AND Birth Certificate or Passport",
  "National Criminal Record Check",
  "Bankruptcy Check",
  "Academic Records – Undergraduate degree",
  "Academic Records – Post-graduate degree",
  "Academic Records – Diploma",
  "Academic Records – Certificate",
  "Academic Records – Specialist subject matter",
  "Academic Records – Bridging units (ethics, regulatory)",
  "CPD Register for the last three years",
  "Professional memberships documentation",
  "Professional Indemnity Insurance (full copy of current policy)",
  "Resume / CV",
];
const COMPLIANCE_QUESTIONS = [
  "Have you been the subject of any findings, judgement or current proceedings in relation to fraud, misrepresentation or dishonesty, in any administrative, civil or criminal proceedings?",
  "Have you been refused, restricted, banned or disqualified to carry on any trade, business or profession for which a specific licence or registration is required by law?",
  "Have you been refused membership, suspended from membership, removed from membership or disciplined by any professional body, industry association or business organisation?",
  "Are there any outstanding debts with any insurance company, fund manager or Australian Financial Services Licensee, relating to you personally or an entity?",
  "Have you ever been the subject of adverse findings, disciplinary proceedings or an investigation by a government regulatory body (e.g. ASIC, ATO, APRA)?",
  "Have you ever been declared bankrupt or entered into a Part IX or Part X Debt Agreement under the Bankruptcy Act 1966?",
  "Have you been engaged in the management of any entity that was declared insolvent or have had an external administrator appointed?",
  "Have you ever been the subject of a Professional Indemnity Claim?",
  "Have you been the subject of any complaint made to an external Complaints Resolution body or scheme?",
  "Have you ever been engaged in the management of any entity that has had its licence or registration revoked under the Superannuation (Supervision) Act 1993 or Corporations Act 2001?",
];

const STEPS = [
  { id: 1, label: "Authorisation" },
  { id: 2, label: "Personal" },
  { id: 3, label: "Business" },
  { id: 4, label: "AR Details" },
  { id: 5, label: "Documents" },
  { id: 6, label: "Compliance" },
  { id: 7, label: "Declaration" },
];

// ─── Schema ───────────────────────────────────────────────────────────────────

const addressSchema = z.object({
  street: z.string().min(1, "Required"),
  suburb: z.string().min(1, "Required"),
  state: z.string().min(1, "Required"),
  postcode: z.string().min(4, "Required"),
  country: z.string().default("Australia"),
});

const complianceFields = Object.fromEntries(
  COMPLIANCE_QUESTIONS.map((_, i) => [`compliance_${i}`, z.string().min(1, "Required")])
) as Record<string, z.ZodString>;

const schema = z.object({
  personalAdvice: z.array(z.string()),
  limitedAdvice: z.array(z.string()),
  generalAdvice: z.array(z.string()),
  otherAuthorisations: z.array(z.string()),
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(8, "Required"),
  personalAddress: addressSchema,
  businessName: z.string().min(1, "Required"),
  businessAddress: addressSchema,
  authorisedAs: z.string().min(1, "Required"),
  registeredBusinessName: z.string().optional(),
  abnAcn: z.string().optional(),
  arAddress: addressSchema,
  hasPreviousArNumber: z.string().min(1, "Required"),
  arNumber: z.string().optional(),
  isArOfOtherLicensee: z.string().min(1, "Required"),
  otherLicenseeName: z.string().optional(),
  documents: z.array(z.string()),
  ...complianceFields,
  complianceDetails: z.string().optional(),
  declarationName: z.string().min(1, "Required"),
  agreedToTerms: z.boolean().refine((v) => v === true, "You must agree to proceed"),
});

type FormData = z.infer<typeof schema>;

// ─── UI Primitives ────────────────────────────────────────────────────────────

const inputCls =
  "w-full px-4 py-3 border border-border rounded-xl bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all placeholder:text-muted-foreground/60";
const labelCls = "block text-sm font-semibold text-foreground mb-1.5";
const errorCls = "text-red-500 text-xs mt-1.5 flex items-center gap-1";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className={errorCls}>⚠ {message}</p>;
}

function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-serif text-primary mb-1">{title}</h2>
      {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

function CheckboxCard({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`w-full text-left px-4 py-3 rounded-xl border transition-all text-sm flex items-start gap-3 ${
        checked
          ? "bg-primary/5 border-primary/40 text-primary font-medium"
          : "bg-background border-border text-foreground hover:border-accent/50"
      }`}
    >
      <span
        className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
          checked ? "bg-primary border-primary" : "border-border bg-white"
        }`}
      >
        {checked && (
          <svg viewBox="0 0 10 8" fill="none" className="w-2.5 h-2.5">
            <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      {label}
    </button>
  );
}

function CheckboxGroup({ options, selected, onChange }: { options: string[]; selected: string[]; onChange: (v: string[]) => void }) {
  const toggle = (opt: string) =>
    onChange(selected.includes(opt) ? selected.filter((s) => s !== opt) : [...selected, opt]);
  return (
    <div className="space-y-2">
      {options.map((opt) => (
        <CheckboxCard key={opt} label={opt} checked={selected.includes(opt)} onChange={() => toggle(opt)} />
      ))}
    </div>
  );
}

function RadioCard({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`flex-1 px-5 py-3 rounded-xl border text-sm font-medium transition-all ${
        checked
          ? "bg-primary text-primary-foreground border-primary shadow-md"
          : "bg-background border-border text-foreground hover:border-accent/50"
      }`}
    >
      {label}
    </button>
  );
}

function YesNoField({
  label,
  value,
  onChange,
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  return (
    <div className="pb-5 border-b border-border last:border-0">
      <p className="text-sm text-foreground mb-3 leading-relaxed">{label}</p>
      <div className="flex gap-3">
        <RadioCard label="Yes" checked={value === "Yes"} onChange={() => onChange("Yes")} />
        <RadioCard label="No" checked={value === "No"} onChange={() => onChange("No")} />
      </div>
      <FieldError message={error} />
    </div>
  );
}

function AddressFields({
  prefix,
  register,
  errors,
}: {
  prefix: "personalAddress" | "businessAddress" | "arAddress";
  register: ReturnType<typeof useForm<FormData>>["register"];
  errors: ReturnType<typeof useForm<FormData>>["formState"]["errors"];
}) {
  const err = errors[prefix] as Record<string, { message?: string }> | undefined;
  return (
    <div className="grid sm:grid-cols-2 gap-3 mt-2">
      <div className="sm:col-span-2">
        <label className={labelCls}>Street Address</label>
        <input {...register(`${prefix}.street`)} className={inputCls} placeholder="123 Example Street" />
        <FieldError message={err?.street?.message} />
      </div>
      <div>
        <label className={labelCls}>Suburb</label>
        <input {...register(`${prefix}.suburb`)} className={inputCls} placeholder="Suburb" />
        <FieldError message={err?.suburb?.message} />
      </div>
      <div>
        <label className={labelCls}>State</label>
        <select {...register(`${prefix}.state`)} className={inputCls}>
          <option value="">Select state</option>
          {STATES.map((s) => <option key={s}>{s}</option>)}
        </select>
        <FieldError message={err?.state?.message} />
      </div>
      <div>
        <label className={labelCls}>Postcode</label>
        <input {...register(`${prefix}.postcode`)} className={inputCls} placeholder="2000" maxLength={4} />
        <FieldError message={err?.postcode?.message} />
      </div>
      <div>
        <label className={labelCls}>Country</label>
        <input {...register(`${prefix}.country`)} className={inputCls} defaultValue="Australia" />
      </div>
    </div>
  );
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────

function ProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-accent uppercase tracking-widest">
          Step {current} of {total}
        </span>
        <span className="text-xs text-muted-foreground">{STEPS[current - 1].label}</span>
      </div>
      <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-accent rounded-full"
          initial={false}
          animate={{ width: `${(current / total) * 100}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
      <div className="flex justify-between mt-3">
        {STEPS.map((step) => (
          <div
            key={step.id}
            className={`hidden sm:flex flex-col items-center ${step.id <= current ? "text-primary" : "text-muted-foreground/40"}`}
          >
            <div
              className={`w-2 h-2 rounded-full mb-1 ${
                step.id < current ? "bg-accent" : step.id === current ? "bg-primary" : "bg-border"
              }`}
            />
            <span className="text-[10px] font-medium">{step.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Nav Buttons ──────────────────────────────────────────────────────────────

function NavButtons({
  step,
  total,
  onBack,
  onNext,
  submitting,
}: {
  step: number;
  total: number;
  onBack: () => void;
  onNext: () => void;
  submitting: boolean;
}) {
  return (
    <div className="flex gap-3 mt-10 pt-6 border-t border-border">
      {step > 1 && (
        <button
          type="button"
          onClick={onBack}
          className="flex-1 sm:flex-none sm:w-36 px-6 py-3 border border-border rounded-xl text-sm font-semibold text-foreground hover:bg-secondary transition-colors"
        >
          ← Back
        </button>
      )}
      <button
        type="button"
        onClick={onNext}
        disabled={submitting}
        className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? "Submitting..." : step === total ? "Submit Application →" : "Continue →"}
      </button>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ApplicationForm() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: {
      personalAdvice: [],
      limitedAdvice: [],
      generalAdvice: [],
      otherAuthorisations: [],
      documents: [],
      agreedToTerms: false,
    },
  });

  const w = watch();
  const isCorporate = w.authorisedAs === "Corporate entity" || w.authorisedAs === "Both";
  const hasAnyYes = COMPLIANCE_QUESTIONS.some((_, i) => w[`compliance_${i}` as keyof FormData] === "Yes");

  // Fields to validate per step
  const stepFields: Record<number, (keyof FormData)[]> = {
    1: [],
    2: ["firstName", "lastName", "email", "phone", "personalAddress"],
    3: ["businessName", "businessAddress"],
    4: ["authorisedAs", "arAddress", "hasPreviousArNumber", "isArOfOtherLicensee"],
    5: [],
    6: COMPLIANCE_QUESTIONS.map((_, i) => `compliance_${i}` as keyof FormData),
    7: ["declarationName", "agreedToTerms"],
  };

  const goNext = async () => {
    const fields = stepFields[step];
    const valid = fields.length ? await trigger(fields) : true;
    if (!valid) return;
    if (step === STEPS.length) {
      handleSubmit(onSubmit)();
      return;
    }
    setDirection(1);
    setStep((s) => s + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goBack = () => {
    setDirection(-1);
    setStep((s) => s - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    setServerError("");
    try {
      const res = await fetch("/api/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setServerError("Something went wrong. Please try again or email connect@iconicinvestors.com.au");
      setSubmitting(false);
    }
  };

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 40 : -40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -40 : 40, opacity: 0 }),
  };

  // ── Success ────────────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center px-6 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-2xl p-14 max-w-md text-center"
        >
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
              <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2 className="text-3xl font-serif text-primary mb-3">Application Received</h2>
          <p className="text-muted-foreground">
            Thank you for your application. The Iconic Investors compliance team will be in touch shortly.
          </p>
          <p className="text-xs text-muted-foreground/60 mt-6">AFSL 450822 | ACN 167 051 470</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary py-12 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent mb-3">Iconic Investors</p>
          <h1 className="text-3xl sm:text-4xl font-serif text-primary mb-3">
            Authorised Representative Application
          </h1>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Complete all sections accurately. Your application will be reviewed by our compliance team.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl px-8 py-10 sm:px-12">
          <ProgressBar current={step} total={STEPS.length} />

          <form onSubmit={(e) => e.preventDefault()}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25, ease: "easeOut" }}
              >

                {/* ── Step 1: Authorisation Types ─────────────────────────── */}
                {step === 1 && (
                  <div>
                    <SectionHeader
                      title="Authorisation Types"
                      subtitle="Select all products that apply to each advice category you wish to be authorised for."
                    />
                    <div className="space-y-8">
                      {[
                        { label: "Personal Financial Product Advice", key: "personalAdvice" as const, opts: PERSONAL_ADVICE },
                        { label: "Limited Financial Product Advice", key: "limitedAdvice" as const, opts: LIMITED_ADVICE },
                        { label: "General Financial Product Advice", key: "generalAdvice" as const, opts: GENERAL_ADVICE },
                        { label: "Other Authorisations / Areas of Interest", key: "otherAuthorisations" as const, opts: OTHER_AUTH },
                      ].map(({ label, key, opts }) => (
                        <div key={key}>
                          <label className="block text-sm font-bold text-foreground mb-3">{label}</label>
                          <CheckboxGroup
                            options={opts}
                            selected={w[key] || []}
                            onChange={(v) => setValue(key, v)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── Step 2: Personal Details ─────────────────────────────── */}
                {step === 2 && (
                  <div>
                    <SectionHeader title="Personal Details" />
                    <div className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-3">
                        <div>
                          <label className={labelCls}>First Name <span className="text-red-400">*</span></label>
                          <input {...register("firstName")} className={inputCls} placeholder="First name" />
                          <FieldError message={errors.firstName?.message} />
                        </div>
                        <div>
                          <label className={labelCls}>Last Name <span className="text-red-400">*</span></label>
                          <input {...register("lastName")} className={inputCls} placeholder="Last name" />
                          <FieldError message={errors.lastName?.message} />
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-3">
                        <div>
                          <label className={labelCls}>Email Address <span className="text-red-400">*</span></label>
                          <input {...register("email")} type="email" className={inputCls} placeholder="you@example.com" />
                          <FieldError message={errors.email?.message} />
                        </div>
                        <div>
                          <label className={labelCls}>Phone Number <span className="text-red-400">*</span></label>
                          <input {...register("phone")} type="tel" className={inputCls} placeholder="04xx xxx xxx" />
                          <FieldError message={errors.phone?.message} />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-foreground mb-1">Personal Address <span className="text-red-400">*</span></label>
                        <AddressFields prefix="personalAddress" register={register} errors={errors} />
                      </div>
                    </div>
                  </div>
                )}

                {/* ── Step 3: Business Details ─────────────────────────────── */}
                {step === 3 && (
                  <div>
                    <SectionHeader
                      title="Employer / Business Details"
                      subtitle="Details of the business or employer you are associated with."
                    />
                    <div className="space-y-4">
                      <div>
                        <label className={labelCls}>Business Name <span className="text-red-400">*</span></label>
                        <input {...register("businessName")} className={inputCls} placeholder="Business name" />
                        <FieldError message={errors.businessName?.message} />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-foreground mb-1">Business Address <span className="text-red-400">*</span></label>
                        <AddressFields prefix="businessAddress" register={register} errors={errors} />
                      </div>
                    </div>
                  </div>
                )}

                {/* ── Step 4: AR Details ───────────────────────────────────── */}
                {step === 4 && (
                  <div>
                    <SectionHeader
                      title="Authorised Representative Details"
                      subtitle="Provide your representative structure and any existing registrations."
                    />
                    <div className="space-y-6">

                      {/* Authorised as */}
                      <div>
                        <label className={labelCls}>Do you wish to be authorised as: <span className="text-red-400">*</span></label>
                        <div className="flex gap-2 mt-1">
                          {["Individual", "Corporate entity", "Both"].map((opt) => (
                            <RadioCard
                              key={opt}
                              label={opt}
                              checked={w.authorisedAs === opt}
                              onChange={() => setValue("authorisedAs", opt, { shouldValidate: true })}
                            />
                          ))}
                        </div>
                        <FieldError message={errors.authorisedAs?.message} />
                      </div>

                      {/* Corporate-only fields */}
                      <AnimatePresence>
                        {isCorporate && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="bg-secondary/60 rounded-2xl p-5 space-y-4 border border-border">
                              <p className="text-xs font-bold uppercase tracking-widest text-accent">Corporate Details</p>
                              <div>
                                <label className={labelCls}>Registered Business Name</label>
                                <input {...register("registeredBusinessName")} className={inputCls} placeholder="Registered business name" />
                              </div>
                              <div>
                                <label className={labelCls}>ABN / ACN</label>
                                <input {...register("abnAcn")} className={inputCls} placeholder="12 345 678 901" />
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* CAR/AR Address */}
                      <div>
                        <label className="block text-sm font-bold text-foreground mb-1">CAR / AR Address <span className="text-red-400">*</span></label>
                        <AddressFields prefix="arAddress" register={register} errors={errors} />
                      </div>

                      {/* Previous AR Number */}
                      <div>
                        <label className={labelCls}>Has ASIC previously issued you with an Authorised Representative Number? <span className="text-red-400">*</span></label>
                        <div className="flex gap-2 mt-1">
                          <RadioCard label="Yes" checked={w.hasPreviousArNumber === "Yes"} onChange={() => setValue("hasPreviousArNumber", "Yes", { shouldValidate: true })} />
                          <RadioCard label="No" checked={w.hasPreviousArNumber === "No"} onChange={() => setValue("hasPreviousArNumber", "No", { shouldValidate: true })} />
                        </div>
                        <FieldError message={errors.hasPreviousArNumber?.message} />
                        <AnimatePresence>
                          {w.hasPreviousArNumber === "Yes" && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden mt-3"
                            >
                              <label className={labelCls}>AR Number</label>
                              <input {...register("arNumber")} className={inputCls} placeholder="Your AR Number" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Other AFS Licensee */}
                      <div>
                        <label className={labelCls}>Are you an Authorised Representative of another AFS Licensee? <span className="text-red-400">*</span></label>
                        <div className="flex gap-2 mt-1">
                          <RadioCard label="Yes" checked={w.isArOfOtherLicensee === "Yes"} onChange={() => setValue("isArOfOtherLicensee", "Yes", { shouldValidate: true })} />
                          <RadioCard label="No" checked={w.isArOfOtherLicensee === "No"} onChange={() => setValue("isArOfOtherLicensee", "No", { shouldValidate: true })} />
                        </div>
                        <FieldError message={errors.isArOfOtherLicensee?.message} />
                        <AnimatePresence>
                          {w.isArOfOtherLicensee === "Yes" && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden mt-3"
                            >
                              <label className={labelCls}>Licensee Name</label>
                              <input {...register("otherLicenseeName")} className={inputCls} placeholder="AFS Licensee name" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                    </div>
                  </div>
                )}

                {/* ── Step 5: Documents ────────────────────────────────────── */}
                {step === 5 && (
                  <div>
                    <SectionHeader
                      title="Documents to be Provided"
                      subtitle="Tick all documents you will be submitting with this application."
                    />
                    <CheckboxGroup
                      options={DOCUMENTS}
                      selected={w.documents || []}
                      onChange={(v) => setValue("documents", v)}
                    />
                    {(w.documents || []).length > 0 && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-4 text-xs text-accent font-semibold"
                      >
                        {w.documents.length} document{w.documents.length !== 1 ? "s" : ""} selected
                      </motion.p>
                    )}
                  </div>
                )}

                {/* ── Step 6: Compliance ───────────────────────────────────── */}
                {step === 6 && (
                  <div>
                    <SectionHeader
                      title="Compliance Declarations"
                      subtitle="Please answer each question accurately. All questions require a Yes or No response."
                    />
                    <div className="space-y-6">
                      {COMPLIANCE_QUESTIONS.map((q, i) => {
                        const key = `compliance_${i}` as keyof FormData;
                        return (
                          <YesNoField
                            key={i}
                            label={q}
                            value={(w[key] as string) || ""}
                            onChange={(v) => setValue(key, v, { shouldValidate: true })}
                            error={errors[key]?.message as string | undefined}
                          />
                        );
                      })}

                      <AnimatePresence>
                        {hasAnyYes && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                              <p className="text-sm font-bold text-amber-800 mb-2">Additional details required</p>
                              <p className="text-xs text-amber-700 mb-3">
                                You answered YES to one or more questions. Please provide full details below.
                              </p>
                              <textarea
                                {...register("complianceDetails")}
                                rows={5}
                                className={`${inputCls} resize-y`}
                                placeholder="Please provide details for each YES answer, including dates, outcomes, and any relevant context..."
                              />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                )}

                {/* ── Step 7: Declaration ──────────────────────────────────── */}
                {step === 7 && (
                  <div>
                    <SectionHeader
                      title="Your Declaration"
                      subtitle="By submitting this form you confirm all information provided is true and correct."
                    />
                    <div className="space-y-6">
                      <div className="bg-secondary/60 rounded-2xl p-5 border border-border text-sm text-foreground leading-relaxed">
                        I hereby declare that the information provided in this application is true and correct to the best of my knowledge, and that I have not withheld any information that may be relevant to this application.
                      </div>
                      <div>
                        <label className={labelCls}>Full Legal Name <span className="text-red-400">*</span></label>
                        <input {...register("declarationName")} className={inputCls} placeholder="Your full legal name" />
                        <FieldError message={errors.declarationName?.message} />
                      </div>
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <div
                          onClick={() => setValue("agreedToTerms", !w.agreedToTerms, { shouldValidate: true })}
                          className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors cursor-pointer ${
                            w.agreedToTerms ? "bg-primary border-primary" : "border-border bg-white"
                          }`}
                        >
                          {w.agreedToTerms && (
                            <svg viewBox="0 0 10 8" fill="none" className="w-3 h-3">
                              <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </div>
                        <span className="text-sm text-foreground leading-relaxed">
                          I confirm that all information provided is accurate and I agree to the above declaration.
                        </span>
                      </label>
                      <FieldError message={errors.agreedToTerms?.message} />

                      {serverError && (
                        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
                          {serverError}
                        </div>
                      )}
                    </div>
                  </div>
                )}

              </motion.div>
            </AnimatePresence>

            <NavButtons
              step={step}
              total={STEPS.length}
              onBack={goBack}
              onNext={goNext}
              submitting={submitting}
            />
          </form>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8">
          AFSL 450822 | ACN 167 051 470 | connect@iconicinvestors.com.au
        </p>
      </div>
    </div>
  );
}
