"use client"

import { useEffect, useRef } from "react"
import { Clock, DollarSign, RefreshCw } from "lucide-react"

export default function ProblemSection() {
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
    <section ref={sectionRef} className="py-24 md:py-32 gradient-charcoal-slate">
      <div className="container mx-auto px-6 max-w-6xl">
        <h2 className="fade-in-element text-3xl md:text-4xl font-semibold text-white text-center mb-6 tracking-tight">
          Building from Scratch Shouldn't Mean Starting from Zero
        </h2>

        <p className="fade-in-element text-lg text-white/80 text-center max-w-3xl mx-auto mb-16 leading-relaxed">
          Most businesses waste 12-18 months and $200K+ building custom websites, CRMs, and client portals from scratch.
          Each industry reinvents the wheel. Development agencies charge premium rates for foundational features that
          should be commoditized.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="fade-in-element bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:bg-white/10 transition-all duration-300">
            <div className="w-12 h-12 gradient-purple-magenta rounded-lg flex items-center justify-center mb-6">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-3">12-18 Months</h3>
            <p className="text-white/70 leading-relaxed">
              Average time to build enterprise software from scratch, delaying market entry and revenue generation.
            </p>
          </div>

          <div
            className="fade-in-element bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:bg-white/10 transition-all duration-300"
            style={{ animationDelay: "150ms" }}
          >
            <div className="w-12 h-12 gradient-purple-magenta rounded-lg flex items-center justify-center mb-6">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-3">$200K+ Wasted</h3>
            <p className="text-white/70 leading-relaxed">
              Development costs for foundational features that exist in every business application.
            </p>
          </div>

          <div
            className="fade-in-element bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:bg-white/10 transition-all duration-300"
            style={{ animationDelay: "300ms" }}
          >
            <div className="w-12 h-12 gradient-purple-magenta rounded-lg flex items-center justify-center mb-6">
              <RefreshCw className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-3">Reinventing Daily</h3>
            <p className="text-white/70 leading-relaxed">
              Every industry rebuilds the same core systems instead of starting with proven infrastructure.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
