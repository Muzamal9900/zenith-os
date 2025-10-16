import { prisma } from '@/lib/prisma'
import { OnboardingHandler } from './handlers'
import { OnboardingState, OnboardingStepId } from './types'

export class OnboardingLifecycle {
  static async onStepComplete(
    tenantId: string, 
    stepId: OnboardingStepId, 
    data: any
  ): Promise<OnboardingState> {
    // Update the step
    const updatedState = await OnboardingHandler.updateStep(tenantId, stepId, data)
    
    // Trigger any step-specific actions
    await this.triggerStepActions(stepId, data, tenantId)
    
    return updatedState
  }

  static async onOnboardingComplete(tenantId: string): Promise<OnboardingState> {
    // Complete the onboarding
    const completedState = await OnboardingHandler.completeOnboarding(tenantId)
    
    // Trigger completion actions
    await this.triggerCompletionActions(tenantId)
    
    return completedState
  }

  private static async triggerStepActions(
    stepId: OnboardingStepId, 
    data: any, 
    tenantId: string
  ): Promise<void> {
    switch (stepId) {
      case 'signup':
        await this.handleSignUpComplete(data, tenantId)
        break
      case 'configuration':
        await this.handleConfigurationComplete(data, tenantId)
        break
      case 'tool-selection':
        await this.handleToolSelectionComplete(data, tenantId)
        break
      case 'billing-plan':
        await this.handleBillingPlanComplete(data, tenantId)
        break
    }
  }

  private static async handleSignUpComplete(data: any, tenantId: string): Promise<void> {
    // Update tenant with signup data
    try {
      await prisma.tenant.update({
        where: { id: tenantId },
        data: {
          name: data.businessName,
          industry: data.industry,
          contactEmail: data.contactEmail,
          contactPhone: data.contactPhone,
          businessAddress: data.businessAddress
        }
      })
    } catch (error) {
      console.error('Error updating tenant with signup data:', error)
    }
  }

  private static async handleConfigurationComplete(data: any, tenantId: string): Promise<void> {
    // Update tenant with configuration data
    try {
      await prisma.tenant.update({
        where: { id: tenantId },
        data: {
          settings: {
            branding: data.branding,
            businessRules: data.businessRules,
            notifications: data.notifications
          }
        }
      })
    } catch (error) {
      console.error('Error updating tenant with configuration data:', error)
    }
  }

  private static async handleToolSelectionComplete(data: any, tenantId: string): Promise<void> {
    // Enable selected tools for the tenant
    try {
      for (const toolId of data.selectedTools) {
        await prisma.tenantTool.upsert({
          where: {
            tenantId_toolId: {
              tenantId,
              toolId
            }
          },
          update: {
            isEnabled: true,
            configuration: data.toolConfigurations[toolId] || {}
          },
          create: {
            tenantId,
            toolId,
            isEnabled: true,
            configuration: data.toolConfigurations[toolId] || {}
          }
        })
      }
    } catch (error) {
      console.error('Error enabling tools for tenant:', error)
    }
  }

  private static async handleBillingPlanComplete(data: any, tenantId: string): Promise<void> {
    // Update tenant with billing plan
    try {
      await prisma.tenant.update({
        where: { id: tenantId },
        data: {
          billingPlan: data.planType,
          billingSettings: {
            billingCycle: data.billingCycle,
            customPricing: data.customPricing
          }
        }
      })
    } catch (error) {
      console.error('Error updating tenant with billing plan:', error)
    }
  }

  private static async triggerCompletionActions(tenantId: string): Promise<void> {
    // Send welcome email
    // Initialize default workflows
    // Set up default templates
    // Create initial admin user permissions
    
    console.log(`Onboarding completed for tenant: ${tenantId}`)
  }
}
