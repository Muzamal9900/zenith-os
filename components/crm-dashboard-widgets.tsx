/**
 * CRM Dashboard Widgets - Premium Dashboard Experience
 * Modern, clean, and intuitive user interface with enhanced UX
 */

'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { 
  Users, 
  Building2, 
  TrendingUp, 
  Clock, 
  Mail, 
  Phone, 
  MessageSquare,
  BarChart3,
  Target,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Star,
  DollarSign,
  Network,
  Zap,
  Shield,
  Activity,
  Sparkles,
  Eye,
  Settings,
  RefreshCw,
  Plus,
  Filter,
  Search
} from "lucide-react"

// Enhanced tool definitions with premium styling
const toolDefinitions = {
  'contact-summary': { 
    icon: Users, 
    title: 'Contact Summary',
    color: 'blue',
    gradient: 'from-blue-500 to-blue-600',
    bgGradient: 'from-blue-900/30 to-blue-800/30'
  },
  'deal-pipeline': { 
    icon: TrendingUp, 
    title: 'Deal Pipeline',
    color: 'green',
    gradient: 'from-green-500 to-green-600',
    bgGradient: 'from-green-900/30 to-green-800/30'
  },
  'recent-activities': { 
    icon: Clock, 
    title: 'Recent Activities',
    color: 'purple',
    gradient: 'from-purple-500 to-purple-600',
    bgGradient: 'from-purple-900/30 to-purple-800/30'
  },
  'email-tracker': { 
    icon: Mail, 
    title: 'Email Tracker',
    color: 'orange',
    gradient: 'from-orange-500 to-orange-600',
    bgGradient: 'from-orange-900/30 to-orange-800/30'
  },
  'call-scheduler': { 
    icon: Phone, 
    title: 'Call Scheduler',
    color: 'teal',
    gradient: 'from-teal-500 to-teal-600',
    bgGradient: 'from-teal-900/30 to-teal-800/30'
  },
  'company-insights': { 
    icon: Building2, 
    title: 'Company Insights',
    color: 'indigo',
    gradient: 'from-indigo-500 to-indigo-600',
    bgGradient: 'from-indigo-900/30 to-indigo-800/30'
  },
  'task-manager': { 
    icon: Target, 
    title: 'Task Manager',
    color: 'pink',
    gradient: 'from-pink-500 to-pink-600',
    bgGradient: 'from-pink-900/30 to-pink-800/30'
  },
  'chat-widget': { 
    icon: MessageSquare, 
    title: 'Live Chat',
    color: 'cyan',
    gradient: 'from-cyan-500 to-cyan-600',
    bgGradient: 'from-cyan-900/30 to-cyan-800/30'
  },
  'performance-metrics': { 
    icon: BarChart3, 
    title: 'Performance Metrics',
    color: 'emerald',
    gradient: 'from-emerald-500 to-emerald-600',
    bgGradient: 'from-emerald-900/30 to-emerald-800/30'
  },
  'calendar-integration': { 
    icon: Calendar, 
    title: 'Calendar Integration',
    color: 'violet',
    gradient: 'from-violet-500 to-violet-600',
    bgGradient: 'from-violet-900/30 to-violet-800/30'
  },
  'lead-scoring': { 
    icon: Star, 
    title: 'Lead Scoring',
    color: 'amber',
    gradient: 'from-amber-500 to-amber-600',
    bgGradient: 'from-amber-900/30 to-amber-800/30'
  },
  'sales-forecast': { 
    icon: TrendingUp, 
    title: 'Sales Forecast',
    color: 'rose',
    gradient: 'from-rose-500 to-rose-600',
    bgGradient: 'from-rose-900/30 to-rose-800/30'
  },
  'customer-satisfaction': { 
    icon: Star, 
    title: 'Customer Satisfaction',
    color: 'lime',
    gradient: 'from-lime-500 to-lime-600',
    bgGradient: 'from-lime-900/30 to-lime-800/30'
  },
  'revenue-analytics': { 
    icon: DollarSign, 
    title: 'Revenue Analytics',
    color: 'emerald',
    gradient: 'from-emerald-500 to-emerald-600',
    bgGradient: 'from-emerald-900/30 to-emerald-800/30'
  },
  'team-productivity': { 
    icon: Users, 
    title: 'Team Productivity',
    color: 'sky',
    gradient: 'from-sky-500 to-sky-600',
    bgGradient: 'from-sky-900/30 to-sky-800/30'
  },
  'integration-status': { 
    icon: Network, 
    title: 'Integration Status',
    color: 'slate',
    gradient: 'from-slate-500 to-slate-600',
    bgGradient: 'from-slate-900/30 to-slate-800/30'
  },
  'automation-rules': { 
    icon: Zap, 
    title: 'Automation Rules',
    color: 'yellow',
    gradient: 'from-yellow-500 to-yellow-600',
    bgGradient: 'from-yellow-900/30 to-yellow-800/30'
  },
  'data-quality': { 
    icon: Shield, 
    title: 'Data Quality',
    color: 'red',
    gradient: 'from-red-500 to-red-600',
    bgGradient: 'from-red-900/30 to-red-800/30'
  },
  'compliance-monitor': { 
    icon: Shield, 
    title: 'Compliance Monitor',
    color: 'gray',
    gradient: 'from-gray-500 to-gray-600',
    bgGradient: 'from-gray-900/30 to-gray-800/30'
  }
}

export default function CRMDashboardWidgets() {
  const [widgetsData, setWidgetsData] = useState<Record<string, any>>({})
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<string>('')
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  useEffect(() => {
    fetchWidgetsData()
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchWidgetsData, 30000)
    return () => clearInterval(interval)
  }, [])

  const fetchWidgetsData = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/crm-tools?dashboard=true')
      if (response.ok) {
        const data = await response.json()
        setWidgetsData(data || {})
        setLastUpdated(new Date())
        
        // Set first available tool as active tab
        const availableTools = Object.keys(data || {})
        if (availableTools.length > 0 && !activeTab) {
          setActiveTab(availableTools[0])
        }
      }
    } catch (error) {
      console.error('Error fetching widgets data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900">
        <div className="max-w-8xl mx-auto space-y-8">
          {/* Header Skeleton */}
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded-lg w-1/3 mb-2"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2"></div>
          </div>
          
          {/* Stats Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-32 bg-gray-800/50 rounded-2xl shadow-sm border border-gray-700"></div>
              </div>
            ))}
          </div>
          
          {/* Content Skeleton */}
          <div className="animate-pulse">
            <div className="h-96 bg-gray-800/50 rounded-2xl shadow-sm border border-gray-700"></div>
          </div>
        </div>
      </div>
    )
  }

  // Get tools that are on dashboard
  const availableTools = Object.keys(widgetsData).filter(toolId => 
    widgetsData[toolId]
  )

  if (availableTools.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900/50">
        <div className="max-w-8xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-gray-400">Your CRM insights and analytics hub</p>
          </div>

          {/* Empty State */}
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center max-w-md">
              <div className="w-20 h-20 bg-gray-800/50 border border-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="h-10 w-10 text-gray-400" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-3">Ready to Get Started?</h3>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Add CRM tools to your dashboard to see real-time analytics, insights, and performance metrics all in one place.
              </p>
              
              <Button 
                size="lg" 
                className="bg-gray-700 hover:bg-gray-600 text-white border border-gray-600"
                asChild
              >
                <a href="/portal/crm">
                  <Plus className="h-5 w-5 mr-2" />
                  Add CRM Tools
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Set active tab if not set
  if (!activeTab && availableTools.length > 0) {
    setActiveTab(availableTools[0])
  }

  const renderToolContent = (toolId: string) => {
    const data = widgetsData[toolId]
    const toolDef = toolDefinitions[toolId as keyof typeof toolDefinitions]
    
    if (!data || !toolDef) return null

    const Icon = toolDef.icon
    const dataEntries = Object.entries(data).filter(([key]) => key !== 'onDashboard' && key !== 'settings')

    return (
      <div className="space-y-8">
        {/* Enhanced Tool Header */}
        <div className="bg-gray-800/50 rounded-xl shadow-sm border border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-900/50 rounded-lg">
                <Icon className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">{toolDef.title}</h2>
                <p className="text-gray-400">Real-time insights and analytics</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="bg-gray-700/50 text-gray-300 border-gray-600">
                <Activity className="h-3 w-3 mr-1" />
                Live Data
              </Badge>
              <Button variant="outline" size="sm" onClick={fetchWidgetsData} disabled={loading} className="bg-gray-700/50 hover:bg-gray-600 border-gray-600 text-gray-300">
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Data Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dataEntries.map(([key, value], index) => (
            <div key={key} className="bg-gray-800/50 rounded-xl shadow-sm border border-gray-700 p-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-3">
                  {typeof value === 'number' && value > 1000 
                    ? (value / 1000).toFixed(1) + 'K' 
                    : String(value)}
                </div>
                <div className="text-sm font-medium text-gray-400 capitalize tracking-wide">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </div>
                {index === 0 && (
                  <div className="mt-3">
                    <Progress value={75} className="h-2" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Detailed Information */}
        <div className="bg-gray-800/50 rounded-xl shadow-sm border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <h3 className="text-xl font-bold text-white">Detailed Analytics</h3>
            <p className="text-gray-400">Comprehensive data breakdown for {toolDef.title}</p>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {dataEntries.map(([key, value], index) => (
                <div key={key} className="flex justify-between items-center py-3 px-4 bg-gray-700/50 rounded-lg hover:bg-gray-600/50 transition-colors duration-200">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                    <span className="text-sm font-medium text-gray-200 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-white">
                      {typeof value === 'number' && value > 1000 
                        ? (value / 1000).toFixed(1) + 'K' 
                        : String(value)}
                    </span>
                    {index % 2 === 0 && (
                      <ArrowUpRight className="h-4 w-4 text-purple-400" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
      <div className="min-h-screen bg-gray-900">
      <div className="max-w-8xl mx-auto space-y-8">
        {/* Enhanced Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-gray-400 text-lg">Your CRM insights and analytics hub</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="bg-gray-800/50 backdrop-blur-sm border-gray-600 text-gray-200">
              <Clock className="h-3 w-3 mr-1" />
              Updated {lastUpdated.toLocaleTimeString()}
            </Badge>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={fetchWidgetsData} 
              disabled={loading}
              className="bg-gray-800/50 backdrop-blur-sm hover:bg-gray-800 border-gray-600 text-gray-300"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>

        {/* Enhanced Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gray-800/50 rounded-xl shadow-sm border border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400 mb-1">Total Tools</p>
                <p className="text-3xl font-bold text-white">{availableTools.length}</p>
              </div>
              <div className="p-3 bg-purple-900/50 rounded-lg">
                <BarChart3 className="h-6 w-6 text-purple-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800/50 rounded-xl shadow-sm border border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400 mb-1">Active Tools</p>
                <p className="text-3xl font-bold text-white">{availableTools.length}</p>
              </div>
              <div className="p-3 bg-purple-900/50 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800/50 rounded-xl shadow-sm border border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400 mb-1">Data Points</p>
                <p className="text-3xl font-bold text-white">
                  {Object.values(widgetsData).reduce((sum, tool) => sum + Object.keys(tool).length, 0)}
                </p>
              </div>
              <div className="p-3 bg-purple-900/50 rounded-lg">
                <Target className="h-6 w-6 text-purple-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800/50 rounded-xl shadow-sm border border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400 mb-1">Last Updated</p>
                <p className="text-lg font-bold text-white">Just now</p>
              </div>
              <div className="p-3 bg-purple-900/50 rounded-lg">
                <Clock className="h-6 w-6 text-purple-400" />
              </div>
            </div>
          </div>
        </div>


        {/* Enhanced Tabbed Dashboard Tools */}
        <div className="bg-gray-800/50 rounded-xl shadow-sm border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white">Dashboard Tools</h3>
                <p className="text-gray-400">Your selected CRM tools and their data</p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                asChild
                className="bg-gray-800/50 hover:bg-gray-800 border-gray-600 text-gray-300"
              >
                <a href="/portal/crm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add More Tools
                </a>
              </Button>
            </div>
          </div>
          <div className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 bg-gray-700/50 border-gray-600">
                {availableTools.map(toolId => {
                  const toolDef = toolDefinitions[toolId as keyof typeof toolDefinitions]
                  if (!toolDef) return null
                  
                  const Icon = toolDef.icon
                  return (
                    <TabsTrigger 
                      key={toolId} 
                      value={toolId} 
                      className="flex items-center gap-2 data-[state=active]:bg-gray-600 data-[state=active]:text-white hover:bg-gray-600/50 transition-all duration-200 text-gray-300 hover:text-white"
                    >
                      <Icon className="h-4 w-4 text-current" />
                      <span className="hidden sm:inline font-medium">{toolDef.title}</span>
                    </TabsTrigger>
                  )
                })}
              </TabsList>
              
              {availableTools.map(toolId => (
                <TabsContent key={toolId} value={toolId} className="mt-8">
                  {renderToolContent(toolId)}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}