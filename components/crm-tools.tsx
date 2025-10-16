/**
 * CRM Tools - Plug & Play tools for CRM module
 * These tools can be enabled/disabled and moved to dashboard
 */

'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { 
  Users, 
  Building2, 
  TrendingUp, 
  Calendar, 
  Mail, 
  Phone, 
  MessageSquare,
  BarChart3,
  Target,
  Clock,
  Star,
  Settings,
  Move,
  Eye,
  EyeOff,
  Network,
  Zap,
  Shield
} from "lucide-react"

interface CRMTool {
  id: string
  name: string
  description: string
  icon: any
  category: 'analytics' | 'communication' | 'management' | 'automation' | 'compliance'
  enabled: boolean
  onDashboard: boolean
  size: 'small' | 'medium' | 'large'
  data?: any
}

// Tool definitions with features
const toolFeatures = {
  'contact-summary': ['Total Contacts', 'New This Month', 'Active Contacts', 'Lead Distribution'],
  'deal-pipeline': ['Pipeline Value', 'Total Deals', 'Closed This Month', 'Average Deal Size'],
  'recent-activities': ['Total Activities', 'Today\'s Tasks', 'Pending Items', 'Completed Tasks'],
  'email-tracker': ['Emails Sent', 'Open Rates', 'Click Rates', 'Response Rates'],
  'call-scheduler': ['Scheduled Calls', 'Completed Calls', 'Pending Calls', 'Average Duration'],
  'company-insights': ['Total Companies', 'New Companies', 'Active Companies', 'Revenue per Company'],
  'task-manager': ['Total Tasks', 'Completed Tasks', 'Overdue Tasks', 'Completion Rate'],
  'chat-widget': ['Active Chats', 'Waiting Queue', 'Response Time', 'Customer Satisfaction'],
  'performance-metrics': ['Team Goals', 'Current Performance', 'Top Performer', 'Team Size'],
  'calendar-integration': ['Sync Status', 'Upcoming Events', 'Calendar Connections', 'Meeting Analytics'],
  'lead-scoring': ['Hot Leads', 'Warm Leads', 'Cold Leads', 'Average Score'],
  'sales-forecast': ['Forecasted Revenue', 'Confidence Level', 'Deals in Pipeline', 'Expected Close'],
  'customer-satisfaction': ['NPS Score', 'CSAT Rating', 'Response Rate', 'Total Feedback'],
  'revenue-analytics': ['Monthly Revenue', 'Quarterly Revenue', 'Yearly Revenue', 'Growth Rate'],
  'team-productivity': ['Total Activities', 'Completed Activities', 'Completion Rate', 'Avg Time'],
  'integration-status': ['Email Integration', 'Calendar Integration', 'Phone Integration', 'Chat Integration'],
  'automation-rules': ['Active Rules', 'Triggered Today', 'Success Rate', 'Rule Performance'],
  'data-quality': ['Email Completeness', 'Phone Completeness', 'Duplicate Detection', 'Overall Score'],
  'compliance-monitor': ['GDPR Compliance', 'Data Retention', 'Consent Tracking', 'Violations']
}

const defaultTools: CRMTool[] = [
  {
    id: 'contact-summary',
    name: 'Contact Summary',
    description: 'Get a comprehensive overview of your contact database with key statistics including total contacts, new additions this month, active contacts, and lead distribution. Perfect for understanding your contact growth and engagement.',
    icon: Users,
    category: 'analytics',
    enabled: true,
    onDashboard: false,
    size: 'medium'
  },
  {
    id: 'deal-pipeline',
    name: 'Deal Pipeline',
    description: 'Visualize your entire sales pipeline with real-time deal tracking, total pipeline value, closed deals this month, and average deal size. Monitor your sales progress and identify opportunities for growth.',
    icon: TrendingUp,
    category: 'analytics',
    enabled: true,
    onDashboard: false,
    size: 'large'
  },
  {
    id: 'recent-activities',
    name: 'Recent Activities',
    description: 'Stay updated with the latest customer interactions and team activities. Track completed tasks, pending items, and daily activity summaries to maintain momentum in your CRM workflow.',
    icon: Clock,
    category: 'management',
    enabled: true,
    onDashboard: false,
    size: 'medium'
  },
  {
    id: 'email-tracker',
    name: 'Email Tracker',
    description: 'Monitor email campaign performance with detailed metrics on sent emails, open rates, click-through rates, and response rates. Optimize your email marketing strategy with actionable insights and track customer engagement across all email communications.',
    icon: Mail,
    category: 'communication',
    enabled: true,
    onDashboard: false,
    size: 'small'
  },
  {
    id: 'call-scheduler',
    name: 'Call Scheduler',
    description: 'Efficiently manage your customer calls with scheduling tools, call tracking, and performance metrics. Track scheduled calls, completed calls, and average call duration to improve your communication strategy and maintain strong customer relationships.',
    icon: Phone,
    category: 'communication',
    enabled: true,
    onDashboard: false,
    size: 'medium'
  },
  {
    id: 'company-insights',
    name: 'Company Insights',
    description: 'Analyze company performance and growth metrics with comprehensive data on total companies, new additions, active companies, and revenue per company. Make data-driven decisions for your business development and identify opportunities for expansion.',
    icon: Building2,
    category: 'analytics',
    enabled: true,
    onDashboard: false,
    size: 'large'
  },
  {
    id: 'task-manager',
    name: 'Task Manager',
    description: 'Organize and track all your tasks and follow-ups with detailed task management capabilities. Monitor total tasks, completed items, overdue tasks, and completion rates to stay on top of your workload and ensure nothing falls through the cracks.',
    icon: Target,
    category: 'management',
    enabled: true,
    onDashboard: false,
    size: 'medium'
  },
  {
    id: 'chat-widget',
    name: 'Live Chat',
    description: 'Provide real-time customer support with an integrated live chat widget that enables instant communication. Track active chats, response times, and customer satisfaction to deliver exceptional customer service experiences and build stronger relationships.',
    icon: MessageSquare,
    category: 'communication',
    enabled: true,
    onDashboard: false,
    size: 'small'
  },
  {
    id: 'performance-metrics',
    name: 'Performance Metrics',
    description: 'Track team and individual performance with comprehensive metrics including team goals, current performance levels, top performers, and team size analytics. Drive productivity and recognize achievements with detailed performance insights and goal tracking.',
    icon: BarChart3,
    category: 'analytics',
    enabled: true,
    onDashboard: false,
    size: 'large'
  },
  {
    id: 'calendar-integration',
    name: 'Calendar Integration',
    description: 'Seamlessly sync with external calendar systems including Google Calendar, Outlook, and other popular platforms to manage appointments, meetings, and events. Track sync status, upcoming events, and calendar connectivity for better time management and scheduling efficiency.',
    icon: Calendar,
    category: 'automation',
    enabled: true,
    onDashboard: false,
    size: 'small'
  },
  {
    id: 'lead-scoring',
    name: 'Lead Scoring',
    description: 'Automatically qualify and score leads based on predefined criteria and behavioral patterns. Categorize leads as hot, warm, or cold, track average scores, and improve conversion rates with data-driven lead management and prioritization strategies.',
    icon: Star,
    category: 'analytics',
    enabled: true,
    onDashboard: false,
    size: 'medium'
  },
  {
    id: 'sales-forecast',
    name: 'Sales Forecast',
    description: 'Predict future sales performance with advanced forecasting analytics and machine learning algorithms. Analyze forecasted revenue, confidence levels, deals in pipeline, and expected close dates to plan your sales strategy and make informed business decisions.',
    icon: TrendingUp,
    category: 'analytics',
    enabled: true,
    onDashboard: false,
    size: 'large'
  },
  {
    id: 'customer-satisfaction',
    name: 'Customer Satisfaction',
    description: 'Measure and track customer satisfaction with comprehensive NPS scores, CSAT ratings, response rates, and total feedback collection. Understand customer sentiment, identify improvement areas, and enhance your service quality based on real customer insights.',
    icon: Star,
    category: 'analytics',
    enabled: true,
    onDashboard: false,
    size: 'medium'
  },
  {
    id: 'revenue-analytics',
    name: 'Revenue Analytics',
    description: 'Comprehensive revenue tracking with detailed monthly, quarterly, and yearly analytics to monitor financial performance. Track revenue growth, trends, and performance metrics to make informed financial decisions and identify opportunities for revenue optimization.',
    icon: BarChart3,
    category: 'analytics',
    enabled: true,
    onDashboard: false,
    size: 'large'
  },
  {
    id: 'team-productivity',
    name: 'Team Productivity',
    description: 'Monitor team productivity with detailed metrics on total activities, completion rates, and average completion times. Identify productivity trends, optimize team performance, and ensure efficient workflow management across all team members and departments.',
    icon: Target,
    category: 'management',
    enabled: true,
    onDashboard: false,
    size: 'medium'
  },
  {
    id: 'integration-status',
    name: 'Integration Status',
    description: 'Monitor the health and status of all third-party integrations including email, calendar, phone, and chat systems. Ensure seamless connectivity, troubleshoot integration issues, and maintain optimal performance across all connected platforms and services.',
    icon: Network,
    category: 'automation',
    enabled: true,
    onDashboard: false,
    size: 'small'
  },
  {
    id: 'automation-rules',
    name: 'Automation Rules',
    description: 'Manage automated workflows and business rules to streamline your CRM processes and reduce manual work. Track active rules, execution counts, and success rates to optimize your automation strategy and improve overall operational efficiency.',
    icon: Zap,
    category: 'automation',
    enabled: true,
    onDashboard: false,
    size: 'medium'
  },
  {
    id: 'data-quality',
    name: 'Data Quality',
    description: 'Monitor and improve your data quality with comprehensive metrics on email completeness, phone number accuracy, duplicate detection, and overall data health scores. Ensure data integrity and maintain high-quality customer information across your CRM system.',
    icon: Shield,
    category: 'compliance',
    enabled: true,
    onDashboard: false,
    size: 'small'
  },
  {
    id: 'compliance-monitor',
    name: 'Compliance Monitor',
    description: 'Ensure GDPR compliance and data protection with comprehensive monitoring tools for data retention policies, consent tracking, and compliance violations. Maintain regulatory compliance effortlessly and protect your business from potential legal issues.',
    icon: Shield,
    category: 'compliance',
    enabled: true,
    onDashboard: false,
    size: 'small'
  }
]

export default function CRMTools() {
  const [tools, setTools] = useState<CRMTool[]>(defaultTools)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [loading, setLoading] = useState(false)
  const [toolsData, setToolsData] = useState<Record<string, any>>({})

  const categories = [
    { id: 'all', name: 'All Tools', count: tools.length },
    { id: 'analytics', name: 'Analytics', count: tools.filter(t => t.category === 'analytics').length },
    { id: 'communication', name: 'Communication', count: tools.filter(t => t.category === 'communication').length },
    { id: 'management', name: 'Management', count: tools.filter(t => t.category === 'management').length },
    { id: 'automation', name: 'Automation', count: tools.filter(t => t.category === 'automation').length },
    { id: 'compliance', name: 'Compliance', count: tools.filter(t => t.category === 'compliance').length }
  ]

  // Fetch tools data on component mount
  useEffect(() => {
    fetchToolsData()
  }, [])

  const fetchToolsData = async () => {
    try {
      setLoading(true)
      // Fetch tools data with user settings
      const response = await fetch('/api/crm-tools?settings=true')
      if (response.ok) {
        const data = await response.json()
        setToolsData(data.settings || {})
        
        // Update tools with user settings
        setTools(prevTools => prevTools.map(tool => {
          const userSetting = data.settings[tool.id]
          if (userSetting) {
            return {
              ...tool,
              onDashboard: userSetting.onDashboard
            }
          }
          return tool
        }))
      }
    } catch (error) {
      console.error('Error fetching tools data:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredTools = tools.filter(tool => {
    const categoryMatch = selectedCategory === 'all' || tool.category === selectedCategory
    return categoryMatch
  })


  const toggleDashboard = async (toolId: string) => {
    const tool = tools.find(t => t.id === toolId)
    if (!tool) return

    try {
      const response = await fetch('/api/crm-tools', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'dashboard',
          toolId,
          onDashboard: !tool.onDashboard
        })
      })

      if (response.ok) {
        setTools(prev => prev.map(t => 
          t.id === toolId ? { ...t, onDashboard: !t.onDashboard } : t
        ))
      }
    } catch (error) {
      console.error('Error updating dashboard:', error)
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'analytics': return 'bg-blue-900/50 text-blue-300'
      case 'communication': return 'bg-green-900/50 text-green-300'
      case 'management': return 'bg-purple-900/50 text-purple-300'
      case 'automation': return 'bg-orange-900/50 text-orange-300'
      default: return 'bg-gray-700/50 text-gray-300'
    }
  }

  const getSizeIcon = (size: string) => {
    switch (size) {
      case 'small': return 'S'
      case 'medium': return 'M'
      case 'large': return 'L'
      default: return 'M'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400">Plug & play tools for your CRM workflow</p>
        </div>
        <div className="flex items-center gap-4">
          <Button onClick={fetchToolsData} disabled={loading}>
            {loading ? 'Loading...' : 'Refresh Data'}
          </Button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name} ({category.count})
          </Button>
        ))}
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map(tool => {
          const Icon = tool.icon
          return (
            <Card key={tool.id} className={`transition-all duration-200 hover:shadow-lg bg-gray-800/50 border-gray-700 ${tool.onDashboard ? 'ring-2 ring-green-500/50 bg-green-900/20' : ''}`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${tool.onDashboard ? 'bg-green-900/50' : 'bg-purple-900/50'}`}>
                      <Icon className={`h-5 w-5 ${tool.onDashboard ? 'text-green-400' : 'text-purple-400'}`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-white">{tool.name}</CardTitle>
                      <Badge className={getCategoryColor(tool.category)}>
                        {tool.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">
                      {getSizeIcon(tool.size)}
                    </Badge>
                    {tool.onDashboard && (
                      <Badge variant="secondary" className="text-xs bg-green-900/50 text-green-300">
                        <Eye className="h-3 w-3 mr-1" />
                        On Dashboard
                      </Badge>
                    )}
                  </div>
                </div>
                <CardDescription className="text-sm leading-relaxed text-gray-400">{tool.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Tool Features */}
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {toolFeatures[tool.id as keyof typeof toolFeatures]?.map((feature, index) => (
                    <div key={index} className="text-center p-2 bg-gray-700/50 rounded">
                      <div className="font-semibold text-white">
                        ✓
                      </div>
                      <div className="text-xs text-gray-400">
                        {feature}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tool Controls */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-600">
                  <div className="text-xs text-gray-400">
                    {tool.onDashboard ? 'Added to dashboard' : 'Available to add'}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {tool.onDashboard ? (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleDashboard(tool.id)}
                        className="text-red-400 border-red-600 hover:bg-red-900/20"
                      >
                        <EyeOff className="h-3 w-3 mr-1" />
                        Remove from Dashboard
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        onClick={() => toggleDashboard(tool.id)}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <Move className="h-3 w-3 mr-1" />
                        Add to Dashboard
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

    </div>
  )
}
