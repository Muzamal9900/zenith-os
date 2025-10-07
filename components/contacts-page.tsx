"use client"

import { useState, useEffect } from "react"
import { useCRM } from "@/contexts/crm-context"
import { 
  Users, Plus, Search, Filter, MoreHorizontal, Eye, Edit, Trash2,
  Phone, Mail, Building2, Calendar, Star, CheckCircle, AlertCircle,
  RefreshCw, X, Save, User, MapPin, Tag, FileText, Clock
} from "lucide-react"
import ContactModal from "@/components/modals/contact-modal"

export default function ContactsPage() {
  const {
    contacts, companies, isLoading, isContactsLoading,
    loadContacts, loadCompanies, createContact, updateContact, deleteContact,
    error, clearError
  } = useCRM()

  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showContactModal, setShowContactModal] = useState(false)
  const [selectedContact, setSelectedContact] = useState<any>(null)
  const [sortBy, setSortBy] = useState('name')

  useEffect(() => {
    loadContacts()
    loadCompanies()
  }, [])

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = 
      contact.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.company?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || contact.status === statusFilter
    
    return matchesSearch && matchesStatus
  }).sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`)
      case 'company':
        return (a.company?.name || '').localeCompare(b.company?.name || '')
      case 'status':
        return a.status.localeCompare(b.status)
      case 'created':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      default:
        return 0
    }
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CUSTOMER': return 'bg-green-100 text-green-800 border-green-200'
      case 'PROSPECT': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'LEAD': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'INACTIVE': return 'bg-gray-100 text-gray-800 border-gray-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const handleCreateContact = async (data: any) => {
    const result = await createContact(data)
    if (result) {
      // Contacts are already refreshed by the CRM context
      return true // Return true to indicate success
    }
    return false
  }

  const handleEditContact = (contact: any) => {
    setSelectedContact(contact)
    setShowContactModal(true)
  }

  const handleUpdateContact = async (data: any) => {
    if (selectedContact) {
      const result = await updateContact(selectedContact.id, data)
      if (result) {
        // Contacts are already refreshed by the CRM context
        setSelectedContact(null)
        return true // Return true to indicate success
      }
    }
    return false
  }

  const handleDeleteContact = async (contactId: string) => {
    if (confirm('Are you sure you want to delete this contact?')) {
      const result = await deleteContact(contactId)
      if (result) {
        // Contacts are already refreshed by the CRM context
      }
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contacts</h1>
          <p className="text-gray-600">Manage your customer relationships</p>
        </div>
        <button
          onClick={() => setShowContactModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
        >
          <Plus className="w-4 h-4" />
          Add Contact
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

      {/* Filters and Search */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
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
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="LEAD">Leads</option>
            <option value="PROSPECT">Prospects</option>
            <option value="CUSTOMER">Customers</option>
            <option value="INACTIVE">Inactive</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="name">Sort by Name</option>
            <option value="company">Sort by Company</option>
            <option value="status">Sort by Status</option>
            <option value="created">Sort by Created</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            More Filters
          </button>
        </div>
      </div>

      {/* Contacts List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {isContactsLoading ? (
          <div className="p-8 text-center">
            <div className="flex items-center justify-center gap-2">
              <RefreshCw className="w-5 h-5 animate-spin text-purple-600" />
              <span className="text-gray-600">Loading contacts...</span>
            </div>
          </div>
        ) : filteredContacts.length === 0 ? (
          <div className="p-8 text-center">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No contacts found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filters'
                : 'Get started by adding your first contact'
              }
            </p>
            {!searchTerm && statusFilter === 'all' && (
              <button
                onClick={() => setShowContactModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 mx-auto"
              >
                <Plus className="w-4 h-4" />
                Add First Contact
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
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
                          {contact.firstName?.[0]}{contact.lastName?.[0]}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {contact.firstName} {contact.lastName}
                          </div>
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
                      <div className="text-sm text-gray-900">{contact.phone || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">
                        {contact.updatedAt ? new Date(contact.updatedAt).toLocaleDateString() : 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleEditContact(contact)}
                          className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleEditContact(contact)}
                          className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteContact(contact.id)}
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

      {/* Contact Modal */}
      <ContactModal
        isOpen={showContactModal}
        onClose={() => {
          setShowContactModal(false)
          setSelectedContact(null)
        }}
        onSubmit={selectedContact ? handleUpdateContact : handleCreateContact}
        contact={selectedContact}
        companies={companies}
      />
    </div>
  )
}
