"use client"

import { useState, useEffect } from "react"
import { X, Save, DollarSign, Target, Calendar, User, Building2, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/toast"

interface DealModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
  deal?: any
  contacts?: any[]
  companies?: any[]
}

export default function DealModal({ isOpen, onClose, onSubmit, deal, contacts = [], companies = [] }: DealModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    value: '',
    stage: 'Qualification',
    probability: 0,
    closeDate: '',
    source: '',
    tags: '',
    contactId: '',
    companyId: ''
  })

  const [isLoading, setIsLoading] = useState(false)
  const { addToast } = useToast()

  const dealStages = [
    'Qualification',
    'Needs Analysis', 
    'Proposal',
    'Negotiation',
    'Closed Won',
    'Closed Lost'
  ]

  useEffect(() => {
    if (deal) {
      setFormData({
        title: deal.title || '',
        description: deal.description || '',
        value: deal.value?.toString() || '',
        stage: deal.stage || 'Qualification',
        probability: deal.probability || 0,
        closeDate: deal.closeDate ? new Date(deal.closeDate).toISOString().split('T')[0] : '',
        source: deal.source || '',
        tags: deal.tags?.join(', ') || '',
        contactId: deal.contactId || '',
        companyId: deal.companyId || ''
      })
    } else {
      setFormData({
        title: '',
        description: '',
        value: '',
        stage: 'Qualification',
        probability: 0,
        closeDate: '',
        source: '',
        tags: '',
        contactId: '',
        companyId: ''
      })
    }
  }, [deal])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation: Check if companies exist
    if (companies.length === 0) {
      addToast({
        type: 'warning',
        title: 'No Companies Available',
        message: 'Please add a company first before creating a deal. Go to Companies section to add one.',
        duration: 6000
      })
      return
    }

    // Validation: Check if contacts exist
    if (contacts.length === 0) {
      addToast({
        type: 'warning',
        title: 'No Contacts Available',
        message: 'Please add a contact first before creating a deal. Go to Contacts section to add one.',
        duration: 6000
      })
      return
    }

    // Validation: Check if contact is selected
    if (!formData.contactId) {
      addToast({
        type: 'error',
        title: 'Contact Required',
        message: 'Please select a contact for this deal.',
        duration: 4000
      })
      return
    }

    // Validation: Check if company is selected
    if (!formData.companyId) {
      addToast({
        type: 'error',
        title: 'Company Required',
        message: 'Please select a company for this deal.',
        duration: 4000
      })
      return
    }

    setIsLoading(true)

    try {
      const data = {
        ...formData,
        value: parseFloat(formData.value) || 0,
        probability: parseInt(formData.probability.toString()) || 0,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        closeDate: formData.closeDate ? new Date(formData.closeDate).toISOString() : null
      }
      
      const result = await onSubmit(data)
      if (result) {
        addToast({
          type: 'success',
          title: 'Deal Created Successfully',
          message: `"${formData.title}" has been added to your pipeline.`,
          duration: 4000
        })
        onClose()
      }
    } catch (error) {
      console.error('Error submitting deal:', error)
      addToast({
        type: 'error',
        title: 'Failed to Create Deal',
        message: 'There was an error creating the deal. Please try again.',
        duration: 4000
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-72 ">
    <div className="flex items-center justify-center min-h-screen">
      <div className="fixed inset-0  backdrop-blur-sm" aria-hidden="true" onClick={onClose}></div>

      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[95vh] top-[-53px]  border border-gray-200">
         <form onSubmit={handleSubmit}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {deal ? 'Edit Deal' : 'Add New Deal'}
                </h3>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                    Deal Title *
                  </Label>
                  <Input
                    id="title"
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    required
                    placeholder="e.g., Water Damage Restoration System"
                    className="w-full"
                  />
                </div>

                <div>
                  <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                    Description
                  </Label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    rows={3}
                    placeholder="Describe the deal..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="value" className="text-sm font-medium text-gray-700">
                      Deal Value *
                    </Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="value"
                        type="number"
                        value={formData.value}
                        onChange={(e) => handleChange('value', e.target.value)}
                        className="pl-10 w-full"
                        required
                        placeholder="0"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="stage" className="text-sm font-medium text-gray-700">
                      Stage
                    </Label>
                    <select
                      id="stage"
                      value={formData.stage}
                      onChange={(e) => handleChange('stage', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      {dealStages.map((stage) => (
                        <option key={stage} value={stage}>{stage}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="probability" className="text-sm font-medium text-gray-700">
                      Probability (%)
                    </Label>
                    <div className="relative">
                      <Target className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="probability"
                        type="number"
                        min="0"
                        max="100"
                        value={formData.probability}
                        onChange={(e) => handleChange('probability', e.target.value)}
                        className="pl-10"
                        placeholder="0"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="closeDate" className="text-sm font-medium text-gray-700">
                      Close Date
                    </Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="closeDate"
                        type="date"
                        value={formData.closeDate}
                        onChange={(e) => handleChange('closeDate', e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="contactId" className="text-sm font-medium text-gray-700">
                    Contact
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <select
                      id="contactId"
                      value={formData.contactId}
                      onChange={(e) => handleChange('contactId', e.target.value)}
                      className="w-full pl-10 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Select a contact</option>
                      {contacts.map((contact) => (
                        <option key={contact.id} value={contact.id}>
                          {contact.firstName} {contact.lastName} ({contact.email})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="companyId" className="text-sm font-medium text-gray-700">
                    Company
                  </Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <select
                      id="companyId"
                      value={formData.companyId}
                      onChange={(e) => handleChange('companyId', e.target.value)}
                      className="w-full pl-10 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Select a company</option>
                      {companies.map((company) => (
                        <option key={company.id} value={company.id}>
                          {company.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="source" className="text-sm font-medium text-gray-700">
                    Source
                  </Label>
                  <Input
                    id="source"
                    type="text"
                    value={formData.source}
                    onChange={(e) => handleChange('source', e.target.value)}
                    placeholder="e.g., Website, Referral, Cold Call"
                  />
                </div>

                <div>
                  <Label htmlFor="tags" className="text-sm font-medium text-gray-700">
                    Tags
                  </Label>
                  <div className="relative">
                    <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="tags"
                      type="text"
                      value={formData.tags}
                      onChange={(e) => handleChange('tags', e.target.value)}
                      className="pl-10"
                      placeholder="e.g., High Value, Emergency, Software"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-6 py-4 flex flex-row-reverse gap-3 border-t border-gray-200">
              <Button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all duration-300"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Saving...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    <span>{deal ? 'Update Deal' : 'Create Deal'}</span>
                  </div>
                )}
              </Button>
              <Button
                type="button"
                onClick={onClose}
                className="px-6 py-2 bg-gray-300 text-gray-700 hover:bg-gray-400 font-semibold rounded-lg transition-all duration-300"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
