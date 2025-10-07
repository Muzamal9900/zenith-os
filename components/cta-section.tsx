"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Calendar, Download, ArrowRight } from "lucide-react"

export default function CTASection() {
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
    <section ref={sectionRef} className="py-24 md:py-32 gradient-purple-magenta overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-10 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-10 left-10 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="text-center">
          <h2 className="fade-in-element text-3xl md:text-[48px] font-semibold text-white mb-6 tracking-tight text-balance leading-tight">
            See the Skeleton. Imagine the Possibilities.
          </h2>

          <p className="fade-in-element text-lg md:text-xl text-white/90 mb-12 leading-relaxed max-w-2xl mx-auto">
            Schedule a demonstration of the blank business platform. See the framework. Understand the potential.
            Discover how quickly you can go to market.
          </p>

          <div
            className="fade-in-element flex flex-col sm:flex-row gap-4 justify-center items-center"
            style={{ animationDelay: "200ms" }}
          >
            <Button
              size="lg"
              className="bg-white text-purple-900 hover:bg-white/90 font-semibold px-10 py-7 text-lg rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
            >
              <Calendar className="mr-2 h-6 w-6" />
              Schedule Framework Demo
              <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white/50 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 font-semibold px-10 py-7 text-lg rounded-lg transition-all duration-300"
            >
              <Download className="mr-2 h-5 w-5" />
              Download Technical Overview
            </Button>
          </div>

          <p className="fade-in-element mt-8 text-white/70 text-sm" style={{ animationDelay: "300ms" }}>
            Join forward-thinking businesses building on Zenith
          </p>
        </div>
      </div>
    </section>
  )
}
