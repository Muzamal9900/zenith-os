"use client"

import { useState, useEffect } from "react"
import ProtectedRoute from "@/components/protected-route"
import OnboardingLayout from "@/components/onboarding/onboarding-layout"
import OnboardingSidebar from "@/components/onboarding/onboarding-sidebar"
import ConfigurationStep from "@/components/onboarding/onboarding-steps/configuration-step"
import ToolSelectionStep from "@/components/onboarding/onboarding-steps/tool-selection-step"
import BillingPlanStep from "@/components/onboarding/onboarding-steps/billing-plan-step"
import { useToast } from "@/components/ui/toast"
import { useAuth } from "@/contexts/auth-context"
import { 
  OnboardingState, 
  ConfigurationData, 
  ToolSelectionData, 
  BillingPlanData,
  OnboardingStepId 
} from "@/modules/onboarding/types"
import { CheckCircle, ArrowRight, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function OnboardingPage() {
  const [onboardingState, setOnboardingState] = useState<OnboardingState | null>(null)
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { addToast } = useToast()
  const { token, user, isLoading: authLoading } = useAuth()

  const getHeaders = () => ({
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` })
  })

  const fetchOnboardingState = async () => {
    try {
      const response = await fetch("/api/onboarding", {
        headers: getHeaders()
      })
      
      if (response.ok) {
        const data = await response.json()
        setOnboardingState(data)
      } else {
        const errorData = await response.json().catch(() => ({ error: "Unknown error" }))
        addToast({ type: "error", title: errorData.error || "Failed to fetch onboarding state" })
      }
    } catch (error) {
      addToast({ type: "error", title: "Error fetching onboarding state" })
    } finally {
      setLoading(false)
    }
  }

  const updateOnboardingStep = async (stepId: OnboardingStepId, data: any) => {
    setIsSubmitting(true)
    
    try {
      const response = await fetch(`/api/onboarding/${stepId}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(data)
      })

      if (response.ok) {
        const updatedState = await response.json()
        setOnboardingState(updatedState)
        addToast({ type: "success", title: "Step completed successfully!" })
        
        // If this was the last step, complete onboarding
        if (updatedState.isCompleted) {
          addToast({ 
            type: "success", 
            title: "🎉 Onboarding Complete!", 
            description: "Your White Label OS is ready to use!" 
          })
          // Redirect to portal after a short delay
          setTimeout(() => {
            window.location.href = '/portal'
          }, 2000)
        }
      } else {
        const error = await response.json()
        addToast({ type: "error", title: error.error || "Failed to update step" })
      }
    } catch (error) {
      addToast({ type: "error", title: "Error updating step" })
    } finally {
      setIsSubmitting(false)
    }
  }

  const completeOnboarding = async () => {
    setIsSubmitting(true)
    
    try {
      const response = await fetch("/api/onboarding", {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ action: "complete" })
      })

      if (response.ok) {
        const completedState = await response.json()
        setOnboardingState(completedState)
        addToast({ 
          type: "success", 
          title: "🎉 Onboarding Complete!", 
          description: "Your White Label OS is ready to use!" 
        })
      } else {
        const error = await response.json()
        addToast({ type: "error", title: error.error || "Failed to complete onboarding" })
      }
    } catch (error) {
      addToast({ type: "error", title: "Error completing onboarding" })
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    if (!authLoading) {
      fetchOnboardingState()
    }
  }, [token, user, authLoading])

  const handleStepClick = (stepIndex: number) => {
    // Navigate to the specific step
    const step = onboardingState?.steps[stepIndex]
    if (step && !step.completed) {
      // Could implement step navigation here
    }
  }

  const handleSignUpNext = (data: SignUpData) => {
    updateOnboardingStep("signup", data)
  }

  const handleConfigurationNext = (data: ConfigurationData) => {
    updateOnboardingStep("configuration", data)
  }

  const handleToolSelectionNext = (data: ToolSelectionData) => {
    updateOnboardingStep("tool-selection", data)
  }

  const handleBillingPlanNext = (data: BillingPlanData) => {
    updateOnboardingStep("billing-plan", data)
  }

  const getCurrentStepComponent = () => {
    if (!onboardingState) return null

    const currentStep = onboardingState.steps[onboardingState.currentStep]
    if (!currentStep) return null

    switch (currentStep.id) {
      case "signup":
        return (
          <SignUpStep
            initialData={currentStep.data}
            onNext={handleSignUpNext}
            isLoading={isSubmitting}
          />
        )
      case "configuration":
        return (
          <ConfigurationStep
            initialData={currentStep.data}
            onNext={handleConfigurationNext}
            onBack={() => {/* Could implement back navigation */}}
            isLoading={isSubmitting}
          />
        )
      case "tool-selection":
        return (
          <ToolSelectionStep
            initialData={currentStep.data}
            onNext={handleToolSelectionNext}
            onBack={() => {/* Could implement back navigation */}}
            isLoading={isSubmitting}
          />
        )
      case "billing-plan":
        return (
          <BillingPlanStep
            initialData={currentStep.data}
            onNext={handleBillingPlanNext}
            onBack={() => {/* Could implement back navigation */}}
            isLoading={isSubmitting}
          />
        )
      default:
        return null
    }
  }

  if (loading) {
    return (
      <ProtectedRoute>
        <OnboardingLayout 
          currentStep={1} 
          totalSteps={4}
          sidebar={
            <OnboardingSidebar
              currentStep={1}
              steps={[]}
            />
          }
        >
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Loading onboarding...</p>
            </div>
          </div>
        </OnboardingLayout>
      </ProtectedRoute>
    )
  }

  // If onboarding is completed, show completion screen
  if (onboardingState?.isCompleted) {
    return (
      <ProtectedRoute>
        <OnboardingLayout 
          currentStep={4} 
          totalSteps={4}
          sidebar={
            <OnboardingSidebar
              currentStep={4}
              steps={onboardingState.steps}
            />
          }
        >
          <div className="max-w-2xl mx-auto py-12">
            <Card className="text-center">
              <CardHeader>
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
                  🎉 Onboarding Complete!
                </CardTitle>
                <CardDescription className="text-lg text-gray-600">
                  Your White Label OS is ready to use. You can now start managing your business operations.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-3">What's Next?</h3>
                  <ul className="text-sm text-green-800 space-y-2 text-left">
                    <li>• Explore your dashboard and customize your workspace</li>
                    <li>• Add your first contacts and companies</li>
                    <li>• Set up your first deals and activities</li>
                    <li>• Configure integrations and tools</li>
                    <li>• Invite team members to collaborate</li>
                  </ul>
                </div>
                
                <div className="flex justify-center gap-4">
                  <Link href="/portal">
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      <Home className="w-4 h-4 mr-2" />
                      Go to Dashboard
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    onClick={() => fetchOnboardingState()}
                    disabled={isSubmitting}
                  >
                    View Progress
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </OnboardingLayout>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <OnboardingLayout 
        currentStep={onboardingState?.currentStep + 1 || 1} 
        totalSteps={4}
        sidebar={
          <OnboardingSidebar
            currentStep={onboardingState?.currentStep + 1 || 1}
            steps={onboardingState?.steps || []}
            onStepClick={handleStepClick}
          />
        }
      >
        <div className="space-y-8 animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
          {/* Main Content */}
          <div className="flex justify-center">
            {getCurrentStepComponent()}
          </div>
        </div>
      </OnboardingLayout>
    </ProtectedRoute>
  )
}
