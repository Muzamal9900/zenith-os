"use client"

import { useTenantTools } from '@/hooks/use-tenant-tools'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  TrendingUp, 
  Clock, 
  Mail, 
  Phone, 
  MessageSquare,
  BarChart3,
  Target,
  Calendar,
  Building2,
  Star,
  DollarSign,
  Activity,
  Loader2
} from 'lucide-react'

// Map tool IDs to their display information
const toolInfo = {
  'contact-summary': {
    name: 'Contact Summary',
    description: 'Comprehensive contact management with detailed insights',
    icon: Users,
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700'
  },
  'deal-pipeline': {
    name: 'Deal Pipeline',
    description: 'Track and manage your sales pipeline',
    icon: TrendingUp,
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50',
    textColor: 'text-green-700'
  },
  'recent-activities': {
    name: 'Recent Activities',
    description: 'Monitor all recent activities and interactions',
    icon: Clock,
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-700'
  },
  'email-tracker': {
    name: 'Email Tracker',
    description: 'Track email communications and engagement',
    icon: Mail,
    color: 'from-orange-500 to-orange-600',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-700'
  },
  'call-scheduler': {
    name: 'Call Scheduler',
    description: 'Schedule and manage customer calls',
    icon: Phone,
    color: 'from-teal-500 to-teal-600',
    bgColor: 'bg-teal-50',
    textColor: 'text-teal-700'
  },
  'company-insights': {
    name: 'Company Insights',
    description: 'Analyze company performance and growth',
    icon: Building2,
    color: 'from-indigo-500 to-indigo-600',
    bgColor: 'bg-indigo-50',
    textColor: 'text-indigo-700'
  },
  'task-manager': {
    name: 'Task Manager',
    description: 'Organize and track tasks and follow-ups',
    icon: Target,
    color: 'from-pink-500 to-pink-600',
    bgColor: 'bg-pink-50',
    textColor: 'text-pink-700'
  },
  'chat-widget': {
    name: 'Live Chat',
    description: 'Real-time customer support with chat widget',
    icon: MessageSquare,
    color: 'from-cyan-500 to-cyan-600',
    bgColor: 'bg-cyan-50',
    textColor: 'text-cyan-700'
  },
  'performance-metrics': {
    name: 'Performance Metrics',
    description: 'Comprehensive performance tracking and analytics',
    icon: BarChart3,
    color: 'from-emerald-500 to-emerald-600',
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-700'
  },
  'calendar-integration': {
    name: 'Calendar Integration',
    description: 'Sync with Google Calendar and Outlook',
    icon: Calendar,
    color: 'from-violet-500 to-violet-600',
    bgColor: 'bg-violet-50',
    textColor: 'text-violet-700'
  },
  'lead-scoring': {
    name: 'Lead Scoring',
    description: 'Automatically score and prioritize leads',
    icon: Star,
    color: 'from-amber-500 to-amber-600',
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-700'
  },
  'revenue-tracking': {
    name: 'Revenue Tracking',
    description: 'Track revenue, deals, and financial performance',
    icon: DollarSign,
    color: 'from-lime-500 to-lime-600',
    bgColor: 'bg-lime-50',
    textColor: 'text-lime-700'
  }
}

interface OnboardingToolsWidgetsProps {
  className?: string
  showTitle?: boolean
  maxTools?: number
}

export default function OnboardingToolsWidgets({ 
  className = "", 
  showTitle = true,
  maxTools 
}: OnboardingToolsWidgetsProps) {
  const { tools, loading, error } = useTenantTools()

  if (loading) {
    return (
        <div className={`${className}`}>
          {showTitle && (
            <h3 className="text-lg font-semibold text-white mb-4">Your Selected Tools</h3>
          )}
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
            <span className="ml-2 text-gray-400">Loading your tools...</span>
          </div>
        </div>
    )
  }

  if (error) {
    return (
        <div className={`${className}`}>
          {showTitle && (
            <h3 className="text-lg font-semibold text-white mb-4">Your Selected Tools</h3>
          )}
          <div className="text-center py-8">
            <p className="text-red-400">Error loading tools: {error}</p>
          </div>
        </div>
    )
  }

  if (tools.length === 0) {
    return (
        <div className={`${className}`}>
          {showTitle && (
            <h3 className="text-lg font-semibold text-white mb-4">Your Selected Tools</h3>
          )}
          <div className="text-center py-8">
            <p className="text-gray-400">No tools selected yet. Complete onboarding to add tools.</p>
          </div>
        </div>
    )
  }

  const displayTools = maxTools ? tools.slice(0, maxTools) : tools

  return (
    <div className={`${className}`}>
      {showTitle && (
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Your Selected Tools</h3>
          <Badge variant="outline" className="text-sm border-gray-600 text-gray-300">
            {tools.length} tool{tools.length !== 1 ? 's' : ''} enabled
          </Badge>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayTools.map((tool) => {
          const info = toolInfo[tool.id as keyof typeof toolInfo]
          
          if (!info) {
            return null // Skip unknown tools
          }

          const Icon = info.icon

          return (
            <Card key={tool.id} className="hover:shadow-md transition-shadow duration-200 bg-gray-800/50 border-gray-700">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${info.color} flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-sm font-medium text-white">
                      {info.name}
                    </CardTitle>
                    <CardDescription className="text-xs text-gray-400">
                      Enabled {new Date(tool.enabledAt).toLocaleDateString()}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-xs text-gray-400 mb-3">
                  {info.description}
                </p>
                <div className="flex items-center justify-between">
                  <Badge className={`${info.bgColor} ${info.textColor} border-0`}>
                    Active
                  </Badge>
                  <button className="text-xs text-blue-400 hover:text-blue-300 font-medium">
                    Configure
                  </button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {maxTools && tools.length > maxTools && (
        <div className="text-center mt-4">
          <p className="text-sm text-gray-400">
            Showing {maxTools} of {tools.length} tools
          </p>
        </div>
      )}
    </div>
  )
}
