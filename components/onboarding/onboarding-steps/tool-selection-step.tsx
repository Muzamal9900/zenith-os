"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Wrench, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle, 
  Users, 
  TrendingUp, 
  Clock, 
  Mail, 
  Phone, 
  MessageSquare,
  BarChart3,
  Target,
  Calendar,
  Building2,
  Star,
  DollarSign,
  Network,
  Zap,
  Shield,
  Activity,
  Sparkles,
  Eye,
  Settings
} from "lucide-react"
import { ToolSelectionData } from "@/modules/onboarding/types"

interface ToolSelectionStepProps {
  initialData?: Partial<ToolSelectionData>
  onNext: (data: ToolSelectionData) => void
  onBack?: () => void
  isLoading?: boolean
}

const availableTools = [
  {
    id: "contact-summary",
    name: "Contact Summary",
    description: "Comprehensive contact management with detailed insights and communication history",
    category: "Core CRM",
    icon: Users,
    color: "blue",
    gradient: "from-blue-500 to-blue-600",
    bgGradient: "from-blue-50 to-blue-100",
    features: ["Contact Management", "Communication History", "Lead Tracking", "Contact Analytics"]
  },
  {
    id: "deal-pipeline",
    name: "Deal Pipeline",
    description: "Track and manage your sales pipeline with visual deal progression",
    category: "Sales",
    icon: TrendingUp,
    color: "green",
    gradient: "from-green-500 to-green-600",
    bgGradient: "from-green-50 to-green-100",
    features: ["Pipeline Visualization", "Deal Tracking", "Sales Forecasting", "Revenue Analytics"]
  },
  {
    id: "recent-activities",
    name: "Recent Activities",
    description: "Monitor all recent activities and interactions across your CRM",
    category: "Activity",
    icon: Clock,
    color: "purple",
    gradient: "from-purple-500 to-purple-600",
    bgGradient: "from-purple-50 to-purple-100",
    features: ["Activity Timeline", "Interaction History", "Task Tracking", "Follow-up Reminders"]
  },
  {
    id: "email-tracker",
    name: "Email Tracker",
    description: "Track email communications and engagement metrics",
    category: "Communication",
    icon: Mail,
    color: "orange",
    gradient: "from-orange-500 to-orange-600",
    bgGradient: "from-orange-50 to-orange-100",
    features: ["Email Tracking", "Open Rates", "Click Tracking", "Response Analytics"]
  },
  {
    id: "call-scheduler",
    name: "Call Scheduler",
    description: "Schedule and manage customer calls with tracking and analytics",
    category: "Communication",
    icon: Phone,
    color: "teal",
    gradient: "from-teal-500 to-teal-600",
    bgGradient: "from-teal-50 to-teal-100",
    features: ["Call Scheduling", "Call Tracking", "Performance Metrics", "Call Analytics"]
  },
  {
    id: "company-insights",
    name: "Company Insights",
    description: "Analyze company performance and growth metrics",
    category: "Analytics",
    icon: Building2,
    color: "indigo",
    gradient: "from-indigo-500 to-indigo-600",
    bgGradient: "from-indigo-50 to-indigo-100",
    features: ["Company Analytics", "Growth Metrics", "Performance Tracking", "Revenue Analysis"]
  },
  {
    id: "task-manager",
    name: "Task Manager",
    description: "Organize and track tasks and follow-ups",
    category: "Productivity",
    icon: Target,
    color: "pink",
    gradient: "from-pink-500 to-pink-600",
    bgGradient: "from-pink-50 to-pink-100",
    features: ["Task Management", "Follow-up Tracking", "Completion Rates", "Task Analytics"]
  },
  {
    id: "chat-widget",
    name: "Live Chat",
    description: "Real-time customer support with integrated chat widget",
    category: "Communication",
    icon: MessageSquare,
    color: "cyan",
    gradient: "from-cyan-500 to-cyan-600",
    bgGradient: "from-cyan-50 to-cyan-100",
    features: ["Live Chat", "Response Tracking", "Customer Support", "Chat Analytics"]
  },
  {
    id: "performance-metrics",
    name: "Performance Metrics",
    description: "Comprehensive performance tracking and analytics",
    category: "Analytics",
    icon: BarChart3,
    color: "emerald",
    gradient: "from-emerald-500 to-emerald-600",
    bgGradient: "from-emerald-50 to-emerald-100",
    features: ["Performance Tracking", "KPI Monitoring", "Custom Reports", "Data Visualization"]
  },
  {
    id: "calendar-integration",
    name: "Calendar Integration",
    description: "Sync with Google Calendar and Outlook for seamless scheduling",
    category: "Integration",
    icon: Calendar,
    color: "violet",
    gradient: "from-violet-500 to-violet-600",
    bgGradient: "from-violet-50 to-violet-100",
    features: ["Calendar Sync", "Appointment Scheduling", "Meeting Tracking", "Availability Management"]
  },
  {
    id: "lead-scoring",
    name: "Lead Scoring",
    description: "Automatically score and prioritize leads based on behavior",
    category: "Sales",
    icon: Star,
    color: "amber",
    gradient: "from-amber-500 to-amber-600",
    bgGradient: "from-amber-50 to-amber-100",
    features: ["Lead Scoring", "Behavioral Tracking", "Priority Management", "Conversion Analytics"]
  },
  {
    id: "revenue-tracking",
    name: "Revenue Tracking",
    description: "Track revenue, deals, and financial performance",
    category: "Finance",
    icon: DollarSign,
    color: "lime",
    gradient: "from-lime-500 to-lime-600",
    bgGradient: "from-lime-50 to-lime-100",
    features: ["Revenue Tracking", "Deal Analytics", "Financial Reports", "Profit Analysis"]
  }
]

export default function ToolSelectionStep({ 
  initialData = {}, 
  onNext, 
  onBack,
  isLoading = false 
}: ToolSelectionStepProps) {
  const [selectedTools, setSelectedTools] = useState<string[]>(
    initialData.selectedTools || ["contact-summary", "deal-pipeline", "recent-activities"]
  )
  const [toolConfigurations, setToolConfigurations] = useState<Record<string, any>>(
    initialData.toolConfigurations || {}
  )

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (selectedTools.length === 0) {
      newErrors.tools = "Please select at least one tool to get started"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onNext({
        selectedTools,
        toolConfigurations
      })
    }
  }

  const handleToolToggle = (toolId: string) => {
    setSelectedTools(prev => {
      if (prev.includes(toolId)) {
        return prev.filter(id => id !== toolId)
      } else {
        return [...prev, toolId]
      }
    })
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Core CRM": return "bg-blue-100 text-blue-800"
      case "Sales": return "bg-green-100 text-green-800"
      case "Analytics": return "bg-purple-100 text-purple-800"
      case "Communication": return "bg-orange-100 text-orange-800"
      case "Activity": return "bg-indigo-100 text-indigo-800"
      case "Productivity": return "bg-pink-100 text-pink-800"
      case "Integration": return "bg-violet-100 text-violet-800"
      case "Finance": return "bg-emerald-100 text-emerald-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="w-full max-w-8xl mx-auto bg-gray-800/50 border-gray-700">
      <CardHeader className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <Wrench className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold text-white">Tool Selection</CardTitle>
        <CardDescription className="text-lg text-gray-400">
          Choose your initial set of plug-in tools.
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {errors.tools && (
            <div className="p-4 bg-red-900/30 border border-red-500/50 rounded-lg">
              <p className="text-sm text-red-400">{errors.tools}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableTools.map((tool) => {
              const isSelected = selectedTools.includes(tool.id)
              
              return (
                <div
                  key={tool.id}
                  className={`relative p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? "border-green-500 bg-green-900/30 shadow-lg"
                      : "border-gray-600 bg-gray-700/50 hover:border-gray-500 hover:bg-gray-700/70"
                  }`}
                  onClick={() => handleToolToggle(tool.id)}
                >
                  {/* Selection Indicator */}
                  {isSelected && (
                    <div className="absolute top-4 right-4 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  )}

                  {/* Tool Icon */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${tool.gradient} flex items-center justify-center mb-4 shadow-lg`}>
                    <tool.icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Tool Info */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-white">{tool.name}</h3>
                      <Badge className={getCategoryColor(tool.category)}>
                        {tool.category}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {tool.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-gray-300">Key Features:</p>
                      <ul className="text-xs text-gray-400 space-y-1">
                        {tool.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-1">
                            <div className="w-1 h-1 bg-gray-500 rounded-full" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Checkbox */}
                  <div className="mt-4 flex items-center">
                    <Checkbox
                      checked={isSelected}
                      onChange={() => handleToolToggle(tool.id)}
                      className="mr-2"
                      disabled={isLoading}
                    />
                    <span className="text-sm font-medium text-white">
                      {isSelected ? "Selected" : "Select Tool"}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Selection Summary */}
          {selectedTools.length > 0 && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">
                Selected Tools ({selectedTools.length})
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedTools.map((toolId) => {
                  const tool = availableTools.find(t => t.id === toolId)
                  return (
                    <Badge key={toolId} className="bg-blue-100 text-blue-800">
                      {tool?.name}
                    </Badge>
                  )
                })}
              </div>
            </div>
          )}

          <div className="flex justify-between pt-6">
            {onBack && (
              <Button
                type="button"
                variant="outline"
                onClick={onBack}
                disabled={isLoading}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            )}
            
            <Button
              type="submit"
              disabled={isLoading || selectedTools.length === 0}
              className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 ml-auto"
            >
              {isLoading ? (
                "Processing..."
              ) : (
                <>
                  Next Step
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
