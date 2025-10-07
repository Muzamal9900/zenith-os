"use client"

import { useState } from "react"
import { 
  Building2, Users, Settings, Globe, Shield, Zap, 
  Palette, Monitor, Database, ChevronDown, Plus,
  ArrowRight, CheckCircle, Star, Target, BarChart3,
  Wrench, Heart, Truck, DollarSign, FileText,
  Calendar, Phone, Mail, Activity, TrendingUp,
  Code, Layers, Box, Cpu, HardDrive, Network,
  Lock, Unlock, Eye, EyeOff, Download, Upload,
  Play, Pause, Square, RotateCcw, Maximize2
} from "lucide-react"

export default function PortalDashboard() {
  const [selectedIndustry, setSelectedIndustry] = useState('blank')
  const [activeModule, setActiveModule] = useState('overview')
  const [isCustomizing, setIsCustomizing] = useState(false)

  const industries = [
    { id: 'blank', name: 'Blank Canvas', color: 'from-gray-500 to-gray-600', icon: Box, description: 'Start from scratch' },
    { id: 'restoration', name: 'Restoration', color: 'from-red-500 to-pink-500', icon: Wrench, description: 'Water damage, fire restoration' },
    { id: 'healthcare', name: 'Healthcare', color: 'from-emerald-500 to-teal-500', icon: Heart, description: 'Medical practices, clinics' },
    { id: 'logistics', name: 'Logistics', color: 'from-orange-500 to-amber-500', icon: Truck, description: 'Shipping, warehousing' },
    { id: 'real-estate', name: 'Real Estate', color: 'from-blue-500 to-cyan-500', icon: Building2, description: 'Property management' },
    { id: 'fintech', name: 'FinTech', color: 'from-green-500 to-emerald-500', icon: DollarSign, description: 'Financial services' }
  ]

  const operatingSystemModules = [
    {
      id: 'website',
      name: 'Website Module',
      description: 'Your branded digital presence',
      icon: Globe,
      color: 'from-blue-500 to-cyan-500',
      status: 'locked',
      features: [
        'Custom Domain Setup',
        'Industry-Specific Design',
        'SEO Optimization',
        'Mobile Responsive',
        'Content Management',
        'Analytics Integration'
      ],
      customization: {
        branding: ['Logo', 'Colors', 'Typography', 'Layout'],
        content: ['Pages', 'Blog', 'Portfolio', 'Testimonials'],
        functionality: ['Forms', 'Chat', 'Booking', 'E-commerce']
      }
    },
    {
      id: 'crm',
      name: 'CRM Module',
      description: 'Customer relationship management',
      icon: Users,
      color: 'from-purple-500 to-pink-500',
      status: 'locked',
      features: [
        'Contact Management',
        'Deal Pipeline',
        'Activity Tracking',
        'Reporting & Analytics',
        'Email Integration',
        'Task Management'
      ],
      customization: {
        workflows: ['Lead Process', 'Sales Stages', 'Follow-ups', 'Automation'],
        fields: ['Custom Fields', 'Industry Fields', 'Validation Rules', 'Dependencies'],
        integrations: ['Email', 'Calendar', 'Phone', 'Third-party APIs']
      }
    },
    {
      id: 'portal',
      name: 'Portal Module',
      description: 'Your customizable business hub',
      icon: Building2,
      color: 'from-green-500 to-emerald-500',
      status: 'unlocked',
      features: [
        'Custom Dashboards',
        'User Management',
        'Role-based Access',
        'Integration Hub',
        'Analytics Center',
        'Settings Panel'
      ],
      customization: {
        dashboards: ['Widgets', 'Layouts', 'Charts', 'KPIs'],
        users: ['Roles', 'Permissions', 'Departments', 'Hierarchy'],
        integrations: ['APIs', 'Webhooks', 'Data Sync', 'External Tools']
      }
    }
  ]

  const whiteLabelFeatures = [
    {
      category: 'Intellectual Property',
      icon: Lock,
      description: 'Our proprietary code and architecture',
      features: [
        'Secure, locked codebase',
        'Proven architecture',
        'Scalable infrastructure',
        'Regular updates & maintenance'
      ]
    },
    {
      category: 'Customization Layer',
      icon: Palette,
      description: 'Your industry-specific customizations',
      features: [
        'Industry templates',
        'Custom branding',
        'Workflow configuration',
        'Feature modules'
      ]
    },
    {
      category: 'Deployment Options',
      icon: HardDrive,
      description: 'Flexible hosting and deployment',
      features: [
        'Cloud hosting',
        'On-premise setup',
        'Hybrid solutions',
        'Security compliance'
      ]
    }
  ]

  const developmentOptions = [
    {
      id: 'self-build',
      title: 'Self-Build Option',
      description: 'You build on top of our business platform',
      icon: Code,
      features: [
        'Full access to customization layer',
        'API documentation',
        'Developer tools',
        'Community support',
        'Your development team builds'
      ],
      pricing: 'License + Development',
      timeline: 'Immediate start'
    },
    {
      id: 'zenith-build',
      title: 'Zenith Build Option',
      description: 'We build your custom solution',
      icon: Building2,
      features: [
        'Complete custom development',
        'Industry expertise',
        'Dedicated project team',
        'Full support & maintenance',
        'We build everything for you'
      ],
      pricing: 'Project-based',
      timeline: '2-4 weeks'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-8xl mx-auto">
        {/* business platform Header */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
          <div className="px-6 py-8">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold">Zenith - Business Platform</h1>
                    <p className="text-gray-300">White-Label Software Platform</p>
                  </div>
                </div>
                <p className="text-gray-300 max-w-2xl mt-4">
                  A complete business platform for any industry. Like Windows for computers, 
                  but for business software. Customize it, build on it, make it yours.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-green-600 rounded-lg">
                  <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                  <span className="text-sm">System Ready</span>
                </div>
                <button 
                  onClick={() => setIsCustomizing(!isCustomizing)}
                  className="px-6 py-3 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
                >
                  {isCustomizing ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  {isCustomizing ? 'Hide' : 'Show'} Customization
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Industry Selection */}
        <div className="px-6 py-6">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Choose Your Industry Template</h2>
            <p className="text-gray-600 mb-6">
              Start with a blank canvas or select an industry template. We'll customize everything for your specific needs.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {industries.map((industry) => {
                const Icon = industry.icon
                return (
                  <button
                    key={industry.id}
                    onClick={() => setSelectedIndustry(industry.id)}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      selectedIndustry === industry.id
                        ? 'border-purple-500 bg-purple-50 shadow-md'
                        : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${industry.color} flex items-center justify-center`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{industry.name}</h3>
                        <p className="text-sm text-gray-600">{industry.description}</p>
                      </div>
                    </div>
                    {selectedIndustry === industry.id && (
                      <div className="flex items-center gap-2 text-purple-600 text-sm">
                        <CheckCircle className="w-4 h-4" />
                        Selected Template
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Business Platform Modules */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Business Platform Modules</h2>
            <p className="text-gray-600 mb-6">
              Three core modules that make up your complete business platform. Each can be customized for your industry.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {operatingSystemModules.map((module) => {
                const Icon = module.icon
                return (
                  <div key={module.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${module.color} flex items-center justify-center`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{module.name}</h3>
                            <p className="text-sm text-gray-600">{module.description}</p>
                          </div>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          module.status === 'locked' 
                            ? 'bg-gray-100 text-gray-600' 
                            : 'bg-green-100 text-green-600'
                        }`}>
                          {module.status === 'locked' ? 'Locked' : 'Unlocked'}
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        {module.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            {feature}
                          </div>
                        ))}
                      </div>

                      {isCustomizing && (
                        <div className="border-t border-gray-200 pt-4">
                          <h4 className="text-sm font-semibold text-gray-900 mb-3">Customization Options:</h4>
                          <div className="space-y-3">
                            {Object.entries(module.customization).map(([key, options]) => (
                              <div key={key}>
                                <h5 className="text-xs font-medium text-gray-700 mb-1 capitalize">{key}:</h5>
                                <div className="flex flex-wrap gap-1">
                                  {options.map((option, idx) => (
                                    <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                                      {option}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <button className={`w-full mt-4 px-4 py-2 rounded-lg font-medium transition-colors ${
                        module.status === 'locked'
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-purple-600 text-white hover:bg-purple-700'
                      }`}>
                        {module.status === 'locked' ? 'Module Locked' : `Configure ${module.name}`}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* White Label Features */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">White-Label Features</h2>
            <p className="text-gray-600 mb-6">
              What makes our business platform unique and valuable for your business.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {whiteLabelFeatures.map((feature) => {
                const Icon = feature.icon
                return (
                  <div key={feature.category} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{feature.category}</h3>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {feature.features.map((item, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Development Options */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">How Do You Want to Build?</h2>
            <p className="text-gray-600 mb-6">
              Choose how you want to customize your business platform for your industry.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {developmentOptions.map((option) => {
                const Icon = option.icon
                return (
                  <div key={option.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{option.title}</h3>
                        <p className="text-gray-600">{option.description}</p>
                      </div>
                    </div>
                    <div className="space-y-2 mb-4">
                      {option.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div>
                        <p className="text-sm text-gray-600">Pricing: <span className="font-medium text-gray-900">{option.pricing}</span></p>
                        <p className="text-sm text-gray-600">Timeline: <span className="font-medium text-gray-900">{option.timeline}</span></p>
                      </div>
                      <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                        Choose This Option
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Build Your business platform?</h2>
            <p className="text-purple-100 mb-6 max-w-3xl mx-auto text-lg">
              This is your blank canvas. We'll help you build the perfect business platform for your industry. 
              Whether you want to build it yourself or have us build it for you, we're here to make it happen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2">
                <Play className="w-5 h-5" />
                Start Building
              </button>
              <button className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors flex items-center gap-2">
                <Download className="w-5 h-5" />
                Download Demo
              </button>
              <button className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}