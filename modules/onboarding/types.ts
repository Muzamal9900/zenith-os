export interface OnboardingStep {
  id: string
  title: string
  description: string
  completed: boolean
  data?: Record<string, any>
}

export interface OnboardingState {
  currentStep: number
  steps: OnboardingStep[]
  isCompleted: boolean
  tenantId: string
  createdAt: Date
  updatedAt: Date
}

export interface SignUpData {
  businessType: string
  contactEmail: string
  contactPhone?: string
  businessAddress?: string
}

export interface ConfigurationData {
  branding: {
    logo?: string
    primaryColor: string
    secondaryColor: string
    fontFamily: string
    companyLogo?: string
    favicon?: string
    customDomain?: string
  }
  businessRules: {
    workingHours: {
      start: string
      end: string
      timezone: string
      workingDays: string[]
    }
    leadResponseTime: number // in hours
    defaultCurrency: string
    language: string
    businessType: string
    serviceArea: string[]
    pricingModel: string
    contractTerms: string
  }
  notifications: {
    email: boolean
    sms: boolean
    push: boolean
    slack: boolean
    webhook: boolean
  }
  integrations: {
    paymentGateway: string
    emailProvider: string
    calendarSync: boolean
    crmSync: boolean
  }
  security: {
    twoFactorAuth: boolean
    sessionTimeout: number
    ipWhitelist: string[]
    dataRetention: number
  }
}

export interface ToolSelectionData {
  selectedTools: string[]
  toolConfigurations: Record<string, any>
}

export interface BillingPlanData {
  planType: 'per-lead' | 'per-job' | 'monthly-subscription'
  billingCycle?: 'monthly' | 'yearly'
  customPricing?: {
    leadPrice?: number
    jobPrice?: number
    monthlyPrice?: number
  }
}

export interface OnboardingProgress {
  stepId: string
  stepIndex: number
  isCompleted: boolean
  data: Record<string, any>
  completedAt?: Date
}

export const ONBOARDING_STEPS = [
  {
    id: 'configuration',
    title: 'Configuration',
    description: 'Set up tenant configuration and branding.',
    order: 1
  },
  {
    id: 'tool-selection',
    title: 'Tool Selection',
    description: 'Choose your initial set of plug-in tools.',
    order: 2
  },
  {
    id: 'billing-plan',
    title: 'Billing Plan',
    description: 'Select your preferred monetization model.',
    order: 3
  }
] as const

export type OnboardingStepId = typeof ONBOARDING_STEPS[number]['id']
