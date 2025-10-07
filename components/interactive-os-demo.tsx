"use client"

import { useState, useEffect, useRef } from "react"
import { Globe, Database, Monitor, Zap, Shield, ArrowRight, Play, Settings, Users, BarChart3, FileText, Mail, Calendar, Search, Bell } from "lucide-react"

export default function InteractiveOSDemo() {
  const [activeModule, setActiveModule] = useState(0)
  const [isDemoMode, setIsDemoMode] = useState(false)
  const [demoStep, setDemoStep] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  const modules = [
    {
      name: "Website",
      icon: Globe,
      color: "from-blue-500 to-cyan-500",
      description: "Customizable website framework",
      features: ["Responsive Design", "SEO Optimized", "Content Management", "Analytics"],
      demo: {
        title: "Website Builder",
        steps: [
          "Choose your industry template",
          "Customize colors and branding",
          "Add your content and images",
          "Publish and go live"
        ]
      }
    },
    {
      name: "CRM",
      icon: Database,
      color: "from-purple-500 to-pink-500",
      description: "Customer relationship management",
      features: ["Lead Tracking", "Contact Management", "Sales Pipeline", "Automation"],
      demo: {
        title: "CRM Dashboard",
        steps: [
          "Import your contacts",
          "Set up sales pipelines",
          "Configure automation rules",
          "Track performance metrics"
        ]
      }
    },
    {
      name: "Portal",
      icon: Monitor,
      color: "from-green-500 to-emerald-500",
      description: "White-label client portal",
      features: ["Custom Dashboards", "User Management", "Integration Hub", "Reporting"],
      demo: {
        title: "Client Portal",
        steps: [
          "Design custom dashboards",
          "Set up user permissions",
          "Integrate third-party tools",
          "Configure client access"
        ]
      }
    }
  ]

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

    const elements = sectionRef.current?.querySelectorAll(".fade-in-element")
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isDemoMode) {
      const interval = setInterval(() => {
        setDemoStep((prev) => (prev + 1) % modules[activeModule].demo.steps.length)
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [isDemoMode, activeModule])

  const currentModule = modules[activeModule]

  return (
    <section ref={sectionRef} className="py-24 md:py-32 gradient-blue-teal">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="fade-in-element text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
            Interactive{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              business platform
            </span>{" "}
            Demo
          </h2>
          <p className="fade-in-element text-lg text-white/90 max-w-3xl mx-auto leading-relaxed">
            Experience how Zenith's three core modules work together to create a complete business business platform.
            Click through each module to see the possibilities.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Module Selector */}
          <div className="fade-in-element space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">Core Modules</h3>
            {modules.map((module, index) => {
              const Icon = module.icon
              const isActive = activeModule === index
              return (
                <div
                  key={module.name}
                  onClick={() => setActiveModule(index)}
                  className={`relative p-6 rounded-2xl border cursor-pointer transition-all duration-300 ${
                    isActive
                      ? `bg-gradient-to-r ${module.color} border-transparent text-white shadow-lg scale-105`
                      : 'bg-white/10 border-white/20 text-white/70 hover:bg-white/20 hover:border-white/30'
                  }`}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      isActive ? 'bg-white/20' : 'bg-white/10'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold">{module.name}</h4>
                      <p className="text-sm opacity-80">{module.description}</p>
                    </div>
                    {isActive && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full animate-pulse" />
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    {module.features.map((feature, featureIndex) => (
                      <div
                        key={feature}
                        className={`text-xs px-3 py-2 rounded-lg ${
                          isActive ? 'bg-white/20' : 'bg-white/5'
                        }`}
                        style={{ animationDelay: `${featureIndex * 100}ms` }}
                      >
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Interactive Demo */}
          <div className="fade-in-element">
            <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-3xl p-8 min-h-[500px]">
              {/* Demo Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 bg-gradient-to-br ${currentModule.color} rounded-xl flex items-center justify-center`}>
                    <currentModule.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{currentModule.name} Module</h3>
                    <p className="text-white/70 text-sm">Interactive demonstration</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsDemoMode(!isDemoMode)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    isDemoMode
                      ? 'bg-green-500 text-white'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  <Play className="w-4 h-4" />
                  {isDemoMode ? 'Stop Demo' : 'Start Demo'}
                </button>
              </div>

              {/* Demo Content */}
              <div className="space-y-6">
                {isDemoMode ? (
                  <div className="space-y-4">
                    <div className="bg-white/10 rounded-xl p-4">
                      <h4 className="text-white font-semibold mb-2">{currentModule.demo.title}</h4>
                      <div className="space-y-2">
                        {currentModule.demo.steps.map((step, index) => (
                          <div
                            key={step}
                            className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-500 ${
                              index === demoStep
                                ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30'
                                : 'bg-white/5'
                            }`}
                          >
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                              index === demoStep
                                ? 'bg-cyan-400 text-white'
                                : index < demoStep
                                ? 'bg-green-400 text-white'
                                : 'bg-white/20 text-white/50'
                            }`}>
                              {index < demoStep ? '✓' : index + 1}
                            </div>
                            <span className={`text-sm ${
                              index === demoStep ? 'text-white font-medium' : 'text-white/70'
                            }`}>
                              {step}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Mock Interface */}
                    <div className="bg-white/10 rounded-xl p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <div className="text-white/60 text-sm font-mono ml-auto">Zenith OS v2.0</div>
                      </div>
                      
                      <div className="grid grid-cols-4 gap-4 mb-6">
                        <div className="bg-white/10 rounded-lg p-3 text-center">
                          <Globe className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                          <p className="text-white/80 text-xs">Website</p>
                        </div>
                        <div className="bg-white/10 rounded-lg p-3 text-center">
                          <Database className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                          <p className="text-white/80 text-xs">CRM</p>
                        </div>
                        <div className="bg-white/10 rounded-lg p-3 text-center">
                          <Monitor className="w-6 h-6 text-green-400 mx-auto mb-2" />
                          <p className="text-white/80 text-xs">Portal</p>
                        </div>
                        <div className="bg-white/10 rounded-lg p-3 text-center">
                          <Settings className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                          <p className="text-white/80 text-xs">Settings</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                          <Users className="w-5 h-5 text-blue-400" />
                          <div>
                            <p className="text-white text-sm font-medium">User Management</p>
                            <p className="text-white/60 text-xs">Manage team members and permissions</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                          <BarChart3 className="w-5 h-5 text-green-400" />
                          <div>
                            <p className="text-white text-sm font-medium">Analytics Dashboard</p>
                            <p className="text-white/60 text-xs">Track performance and insights</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                          <FileText className="w-5 h-5 text-purple-400" />
                          <div>
                            <p className="text-white text-sm font-medium">Document Center</p>
                            <p className="text-white/60 text-xs">Store and organize your files</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      {currentModule.features.map((feature, index) => (
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
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
                    <Shield className="w-4 h-4" />
                    Secure & Compliant
                  </button>
                  <button className="flex-1 border border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
                    <ArrowRight className="w-4 h-4" />
                    Learn More
                  </button>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-cyan-400/30 to-blue-400/30 rounded-full animate-bounce-slow" />
              <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full animate-pulse" />
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="fade-in-element mt-16 text-center">
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-white/20 rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Experience Zenith?</h3>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              See how our business platform can be customized for your specific industry and business needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-purple-900 hover:bg-white/90 font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
                <Play className="w-5 h-5" />
                Start Free Demo
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
                <Calendar className="w-5 h-5" />
                Schedule Consultation
              </button>
            </div>
          </div>
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
