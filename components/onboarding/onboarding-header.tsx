"use client"

import { CheckCircle, Clock, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { OnboardingStep } from "@/modules/onboarding/types"

interface OnboardingHeaderProps {
  currentStep: number
  steps: OnboardingStep[]
  onStepClick?: (stepIndex: number) => void
}

const stepIcons = {
  signup: "👤",
  configuration: "⚙️",
  'tool-selection': "🔧",
  'billing-plan': "💳"
}

const stepColors = {
  signup: "from-blue-500 to-blue-600",
  configuration: "from-purple-500 to-purple-600", 
  'tool-selection': "from-green-500 to-green-600",
  'billing-plan': "from-orange-500 to-orange-600"
}

export default function OnboardingHeader({ 
  currentStep, 
  steps, 
  onStepClick 
}: OnboardingHeaderProps) {
  const getStepStatus = (step: OnboardingStep, index: number) => {
    if (step.completed) return "completed"
    if (index === currentStep - 1) return "current"
    if (index < currentStep - 1) return "completed"
    return "pending"
  }

  const getStepBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 border-green-200"><CheckCircle className="w-3 h-3 mr-1" />Completed</Badge>
      case "current":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200"><Clock className="w-3 h-3 mr-1" />Current</Badge>
      default:
        return <Badge variant="outline" className="text-gray-500 border-gray-300">Pending</Badge>
    }
  }

  return (
    <div className="mb-8">
      {/* Main Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome to Your White Label OS
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Let's set up your complete service business blueprint in just a few steps
        </p>
      </div>

      {/* Steps Overview */}
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {steps.map((step, index) => {
            const status = getStepStatus(step, index)
            const isClickable = onStepClick && (status === "current" || status === "completed")
            const colorClass = stepColors[step.id as keyof typeof stepColors] || "from-gray-500 to-gray-600"
            
            return (
              <div
                key={step.id}
                className={`relative p-4 rounded-xl border-2 transition-all duration-200 ${
                  status === "current" 
                    ? "border-blue-300 bg-blue-50/50 shadow-lg" 
                    : status === "completed"
                    ? "border-green-300 bg-green-50/30"
                    : "border-gray-200 bg-white/50"
                } ${isClickable ? "cursor-pointer hover:shadow-md" : ""}`}
                onClick={() => isClickable && onStepClick?.(index)}
              >
                {/* Step Number & Icon */}
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${colorClass} flex items-center justify-center text-white text-sm font-bold shadow-lg`}>
                    {index + 1}
                  </div>
                  <div className="text-2xl">{stepIcons[step.id as keyof typeof stepIcons]}</div>
                </div>

                {/* Step Info */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 text-sm">{step.title}</h3>
                    {getStepBadge(status)}
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{step.description}</p>
                </div>

                {/* Connection Arrow */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute -right-2 top-1/2 transform -translate-y-1/2">
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Progress Summary */}
        <div className="mt-6 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/40">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 font-medium">
              Setup Progress
            </span>
            <span className="text-gray-900 font-semibold">
              {steps.filter(s => s.completed).length} of {steps.length} steps completed
            </span>
          </div>
          <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ 
                width: `${(steps.filter(s => s.completed).length / steps.length) * 100}%` 
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
