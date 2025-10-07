"use client"

import { useEffect, useRef, useState } from "react"
import { Heart, Truck, Building2, Wallet, Monitor, Database, Globe, ArrowRight, CheckCircle, Zap, Users, BarChart3, Shield, Clock, Wrench } from "lucide-react"

export default function WhiteLabelShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [selectedIndustry, setSelectedIndustry] = useState(0)
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

  const industries = [
    {
      icon: Wrench,
      name: "Restoration",
      description: "Water damage, fire restoration, mould remediation management systems",
      color: "from-red-500 to-pink-500",
      features: ["Water Damage", "Fire Restoration", "Mould Remediation", "Project Tracking"],
      modules: [
        { name: "Website", description: "Restoration company websites with service portfolios" },
        { name: "CRM", description: "Emergency response and project management systems" },
        { name: "Portal", description: "Client portals for damage assessment and progress tracking" }
      ]
    },
    {
      icon: Heart,
      name: "Healthcare",
      description: "Patient portals, appointment scheduling, medical records management",
      color: "from-emerald-500 to-teal-500",
      features: ["Patient Portal", "Appointment Booking", "Medical Records", "Telemedicine"],
      modules: [
        { name: "Website", description: "Medical practice websites with patient portals" },
        { name: "CRM", description: "Patient management and appointment scheduling" },
        { name: "Portal", description: "Custom medical dashboards and integrations" }
      ]
    },
    {
      icon: Truck,
      name: "Logistics",
      description: "Shipment tracking, fleet management, real-time delivery dashboards",
      color: "from-orange-500 to-amber-500",
      features: ["Fleet Tracking", "Route Optimization", "Delivery Management", "Analytics"],
      modules: [
        { name: "Website", description: "Logistics company websites with tracking interfaces" },
        { name: "CRM", description: "Customer and shipment management systems" },
        { name: "Portal", description: "Real-time tracking and fleet management dashboards" }
      ]
    },
    {
      icon: Building2,
      name: "Real Estate",
      description: "Property listings, client portals, transaction management systems",
      color: "from-blue-500 to-cyan-500",
      features: ["Property Listings", "Client Portals", "Transaction Management", "Virtual Tours"],
      modules: [
        { name: "Website", description: "Property listing websites with search functionality" },
        { name: "CRM", description: "Lead management and client relationship tools" },
        { name: "Portal", description: "Client portals for property viewing and transactions" }
      ]
    },
    {
      icon: Wallet,
      name: "FinTech",
      description: "Investment dashboards, portfolio management, secure financial interfaces",
      color: "from-green-500 to-emerald-500",
      features: ["Portfolio Management", "Investment Tracking", "Secure Transactions", "Analytics"],
      modules: [
        { name: "Website", description: "Financial services websites with secure interfaces" },
        { name: "CRM", description: "Client relationship and investment management" },
        { name: "Portal", description: "Investment dashboards and portfolio management tools" }
      ]
    },
  ]

  const currentIndustry = industries[selectedIndustry]

  return (
    <section ref={sectionRef} className="py-24 md:py-32 gradient-dark-charcoal">
      <div className="container mx-auto px-6 max-w-7xl">
        <h2 className="fade-in-element text-3xl md:text-4xl font-semibold text-white text-center mb-6 tracking-tight">
          One Foundation.{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Infinite Industries.
          </span>
        </h2>

        <p className="fade-in-element text-lg text-white/80 text-center max-w-3xl mx-auto mb-16 leading-relaxed">
          The same business platform transforms seamlessly across medical, logistics, finance, real estate, and any
          sector. See how versatility creates unlimited market potential.
        </p>

        {/* Industry Selector */}
        <div className="fade-in-element mb-12">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {industries.map((industry, index) => {
              const Icon = industry.icon
              return (
                <button
                  key={industry.name}
                  onClick={() => setSelectedIndustry(index)}
                  className={`flex items-center gap-3 px-6 py-4 rounded-xl border transition-all duration-300 ${
                    selectedIndustry === index
                      ? `bg-gradient-to-r ${industry.color} border-transparent text-white shadow-lg scale-105`
                      : 'bg-white/5 border-white/20 text-white/70 hover:bg-white/10 hover:border-white/30'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{industry.name}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Interactive Demo */}
        <div className="fade-in-element mb-16">
          <div 
            className="relative bg-white/5 backdrop-blur-md border border-white/20 rounded-3xl p-8 transition-all duration-500 hover:bg-white/10"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* OS Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${currentIndustry.color} rounded-xl flex items-center justify-center`}>
                  <currentIndustry.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{currentIndustry.name} OS</h3>
                  <p className="text-white/70">Customized for {currentIndustry.name.toLowerCase()} industry</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <Shield className="w-4 h-4" />
                <span>Secure & Compliant</span>
              </div>
            </div>

            {/* Core Modules */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {currentIndustry.modules.map((module, index) => (
                <div
                  key={module.name}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    {module.name === 'Website' && <Globe className="w-6 h-6 text-cyan-400" />}
                    {module.name === 'CRM' && <Database className="w-6 h-6 text-purple-400" />}
                    {module.name === 'Portal' && <Monitor className="w-6 h-6 text-green-400" />}
                    <h4 className="text-white font-semibold text-lg">{module.name}</h4>
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed">{module.description}</p>
                </div>
              ))}
                </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {currentIndustry.features.map((feature, index) => (
                <div
                  key={feature}
                  className="bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Zap className="w-4 h-4 text-cyan-400" />
              </div>
                  <p className="text-white/80 text-sm font-medium">{feature}</p>
            </div>
          ))}
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-cyan-400/30 to-blue-400/30 rounded-full animate-bounce-slow" />
            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full animate-pulse" />
          </div>
        </div>

        {/* Benefits Section */}
        <div className="fade-in-element grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Rapid Deployment</h3>
            <p className="text-white/70">From concept to production in weeks, not months</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Industry Expertise</h3>
            <p className="text-white/70">Built by experts who understand your sector</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Proven Results</h3>
            <p className="text-white/70">Track record of successful implementations</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="fade-in-element text-center">
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-white/20 rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Customize for Your Industry?</h3>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              See how Zenith can be tailored specifically for your business needs. Get a personalized demo showing your industry's unique requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-purple-900 hover:bg-white/90 font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
                <Monitor className="w-5 h-5" />
                View Industry Demo
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Schedule Consultation
              </button>
            </div>
          </div>
        </div>

        <div className="fade-in-element mt-16 text-center" style={{ animationDelay: "400ms" }}>
          <p className="text-white/60 text-sm italic">From blank canvas to industry-specific powerhouse in weeks</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
      `}</style>
    </section>
  )
}
