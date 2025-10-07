export default function PrivacyPolicyPage() {
  return (
    <main className="py-16 md:py-24">
      <section className="container mx-auto max-w-4xl px-6">
        <h1 className="text-4xl md:text-[48px] font-semibold tracking-tight text-balance mb-4">Privacy Policy</h1>
        <p className="text-gray-600 leading-relaxed mb-6">Effective date: October 3, 2025</p>

        <div className="space-y-6 text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>
            <p>
              We may collect personal information you provide (e.g., name, email, company, message content) and
              technical information such as device, browser, IP address, and usage data.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">2. How We Use Information</h2>
            <p>
              To respond to inquiries, provide and improve our services, personalize experiences, analyze usage, ensure
              security, and comply with legal obligations.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">3. Sharing and Disclosure</h2>
            <p>
              We do not sell your data. We may share with service providers under contract, for legal compliance, or in
              the event of a business transaction, subject to appropriate safeguards.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">4. Data Retention</h2>
            <p>
              We retain information only as long as necessary for the purposes described above or as required by law.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">5. Security</h2>
            <p>
              We implement administrative, technical, and physical measures designed to protect information. No method
              of transmission or storage is completely secure.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">6. Your Rights</h2>
            <p>
              Depending on your location, you may have rights to access, correct, delete, or restrict processing of your
              personal information. Contact us to exercise these rights.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">7. International Transfers</h2>
            <p>
              Your information may be processed in jurisdictions with different data protection laws. We use safeguards
              where required to protect your data.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">8. Updates to This Policy</h2>
            <p>
              We may update this policy from time to time. We will revise the effective date above when changes are
              made.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">9. Contact</h2>
            <p>
              Questions? Contact us at{" "}
              <a className="underline" href="/contact">
                /contact
              </a>
              .
            </p>
          </section>
        </div>
      </section>
    </main>
  )
}
