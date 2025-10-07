"use client"

import { useState, useEffect } from "react"
import { X, Save, Phone, Mail, Calendar, CheckSquare, FileText, RotateCcw, User, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ActivityModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
  activity?: any
  contacts?: any[]
  deals?: any[]
}

export default function ActivityModal({ isOpen, onClose, onSubmit, activity, contacts = [], deals = [] }: ActivityModalProps) {
  const [formData, setFormData] = useState({
    type: 'CALL',
    title: '',
    description: '',
    dueDate: '',
    priority: 'MEDIUM',
    status: 'PENDING',
    contactId: '',
    dealId: ''
  })

  const [isLoading, setIsLoading] = useState(false)

  const activityTypes = [
    { value: 'CALL', label: 'Call', icon: Phone },
    { value: 'EMAIL', label: 'Email', icon: Mail },
    { value: 'MEETING', label: 'Meeting', icon: Calendar },
    { value: 'TASK', label: 'Task', icon: CheckSquare },
    { value: 'NOTE', label: 'Note', icon: FileText },
    { value: 'FOLLOW_UP', label: 'Follow Up', icon: RotateCcw }
  ]

  const priorities = [
    { value: 'LOW', label: 'Low' },
    { value: 'MEDIUM', label: 'Medium' },
    { value: 'HIGH', label: 'High' },
    { value: 'URGENT', label: 'Urgent' }
  ]

  const statuses = [
    { value: 'PENDING', label: 'Pending' },
    { value: 'IN_PROGRESS', label: 'In Progress' },
    { value: 'COMPLETED', label: 'Completed' },
    { value: 'CANCELLED', label: 'Cancelled' }
  ]

  useEffect(() => {
    if (activity) {
      setFormData({
        type: activity.type || 'CALL',
        title: activity.title || '',
        description: activity.description || '',
        dueDate: activity.dueDate ? new Date(activity.dueDate).toISOString().split('T')[0] : '',
        priority: activity.priority || 'MEDIUM',
        status: activity.status || 'PENDING',
        contactId: activity.contactId || '',
        dealId: activity.dealId || ''
      })
    } else {
      setFormData({
        type: 'CALL',
        title: '',
        description: '',
        dueDate: '',
        priority: 'MEDIUM',
        status: 'PENDING',
        contactId: '',
        dealId: ''
      })
    }
  }, [activity])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const data = {
        ...formData,
        dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : null
      }
      
      const result = await onSubmit(data)
      if (result) {
        // Close modal after successful submission
        onClose()
      }
    } catch (error) {
      console.error('Error submitting activity:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const selectedType = activityTypes.find(type => type.value === formData.type)

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
                  {activity ? 'Edit Activity' : 'Add New Activity'}
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
                    <Label htmlFor="type" className="text-sm font-medium text-gray-700">
                      Activity Type *
                    </Label>
                    <select
                      id="type"
                      value={formData.type}
                      onChange={(e) => handleChange('type', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      {activityTypes.map((type) => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="priority" className="text-sm font-medium text-gray-700">
                      Priority
                    </Label>
                    <select
                      id="priority"
                      value={formData.priority}
                      onChange={(e) => handleChange('priority', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      {priorities.map((priority) => (
                        <option key={priority.value} value={priority.value}>{priority.label}</option>
                      ))}
                    </select>
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
                      {statuses.map((status) => (
                        <option key={status.value} value={status.value}>{status.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                    Title *
                  </Label>
                  <div className="relative">
                    {selectedType && <selectedType.icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />}
                    <Input
                      id="title"
                      type="text"
                      value={formData.title}
                      onChange={(e) => handleChange('title', e.target.value)}
                      className={selectedType ? "pl-10 w-full" : "w-full"}
                      required
                      placeholder="e.g., Follow-up call with John Smith"
                    />
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
                    placeholder="Describe the activity..."
                  />
                </div>

                <div>
                  <Label htmlFor="dueDate" className="text-sm font-medium text-gray-700">
                    Due Date
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="dueDate"
                      type="date"
                      value={formData.dueDate}
                      onChange={(e) => handleChange('dueDate', e.target.value)}
                      className="pl-10 w-full"
                    />
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
                  <Label htmlFor="dealId" className="text-sm font-medium text-gray-700">
                    Deal
                  </Label>
                  <div className="relative">
                    <Target className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <select
                      id="dealId"
                      value={formData.dealId}
                      onChange={(e) => handleChange('dealId', e.target.value)}
                      className="w-full pl-10 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Select a deal</option>
                      {deals.map((deal) => (
                        <option key={deal.id} value={deal.id}>
                          {deal.title} (${deal.value?.toLocaleString()})
                        </option>
                      ))}
                    </select>
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
                    <span>{activity ? 'Update Activity' : 'Create Activity'}</span>
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
