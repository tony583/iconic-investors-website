import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const STATES = ["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT"];

const PERSONAL_ADVICE_OPTIONS = [
  "Comprehensive (all financial products covered by the licence)",
  "Managed investments",
  "Life risk insurance",
  "Superannuation (including SMSFs)",
  "Securities",
];
const LIMITED_ADVICE_OPTIONS = [
  "Managed investments",
  "Life risk insurance",
  "Superannuation (including SMSFs)",
  "Securities",
];
const GENERAL_ADVICE_OPTIONS = [
  "Managed investments",
  "Life risk insurance",
  "Superannuation (including SMSFs)",
  "Securities",
];
const OTHER_AUTH_OPTIONS = [
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
  "Have you been refused, restricted, banned or disqualified to carry on any trade, business or profession for which a specific licence or registration is required by law (includes as an AFS Licensee and as a Representative)?",
  "Have you been refused membership, suspended from membership, removed from membership or disciplined by any professional body, industry association or business organisation?",
  "Are there any outstanding debts with any insurance company, fund manager or Australian Financial Services Licensee, relating to you personally or an entity as a result of your involvement with it?",
  "Have you ever been the subject of adverse findings, disciplinary proceedings or an investigation by a government regulatory body e.g. ASIC, ATO, APRA?",
  "Have you ever been declared bankrupt or entered into a Part IX or Part X Debt Agreement under the Bankruptcy Act 1966?",
  "Have you been engaged in the management of any entity that was declared insolvent or have had an external administrator appointed?",
  "Have you ever been the subject of a Professional Indemnity Claim?",
  "Have you been the subject of any complaint made to an external Complaints Resolution body or scheme?",
  "Have you ever been engaged in the management of any entity that has had its licence or registration revoked under the Superannuation (Supervision) Act 1993 or Corporations Act 2001?",
];

const addressSchema = z.object({
  street: z.string().min(1, "Required"),
  suburb: z.string().min(1, "Required"),
  state: z.string().min(1, "Required"),
  postcode: z.string().min(4, "Required"),
  country: z.string().default("Australia"),
});

const schema = z.object({
  personalAdvice: z.array(z.string()),
  limitedAdvice: z.array(z.string()),
  generalAdvice: z.array(z.string()),
  otherAuthorisations: z.array(z.string()),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  personalAddress: addressSchema,
  businessName: z.string().min(1, "Business name is required"),
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
  compliance_0: z.string().min(1, "Required"),
  compliance_1: z.string().min(1, "Required"),
  compliance_2: z.string().min(1, "Required"),
  compliance_3: z.string().min(1, "Required"),
  compliance_4: z.string().min(1, "Required"),
  compliance_5: z.string().min(1, "Required"),
  compliance_6: z.string().min(1, "Required"),
  compliance_7: z.string().min(1, "Required"),
  compliance_8: z.string().min(1, "Required"),
  compliance_9: z.string().min(1, "Required"),
  complianceDetails: z.string().optional(),
  declarationName: z.string().min(1, "Full name is required"),
  agreedToTerms: z.boolean().refine((v) => v === true, "You must agree to the declaration"),
});

type FormData = z.infer<typeof schema>;

const inputClass =
  "w-full px-4 py-2.5 border border-border rounded-lg bg-white text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/40";
const labelClass = "block text-sm font-semibold text-foreground mb-1.5";
const errorClass = "text-red-500 text-xs mt-1";
const sectionClass = "mb-10";
const sectionTitleClass = "text-lg font-bold text-primary font-serif mb-1 pb-2 border-b border-border";
const sectionSubtitleClass = "text-xs text-muted-foreground mb-5";

function CheckboxGroup({
  options,
  selected,
  onChange,
}: {
  options: string[];
  selected: string[];
  onChange: (v: string[]) => void;
}) {
  const toggle = (opt: string) => {
    onChange(selected.includes(opt) ? selected.filter((s) => s !== opt) : [...selected, opt]);
  };
  return (
    <div className="space-y-2">
      {options.map((opt) => (
        <label key={opt} className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={selected.includes(opt)}
            onChange={() => toggle(opt)}
            className="mt-0.5 w-4 h-4 accent-primary cursor-pointer"
          />
          <span className="text-sm text-foreground group-hover:text-primary transition-colors">{opt}</span>
        </label>
      ))}
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
    <div className="grid sm:grid-cols-2 gap-4">
      <div className="sm:col-span-2">
        <label className={labelClass}>Street Address</label>
        <input {...register(`${prefix}.street`)} className={inputClass} placeholder="123 Example St" />
        {err?.street && <p className={errorClass}>{err.street.message}</p>}
      </div>
      <div>
        <label className={labelClass}>Suburb</label>
        <input {...register(`${prefix}.suburb`)} className={inputClass} placeholder="Suburb" />
        {err?.suburb && <p className={errorClass}>{err.suburb.message}</p>}
      </div>
      <div>
        <label className={labelClass}>State</label>
        <select {...register(`${prefix}.state`)} className={inputClass}>
          <option value="">Select state</option>
          {STATES.map((s) => <option key={s}>{s}</option>)}
        </select>
        {err?.state && <p className={errorClass}>{err.state.message}</p>}
      </div>
      <div>
        <label className={labelClass}>Postcode</label>
        <input {...register(`${prefix}.postcode`)} className={inputClass} placeholder="2000" />
        {err?.postcode && <p className={errorClass}>{err.postcode.message}</p>}
      </div>
      <div>
        <label className={labelClass}>Country</label>
        <input {...register(`${prefix}.country`)} className={inputClass} defaultValue="Australia" />
      </div>
    </div>
  );
}

export default function ApplicationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      personalAdvice: [],
      limitedAdvice: [],
      generalAdvice: [],
      otherAuthorisations: [],
      documents: [],
      agreedToTerms: false,
    },
  });

  const watchedValues = watch();

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    setServerError("");
    try {
      const res = await fetch("/api/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch {
      setServerError("Something went wrong. Please try again or email us directly at connect@iconicinvestors.com.au");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center px-6">
        <div className="bg-white rounded-2xl shadow-xl p-12 max-w-lg text-center">
          <div className="text-5xl mb-6">✓</div>
          <h2 className="text-2xl font-bold font-serif text-primary mb-3">Application Received</h2>
          <p className="text-muted-foreground text-base">
            Thank you for submitting your application. The Iconic Investors team will be in touch with you shortly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary py-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-accent mb-3">Iconic Investors</p>
          <h1 className="text-3xl sm:text-4xl font-serif text-primary mb-4">
            Application for New Authorised Representative
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Please complete all sections accurately. Your application will be reviewed by the Iconic Investors compliance team.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 space-y-10">

          {/* 1. Authorisation Types */}
          <div className={sectionClass}>
            <h2 className={sectionTitleClass}>Authorisation Types</h2>
            <p className={sectionSubtitleClass}>Select all products that apply to each advice category.</p>
            <div className="space-y-8">
              <div>
                <label className={labelClass}>Personal Financial Product Advice</label>
                <CheckboxGroup
                  options={PERSONAL_ADVICE_OPTIONS}
                  selected={watchedValues.personalAdvice || []}
                  onChange={(v) => setValue("personalAdvice", v)}
                />
              </div>
              <div>
                <label className={labelClass}>Limited Financial Product Advice</label>
                <CheckboxGroup
                  options={LIMITED_ADVICE_OPTIONS}
                  selected={watchedValues.limitedAdvice || []}
                  onChange={(v) => setValue("limitedAdvice", v)}
                />
              </div>
              <div>
                <label className={labelClass}>General Financial Product Advice</label>
                <CheckboxGroup
                  options={GENERAL_ADVICE_OPTIONS}
                  selected={watchedValues.generalAdvice || []}
                  onChange={(v) => setValue("generalAdvice", v)}
                />
              </div>
              <div>
                <label className={labelClass}>Other Authorisations / Areas of Interest</label>
                <CheckboxGroup
                  options={OTHER_AUTH_OPTIONS}
                  selected={watchedValues.otherAuthorisations || []}
                  onChange={(v) => setValue("otherAuthorisations", v)}
                />
              </div>
            </div>
          </div>

          {/* 2. Personal Details */}
          <div className={sectionClass}>
            <h2 className={sectionTitleClass}>Personal Details</h2>
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>First Name <span className="text-red-500">*</span></label>
                  <input {...register("firstName")} className={inputClass} placeholder="First name" />
                  {errors.firstName && <p className={errorClass}>{errors.firstName.message}</p>}
                </div>
                <div>
                  <label className={labelClass}>Last Name <span className="text-red-500">*</span></label>
                  <input {...register("lastName")} className={inputClass} placeholder="Last name" />
                  {errors.lastName && <p className={errorClass}>{errors.lastName.message}</p>}
                </div>
              </div>
              <div>
                <label className={labelClass}>Personal Address <span className="text-red-500">*</span></label>
                <AddressFields prefix="personalAddress" register={register} errors={errors} />
              </div>
            </div>
          </div>

          {/* 3. Employer / Business Details */}
          <div className={sectionClass}>
            <h2 className={sectionTitleClass}>Employer / Business Details</h2>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Business Name <span className="text-red-500">*</span></label>
                <input {...register("businessName")} className={inputClass} placeholder="Business name" />
                {errors.businessName && <p className={errorClass}>{errors.businessName.message}</p>}
              </div>
              <div>
                <label className={labelClass}>Business Address <span className="text-red-500">*</span></label>
                <AddressFields prefix="businessAddress" register={register} errors={errors} />
              </div>
            </div>
          </div>

          {/* 4. Authorised Representative Details */}
          <div className={sectionClass}>
            <h2 className={sectionTitleClass}>Authorised Representative Details</h2>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Do you wish to be authorised as: <span className="text-red-500">*</span></label>
                <select {...register("authorisedAs")} className={inputClass}>
                  <option value="">Select...</option>
                  <option>Individual</option>
                  <option>Corporate entity</option>
                  <option>Both</option>
                </select>
                {errors.authorisedAs && <p className={errorClass}>{errors.authorisedAs.message}</p>}
              </div>
              <div>
                <label className={labelClass}>Registered Business Name (if corporate)</label>
                <input {...register("registeredBusinessName")} className={inputClass} placeholder="Registered business name" />
              </div>
              <div>
                <label className={labelClass}>ABN / ACN (if corporate)</label>
                <input {...register("abnAcn")} className={inputClass} placeholder="ABN or ACN" />
              </div>
              <div>
                <label className={labelClass}>CAR / AR Address <span className="text-red-500">*</span></label>
                <AddressFields prefix="arAddress" register={register} errors={errors} />
              </div>
              <div>
                <label className={labelClass}>
                  Has ASIC previously issued you with an Authorised Representative Number? <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-6 mt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" {...register("hasPreviousArNumber")} value="Yes" className="accent-primary" />
                    <span className="text-sm">Yes</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" {...register("hasPreviousArNumber")} value="No" className="accent-primary" />
                    <span className="text-sm">No</span>
                  </label>
                </div>
                {errors.hasPreviousArNumber && <p className={errorClass}>{errors.hasPreviousArNumber.message}</p>}
              </div>
              {watchedValues.hasPreviousArNumber === "Yes" && (
                <div>
                  <label className={labelClass}>If YES, please provide the AR Number</label>
                  <input {...register("arNumber")} className={inputClass} placeholder="AR Number" />
                </div>
              )}
              <div>
                <label className={labelClass}>
                  Are you an Authorised Representative of another AFS Licensee? <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-6 mt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" {...register("isArOfOtherLicensee")} value="Yes" className="accent-primary" />
                    <span className="text-sm">Yes</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" {...register("isArOfOtherLicensee")} value="No" className="accent-primary" />
                    <span className="text-sm">No</span>
                  </label>
                </div>
                {errors.isArOfOtherLicensee && <p className={errorClass}>{errors.isArOfOtherLicensee.message}</p>}
              </div>
              {watchedValues.isArOfOtherLicensee === "Yes" && (
                <div>
                  <label className={labelClass}>If YES, please provide the Licensee name</label>
                  <input {...register("otherLicenseeName")} className={inputClass} placeholder="Licensee name" />
                </div>
              )}
            </div>
          </div>

          {/* 5. Documents */}
          <div className={sectionClass}>
            <h2 className={sectionTitleClass}>Documents to be Provided</h2>
            <p className={sectionSubtitleClass}>Please tick the documents you will be providing with this application.</p>
            <CheckboxGroup
              options={DOCUMENTS}
              selected={watchedValues.documents || []}
              onChange={(v) => setValue("documents", v)}
            />
          </div>

          {/* 6. Compliance Questions */}
          <div className={sectionClass}>
            <h2 className={sectionTitleClass}>Compliance Declarations</h2>
            <p className={sectionSubtitleClass}>Please answer each question accurately. Answer YES or NO.</p>
            <div className="space-y-6">
              {COMPLIANCE_QUESTIONS.map((question, i) => {
                const key = `compliance_${i}` as keyof FormData;
                return (
                  <div key={i} className="pb-5 border-b border-border last:border-0">
                    <p className="text-sm text-foreground mb-2">{question}</p>
                    <div className="flex gap-6">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" {...register(key)} value="Yes" className="accent-primary" />
                        <span className="text-sm">Yes</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" {...register(key)} value="No" className="accent-primary" />
                        <span className="text-sm">No</span>
                      </label>
                    </div>
                    {errors[key] && <p className={errorClass}>Required</p>}
                  </div>
                );
              })}
              <div>
                <label className={labelClass}>If YES to any of the above, please provide details:</label>
                <textarea
                  {...register("complianceDetails")}
                  rows={4}
                  className={`${inputClass} resize-y`}
                  placeholder="Provide details here..."
                />
              </div>
            </div>
          </div>

          {/* 7. Declaration */}
          <div className={sectionClass}>
            <h2 className={sectionTitleClass}>Your Declaration</h2>
            <p className="text-sm text-muted-foreground mb-5">
              I hereby declare the above to be true and correct.
            </p>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Full Name <span className="text-red-500">*</span></label>
                <input {...register("declarationName")} className={inputClass} placeholder="Your full legal name" />
                {errors.declarationName && <p className={errorClass}>{errors.declarationName.message}</p>}
              </div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  {...register("agreedToTerms")}
                  className="mt-0.5 w-4 h-4 accent-primary cursor-pointer"
                />
                <span className="text-sm text-foreground">
                  I declare that the information provided in this application is true and correct to the best of my knowledge.
                </span>
              </label>
              {errors.agreedToTerms && <p className={errorClass}>{errors.agreedToTerms.message}</p>}
            </div>
          </div>

          {serverError && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
              {serverError}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-lg text-base hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "Submitting..." : "Submit Application →"}
          </button>
        </form>

        <p className="text-center text-xs text-muted-foreground mt-8">
          AFSL 450822 | ACN 167 051 470 | connect@iconicinvestors.com.au
        </p>
      </div>
    </div>
  );
}
