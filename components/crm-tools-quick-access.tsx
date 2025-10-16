"use client"

import { useTenantTools } from '@/hooks/use-tenant-tools'
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

// Map tool IDs to their icons and colors
const toolIcons = {
  'contact-summary': { icon: Users, color: 'text-blue-600 hover:bg-blue-50' },
  'deal-pipeline': { icon: TrendingUp, color: 'text-green-600 hover:bg-green-50' },
  'recent-activities': { icon: Clock, color: 'text-purple-600 hover:bg-purple-50' },
  'email-tracker': { icon: Mail, color: 'text-orange-600 hover:bg-orange-50' },
  'call-scheduler': { icon: Phone, color: 'text-teal-600 hover:bg-teal-50' },
  'company-insights': { icon: Building2, color: 'text-indigo-600 hover:bg-indigo-50' },
  'task-manager': { icon: Target, color: 'text-pink-600 hover:bg-pink-50' },
  'chat-widget': { icon: MessageSquare, color: 'text-cyan-600 hover:bg-cyan-50' },
  'performance-metrics': { icon: BarChart3, color: 'text-emerald-600 hover:bg-emerald-50' },
  'calendar-integration': { icon: Calendar, color: 'text-violet-600 hover:bg-violet-50' },
  'lead-scoring': { icon: Star, color: 'text-amber-600 hover:bg-amber-50' },
  'revenue-tracking': { icon: DollarSign, color: 'text-lime-600 hover:bg-lime-50' }
}

interface CRMToolsQuickAccessProps {
  className?: string
}

export default function CRMToolsQuickAccess({ className = "" }: CRMToolsQuickAccessProps) {
  const { tools, loading } = useTenantTools()

  if (loading) {
    return (
        <div className={`flex items-center gap-2 ${className}`}>
          <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
          <span className="text-sm text-gray-400">Loading tools...</span>
        </div>
    )
  }

  if (tools.length === 0) {
    return null
  }

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <span className="text-sm text-gray-400 mr-2">Quick Access:</span>
      {tools.slice(0, 5).map((tool) => {
        const toolIcon = toolIcons[tool.id as keyof typeof toolIcons]
        
        if (!toolIcon) {
          return null
        }

        const Icon = toolIcon.icon

        return (
          <button
            key={tool.id}
            className={`p-2 rounded-lg transition-colors ${toolIcon.color}`}
            title={`${tool.id.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}`}
          >
            <Icon className="w-4 h-4" />
          </button>
        )
      })}
      {tools.length > 5 && (
        <span className="text-xs text-gray-400 ml-1">
          +{tools.length - 5} more
        </span>
      )}
    </div>
  )
}
