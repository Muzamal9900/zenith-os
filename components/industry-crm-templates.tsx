"use client"

import { useState, useEffect, useRef } from "react"
import { 
  Wrench, 
  Heart, 
  Truck, 
  Building2, 
  Wallet,
  AlertTriangle,
  Phone,
  Calendar,
  FileText,
  Shield,
  Clock,
  CheckCircle,
  XCircle,
  Plus,
  Search,
  Filter
} from "lucide-react"

interface IndustryTemplate {
  id: string
  name: string
  icon: any
  color: string
  description: string
  features: string[]
  workflows: WorkflowStep[]
  customFields: CustomField[]
}

interface WorkflowStep {
  id: string
  name: string
  description: string
  status: 'active' | 'pending' | 'completed'
  estimatedTime: string
}

interface CustomField {
  id: string
  name: string
  type: 'text' | 'select' | 'date' | 'number' | 'boolean'
  required: boolean
  options?: string[]
}

export default function IndustryCRMTemplates() {
  const [selectedTemplate, setSelectedTemplate] = useState('restoration')
  const [activeWorkflow, setActiveWorkflow] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  const industryTemplates: IndustryTemplate[] = [
    {
      id: 'restoration',
      name: 'Restoration',
      icon: Wrench,
      color: 'from-red-500 to-pink-500',
      description: 'Water damage, fire restoration, mould remediation management',
      features: ['Emergency Response', 'Insurance Claims', 'Project Tracking', 'Damage Assessment'],
      workflows: [
        {
          id: '1',
          name: 'Emergency Call Received',
          description: 'Initial emergency call from client',
          status: 'active',
          estimatedTime: '5 minutes'
        },
        {
          id: '2',
          name: 'Damage Assessment',
          description: 'On-site damage evaluation and documentation',
          status: 'pending',
          estimatedTime: '2 hours'
        },
        {
          id: '3',
          name: 'Insurance Claim Filing',
          description: 'File insurance claim with documentation',
          status: 'pending',
          estimatedTime: '1 hour'
        },
        {
          id: '4',
          name: 'Work Authorization',
          description: 'Get client and insurance approval to proceed',
          status: 'pending',
          estimatedTime: '1 day'
        },
        {
          id: '5',
          name: 'Restoration Work',
          description: 'Perform restoration services',
          status: 'pending',
          estimatedTime: '3-7 days'
        },
        {
          id: '6',
          name: 'Project Completion',
          description: 'Final inspection and project closure',
          status: 'pending',
          estimatedTime: '2 hours'
        }
      ],
      customFields: [
        { id: '1', name: 'Damage Type', type: 'select', required: true, options: ['Water', 'Fire', 'Mould', 'Storm', 'Other'] },
        { id: '2', name: 'Insurance Provider', type: 'text', required: true },
        { id: '3', name: 'Claim Number', type: 'text', required: false },
        { id: '4', name: 'Emergency Contact', type: 'text', required: true },
        { id: '5', name: 'Property Address', type: 'text', required: true },
        { id: '6', name: 'Estimated Damage Value', type: 'number', required: false }
      ]
    },
    {
      id: 'healthcare',
      name: 'Healthcare',
      icon: Heart,
      color: 'from-emerald-500 to-teal-500',
      description: 'Patient management, appointments, medical records',
      features: ['Patient Portal', 'Appointment Scheduling', 'Medical Records', 'Insurance Verification'],
      workflows: [
        {
          id: '1',
          name: 'Patient Registration',
          description: 'New patient registration and intake',
          status: 'active',
          estimatedTime: '15 minutes'
        },
        {
          id: '2',
          name: 'Insurance Verification',
          description: 'Verify patient insurance coverage',
          status: 'pending',
          estimatedTime: '10 minutes'
        },
        {
          id: '3',
          name: 'Appointment Scheduling',
          description: 'Schedule patient appointments',
          status: 'pending',
          estimatedTime: '5 minutes'
        },
        {
          id: '4',
          name: 'Medical Consultation',
          description: 'Conduct medical consultation',
          status: 'pending',
          estimatedTime: '30-60 minutes'
        },
        {
          id: '5',
          name: 'Treatment Plan',
          description: 'Develop and document treatment plan',
          status: 'pending',
          estimatedTime: '20 minutes'
        },
        {
          id: '6',
          name: 'Follow-up Scheduling',
          description: 'Schedule follow-up appointments',
          status: 'pending',
          estimatedTime: '5 minutes'
        }
      ],
      customFields: [
        { id: '1', name: 'Patient ID', type: 'text', required: true },
        { id: '2', name: 'Date of Birth', type: 'date', required: true },
        { id: '3', name: 'Insurance Provider', type: 'text', required: true },
        { id: '4', name: 'Policy Number', type: 'text', required: true },
        { id: '5', name: 'Emergency Contact', type: 'text', required: true },
        { id: '6', name: 'Medical History', type: 'text', required: false }
      ]
    },
    {
      id: 'logistics',
      name: 'Logistics',
      icon: Truck,
      color: 'from-orange-500 to-amber-500',
      description: 'Shipment tracking, fleet management, delivery coordination',
      features: ['Fleet Tracking', 'Route Optimization', 'Delivery Management', 'Customer Communication'],
      workflows: [
        {
          id: '1',
          name: 'Order Received',
          description: 'New shipment order received',
          status: 'active',
          estimatedTime: '5 minutes'
        },
        {
          id: '2',
          name: 'Route Planning',
          description: 'Plan optimal delivery route',
          status: 'pending',
          estimatedTime: '15 minutes'
        },
        {
          id: '3',
          name: 'Fleet Assignment',
          description: 'Assign vehicle and driver',
          status: 'pending',
          estimatedTime: '10 minutes'
        },
        {
          id: '4',
          name: 'Pickup Coordination',
          description: 'Coordinate pickup with sender',
          status: 'pending',
          estimatedTime: '30 minutes'
        },
        {
          id: '5',
          name: 'In Transit',
          description: 'Shipment in transit with tracking',
          status: 'pending',
          estimatedTime: '1-3 days'
        },
        {
          id: '6',
          name: 'Delivery Confirmation',
          description: 'Confirm successful delivery',
          status: 'pending',
          estimatedTime: '5 minutes'
        }
      ],
      customFields: [
        { id: '1', name: 'Tracking Number', type: 'text', required: true },
        { id: '2', name: 'Package Weight', type: 'number', required: true },
        { id: '3', name: 'Package Dimensions', type: 'text', required: true },
        { id: '4', name: 'Delivery Address', type: 'text', required: true },
        { id: '5', name: 'Special Instructions', type: 'text', required: false },
        { id: '6', name: 'Delivery Time Window', type: 'select', required: true, options: ['Morning', 'Afternoon', 'Evening', 'Anytime'] }
      ]
    },
    {
      id: 'real-estate',
      name: 'Real Estate',
      icon: Building2,
      color: 'from-blue-500 to-cyan-500',
      description: 'Property listings, client management, transaction tracking',
      features: ['Property Listings', 'Client Portals', 'Transaction Management', 'Lead Tracking'],
      workflows: [
        {
          id: '1',
          name: 'Lead Generation',
          description: 'New lead captured from various sources',
          status: 'active',
          estimatedTime: '5 minutes'
        },
        {
          id: '2',
          name: 'Initial Contact',
          description: 'First contact with potential client',
          status: 'pending',
          estimatedTime: '30 minutes'
        },
        {
          id: '3',
          name: 'Needs Assessment',
          description: 'Assess client property needs and budget',
          status: 'pending',
          estimatedTime: '1 hour'
        },
        {
          id: '4',
          name: 'Property Search',
          description: 'Search and present suitable properties',
          status: 'pending',
          estimatedTime: '2 hours'
        },
        {
          id: '5',
          name: 'Property Viewing',
          description: 'Schedule and conduct property viewings',
          status: 'pending',
          estimatedTime: '1-2 hours'
        },
        {
          id: '6',
          name: 'Offer Negotiation',
          description: 'Negotiate offers and terms',
          status: 'pending',
          estimatedTime: '1-3 days'
        }
      ],
      customFields: [
        { id: '1', name: 'Property Type', type: 'select', required: true, options: ['Residential', 'Commercial', 'Land', 'Investment'] },
        { id: '2', name: 'Budget Range', type: 'text', required: true },
        { id: '3', name: 'Preferred Location', type: 'text', required: true },
        { id: '4', name: 'Property Size', type: 'number', required: false },
        { id: '5', name: 'Bedrooms', type: 'number', required: false },
        { id: '6', name: 'Financing Status', type: 'select', required: true, options: ['Pre-approved', 'Pre-qualified', 'Cash', 'Need Financing'] }
      ]
    },
    {
      id: 'fintech',
      name: 'FinTech',
      icon: Wallet,
      color: 'from-green-500 to-emerald-500',
      description: 'Investment management, portfolio tracking, financial services',
      features: ['Portfolio Management', 'Investment Tracking', 'Risk Assessment', 'Client Reporting'],
      workflows: [
        {
          id: '1',
          name: 'Client Onboarding',
          description: 'New client registration and KYC',
          status: 'active',
          estimatedTime: '30 minutes'
        },
        {
          id: '2',
          name: 'Risk Assessment',
          description: 'Assess client risk tolerance and goals',
          status: 'pending',
          estimatedTime: '1 hour'
        },
        {
          id: '3',
          name: 'Portfolio Analysis',
          description: 'Analyze current portfolio and needs',
          status: 'pending',
          estimatedTime: '2 hours'
        },
        {
          id: '4',
          name: 'Investment Strategy',
          description: 'Develop personalized investment strategy',
          status: 'pending',
          estimatedTime: '1 hour'
        },
        {
          id: '5',
          name: 'Portfolio Implementation',
          description: 'Implement investment recommendations',
          status: 'pending',
          estimatedTime: '1 day'
        },
        {
          id: '6',
          name: 'Ongoing Monitoring',
          description: 'Monitor portfolio performance and rebalancing',
          status: 'pending',
          estimatedTime: 'Ongoing'
        }
      ],
      customFields: [
        { id: '1', name: 'Investment Amount', type: 'number', required: true },
        { id: '2', name: 'Risk Tolerance', type: 'select', required: true, options: ['Conservative', 'Moderate', 'Aggressive'] },
        { id: '3', name: 'Investment Goals', type: 'text', required: true },
        { id: '4', name: 'Time Horizon', type: 'select', required: true, options: ['Short-term', 'Medium-term', 'Long-term'] },
        { id: '5', name: 'Previous Experience', type: 'select', required: true, options: ['Beginner', 'Intermediate', 'Advanced'] },
        { id: '6', name: 'Income Level', type: 'select', required: true, options: ['Under $50k', '$50k-$100k', '$100k-$250k', 'Over $250k'] }
      ]
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

  const currentTemplate = industryTemplates.find(t => t.id === selectedTemplate)!

  return (
    <div ref={sectionRef} className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-2xl font-semibold text-gray-900">Industry CRM Templates</h1>
            <p className="text-gray-600">Pre-built CRM workflows for different industries</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Industry Selector */}
        <div className="fade-in-element mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {industryTemplates.map((template) => {
              const Icon = template.icon
              return (
                <button
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                  className={`p-6 rounded-xl border transition-all duration-300 text-left ${
                    selectedTemplate === template.id
                      ? `bg-gradient-to-r ${template.color} text-white border-transparent shadow-lg`
                      : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Icon className="w-6 h-6" />
                    <h3 className="text-lg font-semibold">{template.name}</h3>
                  </div>
                  <p className={`text-sm ${selectedTemplate === template.id ? 'text-white/90' : 'text-gray-600'}`}>
                    {template.description}
                  </p>
                </button>
              )
            })}
          </div>
        </div>

        {/* Template Details */}
        <div className="fade-in-element grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Workflow Steps */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Workflow Steps</h3>
            <div className="space-y-4">
              {currentTemplate.workflows.map((step, index) => (
                <div
                  key={step.id}
                  className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer ${
                    step.status === 'active'
                      ? 'border-blue-500 bg-blue-50'
                      : step.status === 'completed'
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                  onClick={() => setActiveWorkflow(index)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step.status === 'active'
                        ? 'bg-blue-500 text-white'
                        : step.status === 'completed'
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {step.status === 'completed' ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <span className="text-sm font-semibold">{index + 1}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{step.name}</h4>
                      <p className="text-sm text-gray-600">{step.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-500">{step.estimatedTime}</span>
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      step.status === 'active'
                        ? 'bg-blue-100 text-blue-800'
                        : step.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {step.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Custom Fields */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Custom Fields</h3>
            <div className="space-y-4">
              {currentTemplate.customFields.map((field) => (
                <div key={field.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{field.name}</h4>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        field.required ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {field.required ? 'Required' : 'Optional'}
                      </span>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {field.type}
                      </span>
                    </div>
                  </div>
                  {field.options && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-600 mb-2">Options:</p>
                      <div className="flex flex-wrap gap-2">
                        {field.options.map((option, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                          >
                            {option}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features Overview */}
        <div className="fade-in-element mt-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Industry Features</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {currentTemplate.features.map((feature, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-100"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-900">{feature}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Implementation CTA */}
        <div className="fade-in-element mt-8">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Implement {currentTemplate.name} CRM?</h3>
            <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
              Get a customized CRM system for your {currentTemplate.name.toLowerCase()} business with all the workflows and features you need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-purple-900 hover:bg-white/90 font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105">
                Start Implementation
              </button>
              <button className="border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105">
                View Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
