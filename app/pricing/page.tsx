export default function PricingPage() {
  return (
    <main className="py-16 md:py-24">
      <section className="container mx-auto max-w-5xl px-6">
        <h1 className="text-4xl md:text-[48px] font-semibold tracking-tight text-balance mb-4">Pricing</h1>
        <p className="text-gray-600 leading-relaxed mb-10">
          Two clear paths: license the framework and build yourself, or engage us for white-label execution.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-2">DIY Foundation</h2>
            <p className="text-gray-600 mb-4">License the OS and build your custom tools in-house.</p>
            <ul className="text-gray-700 space-y-2 list-disc pl-5">
              <li>Full framework access</li>
              <li>Documentation & support</li>
              <li>API-first architecture</li>
            </ul>
          </div>
          <div className="border border-purple-200 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-2">White-Label Development</h2>
            <p className="text-gray-600 mb-4">We tailor Zenith to your industry—launch in weeks.</p>
            <ul className="text-gray-700 space-y-2 list-disc pl-5">
              <li>Industry-specific customization</li>
              <li>Rapid deployment</li>
              <li>Ongoing updates</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  )
}
