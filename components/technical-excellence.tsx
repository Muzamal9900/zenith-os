"use client"

import { useEffect, useRef } from "react"
import { Shield, Zap, Layers, RefreshCcw } from "lucide-react"

export default function TechnicalExcellence() {
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

  const features = [
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Industry-standard encryption and compliance protocols",
    },
    {
      icon: Zap,
      title: "99.9% Uptime",
      description: "Reliable cloud infrastructure with automated backups",
    },
    {
      icon: Layers,
      title: "API-First Design",
      description: "Seamless integrations with your existing tech stack",
    },
    {
      icon: RefreshCcw,
      title: "Regular Updates",
      description: "Continuous improvements and feature enhancements",
    },
  ]

  return (
    <section ref={sectionRef} className="py-24 md:py-32 gradient-navy-blue">
      <div className="container mx-auto px-6 max-w-6xl">
        <h2 className="fade-in-element text-3xl md:text-4xl font-semibold text-white text-center mb-6 tracking-tight">
          Built on Proven Architecture
        </h2>

        <p className="fade-in-element text-lg text-white/80 text-center max-w-2xl mx-auto mb-16 leading-relaxed">
          Enterprise-grade infrastructure that scales with your ambitions
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="fade-in-element group text-center"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl mb-6 transition-all duration-300 group-hover:bg-white/20 group-hover:scale-110 group-hover:rotate-6">
                <feature.icon className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-lg font-semibold text-white mb-3">{feature.title}</h3>

              <p className="text-white/70 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
