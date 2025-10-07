import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { requireAuth } from '@/lib/auth'

const prisma = new PrismaClient()

// GET /api/dashboard/stats - Get dashboard statistics
export async function GET(request: NextRequest) {
  try {
    const { user, error } = await requireAuth('USER')(request)
    
    if (error || !user) {
      return NextResponse.json({ error: error || 'Unauthorized' }, { status: 401 })
    }

    const tenantId = user.tenantId

    // Get current month and last month dates
    const now = new Date()
    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1)
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0)

    // Get basic counts
    const [
      totalContacts,
      totalDeals,
      activeDeals,
      wonDeals,
      lostDeals,
      thisMonthRevenue,
      lastMonthRevenue
    ] = await Promise.all([
      // Total contacts
      prisma.contact.count({
        where: { tenantId, isActive: true }
      }),
      
      // Total deals
      prisma.deal.count({
        where: { tenantId, isActive: true }
      }),
      
      // Active deals (not closed)
      prisma.deal.count({
        where: {
          tenantId,
          isActive: true,
          stage: {
            notIn: ['Closed Won', 'Closed Lost']
          }
        }
      }),
      
      // Won deals
      prisma.deal.count({
        where: {
          tenantId,
          isActive: true,
          stage: 'Closed Won'
        }
      }),
      
      // Lost deals
      prisma.deal.count({
        where: {
          tenantId,
          isActive: true,
          stage: 'Closed Lost'
        }
      }),
      
      // This month revenue
      prisma.deal.aggregate({
        where: {
          tenantId,
          isActive: true,
          stage: 'Closed Won',
          createdAt: {
            gte: currentMonthStart
          }
        },
        _sum: { value: true }
      }),
      
      // Last month revenue
      prisma.deal.aggregate({
        where: {
          tenantId,
          isActive: true,
          stage: 'Closed Won',
          createdAt: {
            gte: lastMonthStart,
            lte: lastMonthEnd
          }
        },
        _sum: { value: true }
      })
    ])

    // Calculate pipeline value (active deals)
    const pipelineResult = await prisma.deal.aggregate({
      where: {
        tenantId,
        isActive: true,
        stage: {
          notIn: ['Closed Won', 'Closed Lost']
        }
      },
      _sum: { value: true }
    })

    // Calculate average deal size
    const averageDealResult = await prisma.deal.aggregate({
      where: {
        tenantId,
        isActive: true,
        stage: 'Closed Won'
      },
      _avg: { value: true }
    })

    // Calculate conversion rate
    const totalClosedDeals = wonDeals + lostDeals
    const conversionRate = totalClosedDeals > 0 ? (wonDeals / totalClosedDeals) * 100 : 0

    // Calculate revenue growth
    const thisMonthRev = thisMonthRevenue._sum.value || 0
    const lastMonthRev = lastMonthRevenue._sum.value || 0
    const revenueGrowth = lastMonthRev > 0 ? ((thisMonthRev - lastMonthRev) / lastMonthRev) * 100 : 0

    const stats = {
      totalContacts,
      totalDeals,
      totalValue: thisMonthRev,
      wonDeals,
      lostDeals,
      activeDeals,
      thisMonthRevenue: thisMonthRev,
      lastMonthRevenue: lastMonthRev,
      revenueGrowth: Math.round(revenueGrowth * 100) / 100,
      conversionRate: Math.round(conversionRate * 100) / 100,
      averageDealSize: Math.round((averageDealResult._avg.value || 0) * 100) / 100,
      pipelineValue: Math.round((pipelineResult._sum.value || 0) * 100) / 100
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Get dashboard stats error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
