"use client"

import { useState, useEffect } from "react"
import { X, Save, User, Mail, Phone, Building2, Tag, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
  contact?: any
  companies?: any[]
}

export default function ContactModal({ isOpen, onClose, onSubmit, contact, companies = [] }: ContactModalProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    title: '',
    status: 'LEAD',
    source: '',
    tags: '',
    companyId: '',
    notes: ''
  })

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (contact) {
      setFormData({
        firstName: contact.firstName || '',
        lastName: contact.lastName || '',
        email: contact.email || '',
        phone: contact.phone || '',
        title: contact.title || '',
        status: contact.status || 'LEAD',
        source: contact.source || '',
        tags: contact.tags?.join(', ') || '',
        companyId: contact.companyId || '',
        notes: contact.notes || ''
      })
    } else {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        title: '',
        status: 'LEAD',
        source: '',
        tags: '',
        companyId: '',
        notes: ''
      })
    }
  }, [contact])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const data = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      }
      
      const result = await onSubmit(data)
      if (result) {
        // Close modal after successful submission
        onClose()
      }
    } catch (error) {
      console.error('Error submitting contact:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (field: string, value: string) => {
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
                  {contact ? 'Edit Contact' : 'Add New Contact'}
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
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                      First Name *
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleChange('firstName', e.target.value)}
                        className="pl-10 w-full"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                      Last Name *
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleChange('lastName', e.target.value)}
                        className="pl-10 w-full"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="pl-10 w-full"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                    Phone
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className="pl-10 w-full"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                      Job Title
                    </Label>
                    <Input
                      id="title"
                      type="text"
                      value={formData.title}
                      onChange={(e) => handleChange('title', e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Label htmlFor="status" className="text-sm font-medium text-gray-700">
                      Status
                    </Label>
                    <select
                      id="status"
                      value={formData.status}
                      onChange={(e) => handleChange('status', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="LEAD">Lead</option>
                      <option value="PROSPECT">Prospect</option>
                      <option value="CUSTOMER">Customer</option>
                      <option value="INACTIVE">Inactive</option>
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
                      className="w-full"
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
                      className="pl-10 w-full"
                      placeholder="e.g., VIP, High Value, Emergency"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="notes" className="text-sm font-medium text-gray-700">
                    Notes
                  </Label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                    <textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => handleChange('notes', e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      rows={3}
                      placeholder="Additional notes about this contact..."
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto sm:ml-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Saving...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    <span>{contact ? 'Update Contact' : 'Create Contact'}</span>
                  </div>
                )}
              </Button>
              <Button
                type="button"
                onClick={onClose}
                className="mt-3 w-full sm:mt-0 sm:w-auto bg-gray-300 text-gray-700 hover:bg-gray-400 font-semibold py-2 px-4 rounded-lg transition-all duration-300"
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
