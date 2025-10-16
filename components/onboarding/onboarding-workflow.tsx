"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ArrowRight, Clock, Settings, Wrench, CreditCard } from "lucide-react"
import { OnboardingState, OnboardingStep } from "@/modules/onboarding/types"

interface OnboardingWorkflowProps {
  onboardingState: OnboardingState | null
  onStepClick?: (stepIndex: number) => void
  className?: string
}

const stepIcons = {
  signup: Settings,
  configuration: Settings,
  'tool-selection': Wrench,
  'billing-plan': CreditCard
}

const stepColors = {
  signup: "bg-blue-500",
  configuration: "bg-purple-500", 
  'tool-selection': "bg-green-500",
  'billing-plan': "bg-orange-500"
}

export default function OnboardingWorkflow({ 
  onboardingState, 
  onStepClick,
  className = "" 
}: OnboardingWorkflowProps) {
  if (!onboardingState) {
    return (
      <Card className={`${className}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-blue-500" />
            Onboarding Workflow
          </CardTitle>
          <CardDescription>
            Complete your setup to get started with your White Label OS
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Loading onboarding status...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const getStepStatus = (step: OnboardingStep, index: number) => {
    if (step.completed) return "completed"
    if (index === onboardingState.currentStep) return "current"
    if (index < onboardingState.currentStep) return "completed"
    return "pending"
  }

  const getStepBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Completed</Badge>
      case "current":
        return <Badge className="bg-blue-100 text-blue-800"><Clock className="w-3 h-3 mr-1" />Current</Badge>
      default:
        return <Badge variant="outline" className="text-gray-500">Pending</Badge>
    }
  }

  return (
    <Card className={`${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-blue-500" />
          Onboarding Workflow
        </CardTitle>
        <CardDescription>
          Complete your setup to get started with your White Label OS
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {onboardingState.steps.map((step, index) => {
            const status = getStepStatus(step, index)
            const IconComponent = stepIcons[step.id as keyof typeof stepIcons] || Settings
            const colorClass = stepColors[step.id as keyof typeof stepColors] || "bg-gray-500"
            const isClickable = onStepClick && (status === "current" || status === "completed")
            
            return (
              <div key={step.id} className="relative">
                {/* Connection Line */}
                {index < onboardingState.steps.length - 1 && (
                  <div className="absolute left-6 top-12 w-0.5 h-8 bg-gray-200" />
                )}
                
                <div 
                  className={`flex items-center gap-4 p-4 rounded-lg border transition-all duration-200 ${
                    status === "current" 
                      ? "border-blue-200 bg-blue-50/50 shadow-sm" 
                      : status === "completed"
                      ? "border-green-200 bg-green-50/30"
                      : "border-gray-200 bg-gray-50/30"
                  } ${isClickable ? "cursor-pointer hover:shadow-md" : ""}`}
                  onClick={() => isClickable && onStepClick?.(index)}
                >
                  {/* Step Icon */}
                  <div className={`w-12 h-12 rounded-xl ${colorClass} flex items-center justify-center shadow-lg`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  
                  {/* Step Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-900">{step.title}</h3>
                      {getStepBadge(status)}
                    </div>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                  
                  {/* Arrow */}
                  {isClickable && (
                    <ArrowRight className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>
            )
          })}
        </div>
        
        {/* Progress Summary */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              Progress: {onboardingState.steps.filter(s => s.completed).length} of {onboardingState.steps.length} steps
            </span>
            <span className="text-gray-900 font-medium">
              {Math.round((onboardingState.steps.filter(s => s.completed).length / onboardingState.steps.length) * 100)}% Complete
            </span>
          </div>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${(onboardingState.steps.filter(s => s.completed).length / onboardingState.steps.length) * 100}%` 
              }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
