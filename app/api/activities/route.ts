import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { requireAuth } from '@/lib/auth'

const prisma = new PrismaClient()

// GET /api/activities - Get all activities for tenant
export async function GET(request: NextRequest) {
  try {
    const { user, error } = await requireAuth('USER')(request)
    
    if (error || !user) {
      return NextResponse.json({ error: error || 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const type = searchParams.get('type') || ''
    const status = searchParams.get('status') || ''
    const contactId = searchParams.get('contactId') || ''
    const dealId = searchParams.get('dealId') || ''

    const skip = (page - 1) * limit

    const where: any = {
      tenantId: user.tenantId
    }

    if (type) {
      where.type = type
    }

    if (status) {
      where.status = status
    }

    if (contactId) {
      where.contactId = contactId
    }

    if (dealId) {
      where.dealId = dealId
    }

    const [activities, total] = await Promise.all([
      prisma.activity.findMany({
        where,
        include: {
          contact: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true
            }
          },
          deal: {
            select: {
              id: true,
              title: true,
              value: true
            }
          },
          assignedUser: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit
      }),
      prisma.activity.count({ where })
    ])

    return NextResponse.json({
      activities,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Get activities error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/activities - Create new activity
export async function POST(request: NextRequest) {
  try {
    const { user, error } = await requireAuth('USER')(request)
    
    if (error || !user) {
      return NextResponse.json({ error: error || 'Unauthorized' }, { status: 401 })
    }

    const {
      type,
      title,
      description,
      dueDate,
      priority,
      contactId,
      dealId,
      assignedUserId,
      customData
    } = await request.json()

    if (!type || !title) {
      return NextResponse.json(
        { error: 'Type and title are required' },
        { status: 400 }
      )
    }

    const activity = await prisma.activity.create({
      data: {
        type,
        title,
        description,
        dueDate: dueDate ? new Date(dueDate) : null,
        priority: priority || 'MEDIUM',
        customData: customData || {},
        tenantId: user.tenantId,
        contactId,
        dealId,
        assignedUserId: assignedUserId || user.id
      },
      include: {
        contact: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        },
        deal: {
          select: {
            id: true,
            title: true,
            value: true
          }
        },
        assignedUser: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        }
      }
    })

    return NextResponse.json(activity, { status: 201 })
  } catch (error) {
    console.error('Create activity error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
