"use client"

import { useState, useEffect, useRef } from "react"
import { useCRM } from "@/contexts/crm-context"
import { useAuth } from "@/contexts/auth-context"
import ContactModal from "@/components/modals/contact-modal"
import DealModal from "@/components/modals/deal-modal"
import ActivityModal from "@/components/modals/activity-modal"
import { 
  Users, TrendingUp, DollarSign, Calendar, Phone, Mail, Plus, Search, Filter,
  MoreHorizontal, Eye, Edit, Trash2, Star, Clock, CheckCircle, AlertCircle,
  BarChart3, PieChart, Activity, Settings, Bell, User, Building2, Target,
  Zap, Shield, Database, Globe, Monitor, ChevronDown, Download, Upload,
  RefreshCw, X, Save, Send, Archive, Tag, FileText, MessageSquare, Video,
  PhoneCall, CheckSquare, Square, ArrowUp, ArrowDown, ArrowRight, ArrowLeft,
  Maximize2, Minimize2, RotateCcw, Play, Pause, Stop, Truck, Wrench, Heart
} from "lucide-react"

export default function FunctionalCRMDashboard() {
  const { user } = useAuth()
  const {
    contacts, deals, activities, companies, stats,
    isLoading, isContactsLoading, isDealsLoading, isActivitiesLoading, isStatsLoading,
    loadContacts, loadDeals, loadActivities, loadCompanies, loadStats,
    createContact, updateContact, deleteContact,
    createDeal, updateDeal, deleteDeal,
    createActivity, updateActivity, deleteActivity,
    createCompany, refreshData, error, clearError
  } = useCRM()

  const [activeTab, setActiveTab] = useState('overview')
  const [selectedIndustry, setSelectedIndustry] = useState('restoration')
  const [searchTerm, setSearchTerm] = useState('')
  const [showContactModal, setShowContactModal] = useState(false)
  const [showDealModal, setShowDealModal] = useState(false)
  const [showActivityModal, setShowActivityModal] = useState(false)
  const [selectedContact, setSelectedContact] = useState<any>(null)
  const [selectedDeal, setSelectedDeal] = useState<any>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  const industries = [
    { id: 'restoration', name: 'Restoration', color: 'from-red-500 to-pink-500', icon: Wrench },
    { id: 'healthcare', name: 'Healthcare', color: 'from-emerald-500 to-teal-500', icon: Heart },
    { id: 'logistics', name: 'Logistics', color: 'from-orange-500 to-amber-500', icon: Truck },
    { id: 'real-estate', name: 'Real Estate', color: 'from-blue-500 to-cyan-500', icon: Building2 },
    { id: 'fintech', name: 'FinTech', color: 'from-green-500 to-emerald-500', icon: DollarSign }
  ]

  const dealStages = [
    'Qualification', 'Needs Analysis', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'
  ]

  const activityTypes = [
    { type: 'call', label: 'Call', icon: Phone, color: 'text-blue-600 bg-blue-100' },
    { type: 'email', label: 'Email', icon: Mail, color: 'text-purple-600 bg-purple-100' },
    { type: 'meeting', label: 'Meeting', icon: Calendar, color: 'text-green-600 bg-green-100' },
    { type: 'task', label: 'Task', icon: CheckSquare, color: 'text-orange-600 bg-orange-100' },
    { type: 'note', label: 'Note', icon: FileText, color: 'text-gray-600 bg-gray-100' },
    { type: 'follow_up', label: 'Follow Up', icon: RotateCcw, color: 'text-cyan-600 bg-cyan-100' }
  ]

  // Load data on component mount
  useEffect(() => {
    if (user) {
      loadStats()
      loadContacts()
      loadDeals()
      loadActivities()
      loadCompanies()
    }
  }, [user])

  // Handle industry change
  useEffect(() => {
    if (user) {
      loadContacts({ industry: selectedIndustry })
      loadDeals({ industry: selectedIndustry })
    }
  }, [selectedIndustry, user])

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
    (contact.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     contact.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     contact.company?.name?.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const filteredDeals = deals.filter(deal => 
    deal.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    deal.contact?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    deal.contact?.lastName?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleRefresh = () => {
    refreshData()
  }

  const handleCreateContact = async (data: any) => {
    const result = await createContact(data)
    if (result) {
      setShowContactModal(false)
    }
  }

  const handleCreateDeal = async (data: any) => {
    const result = await createDeal(data)
    if (result) {
      setShowDealModal(false)
    }
  }

  const handleCreateActivity = async (data: any) => {
    const result = await createActivity(data)
    if (result) {
      setShowActivityModal(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Database className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Please log in</h2>
          <p className="text-gray-600">You need to be logged in to access the CRM dashboard.</p>
        </div>
      </div>
    )
  }

  return (
    <div ref={sectionRef} className={`min-h-screen bg-gray-50 ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      <div className="max-w-8xl mx-auto">
        {/* CRM Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">CRM Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage your customer relationships and sales pipeline</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-green-100 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-700 font-medium">System Active</span>
              </div>
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
              >
                {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Industry Selector */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Industry Template</h2>
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
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <span className="text-red-800">{error}</span>
              </div>
              <button
                onClick={clearError}
                className="text-red-600 hover:text-red-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Stats Overview */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Contacts</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.totalContacts?.toLocaleString() || 0}</p>
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <ArrowUp className="w-3 h-3" />
                    Active contacts
                  </p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Deals</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.activeDeals || 0}</p>
                  <p className="text-xs text-blue-600 flex items-center gap-1">
                    <Target className="w-3 h-3" />
                    {stats.conversionRate || 0}% conversion
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pipeline Value</p>
                  <p className="text-2xl font-semibold text-gray-900">${stats.pipelineValue?.toLocaleString() || 0}</p>
                  <p className="text-xs text-purple-600 flex items-center gap-1">
                    <DollarSign className="w-3 h-3" />
                    ${stats.averageDealSize?.toLocaleString() || 0} avg
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-purple-600" />
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">This Month</p>
                  <p className="text-2xl font-semibold text-gray-900">${stats.thisMonthRevenue?.toLocaleString() || 0}</p>
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <ArrowUp className="w-3 h-3" />
                    +{stats.revenueGrowth || 0}% growth
                  </p>
                </div>
                <BarChart3 className="w-8 h-8 text-orange-600" />
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'overview', name: 'Overview', icon: BarChart3 },
                { id: 'contacts', name: 'Contacts', icon: Users },
                { id: 'deals', name: 'Deals', icon: TrendingUp },
                { id: 'activities', name: 'Activities', icon: Activity }
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Activities */}
            <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
                <button 
                  onClick={() => setShowActivityModal(true)}
                  className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                >
                  Add Activity
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
                        <p className="text-xs text-gray-500">
                          {activity.contact?.firstName} {activity.contact?.lastName} • 
                          {new Date(activity.createdAt).toLocaleDateString()}
                        </p>
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
                  const stageDeals = deals.filter(deal => deal.stage === stage)
                  const totalValue = stageDeals.reduce((sum, deal) => sum + (deal.value || 0), 0)
                  const percentage = deals.length > 0 ? (stageDeals.length / deals.length) * 100 : 0
                  
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
          <div>
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
                    {isContactsLoading ? (
                      <tr>
                        <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                          <div className="flex items-center justify-center gap-2">
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            Loading contacts...
                          </div>
                        </td>
                      </tr>
                    ) : filteredContacts.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                          No contacts found
                        </td>
                      </tr>
                    ) : (
                      filteredContacts.map((contact) => (
                        <tr key={contact.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                                {contact.firstName?.[0]}{contact.lastName?.[0]}
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900">{contact.firstName} {contact.lastName}</div>
                                <div className="text-sm text-gray-500">{contact.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">{contact.company?.name || 'N/A'}</div>
                            <div className="text-sm text-gray-500">{contact.title || 'N/A'}</div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(contact.status)}`}>
                              {contact.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">
                              {contact.assignedUser?.firstName} {contact.assignedUser?.lastName}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">{contact._count?.deals || 0}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-500">
                              {contact.updatedAt ? new Date(contact.updatedAt).toLocaleDateString() : 'N/A'}
                            </div>
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
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'deals' && (
          <div>
            {/* Search and Filters for Deals */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search deals..."
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
                  onClick={() => setShowDealModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                >
                  <Plus className="w-4 h-4" />
                  Add Deal
                </button>
              </div>
            </div>

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
                    {isDealsLoading ? (
                      <tr>
                        <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                          <div className="flex items-center justify-center gap-2">
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            Loading deals...
                          </div>
                        </td>
                      </tr>
                    ) : filteredDeals.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                          No deals found
                        </td>
                      </tr>
                    ) : (
                      filteredDeals.map((deal) => (
                        <tr key={deal.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-gray-900">{deal.title}</div>
                            <div className="text-sm text-gray-500">{deal.description}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">{deal.contact?.firstName} {deal.contact?.lastName}</div>
                            <div className="text-sm text-gray-500">{deal.contact?.email}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm font-semibold text-gray-900">${deal.value?.toLocaleString() || 0}</div>
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
                                  style={{ width: `${deal.probability || 0}%` }}
                                ></div>
                              </div>
                              <span className="text-sm text-gray-600">{deal.probability || 0}%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-500">
                              {deal.closeDate ? new Date(deal.closeDate).toLocaleDateString() : 'N/A'}
                            </div>
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
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'activities' && (
          <div>
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
                  {isActivitiesLoading ? (
                    <div className="text-center text-gray-500 py-8">
                      <div className="flex items-center justify-center gap-2">
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Loading activities...
                      </div>
                    </div>
                  ) : activities.length === 0 ? (
                    <div className="text-center text-gray-500 py-8">
                      No activities found
                    </div>
                  ) : (
                    activities.map((activity) => {
                      const Icon = getActivityIcon(activity.type)
                      return (
                        <div key={activity.id} className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className={`p-3 rounded-lg ${getActivityColor(activity.type)}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                            <p className="text-xs text-gray-500">
                              {activity.contact?.firstName} {activity.contact?.lastName} • 
                              {new Date(activity.createdAt).toLocaleDateString()}
                            </p>
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
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modals */}
        <ContactModal
          isOpen={showContactModal}
          onClose={() => setShowContactModal(false)}
          onSubmit={handleCreateContact}
          companies={companies}
        />

        <DealModal
          isOpen={showDealModal}
          onClose={() => setShowDealModal(false)}
          onSubmit={handleCreateDeal}
          contacts={contacts}
          companies={companies}
        />

        <ActivityModal
          isOpen={showActivityModal}
          onClose={() => setShowActivityModal(false)}
          onSubmit={handleCreateActivity}
          contacts={contacts}
          deals={deals}
        />
      </div>
    </div>
  )
}
