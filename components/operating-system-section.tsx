"use client"

import { useEffect, useRef, useState } from "react"
import { Layers, Lock, Unlock } from "lucide-react"

export default function OperatingSystemSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

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
    <section ref={sectionRef} className="py-24 md:py-32 gradient-blue-teal">
      <div className="container mx-auto px-6 max-w-6xl">
        <h2 className="fade-in-element text-3xl md:text-4xl font-semibold text-white text-center mb-6 tracking-tight text-balance">
          Your Business business platform
        </h2>

        <p className="fade-in-element text-lg text-white/90 text-center max-w-3xl mx-auto mb-16 leading-relaxed">
          Zenith provides a secure core—Website, CRM, and Portal—where you add the business tools you need as modules.
          Your IP stays protected while your stack evolves as you compose features inside the Portal.
        </p>

        <div
          className="fade-in-element max-w-4xl mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-12 transition-all duration-500 hover:bg-white/15 hover:scale-105">
            {/* Core system */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-2xl mb-6">
                {isHovered ? (
                  <Unlock className="w-10 h-10 text-white animate-pulse" />
                ) : (
                  <Lock className="w-10 h-10 text-white" />
                )}
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3">Secure Core (IP Protected)</h3>
              <p className="text-white/80 text-base">Website · CRM · Portal foundation</p>
            </div>

            {/* Customization layers */}
            <div className="grid md:grid-cols-3 gap-6">
              {["Industry Layer", "Capability Layer", "Brand Layer"].map((layer, index) => (
                <div
                  key={layer}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center transition-all duration-300 hover:bg-white/20 hover:-translate-y-1"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <Layers className="w-8 h-8 text-white mx-auto mb-3" />
                  <p className="text-white font-medium">{layer}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-white/70 italic">Hover to reveal customization layers</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
