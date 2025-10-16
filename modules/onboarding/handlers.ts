import { prisma } from '@/lib/prisma'
import { 
  OnboardingState, 
  OnboardingStep, 
  SignUpData, 
  ConfigurationData, 
  ToolSelectionData, 
  BillingPlanData,
  OnboardingStepId 
} from './types'
import { ONBOARDING_CONFIG } from './config'

export class OnboardingHandler {
  static async getOnboardingState(tenantId: string): Promise<OnboardingState | null> {
    try {
      const state = await prisma.onboardingState.findUnique({
        where: { tenantId }
      })

      if (!state) {
        return null
      }

      return {
        currentStep: state.currentStep,
        steps: state.steps as OnboardingStep[],
        isCompleted: state.isCompleted,
        tenantId: state.tenantId,
        createdAt: state.createdAt,
        updatedAt: state.updatedAt
      }
    } catch (error) {
      console.error('Error getting onboarding state:', error)
      throw new Error('Failed to get onboarding state')
    }
  }

  static async initializeOnboarding(tenantId: string): Promise<OnboardingState> {
    try {
      const steps: OnboardingStep[] = ONBOARDING_CONFIG.steps.map(step => ({
        id: step.id,
        title: step.title,
        description: step.description,
        completed: false
      }))

      const state = await prisma.onboardingState.upsert({
        where: { tenantId },
        update: {
          steps: steps as any,
          currentStep: 0,
          isCompleted: false,
          updatedAt: new Date()
        },
        create: {
          tenantId,
          steps: steps as any,
          currentStep: 0,
          isCompleted: false
        }
      })

      return {
        currentStep: state.currentStep,
        steps: state.steps as OnboardingStep[],
        isCompleted: state.isCompleted,
        tenantId: state.tenantId,
        createdAt: state.createdAt,
        updatedAt: state.updatedAt
      }
    } catch (error) {
      console.error('Error initializing onboarding:', error)
      throw new Error('Failed to initialize onboarding')
    }
  }

  static async updateStep(
    tenantId: string, 
    stepId: OnboardingStepId, 
    data: SignUpData | ConfigurationData | ToolSelectionData | BillingPlanData
  ): Promise<OnboardingState> {
    try {
      const currentState = await this.getOnboardingState(tenantId)
      if (!currentState) {
        throw new Error('Onboarding state not found')
      }

      const stepIndex = currentState.steps.findIndex(step => step.id === stepId)
      if (stepIndex === -1) {
        throw new Error('Invalid step ID')
      }

      // Update the step data and mark as completed
      const updatedSteps = [...currentState.steps]
      updatedSteps[stepIndex] = {
        ...updatedSteps[stepIndex],
        completed: true,
        data: data as any
      }

      // Determine next step
      const nextStep = Math.min(stepIndex + 1, updatedSteps.length - 1)
      const isCompleted = nextStep === updatedSteps.length - 1 && updatedSteps[nextStep].completed

      const updatedState = await prisma.onboardingState.update({
        where: { tenantId },
        data: {
          steps: updatedSteps as any,
          currentStep: nextStep,
          isCompleted,
          updatedAt: new Date()
        }
      })

      return {
        currentStep: updatedState.currentStep,
        steps: updatedState.steps as OnboardingStep[],
        isCompleted: updatedState.isCompleted,
        tenantId: updatedState.tenantId,
        createdAt: updatedState.createdAt,
        updatedAt: updatedState.updatedAt
      }
    } catch (error) {
      console.error('Error updating onboarding step:', error)
      throw new Error('Failed to update onboarding step')
    }
  }

  static async completeOnboarding(tenantId: string): Promise<OnboardingState> {
    try {
      const updatedState = await prisma.onboardingState.update({
        where: { tenantId },
        data: {
          isCompleted: true,
          updatedAt: new Date()
        }
      })

      return {
        currentStep: updatedState.currentStep,
        steps: updatedState.steps as OnboardingStep[],
        isCompleted: updatedState.isCompleted,
        tenantId: updatedState.tenantId,
        createdAt: updatedState.createdAt,
        updatedAt: updatedState.updatedAt
      }
    } catch (error) {
      console.error('Error completing onboarding:', error)
      throw new Error('Failed to complete onboarding')
    }
  }

  static async resetOnboarding(tenantId: string): Promise<OnboardingState> {
    try {
      const steps: OnboardingStep[] = ONBOARDING_CONFIG.steps.map(step => ({
        id: step.id,
        title: step.title,
        description: step.description,
        completed: false
      }))

      const updatedState = await prisma.onboardingState.update({
        where: { tenantId },
        data: {
          steps: steps as any,
          currentStep: 0,
          isCompleted: false,
          updatedAt: new Date()
        }
      })

      return {
        currentStep: updatedState.currentStep,
        steps: updatedState.steps as OnboardingStep[],
        isCompleted: updatedState.isCompleted,
        tenantId: updatedState.tenantId,
        createdAt: updatedState.createdAt,
        updatedAt: updatedState.updatedAt
      }
    } catch (error) {
      console.error('Error resetting onboarding:', error)
      throw new Error('Failed to reset onboarding')
    }
  }
}
