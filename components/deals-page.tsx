"use client"

import { useState, useEffect } from "react"
import { useCRM } from "@/contexts/crm-context"
import { 
  TrendingUp, Plus, Search, Filter, MoreHorizontal, Eye, Edit, Trash2,
  DollarSign, Target, Calendar, User, Building2, CheckCircle, AlertCircle,
  RefreshCw, X, Save, ArrowUp, ArrowDown, BarChart3, PieChart
} from "lucide-react"
import DealModal from "@/components/modals/deal-modal"

export default function DealsPage() {
  const {
    deals, contacts, companies, isLoading, isDealsLoading,
    loadDeals, loadContacts, loadCompanies, createDeal, updateDeal, deleteDeal,
    error, clearError
  } = useCRM()

  const [searchTerm, setSearchTerm] = useState('')
  const [stageFilter, setStageFilter] = useState('all')
  const [showDealModal, setShowDealModal] = useState(false)
  const [selectedDeal, setSelectedDeal] = useState<any>(null)
  const [sortBy, setSortBy] = useState('value')

  useEffect(() => {
    loadDeals()
    loadContacts()
    loadCompanies()
  }, [])

  const dealStages = [
    'Qualification', 'Needs Analysis', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'
  ]

  const filteredDeals = deals.filter(deal => {
    const matchesSearch = 
      deal.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deal.contact?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deal.contact?.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deal.company?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStage = stageFilter === 'all' || deal.stage === stageFilter
    
    return matchesSearch && matchesStage
  }).sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return (a.title || '').localeCompare(b.title || '')
      case 'value':
        return (b.value || 0) - (a.value || 0)
      case 'stage':
        return a.stage.localeCompare(b.stage)
      case 'created':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      default:
        return 0
    }
  })

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'Qualification': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'Needs Analysis': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Proposal': return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'Negotiation': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'Closed Won': return 'bg-green-100 text-green-800 border-green-200'
      case 'Closed Lost': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const totalValue = deals.reduce((sum, deal) => sum + (deal.value || 0), 0)
  const wonDeals = deals.filter(deal => deal.stage === 'Closed Won')
  const wonValue = wonDeals.reduce((sum, deal) => sum + (deal.value || 0), 0)
  const activeDeals = deals.filter(deal => !['Closed Won', 'Closed Lost'].includes(deal.stage))
  const activeValue = activeDeals.reduce((sum, deal) => sum + (deal.value || 0), 0)

  const handleCreateDeal = async (data: any) => {
    const result = await createDeal(data)
    if (result) {
      // Deals are already refreshed by the CRM context
      return true // Return true to indicate success
    }
    return false
  }

  const handleEditDeal = (deal: any) => {
    setSelectedDeal(deal)
    setShowDealModal(true)
  }

  const handleUpdateDeal = async (data: any) => {
    if (selectedDeal) {
      const result = await updateDeal(selectedDeal.id, data)
      if (result) {
        // Deals are already refreshed by the CRM context
        setSelectedDeal(null)
        return true // Return true to indicate success
      }
    }
    return false
  }

  const handleDeleteDeal = async (dealId: string) => {
    if (confirm('Are you sure you want to delete this deal?')) {
      const result = await deleteDeal(dealId)
      if (result) {
        // Deals are already refreshed by the CRM context
      }
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Deals</h1>
          <p className="text-gray-600">Track your sales pipeline and revenue</p>
        </div>
        <button
          onClick={() => setShowDealModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
        >
          <Plus className="w-4 h-4" />
          Add Deal
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Pipeline</p>
              <p className="text-2xl font-semibold text-gray-900">${totalValue.toLocaleString()}</p>
            </div>
            <BarChart3 className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Deals</p>
              <p className="text-2xl font-semibold text-gray-900">{activeDeals.length}</p>
              <p className="text-xs text-blue-600">${activeValue.toLocaleString()}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Won Deals</p>
              <p className="text-2xl font-semibold text-gray-900">{wonDeals.length}</p>
              <p className="text-xs text-green-600">${wonValue.toLocaleString()}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Win Rate</p>
              <p className="text-2xl font-semibold text-gray-900">
                {deals.length > 0 ? Math.round((wonDeals.length / deals.length) * 100) : 0}%
              </p>
            </div>
            <Target className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
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
          <select
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">All Stages</option>
            {dealStages.map((stage) => (
              <option key={stage} value={stage}>{stage}</option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="value">Sort by Value</option>
            <option value="title">Sort by Title</option>
            <option value="stage">Sort by Stage</option>
            <option value="created">Sort by Created</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            More Filters
          </button>
        </div>
      </div>

      {/* Deals List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {isDealsLoading ? (
          <div className="p-8 text-center">
            <div className="flex items-center justify-center gap-2">
              <RefreshCw className="w-5 h-5 animate-spin text-purple-600" />
              <span className="text-gray-600">Loading deals...</span>
            </div>
          </div>
        ) : filteredDeals.length === 0 ? (
          <div className="p-8 text-center">
            <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No deals found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || stageFilter !== 'all' 
                ? 'Try adjusting your search or filters'
                : 'Get started by adding your first deal'
              }
            </p>
            {!searchTerm && stageFilter === 'all' && (
              <button
                onClick={() => setShowDealModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 mx-auto"
              >
                <Plus className="w-4 h-4" />
                Add First Deal
              </button>
            )}
          </div>
        ) : (
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
                      <div className="text-sm text-gray-900">{deal.contact?.firstName} {deal.contact?.lastName}</div>
                      <div className="text-sm text-gray-500">{deal.contact?.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold text-gray-900">${deal.value?.toLocaleString() || 0}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStageColor(deal.stage)}`}>
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
                          onClick={() => handleEditDeal(deal)}
                          className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleEditDeal(deal)}
                          className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteDeal(deal.id)}
                          className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
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
        )}
      </div>

      {/* Deal Modal */}
      <DealModal
        isOpen={showDealModal}
        onClose={() => {
          setShowDealModal(false)
          setSelectedDeal(null)
        }}
        onSubmit={selectedDeal ? handleUpdateDeal : handleCreateDeal}
        deal={selectedDeal}
        contacts={contacts}
        companies={companies}
      />
    </div>
  )
}
