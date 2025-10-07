import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { requireAuth } from '@/lib/auth'

const prisma = new PrismaClient()

// GET /api/contacts - Get all contacts for tenant
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
    const status = searchParams.get('status') || ''
    const industry = searchParams.get('industry') || ''

    const skip = (page - 1) * limit

    const where: any = {
      tenantId: user.tenantId,
      isActive: true
    }

    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { company: { name: { contains: search, mode: 'insensitive' } } }
      ]
    }

    if (status) {
      where.status = status
    }

    if (industry) {
      where.company = {
        industry: industry
      }
    }

    const [contacts, total] = await Promise.all([
      prisma.contact.findMany({
        where,
        include: {
          company: true,
          assignedUser: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true
            }
          },
          customFields: {
            include: {
              customField: true
            }
          },
          _count: {
            select: {
              deals: true,
              activities: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit
      }),
      prisma.contact.count({ where })
    ])

    return NextResponse.json({
      contacts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Get contacts error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/contacts - Create new contact
export async function POST(request: NextRequest) {
  try {
    const { user, error } = await requireAuth('USER')(request)
    
    if (error || !user) {
      return NextResponse.json({ error: error || 'Unauthorized' }, { status: 401 })
    }

    const {
      firstName,
      lastName,
      email,
      phone,
      title,
      status,
      source,
      tags,
      companyId,
      assignedUserId,
      customData,
      notes
    } = await request.json()

    if (!firstName || !lastName) {
      return NextResponse.json(
        { error: 'First name and last name are required' },
        { status: 400 }
      )
    }

    const contact = await prisma.contact.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        title,
        status: status || 'LEAD',
        source,
        tags: tags || [],
        customData: customData || {},
        notes,
        tenantId: user.tenantId,
        companyId,
        assignedUserId: assignedUserId || user.id
      },
      include: {
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

    return NextResponse.json(contact, { status: 201 })
  } catch (error) {
    console.error('Create contact error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
