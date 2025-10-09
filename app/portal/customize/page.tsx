"use client"

import { useState, useEffect, useRef } from "react"
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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { 
  Palette, 
  Upload, 
  Save, 
  Eye, 
  Settings, 
  Globe, 
  Users, 
  BarChart3, 
  Mail, 
  CreditCard,
  Smartphone,
  Monitor,
  Laptop,
  Tablet,
  Download,
  RefreshCw,
  Check,
  X,
  Plus,
  Trash2,
  Edit,
  Copy,
  FileText,
  Building2,
  Target,
  Activity,
  ExternalLink
} from "lucide-react"

interface CustomizationSettings {
  branding: {
    companyName: string
    tagline: string
    logo: string
    primaryColor: string
    secondaryColor: string
    accentColor: string
    fontFamily: string
    brandPersonality: string
    brandVoice: string
    brandGuidelines: string
    industry: string
  }
  industry: {
    type: string
    businessType: string
    targetMarket: string
    customFields: Array<{name: string, type: string, required: boolean}>
  }
  modules: {
    website: boolean
    crm: boolean
    analytics: boolean
    ecommerce: boolean
    blog: boolean
    support: boolean
  }
  integrations: {
    googleAnalytics: {enabled: boolean, trackingId: string}
    mailchimp: {enabled: boolean, apiKey: string}
    stripe: {enabled: boolean, publishableKey: string}
    slack: {enabled: boolean, webhookUrl: string}
  }
  theme: {
    mode: 'light' | 'dark' | 'auto'
    sidebarStyle: 'default' | 'compact' | 'minimal'
    headerStyle: 'default' | 'transparent' | 'glass'
  }
}

export default function PortalCustomizePage() {
  const [settings, setSettings] = useState<CustomizationSettings>({
    branding: {
      companyName: "Your Company",
      tagline: "",
      logo: "",
      primaryColor: "#8b5cf6",
      secondaryColor: "#06b6d4",
      accentColor: "#10b981",
      fontFamily: "Inter",
      brandPersonality: "",
      brandVoice: "",
      brandGuidelines: "",
      industry: ""
    },
    industry: {
      type: "restoration",
      businessType: "Water Damage Restoration",
      targetMarket: "Property owners and insurance companies",
      customFields: []
    },
    modules: {
      website: true,
      crm: true,
      analytics: true,
      ecommerce: false,
      blog: false,
      support: false
    },
    integrations: {
      googleAnalytics: {enabled: false, trackingId: ""},
      mailchimp: {enabled: false, apiKey: ""},
      stripe: {enabled: false, publishableKey: ""},
      slack: {enabled: false, webhookUrl: ""}
    },
    theme: {
      mode: "light",
      sidebarStyle: "default",
      headerStyle: "default"
    }
  })

  const [activeTab, setActiveTab] = useState("branding")
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isBrandGuidelinesOpen, setIsBrandGuidelinesOpen] = useState(false)
  const [aiGuidelines, setAiGuidelines] = useState<string>('')
  const [isGeneratingGuidelines, setIsGeneratingGuidelines] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Load settings on component mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await fetch('/api/customize')
        if (response.ok) {
          const result = await response.json()
          if (result.success && result.data) {
            setSettings(result.data)
          }
        }
      } catch (error) {
        console.error('Error loading settings:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadSettings()
  }, [])

  const industries = [
    { id: "restoration", name: "Restoration", icon: "🏠", color: "from-red-500 to-pink-500" },
    { id: "healthcare", name: "Healthcare", icon: "🏥", color: "from-emerald-500 to-teal-500" },
    { id: "logistics", name: "Logistics", icon: "🚚", color: "from-orange-500 to-amber-500" },
    { id: "real-estate", name: "Real Estate", icon: "🏢", color: "from-blue-500 to-cyan-500" },
    { id: "fintech", name: "FinTech", icon: "💳", color: "from-green-500 to-emerald-500" },
    { id: "education", name: "Education", icon: "🎓", color: "from-purple-500 to-pink-500" },
    { id: "retail", name: "Retail", icon: "🛍️", color: "from-indigo-500 to-purple-500" },
    { id: "custom", name: "Custom", icon: "⚙️", color: "from-gray-500 to-slate-500" }
  ]

  const fontFamilies = [
    "Inter", "Roboto", "Open Sans", "Lato", "Montserrat", "Poppins", "Source Sans Pro", "Nunito"
  ]

  // Color validation and normalization
  const validateAndNormalizeColor = (color: string): string => {
    if (!color) return "#000000"
    
    // Remove any whitespace
    color = color.trim()
    
    // If it's a valid hex color, return it
    if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color)) {
      return color.toUpperCase()
    }
    
    // If it's a 3-digit hex, convert to 6-digit
    if (/^#([A-Fa-f0-9]{3})$/.test(color)) {
      const hex = color.slice(1)
      return `#${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`.toUpperCase()
    }
    
    // If it's not a valid hex, return the original value (let the user see the error)
    return color
  }

  const updateSetting = (path: string, value: any) => {
    setSettings(prev => {
      const newSettings = { ...prev }
      const keys = path.split('.')
      let current: any = newSettings
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]]
      }
      
      // Normalize color values for color fields
      if (keys.includes('primaryColor') || keys.includes('secondaryColor') || keys.includes('accentColor')) {
        value = validateAndNormalizeColor(value)
      }
      
      current[keys[keys.length - 1]] = value
      setHasChanges(true)
      return newSettings
    })
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const response = await fetch('/api/customize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      })

      if (!response.ok) {
        throw new Error('Failed to save settings')
      }

      const result = await response.json()
      if (result.success) {
        setHasChanges(false)
        // Optionally show success message
        console.log('Settings saved successfully')
      } else {
        throw new Error(result.error || 'Failed to save settings')
      }
    } catch (error) {
      console.error('Error saving settings:', error)
      // Optionally show error message to user
    } finally {
      setIsSaving(false)
    }
  }

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        updateSetting('branding.logo', e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const addCustomField = () => {
    const newField = { name: "", type: "text", required: false }
    updateSetting('industry.customFields', [...settings.industry.customFields, newField])
  }

  const removeCustomField = (index: number) => {
    const newFields = settings.industry.customFields.filter((_, i) => i !== index)
    updateSetting('industry.customFields', newFields)
  }

  const updateCustomField = (index: number, field: string, value: any) => {
    const newFields = [...settings.industry.customFields]
    newFields[index] = { ...newFields[index], [field]: value }
    updateSetting('industry.customFields', newFields)
  }

  // Generate AI-powered brand guidelines
  const generateAIGuidelines = async () => {
    setIsGeneratingGuidelines(true)
    try {
      const response = await fetch('/api/generate-brand-guidelines', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyName: settings.branding.companyName,
          tagline: settings.branding.tagline,
          industry: settings.branding.industry,
          brandVoice: settings.branding.brandVoice,
          brandPersonality: settings.branding.brandPersonality,
          brandGuidelines: settings.branding.brandGuidelines,
          primaryColor: settings.branding.primaryColor,
          secondaryColor: settings.branding.secondaryColor,
          accentColor: settings.branding.accentColor,
          fontFamily: settings.branding.fontFamily
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate guidelines')
      }

      const result = await response.json()
      if (result.success) {
        setAiGuidelines(result.guidelines)
      } else {
        throw new Error(result.error || 'Failed to generate guidelines')
      }
    } catch (error) {
      console.error('Error generating AI guidelines:', error)
      setAiGuidelines('Sorry, there was an error generating the brand guidelines. Please try again.')
    } finally {
      setIsGeneratingGuidelines(false)
    }
  }

  // Brand Guidelines Modal Component
  const BrandGuidelinesModal = () => (
    <Dialog open={isBrandGuidelinesOpen} onOpenChange={setIsBrandGuidelinesOpen}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Palette className="w-6 h-6" />
            Brand Guidelines
          </DialogTitle>
          <DialogDescription>
            Complete brand identity and guidelines for {settings.branding.companyName || 'Your Company'}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-8">
          {/* AI-Generated Brand Guidelines */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border-2 border-indigo-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Activity className="w-5 h-5" />
                AI-Generated Brand Guidelines
              </h3>
              <Button
                onClick={generateAIGuidelines}
                disabled={isGeneratingGuidelines}
                className="flex items-center gap-2"
              >
                {isGeneratingGuidelines ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Activity className="w-4 h-4" />
                    Generate Guidelines
                  </>
                )}
              </Button>
            </div>
            
            {aiGuidelines ? (
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="prose prose-sm max-w-none">
                  <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                    {aiGuidelines}
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Activity className="w-4 h-4" />
                    <span>Generated by AI based on your brand details</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
                <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">Generate AI Brand Guidelines</h4>
                <p className="text-gray-600 mb-4">
                  Get comprehensive, professional brand guidelines tailored specifically to your company's identity, 
                  industry, and brand personality.
                </p>
                <Button
                  onClick={generateAIGuidelines}
                  disabled={isGeneratingGuidelines}
                  className="flex items-center gap-2 mx-auto"
                >
                  {isGeneratingGuidelines ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Generating Guidelines...
                    </>
                  ) : (
                    <>
                      <Activity className="w-4 h-4" />
                      Generate AI Guidelines
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>

          {/* Company Identity */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              Company Identity
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Company Name</h4>
                <p className="text-gray-900 text-lg font-semibold">
                  {settings.branding.companyName || 'Not specified'}
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Tagline</h4>
                <p className="text-gray-600">
                  {settings.branding.tagline || 'No tagline specified'}
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Industry</h4>
                <Badge variant="secondary" className="capitalize">
                  {settings.branding.industry || 'Not specified'}
                </Badge>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Font Family</h4>
                <p className="text-gray-600 font-mono">
                  {settings.branding.fontFamily || 'Inter'}
                </p>
              </div>
            </div>
          </div>

          {/* Brand Colors */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Brand Color Palette
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div 
                  className="w-20 h-20 rounded-xl mx-auto mb-3 shadow-lg border-2 border-white"
                  style={{ backgroundColor: settings.branding.primaryColor }}
                ></div>
                <h4 className="font-medium text-gray-700 mb-1">Primary Color</h4>
                <p className="text-sm text-gray-600 font-mono">{settings.branding.primaryColor}</p>
                <p className="text-xs text-gray-500 mt-1">Buttons, links, primary actions</p>
              </div>
              <div className="text-center">
                <div 
                  className="w-20 h-20 rounded-xl mx-auto mb-3 shadow-lg border-2 border-white"
                  style={{ backgroundColor: settings.branding.secondaryColor }}
                ></div>
                <h4 className="font-medium text-gray-700 mb-1">Secondary Color</h4>
                <p className="text-sm text-gray-600 font-mono">{settings.branding.secondaryColor}</p>
                <p className="text-xs text-gray-500 mt-1">Secondary actions, highlights</p>
              </div>
              <div className="text-center">
                <div 
                  className="w-20 h-20 rounded-xl mx-auto mb-3 shadow-lg border-2 border-white"
                  style={{ backgroundColor: settings.branding.accentColor }}
                ></div>
                <h4 className="font-medium text-gray-700 mb-1">Accent Color</h4>
                <p className="text-sm text-gray-600 font-mono">{settings.branding.accentColor}</p>
                <p className="text-xs text-gray-500 mt-1">Success states, positive actions</p>
              </div>
            </div>
          </div>

          {/* Brand Voice & Personality */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5" />
              Brand Voice & Personality
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Brand Voice</h4>
                <Badge variant="outline" className="capitalize">
                  {settings.branding.brandVoice ? 
                    settings.branding.brandVoice.replace(/([A-Z])/g, ' $1').trim() : 
                    'Not specified'
                  }
                </Badge>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Brand Personality</h4>
                <Badge variant="outline" className="capitalize">
                  {settings.branding.brandPersonality || 'Not specified'}
                </Badge>
              </div>
            </div>
          </div>

          {/* Brand Guidelines */}
          {settings.branding.brandGuidelines && (
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Brand Guidelines & Values
              </h3>
              <div className="prose prose-sm max-w-none">
                <p className="text-gray-700 whitespace-pre-wrap">
                  {settings.branding.brandGuidelines}
                </p>
              </div>
            </div>
          )}

          {/* Logo Preview */}
          {settings.branding.logo && (
            <div className="bg-gradient-to-r from-gray-50 to-slate-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Logo Preview
              </h3>
              <div className="flex items-center gap-4">
                <img 
                  src={settings.branding.logo} 
                  alt="Company Logo" 
                  className="w-24 h-24 object-contain bg-white rounded-lg shadow-sm border"
                />
                <div>
                  <p className="text-sm text-gray-600">Current logo</p>
                  <p className="text-xs text-gray-500">Uploaded and ready for use</p>
                </div>
              </div>
            </div>
          )}

          {/* Usage Examples */}
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Usage Examples
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-700 mb-3">Button Styles</h4>
                <div className="space-y-2">
                  <button 
                    className="px-4 py-2 rounded-lg text-white font-medium"
                    style={{ backgroundColor: settings.branding.primaryColor }}
                  >
                    Primary Button
                  </button>
                  <button 
                    className="px-4 py-2 rounded-lg text-white font-medium"
                    style={{ backgroundColor: settings.branding.secondaryColor }}
                  >
                    Secondary Button
                  </button>
                  <button 
                    className="px-4 py-2 rounded-lg text-white font-medium"
                    style={{ backgroundColor: settings.branding.accentColor }}
                  >
                    Accent Button
                  </button>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-3">Text Styles</h4>
                <div className="space-y-2">
                  <h1 
                    className="text-2xl font-bold"
                    style={{ 
                      color: settings.branding.primaryColor,
                      fontFamily: settings.branding.fontFamily 
                    }}
                  >
                    Heading Text
                  </h1>
                  <p 
                    className="text-lg"
                    style={{ fontFamily: settings.branding.fontFamily }}
                  >
                    Body text with brand font
                  </p>
                  <p 
                    className="text-sm"
                    style={{ color: settings.branding.secondaryColor }}
                  >
                    Secondary text color
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media Branding Plan */}
          <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Social Media Branding Plan
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Tailored recommendations for {settings.branding.companyName || 'your company'} based on your brand identity
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Platform-Specific Recommendations */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-700 mb-3">Platform Recommendations</h4>
                
                {/* Instagram */}
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                      IG
                    </div>
                    <h5 className="font-medium text-gray-900">Instagram</h5>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {settings.branding.brandPersonality === 'creative' ? 
                      'Perfect for showcasing creative content and visual storytelling' :
                      settings.branding.brandPersonality === 'friendly' ?
                      'Great for building community and engaging with customers' :
                      'Ideal for professional content and brand awareness'
                    }
                  </p>
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {settings.branding.primaryColor}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {settings.branding.fontFamily}
                    </Badge>
                  </div>
                </div>

                {/* LinkedIn */}
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                      LI
                    </div>
                    <h5 className="font-medium text-gray-900">LinkedIn</h5>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {settings.branding.brandVoice === 'professional' ? 
                      'Excellent for B2B networking and professional content' :
                      'Great for industry insights and thought leadership'
                    }
                  </p>
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {settings.branding.secondaryColor}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Professional
                    </Badge>
                  </div>
                </div>

                {/* Twitter/X */}
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-bold text-sm">
                      X
                    </div>
                    <h5 className="font-medium text-gray-900">Twitter/X</h5>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {settings.branding.brandVoice === 'innovative' ? 
                      'Perfect for sharing industry trends and innovations' :
                      'Great for real-time updates and customer service'
                    }
                  </p>
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {settings.branding.accentColor}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Quick Updates
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Content Strategy */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-700 mb-3">Content Strategy</h4>
                
                {/* Brand Voice Application */}
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h5 className="font-medium text-gray-900 mb-2">Brand Voice Guidelines</h5>
                  <p className="text-sm text-gray-600 mb-3">
                    {settings.branding.brandVoice === 'professional' ? 
                      'Use formal language, industry terminology, and data-driven content' :
                      settings.branding.brandVoice === 'friendly' ?
                      'Use conversational tone, emojis, and personal stories' :
                      settings.branding.brandVoice === 'innovative' ?
                      'Focus on cutting-edge topics, trends, and forward-thinking content' :
                      'Maintain consistent, brand-appropriate messaging across all platforms'
                    }
                  </p>
                  <div className="text-xs text-gray-500">
                    Voice: <span className="font-medium capitalize">{settings.branding.brandVoice || 'Not specified'}</span>
                  </div>
                </div>

                {/* Visual Guidelines */}
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h5 className="font-medium text-gray-900 mb-2">Visual Guidelines</h5>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: settings.branding.primaryColor }}
                      ></div>
                      <span className="text-sm text-gray-600">Primary: Headers, CTAs, highlights</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: settings.branding.secondaryColor }}
                      ></div>
                      <span className="text-sm text-gray-600">Secondary: Backgrounds, accents</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: settings.branding.accentColor }}
                      ></div>
                      <span className="text-sm text-gray-600">Accent: Success states, positive actions</span>
                    </div>
                  </div>
                </div>

                {/* Industry-Specific Tips */}
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h5 className="font-medium text-gray-900 mb-2">Industry Tips</h5>
                  <p className="text-sm text-gray-600">
                    {settings.branding.industry === 'technology' ? 
                      'Share tech insights, product updates, and industry news' :
                      settings.branding.industry === 'healthcare' ?
                      'Focus on patient care, medical advances, and health education' :
                      settings.branding.industry === 'finance' ?
                      'Share market insights, financial tips, and regulatory updates' :
                      settings.branding.industry === 'education' ?
                      'Highlight learning resources, student success, and educational trends' :
                      'Share industry-specific content and thought leadership'
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media Templates */}
            <div className="mt-6">
              <h4 className="font-medium text-gray-700 mb-4">Social Media Templates</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Instagram Post Template */}
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center relative overflow-hidden">
                    <div 
                      className="absolute inset-0 opacity-20"
                      style={{ backgroundColor: settings.branding.primaryColor }}
                    ></div>
                    <div className="relative z-10 text-center">
                      <div 
                        className="w-16 h-16 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold text-xl"
                        style={{ backgroundColor: settings.branding.primaryColor }}
                      >
                        {settings.branding.companyName[0]?.toUpperCase() || 'C'}
                      </div>
                      <p 
                        className="text-sm font-medium"
                        style={{ color: settings.branding.primaryColor }}
                      >
                        {settings.branding.companyName}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600">Instagram Post Template</p>
                </div>

                {/* LinkedIn Post Template */}
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="h-32 bg-gray-100 rounded-lg mb-3 flex items-center justify-center relative overflow-hidden">
                    <div 
                      className="absolute inset-0 opacity-10"
                      style={{ backgroundColor: settings.branding.secondaryColor }}
                    ></div>
                    <div className="relative z-10 text-center">
                      <h3 
                        className="text-lg font-bold mb-1"
                        style={{ 
                          color: settings.branding.primaryColor,
                          fontFamily: settings.branding.fontFamily 
                        }}
                      >
                        Professional Update
                      </h3>
                      <p className="text-sm text-gray-600">LinkedIn Post Template</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600">LinkedIn Post Template</p>
                </div>

                {/* Twitter/X Template */}
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="h-32 bg-gray-100 rounded-lg mb-3 flex items-center justify-center relative overflow-hidden">
                    <div 
                      className="absolute inset-0 opacity-10"
                      style={{ backgroundColor: settings.branding.accentColor }}
                    ></div>
                    <div className="relative z-10 text-center">
                      <p 
                        className="text-sm font-medium mb-1"
                        style={{ color: settings.branding.accentColor }}
                      >
                        Quick Update
                      </p>
                      <p className="text-xs text-gray-600">Twitter/X Template</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600">Twitter/X Template</p>
                </div>
              </div>
            </div>

            {/* Action Items */}
            <div className="mt-6 bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="font-medium text-gray-900 mb-3">Next Steps</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-600">Create social media accounts with consistent branding</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-600">Develop content calendar based on brand voice</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-600">Use brand colors consistently across all platforms</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-600">Engage with industry-relevant content and hashtags</span>
                </div>
              </div>
            </div>
          </div>

          {/* Export Options */}
          <div className="bg-gradient-to-r from-slate-50 to-gray-50 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Download className="w-5 h-5" />
              Export & Share
            </h3>
            <div className="flex flex-wrap gap-3">
              <Button 
                variant="outline" 
                onClick={() => {
                  const brandData = {
                    companyName: settings.branding.companyName,
                    tagline: settings.branding.tagline,
                    colors: {
                      primary: settings.branding.primaryColor,
                      secondary: settings.branding.secondaryColor,
                      accent: settings.branding.accentColor
                    },
                    fontFamily: settings.branding.fontFamily,
                    brandVoice: settings.branding.brandVoice,
                    brandPersonality: settings.branding.brandPersonality,
                    brandGuidelines: settings.branding.brandGuidelines
                  }
                  navigator.clipboard.writeText(JSON.stringify(brandData, null, 2))
                }}
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy Brand Data
              </Button>
              <Button 
                variant="outline"
                onClick={() => {
                  const colorPalette = `${settings.branding.primaryColor}, ${settings.branding.secondaryColor}, ${settings.branding.accentColor}`
                  navigator.clipboard.writeText(colorPalette)
                }}
              >
                <Palette className="w-4 h-4 mr-2" />
                Copy Color Palette
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )

  if (isLoading) {
    return (
      <ProtectedRoute>
        <PortalLayout>
          <div className="flex items-center justify-center h-64">
            <div className="flex items-center gap-2">
              <RefreshCw className="w-5 h-5 animate-spin" />
              <span>Loading customization settings...</span>
            </div>
          </div>
        </PortalLayout>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <PortalLayout>
        <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Customize Your business platform</h1>
              <p className="text-gray-600">Configure your white-label solution with real-time preview</p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => setIsPreviewMode(!isPreviewMode)}
                className="flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                {isPreviewMode ? 'Exit Preview' : 'Preview'}
              </Button>
              <Button
                onClick={handleSave}
                disabled={!hasChanges || isSaving}
                className="flex items-center gap-2"
              >
                {isSaving ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </div>

          {/* Customization Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="branding" className="flex items-center gap-2">
                <Palette className="w-4 h-4" />
                <span className="hidden sm:inline">Branding</span>
              </TabsTrigger>
              <TabsTrigger value="industry" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline">Industry</span>
              </TabsTrigger>
              <TabsTrigger value="modules" className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline">Modules</span>
              </TabsTrigger>
              <TabsTrigger value="integrations" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span className="hidden sm:inline">Integrations</span>
              </TabsTrigger>
              <TabsTrigger value="theme" className="flex items-center gap-2">
                <Monitor className="w-4 h-4" />
                <span className="hidden sm:inline">Theme</span>
              </TabsTrigger>
              <TabsTrigger value="preview" className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span className="hidden sm:inline">Preview</span>
              </TabsTrigger>
            </TabsList>

            {/* Branding Tab */}
            <TabsContent value="branding" className="space-y-6">
              {/* Brand Identity Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="w-5 h-5" />
                    Brand Identity
                  </CardTitle>
                  <CardDescription>
                    Establish your company's visual identity and brand presence
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Company Information */}
                    <div className="space-y-6">
                      <div>
                        <Label htmlFor="companyName" className="text-sm font-medium text-gray-700">
                          Company Name *
                        </Label>
                        <Input
                          id="companyName"
                          value={settings.branding.companyName}
                          onChange={(e) => updateSetting('branding.companyName', e.target.value)}
                          placeholder="Enter your company name"
                          className="mt-2"
                        />
                        <p className="text-xs text-gray-600 mt-1">
                          This will appear throughout your system
                        </p>
                      </div>

                      <div>
                        <Label htmlFor="tagline" className="text-sm font-medium text-gray-700">
                          Company Tagline
                        </Label>
                        <Input
                          id="tagline"
                          value={settings.branding.tagline}
                          onChange={(e) => updateSetting('branding.tagline', e.target.value)}
                          placeholder="Your company tagline or slogan"
                          className="mt-2"
                        />
                        <p className="text-xs text-gray-600 mt-1">
                          Optional: A short description of your business
                        </p>
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-700">
                          Industry Category
                        </Label>
                        <Select value={settings.branding.industry} onValueChange={(value) => updateSetting('branding.industry', value)}>
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Select your industry" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="technology">Technology</SelectItem>
                            <SelectItem value="healthcare">Healthcare</SelectItem>
                            <SelectItem value="finance">Finance</SelectItem>
                            <SelectItem value="education">Education</SelectItem>
                            <SelectItem value="retail">Retail</SelectItem>
                            <SelectItem value="manufacturing">Manufacturing</SelectItem>
                            <SelectItem value="consulting">Consulting</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Logo Upload */}
                    <div>
                      <Label className="text-sm font-medium text-gray-700">
                        Company Logo
                      </Label>
                      <div 
                        className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 mt-2"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        {settings.branding.logo ? (
              <div className="space-y-4">
                            <img 
                              src={settings.branding.logo} 
                              alt="Company Logo" 
                              className="w-24 h-24 object-contain mx-auto rounded-lg shadow-sm"
                            />
                <div>
                              <p className="text-sm font-medium text-gray-900">Logo uploaded successfully</p>
                              <p className="text-xs text-gray-600">Click to change</p>
                    </div>
                  </div>
                        ) : (
                          <div className="space-y-4">
                            <div className="w-24 h-24 bg-gray-100 rounded-xl mx-auto flex items-center justify-center">
                              <Upload className="w-8 h-8 text-gray-400" />
                </div>
                <div>
                              <p className="text-sm font-medium text-gray-900">Upload your logo</p>
                              <p className="text-xs text-gray-600">PNG, JPG, or SVG up to 5MB</p>
                            </div>
                          </div>
                        )}
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleLogoUpload}
                          className="hidden"
                        />
                      </div>
                      
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <Check className="w-3 h-3" />
                          <span>Recommended: 200x200px or higher</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <Check className="w-3 h-3" />
                          <span>Transparent background preferred</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <Check className="w-3 h-3" />
                          <span>Square format works best</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Color Palette */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="w-5 h-5" />
                    Brand Color Palette
                  </CardTitle>
                  <CardDescription>
                    Define your brand colors for consistent visual identity
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Primary Color */}
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Primary Color</Label>
                        <p className="text-xs text-gray-600 mt-1">Your main brand color</p>
                      </div>
                  <div className="flex items-center gap-3">
                        <div className="relative">
                          <input
                            type="color"
                            value={settings.branding.primaryColor}
                            onChange={(e) => updateSetting('branding.primaryColor', e.target.value)}
                            className="w-16 h-16 rounded-xl border-2 border-gray-300 cursor-pointer shadow-sm hover:shadow-md transition-shadow"
                          />
                          <div className="absolute inset-0 rounded-xl border-2 border-white shadow-inner"></div>
                  </div>
                        <div className="flex-1">
                          <Input
                            value={settings.branding.primaryColor}
                            onChange={(e) => updateSetting('branding.primaryColor', e.target.value)}
                            className="text-sm font-mono"
                            placeholder="#3b82f6"
                          />
                </div>
                      </div>
                      <div className="p-3 rounded-lg" style={{ backgroundColor: settings.branding.primaryColor + '10' }}>
                        <p className="text-xs text-gray-600">Used for: Buttons, links, primary actions</p>
                      </div>
                    </div>

                    {/* Secondary Color */}
                    <div className="space-y-4">
                <div>
                        <Label className="text-sm font-medium text-gray-700">Secondary Color</Label>
                        <p className="text-xs text-gray-600 mt-1">Supporting brand color</p>
                </div>
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <input
                            type="color"
                            value={settings.branding.secondaryColor}
                            onChange={(e) => updateSetting('branding.secondaryColor', e.target.value)}
                            className="w-16 h-16 rounded-xl border-2 border-gray-300 cursor-pointer shadow-sm hover:shadow-md transition-shadow"
                          />
                          <div className="absolute inset-0 rounded-xl border-2 border-white shadow-inner"></div>
                        </div>
                        <div className="flex-1">
                          <Input
                            value={settings.branding.secondaryColor}
                            onChange={(e) => updateSetting('branding.secondaryColor', e.target.value)}
                            className="text-sm font-mono"
                            placeholder="#06b6d4"
                          />
                        </div>
                      </div>
                      <div className="p-3 rounded-lg" style={{ backgroundColor: settings.branding.secondaryColor + '10' }}>
                        <p className="text-xs text-gray-600">Used for: Secondary actions, highlights</p>
              </div>
            </div>

                    {/* Accent Color */}
              <div className="space-y-4">
                <div>
                        <Label className="text-sm font-medium text-gray-700">Accent Color</Label>
                        <p className="text-xs text-gray-600 mt-1">Emphasis and success states</p>
                </div>
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <input
                            type="color"
                            value={settings.branding.accentColor}
                            onChange={(e) => updateSetting('branding.accentColor', e.target.value)}
                            className="w-16 h-16 rounded-xl border-2 border-gray-300 cursor-pointer shadow-sm hover:shadow-md transition-shadow"
                          />
                          <div className="absolute inset-0 rounded-xl border-2 border-white shadow-inner"></div>
                        </div>
                        <div className="flex-1">
                          <Input
                            value={settings.branding.accentColor}
                            onChange={(e) => updateSetting('branding.accentColor', e.target.value)}
                            className="text-sm font-mono"
                            placeholder="#10b981"
                          />
                        </div>
                      </div>
                      <div className="p-3 rounded-lg" style={{ backgroundColor: settings.branding.accentColor + '10' }}>
                        <p className="text-xs text-gray-600">Used for: Success states, positive actions</p>
                      </div>
                    </div>
                  </div>

                  {/* Color Harmony Preview */}
                  <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                    <h4 className="text-sm font-medium text-gray-700 mb-4">Color Harmony Preview</h4>
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-12 h-12 rounded-lg shadow-sm flex items-center justify-center text-white font-bold"
                        style={{ backgroundColor: settings.branding.primaryColor }}
                      >
                        P
                      </div>
                      <div 
                        className="w-12 h-12 rounded-lg shadow-sm flex items-center justify-center text-white font-bold"
                        style={{ backgroundColor: settings.branding.secondaryColor }}
                      >
                        S
                      </div>
                      <div 
                        className="w-12 h-12 rounded-lg shadow-sm flex items-center justify-center text-white font-bold"
                        style={{ backgroundColor: settings.branding.accentColor }}
                      >
                        A
                      </div>
                      <div className="ml-4">
                        <p className="text-sm text-gray-600">Primary • Secondary • Accent</p>
                        <p className="text-xs text-gray-500">Your brand color combination</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Typography */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Typography & Fonts
                  </CardTitle>
                  <CardDescription>
                    Choose fonts that represent your brand personality
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Font Selection */}
                    <div className="space-y-6">
                <div>
                        <Label className="text-sm font-medium text-gray-700">Primary Font Family</Label>
                        <p className="text-xs text-gray-600 mt-1">Main font for headings and content</p>
                        <Select 
                          value={settings.branding.fontFamily} 
                          onValueChange={(value) => updateSetting('branding.fontFamily', value)}
                        >
                          <SelectTrigger className="mt-2">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {fontFamilies.map((font) => (
                              <SelectItem key={font} value={font}>
                                <div className="flex items-center gap-2">
                                  <span style={{ fontFamily: font }}>{font}</span>
                                  <span className="text-xs text-gray-500">({font})</span>
                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                <div>
                        <Label className="text-sm font-medium text-gray-700">Font Weight</Label>
                        <Select defaultValue="medium">
                          <SelectTrigger className="mt-2">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="light">Light (300)</SelectItem>
                            <SelectItem value="normal">Normal (400)</SelectItem>
                            <SelectItem value="medium">Medium (500)</SelectItem>
                            <SelectItem value="semibold">Semibold (600)</SelectItem>
                            <SelectItem value="bold">Bold (700)</SelectItem>
                          </SelectContent>
                        </Select>
                </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-700">Font Size Scale</Label>
                        <Select defaultValue="medium">
                          <SelectTrigger className="mt-2">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="small">Small (14px base)</SelectItem>
                            <SelectItem value="medium">Medium (16px base)</SelectItem>
                            <SelectItem value="large">Large (18px base)</SelectItem>
                          </SelectContent>
                        </Select>
              </div>
            </div>

                    {/* Font Preview */}
              <div className="space-y-4">
                      <h4 className="text-sm font-medium text-gray-700">Font Preview</h4>
                      <div 
                        className="p-6 border border-gray-200 rounded-xl bg-white"
                        style={{ fontFamily: settings.branding.fontFamily }}
                      >
                        <div className="space-y-3">
                          <h1 className="text-2xl font-bold text-gray-900">Heading 1</h1>
                          <h2 className="text-xl font-semibold text-gray-800">Heading 2</h2>
                          <h3 className="text-lg font-medium text-gray-700">Heading 3</h3>
                          <p className="text-base text-gray-600">
                            This is a sample paragraph showing how your chosen font will look in regular text. 
                            It includes both uppercase and lowercase letters, numbers (123), and special characters (!@#).
                          </p>
                          <div className="flex gap-2">
                            <span 
                              className="px-3 py-1 rounded text-sm text-white"
                              style={{ backgroundColor: settings.branding.primaryColor }}
                            >
                              Primary Button
                            </span>
                            <span 
                              className="px-3 py-1 rounded text-sm text-white"
                              style={{ backgroundColor: settings.branding.secondaryColor }}
                            >
                              Secondary Button
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Brand Guidelines */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Brand Guidelines
                  </CardTitle>
                  <CardDescription>
                    Set up your brand voice and messaging guidelines
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                  <div>
                        <Label htmlFor="brandVoice" className="text-sm font-medium text-gray-700">Brand Voice</Label>
                        <Select value={settings.branding.brandVoice} onValueChange={(value) => updateSetting('branding.brandVoice', value)}>
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Select brand voice" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="professional">Professional & Formal</SelectItem>
                            <SelectItem value="friendly">Friendly & Approachable</SelectItem>
                            <SelectItem value="casual">Casual & Relaxed</SelectItem>
                            <SelectItem value="authoritative">Authoritative & Expert</SelectItem>
                            <SelectItem value="innovative">Innovative & Creative</SelectItem>
                          </SelectContent>
                        </Select>
                  </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-700">Brand Personality</Label>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          {[
                            { id: 'trustworthy', label: 'Trustworthy', icon: '🛡️' },
                            { id: 'innovative', label: 'Innovative', icon: '💡' },
                            { id: 'reliable', label: 'Reliable', icon: '⚡' },
                            { id: 'creative', label: 'Creative', icon: '🎨' },
                            { id: 'professional', label: 'Professional', icon: '💼' },
                            { id: 'friendly', label: 'Friendly', icon: '😊' }
                          ].map((trait) => (
                            <div
                              key={trait.id}
                              className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                                settings.branding.brandPersonality === trait.id
                                  ? 'border-blue-500 bg-blue-50'
                                  : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                              }`}
                              onClick={() => updateSetting('branding.brandPersonality', trait.id)}
                            >
                              <div className="text-center">
                                <div className="text-lg mb-1">{trait.icon}</div>
                                <div className="text-xs font-medium">{trait.label}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                  <div>
                        <Label htmlFor="brandGuidelines" className="text-sm font-medium text-gray-700">Brand Guidelines</Label>
                        <Textarea
                          id="brandGuidelines"
                          value={settings.branding.brandGuidelines}
                          onChange={(e) => updateSetting('branding.brandGuidelines', e.target.value)}
                          placeholder="Enter your company's core values and brand guidelines (e.g., Innovation, Quality, Customer Service)"
                          rows={4}
                          className="mt-2"
                        />
                  </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Brand Preview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    Brand Preview
                  </CardTitle>
                  <CardDescription>
                    See how your brand will appear across your system
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Header Preview */}
                    <div className="border border-gray-200 rounded-xl overflow-hidden">
                      <div className="bg-gray-100 px-4 py-2 flex items-center gap-2">
                        <div className="flex gap-1">
                          <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        </div>
                        <div className="flex-1 text-center">
                          <div className="text-xs text-gray-600 bg-white px-2 py-1 rounded">
                            {settings.branding.companyName} - Brand Preview
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-6 bg-white">
                        {/* Navigation Header */}
                        <div 
                          className="h-16 rounded-lg mb-6 flex items-center justify-between px-6"
                          style={{ backgroundColor: settings.branding.primaryColor + '10' }}
                        >
                          <div className="flex items-center gap-4">
                            {settings.branding.logo ? (
                              <img 
                                src={settings.branding.logo} 
                                alt="Logo" 
                                className="w-10 h-10 object-contain"
                              />
                            ) : (
                              <div 
                                className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-lg font-bold"
                                style={{ backgroundColor: settings.branding.primaryColor }}
                              >
                                {settings.branding.companyName[0]?.toUpperCase() || 'C'}
                              </div>
                            )}
                  <div>
                              <h1 
                                className="text-lg font-bold"
                                style={{ 
                                  color: settings.branding.primaryColor,
                                  fontFamily: settings.branding.fontFamily 
                                }}
                              >
                                {settings.branding.companyName}
                              </h1>
                              <p className="text-sm text-gray-600">Your Business Tagline</p>
                  </div>
                </div>
                          <div className="flex gap-2">
                            <button 
                              className="px-4 py-2 rounded-lg text-white text-sm font-medium"
                              style={{ backgroundColor: settings.branding.primaryColor }}
                            >
                              Sign In
                            </button>
                            <button 
                              className="px-4 py-2 rounded-lg text-white text-sm font-medium"
                              style={{ backgroundColor: settings.branding.secondaryColor }}
                            >
                              Get Started
                            </button>
              </div>
            </div>

                        {/* Content Preview */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                            <h2 
                              className="text-xl font-semibold"
                              style={{ 
                                color: settings.branding.primaryColor,
                                fontFamily: settings.branding.fontFamily 
                              }}
                            >
                              Welcome to {settings.branding.companyName}
                            </h2>
                            <p className="text-gray-600">
                              This is how your brand will appear throughout your system. 
                              Your colors, fonts, and logo create a cohesive brand experience.
                            </p>
                            <div className="flex gap-2">
                              <span 
                                className="px-3 py-1 rounded text-sm text-white"
                                style={{ backgroundColor: settings.branding.primaryColor }}
                              >
                                Primary Action
                              </span>
                              <span 
                                className="px-3 py-1 rounded text-sm text-white"
                                style={{ backgroundColor: settings.branding.secondaryColor }}
                              >
                                Secondary Action
                              </span>
                              <span 
                                className="px-3 py-1 rounded text-sm text-white"
                                style={{ backgroundColor: settings.branding.accentColor }}
                              >
                                Success Action
                              </span>
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <div className="p-4 rounded-lg border" style={{ borderColor: settings.branding.primaryColor + '30' }}>
                              <h3 className="font-semibold mb-2">Brand Elements</h3>
                              <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2">
                                  <div 
                                    className="w-4 h-4 rounded"
                                    style={{ backgroundColor: settings.branding.primaryColor }}
                                  ></div>
                                  <span>Primary Color</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div 
                                    className="w-4 h-4 rounded"
                                    style={{ backgroundColor: settings.branding.secondaryColor }}
                                  ></div>
                                  <span>Secondary Color</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div 
                                    className="w-4 h-4 rounded"
                                    style={{ backgroundColor: settings.branding.accentColor }}
                                  ></div>
                                  <span>Accent Color</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Export Options */}
                    <div className="flex gap-3">
                      <Button variant="outline" className="flex-1">
                        <Download className="w-4 h-4 mr-2" />
                        Export Brand Kit
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => {
                          const colorPalette = `${settings.branding.primaryColor}, ${settings.branding.secondaryColor}, ${settings.branding.accentColor}`
                          navigator.clipboard.writeText(colorPalette)
                        }}
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Brand Colors
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => setIsBrandGuidelinesOpen(true)}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Brand Guidelines
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Industry Tab */}
            <TabsContent value="industry" className="space-y-6">
              {/* Industry Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Choose Your Industry
                  </CardTitle>
                  <CardDescription>
                    Select your industry to get customized templates and workflows
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {industries.map((industry) => (
                      <div
                        key={industry.id}
                        className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                          settings.industry.type === industry.id
                            ? 'border-blue-500 bg-blue-50 shadow-md'
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                        onClick={() => updateSetting('industry.type', industry.id)}
                      >
                        <div className="text-center space-y-3">
                          <div className="text-3xl mb-3">{industry.icon}</div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-1">{industry.name}</h4>
                            <p className="text-xs text-gray-600">
                              {industry.id === 'restoration' && 'Water damage, fire restoration, mold remediation'}
                              {industry.id === 'healthcare' && 'Medical practices, clinics, healthcare providers'}
                              {industry.id === 'logistics' && 'Shipping, warehousing, supply chain management'}
                              {industry.id === 'real-estate' && 'Property management, real estate agencies'}
                              {industry.id === 'fintech' && 'Financial technology, digital banking'}
                              {industry.id === 'education' && 'Schools, universities, training institutions'}
                              {industry.id === 'retail' && 'E-commerce, retail stores, online shopping'}
                              {industry.id === 'custom' && 'Create your own custom industry setup'}
                            </p>
                          </div>
                          {settings.industry.type === industry.id && (
                            <div className="flex items-center justify-center gap-1 text-blue-600 text-sm">
                              <Check className="w-4 h-4" />
                              <span>Selected</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Business Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="w-5 h-5" />
                      Business Information
                    </CardTitle>
                    <CardDescription>
                      Provide details about your specific business
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label htmlFor="businessType" className="text-sm font-medium text-gray-700">
                        Business Type *
                      </Label>
                      <Input
                        id="businessType"
                        value={settings.industry.businessType}
                        onChange={(e) => updateSetting('industry.businessType', e.target.value)}
                        placeholder="e.g., Water Damage Restoration"
                        className="mt-2"
                      />
                      <p className="text-xs text-gray-600 mt-1">
                        Specific type of business within your industry
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="targetMarket" className="text-sm font-medium text-gray-700">
                        Target Market
                      </Label>
                      <Textarea
                        id="targetMarket"
                        value={settings.industry.targetMarket}
                        onChange={(e) => updateSetting('industry.targetMarket', e.target.value)}
                        placeholder="Describe your target market and ideal customers..."
                        rows={4}
                        className="mt-2"
                      />
                      <p className="text-xs text-gray-600 mt-1">
                        Help us customize your system for your specific audience
                      </p>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700">
                        Business Size
                      </Label>
                      <Select defaultValue="small">
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="startup">Startup (1-10 employees)</SelectItem>
                          <SelectItem value="small">Small Business (11-50 employees)</SelectItem>
                          <SelectItem value="medium">Medium Business (51-200 employees)</SelectItem>
                          <SelectItem value="large">Large Business (200+ employees)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700">
                        Annual Revenue
                      </Label>
                      <Select defaultValue="under-100k">
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under-100k">Under $100K</SelectItem>
                          <SelectItem value="100k-500k">$100K - $500K</SelectItem>
                          <SelectItem value="500k-1m">$500K - $1M</SelectItem>
                          <SelectItem value="1m-5m">$1M - $5M</SelectItem>
                          <SelectItem value="5m-plus">$5M+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Industry Features */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Industry Features
                    </CardTitle>
                    <CardDescription>
                      Enable industry-specific features and workflows
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { id: 'invoicing', label: 'Advanced Invoicing', description: 'Industry-specific billing templates', icon: '💰' },
                        { id: 'scheduling', label: 'Appointment Scheduling', description: 'Book and manage appointments', icon: '📅' },
                        { id: 'inventory', label: 'Inventory Management', description: 'Track equipment and supplies', icon: '📦' },
                        { id: 'reporting', label: 'Compliance Reporting', description: 'Generate required reports', icon: '📊' },
                        { id: 'mobile', label: 'Mobile App Access', description: 'Field team mobile access', icon: '📱' },
                        { id: 'integration', label: 'Third-party Integrations', description: 'Connect with industry tools', icon: '🔗' }
                      ].map((feature) => (
                        <div key={feature.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                  <div className="flex items-center gap-3">
                            <div className="text-2xl">{feature.icon}</div>
                            <div>
                              <h4 className="font-medium text-gray-900">{feature.label}</h4>
                              <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Custom Fields */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Custom Fields & Data Collection
                  </CardTitle>
                  <CardDescription>
                    Add custom fields specific to your industry and business needs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {settings.industry.customFields.length > 0 ? (
                      <div className="space-y-4">
                        {settings.industry.customFields.map((field, index) => (
                          <div key={index} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                            <div className="flex-1">
                              <Input
                                placeholder="Field name (e.g., License Number, Policy ID, etc.)"
                                value={field.name}
                                onChange={(e) => updateCustomField(index, 'name', e.target.value)}
                                className="mb-2"
                              />
                              <div className="flex items-center gap-2">
                                <Select
                                  value={field.type}
                                  onValueChange={(value) => updateCustomField(index, 'type', value)}
                                >
                                  <SelectTrigger className="w-40">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="text">Text Input</SelectItem>
                                    <SelectItem value="number">Number</SelectItem>
                                    <SelectItem value="email">Email</SelectItem>
                                    <SelectItem value="phone">Phone</SelectItem>
                                    <SelectItem value="date">Date</SelectItem>
                                    <SelectItem value="select">Dropdown</SelectItem>
                                    <SelectItem value="textarea">Long Text</SelectItem>
                                  </SelectContent>
                                </Select>
                                <div className="flex items-center gap-2">
                                  <Switch
                                    checked={field.required}
                                    onCheckedChange={(checked) => updateCustomField(index, 'required', checked)}
                                  />
                                  <span className="text-sm text-gray-600">Required</span>
                                </div>
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeCustomField(index)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <Settings className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p className="text-lg font-medium mb-2">No custom fields yet</p>
                        <p className="text-sm">Add fields specific to your industry</p>
                      </div>
                    )}
                    
                    <Button
                      variant="outline"
                      onClick={addCustomField}
                      className="w-full"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Custom Field
                    </Button>

                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <h4 className="text-sm font-medium text-blue-900 mb-2">Field Suggestions for {industries.find(i => i.id === settings.industry.type)?.name}</h4>
                      <div className="text-sm text-blue-800">
                        {settings.industry.type === 'restoration' && 'Consider: License Number, Insurance Provider, Property Address, Damage Type'}
                        {settings.industry.type === 'healthcare' && 'Consider: Patient ID, Insurance Number, Medical License, Specialization'}
                        {settings.industry.type === 'logistics' && 'Consider: Tracking Number, Delivery Address, Vehicle ID, Route Number'}
                        {settings.industry.type === 'real-estate' && 'Consider: Property ID, MLS Number, Commission Rate, Property Type'}
                        {settings.industry.type === 'fintech' && 'Consider: Account Number, Transaction ID, Compliance Status, Risk Level'}
                        {settings.industry.type === 'education' && 'Consider: Student ID, Course Code, Grade Level, Parent Contact'}
                        {settings.industry.type === 'retail' && 'Consider: SKU, Product Category, Supplier, Inventory Level'}
                        {settings.industry.type === 'custom' && 'Add any fields specific to your business needs'}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Modules Tab */}
            <TabsContent value="modules" className="space-y-6">
              {/* Core Modules */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    Core Modules
                  </CardTitle>
                  <CardDescription>
                    Enable the modules you need for your business operations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      {
                        key: 'website',
                        title: 'Website',
                        icon: '🌐',
                        description: 'Professional website with custom domain',
                        features: ['Custom pages', 'SEO optimization', 'Mobile responsive', 'Analytics integration'],
                        color: 'blue'
                      },
                      {
                        key: 'crm',
                        title: 'CRM System',
                        icon: '👥',
                        description: 'Customer relationship management',
                        features: ['Contact management', 'Lead tracking', 'Sales pipeline', 'Customer history'],
                        color: 'green'
                      },
                      {
                        key: 'analytics',
                        title: 'Analytics',
                        icon: '📊',
                        description: 'Business intelligence and reporting',
                        features: ['Performance metrics', 'Custom reports', 'Data visualization', 'Export capabilities'],
                        color: 'purple'
                      },
                      {
                        key: 'ecommerce',
                        title: 'E-commerce',
                        icon: '🛒',
                        description: 'Online store and payment processing',
                        features: ['Product catalog', 'Shopping cart', 'Payment gateway', 'Order management'],
                        color: 'orange'
                      },
                      {
                        key: 'blog',
                        title: 'Content Management',
                        icon: '📝',
                        description: 'Blog and content publishing',
                        features: ['Article editor', 'Media library', 'SEO tools', 'Content scheduling'],
                        color: 'teal'
                      },
                      {
                        key: 'support',
                        title: 'Support System',
                        icon: '🎧',
                        description: 'Customer support and ticketing',
                        features: ['Ticket management', 'Live chat', 'Knowledge base', 'Team collaboration'],
                        color: 'red'
                      }
                    ].map((module) => (
                      <div
                        key={module.key}
                        className={`p-6 rounded-xl border-2 transition-all duration-200 hover:shadow-lg ${
                          settings.modules[module.key as keyof typeof settings.modules]
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="text-3xl">{module.icon}</div>
                    <div>
                              <h3 className="font-semibold text-gray-900">{module.title}</h3>
                              <p className="text-sm text-gray-600">{module.description}</p>
                    </div>
                  </div>
                          <Switch
                            checked={settings.modules[module.key as keyof typeof settings.modules]}
                            onCheckedChange={(checked) => updateSetting(`modules.${module.key}`, checked)}
                          />
                </div>
                        
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-gray-700">Features included:</h4>
                          <ul className="space-y-1">
                            {module.features.map((feature, index) => (
                              <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                                <Check className="w-3 h-3 text-green-500" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        {settings.modules[module.key as keyof typeof settings.modules] && (
                          <div className="mt-4 flex items-center gap-2 text-blue-600 text-sm">
                            <Check className="w-4 h-4" />
                            <span>Active</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Module Configuration */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      Module Configuration
                    </CardTitle>
                    <CardDescription>
                      Configure settings for your enabled modules
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {settings.modules.website && (
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                          <Globe className="w-4 h-4" />
                          Website Settings
                        </h4>
                        <div className="space-y-3">
                          <div>
                            <Label className="text-sm font-medium text-gray-700">Domain Name</Label>
                            <Input placeholder="yourcompany.com" className="mt-1" />
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-700">Homepage Layout</Label>
                            <Select defaultValue="modern">
                              <SelectTrigger className="mt-1">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="modern">Modern</SelectItem>
                                <SelectItem value="classic">Classic</SelectItem>
                                <SelectItem value="minimal">Minimal</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    )}

                    {settings.modules.crm && (
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          CRM Settings
                        </h4>
                        <div className="space-y-3">
                          <div>
                            <Label className="text-sm font-medium text-gray-700">Sales Pipeline Stages</Label>
                            <Select defaultValue="standard">
                              <SelectTrigger className="mt-1">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="standard">Standard (5 stages)</SelectItem>
                                <SelectItem value="detailed">Detailed (8 stages)</SelectItem>
                                <SelectItem value="custom">Custom</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-700">Lead Scoring</Label>
                            <Switch defaultChecked />
                          </div>
                        </div>
                      </div>
                    )}

                    {settings.modules.analytics && (
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                          <BarChart3 className="w-4 h-4" />
                          Analytics Settings
                        </h4>
                        <div className="space-y-3">
                          <div>
                            <Label className="text-sm font-medium text-gray-700">Report Frequency</Label>
                            <Select defaultValue="weekly">
                              <SelectTrigger className="mt-1">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="daily">Daily</SelectItem>
                                <SelectItem value="weekly">Weekly</SelectItem>
                                <SelectItem value="monthly">Monthly</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-700">Data Retention</Label>
                            <Select defaultValue="2years">
                              <SelectTrigger className="mt-1">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1year">1 Year</SelectItem>
                                <SelectItem value="2years">2 Years</SelectItem>
                                <SelectItem value="unlimited">Unlimited</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Module Status */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="w-5 h-5" />
                      Module Status
                    </CardTitle>
                    <CardDescription>
                      Overview of your module configuration
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(settings.modules).map(([key, enabled]) => {
                        const moduleInfo = {
                          website: { icon: '🌐', color: 'blue' },
                          crm: { icon: '👥', color: 'green' },
                          analytics: { icon: '📊', color: 'purple' },
                          ecommerce: { icon: '🛒', color: 'orange' },
                          blog: { icon: '📝', color: 'teal' },
                          support: { icon: '🎧', color: 'red' }
                        }[key]

                        return (
                          <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                              <div className="text-2xl">{moduleInfo?.icon}</div>
                              <div>
                                <h4 className="font-medium text-gray-900 capitalize">
                                  {key === 'crm' ? 'CRM' : key === 'ecommerce' ? 'E-commerce' : key}
                                </h4>
                                <p className="text-sm text-gray-600">
                                  {enabled ? 'Module is active' : 'Module is disabled'}
                                </p>
                    </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className={`w-3 h-3 rounded-full ${enabled ? 'bg-green-500' : 'bg-gray-300'}`} />
                              <Badge variant={enabled ? 'default' : 'secondary'}>
                                {enabled ? 'Active' : 'Inactive'}
                              </Badge>
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <h4 className="text-sm font-medium text-blue-900 mb-2">Module Recommendations</h4>
                      <div className="text-sm text-blue-800">
                        {Object.values(settings.modules).filter(Boolean).length === 0 && 'Enable at least one module to get started'}
                        {Object.values(settings.modules).filter(Boolean).length === 1 && 'Consider adding more modules for a complete business solution'}
                        {Object.values(settings.modules).filter(Boolean).length >= 2 && 'Great! You have a comprehensive setup'}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Integrations Tab */}
            <TabsContent value="integrations" className="space-y-6">
              {/* Available Integrations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Third-Party Integrations
                  </CardTitle>
                  <CardDescription>
                    Connect your favorite tools and services to streamline your workflow
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      {
                        key: 'googleAnalytics',
                        name: 'Google Analytics',
                        icon: '📊',
                        description: 'Website analytics and user behavior tracking',
                        features: ['Page views', 'User demographics', 'Conversion tracking', 'Real-time data'],
                        color: 'blue',
                        category: 'Analytics'
                      },
                      {
                        key: 'mailchimp',
                        name: 'Mailchimp',
                        icon: '📧',
                        description: 'Email marketing and automation platform',
                        features: ['Email campaigns', 'Automation workflows', 'Audience segmentation', 'A/B testing'],
                        color: 'green',
                        category: 'Marketing'
                      },
                      {
                        key: 'stripe',
                        name: 'Stripe',
                        icon: '💳',
                        description: 'Payment processing and billing management',
                        features: ['Online payments', 'Subscription billing', 'Invoice generation', 'Financial reporting'],
                        color: 'purple',
                        category: 'Payments'
                      },
                      {
                        key: 'slack',
                        name: 'Slack',
                        icon: '💬',
                        description: 'Team communication and collaboration',
                        features: ['Team messaging', 'File sharing', 'Bot notifications', 'Workflow automation'],
                        color: 'orange',
                        category: 'Communication'
                      }
                    ].map((integration) => (
                      <div
                        key={integration.key}
                        className={`p-6 rounded-xl border-2 transition-all duration-200 hover:shadow-lg ${
                          settings.integrations[integration.key as keyof typeof settings.integrations].enabled
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="text-3xl">{integration.icon}</div>
                    <div>
                              <h3 className="font-semibold text-gray-900">{integration.name}</h3>
                              <p className="text-sm text-gray-600">{integration.description}</p>
                              <Badge variant="outline" className="mt-1 text-xs">
                                {integration.category}
                              </Badge>
                    </div>
                  </div>
                          <Switch
                            checked={settings.integrations[integration.key as keyof typeof settings.integrations].enabled}
                            onCheckedChange={(checked) => updateSetting(`integrations.${integration.key}.enabled`, checked)}
                          />
                </div>
                        
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-gray-700">Features:</h4>
                          <ul className="space-y-1">
                            {integration.features.map((feature, index) => (
                              <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                                <Check className="w-3 h-3 text-green-500" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        {settings.integrations[integration.key as keyof typeof settings.integrations].enabled && (
                          <div className="mt-4 flex items-center gap-2 text-blue-600 text-sm">
                            <Check className="w-4 h-4" />
                            <span>Connected</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Integration Configuration */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      Integration Settings
                    </CardTitle>
                    <CardDescription>
                      Configure your enabled integrations
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {Object.entries(settings.integrations).map(([key, config]) => {
                      const integrationInfo = {
                        googleAnalytics: { name: 'Google Analytics', icon: '📊', color: 'blue' },
                        mailchimp: { name: 'Mailchimp', icon: '📧', color: 'green' },
                        stripe: { name: 'Stripe', icon: '💳', color: 'purple' },
                        slack: { name: 'Slack', icon: '💬', color: 'orange' }
                      }[key]

                      if (!config.enabled) return null

                      return (
                        <div key={key} className="p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="text-2xl">{integrationInfo?.icon}</div>
                            <div>
                              <h4 className="font-medium text-gray-900">{integrationInfo?.name}</h4>
                              <p className="text-sm text-gray-600">Configuration settings</p>
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <div>
                              <Label className="text-sm font-medium text-gray-700">
                                {key === 'googleAnalytics' ? 'Google Analytics Tracking ID' :
                                 key === 'mailchimp' ? 'Mailchimp API Key' :
                                 key === 'stripe' ? 'Stripe Publishable Key' :
                                 key === 'slack' ? 'Slack Webhook URL' : 'Configuration'}
                              </Label>
                              <Input
                                value={
                                  key === 'googleAnalytics' ? (config as any).trackingId :
                                  key === 'mailchimp' ? (config as any).apiKey :
                                  key === 'stripe' ? (config as any).publishableKey :
                                  key === 'slack' ? (config as any).webhookUrl : ''
                                }
                                onChange={(e) => {
                                  const field = key === 'googleAnalytics' ? 'trackingId' :
                                              key === 'mailchimp' ? 'apiKey' :
                                              key === 'stripe' ? 'publishableKey' :
                                              'webhookUrl'
                                  updateSetting(`integrations.${key}.${field}`, e.target.value)
                                }}
                                placeholder={
                                  key === 'googleAnalytics' ? 'G-XXXXXXXXXX' :
                                  key === 'mailchimp' ? 'Your API key' :
                                  key === 'stripe' ? 'pk_test_...' :
                                  key === 'slack' ? 'https://hooks.slack.com/...' : 'Configuration value'
                                }
                                className="mt-2"
                              />
                              <p className="text-xs text-gray-600 mt-1">
                                {key === 'googleAnalytics' && 'Find this in your Google Analytics property settings'}
                                {key === 'mailchimp' && 'Get this from your Mailchimp account settings'}
                                {key === 'stripe' && 'Available in your Stripe dashboard under API keys'}
                                {key === 'slack' && 'Create a webhook in your Slack workspace settings'}
                              </p>
                            </div>

                            {key === 'googleAnalytics' && (
                              <div className="flex items-center gap-2">
                                <Switch defaultChecked />
                                <span className="text-sm text-gray-600">Enhanced ecommerce tracking</span>
                              </div>
                            )}

                            {key === 'mailchimp' && (
                              <div className="space-y-2">
                                <Label className="text-sm font-medium text-gray-700">Default Audience</Label>
                                <Select defaultValue="main">
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="main">Main Audience</SelectItem>
                                    <SelectItem value="newsletter">Newsletter Subscribers</SelectItem>
                                    <SelectItem value="customers">Customers Only</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            )}

                            {key === 'stripe' && (
                              <div className="space-y-2">
                                <Label className="text-sm font-medium text-gray-700">Payment Methods</Label>
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2">
                                    <Switch defaultChecked />
                                    <span className="text-sm text-gray-600">Credit Cards</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Switch defaultChecked />
                                    <span className="text-sm text-gray-600">Bank Transfers</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Switch />
                                    <span className="text-sm text-gray-600">Digital Wallets</span>
                                  </div>
                                </div>
                              </div>
                            )}

                            {key === 'slack' && (
                              <div className="space-y-2">
                                <Label className="text-sm font-medium text-gray-700">Notification Types</Label>
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2">
                                    <Switch defaultChecked />
                                    <span className="text-sm text-gray-600">New leads</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Switch defaultChecked />
                                    <span className="text-sm text-gray-600">System alerts</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Switch />
                                    <span className="text-sm text-gray-600">Daily reports</span>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })}

                    {Object.values(settings.integrations).every(config => !config.enabled) && (
                      <div className="text-center py-8 text-gray-500">
                        <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p className="text-lg font-medium mb-2">No integrations enabled</p>
                        <p className="text-sm">Enable integrations above to configure them</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Integration Status */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="w-5 h-5" />
                      Integration Status
                    </CardTitle>
                    <CardDescription>
                      Monitor your connected services
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(settings.integrations).map(([key, config]) => {
                        const integrationInfo = {
                          googleAnalytics: { name: 'Google Analytics', icon: '📊', color: 'blue' },
                          mailchimp: { name: 'Mailchimp', icon: '📧', color: 'green' },
                          stripe: { name: 'Stripe', icon: '💳', color: 'purple' },
                          slack: { name: 'Slack', icon: '💬', color: 'orange' }
                        }[key]

                        return (
                          <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                              <div className="text-2xl">{integrationInfo?.icon}</div>
                              <div>
                                <h4 className="font-medium text-gray-900">{integrationInfo?.name}</h4>
                                <p className="text-sm text-gray-600">
                                  {config.enabled ? 'Integration is active' : 'Integration is disabled'}
                                </p>
                    </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className={`w-3 h-3 rounded-full ${config.enabled ? 'bg-green-500' : 'bg-gray-300'}`} />
                              <Badge variant={config.enabled ? 'default' : 'secondary'}>
                                {config.enabled ? 'Connected' : 'Disconnected'}
                              </Badge>
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    <div className="mt-6 p-4 bg-green-50 rounded-lg">
                      <h4 className="text-sm font-medium text-green-900 mb-2">Integration Benefits</h4>
                      <div className="text-sm text-green-800 space-y-1">
                        <p>• Automate data synchronization</p>
                        <p>• Reduce manual work</p>
                        <p>• Improve data accuracy</p>
                        <p>• Streamline workflows</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Theme Tab */}
            <TabsContent value="theme" className="space-y-6">
              {/* Theme Presets */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="w-5 h-5" />
                    Choose Your Style
                  </CardTitle>
                  <CardDescription>
                    Select a theme that matches your brand and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { 
                        id: 'light', 
                        name: 'Light & Clean', 
                        description: 'Perfect for professional environments', 
                        colors: ['#ffffff', '#f8fafc', '#3b82f6'], 
                        icon: '☀️',
                        preview: 'bg-white border-gray-200'
                      },
                      { 
                        id: 'dark', 
                        name: 'Dark & Modern', 
                        description: 'Sleek and contemporary design', 
                        colors: ['#1f2937', '#374151', '#8b5cf6'], 
                        icon: '🌙',
                        preview: 'bg-gray-900 border-gray-700'
                      },
                      { 
                        id: 'auto', 
                        name: 'Smart Auto', 
                        description: 'Adapts to your system preference', 
                        colors: ['#f8fafc', '#1f2937', '#10b981'], 
                        icon: '🔄',
                        preview: 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-300'
                      },
                      { 
                        id: 'custom', 
                        name: 'Custom Theme', 
                        description: 'Create your own unique style', 
                        colors: ['#8b5cf6', '#06b6d4', '#10b981'], 
                        icon: '🎨',
                        preview: 'bg-gradient-to-br from-purple-100 to-cyan-100 border-purple-200'
                      }
                    ].map((theme) => (
                      <div
                        key={theme.id}
                        className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                          settings.theme.mode === theme.id
                            ? 'border-blue-500 bg-blue-50 shadow-md'
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                        onClick={() => updateSetting('theme.mode', theme.id)}
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div className="text-2xl">{theme.icon}</div>
                    <div>
                            <h4 className="font-semibold text-gray-900">{theme.name}</h4>
                            <p className="text-sm text-gray-600">{theme.description}</p>
                    </div>
                  </div>
                        
                        {/* Color Preview */}
                        <div className="flex gap-2 mb-4">
                          {theme.colors.map((color, index) => (
                            <div
                              key={index}
                              className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                </div>
                        
                        {/* Live Preview */}
                        <div className={`p-3 rounded-lg border ${theme.preview}`}>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
                          <div className="space-y-1">
                            <div className="h-2 bg-gray-300 rounded w-3/4"></div>
                            <div className="h-2 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Layout & Navigation */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      Layout & Navigation
                    </CardTitle>
                    <CardDescription>
                      Customize your interface layout
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Sidebar Style</Label>
                      <div className="grid grid-cols-3 gap-2 mt-3">
                        {[
                          { id: 'default', name: 'Default', icon: '📋', description: 'Full sidebar with labels' },
                          { id: 'compact', name: 'Compact', icon: '📄', description: 'Condensed sidebar' },
                          { id: 'minimal', name: 'Minimal', icon: '📝', description: 'Icon-only sidebar' }
                        ].map((style) => (
                          <div
                            key={style.id}
                            className={`p-4 rounded-lg border-2 cursor-pointer transition-all text-center hover:shadow-md ${
                              settings.theme.sidebarStyle === style.id
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            onClick={() => updateSetting('theme.sidebarStyle', style.id)}
                          >
                            <div className="text-2xl mb-2">{style.icon}</div>
                            <div className="text-sm font-medium text-gray-900">{style.name}</div>
                            <div className="text-xs text-gray-600 mt-1">{style.description}</div>
                </div>
                        ))}
              </div>
            </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700">Header Style</Label>
                      <div className="grid grid-cols-3 gap-2 mt-3">
                        {[
                          { id: 'default', name: 'Default', icon: '📊', description: 'Standard header' },
                          { id: 'transparent', name: 'Transparent', icon: '👻', description: 'See-through header' },
                          { id: 'glass', name: 'Glass', icon: '🔮', description: 'Frosted glass effect' }
                        ].map((style) => (
                          <div
                            key={style.id}
                            className={`p-4 rounded-lg border-2 cursor-pointer transition-all text-center hover:shadow-md ${
                              settings.theme.headerStyle === style.id
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            onClick={() => updateSetting('theme.headerStyle', style.id)}
                          >
                            <div className="text-2xl mb-2">{style.icon}</div>
                            <div className="text-sm font-medium text-gray-900">{style.name}</div>
                            <div className="text-xs text-gray-600 mt-1">{style.description}</div>
          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Color Customization */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Palette className="w-5 h-5" />
                      Color Customization
                    </CardTitle>
                    <CardDescription>
                      Fine-tune your color scheme
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Primary Color</Label>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="relative">
                          <input
                            type="color"
                            value={settings.branding.primaryColor}
                            onChange={(e) => updateSetting('branding.primaryColor', e.target.value)}
                            className="w-12 h-12 rounded-lg border-2 border-gray-300 cursor-pointer shadow-sm hover:shadow-md transition-shadow"
                          />
                          <div className="absolute inset-0 rounded-lg border-2 border-white shadow-inner"></div>
                        </div>
                        <div className="flex-1">
                          <Input
                            value={settings.branding.primaryColor}
                            onChange={(e) => updateSetting('branding.primaryColor', e.target.value)}
                            className="text-sm font-mono"
                            placeholder="#3b82f6"
                          />
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-gray-600">
                        Used for buttons, links, and primary actions
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700">Secondary Color</Label>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="relative">
                          <input
                            type="color"
                            value={settings.branding.secondaryColor}
                            onChange={(e) => updateSetting('branding.secondaryColor', e.target.value)}
                            className="w-12 h-12 rounded-lg border-2 border-gray-300 cursor-pointer shadow-sm hover:shadow-md transition-shadow"
                          />
                          <div className="absolute inset-0 rounded-lg border-2 border-white shadow-inner"></div>
                        </div>
                        <div className="flex-1">
                          <Input
                            value={settings.branding.secondaryColor}
                            onChange={(e) => updateSetting('branding.secondaryColor', e.target.value)}
                            className="text-sm font-mono"
                            placeholder="#06b6d4"
                          />
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-gray-600">
                        Used for secondary actions and highlights
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700">Accent Color</Label>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="relative">
                          <input
                            type="color"
                            value={settings.branding.accentColor}
                            onChange={(e) => updateSetting('branding.accentColor', e.target.value)}
                            className="w-12 h-12 rounded-lg border-2 border-gray-300 cursor-pointer shadow-sm hover:shadow-md transition-shadow"
                          />
                          <div className="absolute inset-0 rounded-lg border-2 border-white shadow-inner"></div>
                        </div>
                        <div className="flex-1">
                          <Input
                            value={settings.branding.accentColor}
                            onChange={(e) => updateSetting('branding.accentColor', e.target.value)}
                            className="text-sm font-mono"
                            placeholder="#10b981"
                          />
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-gray-600">
                        Used for success states and positive actions
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <Button variant="outline" size="sm" className="w-full">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Reset to Default Colors
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Live Preview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="w-5 h-5" />
                      Live Preview
                    </CardTitle>
                    <CardDescription>
                      See your changes in real-time
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Device Selector */}
                      <div className="flex gap-1 p-1 bg-gray-100 rounded-lg">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex-1 text-xs"
                        >
                          <Smartphone className="w-3 h-3 mr-1" />
                          Mobile
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex-1 text-xs"
                        >
                          <Tablet className="w-3 h-3 mr-1" />
                          Tablet
                        </Button>
                        <Button
                          variant="default"
                          size="sm"
                          className="flex-1 text-xs"
                        >
                          <Laptop className="w-3 h-3 mr-1" />
                          Desktop
                        </Button>
                      </div>

                      {/* Preview Window */}
                      <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                        {/* Browser Header */}
                        <div className="bg-gray-100 px-3 py-2 flex items-center gap-2">
                          <div className="flex gap-1">
                            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                          </div>
                          <div className="flex-1 text-center">
                            <div className="text-xs text-gray-600 bg-white px-2 py-1 rounded">
                              {settings.branding.companyName} - Preview
                    </div>
                  </div>
                </div>

                        {/* Preview Content */}
                        <div className="p-4">
                          {/* Header Preview */}
                          <div 
                            className={`h-12 rounded-lg mb-4 flex items-center px-4 ${
                              settings.theme.headerStyle === 'transparent' 
                                ? 'bg-transparent border border-gray-200' 
                                : settings.theme.headerStyle === 'glass'
                                ? 'bg-white/80 backdrop-blur-sm border border-gray-200'
                                : 'bg-gray-50'
                            }`}
                            style={{ 
                              backgroundColor: settings.theme.headerStyle === 'default' ? settings.branding.primaryColor + '20' : undefined 
                            }}
                          >
                  <div className="flex items-center gap-3">
                              <div 
                                className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
                                style={{ backgroundColor: settings.branding.primaryColor }}
                              >
                                {settings.branding.companyName[0]?.toUpperCase() || 'C'}
                              </div>
                              <div className="text-sm font-medium">{settings.branding.companyName}</div>
                            </div>
                          </div>

                          {/* Sidebar Preview */}
                          <div className="flex gap-4">
                            <div 
                              className={`w-16 rounded-lg p-2 ${
                                settings.theme.sidebarStyle === 'compact' ? 'w-12' : 
                                settings.theme.sidebarStyle === 'minimal' ? 'w-8' : 'w-16'
                              }`}
                              style={{ backgroundColor: settings.branding.primaryColor + '10' }}
                            >
                              <div className="space-y-2">
                                <div className="h-2 bg-gray-300 rounded w-full"></div>
                                <div className="h-2 bg-gray-300 rounded w-3/4"></div>
                                <div className="h-2 bg-gray-300 rounded w-1/2"></div>
                              </div>
                            </div>

                            {/* Main Content Preview */}
                            <div className="flex-1 space-y-3">
                              <div 
                                className="h-4 rounded"
                                style={{ backgroundColor: settings.branding.primaryColor + '30' }}
                              ></div>
                              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                              <div className="flex gap-2 mt-4">
                                <div 
                                  className="px-3 py-1 rounded text-white text-xs"
                                  style={{ backgroundColor: settings.branding.primaryColor }}
                                >
                                  Primary
                                </div>
                                <div 
                                  className="px-3 py-1 rounded text-white text-xs"
                                  style={{ backgroundColor: settings.branding.secondaryColor }}
                                >
                                  Secondary
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Preview Actions */}
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Download className="w-4 h-4 mr-2" />
                          Export Theme
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Copy className="w-4 h-4 mr-2" />
                          Copy CSS
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Advanced Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Advanced Settings
                  </CardTitle>
                  <CardDescription>
                    Fine-tune your theme with advanced options
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Border Radius</Label>
                      <div className="mt-2">
                        <input
                          type="range"
                          min="0"
                          max="20"
                          value="8"
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="text-xs text-gray-600 mt-1">8px - Rounded corners</div>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700">Shadow Intensity</Label>
                      <div className="mt-2">
                        <input
                          type="range"
                          min="0"
                          max="10"
                          value="3"
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="text-xs text-gray-600 mt-1">Medium - Subtle depth</div>
                  </div>
                </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700">Animation Speed</Label>
                      <Select defaultValue="normal">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="slow">Slow & Smooth</SelectItem>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="fast">Fast & Snappy</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700">Font Size</Label>
                      <Select defaultValue="medium">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Small (14px)</SelectItem>
                          <SelectItem value="medium">Medium (16px)</SelectItem>
                          <SelectItem value="large">Large (18px)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Preview Tab */}
            <TabsContent value="preview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    Live Preview
                  </CardTitle>
                  <CardDescription>
                    See how your customizations will look in the final system
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-100 px-4 py-2 flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                      <div className="flex-1 text-center text-sm text-gray-600">
                        {settings.branding.companyName} - Preview
            </div>
          </div>

                    <div className="p-6 bg-white">
                      <div className="text-center py-12">
                        <div 
                          className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold"
                          style={{ backgroundColor: settings.branding.primaryColor }}
                        >
                          {settings.branding.companyName[0]?.toUpperCase() || 'C'}
                        </div>
                        <h2 
                          className="text-2xl font-bold mb-2"
                          style={{ 
                            color: settings.branding.primaryColor,
                            fontFamily: settings.branding.fontFamily 
                          }}
                        >
                          {settings.branding.companyName}
                        </h2>
                        <p className="text-gray-600 mb-6">
                          {settings.industry.businessType}
                        </p>
                        
                        <div className="flex justify-center gap-4">
                          <div 
                            className="px-4 py-2 rounded-lg text-white text-sm"
                            style={{ backgroundColor: settings.branding.primaryColor }}
                          >
                            Primary Action
                          </div>
                          <div 
                            className="px-4 py-2 rounded-lg text-white text-sm"
                            style={{ backgroundColor: settings.branding.secondaryColor }}
                          >
                            Secondary Action
                </div>
              </div>
            </div>
          </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Brand Guidelines Modal */}
        <BrandGuidelinesModal />
      </PortalLayout>
    </ProtectedRoute>
  )
}
