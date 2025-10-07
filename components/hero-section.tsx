"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Sparkles, Shield, Zap, Globe, Database, Monitor } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [currentWord, setCurrentWord] = useState(0)

  const words = ["Restoration","Healthcare", "Finance", "Logistics", "Real Estate", "Technology"]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in")
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = heroRef.current?.querySelectorAll(".fade-in-element")
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-navy-purple"
    >
      {/* Sophisticated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-blue-900/20 to-cyan-900/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(120,119,198,0.4),transparent_70%)]" />
        
        {/* Animated Particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400/60 rounded-full animate-float-particle-1" />
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-purple-400/60 rounded-full animate-float-particle-2" />
        <div className="absolute bottom-1/4 left-1/3 w-2.5 h-2.5 bg-blue-400/60 rounded-full animate-float-particle-3" />
        <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-pink-400/60 rounded-full animate-float-particle-4" />
        <div className="absolute top-1/2 left-1/6 w-1.5 h-1.5 bg-emerald-400/60 rounded-full animate-float-particle-5" />
        <div className="absolute top-2/3 right-1/6 w-2 h-2 bg-amber-400/60 rounded-full animate-float-particle-6" />
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }} />
        </div>
        
        {/* Floating Geometric Shapes */}
        <div className="absolute top-1/4 left-1/4 w-24 h-24 bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-sm rounded-2xl rotate-12 animate-float-gentle opacity-40" />
        <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 backdrop-blur-sm rounded-xl -rotate-12 animate-float-gentle-reverse opacity-50" />
        <div className="absolute bottom-1/4 left-1/3 w-28 h-28 bg-gradient-to-br from-purple-400/8 to-pink-400/8 backdrop-blur-sm rounded-2xl rotate-45 animate-float-gentle-slow opacity-30" />
        <div className="absolute bottom-1/3 right-1/3 w-16 h-16 bg-gradient-to-br from-green-400/10 to-emerald-400/10 backdrop-blur-sm rounded-full animate-pulse-gentle opacity-40" />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="fade-in-element mb-8">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 text-sm text-white/90 shadow-lg">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="font-medium">Next-Generation business platform</span>
              <Shield className="w-4 h-4 text-green-400" />
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="fade-in-element text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-tight mb-8 tracking-tight text-balance">
            Your Business. Your Rules.{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent font-normal">
              One Foundation.
            </span>
          </h1>

          {/* Dynamic Industry Text */}
          <div className="fade-in-element mb-8" style={{ animationDelay: "200ms" }}>
            <p className="text-lg md:text-xl text-white/80 mb-4">
              Perfect for{" "}
              <span 
                key={currentWord}
                className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-medium transition-all duration-500"
              >
                {words[currentWord]}
              </span>
              {" "}and any industry
            </p>
          </div>

          {/* Description */}
          <p
            className="fade-in-element text-lg md:text-xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto"
            style={{ animationDelay: "400ms" }}
          >
            The white-label business platform that adapts to any business model. 
            Launch faster, scale smarter, own your ecosystem.
          </p>

          {/* CTA Buttons */}
          <div
            className="fade-in-element flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            style={{ animationDelay: "600ms" }}
          >
            <Link href="/website">
              <Button
                size="lg"
                className="bg-white text-purple-900 hover:bg-white/90 font-medium px-8 py-6 text-base rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl group shadow-lg"
              >
                Explore the Framework
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <Link href="/demo">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 font-medium px-8 py-6 text-base rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <Play className="mr-2 h-5 w-5" />
                Book a Demo
              </Button>
            </Link>
          </div>

          {/* Core Modules Preview */}
          <div className="fade-in-element grid grid-cols-3 gap-4 max-w-2xl mx-auto" style={{ animationDelay: "800ms" }}>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <h3 className="text-white font-medium text-sm mb-1">Website</h3>
              <p className="text-white/60 text-xs">Customizable framework</p>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <h3 className="text-white font-medium text-sm mb-1">CRM</h3>
              <p className="text-white/60 text-xs">Customer management</p>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <h3 className="text-white font-medium text-sm mb-1">Portal</h3>
              <p className="text-white/60 text-xs">White-label platform</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-1.5 bg-white rounded-full" />
        </div>
      </div>

      <style jsx>{`
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0) rotate(12deg); }
          50% { transform: translateY(-20px) rotate(17deg); }
        }
        @keyframes float-gentle-reverse {
          0%, 100% { transform: translateY(0) rotate(-12deg); }
          50% { transform: translateY(-15px) rotate(-17deg); }
        }
        @keyframes float-gentle-slow {
          0%, 100% { transform: translateY(0) rotate(45deg); }
          50% { transform: translateY(-25px) rotate(50deg); }
        }
        @keyframes float-particle-1 {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.6; }
          50% { transform: translateY(-30px) translateX(10px); opacity: 1; }
        }
        @keyframes float-particle-2 {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.4; }
          50% { transform: translateY(-25px) translateX(-15px); opacity: 0.8; }
        }
        @keyframes float-particle-3 {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.5; }
          50% { transform: translateY(-35px) translateX(20px); opacity: 0.9; }
        }
        @keyframes float-particle-4 {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
          50% { transform: translateY(-20px) translateX(-10px); opacity: 0.7; }
        }
        @keyframes float-particle-5 {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.4; }
          50% { transform: translateY(-28px) translateX(15px); opacity: 0.8; }
        }
        @keyframes float-particle-6 {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.5; }
          50% { transform: translateY(-22px) translateX(-12px); opacity: 0.9; }
        }
        @keyframes pulse-gentle {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        .animate-float-gentle { animation: float-gentle 12s ease-in-out infinite; }
        .animate-float-gentle-reverse { animation: float-gentle-reverse 10s ease-in-out infinite; }
        .animate-float-gentle-slow { animation: float-gentle-slow 15s ease-in-out infinite; }
        .animate-float-particle-1 { animation: float-particle-1 8s ease-in-out infinite; }
        .animate-float-particle-2 { animation: float-particle-2 10s ease-in-out infinite; }
        .animate-float-particle-3 { animation: float-particle-3 12s ease-in-out infinite; }
        .animate-float-particle-4 { animation: float-particle-4 9s ease-in-out infinite; }
        .animate-float-particle-5 { animation: float-particle-5 11s ease-in-out infinite; }
        .animate-float-particle-6 { animation: float-particle-6 13s ease-in-out infinite; }
        .animate-pulse-gentle { animation: pulse-gentle 6s ease-in-out infinite; }
      `}</style>
    </section>
  )
}