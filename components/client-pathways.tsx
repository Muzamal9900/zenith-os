"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Code, Palette, ArrowRight } from "lucide-react"

export default function ClientPathways() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in")
          }
        })
      },
      { threshold: 0.2 },
    )

    const elements = sectionRef.current?.querySelectorAll(".fade-in-element")
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <h2 className="fade-in-element text-3xl md:text-4xl font-semibold text-gray-900 text-center mb-16 tracking-tight">
          Your Business. Your Choice.
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* DIY Pathway */}
          <div className="fade-in-element group">
            <div className="relative h-full bg-white border-2 border-gray-200 rounded-2xl p-10 transition-all duration-300 hover:border-blue-500 hover:shadow-2xl overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 gradient-slate-blue" />

              <div className="w-16 h-16 gradient-slate-blue rounded-xl flex items-center justify-center mb-6">
                <Code className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Buy the Framework. Build Your Vision.</h3>

              <p className="text-gray-600 mb-8 leading-relaxed">
                Purchase the core business platform and develop custom features with your team. Full documentation, API
                access, and technical support included.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  "Complete source code access",
                  "Comprehensive documentation",
                  "API-first architecture",
                  "Technical support included",
                ].map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-gray-700">
                    <span className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-blue-600" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-6 rounded-lg transition-all duration-300 group-hover:scale-105">
                Explore Self-Service
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>

          {/* White-Label Pathway */}
          <div className="fade-in-element group" style={{ animationDelay: "150ms" }}>
            <div className="relative h-full bg-white border-2 border-purple-200 rounded-2xl p-10 transition-all duration-300 hover:border-purple-500 hover:shadow-2xl overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 gradient-indigo-purple" />

              <div className="w-16 h-16 gradient-indigo-purple rounded-xl flex items-center justify-center mb-6">
                <Palette className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3">We Build. You Brand.</h3>

              <p className="text-gray-600 mb-8 leading-relaxed">
                Our team customizes the business platform specifically for your industry—medical, logistics, finance,
                real estate, or any sector. Launch in weeks, not months.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  "Industry-specific customization",
                  "Rapid deployment (weeks)",
                  "Your branding throughout",
                  "Ongoing support & updates",
                ].map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-gray-700">
                    <span className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-purple-600" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Button className="w-full gradient-indigo-purple text-white font-semibold py-6 rounded-lg transition-all duration-300 group-hover:scale-105 border-0">
                Request Custom Build
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
