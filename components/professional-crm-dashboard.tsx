"use client"

import {
  Activity,
  ArrowUp,
  BarChart3,
  Bell,
  Building2,
  Calendar,
  CheckSquare,
  Database,
  DollarSign,
  Download,
  Edit,
  Eye,
  FileText,
  Filter,
  Mail,
  Maximize2,
  Minimize2,
  MoreHorizontal,
  Phone,
  PieChart,
  Plus,
  RefreshCw,
  RotateCcw,
  Search,
  Settings,
  Shield,
  Target,
  TrendingUp,
  Truck,
  Upload,
  User,
  Users
} from "lucide-react"
import { useEffect, useRef, useState } from "react"

interface Contact {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  title: string
  status: 'lead' | 'prospect' | 'customer' | 'inactive'
  source: string
  tags: string[]
  customData: any
  notes: string
  company: {
    id: string
    name: string
    industry: string
  }
  assignedUser: {
    id: string
    firstName: string
    lastName: string
    email: string
  }
  createdAt: string
  updatedAt: string
  _count: {
    deals: number
    activities: number
  }
}

interface Deal {
  id: string
  title: string
  description: string
  value: number
  stage: string
  probability: number
  closeDate: string
  source: string
  tags: string[]
  customData: any
  contact: {
    id: string
    firstName: string
    lastName: string
    email: string
  }
  company: {
    id: string
    name: string
    industry: string
  }
  assignedUser: {
    id: string
    firstName: string
    lastName: string
  }
  createdAt: string
  updatedAt: string
  _count: {
    activities: number
  }
}

interface Activity {
  id: string
  type: 'call' | 'email' | 'meeting' | 'task' | 'note' | 'follow_up'
  title: string
  description: string
  dueDate: string
  completedAt: string
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  customData: any
  contact: {
    id: string
    firstName: string
    lastName: string
  }
  deal: {
    id: string
    title: string
  }
  assignedUser: {
    id: string
    firstName: string
    lastName: string
  }
  createdAt: string
  updatedAt: string
}

interface DashboardStats {
  totalContacts: number
  totalDeals: number
  totalValue: number
  wonDeals: number
  lostDeals: number
  activeDeals: number
  thisMonthRevenue: number
  lastMonthRevenue: number
  revenueGrowth: number
  conversionRate: number
  averageDealSize: number
  pipelineValue: number
}

export default function ProfessionalCRMDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedIndustry, setSelectedIndustry] = useState('restoration')
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [contacts, setContacts] = useState<Contact[]>([])
  const [deals, setDeals] = useState<Deal[]>([])
  const [activities, setActivities] = useState<Activity[]>([])
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null)
  const [showContactModal, setShowContactModal] = useState(false)
  const [showDealModal, setShowDealModal] = useState(false)
  const [showActivityModal, setShowActivityModal] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  const industries = [
    { id: 'restoration', name: 'Restoration', color: 'from-red-500 to-pink-500', icon: Shield },
    { id: 'healthcare', name: 'Healthcare', color: 'from-emerald-500 to-teal-500', icon: Users },
    { id: 'logistics', name: 'Logistics', color: 'from-orange-500 to-amber-500', icon: Truck },
    { id: 'real-estate', name: 'Real Estate', color: 'from-blue-500 to-cyan-500', icon: Building2 },
    { id: 'fintech', name: 'FinTech', color: 'from-green-500 to-emerald-500', icon: DollarSign }
  ]

  const dealStages = [
    'Qualification',
    'Needs Analysis',
    'Proposal',
    'Negotiation',
    'Closed Won',
    'Closed Lost'
  ]

  const activityTypes = [
    { type: 'call', label: 'Call', icon: Phone, color: 'text-blue-600 bg-blue-100' },
    { type: 'email', label: 'Email', icon: Mail, color: 'text-purple-600 bg-purple-100' },
    { type: 'meeting', label: 'Meeting', icon: Calendar, color: 'text-green-600 bg-green-100' },
    { type: 'task', label: 'Task', icon: CheckSquare, color: 'text-orange-600 bg-orange-100' },
    { type: 'note', label: 'Note', icon: FileText, color: 'text-gray-600 bg-gray-100' },
    { type: 'follow_up', label: 'Follow Up', icon: RotateCcw, color: 'text-cyan-600 bg-cyan-100' }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in")
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = sectionRef.current?.querySelectorAll(".fade-in-element")
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    loadDashboardData()
  }, [selectedIndustry, refreshKey])

  const loadDashboardData = async () => {
    setIsLoading(true)
    try {
      // Simulate API calls - in real implementation, these would be actual API calls
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock data - replace with actual API calls
      setStats({
        totalContacts: 1247,
        totalDeals: 89,
        totalValue: 2450000,
        wonDeals: 23,
        lostDeals: 12,
        activeDeals: 54,
        thisMonthRevenue: 180000,
        lastMonthRevenue: 165000,
        revenueGrowth: 9.1,
        conversionRate: 65.7,
        averageDealSize: 27500,
        pipelineValue: 1890000
      })

      setContacts([
        {
          id: '1',
          firstName: 'John',
          lastName: 'Smith',
          email: 'john@restorationpro.com',
          phone: '(555) 123-4567',
          title: 'CEO',
          status: 'customer',
          source: 'Website',
          tags: ['Emergency', 'Water Damage'],
          customData: { insuranceProvider: 'State Farm', claimNumber: 'SF-2024-001' },
          notes: 'High-value client with multiple properties',
          company: { id: '1', name: 'Restoration Pro', industry: 'restoration' },
          assignedUser: { id: '1', firstName: 'Sarah', lastName: 'Johnson', email: 'sarah@zenith.com' },
          createdAt: '2024-01-15T10:30:00Z',
          updatedAt: '2024-01-15T10:30:00Z',
          _count: { deals: 3, activities: 12 }
        },
        {
          id: '2',
          firstName: 'Sarah',
          lastName: 'Johnson',
          email: 'sarah@healthcare.com',
          phone: '(555) 987-6543',
          title: 'Practice Manager',
          status: 'prospect',
          source: 'Referral',
          tags: ['Patient Portal', 'Appointments'],
          customData: { patientCount: 150, specialty: 'General Practice' },
          notes: 'Looking for comprehensive patient management solution',
          company: { id: '2', name: 'City Medical Center', industry: 'healthcare' },
          assignedUser: { id: '2', firstName: 'Mike', lastName: 'Davis', email: 'mike@zenith.com' },
          createdAt: '2024-01-14T14:20:00Z',
          updatedAt: '2024-01-14T14:20:00Z',
          _count: { deals: 1, activities: 8 }
        }
      ])

      setDeals([
        {
          id: '1',
          title: 'Water Damage Restoration System',
          description: 'Complete restoration management system for water damage claims',
          value: 15000,
          stage: 'Proposal',
          probability: 75,
          closeDate: '2024-02-15T00:00:00Z',
          source: 'Website',
          tags: ['Emergency', 'Water Damage'],
          customData: { insuranceClaim: true, estimatedWork: '2 weeks' },
          contact: { id: '1', firstName: 'John', lastName: 'Smith', email: 'john@restorationpro.com' },
          company: { id: '1', name: 'Restoration Pro', industry: 'restoration' },
          assignedUser: { id: '1', firstName: 'Sarah', lastName: 'Johnson' },
          createdAt: '2024-01-15T10:30:00Z',
          updatedAt: '2024-01-15T10:30:00Z',
          _count: { activities: 5 }
        }
      ])

      setActivities([
        {
          id: '1',
          type: 'call',
          title: 'Follow-up call with John Smith',
          description: 'Discussing proposal details and timeline',
          dueDate: '2024-01-16T14:00:00Z',
          completedAt: '2024-01-16T14:30:00Z',
          status: 'completed',
          priority: 'high',
          customData: { duration: 30, outcome: 'positive' },
          contact: { id: '1', firstName: 'John', lastName: 'Smith' },
          deal: { id: '1', title: 'Water Damage Restoration System' },
          assignedUser: { id: '1', firstName: 'Sarah', lastName: 'Johnson' },
          createdAt: '2024-01-15T10:30:00Z',
          updatedAt: '2024-01-16T14:30:00Z'
        }
      ])
    } catch (error) {
      console.error('Error loading dashboard data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'customer': return 'bg-green-100 text-green-800 border-green-200'
      case 'prospect': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'lead': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getActivityIcon = (type: string) => {
    const activityType = activityTypes.find(at => at.type === type)
    return activityType ? activityType.icon : Activity
  }

  const getActivityColor = (type: string) => {
    const activityType = activityTypes.find(at => at.type === type)
    return activityType ? activityType.color : 'text-gray-600 bg-gray-100'
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200'
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const filteredContacts = contacts.filter(contact => 
    contact.company.industry === selectedIndustry && 
    (contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
     contact.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
     contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
     contact.company.name.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const filteredDeals = deals.filter(deal => deal.company.industry === selectedIndustry)

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1)
  }

  const handleExport = () => {
    // Implement export functionality
    console.log('Exporting data...')
  }

  const handleImport = () => {
    // Implement import functionality
    console.log('Importing data...')
  }

  return (
    <div ref={sectionRef} className={`min-h-screen bg-gray-50 ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                  <Database className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">Zenith CRM</h1>
                  <p className="text-sm text-gray-600">Professional Customer Relationship Management</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={handleRefresh}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                title="Refresh"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
              <button
                onClick={handleExport}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                title="Export"
              >
                <Download className="w-5 h-5" />
              </button>
              <button
                onClick={handleImport}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                title="Import"
              >
                <Upload className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              >
                {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
              </button>
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-gray-400" />
                <User className="w-5 h-5 text-gray-400" />
                <Settings className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Industry Selector */}
        <div className="fade-in-element mb-8">
          <div className="flex flex-wrap gap-3">
            {industries.map((industry) => {
              const Icon = industry.icon
              return (
                <button
                  key={industry.id}
                  onClick={() => setSelectedIndustry(industry.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-300 ${
                    selectedIndustry === industry.id
                      ? `bg-gradient-to-r ${industry.color} text-white border-transparent shadow-lg`
                      : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300 hover:shadow-md'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{industry.name}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Stats Overview */}
        {stats && (
          <div className="fade-in-element grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Contacts</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.totalContacts.toLocaleString()}</p>
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <ArrowUp className="w-3 h-3" />
                    +12% from last month
                  </p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Deals</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.activeDeals}</p>
                  <p className="text-xs text-blue-600 flex items-center gap-1">
                    <Target className="w-3 h-3" />
                    {stats.conversionRate}% conversion rate
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pipeline Value</p>
                  <p className="text-2xl font-semibold text-gray-900">${stats.pipelineValue.toLocaleString()}</p>
                  <p className="text-xs text-purple-600 flex items-center gap-1">
                    <DollarSign className="w-3 h-3" />
                    ${stats.averageDealSize.toLocaleString()} avg deal
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-purple-600" />
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">This Month</p>
                  <p className="text-2xl font-semibold text-gray-900">${stats.thisMonthRevenue.toLocaleString()}</p>
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <ArrowUp className="w-3 h-3" />
                    +{stats.revenueGrowth}% growth
                  </p>
                </div>
                <BarChart3 className="w-8 h-8 text-orange-600" />
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="fade-in-element mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'overview', name: 'Overview', icon: BarChart3 },
                { id: 'contacts', name: 'Contacts', icon: Users },
                { id: 'deals', name: 'Deals', icon: TrendingUp },
                { id: 'activities', name: 'Activities', icon: Activity },
                { id: 'reports', name: 'Reports', icon: PieChart }
              ].map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-purple-500 text-purple-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
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

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="fade-in-element grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Activities */}
            <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
                <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {activities.slice(0, 5).map((activity) => {
                  const Icon = getActivityIcon(activity.type)
                  return (
                    <div key={activity.id} className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className={`p-3 rounded-lg ${getActivityColor(activity.type)}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                        <p className="text-xs text-gray-500">{activity.contact.firstName} {activity.contact.lastName} • {new Date(activity.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(activity.priority)}`}>
                          {activity.priority}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          activity.status === 'completed' ? 'bg-green-100 text-green-800' :
                          activity.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {activity.status}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Pipeline Overview */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Pipeline Overview</h3>
              <div className="space-y-4">
                {dealStages.map((stage, index) => {
                  const stageDeals = filteredDeals.filter(deal => deal.stage === stage)
                  const totalValue = stageDeals.reduce((sum, deal) => sum + deal.value, 0)
                  const percentage = filteredDeals.length > 0 ? (stageDeals.length / filteredDeals.length) * 100 : 0
                  
                  return (
                    <div key={stage} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">{stage}</span>
                        <span className="text-sm text-gray-500">{stageDeals.length} deals</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-gray-900">${totalValue.toLocaleString()}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'contacts' && (
          <div className="fade-in-element">
            {/* Search and Filters */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search contacts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
                <button 
                  onClick={() => setShowContactModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                >
                  <Plus className="w-4 h-4" />
                  Add Contact
                </button>
              </div>
            </div>

            {/* Contacts List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deals</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Activity</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredContacts.map((contact) => (
                      <tr key={contact.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                              {contact.firstName[0]}{contact.lastName[0]}
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{contact.firstName} {contact.lastName}</div>
                              <div className="text-sm text-gray-500">{contact.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{contact.company.name}</div>
                          <div className="text-sm text-gray-500">{contact.title}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(contact.status)}`}>
                            {contact.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{contact.assignedUser.firstName} {contact.assignedUser.lastName}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{contact._count.deals}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-500">{new Date(contact.updatedAt).toLocaleDateString()}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => setSelectedContact(contact)}
                              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                              title="View"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => setSelectedContact(contact)}
                              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors" title="More">
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'deals' && (
          <div className="fade-in-element">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deal</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stage</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Probability</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Close Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredDeals.map((deal) => (
                      <tr key={deal.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{deal.title}</div>
                          <div className="text-sm text-gray-500">{deal.description}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{deal.contact.firstName} {deal.contact.lastName}</div>
                          <div className="text-sm text-gray-500">{deal.contact.email}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-semibold text-gray-900">${deal.value.toLocaleString()}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                            {deal.stage}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" 
                                style={{ width: `${deal.probability}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600">{deal.probability}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-500">{new Date(deal.closeDate).toLocaleDateString()}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => setSelectedDeal(deal)}
                              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                              title="View"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => setSelectedDeal(deal)}
                              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors" title="More">
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'activities' && (
          <div className="fade-in-element">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">All Activities</h3>
                  <button 
                    onClick={() => setShowActivityModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                  >
                    <Plus className="w-4 h-4" />
                    Add Activity
                  </button>
                </div>
                <div className="space-y-4">
                  {activities.map((activity) => {
                    const Icon = getActivityIcon(activity.type)
                    return (
                      <div key={activity.id} className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className={`p-3 rounded-lg ${getActivityColor(activity.type)}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                          <p className="text-xs text-gray-500">{activity.contact.firstName} {activity.contact.lastName} • {new Date(activity.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(activity.priority)}`}>
                            {activity.priority}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            activity.status === 'completed' ? 'bg-green-100 text-green-800' :
                            activity.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {activity.status}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="fade-in-element">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Conversion Rate</span>
                    <span className="text-sm font-semibold text-gray-900">{stats?.conversionRate}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Average Deal Size</span>
                    <span className="text-sm font-semibold text-gray-900">${stats?.averageDealSize.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Revenue Growth</span>
                    <span className="text-sm font-semibold text-green-600">+{stats?.revenueGrowth}%</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                    <Download className="w-5 h-5 text-gray-400" />
                    <span className="text-sm text-gray-700">Export Contacts</span>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                    <BarChart3 className="w-5 h-5 text-gray-400" />
                    <span className="text-sm text-gray-700">Generate Report</span>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                    <Settings className="w-5 h-5 text-gray-400" />
                    <span className="text-sm text-gray-700">Configure Dashboard</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
