"use client"

import { useState, useEffect } from "react"
import ProtectedRoute from "@/components/protected-route"
import PortalLayout from "@/components/portal-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/toast"
import { useAuth } from "@/contexts/auth-context"
import { useOnboarding } from "@/contexts/onboarding-context"
import { 
  Palette, 
  Save, 
  Settings, 
  Globe, 
  Users, 
  Zap, 
  Shield, 
  Bell,
  Building2,
  Target,
  Clock,
  DollarSign,
  Languages,
  MapPin,
  FileText,
  CreditCard,
  Mail,
  Calendar,
  Database,
  Lock,
  Timer,
  Trash2,
  Edit,
  CheckCircle,
  AlertCircle
} from "lucide-react"
import { 
  OnboardingState, 
  SignUpData, 
  ConfigurationData, 
  ToolSelectionData, 
  BillingPlanData 
} from "@/modules/onboarding/types"

export default function CustomizePage() {
  const [saving, setSaving] = useState(false)
  const [editingSection, setEditingSection] = useState<string | null>(null)
  const { addToast } = useToast()
  const { user } = useAuth()
  const { onboardingState, isLoading: onboardingLoading, updateOnboardingStep } = useOnboarding()

  const updateConfiguration = async (stepId: string, data: any) => {
    setSaving(true)
    
    try {
      await updateOnboardingStep(stepId, data)
      setEditingSection(null)
      addToast({ type: "success", title: "Configuration updated successfully!" })
    } catch (error) {
      addToast({ type: "error", title: "Error updating configuration" })
    } finally {
      setSaving(false)
    }
  }

  if (onboardingLoading) {
    return (
      <ProtectedRoute>
        <PortalLayout>
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-400">Loading configuration...</p>
            </div>
          </div>
        </PortalLayout>
      </ProtectedRoute>
    )
  }

  if (!onboardingState) {
    return (
      <ProtectedRoute>
        <PortalLayout>
          <div className="text-center py-12">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">No Configuration Found</h3>
            <p className="text-gray-400">Please complete the onboarding process first.</p>
          </div>
        </PortalLayout>
      </ProtectedRoute>
    )
  }

  const getStepData = (stepId: string) => {
    const step = onboardingState.steps.find(s => s.id === stepId)
    return step?.data || {}
  }

  const signUpData = getStepData('signup') as SignUpData
  const configData = getStepData('configuration') as ConfigurationData
  const toolData = getStepData('tool-selection') as ToolSelectionData
  const billingData = getStepData('billing-plan') as BillingPlanData

  return (
    <ProtectedRoute>
      <PortalLayout>
        <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Customize Your Platform</h1>
              <p className="text-gray-400">Manage your business configuration and settings</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-green-900/50 text-green-300">
                <CheckCircle className="w-3 h-3 mr-1" />
                Configuration Complete
              </Badge>
            </div>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 bg-gray-700/50 border-gray-600">
              <TabsTrigger value="overview" className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-gray-600">Overview</TabsTrigger>
              <TabsTrigger value="business" className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-gray-600">Business</TabsTrigger>
              <TabsTrigger value="branding" className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-gray-600">Branding</TabsTrigger>
              <TabsTrigger value="integrations" className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-gray-600">Integrations</TabsTrigger>
              <TabsTrigger value="security" className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-gray-600">Security</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-900/50 rounded-lg flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">Business</p>
                        <p className="text-xs text-gray-400">{signUpData.businessType || 'Not set'}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-900/50 rounded-lg flex items-center justify-center">
                        <Palette className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">Branding</p>
                        <p className="text-xs text-gray-400">{configData.branding?.primaryColor || 'Not set'}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-900/50 rounded-lg flex items-center justify-center">
                        <Zap className="w-5 h-5 text-green-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">Tools</p>
                        <p className="text-xs text-gray-400">{toolData.selectedTools?.length || 0} selected</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-900/50 rounded-lg flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-orange-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">Billing</p>
                        <p className="text-xs text-gray-400">{billingData.planType || 'Not set'}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Settings className="w-5 h-5" />
                    Quick Actions
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Common configuration tasks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button 
                      variant="outline" 
                      className="h-auto p-4 flex flex-col items-start gap-2 border-gray-600 bg-gray-800 hover:bg-blue-900/30 hover:border-blue-500 transition-all duration-200"
                      onClick={() => setEditingSection('business')}
                    >
                      <Building2 className="w-5 h-5 text-blue-400" />
                      <div className="text-left">
                        <p className="font-medium text-white">Update Business Info</p>
                        <p className="text-xs text-gray-400">Edit company details</p>
                      </div>
                    </Button>

                    <Button 
                      variant="outline" 
                      className="h-auto p-4 flex flex-col items-start gap-2 border-gray-600 bg-gray-800 hover:bg-purple-900/30 hover:border-purple-500 transition-all duration-200"
                      onClick={() => setEditingSection('branding')}
                    >
                      <Palette className="w-5 h-5 text-purple-400" />
                      <div className="text-left">
                        <p className="font-medium text-white">Customize Branding</p>
                        <p className="text-xs text-gray-400">Update colors and fonts</p>
                      </div>
                    </Button>

                    <Button 
                      variant="outline" 
                      className="h-auto p-4 flex flex-col items-start gap-2 border-gray-600 bg-gray-800 hover:bg-orange-900/30 hover:border-orange-500 transition-all duration-200"
                      onClick={() => setEditingSection('integrations')}
                    >
                      <Zap className="w-5 h-5 text-orange-400" />
                      <div className="text-left">
                        <p className="font-medium text-white">Manage Integrations</p>
                        <p className="text-xs text-gray-400">Configure external services</p>
                      </div>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Business Tab */}
            <TabsContent value="business" className="space-y-6">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Building2 className="w-5 h-5" />
                    Business Information
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Your company details and business rules
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-300">Business Type</Label>
                      <div className="p-3 bg-gray-700 rounded-lg border border-gray-600">
                        <p className="text-sm text-white">{signUpData.businessType || 'Not set'}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-300">Contact Email</Label>
                      <div className="p-3 bg-gray-700 rounded-lg border border-gray-600">
                        <p className="text-sm text-white">{signUpData.contactEmail || 'Not set'}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-300">Contact Phone</Label>
                      <div className="p-3 bg-gray-700 rounded-lg border border-gray-600">
                        <p className="text-sm text-white">{signUpData.contactPhone || 'Not set'}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-300">Business Address</Label>
                      <div className="p-3 bg-gray-700 rounded-lg border border-gray-600">
                        <p className="text-sm text-white">{signUpData.businessAddress || 'Not set'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-600">
                    <h4 className="font-medium text-white mb-4">Business Rules</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-300">Working Hours</Label>
                        <div className="p-3 bg-gray-700 rounded-lg border border-gray-600">
                          <p className="text-sm text-white">
                            {configData.businessRules?.workingHours?.start || '09:00'} - {configData.businessRules?.workingHours?.end || '17:00'}
                          </p>
                          <p className="text-xs text-gray-400">{configData.businessRules?.workingHours?.timezone || 'UTC'}</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-300">Lead Response Time</Label>
                        <div className="p-3 bg-gray-700 rounded-lg border border-gray-600">
                          <p className="text-sm text-white">{configData.businessRules?.leadResponseTime || 24} hours</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-300">Default Currency</Label>
                        <div className="p-3 bg-gray-700 rounded-lg border border-gray-600">
                          <p className="text-sm text-white">{configData.businessRules?.defaultCurrency || 'USD'}</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-300">Language</Label>
                        <div className="p-3 bg-gray-700 rounded-lg border border-gray-600">
                          <p className="text-sm text-white">{configData.businessRules?.language || 'en'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Branding Tab */}
            <TabsContent value="branding" className="space-y-6">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Palette className="w-5 h-5" />
                    Branding & Appearance
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Your visual identity and design preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-300">Primary Color</Label>
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-12 h-12 rounded-lg border-2 border-gray-600"
                          style={{ backgroundColor: configData.branding?.primaryColor || '#3B82F6' }}
                        />
                        <div className="p-3 bg-gray-700 rounded-lg border border-gray-600 flex-1">
                          <p className="text-sm text-white">{configData.branding?.primaryColor || '#3B82F6'}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-300">Secondary Color</Label>
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-12 h-12 rounded-lg border-2 border-gray-600"
                          style={{ backgroundColor: configData.branding?.secondaryColor || '#8B5CF6' }}
                        />
                        <div className="p-3 bg-gray-700 rounded-lg border border-gray-600 flex-1">
                          <p className="text-sm text-white">{configData.branding?.secondaryColor || '#8B5CF6'}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-300">Font Family</Label>
                      <div className="p-3 bg-gray-700 rounded-lg border border-gray-600">
                        <p className="text-sm text-white" style={{ fontFamily: configData.branding?.fontFamily || 'Inter' }}>
                          {configData.branding?.fontFamily || 'Inter'}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-300">Custom Domain</Label>
                      <div className="p-3 bg-gray-700 rounded-lg border border-gray-600">
                        <p className="text-sm text-white">{configData.branding?.customDomain || 'Not set'}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Integrations Tab */}
            <TabsContent value="integrations" className="space-y-6">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Zap className="w-5 h-5" />
                    Integrations & Services
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    External services and third-party integrations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-300">Payment Gateway</Label>
                      <div className="p-3 bg-gray-700 rounded-lg border border-gray-600">
                        <p className="text-sm text-white">{configData.integrations?.paymentGateway || 'Not configured'}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-300">Email Provider</Label>
                      <div className="p-3 bg-gray-700 rounded-lg border border-gray-600">
                        <p className="text-sm text-white">{configData.integrations?.emailProvider || 'Not configured'}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-300">Calendar Sync</Label>
                      <div className="flex items-center gap-2">
                        <Badge className={configData.integrations?.calendarSync ? "bg-green-900/50 text-green-300" : "bg-gray-700 text-gray-300"}>
                          {configData.integrations?.calendarSync ? 'Enabled' : 'Disabled'}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-300">CRM Sync</Label>
                      <div className="flex items-center gap-2">
                        <Badge className={configData.integrations?.crmSync ? "bg-green-900/50 text-green-300" : "bg-gray-700 text-gray-300"}>
                          {configData.integrations?.crmSync ? 'Enabled' : 'Disabled'}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-600">
                    <h4 className="font-medium text-white mb-4">Selected Tools</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {toolData.selectedTools?.map((tool) => (
                        <div key={tool} className="p-3 bg-gray-700/50 rounded-lg border border-gray-600">
                          <p className="text-sm font-medium text-white">{tool}</p>
                        </div>
                      )) || <p className="text-sm text-gray-400">No tools selected</p>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="space-y-6">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Shield className="w-5 h-5" />
                    Security Settings
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Security preferences and access controls
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-300">Two-Factor Authentication</Label>
                      <div className="flex items-center gap-2">
                        <Badge className={configData.security?.twoFactorAuth ? "bg-green-900/50 text-green-300" : "bg-gray-700 text-gray-300"}>
                          {configData.security?.twoFactorAuth ? 'Enabled' : 'Disabled'}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-300">Session Timeout</Label>
                      <div className="p-3 bg-gray-700 rounded-lg border border-gray-600">
                        <p className="text-sm text-white">{configData.security?.sessionTimeout || 8} hours</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-300">Data Retention</Label>
                      <div className="p-3 bg-gray-700 rounded-lg border border-gray-600">
                        <p className="text-sm text-white">{configData.security?.dataRetention || 365} days</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-300">IP Whitelist</Label>
                      <div className="p-3 bg-gray-700 rounded-lg border border-gray-600">
                        <p className="text-sm text-white">
                          {configData.security?.ipWhitelist?.length ? 
                            `${configData.security.ipWhitelist.length} IPs configured` : 
                            'No IP restrictions'
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Bell className="w-5 h-5" />
                    Notification Preferences
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    How you want to receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between p-3 border border-gray-600 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-white">Email</p>
                        <p className="text-xs text-gray-400">Important updates</p>
                      </div>
                      <Badge className={configData.notifications?.email ? "bg-green-900/50 text-green-300" : "bg-gray-700 text-gray-300"}>
                        {configData.notifications?.email ? 'On' : 'Off'}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 border border-gray-600 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-white">SMS</p>
                        <p className="text-xs text-gray-400">Urgent alerts</p>
                      </div>
                      <Badge className={configData.notifications?.sms ? "bg-green-900/50 text-green-300" : "bg-gray-700 text-gray-300"}>
                        {configData.notifications?.sms ? 'On' : 'Off'}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 border border-gray-600 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-white">Push</p>
                        <p className="text-xs text-gray-400">Real-time notifications</p>
                      </div>
                      <Badge className={configData.notifications?.push ? "bg-green-900/50 text-green-300" : "bg-gray-700 text-gray-300"}>
                        {configData.notifications?.push ? 'On' : 'Off'}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 border border-gray-600 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-white">Slack</p>
                        <p className="text-xs text-gray-400">Team updates</p>
                      </div>
                      <Badge className={configData.notifications?.slack ? "bg-green-900/50 text-green-300" : "bg-gray-700 text-gray-300"}>
                        {configData.notifications?.slack ? 'On' : 'Off'}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </PortalLayout>
    </ProtectedRoute>
  )
}