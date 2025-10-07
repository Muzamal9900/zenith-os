"use client"

import { useEffect, useRef } from "react"
import { Globe, Users, LayoutDashboard } from "lucide-react"

export default function ThreeModules() {
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

  const modules = [
    {
      icon: Globe,
      title: "Enterprise-Grade Web Foundation",
      description: "Responsive, performance-optimized architecture. SEO-ready structure. Built for scale.",
      gradient: "gradient-ocean-cyan",
    },
    {
      icon: Users,
      title: "Relationship Management Core",
      description:
        "Entity and field libraries, pipelines, and workflows—the data backbone that powers Portal personalization.",
      gradient: "gradient-emerald-green",
    },
    {
      icon: LayoutDashboard,
      title: "The Blank Canvas (Portal)",
      description:
        "Install tools into your business OS—forms, schedulers, dashboards, even a Canva-like editor. Start empty, then compose your business platform.",
      gradient: "gradient-violet-fuchsia",
    },
  ]

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-gray-50">
      <div className="container mx-auto px-6 max-w-7xl">
        <h2 className="fade-in-element text-3xl md:text-4xl font-semibold text-gray-900 text-center mb-6 tracking-tight">
          The Three Core Modules
        </h2>

        <p className="fade-in-element text-lg text-gray-600 text-center max-w-3xl mx-auto mb-16 leading-relaxed">
          A complete business platform for modern business, ready to be customized for any industry worldwide.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {modules.map((module, index) => (
            <div key={module.title} className="fade-in-element group" style={{ animationDelay: `${index * 150}ms` }}>
              <div className="bg-white border border-gray-200 rounded-2xl p-10 h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                <div
                  className={`w-16 h-16 ${module.gradient} rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:rotate-6`}
                >
                  <module.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-4 leading-tight">{module.title}</h3>

                <p className="text-gray-600 leading-relaxed">{module.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
