"use client"

import { useState } from "react"
import { 
  Building2, Users, DollarSign, Calendar, FileText, Settings, 
  Star, Zap, Shield, Database, Globe, Monitor, ArrowRight,
  CheckCircle, Play, Download, Eye, Edit, Trash2, X, Clock,
  Wrench, Heart, Truck, Home, CreditCard, Phone, Mail, MapPin,
  BarChart3, Target, ShieldCheck, Zap as Lightning, Users2,
  Package, TrendingUp, AlertCircle, Info, ExternalLink
} from "lucide-react"

interface IndustryTemplate {
  id: string
  name: string
  industry: string
  description: string
  features: string[]
  modules: string[]
  color: string
  icon: any
  pricing: {
    monthly: number
    yearly: number
  }
  setupTime: string
  complexity: 'Basic' | 'Intermediate' | 'Advanced'
  customization: string[]
  integrations: string[]
  support: string[]
  screenshots: string[]
  testimonials: {
    name: string
    company: string
    rating: number
    comment: string
  }[]
  faqs: {
    question: string
    answer: string
  }[]
}

export default function IndustryTemplates() {
  const [selectedTemplate, setSelectedTemplate] = useState<IndustryTemplate | null>(null)
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'pricing' | 'demo'>('overview')

  const templates: IndustryTemplate[] = [
    {
      id: 'restoration',
      name: 'Restoration Pro',
      industry: 'Restoration',
      description: 'Complete restoration management system with water damage, fire restoration, and mold remediation workflows. Built specifically for restoration companies to streamline operations and maximize efficiency.',
      features: [
        'Water Damage Assessment & Documentation',
        'Fire Restoration Project Tracking',
        'Mold Remediation Management',
        'Insurance Claim Processing & Tracking',
        'Equipment Inventory & Maintenance',
        'Project Timeline & Milestone Management',
        'Customer Communication Portal',
        'Photo Documentation System',
        'Estimating & Quoting Tools',
        'Compliance & Certification Tracking'
      ],
      modules: ['CRM', 'Project Management', 'Inventory', 'Billing', 'Reporting', 'Scheduling', 'Documentation'],
      color: 'from-blue-500 to-cyan-500',
      icon: Wrench,
      pricing: { monthly: 299, yearly: 2990 },
      setupTime: '2-3 weeks',
      complexity: 'Advanced',
      customization: ['Branding', 'Workflows', 'Fields', 'Reports', 'Dashboards'],
      integrations: ['QuickBooks', 'Xactimate', 'Insurance APIs', 'Google Maps', 'DocuSign'],
      support: ['24/7 Support', 'Training', 'Migration', 'Custom Development'],
      screenshots: ['/placeholder.jpg', '/placeholder.jpg', '/placeholder.jpg'],
      testimonials: [
        {
          name: 'Sarah Johnson',
          company: 'Premier Restoration',
          rating: 5,
          comment: 'This template transformed our business. We can now handle 3x more projects with better organization.'
        },
        {
          name: 'Mike Chen',
          company: 'Elite Water Damage',
          rating: 5,
          comment: 'The insurance integration alone saved us 10 hours per week. Incredible value!'
        }
      ],
      faqs: [
        {
          question: 'How long does setup take?',
          answer: 'Typically 2-3 weeks including data migration, training, and customization.'
        },
        {
          question: 'Can we customize the workflows?',
          answer: 'Yes, all workflows are fully customizable to match your specific processes.'
        }
      ]
    },
    {
      id: 'healthcare',
      name: 'Healthcare Plus',
      industry: 'Healthcare',
      description: 'Comprehensive healthcare practice management with patient records, scheduling, and billing. HIPAA-compliant solution designed for medical practices of all sizes.',
      features: [
        'Patient Management & Records',
        'Appointment Scheduling & Reminders',
        'Medical Records & Documentation',
        'Billing & Insurance Processing',
        'Prescription Management',
        'Compliance & HIPAA Reporting',
        'Telemedicine Integration',
        'Lab Results Management',
        'Insurance Verification',
        'Patient Portal Access'
      ],
      modules: ['Patient CRM', 'Scheduling', 'Billing', 'Records', 'Compliance', 'Telemedicine', 'Portal'],
      color: 'from-green-500 to-emerald-500',
      icon: Heart,
      pricing: { monthly: 399, yearly: 3990 },
      setupTime: '3-4 weeks',
      complexity: 'Advanced',
      customization: ['HIPAA Compliance', 'Workflows', 'Forms', 'Reports', 'Branding'],
      integrations: ['EMR Systems', 'Insurance', 'Lab Systems', 'Pharmacy', 'Payment Processors'],
      support: ['HIPAA Training', '24/7 Support', 'Migration', 'Compliance'],
      screenshots: ['/placeholder.jpg', '/placeholder.jpg', '/placeholder.jpg'],
      testimonials: [
        {
          name: 'Dr. Emily Rodriguez',
          company: 'Family Care Clinic',
          rating: 5,
          comment: 'HIPAA compliance was our biggest concern. This system handles everything perfectly.'
        }
      ],
      faqs: [
        {
          question: 'Is it HIPAA compliant?',
          answer: 'Yes, fully HIPAA compliant with all necessary safeguards and documentation.'
        }
      ]
    },
    {
      id: 'logistics',
      name: 'Logistics Master',
      industry: 'Logistics',
      description: 'End-to-end logistics management with fleet tracking, warehouse management, and delivery optimization. Perfect for shipping companies and delivery services.',
      features: [
        'Fleet Management & Tracking',
        'Route Optimization & Planning',
        'Warehouse Management System',
        'Real-time Delivery Tracking',
        'Driver Management & Scheduling',
        'Performance Analytics & Reporting',
        'Fuel Management',
        'Maintenance Scheduling',
        'Customer Notifications',
        'Inventory Management'
      ],
      modules: ['Fleet CRM', 'Tracking', 'Warehouse', 'Analytics', 'Dispatch', 'Maintenance', 'Reporting'],
      color: 'from-orange-500 to-red-500',
      icon: Truck,
      pricing: { monthly: 499, yearly: 4990 },
      setupTime: '4-5 weeks',
      complexity: 'Advanced',
      customization: ['Branding', 'Workflows', 'Tracking', 'Reports', 'Dashboards'],
      integrations: ['GPS Systems', 'ERP', 'E-commerce', 'Weather APIs', 'Fuel Cards'],
      support: ['24/7 Support', 'Training', 'Migration', 'Custom Development'],
      screenshots: ['/placeholder.jpg', '/placeholder.jpg', '/placeholder.jpg'],
      testimonials: [
        {
          name: 'David Park',
          company: 'Swift Logistics',
          rating: 5,
          comment: 'Route optimization alone saved us 20% on fuel costs. ROI was immediate.'
        }
      ],
      faqs: [
        {
          question: 'Does it integrate with our GPS systems?',
          answer: 'Yes, we support all major GPS tracking systems and can integrate with your existing hardware.'
        }
      ]
    },
    {
      id: 'real-estate',
      name: 'Real Estate Pro',
      industry: 'Real Estate',
      description: 'Complete real estate management platform with property listings, client management, and transaction tracking. Built for agents, brokers, and property managers.',
      features: [
        'Property Listing Management',
        'Client & Lead Management',
        'Transaction Tracking',
        'Document Management',
        'Market Analysis Tools',
        'Commission Tracking',
        'Open House Scheduling',
        'Property Valuation Tools',
        'Marketing Automation',
        'Compliance Management'
      ],
      modules: ['Property CRM', 'Listings', 'Transactions', 'Marketing', 'Analytics', 'Documents', 'Compliance'],
      color: 'from-purple-500 to-pink-500',
      icon: Home,
      pricing: { monthly: 199, yearly: 1990 },
      setupTime: '1-2 weeks',
      complexity: 'Intermediate',
      customization: ['Branding', 'Workflows', 'Fields', 'Reports'],
      integrations: ['MLS Systems', 'DocuSign', 'Zillow', 'Google Maps', 'Social Media'],
      support: ['24/7 Support', 'Training', 'Migration'],
      screenshots: ['/placeholder.jpg', '/placeholder.jpg', '/placeholder.jpg'],
      testimonials: [
        {
          name: 'Lisa Thompson',
          company: 'Thompson Realty',
          rating: 5,
          comment: 'Our listing management is now 10x more efficient. Clients love the portal access.'
        }
      ],
      faqs: [
        {
          question: 'Does it integrate with MLS?',
          answer: 'Yes, we support all major MLS systems for seamless property data synchronization.'
        }
      ]
    },
    {
      id: 'fintech',
      name: 'FinTech Suite',
      industry: 'FinTech',
      description: 'Comprehensive financial technology platform with payment processing, compliance management, and customer onboarding. Built for fintech startups and financial services.',
      features: [
        'Payment Processing',
        'Customer Onboarding',
        'KYC/AML Compliance',
        'Risk Management',
        'Transaction Monitoring',
        'API Management',
        'Fraud Detection',
        'Regulatory Reporting',
        'Customer Portal',
        'Analytics Dashboard'
      ],
      modules: ['Customer CRM', 'Payments', 'Compliance', 'Risk', 'Analytics', 'API', 'Reporting'],
      color: 'from-indigo-500 to-purple-500',
      icon: CreditCard,
      pricing: { monthly: 599, yearly: 5990 },
      setupTime: '6-8 weeks',
      complexity: 'Advanced',
      customization: ['Compliance', 'Workflows', 'Reports', 'Branding'],
      integrations: ['Banking APIs', 'Payment Processors', 'KYC Providers', 'Regulatory Systems'],
      support: ['24/7 Support', 'Compliance Training', 'Migration', 'Custom Development'],
      screenshots: ['/placeholder.jpg', '/placeholder.jpg', '/placeholder.jpg'],
      testimonials: [
        {
          name: 'Alex Kumar',
          company: 'PayFlow Solutions',
          rating: 5,
          comment: 'Compliance was our biggest challenge. This system handles everything automatically.'
        }
      ],
      faqs: [
        {
          question: 'Is it compliant with financial regulations?',
          answer: 'Yes, we maintain compliance with major financial regulations including PCI DSS, SOX, and GDPR.'
        }
      ]
    }
  ]

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Basic': return 'bg-green-100 text-green-800'
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'Advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getComplexityIcon = (complexity: string) => {
    switch (complexity) {
      case 'Basic': return <CheckCircle className="w-4 h-4" />
      case 'Intermediate': return <Target className="w-4 h-4" />
      case 'Advanced': return <Zap className="w-4 h-4" />
      default: return <Info className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-gray-50 border-b border-gray-200 py-6">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Industry-Specific Templates
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our professionally designed templates tailored for your industry. 
              Each template comes with pre-configured workflows, custom fields, and industry-specific features.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {templates.map((template) => {
            const Icon = template.icon
            return (
              <div
                key={template.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group border border-gray-200"
                onClick={() => setSelectedTemplate(template)}
              >
                <div className={`h-32 bg-gradient-to-r ${template.color} rounded-t-2xl flex items-center justify-center relative overflow-hidden`}>
                  <Icon className="w-16 h-16 text-white" />
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-sm`}>
                      {template.complexity}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{template.name}</h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span>4.9/5</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">{template.description}</p>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Monthly</span>
                      <span className="text-2xl font-bold text-gray-900">${template.pricing.monthly}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Setup Time</span>
                      <span className="text-sm font-medium text-gray-900 flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {template.setupTime}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {template.modules.slice(0, 3).map((module, index) => (
                        <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                          {module}
                        </span>
                      ))}
                      {template.modules.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                          +{template.modules.length - 3} more
                        </span>
                      )}
                    </div>
                    <button className="flex items-center text-purple-600 hover:text-purple-700 font-medium group-hover:translate-x-1 transition-transform">
                      View Details
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Template Detail Modal */}
        {selectedTemplate && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity bg-black bg-opacity-50" onClick={() => setSelectedTemplate(null)}></div>
              
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-6xl sm:w-full relative z-10">
                <div className="bg-white">
                  {/* Header */}
                  <div className={`h-64 bg-gradient-to-r ${selectedTemplate.color} flex items-center justify-center relative overflow-hidden`}>
                    <div className="text-center text-white">
                      <selectedTemplate.icon className="w-24 h-24 mx-auto mb-4" />
                      <h2 className="text-3xl font-bold">{selectedTemplate.name}</h2>
                      <p className="text-xl opacity-90">{selectedTemplate.industry} Industry</p>
                    </div>
                    <button
                      onClick={() => setSelectedTemplate(null)}
                      className="absolute top-4 right-4 text-white hover:text-gray-200 bg-black/20 rounded-full p-2"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  
                  {/* Tabs */}
                  <div className="border-b border-gray-200">
                    <nav className="flex space-x-8 px-8">
                      {[
                        { id: 'overview', label: 'Overview', icon: Info },
                        { id: 'features', label: 'Features', icon: CheckCircle },
                        { id: 'pricing', label: 'Pricing', icon: DollarSign },
                        { id: 'demo', label: 'Demo', icon: Play }
                      ].map((tab) => {
                        const Icon = tab.icon
                        return (
                          <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                              activeTab === tab.id
                                ? 'border-purple-500 text-purple-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                          >
                            <Icon className="w-4 h-4 mr-2" />
                            {tab.label}
                          </button>
                        )
                      })}
                    </nav>
                  </div>
                  
                  <div className="p-8">
                    {activeTab === 'overview' && (
                      <div className="space-y-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Template Overview</h3>
                            <p className="text-lg text-gray-700 mb-6">{selectedTemplate.description}</p>
                            
                            <div className="space-y-4">
                              <div className="flex items-center">
                                <Clock className="w-5 h-5 text-gray-400 mr-3" />
                                <span className="text-gray-700">Setup Time: <strong>{selectedTemplate.setupTime}</strong></span>
                              </div>
                              <div className="flex items-center">
                                {getComplexityIcon(selectedTemplate.complexity)}
                                <span className="text-gray-700 ml-3">Complexity: <strong>{selectedTemplate.complexity}</strong></span>
                              </div>
                              <div className="flex items-center">
                                <Users2 className="w-5 h-5 text-gray-400 mr-3" />
                                <span className="text-gray-700">Best for: <strong>{selectedTemplate.industry} companies</strong></span>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Included Modules</h3>
                            <div className="grid grid-cols-2 gap-3">
                              {selectedTemplate.modules.map((module, index) => (
                                <div key={index} className="flex items-center p-3 bg-purple-50 rounded-lg">
                                  <CheckCircle className="w-5 h-5 text-purple-500 mr-3" />
                                  <span className="text-gray-700 font-medium">{module}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        {/* Testimonials */}
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-6">What Our Customers Say</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {selectedTemplate.testimonials.map((testimonial, index) => (
                              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                                <div className="flex items-center mb-4">
                                  {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 text-yellow-400" />
                                  ))}
                                </div>
                                <p className="text-gray-700 mb-4">"{testimonial.comment}"</p>
                                <div>
                                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                                  <div className="text-sm text-gray-500">{testimonial.company}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {activeTab === 'features' && (
                      <div className="space-y-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {selectedTemplate.features.map((feature, index) => (
                            <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg">
                              <CheckCircle className="w-6 h-6 text-green-500 mr-4 mt-1 flex-shrink-0" />
                              <div>
                                <h4 className="font-semibold text-gray-900 mb-2">{feature}</h4>
                                <p className="text-gray-600 text-sm">Comprehensive feature designed to streamline your workflow and improve efficiency.</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                          <div className="text-center p-6 bg-blue-50 rounded-lg">
                            <ShieldCheck className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                            <h4 className="font-semibold text-gray-900 mb-2">Security</h4>
                            <p className="text-gray-600 text-sm">Enterprise-grade security with encryption and compliance standards.</p>
                          </div>
                          <div className="text-center p-6 bg-green-50 rounded-lg">
                            <Lightning className="w-12 h-12 text-green-500 mx-auto mb-4" />
                            <h4 className="font-semibold text-gray-900 mb-2">Performance</h4>
                            <p className="text-gray-600 text-sm">Optimized for speed and reliability with 99.9% uptime guarantee.</p>
                          </div>
                          <div className="text-center p-6 bg-purple-50 rounded-lg">
                            <BarChart3 className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                            <h4 className="font-semibold text-gray-900 mb-2">Analytics</h4>
                            <p className="text-gray-600 text-sm">Advanced reporting and analytics to track your business performance.</p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {activeTab === 'pricing' && (
                      <div className="space-y-8">
                        <div className="text-center">
                          <h3 className="text-2xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h3>
                          <p className="text-gray-600">Choose the plan that works best for your business</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                          <div className="border border-gray-200 rounded-lg p-8">
                            <h4 className="text-xl font-bold text-gray-900 mb-2">Monthly Plan</h4>
                            <div className="text-4xl font-bold text-gray-900 mb-4">${selectedTemplate.pricing.monthly}<span className="text-lg text-gray-500">/month</span></div>
                            <ul className="space-y-3 mb-6">
                              <li className="flex items-center">
                                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                                <span className="text-gray-700">All {selectedTemplate.modules.length} modules included</span>
                              </li>
                              <li className="flex items-center">
                                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                                <span className="text-gray-700">24/7 support</span>
                              </li>
                              <li className="flex items-center">
                                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                                <span className="text-gray-700">Free setup & training</span>
                              </li>
                              <li className="flex items-center">
                                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                                <span className="text-gray-700">Cancel anytime</span>
                              </li>
                            </ul>
                            <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors">
                              Start Monthly Plan
                            </button>
                          </div>
                          
                          <div className="border-2 border-purple-500 rounded-lg p-8 relative">
                            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                              <span className="bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-medium">Most Popular</span>
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-2">Yearly Plan</h4>
                            <div className="text-4xl font-bold text-gray-900 mb-4">${selectedTemplate.pricing.yearly}<span className="text-lg text-gray-500">/year</span></div>
                            <div className="text-green-600 font-semibold mb-4">Save ${(selectedTemplate.pricing.monthly * 12) - selectedTemplate.pricing.yearly} per year!</div>
                            <ul className="space-y-3 mb-6">
                              <li className="flex items-center">
                                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                                <span className="text-gray-700">All {selectedTemplate.modules.length} modules included</span>
                              </li>
                              <li className="flex items-center">
                                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                                <span className="text-gray-700">24/7 priority support</span>
                              </li>
                              <li className="flex items-center">
                                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                                <span className="text-gray-700">Free setup & training</span>
                              </li>
                              <li className="flex items-center">
                                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                                <span className="text-gray-700">Free migration assistance</span>
                              </li>
                            </ul>
                            <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors">
                              Start Yearly Plan
                            </button>
                          </div>
                        </div>
                        
                        <div className="text-center">
                          <p className="text-gray-600 mb-4">Need a custom solution? We offer enterprise plans with dedicated support.</p>
                          <button className="text-purple-600 hover:text-purple-700 font-medium">
                            Contact Sales <ExternalLink className="w-4 h-4 inline ml-1" />
                          </button>
                        </div>
                      </div>
                    )}
                    
                    {activeTab === 'demo' && (
                      <div className="space-y-8">
                        <div className="text-center">
                          <h3 className="text-2xl font-bold text-gray-900 mb-4">See It In Action</h3>
                          <p className="text-gray-600 mb-8">Experience the power of {selectedTemplate.name} with our interactive demo</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {selectedTemplate.screenshots.map((screenshot, index) => (
                            <div key={index} className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                              <div className="text-center">
                                <Eye className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                                <p className="text-gray-500">Screenshot {index + 1}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="text-center">
                          <button className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors mr-4">
                            <Play className="w-5 h-5 inline mr-2" />
                            Start Interactive Demo
                          </button>
                          <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                            <Download className="w-5 h-5 inline mr-2" />
                            Download Brochure
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Footer */}
                  <div className="bg-gray-50 px-8 py-6 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-4">
                        <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors">
                          <Play className="w-5 h-5 inline mr-2" />
                          Start Free Trial
                        </button>
                        <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                          <Download className="w-5 h-5 inline mr-2" />
                          Download Brochure
                        </button>
                      </div>
                      
                      <div className="text-sm text-gray-500">
                        <div>Setup Time: {selectedTemplate.setupTime}</div>
                        <div>Complexity: {selectedTemplate.complexity}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}