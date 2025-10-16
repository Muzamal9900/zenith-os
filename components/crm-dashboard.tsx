"use client"

import { useState, useEffect, useRef } from "react"
import { 
  Users, 
  Building2, 
  TrendingUp, 
  Calendar, 
  Phone, 
  Mail, 
  MapPin, 
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  DollarSign,
  BarChart3,
  PieChart,
  Activity
} from "lucide-react"
import OnboardingToolsWidgets from "./onboarding-tools-widgets"
import CRMToolsQuickAccess from "./crm-tools-quick-access"

interface Contact {
  id: string
  name: string
  email: string
  phone: string
  company: string
  industry: string
  status: 'lead' | 'prospect' | 'customer' | 'inactive'
  value: number
  lastContact: string
  source: string
  tags: string[]
}

interface Deal {
  id: string
  title: string
  contact: string
  value: number
  stage: string
  probability: number
  closeDate: string
  industry: string
}

interface Activity {
  id: string
  type: 'call' | 'email' | 'meeting' | 'task'
  title: string
  contact: string
  date: string
  status: 'completed' | 'pending' | 'overdue'
}

export default function CRMDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedIndustry, setSelectedIndustry] = useState('restoration')
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  // Mock data - in real implementation, this would come from API
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: '1',
      name: 'John Smith',
      email: 'john@restorationpro.com',
      phone: '(555) 123-4567',
      company: 'Restoration Pro',
      industry: 'restoration',
      status: 'customer',
      value: 15000,
      lastContact: '2024-01-15',
      source: 'Website',
      tags: ['Emergency', 'Water Damage']
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@healthcare.com',
      phone: '(555) 987-6543',
      company: 'City Medical Center',
      industry: 'healthcare',
      status: 'prospect',
      value: 25000,
      lastContact: '2024-01-14',
      source: 'Referral',
      tags: ['Patient Portal', 'Appointments']
    },
    {
      id: '3',
      name: 'Mike Davis',
      email: 'mike@logistics.com',
      phone: '(555) 456-7890',
      company: 'FastTrack Logistics',
      industry: 'logistics',
      status: 'lead',
      value: 8000,
      lastContact: '2024-01-13',
      source: 'Cold Call',
      tags: ['Fleet Management', 'Tracking']
    }
  ])

  const [deals, setDeals] = useState<Deal[]>([
    {
      id: '1',
      title: 'Water Damage Restoration System',
      contact: 'John Smith',
      value: 15000,
      stage: 'Proposal',
      probability: 75,
      closeDate: '2024-02-15',
      industry: 'restoration'
    },
    {
      id: '2',
      title: 'Patient Management Portal',
      contact: 'Sarah Johnson',
      value: 25000,
      stage: 'Negotiation',
      probability: 60,
      closeDate: '2024-02-28',
      industry: 'healthcare'
    },
    {
      id: '3',
      title: 'Fleet Tracking Solution',
      contact: 'Mike Davis',
      value: 8000,
      stage: 'Qualification',
      probability: 40,
      closeDate: '2024-03-10',
      industry: 'logistics'
    }
  ])

  const [activities, setActivities] = useState<Activity[]>([
    {
      id: '1',
      type: 'call',
      title: 'Follow-up call with John Smith',
      contact: 'John Smith',
      date: '2024-01-15',
      status: 'completed'
    },
    {
      id: '2',
      type: 'meeting',
      title: 'Demo presentation to Sarah Johnson',
      contact: 'Sarah Johnson',
      date: '2024-01-16',
      status: 'pending'
    },
    {
      id: '3',
      type: 'email',
      title: 'Send proposal to Mike Davis',
      contact: 'Mike Davis',
      date: '2024-01-17',
      status: 'overdue'
    }
  ])

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

  const industries = [
    { id: 'restoration', name: 'Restoration', color: 'from-red-500 to-pink-500' },
    { id: 'healthcare', name: 'Healthcare', color: 'from-emerald-500 to-teal-500' },
    { id: 'logistics', name: 'Logistics', color: 'from-orange-500 to-amber-500' },
    { id: 'real-estate', name: 'Real Estate', color: 'from-blue-500 to-cyan-500' },
    { id: 'fintech', name: 'FinTech', color: 'from-green-500 to-emerald-500' }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'customer': return 'bg-green-100 text-green-800'
      case 'prospect': return 'bg-blue-100 text-blue-800'
      case 'lead': return 'bg-yellow-100 text-yellow-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'call': return <Phone className="w-4 h-4" />
      case 'email': return <Mail className="w-4 h-4" />
      case 'meeting': return <Calendar className="w-4 h-4" />
      case 'task': return <CheckCircle className="w-4 h-4" />
      default: return <Activity className="w-4 h-4" />
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'call': return 'text-blue-600 bg-blue-100'
      case 'email': return 'text-purple-600 bg-purple-100'
      case 'meeting': return 'text-green-600 bg-green-100'
      case 'task': return 'text-orange-600 bg-orange-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const filteredContacts = contacts.filter(contact => 
    contact.industry === selectedIndustry && 
    (contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     contact.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
     contact.email.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const filteredDeals = deals.filter(deal => deal.industry === selectedIndustry)

  return (
    <div ref={sectionRef} className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">CRM Dashboard</h1>
              <p className="text-gray-600">Manage your customer relationships</p>
            </div>
            <div className="flex items-center gap-4">
              <CRMToolsQuickAccess />
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Contact
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Your Selected Tools */}
        <div className="fade-in-element mb-8">
          <OnboardingToolsWidgets maxTools={6} />
        </div>

        {/* Industry Selector */}
        <div className="fade-in-element mb-8">
          <div className="flex flex-wrap gap-3">
            {industries.map((industry) => (
              <button
                key={industry.id}
                onClick={() => setSelectedIndustry(industry.id)}
                className={`px-4 py-2 rounded-lg border transition-all duration-300 ${
                  selectedIndustry === industry.id
                    ? `bg-gradient-to-r ${industry.color} text-white border-transparent shadow-lg`
                    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                }`}
              >
                {industry.name}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Overview */}
        <div className="fade-in-element grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Contacts</p>
                <p className="text-2xl font-semibold text-gray-900">{filteredContacts.length}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Deals</p>
                <p className="text-2xl font-semibold text-gray-900">{filteredDeals.length}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pipeline Value</p>
                <p className="text-2xl font-semibold text-gray-900">
                  ${filteredDeals.reduce((sum, deal) => sum + deal.value, 0).toLocaleString()}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-semibold text-gray-900">$48,000</p>
              </div>
              <BarChart3 className="w-8 h-8 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="fade-in-element mb-8">
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
          <div className="fade-in-element grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Activities */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
              <div className="space-y-4">
                {activities.slice(0, 5).map((activity) => (
                  <div key={activity.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className={`p-2 rounded-lg ${getActivityColor(activity.type)}`}>
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="text-xs text-gray-500">{activity.contact} • {activity.date}</p>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      activity.status === 'completed' ? 'bg-green-100 text-green-800' :
                      activity.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {activity.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pipeline Chart */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Pipeline Overview</h3>
              <div className="space-y-4">
                {['Qualification', 'Proposal', 'Negotiation', 'Closed Won'].map((stage, index) => {
                  const stageDeals = filteredDeals.filter(deal => deal.stage === stage)
                  const totalValue = stageDeals.reduce((sum, deal) => sum + deal.value, 0)
                  return (
                    <div key={stage} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
                        <span className="text-sm font-medium text-gray-700">{stage}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-gray-900">${totalValue.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">{stageDeals.length} deals</p>
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
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Contact</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredContacts.map((contact) => (
                      <tr key={contact.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                            <div className="text-sm text-gray-500">{contact.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{contact.company}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(contact.status)}`}>
                            {contact.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">${contact.value.toLocaleString()}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-500">{contact.lastContact}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
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
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredDeals.map((deal) => (
                      <tr key={deal.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{deal.title}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{deal.contact}</div>
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
                          <div className="text-sm text-gray-500">{deal.closeDate}</div>
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
                <h3 className="text-lg font-semibold text-gray-900 mb-4">All Activities</h3>
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <div key={activity.id} className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className={`p-3 rounded-lg ${getActivityColor(activity.type)}`}>
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                        <p className="text-xs text-gray-500">{activity.contact} • {activity.date}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        activity.status === 'completed' ? 'bg-green-100 text-green-800' :
                        activity.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {activity.status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
