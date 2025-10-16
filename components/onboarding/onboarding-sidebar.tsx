"use client"

import { CheckCircle, Clock, ArrowRight, User, Settings, Wrench, CreditCard } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { OnboardingStep } from "@/modules/onboarding/types"

interface OnboardingSidebarProps {
  currentStep: number
  steps: OnboardingStep[]
  onStepClick?: (stepIndex: number) => void
  className?: string
}

const stepIcons = {
  signup: User,
  configuration: Settings,
  'tool-selection': Wrench,
  'billing-plan': CreditCard
}

const stepColors = {
  signup: "from-blue-500 to-blue-600",
  configuration: "from-purple-500 to-purple-600", 
  'tool-selection': "from-green-500 to-green-600",
  'billing-plan': "from-orange-500 to-orange-600"
}

export default function OnboardingSidebar({ 
  currentStep, 
  steps, 
  onStepClick,
  className = "" 
}: OnboardingSidebarProps) {
  const getStepStatus = (step: OnboardingStep, index: number) => {
    if (step.completed) return "completed"
    if (index === currentStep - 1) return "current"
    if (index < currentStep - 1) return "completed"
    return "pending"
  }

  const getStepBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (<CheckCircle className="w-4 h-4 text-green-500" />)
      case "current":
        return (<Clock className="w-4 h-4 text-blue-500" />)
      default:
        return (<div className="w-4 h-4 rounded-full border-2 border-gray-300" />)
    }
  }

  const progressPercentage = (steps.filter(s => s.completed).length / steps.length) * 100

  return (
    <div className={`w-80 bg-gray-900 border-r border-gray-700 flex flex-col sticky top-0 h-screen overflow-y-auto ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 shadow-lg shadow-indigo-500/25" />
          <div>
            <h2 className="text-lg font-semibold text-white">Setup Progress</h2>
            <p className="text-xs text-gray-400">Complete your configuration</p>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Progress</span>
            <span className="font-medium text-white">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Steps Navigation */}
      <div className="flex-1 p-6">
        <nav className="space-y-2">
          {steps && steps.length > 0 ? steps.map((step, index) => {
            const status = getStepStatus(step, index)
            const isClickable = onStepClick && (status === "current" || status === "completed")
            const colorClass = stepColors[step.id as keyof typeof stepColors] || "from-gray-500 to-gray-600"
            const IconComponent = stepIcons[step.id as keyof typeof stepIcons] || Settings
            
            return (
              <div key={step.id} className="relative">
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-6 top-12 w-0.5 h-8 bg-gray-600" />
                )}
                
                <button
                  onClick={() => isClickable && onStepClick?.(index)}
                  disabled={!isClickable}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-200 text-left ${
                    status === "current" 
                      ? "bg-blue-900/30 border-2 border-blue-500/50 shadow-sm" 
                      : status === "completed"
                      ? "bg-green-900/30 border-2 border-green-500/50 hover:bg-green-900/40"
                      : "bg-gray-800/50 border-2 border-gray-600 hover:bg-gray-800/70"
                  } ${isClickable ? "cursor-pointer" : "cursor-not-allowed opacity-60"}`}
                >
                  {/* Step Icon */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${colorClass} flex items-center justify-center shadow-lg flex-shrink-0`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  
                  {/* Step Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-white text-sm">{step.title}</h3>
                      {getStepBadge(status)}
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed">{step.description}</p>
                  </div>
                  
                  {/* Arrow */}
                  {isClickable && status === "current" && (
                    <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  )}
                </button>
              </div>
            )
          }) : <div className="text-gray-400 text-sm">No steps available</div>}
        </nav>
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-gray-700 bg-gray-800/50">
        <div className="text-center">
          <p className="text-xs text-gray-400 mb-2">
            Step {currentStep} of {steps.length}
          </p>
          <div className="flex justify-center gap-1">
            {Array.from({ length: steps.length }, (_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  i < currentStep - 1 
                    ? 'bg-green-500' 
                    : i === currentStep - 1 
                    ? 'bg-blue-500' 
                    : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
