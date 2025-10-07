export default function AboutPage() {
  return (
    <main className="py-16 md:py-24">
      <section className="container mx-auto max-w-4xl px-6">
        <h1 className="text-4xl md:text-[48px] font-semibold tracking-tight text-balance mb-4">About Unite Group</h1>
        <p className="text-gray-600 leading-relaxed">
          Discover our journey, mission, and the values that drive us to deliver exceptional technology solutions and
          foster innovation.
        </p>

        <div className="mt-10 space-y-10">
          <section>
            <h2 className="text-2xl font-semibold tracking-tight mb-3">Our Journey So Far</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Founded in 2020 with a vision to bridge the gap between complex technology and business growth, Unite
              Group has steadily grown into a trusted partner for organizations seeking transformative digital
              solutions. Our journey began with a small, passionate team and a commitment to client success.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Key milestones, like launching our first enterprise-level SaaS platform and expanding our AI consulting
              services in 2022, have defined our trajectory. We believe in the power of collaboration, continuous
              learning, and adapting to the ever-evolving tech landscape.
            </p>
            <div className="mt-6">
              <img src="/unite-group-journey-montage.jpg" alt="Our journey montage" className="w-full rounded-lg border" />
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight mb-3">Our Guiding Principles</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-1">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  To empower businesses with innovative and tailored technology solutions, driving growth, efficiency,
                  and a competitive edge in their respective industries.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed">
                  To be a globally recognized leader in technology consulting and solution delivery, known for our
                  commitment to excellence, integrity, and transformative impact.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Our Core Values</h3>
                <ul className="list-disc pl-6 text-gray-600 leading-relaxed">
                  <li>Client-Centricity</li>
                  <li>Innovation &amp; Excellence</li>
                  <li>Integrity &amp; Transparency</li>
                  <li>Collaboration &amp; Teamwork</li>
                  <li>Continuous Learning</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight mb-3">Company Culture</h2>
            <h3 className="text-lg font-semibold mb-1">Our Culture: People First</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              At Unite Group, we cultivate an environment where creativity, curiosity, and collaboration thrive. We
              invest in our team&apos;s growth through continuous training, mentorship programs, and opportunities to
              work on cutting-edge projects.
            </p>
            <ul className="list-disc pl-6 text-gray-600 leading-relaxed space-y-2">
              <li>
                <span className="font-medium">Collaborative Spirit:</span> We believe the best ideas come from teamwork
                and open communication.
              </li>
              <li>
                <span className="font-medium">Innovation Driven:</span> We encourage experimentation and provide the
                freedom to explore new technologies.
              </li>
              <li>
                <span className="font-medium">Work-Life Balance:</span> We support our team&apos;s well-being with
                flexible work arrangements and a focus on sustainable performance.
              </li>
            </ul>
          </section>

          <section className="border-t pt-8">
            <h2 className="text-2xl font-semibold tracking-tight mb-3">Ready to Partner with Us?</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Let&apos;s discuss how Unite Group can help your business achieve its technology goals.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gradient-purple-magenta text-white rounded-md px-5 py-3 font-semibold"
            >
              Get in Touch
            </a>
          </section>
        </div>
      </section>
    </main>
  )
}
