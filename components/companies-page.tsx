"use client"

import { useState, useEffect } from "react"
import { useCRM } from "@/contexts/crm-context"
import { 
  Building2, Plus, Search, Filter, MoreHorizontal, Eye, Edit, Trash2,
  Users, TrendingUp, Globe, Phone, Mail, MapPin, Star, CheckCircle, AlertCircle,
  RefreshCw, X, ArrowUp, ArrowDown, BarChart3, Target
} from "lucide-react"
import CompanyModal from "@/components/modals/company-modal"

export default function CompaniesPage() {
  const {
    companies, isLoading, loadCompanies, createCompany, updateCompany, deleteCompany,
    error, clearError
  } = useCRM()

  const [searchTerm, setSearchTerm] = useState('')
  const [industryFilter, setIndustryFilter] = useState('all')
  const [sizeFilter, setSizeFilter] = useState('all')
  const [showCompanyModal, setShowCompanyModal] = useState(false)
  const [selectedCompany, setSelectedCompany] = useState<any>(null)
  const [sortBy, setSortBy] = useState('name')

  useEffect(() => {
    loadCompanies()
  }, [])

  const industries = [
    'Technology', 'Healthcare', 'Finance', 'Manufacturing', 'Retail', 'Education', 'Real Estate', 'Other'
  ]

  const companySizes = [
    '1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'
  ]

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = 
      company.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.website?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.description?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesIndustry = industryFilter === 'all' || company.industry === industryFilter
    const matchesSize = sizeFilter === 'all' || company.size === sizeFilter
    
    return matchesSearch && matchesIndustry && matchesSize
  }).sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return (a.name || '').localeCompare(b.name || '')
      case 'industry':
        return (a.industry || '').localeCompare(b.industry || '')
      case 'size':
        return (a.size || '').localeCompare(b.size || '')
      case 'created':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      default:
        return 0
    }
  })

  const getIndustryColor = (industry: string) => {
    switch (industry) {
      case 'Technology': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'Healthcare': return 'bg-green-100 text-green-800 border-green-200'
      case 'Finance': return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'Manufacturing': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'Retail': return 'bg-pink-100 text-pink-800 border-pink-200'
      case 'Education': return 'bg-cyan-100 text-cyan-800 border-cyan-200'
      case 'Real Estate': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getSizeColor = (size: string) => {
    switch (size) {
      case '1-10': return 'bg-green-100 text-green-800 border-green-200'
      case '11-50': return 'bg-blue-100 text-blue-800 border-blue-200'
      case '51-200': return 'bg-purple-100 text-purple-800 border-purple-200'
      case '201-500': return 'bg-orange-100 text-orange-800 border-orange-200'
      case '501-1000': return 'bg-pink-100 text-pink-800 border-pink-200'
      case '1000+': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const handleCreateCompany = async (data: any) => {
    const result = await createCompany(data)
    if (result) {
      // Companies are already refreshed by the CRM context
      return true // Return true to indicate success
    }
    return false
  }

  const handleEditCompany = (company: any) => {
    setSelectedCompany(company)
    setShowCompanyModal(true)
  }

  const handleUpdateCompany = async (data: any) => {
    if (selectedCompany) {
      const result = await updateCompany(selectedCompany.id, data)
      if (result) {
        // Companies are already refreshed by the CRM context
        setSelectedCompany(null)
        return true // Return true to indicate success
      }
    }
    return false
  }

  const handleDeleteCompany = async (companyId: string) => {
    if (confirm('Are you sure you want to delete this company?')) {
      const result = await deleteCompany(companyId)
      if (result) {
        // Companies are already refreshed by the CRM context
      }
    }
  }

  const totalCompanies = companies.length
  const activeCompanies = companies.filter(company => company.isActive).length
  const totalContacts = companies.reduce((sum, company) => sum + (company._count?.contacts || 0), 0)
  const totalDeals = companies.reduce((sum, company) => sum + (company._count?.deals || 0), 0)

  return (
    <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Companies</h1>
          <p className="text-gray-600">Manage your business relationships</p>
        </div>
        <button
          onClick={() => setShowCompanyModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
        >
          <Plus className="w-4 h-4" />
          Add Company
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
              <p className="text-sm font-medium text-gray-600">Total Companies</p>
              <p className="text-2xl font-semibold text-gray-900">{totalCompanies}</p>
            </div>
            <Building2 className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Companies</p>
              <p className="text-2xl font-semibold text-gray-900">{activeCompanies}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Contacts</p>
              <p className="text-2xl font-semibold text-gray-900">{totalContacts}</p>
            </div>
            <Users className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Deals</p>
              <p className="text-2xl font-semibold text-gray-900">{totalDeals}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-orange-600" />
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
              placeholder="Search companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <select
            value={industryFilter}
            onChange={(e) => setIndustryFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">All Industries</option>
            {industries.map((industry) => (
              <option key={industry} value={industry}>{industry}</option>
            ))}
          </select>
          <select
            value={sizeFilter}
            onChange={(e) => setSizeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">All Sizes</option>
            {companySizes.map((size) => (
              <option key={size} value={size}>{size} employees</option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="name">Sort by Name</option>
            <option value="industry">Sort by Industry</option>
            <option value="size">Sort by Size</option>
            <option value="created">Sort by Created</option>
          </select>
        </div>
      </div>

      {/* Companies List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="flex items-center justify-center gap-2">
              <RefreshCw className="w-5 h-5 animate-spin text-purple-600" />
              <span className="text-gray-600">Loading companies...</span>
            </div>
          </div>
        ) : filteredCompanies.length === 0 ? (
          <div className="p-8 text-center">
            <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No companies found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || industryFilter !== 'all' || sizeFilter !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Get started by adding your first company'
              }
            </p>
            {!searchTerm && industryFilter === 'all' && sizeFilter === 'all' && (
              <button
                onClick={() => setShowCompanyModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 mx-auto"
              >
                <Plus className="w-4 h-4" />
                Add First Company
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Industry</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Website</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contacts</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deals</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredCompanies.map((company) => (
                  <tr key={company.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-semibold">
                          {company.name?.[0]}{company.name?.[1]}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{company.name}</div>
                          <div className="text-sm text-gray-500">{company.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getIndustryColor(company.industry)}`}>
                        {company.industry}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getSizeColor(company.size)}`}>
                        {company.size}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {company.website ? (
                          <a 
                            href={company.website.startsWith('http') ? company.website : `https://${company.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                          >
                            <Globe className="w-3 h-3" />
                            {company.website}
                          </a>
                        ) : 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{company._count?.contacts || 0}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{company._count?.deals || 0}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleEditCompany(company)}
                          className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleEditCompany(company)}
                          className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteCompany(company.id)}
                          className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
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

      <CompanyModal
        isOpen={showCompanyModal}
        onClose={() => {
          setShowCompanyModal(false)
          setSelectedCompany(null)
        }}
        onSubmit={selectedCompany ? handleUpdateCompany : handleCreateCompany}
        company={selectedCompany}
      />
    </div>
  )
}
