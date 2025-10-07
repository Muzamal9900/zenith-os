"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { useCRM } from "@/contexts/crm-context"
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  Calendar,
  Download,
  Filter,
  RefreshCw,
  Eye,
  EyeOff,
  Target,
  Award,
  Activity,
  Building2,
  Phone,
  Mail,
  Clock,
  FileText,
  Settings,
  FileText as Template,
  PieChart,
  LineChart,
  TrendingUp as TrendingUpIcon,
  Globe
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ReportsPage() {
  const {
    contacts, deals, activities, companies, stats,
    isLoading: crmLoading, isContactsLoading, isDealsLoading, isActivitiesLoading, isStatsLoading,
    loadContacts, loadDeals, loadActivities, loadCompanies, loadStats,
    refreshData, error, clearError
  } = useCRM()

  const [selectedPeriod, setSelectedPeriod] = useState('30d')
  const [selectedMetric, setSelectedMetric] = useState('revenue')
  const [showFilters, setShowFilters] = useState(false)
  const [dateRange, setDateRange] = useState({ start: '', end: '' })
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const sectionRef = useRef<HTMLDivElement>(null)

  const periods = [
    { id: '7d', label: 'Last 7 days', value: '7d' },
    { id: '30d', label: 'Last 30 days', value: '30d' },
    { id: '90d', label: 'Last 90 days', value: '90d' },
    { id: '1y', label: 'Last year', value: '1y' }
  ]

  const metrics = [
    { id: 'revenue', label: 'Revenue', icon: DollarSign, color: 'text-green-600' },
    { id: 'leads', label: 'Leads', icon: Users, color: 'text-blue-600' },
    { id: 'conversions', label: 'Conversions', icon: Target, color: 'text-purple-600' },
    { id: 'activities', label: 'Activities', icon: Activity, color: 'text-orange-600' }
  ]

  const analyticsTabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3, description: 'Key metrics and performance' },
    { id: 'contacts', label: 'Contacts', icon: Users, description: 'Contact analytics and insights' },
    { id: 'deals', label: 'Deals', icon: Target, description: 'Sales pipeline and deal tracking' },
    { id: 'companies', label: 'Companies', icon: Building2, description: 'Company performance metrics' },
    { id: 'activities', label: 'Activities', icon: Activity, description: 'Activity tracking and trends' },
    { id: 'reports', label: 'Reports', icon: FileText, description: 'Detailed reports and analysis' },
    { id: 'settings', label: 'Settings', icon: Settings, description: 'Analytics configuration' }
  ]

  // Calculate date range based on selected period
  const getDateRange = (period: string) => {
    const now = new Date()
    const start = new Date()
    
    switch (period) {
      case '7d':
        start.setDate(now.getDate() - 7)
        break
      case '30d':
        start.setDate(now.getDate() - 30)
        break
      case '90d':
        start.setDate(now.getDate() - 90)
        break
      case '1y':
        start.setFullYear(now.getFullYear() - 1)
        break
      default:
        start.setDate(now.getDate() - 30)
    }
    
    return { start, end: now }
  }

  // Calculate real metrics from CRM data
  const calculateMetrics = () => {
    const { start, end } = getDateRange(selectedPeriod)
    const previousStart = new Date(start)
    const previousEnd = new Date(start)
    previousStart.setDate(start.getDate() - (end.getDate() - start.getDate()))

    // Filter data by date range
    const currentDeals = deals.filter(deal => {
      const dealDate = new Date(deal.createdAt || deal.date)
      return dealDate >= start && dealDate <= end
    })

    const previousDeals = deals.filter(deal => {
      const dealDate = new Date(deal.createdAt || deal.date)
      return dealDate >= previousStart && dealDate < start
    })

    const currentActivities = activities.filter(activity => {
      const activityDate = new Date(activity.createdAt || activity.date)
      return activityDate >= start && activityDate <= end
    })

    const currentContacts = contacts.filter(contact => {
      const contactDate = new Date(contact.createdAt || contact.date)
      return contactDate >= start && contactDate <= end
    })

    // Calculate revenue
    const currentRevenue = currentDeals.reduce((sum, deal) => sum + (deal.value || deal.amount || 0), 0)
    const previousRevenue = previousDeals.reduce((sum, deal) => sum + (deal.value || deal.amount || 0), 0)
    const revenueChange = previousRevenue > 0 ? ((currentRevenue - previousRevenue) / previousRevenue) * 100 : 0

    // Calculate leads (new contacts)
    const currentLeads = currentContacts.length
    const previousLeads = contacts.filter(contact => {
      const contactDate = new Date(contact.createdAt || contact.date)
      return contactDate >= previousStart && contactDate < start
    }).length
    const leadsChange = previousLeads > 0 ? ((currentLeads - previousLeads) / previousLeads) * 100 : 0

    // Calculate conversions (closed deals)
    const currentConversions = currentDeals.filter(deal => deal.stage === 'Closed Won' || deal.status === 'closed').length
    const previousConversions = previousDeals.filter(deal => deal.stage === 'Closed Won' || deal.status === 'closed').length
    const conversionsChange = previousConversions > 0 ? ((currentConversions - previousConversions) / previousConversions) * 100 : 0

    // Calculate activities
    const currentActivitiesCount = currentActivities.length
    const previousActivitiesCount = activities.filter(activity => {
      const activityDate = new Date(activity.createdAt || activity.date)
      return activityDate >= previousStart && activityDate < start
    }).length
    const activitiesChange = previousActivitiesCount > 0 ? ((currentActivitiesCount - previousActivitiesCount) / previousActivitiesCount) * 100 : 0

    return {
      revenue: {
        current: currentRevenue,
        previous: previousRevenue,
        change: Math.round(revenueChange * 10) / 10,
        trend: revenueChange >= 0 ? 'up' : 'down'
      },
      leads: {
        current: currentLeads,
        previous: previousLeads,
        change: Math.round(leadsChange * 10) / 10,
        trend: leadsChange >= 0 ? 'up' : 'down'
      },
      conversions: {
        current: currentConversions,
        previous: previousConversions,
        change: Math.round(conversionsChange * 10) / 10,
        trend: conversionsChange >= 0 ? 'up' : 'down'
      },
      activities: {
        current: currentActivitiesCount,
        previous: previousActivitiesCount,
        change: Math.round(activitiesChange * 10) / 10,
        trend: activitiesChange >= 0 ? 'up' : 'down'
      }
    }
  }

  // Generate chart data from real CRM data
  const generateChartData = () => {
    const months = []
    const now = new Date()
    
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const monthStart = new Date(date.getFullYear(), date.getMonth(), 1)
      const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0)
      
      const monthDeals = deals.filter(deal => {
        const dealDate = new Date(deal.createdAt || deal.date)
        return dealDate >= monthStart && dealDate <= monthEnd
      })
      
      const monthContacts = contacts.filter(contact => {
        const contactDate = new Date(contact.createdAt || contact.date)
        return contactDate >= monthStart && contactDate <= monthEnd
      })
      
      const monthActivities = activities.filter(activity => {
        const activityDate = new Date(activity.createdAt || activity.date)
        return activityDate >= monthStart && activityDate <= monthEnd
      })
      
      months.push({
        month: date.toLocaleDateString('en-US', { month: 'short' }),
        revenue: monthDeals.reduce((sum, deal) => sum + (deal.value || deal.amount || 0), 0),
        leads: monthContacts.length,
        conversions: monthDeals.filter(deal => deal.stage === 'Closed Won' || deal.status === 'closed').length,
        activities: monthActivities.length
      })
    }
    
    return months
  }

  // Memoize calculations to prevent unnecessary re-renders
  const realData = useMemo(() => {
    if (contacts.length === 0 && deals.length === 0 && activities.length === 0) {
      return {
        revenue: { current: 0, previous: 0, change: 0, trend: 'up' },
        leads: { current: 0, previous: 0, change: 0, trend: 'up' },
        conversions: { current: 0, previous: 0, change: 0, trend: 'up' },
        activities: { current: 0, previous: 0, change: 0, trend: 'up' }
      }
    }
    return calculateMetrics()
  }, [contacts, deals, activities, selectedPeriod])
  
  const chartData = useMemo(() => {
    if (contacts.length === 0 && deals.length === 0 && activities.length === 0) {
      return []
    }
    return generateChartData()
  }, [contacts, deals, activities])

  useEffect(() => {
    // Load CRM data when component mounts (only once)
    const loadData = async () => {
      try {
        await Promise.all([
          loadContacts(),
          loadDeals(),
          loadActivities(),
          loadCompanies(),
          loadStats()
        ])
      } catch (error) {
        console.error('Error loading CRM data:', error)
      }
    }

    loadData()
  }, []) // Empty dependency array - only run once on mount

  useEffect(() => {
    // Set up intersection observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in")
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = sectionRef.current?.querySelectorAll(".fade-in-element")
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [realData, chartData]) // Re-run when data changes to animate new content

  const currentMetric = realData[selectedMetric as keyof typeof realData]
  const isPositive = currentMetric.trend === 'up'
  const isDataLoading = crmLoading || isContactsLoading || isDealsLoading || isActivitiesLoading || isStatsLoading
  
  // Show loading state if we're still loading and have no data
  const showLoadingState = isDataLoading && contacts.length === 0 && deals.length === 0 && activities.length === 0

  // Show loading screen if we're still loading initial data
  if (showLoadingState) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading Analytics</h2>
          <p className="text-gray-600">Fetching your CRM data...</p>
        </div>
      </div>
    )
  }

  return (
    <div ref={sectionRef} className="min-h-screen bg-gray-50">
      <div className="max-w-8xl mx-auto">
        {/* Header */}
        <div className="fade-in-element mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
              <p className="text-gray-600">Track your business performance and insights</p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                Filters
              </Button>
              <Button
                variant="outline"
                onClick={async () => {
                  setIsRefreshing(true)
                  try {
                    await refreshData()
                  } finally {
                    setIsRefreshing(false)
                  }
                }}
                disabled={isRefreshing || isDataLoading}
                className="flex items-center gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing || isDataLoading ? 'animate-spin' : ''}`} />
                {isRefreshing || isDataLoading ? 'Refreshing...' : 'Refresh'}
              </Button>
              <Button 
                className="flex items-center gap-2"
                onClick={() => {
                  // Export data as CSV
                  const csvData = [
                    ['Metric', 'Current Period', 'Previous Period', 'Change %'],
                    ['Revenue', `$${realData.revenue.current.toLocaleString()}`, `$${realData.revenue.previous.toLocaleString()}`, `${realData.revenue.change}%`],
                    ['Leads', realData.leads.current.toString(), realData.leads.previous.toString(), `${realData.leads.change}%`],
                    ['Conversions', realData.conversions.current.toString(), realData.conversions.previous.toString(), `${realData.conversions.change}%`],
                    ['Activities', realData.activities.current.toString(), realData.activities.previous.toString(), `${realData.activities.change}%`]
                  ]
                  
                  const csvContent = csvData.map(row => row.join(',')).join('\n')
                  const blob = new Blob([csvContent], { type: 'text/csv' })
                  const url = window.URL.createObjectURL(blob)
                  const a = document.createElement('a')
                  a.href = url
                  a.download = `analytics-report-${selectedPeriod}-${new Date().toISOString().split('T')[0]}.csv`
                  a.click()
                  window.URL.revokeObjectURL(url)
                }}
              >
                <Download className="w-4 h-4" />
                Export
              </Button>
            </div>
          </div>
        </div>

        {/* Analytics Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-7 mb-8">
            {analyticsTabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-2">
                <tab.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Period Selector */}
            <div className="fade-in-element mb-6">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">Time Period:</span>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  {periods.map((period) => (
                    <button
                      key={period.id}
                      onClick={() => setSelectedPeriod(period.value)}
                      className={`px-3 py-1 text-sm rounded-md transition-colors ${
                        selectedPeriod === period.value
                          ? 'bg-white text-gray-900 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {period.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

        {/* Key Metrics */}
        <div className="fade-in-element grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric) => {
            const data = realData[metric.id as keyof typeof realData]
            const isSelected = selectedMetric === metric.id
            const isPositive = data.trend === 'up'
            
            return (
              <Card 
                key={metric.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  isSelected ? 'ring-2 ring-blue-500 shadow-lg' : ''
                } ${isDataLoading ? 'opacity-50' : ''}`}
                onClick={() => setSelectedMetric(metric.id)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className={`p-2 rounded-lg ${metric.color.replace('text-', 'bg-').replace('-600', '-100')}`}>
                      <metric.icon className={`w-5 h-5 ${metric.color}`} />
                    </div>
                    {isDataLoading ? (
                      <div className="w-8 h-4 bg-gray-200 rounded animate-pulse" />
                    ) : (
                      <Badge variant={isPositive ? 'default' : 'destructive'} className="text-xs">
                        {isPositive ? '+' : ''}{data.change}%
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    {isDataLoading ? (
                      <div className="space-y-2">
                        <div className="h-8 bg-gray-200 rounded animate-pulse" />
                        <div className="h-4 bg-gray-200 rounded animate-pulse" />
                        <div className="h-3 bg-gray-200 rounded animate-pulse" />
                      </div>
                    ) : (
                      <>
                        <p className="text-2xl font-bold text-gray-900">
                          {metric.id === 'revenue' ? `$${data.current.toLocaleString()}` : data.current.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-600">{metric.label}</p>
                        <div className="flex items-center gap-1 text-xs">
                          {isPositive ? (
                            <TrendingUp className="w-3 h-3 text-green-600" />
                          ) : (
                            <TrendingDown className="w-3 h-3 text-red-600" />
                          )}
                          <span className={isPositive ? 'text-green-600' : 'text-red-600'}>
                            {isPositive ? '+' : ''}{data.change}% from last period
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Charts Section */}
        <div className="fade-in-element grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Revenue Trend
              </CardTitle>
              <CardDescription>
                Monthly revenue performance over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isDataLoading ? (
                <div className="h-64 flex items-end justify-between gap-2">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="flex flex-col items-center gap-2">
                      <div className="bg-gray-200 rounded-t-sm w-8 h-32 animate-pulse" />
                      <div className="w-8 h-3 bg-gray-200 rounded animate-pulse" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-64 flex items-end justify-between gap-2">
                  {chartData.map((item, index) => {
                    const maxRevenue = Math.max(...chartData.map(d => d.revenue))
                    const height = maxRevenue > 0 ? (item.revenue / maxRevenue) * 200 : 0
                    return (
                      <div key={item.month} className="flex flex-col items-center gap-2">
                        <div 
                          className="bg-blue-500 rounded-t-sm w-8 transition-all duration-500 hover:bg-blue-600 cursor-pointer"
                          style={{ 
                            height: `${height}px`,
                            animationDelay: `${index * 100}ms`
                          }}
                          title={`$${item.revenue.toLocaleString()}`}
                        />
                        <span className="text-xs text-gray-600">{item.month}</span>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Leads Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Leads Generated
              </CardTitle>
              <CardDescription>
                New leads acquired each month
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isDataLoading ? (
                <div className="h-64 flex items-end justify-between gap-2">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="flex flex-col items-center gap-2">
                      <div className="bg-gray-200 rounded-t-sm w-8 h-32 animate-pulse" />
                      <div className="w-8 h-3 bg-gray-200 rounded animate-pulse" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-64 flex items-end justify-between gap-2">
                  {chartData.map((item, index) => {
                    const maxLeads = Math.max(...chartData.map(d => d.leads))
                    const height = maxLeads > 0 ? (item.leads / maxLeads) * 200 : 0
                    return (
                      <div key={item.month} className="flex flex-col items-center gap-2">
                        <div 
                          className="bg-green-500 rounded-t-sm w-8 transition-all duration-500 hover:bg-green-600 cursor-pointer"
                          style={{ 
                            height: `${height}px`,
                            animationDelay: `${index * 100}ms`
                          }}
                          title={`${item.leads} leads`}
                        />
                        <span className="text-xs text-gray-600">{item.month}</span>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="fade-in-element">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>
                Latest business activities and updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isDataLoading ? (
                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded animate-pulse" />
                        <div className="h-3 bg-gray-200 rounded animate-pulse w-1/3" />
                      </div>
                      <div className="w-12 h-5 bg-gray-200 rounded animate-pulse" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {activities.slice(0, 10).map((activity, index) => {
                    const getActivityIcon = (type: string) => {
                      switch (type?.toLowerCase()) {
                        case 'call': return <Phone className="w-3 h-3" />
                        case 'email': return <Mail className="w-3 h-3" />
                        case 'meeting': return <Calendar className="w-3 h-3" />
                        default: return <Activity className="w-3 h-3" />
                      }
                    }

                    const getActivityColor = (type: string) => {
                      switch (type?.toLowerCase()) {
                        case 'call': return 'bg-blue-500'
                        case 'email': return 'bg-green-500'
                        case 'meeting': return 'bg-purple-500'
                        default: return 'bg-gray-500'
                      }
                    }

                    const formatTimeAgo = (date: string) => {
                      const now = new Date()
                      const activityDate = new Date(date)
                      const diffInHours = Math.floor((now.getTime() - activityDate.getTime()) / (1000 * 60 * 60))
                      
                      if (diffInHours < 1) return 'Just now'
                      if (diffInHours < 24) return `${diffInHours} hours ago`
                      const diffInDays = Math.floor(diffInHours / 24)
                      if (diffInDays < 7) return `${diffInDays} days ago`
                      return activityDate.toLocaleDateString()
                    }

                    return (
                      <div key={activity.id || index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className={`w-2 h-2 ${getActivityColor(activity.type)} rounded-full`} />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{activity.subject || activity.title || 'Activity'}</p>
                          <p className="text-xs text-gray-600">{formatTimeAgo(activity.createdAt || activity.date)}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {getActivityIcon(activity.type)}
                          <Badge variant="outline" className="text-xs">
                            {activity.type || 'activity'}
                          </Badge>
                        </div>
                      </div>
                    )
                  })}
                  
                  {activities.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Activity className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p>No recent activities found</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
          </TabsContent>

          {/* Contacts Tab */}
          <TabsContent value="contacts" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Contact Overview
                  </CardTitle>
                  <CardDescription>
                    Contact metrics and performance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total Contacts</span>
                      <span className="text-2xl font-bold">{contacts.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">New This Period</span>
                      <span className="text-lg font-semibold text-green-600">{realData.leads.current}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Growth Rate</span>
                      <span className={`text-lg font-semibold ${realData.leads.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {realData.leads.change >= 0 ? '+' : ''}{realData.leads.change}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="w-5 h-5" />
                    Contact Sources
                  </CardTitle>
                  <CardDescription>
                    Where your contacts come from
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {['Website', 'Referral', 'Social Media', 'Email Campaign', 'Other'].map((source, index) => (
                      <div key={source} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{source}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full" 
                              style={{ width: `${Math.random() * 80 + 20}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{Math.floor(Math.random() * 50 + 10)}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Contacts</CardTitle>
                <CardDescription>Latest contact additions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {contacts.slice(0, 5).map((contact, index) => (
                    <div key={contact.id || index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {(contact.firstName?.[0] || contact.name?.[0] || 'C').toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">
                          {contact.firstName} {contact.lastName} {contact.name}
                        </p>
                        <p className="text-sm text-gray-600">{contact.email}</p>
                      </div>
                      <Badge variant="outline">
                        {contact.status || 'Active'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Deals Tab */}
          <TabsContent value="deals" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Pipeline Value
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900">
                    ${deals.reduce((sum, deal) => sum + (deal.value || deal.amount || 0), 0).toLocaleString()}
                  </div>
                  <p className="text-sm text-gray-600">Total pipeline value</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUpIcon className="w-5 h-5" />
                    Win Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">
                    {deals.length > 0 ? Math.round((deals.filter(deal => deal.stage === 'Closed Won' || deal.status === 'closed').length / deals.length) * 100) : 0}%
                  </div>
                  <p className="text-sm text-gray-600">Deal closure rate</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Avg Deal Size
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">
                    ${deals.length > 0 ? Math.round(deals.reduce((sum, deal) => sum + (deal.value || deal.amount || 0), 0) / deals.length).toLocaleString() : 0}
                  </div>
                  <p className="text-sm text-gray-600">Average deal value</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Deal Pipeline</CardTitle>
                <CardDescription>Deals by stage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['Qualification', 'Needs Analysis', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'].map((stage, index) => {
                    const stageDeals = deals.filter(deal => deal.stage === stage)
                    const stageValue = stageDeals.reduce((sum, deal) => sum + (deal.value || deal.amount || 0), 0)
                    return (
                      <div key={stage} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-blue-500 rounded-full" />
                          <span className="font-medium">{stage}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-600">{stageDeals.length} deals</span>
                          <span className="font-semibold">${stageValue.toLocaleString()}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>All Deals</CardTitle>
                <CardDescription>Complete list of deals in your CRM</CardDescription>
              </CardHeader>
              <CardContent>
                {isDataLoading ? (
                  <div className="space-y-3">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
                          <div className="h-3 bg-gray-200 rounded animate-pulse w-1/3" />
                        </div>
                        <div className="w-20 h-6 bg-gray-200 rounded animate-pulse" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {deals.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <Target className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p>No deals found</p>
                      </div>
                    ) : (
                      deals.map((deal, index) => {
                        const getStageColor = (stage: string) => {
                          switch (stage) {
                            case 'Closed Won': return 'bg-green-500'
                            case 'Closed Lost': return 'bg-red-500'
                            case 'Qualification': return 'bg-blue-500'
                            case 'Needs Analysis': return 'bg-yellow-500'
                            case 'Proposal': return 'bg-purple-500'
                            case 'Negotiation': return 'bg-orange-500'
                            default: return 'bg-gray-500'
                          }
                        }

                        const formatDate = (date: string) => {
                          return new Date(date).toLocaleDateString()
                        }

                        return (
                          <div key={deal.id || index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                              {deal.name?.[0]?.toUpperCase() || 'D'}
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">{deal.name || deal.title || 'Deal'}</p>
                              <p className="text-sm text-gray-600">
                                {deal.company && `Company: ${deal.company}`}
                                {deal.contact && ` • Contact: ${deal.contact}`}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="text-right">
                                <p className="font-semibold text-gray-900">
                                  ${(deal.value || deal.amount || 0).toLocaleString()}
                                </p>
                                <p className="text-xs text-gray-600">
                                  {deal.createdAt && formatDate(deal.createdAt)}
                                </p>
                              </div>
                              <Badge 
                                variant="outline" 
                                className={`${getStageColor(deal.stage)} text-white border-0`}
                              >
                                {deal.stage || 'Unknown'}
                              </Badge>
                            </div>
                          </div>
                        )
                      })
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Companies Tab */}
          <TabsContent value="companies" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="w-5 h-5" />
                    Company Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total Companies</span>
                      <span className="text-2xl font-bold">{companies.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Active Companies</span>
                      <span className="text-lg font-semibold text-green-600">
                        {companies.filter(company => company.status === 'active' || !company.status).length}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Company Industries</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {['Technology', 'Healthcare', 'Finance', 'Manufacturing', 'Other'].map((industry, index) => (
                      <div key={industry} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{industry}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full" 
                              style={{ width: `${Math.random() * 80 + 20}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{Math.floor(Math.random() * 30 + 5)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>All Companies</CardTitle>
                <CardDescription>Complete list of companies in your CRM</CardDescription>
              </CardHeader>
              <CardContent>
                {isDataLoading ? (
                  <div className="space-y-3">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-gray-200 rounded animate-pulse w-1/3" />
                          <div className="h-3 bg-gray-200 rounded animate-pulse w-1/4" />
                        </div>
                        <div className="w-16 h-6 bg-gray-200 rounded animate-pulse" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {companies.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <Building2 className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p>No companies found</p>
                      </div>
                    ) : (
                      companies.map((company, index) => (
                        <div key={company.id || index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                            {company.name?.[0]?.toUpperCase() || 'C'}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{company.name}</p>
                            <p className="text-sm text-gray-600">{company.industry || 'No industry specified'}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">
                              {company.status || 'Active'}
                            </Badge>
                            {company.website && (
                              <Button variant="ghost" size="sm" asChild>
                                <a href={company.website} target="_blank" rel="noopener noreferrer">
                                  <Globe className="w-4 h-4" />
                                </a>
                              </Button>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activities Tab */}
          <TabsContent value="activities" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Activity Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total Activities</span>
                      <span className="text-2xl font-bold">{activities.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">This Period</span>
                      <span className="text-lg font-semibold text-blue-600">{realData.activities.current}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Activity Types</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {['Calls', 'Emails', 'Meetings', 'Tasks', 'Notes'].map((type, index) => (
                      <div key={type} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{type}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-purple-500 h-2 rounded-full" 
                              style={{ width: `${Math.random() * 80 + 20}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{Math.floor(Math.random() * 20 + 5)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>All Activities</CardTitle>
                <CardDescription>Complete list of activities in your CRM</CardDescription>
              </CardHeader>
              <CardContent>
                {isDataLoading ? (
                  <div className="space-y-3">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
                          <div className="h-3 bg-gray-200 rounded animate-pulse w-1/4" />
                        </div>
                        <div className="w-16 h-6 bg-gray-200 rounded animate-pulse" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {activities.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <Activity className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p>No activities found</p>
                      </div>
                    ) : (
                      activities.map((activity, index) => {
                        const getActivityIcon = (type: string) => {
                          switch (type?.toLowerCase()) {
                            case 'call': return <Phone className="w-4 h-4" />
                            case 'email': return <Mail className="w-4 h-4" />
                            case 'meeting': return <Calendar className="w-4 h-4" />
                            default: return <Activity className="w-4 h-4" />
                          }
                        }

                        const getActivityColor = (type: string) => {
                          switch (type?.toLowerCase()) {
                            case 'call': return 'bg-blue-500'
                            case 'email': return 'bg-green-500'
                            case 'meeting': return 'bg-purple-500'
                            default: return 'bg-gray-500'
                          }
                        }

                        const formatTimeAgo = (date: string) => {
                          const now = new Date()
                          const activityDate = new Date(date)
                          const diffInHours = Math.floor((now.getTime() - activityDate.getTime()) / (1000 * 60 * 60))
                          
                          if (diffInHours < 1) return 'Just now'
                          if (diffInHours < 24) return `${diffInHours} hours ago`
                          const diffInDays = Math.floor(diffInHours / 24)
                          if (diffInDays < 7) return `${diffInDays} days ago`
                          return activityDate.toLocaleDateString()
                        }

                        return (
                          <div key={activity.id || index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <div className={`w-8 h-8 ${getActivityColor(activity.type)} rounded-full flex items-center justify-center text-white`}>
                              {getActivityIcon(activity.type)}
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">{activity.subject || activity.title || 'Activity'}</p>
                              <p className="text-sm text-gray-600">{formatTimeAgo(activity.createdAt || activity.date)}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">
                                {activity.type || 'activity'}
                              </Badge>
                              {activity.status && (
                                <Badge variant={activity.status === 'completed' ? 'default' : 'secondary'}>
                                  {activity.status}
                                </Badge>
                              )}
                            </div>
                          </div>
                        )
                      })
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Generate Reports
                  </CardTitle>
                  <CardDescription>
                    Create detailed analytics reports
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button className="w-full justify-start">
                      <Download className="w-4 h-4 mr-2" />
                      Contact Report
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="w-4 h-4 mr-2" />
                      Deal Pipeline Report
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="w-4 h-4 mr-2" />
                      Activity Report
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="w-4 h-4 mr-2" />
                      Company Report
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Report History</CardTitle>
                  <CardDescription>
                    Previously generated reports
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {['Monthly Summary - Dec 2024', 'Q4 Performance Report', 'Contact Analysis - Nov 2024'].map((report, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{report}</p>
                          <p className="text-sm text-gray-600">Generated 2 days ago</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Analytics Settings
                </CardTitle>
                <CardDescription>
                  Configure your analytics preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Default Time Period</label>
                    <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {periods.map((period) => (
                          <SelectItem key={period.id} value={period.value}>
                            {period.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">Auto-refresh Interval</label>
                    <Select defaultValue="5min">
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1min">1 minute</SelectItem>
                        <SelectItem value="5min">5 minutes</SelectItem>
                        <SelectItem value="15min">15 minutes</SelectItem>
                        <SelectItem value="30min">30 minutes</SelectItem>
                        <SelectItem value="off">Off</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Email Notifications</label>
                      <p className="text-sm text-gray-600">Receive weekly analytics summaries</p>
                    </div>
                    <Button variant="outline" size="sm">Enable</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
