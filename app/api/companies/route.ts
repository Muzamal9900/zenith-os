import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { requireAuth } from '@/lib/auth'

const prisma = new PrismaClient()

// GET /api/companies - Get all companies for tenant
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
    const industry = searchParams.get('industry') || ''

    const skip = (page - 1) * limit

    const where: any = {
      tenantId: user.tenantId,
      isActive: true
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { website: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ]
    }

    if (industry) {
      where.industry = industry
    }

    const [companies, total] = await Promise.all([
      prisma.company.findMany({
        where,
        include: {
          _count: {
            select: {
              contacts: true,
              deals: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit
      }),
      prisma.company.count({ where })
    ])

    return NextResponse.json({
      companies,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Get companies error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/companies - Create new company
export async function POST(request: NextRequest) {
  try {
    const { user, error } = await requireAuth('USER')(request)
    
    if (error || !user) {
      return NextResponse.json({ error: error || 'Unauthorized' }, { status: 401 })
    }

    const {
      name,
      website,
      industry,
      size,
      description,
      logo,
      address,
      customData
    } = await request.json()

    if (!name) {
      return NextResponse.json(
        { error: 'Company name is required' },
        { status: 400 }
      )
    }

    const company = await prisma.company.create({
      data: {
        name,
        website,
        industry,
        size,
        description,
        logo,
        address: address || {},
        customData: customData || {},
        tenantId: user.tenantId
      }
    })

    return NextResponse.json(company, { status: 201 })
  } catch (error) {
    console.error('Create company error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
