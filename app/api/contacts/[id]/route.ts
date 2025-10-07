import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { requireAuth } from '@/lib/auth'

const prisma = new PrismaClient()

// GET /api/contacts/[id] - Get specific contact
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { user, error } = await requireAuth('USER')(request)
    
    if (error || !user) {
      return NextResponse.json({ error: error || 'Unauthorized' }, { status: 401 })
    }

    const contact = await prisma.contact.findFirst({
      where: {
        id: params.id,
        tenantId: user.tenantId,
        isActive: true
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
        },
        customFields: {
          include: {
            customField: true
          }
        },
        deals: {
          include: {
            company: true
          }
        },
        activities: {
          include: {
            assignedUser: {
              select: {
                id: true,
                firstName: true,
                lastName: true
              }
            }
          },
          orderBy: { createdAt: 'desc' }
        }
      }
    })

    if (!contact) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 })
    }

    return NextResponse.json(contact)
  } catch (error) {
    console.error('Get contact error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT /api/contacts/[id] - Update contact
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const contact = await prisma.contact.findFirst({
      where: {
        id: params.id,
        tenantId: user.tenantId,
        isActive: true
      }
    })

    if (!contact) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 })
    }

    const updatedContact = await prisma.contact.update({
      where: { id: params.id },
      data: {
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
        },
        customFields: {
          include: {
            customField: true
          }
        }
      }
    })

    return NextResponse.json(updatedContact)
  } catch (error) {
    console.error('Update contact error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/contacts/[id] - Soft delete contact
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { user, error } = await requireAuth('MANAGER')(request)
    
    if (error || !user) {
      return NextResponse.json({ error: error || 'Unauthorized' }, { status: 401 })
    }

    const contact = await prisma.contact.findFirst({
      where: {
        id: params.id,
        tenantId: user.tenantId,
        isActive: true
      }
    })

    if (!contact) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 })
    }

    await prisma.contact.update({
      where: { id: params.id },
      data: { isActive: false }
    })

    return NextResponse.json({ message: 'Contact deleted successfully' })
  } catch (error) {
    console.error('Delete contact error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
