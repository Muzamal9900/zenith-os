import { ONBOARDING_STEPS } from './types'

export const ONBOARDING_CONFIG = {
  steps: ONBOARDING_STEPS,
  maxRetries: 3,
  timeout: 30000, // 30 seconds
  requiredFields: {
    configuration: ['branding.primaryColor', 'businessRules.workingHours.start', 'businessRules.workingHours.end'],
    'tool-selection': ['selectedTools'],
    'billing-plan': ['planType']
  },
  defaultValues: {
    branding: {
      primaryColor: '#3B82F6',
      secondaryColor: '#8B5CF6',
      fontFamily: 'Inter'
    },
    businessRules: {
      workingHours: {
        start: '09:00',
        end: '17:00',
        timezone: 'UTC'
      },
      leadResponseTime: 24,
      defaultCurrency: 'USD',
      language: 'en'
    },
    notifications: {
      email: true,
      sms: false,
      push: true
    }
  }
} as const
