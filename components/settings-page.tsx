"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import { 
  Settings, User, Building2, Bell, Palette, Globe, Database,
  Save, RefreshCw, CheckCircle, AlertCircle, X,
  Mail, Phone, MapPin, Calendar, Globe as GlobeIcon
} from "lucide-react"

export default function SettingsPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState('profile')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: '',
    title: '',
    department: ''
  })

  const [companyData, setCompanyData] = useState({
    name: user?.tenant?.name || '',
    industry: user?.tenant?.industry || '',
    website: '',
    address: '',
    phone: '',
    email: ''
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    dealUpdates: true,
    contactUpdates: true,
    activityReminders: true,
    weeklyReports: true
  })

  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: 'default',
    language: 'en',
    timezone: 'UTC'
  })

  const [integrations, setIntegrations] = useState([
    { name: 'Slack', status: 'connected', enabled: true },
    { name: 'Zapier', status: 'available', enabled: false },
    { name: 'Mailchimp', status: 'available', enabled: false },
    { name: 'Stripe', status: 'connected', enabled: true },
    { name: 'Google Workspace', status: 'available', enabled: false },
    { name: 'Salesforce', status: 'available', enabled: false }
  ])


  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'company', name: 'Company', icon: Building2 },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'appearance', name: 'Appearance', icon: Palette },
    { id: 'integrations', name: 'Integrations', icon: Globe }
  ]

  const validateForm = (section: string) => {
    const newErrors: Record<string, string> = {}
    
    switch (section) {
      case 'profile':
        if (!profileData.firstName.trim()) newErrors.firstName = 'First name is required'
        if (!profileData.lastName.trim()) newErrors.lastName = 'Last name is required'
        if (!profileData.email.trim()) newErrors.email = 'Email is required'
        else if (!/\S+@\S+\.\S+/.test(profileData.email)) newErrors.email = 'Email is invalid'
        break
      case 'company':
        if (!companyData.name.trim()) newErrors.name = 'Company name is required'
        if (!companyData.industry.trim()) newErrors.industry = 'Industry is required'
        break
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = async (section: string) => {
    if (!validateForm(section)) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors before saving.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      let endpoint = ''
      let data = {}
      
      switch (section) {
        case 'profile':
          endpoint = '/api/user/profile'
          data = profileData
          break
        case 'company':
          endpoint = '/api/company'
          data = companyData
          break
        case 'notifications':
          endpoint = '/api/user/notifications'
          data = notificationSettings
          break
        case 'appearance':
          endpoint = '/api/user/appearance'
          data = appearanceSettings
          break
        case 'integrations':
          endpoint = '/api/user/integrations'
          data = { integrations }
          break
        default:
          throw new Error('Invalid section')
      }

      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to save settings')
      }

      toast({
        title: "Settings saved successfully",
        description: `Your ${section} settings have been updated.`,
      })
    } catch (error) {
      console.error('Error saving settings:', error)
      toast({
        title: "Error saving settings",
        description: "There was an error saving your settings. Please try again.",
        variant: "destructive",
      })
    } finally {
    setIsLoading(false)
    }
  }

  const handleInputChange = (section: string, field: string, value: string | boolean) => {
    switch (section) {
      case 'profile':
        setProfileData(prev => ({ ...prev, [field]: value }))
        break
      case 'company':
        setCompanyData(prev => ({ ...prev, [field]: value }))
        break
      case 'notifications':
        setNotificationSettings(prev => ({ ...prev, [field]: value }))
        break
      case 'appearance':
        setAppearanceSettings(prev => ({ ...prev, [field]: value }))
        break
    }
  }

  const handleIntegrationToggle = (integrationName: string) => {
    setIntegrations(prev => 
      prev.map(integration => 
        integration.name === integrationName 
          ? { ...integration, enabled: !integration.enabled }
          : integration
      )
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Manage your account and system preferences</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-purple-100 text-purple-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.name}
                  </button>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Profile Settings */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Profile Information</h3>
                <button
                  onClick={() => handleSave('profile')}
                  disabled={isLoading}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50"
                >
                  {isLoading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  Save Changes
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input
                    type="text"
                    value={profileData.firstName}
                    onChange={(e) => handleInputChange('profile', 'firstName', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                      errors.firstName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    value={profileData.lastName}
                    onChange={(e) => handleInputChange('profile', 'lastName', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                      errors.lastName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleInputChange('profile', 'email', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => handleInputChange('profile', 'phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                  <input
                    type="text"
                    value={profileData.title}
                    onChange={(e) => handleInputChange('profile', 'title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <input
                    type="text"
                    value={profileData.department}
                    onChange={(e) => handleInputChange('profile', 'department', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Company Settings */}
          {activeTab === 'company' && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Company Information</h3>
                <button
                  onClick={() => handleSave('company')}
                  disabled={isLoading}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50"
                >
                  {isLoading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  Save Changes
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                  <input
                    type="text"
                    value={companyData.name}
                    onChange={(e) => handleInputChange('company', 'name', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                  <select
                    value={companyData.industry}
                    onChange={(e) => handleInputChange('company', 'industry', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                      errors.industry ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select Industry</option>
                    <option value="restoration">Restoration</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="logistics">Logistics</option>
                    <option value="real-estate">Real Estate</option>
                    <option value="fintech">FinTech</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.industry && (
                    <p className="mt-1 text-sm text-red-600">{errors.industry}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                  <input
                    type="url"
                    value={companyData.website}
                    onChange={(e) => handleInputChange('company', 'website', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={companyData.phone}
                    onChange={(e) => handleInputChange('company', 'phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <textarea
                    value={companyData.address}
                    onChange={(e) => handleInputChange('company', 'address', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Notification Preferences</h3>
                <button
                  onClick={() => handleSave('notifications')}
                  disabled={isLoading}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50"
                >
                  {isLoading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  Save Changes
                </button>
              </div>
              <div className="space-y-4">
                {Object.entries(notificationSettings).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {key.includes('email') ? 'Receive notifications via email' :
                         key.includes('sms') ? 'Receive notifications via SMS' :
                         key.includes('deal') ? 'Get notified about deal updates' :
                         key.includes('contact') ? 'Get notified about contact changes' :
                         key.includes('activity') ? 'Receive activity reminders' :
                         key.includes('weekly') ? 'Get weekly performance reports' : ''}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => handleInputChange('notifications', key, e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}


          {/* Appearance Settings */}
          {activeTab === 'appearance' && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Appearance Settings</h3>
                <button
                  onClick={() => handleSave('appearance')}
                  disabled={isLoading}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50"
                >
                  {isLoading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  Save Changes
                </button>
              </div>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Theme</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { id: 'default', name: 'Default', colors: 'from-purple-500 to-pink-500' },
                      { id: 'ocean', name: 'Ocean', colors: 'from-blue-500 to-cyan-500' },
                      { id: 'forest', name: 'Forest', colors: 'from-green-500 to-emerald-500' }
                    ].map((theme) => (
                      <button
                        key={theme.id}
                        onClick={() => handleInputChange('appearance', 'theme', theme.id)}
                        className={`p-4 border-2 rounded-lg transition-all ${
                          appearanceSettings.theme === theme.id
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className={`w-full h-8 bg-gradient-to-r ${theme.colors} rounded mb-2`}></div>
                        <p className="text-sm font-medium text-gray-900">{theme.name}</p>
                    </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                    <select
                      value={appearanceSettings.language}
                      onChange={(e) => handleInputChange('appearance', 'language', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                    <select
                      value={appearanceSettings.timezone}
                      onChange={(e) => handleInputChange('appearance', 'timezone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="UTC">UTC</option>
                      <option value="America/New_York">Eastern Time</option>
                      <option value="America/Chicago">Central Time</option>
                      <option value="America/Denver">Mountain Time</option>
                      <option value="America/Los_Angeles">Pacific Time</option>
                      <option value="Europe/London">London</option>
                      <option value="Europe/Paris">Paris</option>
                      <option value="Asia/Tokyo">Tokyo</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Integrations Settings */}
          {activeTab === 'integrations' && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Integrations</h3>
                <button
                  onClick={() => handleSave('integrations')}
                  disabled={isLoading}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50"
                >
                  {isLoading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  Save Changes
                </button>
              </div>
              <div className="space-y-4">
                {integrations.map((integration, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                        <GlobeIcon className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{integration.name}</h4>
                        <p className="text-sm text-gray-600">Third-party integration</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        integration.status === 'connected' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {integration.status === 'connected' ? 'Connected' : 'Available'}
                      </span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={integration.enabled}
                          onChange={() => handleIntegrationToggle(integration.name)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                      <button 
                        className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        onClick={() => {
                          if (integration.status === 'connected') {
                            // Handle disconnect
                            toast({
                              title: "Integration disconnected",
                              description: `${integration.name} has been disconnected.`,
                            })
                          } else {
                            // Handle connect
                            toast({
                              title: "Integration connected",
                              description: `${integration.name} has been connected successfully.`,
                            })
                          }
                        }}
                      >
                        {integration.status === 'connected' ? 'Manage' : 'Connect'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
