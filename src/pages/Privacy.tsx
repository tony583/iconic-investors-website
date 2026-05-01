import { useEffect } from "react";

export default function Privacy() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = "Privacy Policy | Iconic Partners";
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="bg-[#1a3c2e] text-white py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-white/70 text-sm">Last updated: 1 May 2025</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-12 space-y-8 text-sm leading-relaxed text-foreground/80">

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">1. About Us</h2>
          <p>
            Iconic Partners Pty Ltd (ACN 167 051 470, AFSL 450822) trading as Iconic Investors
            ("we", "us", "our") is committed to protecting your privacy. This Privacy Policy
            explains how we collect, use, disclose and safeguard your personal information in
            accordance with the Privacy Act 1988 (Cth) and the Australian Privacy Principles (APPs).
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">2. Information We Collect</h2>
          <p className="mb-3">We may collect the following types of personal information:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Full name, date of birth and contact details (email, phone, address)</li>
            <li>Business name, ABN/ACN and professional licence details</li>
            <li>Financial services qualifications and employment history</li>
            <li>Identity verification documents (drivers licence, passport)</li>
            <li>Compliance and regulatory declarations</li>
            <li>Professional Indemnity Insurance details</li>
            <li>Information submitted through our Authorised Representative application form</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">3. How We Collect Information</h2>
          <p>
            We collect personal information directly from you when you submit an application,
            contact us by phone or email, use our website, or otherwise interact with us.
            We may also collect information from third parties such as ASIC, regulatory bodies,
            and professional reference checks where permitted by law.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">4. How We Use Your Information</h2>
          <p className="mb-3">We use your personal information to:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Process and assess Authorised Representative applications</li>
            <li>Comply with our obligations under AFSL 450822 and applicable law</li>
            <li>Conduct compliance monitoring and regulatory reporting</li>
            <li>Communicate with you about your application or ongoing relationship</li>
            <li>Improve our services and website</li>
            <li>Respond to enquiries and provide support</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">5. Disclosure of Information</h2>
          <p>
            We do not sell, trade or rent your personal information to third parties. We may
            disclose your information to regulatory bodies (ASIC, AUSTRAC), professional
            indemnity insurers, compliance service providers, and technology platforms used
            to operate our business — all bound by confidentiality obligations. We may also
            disclose information where required by law.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">6. Data Storage and Security</h2>
          <p>
            Your personal information is stored securely using industry-standard encryption
            and access controls. We use Supabase (hosted in the United States) for secure
            data storage. We take reasonable steps to protect your information from
            unauthorised access, loss, misuse or disclosure. However, no internet transmission
            is completely secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">7. Cookies and Website Analytics</h2>
          <p>
            Our website uses cookies and analytics tools (including Google Analytics and
            Meta Pixel) to understand how visitors interact with our site. This data is
            aggregated and does not personally identify you. You may disable cookies through
            your browser settings.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">8. Access and Correction</h2>
          <p>
            You have the right to access and correct your personal information. To request
            access or corrections, please contact us using the details below. We will respond
            within 30 days.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">9. Complaints</h2>
          <p>
            If you believe we have breached your privacy, please contact us in writing.
            We will investigate and respond within 30 days. If you are not satisfied,
            you may complain to the Office of the Australian Information Commissioner (OAIC)
            at <a href="https://www.oaic.gov.au" className="text-[#1a3c2e] underline">www.oaic.gov.au</a>.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">10. Contact Us</h2>
          <p>
            For privacy-related enquiries, contact us at:
          </p>
          <div className="mt-3 space-y-1">
            <p><strong>Iconic Partners Pty Ltd</strong></p>
            <p>AFSL 450822 | ACN 167 051 470</p>
            <p>PO BOX 181, Forestville NSW 2087</p>
            <p>Email: <a href="mailto:connect@iconicinvestors.com.au" className="text-[#1a3c2e] underline">connect@iconicinvestors.com.au</a></p>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">11. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. The current version will
            always be available at this URL. Your continued use of our website or services
            constitutes acceptance of any changes.
          </p>
        </section>

      </div>

      {/* Footer */}
      <div className="border-t border-border py-8 px-6 text-center text-xs text-muted-foreground">
        <p>AFSL 450822 | ACN 167 051 470 | connect@iconicinvestors.com.au</p>
        <p className="mt-1">© {new Date().getFullYear()} Iconic Partners Pty Ltd. All rights reserved.</p>
      </div>
    </div>
  );
}
