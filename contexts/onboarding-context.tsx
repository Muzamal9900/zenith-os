"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useAuth } from './auth-context'
import { OnboardingState } from '@/modules/onboarding/types'

interface OnboardingContextType {
  onboardingState: OnboardingState | null
  isLoading: boolean
  isCompleted: boolean
  refreshOnboardingState: () => Promise<void>
  updateOnboardingStep: (stepId: string, data: any) => Promise<void>
  completeOnboarding: () => Promise<void>
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined)

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [onboardingState, setOnboardingState] = useState<OnboardingState | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isCompleted, setIsCompleted] = useState(false)
  const { token, user, isLoading: authLoading } = useAuth()

  const getHeaders = () => ({
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` })
  })

  const fetchOnboardingState = async (forceRefresh = false) => {
    if (!token || !user) {
      setIsLoading(false)
      return
    }

    // Check if we have cached onboarding state and it's completed
    const cachedState = localStorage.getItem('zenith_onboarding_state')
    const cachedCompletion = localStorage.getItem('zenith_onboarding_completed')
    
    if (!forceRefresh && cachedState && cachedCompletion === 'true') {
      try {
        const parsedState = JSON.parse(cachedState)
        setOnboardingState(parsedState)
        setIsCompleted(true)
        setIsLoading(false)
        return
      } catch (error) {
        console.error('Error parsing cached onboarding state:', error)
        // Fall through to fetch from API
      }
    }

    try {
      const response = await fetch("/api/onboarding", {
        headers: getHeaders()
      })
      
      if (response.ok) {
        const data = await response.json()
        setOnboardingState(data)
        setIsCompleted(data.isCompleted || false)
        
        // Cache the state and completion status
        localStorage.setItem('zenith_onboarding_state', JSON.stringify(data))
        localStorage.setItem('zenith_onboarding_completed', data.isCompleted ? 'true' : 'false')
      } else {
        console.error('Error fetching onboarding state:', response.statusText)
        setIsCompleted(false)
      }
    } catch (error) {
      console.error('Error fetching onboarding state:', error)
      setIsCompleted(false)
    } finally {
      setIsLoading(false)
    }
  }

  const refreshOnboardingState = async () => {
    await fetchOnboardingState(true) // Force refresh
  }

  const updateOnboardingStep = async (stepId: string, data: any) => {
    if (!token) return

    try {
      const response = await fetch(`/api/onboarding/${stepId}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(data)
      })

      if (response.ok) {
        const updatedState = await response.json()
        setOnboardingState(updatedState)
        setIsCompleted(updatedState.isCompleted || false)
        
        // Update cache
        localStorage.setItem('zenith_onboarding_state', JSON.stringify(updatedState))
        localStorage.setItem('zenith_onboarding_completed', updatedState.isCompleted ? 'true' : 'false')
      }
    } catch (error) {
      console.error('Error updating onboarding step:', error)
    }
  }

  const completeOnboarding = async () => {
    if (!token) return

    try {
      const response = await fetch("/api/onboarding", {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ action: "complete" })
      })

      if (response.ok) {
        const completedState = await response.json()
        setOnboardingState(completedState)
        setIsCompleted(true)
        
        // Update cache
        localStorage.setItem('zenith_onboarding_state', JSON.stringify(completedState))
        localStorage.setItem('zenith_onboarding_completed', 'true')
      }
    } catch (error) {
      console.error('Error completing onboarding:', error)
    }
  }

  useEffect(() => {
    if (!authLoading && user) {
      fetchOnboardingState()
    }
  }, [token, user, authLoading])

  // Clear cache on logout
  useEffect(() => {
    if (!user) {
      localStorage.removeItem('zenith_onboarding_state')
      localStorage.removeItem('zenith_onboarding_completed')
      setOnboardingState(null)
      setIsCompleted(false)
    }
  }, [user])

  const value: OnboardingContextType = {
    onboardingState,
    isLoading,
    isCompleted,
    refreshOnboardingState,
    updateOnboardingStep,
    completeOnboarding,
  }

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  )
}

export function useOnboarding() {
  const context = useContext(OnboardingContext)
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider')
  }
  return context
}
