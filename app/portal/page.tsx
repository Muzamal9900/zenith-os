"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import ProtectedRoute from "@/components/protected-route"
import PortalLayout from "@/components/portal-layout"
import PortalDashboard from "@/components/portal-dashboard"
import { useAuth } from "@/contexts/auth-context"
import { useOnboarding } from "@/contexts/onboarding-context"

export default function PortalPage() {
  const { user, isLoading: authLoading } = useAuth()
  const { isCompleted, isLoading: onboardingLoading } = useOnboarding()
  const router = useRouter()

  useEffect(() => {
    if (!authLoading && !onboardingLoading && user) {
      // If onboarding is not completed, redirect to onboarding
      if (!isCompleted) {
        router.push('/onboarding')
        return
      }
    }
  }, [isCompleted, authLoading, onboardingLoading, user, router])

  if (authLoading || onboardingLoading) {
    return (
      <ProtectedRoute>
        <PortalLayout>
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-400">Loading...</p>
            </div>
          </div>
        </PortalLayout>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <PortalLayout>
        <PortalDashboard />
      </PortalLayout>
    </ProtectedRoute>
  )
}