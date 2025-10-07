export default function DocsPage() {
  return (
    <main className="py-16 md:py-24">
      <section className="container mx-auto max-w-5xl px-6">
        <h1 className="text-4xl md:text-[48px] font-semibold tracking-tight text-balance mb-4">Documentation</h1>
        <p className="text-gray-600 leading-relaxed mb-10">
          Explore the core concepts, architecture, and extension points for the Zenith business platform.
        </p>
        <div id="technical-overview" className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-3">Technical Overview</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li>Locked core with Website, CRM, and Portal primitives</li>
            <li>API-first extensibility for tools and integrations</li>
            <li>Security, uptime, and update cadence aligned to enterprise standards</li>
          </ul>
        </div>
      </section>
    </main>
  )
}
