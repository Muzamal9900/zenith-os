"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Palette, ArrowRight, ArrowLeft, Shield, Zap, Settings } from "lucide-react"
import { ConfigurationData } from "@/modules/onboarding/types"

interface ConfigurationStepProps {
  initialData?: Partial<ConfigurationData>
  onNext: (data: ConfigurationData) => void
  onBack?: () => void
  isLoading?: boolean
}

const fontFamilies = [
  "Inter",
  "Roboto", 
  "Open Sans",
  "Lato",
  "Montserrat",
  "Poppins",
  "Source Sans Pro",
  "Nunito"
]

const timezones = [
  "UTC",
  "America/New_York",
  "America/Chicago", 
  "America/Denver",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "Asia/Tokyo",
  "Asia/Shanghai",
  "Australia/Sydney"
]

const currencies = [
  "USD",
  "EUR", 
  "GBP",
  "CAD",
  "AUD",
  "JPY",
  "CHF",
  "CNY"
]

const languages = [
  "en",
  "es",
  "fr", 
  "de",
  "it",
  "pt",
  "ja",
  "zh"
]

const workingDays = [
  "Monday",
  "Tuesday", 
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
]

const businessTypes = [
  "Consulting",
  "Marketing Agency",
  "Web Development",
  "Design Studio",
  "Digital Marketing",
  "Content Creation",
  "E-commerce",
  "SaaS",
  "Professional Services",
  "Other"
]

const serviceAreas = [
  "Local",
  "National",
  "International",
  "North America",
  "Europe",
  "Asia",
  "Australia",
  "Global"
]

const pricingModels = [
  "Hourly Rate",
  "Fixed Price",
  "Retainer",
  "Commission",
  "Subscription",
  "Value-Based",
  "Hybrid"
]

const contractTerms = [
  "Standard Terms",
  "Custom Terms",
  "Industry Standard",
  "Flexible Terms",
  "Long-term Contracts",
  "Project-based"
]

const paymentGateways = [
  "Stripe",
  "PayPal",
  "Square",
  "Authorize.Net",
  "Braintree",
  "Razorpay",
  "Other"
]

const emailProviders = [
  "Gmail",
  "Outlook",
  "SendGrid",
  "Mailchimp",
  "Constant Contact",
  "Custom SMTP",
  "Other"
]

export default function ConfigurationStep({ 
  initialData = {}, 
  onNext, 
  onBack,
  isLoading = false 
}: ConfigurationStepProps) {
  const [formData, setFormData] = useState<ConfigurationData>({
    branding: {
      primaryColor: initialData.branding?.primaryColor || "#3B82F6",
      secondaryColor: initialData.branding?.secondaryColor || "#8B5CF6", 
      fontFamily: initialData.branding?.fontFamily || "Inter",
      companyLogo: initialData.branding?.companyLogo || "",
      favicon: initialData.branding?.favicon || "",
      customDomain: initialData.branding?.customDomain || ""
    },
    businessRules: {
      workingHours: {
        start: initialData.businessRules?.workingHours?.start || "09:00",
        end: initialData.businessRules?.workingHours?.end || "17:00",
        timezone: initialData.businessRules?.workingHours?.timezone || "UTC",
        workingDays: initialData.businessRules?.workingHours?.workingDays || ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
      },
      leadResponseTime: initialData.businessRules?.leadResponseTime || 24,
      defaultCurrency: initialData.businessRules?.defaultCurrency || "USD",
      language: initialData.businessRules?.language || "en",
      businessType: initialData.businessRules?.businessType || "",
      serviceArea: initialData.businessRules?.serviceArea || ["Local"],
      pricingModel: initialData.businessRules?.pricingModel || "",
      contractTerms: initialData.businessRules?.contractTerms || ""
    },
    notifications: {
      email: initialData.notifications?.email ?? true,
      sms: initialData.notifications?.sms ?? false,
      push: initialData.notifications?.push ?? true,
      slack: initialData.notifications?.slack ?? false,
      webhook: initialData.notifications?.webhook ?? false
    },
    integrations: {
      paymentGateway: initialData.integrations?.paymentGateway || "",
      emailProvider: initialData.integrations?.emailProvider || "",
      calendarSync: initialData.integrations?.calendarSync ?? false,
      crmSync: initialData.integrations?.crmSync ?? false
    },
    security: {
      twoFactorAuth: initialData.security?.twoFactorAuth ?? false,
      sessionTimeout: initialData.security?.sessionTimeout || 8,
      ipWhitelist: initialData.security?.ipWhitelist || [],
      dataRetention: initialData.security?.dataRetention || 365
    }
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.branding.primaryColor) {
      newErrors.primaryColor = "Primary color is required"
    }

    if (!formData.branding.secondaryColor) {
      newErrors.secondaryColor = "Secondary color is required"
    }

    if (!formData.businessRules.workingHours.start) {
      newErrors.workingStart = "Working hours start time is required"
    }

    if (!formData.businessRules.workingHours.end) {
      newErrors.workingEnd = "Working hours end time is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      console.log('Submitting form data:', formData)
      onNext(formData)
    }
  }

  const handleBrandingChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      branding: {
        ...prev.branding,
        [field]: value
      }
    }))
  }

  const handleBusinessRulesChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      businessRules: {
        ...prev.businessRules,
        [field]: value
      }
    }))
  }

  const handleWorkingHoursChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      businessRules: {
        ...prev.businessRules,
        workingHours: {
          ...prev.businessRules.workingHours,
          [field]: value
        }
      }
    }))
  }

  const handleNotificationChange = (field: string, value: boolean) => {
    setFormData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [field]: value
      }
    }))
  }

  return (
    <Card className="w-full max-w-8xl mx-auto bg-gray-800/50 border-gray-700">
      <CardHeader className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <Palette className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold text-white">Configuration</CardTitle>
        <CardDescription className="text-lg text-gray-400">
          Set up tenant configuration and branding.
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Branding Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white border-b border-gray-600 pb-2">
              Branding & Appearance
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="primaryColor" className="text-sm font-medium text-gray-300">
                  Primary Color *
                </Label>
                <div className="flex items-center gap-3">
                  <Input
                    id="primaryColor"
                    type="color"
                    value={formData.branding.primaryColor}
                    onChange={(e) => handleBrandingChange("primaryColor", e.target.value)}
                    className="w-16 h-10 p-1 border rounded-lg"
                    disabled={isLoading}
                  />
                  <Input
                    type="text"
                    value={formData.branding.primaryColor}
                    onChange={(e) => handleBrandingChange("primaryColor", e.target.value)}
                    placeholder="#3B82F6"
                    className="flex-1 bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                    disabled={isLoading}
                  />
                </div>
                {errors.primaryColor && (
                  <p className="text-sm text-red-400">{errors.primaryColor}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="secondaryColor" className="text-sm font-medium text-gray-300">
                  Secondary Color *
                </Label>
                <div className="flex items-center gap-3">
                  <Input
                    id="secondaryColor"
                    type="color"
                    value={formData.branding.secondaryColor}
                    onChange={(e) => handleBrandingChange("secondaryColor", e.target.value)}
                    className="w-16 h-10 p-1 border rounded-lg"
                    disabled={isLoading}
                  />
                  <Input
                    type="text"
                    value={formData.branding.secondaryColor}
                    onChange={(e) => handleBrandingChange("secondaryColor", e.target.value)}
                    placeholder="#8B5CF6"
                    className="flex-1"
                    disabled={isLoading}
                  />
                </div>
                {errors.secondaryColor && (
                  <p className="text-sm text-red-400">{errors.secondaryColor}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="fontFamily" className="text-sm font-medium text-gray-300">
                  Font Family
                </Label>
                <Select 
                  value={formData.branding.fontFamily} 
                  onValueChange={(value) => handleBrandingChange("fontFamily", value)}
                  disabled={isLoading}
                >
                  <SelectTrigger className="w-full bg-gray-700/50 border-gray-600 text-white">
                    <SelectValue placeholder="Select font" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    {fontFamilies.map((font) => (
                      <SelectItem key={font} value={font} className="text-white hover:bg-gray-700" style={{ fontFamily: font }}>
                        {font}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Business Rules Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white border-b border-gray-600 pb-2">
              Business Rules
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="workingStart" className="text-sm font-medium text-gray-300">
                  Working Hours Start *
                </Label>
                <Input
                  id="workingStart"
                  type="time"
                  value={formData.businessRules.workingHours.start}
                  onChange={(e) => handleWorkingHoursChange("start", e.target.value)}
                  className={`w-full ${errors.workingStart ? "border-red-500" : ""}`}
                  disabled={isLoading}
                />
                {errors.workingStart && (
                  <p className="text-sm text-red-400">{errors.workingStart}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="workingEnd" className="text-sm font-medium text-gray-300">
                  Working Hours End *
                </Label>
                <Input
                  id="workingEnd"
                  type="time"
                  value={formData.businessRules.workingHours.end}
                  onChange={(e) => handleWorkingHoursChange("end", e.target.value)}
                  className={`w-full ${errors.workingEnd ? "border-red-500" : ""}`}
                  disabled={isLoading}
                />
                {errors.workingEnd && (
                  <p className="text-sm text-red-400">{errors.workingEnd}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone" className="text-sm font-medium text-gray-300">
                  Timezone
                </Label>
                <Select 
                  value={formData.businessRules.workingHours.timezone} 
                  onValueChange={(value) => handleWorkingHoursChange("timezone", value)}
                  disabled={isLoading}
                >
                  <SelectTrigger className="w-full bg-gray-700/50 border-gray-600 text-white">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    {timezones.map((tz) => (
                      <SelectItem key={tz} value={tz} className="text-white hover:bg-gray-700">
                        {tz}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="leadResponseTime" className="text-sm font-medium text-gray-300">
                  Lead Response Time (hours)
                </Label>
                <Input
                  id="leadResponseTime"
                  type="number"
                  min="1"
                  max="168"
                  value={formData.businessRules.leadResponseTime}
                  onChange={(e) => handleBusinessRulesChange("leadResponseTime", parseInt(e.target.value))}
                  className="w-full"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currency" className="text-sm font-medium text-gray-300">
                  Default Currency
                </Label>
                <Select 
                  value={formData.businessRules.defaultCurrency} 
                  onValueChange={(value) => handleBusinessRulesChange("defaultCurrency", value)}
                  disabled={isLoading}
                >
                  <SelectTrigger className="w-full bg-gray-700/50 border-gray-600 text-white">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    {currencies.map((currency) => (
                      <SelectItem key={currency} value={currency} className="text-white hover:bg-gray-700">
                        {currency}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="language" className="text-sm font-medium text-gray-300">
                  Language
                </Label>
                <Select 
                  value={formData.businessRules.language} 
                  onValueChange={(value) => handleBusinessRulesChange("language", value)}
                  disabled={isLoading}
                >
                  <SelectTrigger className="w-full bg-gray-700/50 border-gray-600 text-white">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    {languages.map((lang) => (
                      <SelectItem key={lang} value={lang} className="text-white hover:bg-gray-700">
                        {lang.toUpperCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessType" className="text-sm font-medium text-gray-300">
                  Business Type
                </Label>
                <Select 
                  value={formData.businessRules.businessType} 
                  onValueChange={(value) => handleBusinessRulesChange("businessType", value)}
                  disabled={isLoading}
                >
                  <SelectTrigger className="w-full bg-gray-700/50 border-gray-600 text-white">
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600 text-white">
                    {businessTypes.map((type) => (
                      <SelectItem key={type} value={type} className="text-white hover:bg-gray-700">
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="serviceArea" className="text-sm font-medium text-gray-300">
                  Service Area
                </Label>
                <div className="space-y-2">
                  {serviceAreas.map((area) => (
                    <div key={area} className="flex items-center space-x-2">
                      <Checkbox
                        id={`service-${area}`}
                        checked={formData.businessRules.serviceArea.includes(area)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setFormData(prev => ({
                              ...prev,
                              businessRules: {
                                ...prev.businessRules,
                                serviceArea: [...prev.businessRules.serviceArea, area]
                              }
                            }))
                          } else {
                            setFormData(prev => ({
                              ...prev,
                              businessRules: {
                                ...prev.businessRules,
                                serviceArea: prev.businessRules.serviceArea.filter(a => a !== area)
                              }
                            }))
                          }
                        }}
                        disabled={isLoading}
                      />
                      <Label htmlFor={`service-${area}`} className="text-sm text-gray-300">
                        {area}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pricingModel" className="text-sm font-medium text-gray-300">
                  Pricing Model
                </Label>
                <Select 
                  value={formData.businessRules.pricingModel} 
                  onValueChange={(value) => handleBusinessRulesChange("pricingModel", value)}
                  disabled={isLoading}
                >
                  <SelectTrigger className="w-full bg-gray-700/50 border-gray-600 text-white">
                    <SelectValue placeholder="Select pricing model" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    {pricingModels.map((model) => (
                      <SelectItem key={model} value={model}>
                        {model}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contractTerms" className="text-sm font-medium text-gray-300">
                  Contract Terms
                </Label>
                <Select 
                  value={formData.businessRules.contractTerms} 
                  onValueChange={(value) => handleBusinessRulesChange("contractTerms", value)}
                  disabled={isLoading}
                >
                  <SelectTrigger className="w-full bg-gray-700/50 border-gray-600 text-white">
                    <SelectValue placeholder="Select contract terms" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    {contractTerms.map((term) => (
                      <SelectItem key={term} value={term}>
                        {term}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Notifications Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white border-b border-gray-600 pb-2">
              Notification Preferences
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-600 rounded-lg">
                <div>
                  <Label htmlFor="emailNotifications" className="text-sm font-medium text-gray-300">
                    Email Notifications
                  </Label>
                  <p className="text-xs text-gray-400">Receive important updates via email</p>
                </div>
                <Switch
                  id="emailNotifications"
                  checked={formData.notifications.email}
                  onCheckedChange={(checked) => handleNotificationChange("email", checked)}
                  disabled={isLoading}
                />
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-600 rounded-lg">
                <div>
                  <Label htmlFor="smsNotifications" className="text-sm font-medium text-gray-300">
                    SMS Notifications
                  </Label>
                  <p className="text-xs text-gray-400">Receive urgent alerts via SMS</p>
                </div>
                <Switch
                  id="smsNotifications"
                  checked={formData.notifications.sms}
                  onCheckedChange={(checked) => handleNotificationChange("sms", checked)}
                  disabled={isLoading}
                />
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-600 rounded-lg">
                <div>
                  <Label htmlFor="pushNotifications" className="text-sm font-medium text-gray-300">
                    Push Notifications
                  </Label>
                  <p className="text-xs text-gray-400">Receive real-time notifications in the app</p>
                </div>
                <Switch
                  id="pushNotifications"
                  checked={formData.notifications.push}
                  onCheckedChange={(checked) => handleNotificationChange("push", checked)}
                  disabled={isLoading}
                />
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-600 rounded-lg">
                <div>
                  <Label htmlFor="slackNotifications" className="text-sm font-medium text-gray-300">
                    Slack Notifications
                  </Label>
                  <p className="text-xs text-gray-400">Receive updates in your Slack workspace</p>
                </div>
                <Switch
                  id="slackNotifications"
                  checked={formData.notifications.slack}
                  onCheckedChange={(checked) => handleNotificationChange("slack", checked)}
                  disabled={isLoading}
                />
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-600 rounded-lg">
                <div>
                  <Label htmlFor="webhookNotifications" className="text-sm font-medium text-gray-300">
                    Webhook Notifications
                  </Label>
                  <p className="text-xs text-gray-400">Send notifications to custom webhook endpoints</p>
                </div>
                <Switch
                  id="webhookNotifications"
                  checked={formData.notifications.webhook}
                  onCheckedChange={(checked) => handleNotificationChange("webhook", checked)}
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>

          {/* Integrations Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white border-b border-gray-600 pb-2 flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-500" />
              Integrations
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="paymentGateway" className="text-sm font-medium text-gray-300">
                  Payment Gateway
                </Label>
                <Select 
                  value={formData.integrations.paymentGateway} 
                  onValueChange={(value) => setFormData(prev => ({
                    ...prev,
                    integrations: { ...prev.integrations, paymentGateway: value }
                  }))}
                  disabled={isLoading}
                >
                  <SelectTrigger className="w-full bg-gray-700/50 border-gray-600 text-white">
                    <SelectValue placeholder="Select payment gateway" className="text-white" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600 text-white ">
                    {paymentGateways.map((gateway) => (
                      <SelectItem key={gateway} value={gateway} className="text-white hover:bg-gray-700">
                        {gateway}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="emailProvider" className="text-sm font-medium text-gray-300">
                  Email Provider
                </Label>
                <Select 
                  value={formData.integrations.emailProvider} 
                  onValueChange={(value) => setFormData(prev => ({
                    ...prev,
                    integrations: { ...prev.integrations, emailProvider: value }
                  }))}
                  disabled={isLoading}
                >
                  <SelectTrigger className="w-full bg-gray-700/50 border-gray-600 text-white">
                    <SelectValue placeholder="Select email provider" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600 text-white">
                    {emailProviders.map((provider) => (
                      <SelectItem key={provider} value={provider} className="text-white hover:bg-gray-700">
                        {provider}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-600 rounded-lg">
                <div>
                  <Label htmlFor="calendarSync" className="text-sm font-medium text-gray-300">
                    Calendar Sync
                  </Label>
                  <p className="text-xs text-gray-400">Sync with Google Calendar or Outlook</p>
                </div>
                <Switch
                  id="calendarSync"
                  checked={formData.integrations.calendarSync}
                  onCheckedChange={(checked) => setFormData(prev => ({
                    ...prev,
                    integrations: { ...prev.integrations, calendarSync: checked }
                  }))}
                  disabled={isLoading}
                />
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-600 rounded-lg">
                <div>
                  <Label htmlFor="crmSync" className="text-sm font-medium text-gray-300">
                    CRM Sync
                  </Label>
                  <p className="text-xs text-gray-400">Sync with external CRM systems</p>
                </div>
                <Switch
                  id="crmSync"
                  checked={formData.integrations.crmSync}
                  onCheckedChange={(checked) => setFormData(prev => ({
                    ...prev,
                    integrations: { ...prev.integrations, crmSync: checked }
                  }))}
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>

          {/* Security Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white border-b border-gray-600 pb-2 flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-500" />
              Security Settings
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center justify-between p-4 border border-gray-600 rounded-lg">
                <div>
                  <Label htmlFor="twoFactorAuth" className="text-sm font-medium text-gray-300">
                    Two-Factor Authentication
                  </Label>
                  <p className="text-xs text-gray-400">Require 2FA for all users</p>
                </div>
                <Switch
                  id="twoFactorAuth"
                  checked={formData.security.twoFactorAuth}
                  onCheckedChange={(checked) => setFormData(prev => ({
                    ...prev,
                    security: { ...prev.security, twoFactorAuth: checked }
                  }))}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sessionTimeout" className="text-sm font-medium text-gray-300">
                  Session Timeout (hours)
                </Label>
                <Input
                  id="sessionTimeout"
                  type="number"
                  min="1"
                  max="24"
                  value={formData.security.sessionTimeout}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    security: { ...prev.security, sessionTimeout: parseInt(e.target.value) }
                  }))}
                  className="w-full"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dataRetention" className="text-sm font-medium text-gray-300">
                  Data Retention (days)
                </Label>
                <Input
                  id="dataRetention"
                  type="number"
                  min="30"
                  max="3650"
                  value={formData.security.dataRetention}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    security: { ...prev.security, dataRetention: parseInt(e.target.value) }
                  }))}
                  className="w-full"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ipWhitelist" className="text-sm font-medium text-gray-300">
                  IP Whitelist (optional)
                </Label>
                <Textarea
                  id="ipWhitelist"
                  placeholder="Enter IP addresses separated by commas (e.g., 192.168.1.1, 10.0.0.1)"
                  value={formData.security.ipWhitelist.join(', ')}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    security: { 
                      ...prev.security, 
                      ipWhitelist: e.target.value.split(',').map(ip => ip.trim()).filter(ip => ip)
                    }
                  }))}
                  rows={3}
                  className="w-full resize-none text-white"
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-6">
            {onBack && (
              <Button
                type="button"
                variant="outline"
                onClick={onBack}
                disabled={isLoading}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            )}
            
            <Button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 ml-auto"
            >
              {isLoading ? (
                "Processing..."
              ) : (
                <>
                  Next Step
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
