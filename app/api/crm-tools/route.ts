/**
 * CRM Tools API - Handle all CRM tools functionality
 */

import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET /api/crm-tools - Get all CRM tools data
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const toolId = searchParams.get('toolId')
    const category = searchParams.get('category')
    const dashboard = searchParams.get('dashboard') === 'true'
    const settings = searchParams.get('settings') === 'true'

    if (settings) {
      // Return user tool settings and custom tools
      const { settings: userSettings, userTools } = await getUserToolSettings()
      return NextResponse.json({ settings: userSettings, userTools })
    }

    if (dashboard) {
      // Return only tools that are enabled and on dashboard
      const { systemTools, userTools } = await getDashboardTools()
      const toolsData: Record<string, any> = {}
      
      // Get system tools that are on dashboard
      for (const setting of systemTools) {
        const toolData = await getToolData(setting.toolId)
        if (toolData && !toolData.error) {
          toolsData[setting.toolId] = toolData
        }
      }
      
      // Get user tools that are on dashboard
      for (const userTool of userTools) {
        toolsData[userTool.id] = {
          name: userTool.name,
          description: userTool.description,
          category: userTool.category,
          icon: userTool.icon,
          size: userTool.size,
          enabled: userTool.enabled,
          onDashboard: userTool.onDashboard,
          data: userTool.settings
        }
      }
      
      return NextResponse.json(toolsData)
    }

    if (toolId) {
      // Get specific tool data
      const toolData = await getToolData(toolId)
      return NextResponse.json(toolData)
    }

    if (category) {
      // Get tools by category
      const toolsData = await getToolsByCategory(category)
      return NextResponse.json(toolsData)
    }

    // Get all tools data with user settings
    const { settings: userSettings, userTools } = await getUserToolSettings()
    const allToolsData = await getAllToolsData()
    
    // Merge with user settings
    const toolsWithSettings: Record<string, any> = {}
    
    // Add system tools with user settings
    for (const [toolId, toolData] of Object.entries(allToolsData)) {
      const userSetting = userSettings[toolId]
      toolsWithSettings[toolId] = {
        ...toolData,
        onDashboard: userSetting?.onDashboard ?? false,
        settings: userSetting?.settings ?? {}
      }
    }
    
    // Add user tools
    for (const userTool of userTools) {
      toolsWithSettings[userTool.id] = {
        name: userTool.name,
        description: userTool.description,
        category: userTool.category,
        icon: userTool.icon,
        size: userTool.size,
        enabled: userTool.enabled,
        onDashboard: userTool.onDashboard,
        data: userTool.settings
      }
    }
    
    return NextResponse.json(toolsWithSettings)
  } catch (error) {
    console.error('CRM Tools API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/crm-tools - Update tool settings or create user tool
export async function POST(request: NextRequest) {
  try {
    const { action, toolId, enabled, onDashboard, settings, toolData } = await request.json()

    switch (action) {
      case 'dashboard':
        await updateToolDashboard(toolId, onDashboard)
        return NextResponse.json({ success: true, message: `Tool ${onDashboard ? 'added to' : 'removed from'} dashboard` })

      case 'settings':
        await updateToolSettings(toolId, settings)
        return NextResponse.json({ success: true, message: 'Tool settings updated' })

      case 'create':
        const newTool = await createUserTool(toolData)
        return NextResponse.json({ success: true, tool: newTool, message: 'Custom tool created' })

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error('CRM Tools POST error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Get specific tool data
async function getToolData(toolId: string) {
  switch (toolId) {
    case 'contact-summary':
      return await getContactSummaryData()
    case 'deal-pipeline':
      return await getDealPipelineData()
    case 'recent-activities':
      return await getRecentActivitiesData()
    case 'email-tracker':
      return await getEmailTrackerData()
    case 'call-scheduler':
      return await getCallSchedulerData()
    case 'company-insights':
      return await getCompanyInsightsData()
    case 'task-manager':
      return await getTaskManagerData()
    case 'chat-widget':
      return await getChatWidgetData()
    case 'performance-metrics':
      return await getPerformanceMetricsData()
    case 'calendar-integration':
      return await getCalendarIntegrationData()
    case 'lead-scoring':
      return await getLeadScoringData()
    case 'sales-forecast':
      return await getSalesForecastData()
    case 'customer-satisfaction':
      return await getCustomerSatisfactionData()
    case 'revenue-analytics':
      return await getRevenueAnalyticsData()
    case 'team-productivity':
      return await getTeamProductivityData()
    case 'integration-status':
      return await getIntegrationStatusData()
    case 'automation-rules':
      return await getAutomationRulesData()
    case 'data-quality':
      return await getDataQualityData()
    case 'compliance-monitor':
      return await getComplianceMonitorData()
    default:
      return { error: 'Tool not found' }
  }
}

// Get tools by category
async function getToolsByCategory(category: string) {
  const tools = {
    analytics: ['contact-summary', 'deal-pipeline', 'company-insights', 'performance-metrics', 'lead-scoring', 'sales-forecast', 'customer-satisfaction', 'revenue-analytics'],
    communication: ['email-tracker', 'call-scheduler', 'chat-widget'],
    management: ['recent-activities', 'task-manager', 'team-productivity'],
    automation: ['calendar-integration', 'automation-rules', 'integration-status'],
    compliance: ['data-quality', 'compliance-monitor']
  }

  const toolIds = tools[category as keyof typeof tools] || []
  const results = {}

  for (const toolId of toolIds) {
    results[toolId] = await getToolData(toolId)
  }

  return results
}

// Get all tools data
async function getAllToolsData() {
  const allTools = [
    'contact-summary', 'deal-pipeline', 'recent-activities', 'email-tracker',
    'call-scheduler', 'company-insights', 'task-manager', 'chat-widget',
    'performance-metrics', 'calendar-integration', 'lead-scoring', 'sales-forecast',
    'customer-satisfaction', 'revenue-analytics', 'team-productivity', 'integration-status',
    'automation-rules', 'data-quality', 'compliance-monitor'
  ]

  const results = {}
  for (const toolId of allTools) {
    results[toolId] = await getToolData(toolId)
  }

  return results
}

// Individual tool data functions
async function getContactSummaryData() {
  const [totalContacts, newThisMonth, activeContacts, inactiveContacts] = await Promise.all([
    prisma.contact.count({ where: { isActive: true } }),
    prisma.contact.count({
      where: {
        isActive: true,
        createdAt: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
        }
      }
    }),
    prisma.contact.count({
      where: {
        isActive: true,
        status: { in: ['LEAD', 'PROSPECT', 'CUSTOMER'] }
      }
    }),
    prisma.contact.count({
      where: {
        isActive: true,
        status: 'INACTIVE'
      }
    })
  ])

  return {
    totalContacts,
    newThisMonth,
    active: activeContacts,
    inactive: inactiveContacts
  }
}

async function getDealPipelineData() {
  const [deals, closedThisMonth, totalValue] = await Promise.all([
    prisma.deal.count({ where: { isActive: true } }),
    prisma.deal.count({
      where: {
        isActive: true,
        stage: 'CLOSED_WON',
        updatedAt: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
        }
      }
    }),
    prisma.deal.aggregate({
      where: { isActive: true },
      _sum: { value: true }
    })
  ])

  const avgDealSize = deals > 0 ? Number(totalValue._sum.value || 0) / deals : 0

  return {
    totalValue: Number(totalValue._sum.value || 0),
    deals,
    closedThisMonth,
    avgDealSize: Math.round(avgDealSize)
  }
}

async function getRecentActivitiesData() {
  const [totalActivities, todayActivities, pendingActivities, completedActivities] = await Promise.all([
    prisma.activity.count(),
    prisma.activity.count({
      where: {
        createdAt: {
          gte: new Date(new Date().setHours(0, 0, 0, 0))
        }
      }
    }),
    prisma.activity.count({
      where: {
        status: 'PENDING'
      }
    }),
    prisma.activity.count({
      where: {
        status: 'COMPLETED'
      }
    })
  ])

  return {
    activities: totalActivities,
    today: todayActivities,
    pending: pendingActivities,
    completed: completedActivities
  }
}

async function getEmailTrackerData() {
  // This would integrate with email service APIs
  // For now, return placeholder data that would come from email service
  return {
    sent: 0,
    opened: 0,
    clicked: 0,
    replied: 0
  }
}

async function getCallSchedulerData() {
  const [scheduled, completed, pending] = await Promise.all([
    prisma.activity.count({
      where: {
        type: 'CALL',
        status: 'PENDING'
      }
    }),
    prisma.activity.count({
      where: {
        type: 'CALL',
        status: 'COMPLETED'
      }
    }),
    prisma.activity.count({
      where: {
        type: 'CALL',
        status: 'PENDING'
      }
    })
  ])

  return {
    scheduled,
    completed,
    pending,
    avgDuration: '24min' // This would be calculated from actual call data
  }
}

async function getCompanyInsightsData() {
  const [companies, newThisMonth, activeCompanies] = await Promise.all([
    prisma.company.count({ where: { isActive: true } }),
    prisma.company.count({
      where: {
        isActive: true,
        createdAt: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
        }
      }
    }),
    prisma.company.count({
      where: {
        isActive: true,
        contacts: {
          some: {
            isActive: true,
            status: { in: ['LEAD', 'PROSPECT', 'CUSTOMER'] }
          }
        }
      }
    })
  ])

  return {
    companies,
    newThisMonth,
    active: activeCompanies
  }
}

async function getTaskManagerData() {
  const [total, completed, overdue] = await Promise.all([
    prisma.activity.count({
      where: {
        type: 'TASK'
      }
    }),
    prisma.activity.count({
      where: {
        type: 'TASK',
        status: 'COMPLETED'
      }
    }),
    prisma.activity.count({
      where: {
        type: 'TASK',
        status: 'PENDING',
        dueDate: {
          lt: new Date()
        }
      }
    })
  ])

  return {
    total,
    completed,
    overdue
  }
}

async function getChatWidgetData() {
  // This would integrate with live chat service
  return {
    activeChats: 0,
    waiting: 0,
    avgResponse: '0min'
  }
}

async function getPerformanceMetricsData() {
  const teamGoal = 85 // This would come from settings
  const current = 78 // This would be calculated from actual performance data
  
  return {
    teamGoal,
    current,
    topPerformer: 'Sarah Johnson', // This would be calculated from actual data
    teamSize: 8
  }
}

async function getCalendarIntegrationData() {
  // This would check actual calendar integration status
  return {
    synced: false,
    events: 0
  }
}

async function getLeadScoringData() {
  const [hotLeads, warmLeads, coldLeads] = await Promise.all([
    prisma.contact.count({
      where: {
        isActive: true,
        status: 'LEAD',
        customData: {
          path: ['score'],
          gte: 80
        }
      }
    }),
    prisma.contact.count({
      where: {
        isActive: true,
        status: 'LEAD',
        customData: {
          path: ['score'],
          gte: 50,
          lt: 80
        }
      }
    }),
    prisma.contact.count({
      where: {
        isActive: true,
        status: 'LEAD',
        customData: {
          path: ['score'],
          lt: 50
        }
      }
    })
  ])

  return {
    hotLeads,
    warmLeads,
    coldLeads,
    avgScore: 65
  }
}

async function getSalesForecastData() {
  const [forecastAmount, confidence, dealsInPipeline] = await Promise.all([
    prisma.deal.aggregate({
      where: {
        isActive: true,
        stage: { not: 'CLOSED_LOST' }
      },
      _sum: { value: true }
    }),
    prisma.deal.aggregate({
      where: {
        isActive: true,
        stage: { not: 'CLOSED_LOST' }
      },
      _avg: { probability: true }
    }),
    prisma.deal.count({
      where: {
        isActive: true,
        stage: { not: 'CLOSED_LOST' }
      }
    })
  ])

  return {
    forecastAmount: Number(forecastAmount._sum.value || 0),
    confidence: Math.round(Number(confidence._avg.probability || 0)),
    dealsInPipeline
  }
}

async function getCustomerSatisfactionData() {
  // This would integrate with survey/feedback systems
  return {
    npsScore: 0,
    csatScore: 0,
    responseRate: 0,
    totalResponses: 0
  }
}

async function getRevenueAnalyticsData() {
  const [monthlyRevenue, quarterlyRevenue, yearlyRevenue] = await Promise.all([
    prisma.deal.aggregate({
      where: {
        isActive: true,
        stage: 'CLOSED_WON',
        updatedAt: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
        }
      },
      _sum: { value: true }
    }),
    prisma.deal.aggregate({
      where: {
        isActive: true,
        stage: 'CLOSED_WON',
        updatedAt: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth() - 3, 1)
        }
      },
      _sum: { value: true }
    }),
    prisma.deal.aggregate({
      where: {
        isActive: true,
        stage: 'CLOSED_WON',
        updatedAt: {
          gte: new Date(new Date().getFullYear(), 0, 1)
        }
      },
      _sum: { value: true }
    })
  ])

  return {
    monthlyRevenue: Number(monthlyRevenue._sum.value || 0),
    quarterlyRevenue: Number(quarterlyRevenue._sum.value || 0),
    yearlyRevenue: Number(yearlyRevenue._sum.value || 0)
  }
}

async function getTeamProductivityData() {
  const [totalActivities, completedActivities, avgCompletionTime] = await Promise.all([
    prisma.activity.count({
      where: {
        createdAt: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
        }
      }
    }),
    prisma.activity.count({
      where: {
        status: 'COMPLETED',
        createdAt: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
        }
      }
    }),
    // This would be calculated from actual completion times
    2.5
  ])

  const completionRate = totalActivities > 0 ? (completedActivities / totalActivities) * 100 : 0

  return {
    totalActivities,
    completedActivities,
    completionRate: Math.round(completionRate),
    avgCompletionTime
  }
}

async function getIntegrationStatusData() {
  // This would check actual integration statuses
  return {
    emailIntegration: false,
    calendarIntegration: false,
    phoneIntegration: false,
    chatIntegration: false
  }
}

async function getAutomationRulesData() {
  // This would get actual automation rules
  return {
    activeRules: 0,
    triggeredToday: 0,
    successRate: 0
  }
}

async function getDataQualityData() {
  const [totalContacts, contactsWithEmail, contactsWithPhone, duplicateContacts] = await Promise.all([
    prisma.contact.count({ where: { isActive: true } }),
    prisma.contact.count({
      where: {
        isActive: true,
        email: { not: null }
      }
    }),
    prisma.contact.count({
      where: {
        isActive: true,
        phone: { not: null }
      }
    }),
    // This would check for actual duplicates
    0
  ])

  const emailCompleteness = totalContacts > 0 ? (contactsWithEmail / totalContacts) * 100 : 0
  const phoneCompleteness = totalContacts > 0 ? (contactsWithPhone / totalContacts) * 100 : 0

  return {
    emailCompleteness: Math.round(emailCompleteness),
    phoneCompleteness: Math.round(phoneCompleteness),
    duplicateContacts,
    overallScore: Math.round((emailCompleteness + phoneCompleteness) / 2)
  }
}

async function getComplianceMonitorData() {
  // This would check compliance rules and violations
  return {
    gdprCompliant: true,
    dataRetentionCompliant: true,
    consentTracking: true,
    violations: 0
  }
}

// Tool management functions

async function updateToolDashboard(toolId: string, onDashboard: boolean) {
  try {
    await prisma.toolSettings.upsert({
      where: { toolId },
      update: { onDashboard },
      create: { toolId, enabled: true, onDashboard, settings: {} }
    })
    console.log(`Updated tool ${toolId} dashboard status to ${onDashboard}`)
  } catch (error) {
    console.error(`Error updating dashboard for tool ${toolId}:`, error)
    throw error
  }
}

async function updateToolSettings(toolId: string, settings: any) {
  try {
    await prisma.toolSettings.upsert({
      where: { toolId },
      update: { settings },
      create: { toolId, enabled: true, onDashboard: false, settings }
    })
    console.log(`Updated tool ${toolId} settings:`, settings)
  } catch (error) {
    console.error(`Error updating settings for tool ${toolId}:`, error)
    throw error
  }
}

async function createUserTool(data: any) {
  try {
    const userTool = await prisma.userTool.create({
      data: {
        name: data.name,
        description: data.description,
        category: data.category,
        icon: data.icon,
        size: data.size,
        settings: data.settings || {},
        enabled: data.enabled || false,
        onDashboard: data.onDashboard || false
      }
    })
    console.log('Created user tool:', userTool)
    return userTool
  } catch (error) {
    console.error('Error creating user tool:', error)
    throw error
  }
}

// Get user tool settings
async function getUserToolSettings() {
  try {
    const settings = await prisma.toolSettings.findMany()
    const userTools = await prisma.userTool.findMany()
    
    return {
      settings: settings.reduce((acc, setting) => {
        acc[setting.toolId] = setting
        return acc
      }, {} as Record<string, any>),
      userTools
    }
  } catch (error) {
    console.error('Error fetching user tool settings:', error)
    return { settings: {}, userTools: [] }
  }
}

// Get dashboard tools only
async function getDashboardTools() {
  try {
    const dashboardSettings = await prisma.toolSettings.findMany({
      where: { onDashboard: true }
    })
    
    const dashboardUserTools = await prisma.userTool.findMany({
      where: { onDashboard: true }
    })
    
    return {
      systemTools: dashboardSettings,
      userTools: dashboardUserTools
    }
  } catch (error) {
    console.error('Error fetching dashboard tools:', error)
    return { systemTools: [], userTools: [] }
  }
}
