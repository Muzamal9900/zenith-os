import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { requireAuth } from '@/lib/auth'

const prisma = new PrismaClient()

// GET /api/deals - Get all deals for tenant
export async function GET(request: NextRequest) {
  try {
    const { user, error } = await requireAuth('USER')(request)
    
    if (error || !user) {
      return NextResponse.json({ error: error || 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''
    const stage = searchParams.get('stage') || ''
    const industry = searchParams.get('industry') || ''

    const skip = (page - 1) * limit

    const where: any = {
      tenantId: user.tenantId,
      isActive: true
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { contact: { firstName: { contains: search, mode: 'insensitive' } } },
        { contact: { lastName: { contains: search, mode: 'insensitive' } } },
        { company: { name: { contains: search, mode: 'insensitive' } } }
      ]
    }

    if (stage) {
      where.stage = stage
    }

    if (industry) {
      where.company = {
        industry: industry
      }
    }

    const [deals, total] = await Promise.all([
      prisma.deal.findMany({
        where,
        include: {
          contact: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              phone: true
            }
          },
          company: true,
          assignedUser: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true
            }
          },
          _count: {
            select: {
              activities: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit
      }),
      prisma.deal.count({ where })
    ])

    return NextResponse.json({
      deals,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Get deals error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/deals - Create new deal
export async function POST(request: NextRequest) {
  try {
    const { user, error } = await requireAuth('USER')(request)
    
    if (error || !user) {
      return NextResponse.json({ error: error || 'Unauthorized' }, { status: 401 })
    }

    const {
      title,
      description,
      value,
      stage,
      probability,
      closeDate,
      source,
      tags,
      contactId,
      companyId,
      assignedUserId,
      customData
    } = await request.json()

    if (!title || !value) {
      return NextResponse.json(
        { error: 'Title and value are required' },
        { status: 400 }
      )
    }

    const deal = await prisma.deal.create({
      data: {
        title,
        description,
        value: parseFloat(value),
        stage: stage || 'Qualification',
        probability: parseInt(probability) || 0,
        closeDate: closeDate ? new Date(closeDate) : null,
        source,
        tags: tags || [],
        customData: customData || {},
        tenantId: user.tenantId,
        contactId,
        companyId,
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
        company: true,
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

    return NextResponse.json(deal, { status: 201 })
  } catch (error) {
    console.error('Create deal error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
