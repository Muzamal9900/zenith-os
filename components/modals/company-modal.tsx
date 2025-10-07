"use client"

import { useState, useEffect } from "react"
import { X, Building2, Globe, Users, DollarSign, MapPin, Phone, Mail } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface CompanyModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => Promise<boolean>
  company?: any
}

export default function CompanyModal({ isOpen, onClose, onSubmit, company }: CompanyModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    industry: '',
    website: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
    email: '',
    size: 'SMALL',
    description: '',
    isActive: true
  })

  const [isLoading, setIsLoading] = useState(false)

  const companySizes = [
    { value: 'STARTUP', label: 'Startup (1-10)' },
    { value: 'SMALL', label: 'Small (11-50)' },
    { value: 'MEDIUM', label: 'Medium (51-200)' },
    { value: 'LARGE', label: 'Large (201-1000)' },
    { value: 'ENTERPRISE', label: 'Enterprise (1000+)' }
  ]

  const industries = [
    'Restoration',
    'Healthcare',
    'Logistics',
    'Real Estate',
    'FinTech',
    'Technology',
    'Manufacturing',
    'Retail',
    'Education',
    'Other'
  ]

  useEffect(() => {
    if (company) {
      setFormData({
        name: company.name || '',
        industry: company.industry || '',
        website: company.website || '',
        address: company.address || '',
        city: company.city || '',
        state: company.state || '',
        zipCode: company.zipCode || '',
        country: company.country || '',
        phone: company.phone || '',
        email: company.email || '',
        size: company.size || 'SMALL',
        description: company.description || '',
        isActive: company.isActive !== undefined ? company.isActive : true
      })
    } else {
      setFormData({
        name: '',
        industry: '',
        website: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        phone: '',
        email: '',
        size: 'SMALL',
        description: '',
        isActive: true
      })
    }
  }, [company])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await onSubmit(formData)
      if (result) {
        // Close modal after successful submission
        onClose()
      }
    } catch (error) {
      console.error('Error submitting company:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (field: string, value: string | boolean) => {
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
                  {company ? 'Edit Company' : 'Add New Company'}
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
                    <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                      Company Name *
                    </Label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        className="pl-10 w-full"
                        required
                        placeholder="e.g., Acme Restoration Services"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="industry" className="text-sm font-medium text-gray-700">
                      Industry *
                    </Label>
                    <select
                      id="industry"
                      value={formData.industry}
                      onChange={(e) => handleChange('industry', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select Industry</option>
                      {industries.map((industry) => (
                        <option key={industry} value={industry}>{industry}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="website" className="text-sm font-medium text-gray-700">
                      Website
                    </Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="website"
                        type="url"
                        value={formData.website}
                        onChange={(e) => handleChange('website', e.target.value)}
                        className="pl-10 w-full"
                        placeholder="https://example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="size" className="text-sm font-medium text-gray-700">
                      Company Size
                    </Label>
                    <select
                      id="size"
                      value={formData.size}
                      onChange={(e) => handleChange('size', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      {companySizes.map((size) => (
                        <option key={size.value} value={size.value}>{size.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="address" className="text-sm font-medium text-gray-700">
                    Address
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="address"
                      type="text"
                      value={formData.address}
                      onChange={(e) => handleChange('address', e.target.value)}
                      className="pl-10 w-full"
                      placeholder="123 Main Street"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city" className="text-sm font-medium text-gray-700">
                      City
                    </Label>
                    <Input
                      id="city"
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleChange('city', e.target.value)}
                      className="w-full"
                      placeholder="New York"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state" className="text-sm font-medium text-gray-700">
                      State
                    </Label>
                    <Input
                      id="state"
                      type="text"
                      value={formData.state}
                      onChange={(e) => handleChange('state', e.target.value)}
                      className="w-full"
                      placeholder="NY"
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode" className="text-sm font-medium text-gray-700">
                      ZIP Code
                    </Label>
                    <Input
                      id="zipCode"
                      type="text"
                      value={formData.zipCode}
                      onChange={(e) => handleChange('zipCode', e.target.value)}
                      className="w-full"
                      placeholder="10001"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="country" className="text-sm font-medium text-gray-700">
                    Country
                  </Label>
                  <Input
                    id="country"
                    type="text"
                    value={formData.country}
                    onChange={(e) => handleChange('country', e.target.value)}
                    className="w-full"
                    placeholder="United States"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
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
                        placeholder="+1 (555) 123-4567"
                      />
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
                        placeholder="contact@company.com"
                      />
                    </div>
                  </div>
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
                    placeholder="Brief description of the company..."
                  />
                </div>

                <div className="flex items-center">
                  <input
                    id="isActive"
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => handleChange('isActive', e.target.checked)}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <Label htmlFor="isActive" className="ml-2 text-sm text-gray-700">
                    Active Company
                  </Label>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
              >
                {isLoading ? 'Saving...' : (company ? 'Update Company' : 'Add Company')}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
