"use client"

import { useState, useEffect, useRef } from "react"
import { 
  Users, 
  TrendingUp, 
  Phone, 
  Mail, 
  Calendar, 
  CheckCircle,
  Clock,
  AlertCircle,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  MoreHorizontal,
  DollarSign,
  BarChart3,
  Activity,
  Wrench,
  Heart,
  Truck,
  Building2,
  Wallet
} from "lucide-react"

interface Contact {
  id: string
  name: string
  email: string
  phone: string
  company: string
  industry: string
  status: 'lead' | 'prospect' | 'customer' | 'inactive'
  value: number
  lastContact: string
  source: string
  tags: string[]
}

interface Deal {
  id: string
  title: string
  contact: string
  value: number
  stage: string
  probability: number
  closeDate: string
  industry: string
}

export default function CRMDemo() {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedIndustry, setSelectedIndustry] = useState('restoration')
  const [isDemoMode, setIsDemoMode] = useState(false)
  const [demoStep, setDemoStep] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  const industries = [
    { id: 'restoration', name: 'Restoration', icon: Wrench, color: 'from-red-500 to-pink-500' },
    { id: 'healthcare', name: 'Healthcare', icon: Heart, color: 'from-emerald-500 to-teal-500' },
    { id: 'logistics', name: 'Logistics', icon: Truck, color: 'from-orange-500 to-amber-500' },
    { id: 'real-estate', name: 'Real Estate', icon: Building2, color: 'from-blue-500 to-cyan-500' },
    { id: 'fintech', name: 'FinTech', icon: Wallet, color: 'from-green-500 to-emerald-500' }
  ]

  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: '1',
      name: 'John Smith',
      email: 'john@restorationpro.com',
      phone: '(555) 123-4567',
      company: 'Restoration Pro',
      industry: 'restoration',
      status: 'customer',
      value: 15000,
      lastContact: '2024-01-15',
      source: 'Website',
      tags: ['Emergency', 'Water Damage']
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@healthcare.com',
      phone: '(555) 987-6543',
      company: 'City Medical Center',
      industry: 'healthcare',
      status: 'prospect',
      value: 25000,
      lastContact: '2024-01-14',
      source: 'Referral',
      tags: ['Patient Portal', 'Appointments']
    },
    {
      id: '3',
      name: 'Mike Davis',
      email: 'mike@logistics.com',
      phone: '(555) 456-7890',
      company: 'FastTrack Logistics',
      industry: 'logistics',
      status: 'lead',
      value: 8000,
      lastContact: '2024-01-13',
      source: 'Cold Call',
      tags: ['Fleet Management', 'Tracking']
    }
  ])

  const [deals, setDeals] = useState<Deal[]>([
    {
      id: '1',
      title: 'Water Damage Restoration System',
      contact: 'John Smith',
      value: 15000,
      stage: 'Proposal',
      probability: 75,
      closeDate: '2024-02-15',
      industry: 'restoration'
    },
    {
      id: '2',
      title: 'Patient Management Portal',
      contact: 'Sarah Johnson',
      value: 25000,
      stage: 'Negotiation',
      probability: 60,
      closeDate: '2024-02-28',
      industry: 'healthcare'
    },
    {
      id: '3',
      title: 'Fleet Tracking Solution',
      contact: 'Mike Davis',
      value: 8000,
      stage: 'Qualification',
      probability: 40,
      closeDate: '2024-03-10',
      industry: 'logistics'
    }
  ])

  const demoSteps = [
    'Viewing CRM Dashboard',
    'Managing Contacts',
    'Tracking Deals',
    'Monitoring Activities',
    'Generating Reports'
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
        setDemoStep((prev) => (prev + 1) % demoSteps.length)
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [isDemoMode])

  const filteredContacts = contacts.filter(contact => contact.industry === selectedIndustry)
  const filteredDeals = deals.filter(deal => deal.industry === selectedIndustry)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'customer': return 'bg-green-100 text-green-800'
      case 'prospect': return 'bg-blue-100 text-blue-800'
      case 'lead': return 'bg-yellow-100 text-yellow-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <section ref={sectionRef} className="py-24 md:py-32 gradient-blue-teal">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="fade-in-element text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
            Interactive{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              CRM Demo
            </span>
          </h2>
          <p className="fade-in-element text-lg text-white/90 max-w-3xl mx-auto leading-relaxed">
            Experience how our CRM adapts to different industries with pre-built workflows and custom fields.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* CRM Interface */}
          <div className="fade-in-element">
            <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-3xl p-8 min-h-[600px]">
              {/* CRM Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Zenith CRM</h3>
                    <p className="text-white/70 text-sm">Industry-specific management</p>
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
                  {isDemoMode ? 'Stop Demo' : 'Start Demo'}
                </button>
              </div>

              {/* Industry Selector */}
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {industries.map((industry) => {
                    const Icon = industry.icon
                    return (
                      <button
                        key={industry.id}
                        onClick={() => setSelectedIndustry(industry.id)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-300 ${
                          selectedIndustry === industry.id
                            ? `bg-gradient-to-r ${industry.color} text-white`
                            : 'bg-white/10 text-white/70 hover:bg-white/20'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {industry.name}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Demo Content */}
              <div className="space-y-6">
                {isDemoMode ? (
                  <div className="space-y-4">
                    <div className="bg-white/10 rounded-xl p-4">
                      <h4 className="text-white font-semibold mb-2">Demo: {demoSteps[demoStep]}</h4>
                      <div className="space-y-2">
                        {demoSteps.map((step, index) => (
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
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-white/10 rounded-lg p-3 text-center">
                        <Users className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                        <p className="text-white/80 text-sm font-medium">Contacts</p>
                        <p className="text-white text-lg font-bold">{filteredContacts.length}</p>
                      </div>
                      <div className="bg-white/10 rounded-lg p-3 text-center">
                        <TrendingUp className="w-6 h-6 text-green-400 mx-auto mb-2" />
                        <p className="text-white/80 text-sm font-medium">Deals</p>
                        <p className="text-white text-lg font-bold">{filteredDeals.length}</p>
                      </div>
                      <div className="bg-white/10 rounded-lg p-3 text-center">
                        <DollarSign className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                        <p className="text-white/80 text-sm font-medium">Value</p>
                        <p className="text-white text-lg font-bold">
                          ${filteredDeals.reduce((sum, deal) => sum + deal.value, 0).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {/* Contacts List */}
                    <div className="space-y-3">
                      <h4 className="text-white font-semibold">Recent Contacts</h4>
                      {filteredContacts.slice(0, 3).map((contact) => (
                        <div key={contact.id} className="bg-white/5 border border-white/10 rounded-lg p-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-white font-medium text-sm">{contact.name}</p>
                              <p className="text-white/60 text-xs">{contact.company}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(contact.status)}`}>
                                {contact.status}
                              </span>
                              <span className="text-white/60 text-xs">${contact.value.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Pipeline */}
                    <div className="space-y-3">
                      <h4 className="text-white font-semibold">Pipeline</h4>
                      {filteredDeals.slice(0, 2).map((deal) => (
                        <div key={deal.id} className="bg-white/5 border border-white/10 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-white font-medium text-sm">{deal.title}</p>
                            <span className="text-white/60 text-xs">${deal.value.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-white/20 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-cyan-400 to-blue-400 h-2 rounded-full" 
                                style={{ width: `${deal.probability}%` }}
                              ></div>
                            </div>
                            <span className="text-white/60 text-xs">{deal.probability}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
                    <Plus className="w-4 h-4" />
                    Add Contact
                  </button>
                  <button className="flex-1 border border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 font-semibold py-2 px-4 rounded-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    Reports
                  </button>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-cyan-400/30 to-blue-400/30 rounded-full animate-bounce-slow" />
              <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full animate-pulse" />
            </div>
          </div>

          {/* Features List */}
          <div className="fade-in-element space-y-8" style={{ animationDelay: "300ms" }}>
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">CRM Features</h3>
              <p className="text-white/80 text-lg leading-relaxed">
                Our CRM system adapts to your industry with pre-built workflows, custom fields, and industry-specific features.
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  icon: Users,
                  title: "Contact Management",
                  description: "Organize contacts with industry-specific fields and custom data"
                },
                {
                  icon: TrendingUp,
                  title: "Pipeline Tracking",
                  description: "Track deals through industry-optimized sales processes"
                },
                {
                  icon: Activity,
                  title: "Activity Automation",
                  description: "Automated workflows for each industry's unique processes"
                },
                {
                  icon: BarChart3,
                  title: "Analytics & Reporting",
                  description: "Industry-specific KPIs and performance metrics"
                }
              ].map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div
                    key={feature.title}
                    className="flex items-start gap-4 p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300"
                    style={{ animationDelay: `${(index + 1) * 150}ms` }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-lg mb-2">{feature.title}</h3>
                      <p className="text-white/70">{feature.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* CTA Card */}
            {/* <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Ready to Transform Your CRM?</h3>
              <p className="text-white/80 mb-6">
                Get a customized CRM system that understands your industry's unique needs and workflows.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-white text-purple-900 hover:bg-white/90 font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
                  <Users className="w-5 h-5" />
                  Start Free Trial
                </button>
                <button className="border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Schedule Demo
                </button>
              </div>
            </div> */}
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
