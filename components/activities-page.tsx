"use client"

import ActivityModal from "@/components/modals/activity-modal"
import { useCRM } from "@/contexts/crm-context"
import {
  Activity,
  AlertCircle,
  Calendar,
  CheckCircle,
  CheckSquare,
  Clock,
  Edit,
  Eye,
  FileText,
  Mail,
  MoreHorizontal,
  Phone,
  Plus,
  RefreshCw,
  RotateCcw,
  Search,
  Trash2,
  User,
  X
} from "lucide-react"
import { useEffect, useState } from "react"

export default function ActivitiesPage() {
  const {
    activities, contacts, deals, isLoading, isActivitiesLoading,
    loadActivities, loadContacts, loadDeals, createActivity, updateActivity, deleteActivity,
    error, clearError
  } = useCRM()

  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showActivityModal, setShowActivityModal] = useState(false)
  const [selectedActivity, setSelectedActivity] = useState<any>(null)
  const [sortBy, setSortBy] = useState('created')

  useEffect(() => {
    loadActivities()
    loadContacts()
    loadDeals()
  }, [])

  const activityTypes = [
    { value: 'CALL', label: 'Call', icon: Phone },
    { value: 'EMAIL', label: 'Email', icon: Mail },
    { value: 'MEETING', label: 'Meeting', icon: Calendar },
    { value: 'TASK', label: 'Task', icon: CheckSquare },
    { value: 'NOTE', label: 'Note', icon: FileText },
    { value: 'FOLLOW_UP', label: 'Follow Up', icon: RotateCcw }
  ]

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = 
      activity.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.contact?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.contact?.lastName?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesType = typeFilter === 'all' || activity.type === typeFilter
    const matchesStatus = statusFilter === 'all' || activity.status === statusFilter
    
    return matchesSearch && matchesType && matchesStatus
  }).sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return (a.title || '').localeCompare(b.title || '')
      case 'type':
        return a.type.localeCompare(b.type)
      case 'status':
        return a.status.localeCompare(b.status)
      case 'created':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case 'due':
        return new Date(a.dueDate || 0).getTime() - new Date(b.dueDate || 0).getTime()
      default:
        return 0
    }
  })

  const getActivityIcon = (type: string) => {
    const activityType = activityTypes.find(at => at.type === type)
    return activityType ? activityType.icon : Activity
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'CALL': return 'text-blue-600 bg-blue-100'
      case 'EMAIL': return 'text-purple-600 bg-purple-100'
      case 'MEETING': return 'text-green-600 bg-green-100'
      case 'TASK': return 'text-orange-600 bg-orange-100'
      case 'NOTE': return 'text-gray-600 bg-gray-100'
      case 'FOLLOW_UP': return 'text-cyan-600 bg-cyan-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'bg-green-100 text-green-800 border-green-200'
      case 'IN_PROGRESS': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'PENDING': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'CANCELLED': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'URGENT': return 'bg-red-100 text-red-800 border-red-200'
      case 'HIGH': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'LOW': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const handleCreateActivity = async (data: any) => {
    const result = await createActivity(data)
    if (result) {
      // Activities are already refreshed by the CRM context
      return true // Return true to indicate success
    }
    return false
  }

  const handleEditActivity = (activity: any) => {
    setSelectedActivity(activity)
    setShowActivityModal(true)
  }

  const handleUpdateActivity = async (data: any) => {
    if (selectedActivity) {
      const result = await updateActivity(selectedActivity.id, data)
      if (result) {
        // Activities are already refreshed by the CRM context
        setSelectedActivity(null)
        return true // Return true to indicate success
      }
    }
    return false
  }

  const handleDeleteActivity = async (activityId: string) => {
    if (confirm('Are you sure you want to delete this activity?')) {
      const result = await deleteActivity(activityId)
      if (result) {
        // Activities are already refreshed by the CRM context
      }
    }
  }

  const completedActivities = activities.filter(activity => activity.status === 'COMPLETED').length
  const pendingActivities = activities.filter(activity => activity.status === 'PENDING').length
  const overdueActivities = activities.filter(activity => {
    if (!activity.dueDate) return false
    return new Date(activity.dueDate) < new Date() && activity.status !== 'COMPLETED'
  }).length

  return (
    <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Activities</h1>
          <p className="text-gray-600">Track tasks, calls, meetings, and other activities</p>
        </div>
        <button
          onClick={() => setShowActivityModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
        >
          <Plus className="w-4 h-4" />
          Add Activity
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
              <p className="text-sm font-medium text-gray-600">Total Activities</p>
              <p className="text-2xl font-semibold text-gray-900">{activities.length}</p>
            </div>
            <Activity className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-semibold text-gray-900">{completedActivities}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-semibold text-gray-900">{pendingActivities}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Overdue</p>
              <p className="text-2xl font-semibold text-gray-900">{overdueActivities}</p>
            </div>
            <AlertCircle className="w-8 h-8 text-red-600" />
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
              placeholder="Search activities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            {activityTypes.map((type) => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="overdue">Overdue</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="created">Sort by Created</option>
            <option value="due">Sort by Due Date</option>
            <option value="title">Sort by Title</option>
            <option value="type">Sort by Type</option>
            <option value="status">Sort by Status</option>
          </select>
        </div>
      </div>

      {/* Activities List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {isActivitiesLoading ? (
          <div className="p-8 text-center">
            <div className="flex items-center justify-center gap-2">
              <RefreshCw className="w-5 h-5 animate-spin text-purple-600" />
              <span className="text-gray-600">Loading activities...</span>
            </div>
          </div>
        ) : filteredActivities.length === 0 ? (
          <div className="p-8 text-center">
            <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No activities found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || typeFilter !== 'all' || statusFilter !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Get started by adding your first activity'
              }
            </p>
            {!searchTerm && typeFilter === 'all' && statusFilter === 'all' && (
              <button
                onClick={() => setShowActivityModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 mx-auto"
              >
                <Plus className="w-4 h-4" />
                Add First Activity
              </button>
            )}
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredActivities.map((activity) => {
              const Icon = getActivityIcon(activity.type)
              return (
                <div key={activity.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${getActivityColor(activity.type)}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium text-gray-900">{activity.title}</h3>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(activity.status)}`}>
                            {activity.status}
                          </span>
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${getPriorityColor(activity.priority)}`}>
                            {activity.priority}
                          </span>
                        </div>
                      </div>
                      {activity.description && (
                        <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
                      )}
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {activity.contact?.firstName} {activity.contact?.lastName}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(activity.createdAt).toLocaleDateString()}
                        </span>
                        {activity.dueDate && (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            Due: {new Date(activity.dueDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleEditActivity(activity)}
                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                        title="View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleEditActivity(activity)}
                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteActivity(activity.id)}
                        className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors" title="More">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Activity Modal */}
      <ActivityModal
        isOpen={showActivityModal}
        onClose={() => {
          setShowActivityModal(false)
          setSelectedActivity(null)
        }}
        onSubmit={selectedActivity ? handleUpdateActivity : handleCreateActivity}
        activity={selectedActivity}
        contacts={contacts}
        deals={deals}
      />
    </div>
  )
}
