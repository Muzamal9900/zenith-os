/**
 * CRM Module Handlers - API handlers for the CRM module
 * These handlers are called by the API Gateway when CRM routes are accessed
 */

import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class CRMHandlers {
  /**
   * Get all contacts
   */
  static async getContacts(request: NextRequest): Promise<NextResponse> {
    try {
      const { searchParams } = new URL(request.url)
      const page = parseInt(searchParams.get('page') || '1')
      const limit = parseInt(searchParams.get('limit') || '10')
      const search = searchParams.get('search') || ''
      const status = searchParams.get('status') || ''

      const skip = (page - 1) * limit

      const where: any = {
        isActive: true
      }

      if (search) {
        where.OR = [
          { firstName: { contains: search, mode: 'insensitive' } },
          { lastName: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } }
        ]
      }

      if (status) {
        where.status = status
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

  /**
   * Create new contact
   */
  static async createContact(request: NextRequest): Promise<NextResponse> {
    try {
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
          companyId,
          assignedUserId
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

  /**
   * Get specific contact
   */
  static async getContact(request: NextRequest, params: { id: string }): Promise<NextResponse> {
    try {
      const contact = await prisma.contact.findFirst({
        where: {
          id: params.id,
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

  /**
   * Update contact
   */
  static async updateContact(request: NextRequest, params: { id: string }): Promise<NextResponse> {
    try {
      const updates = await request.json()

      const contact = await prisma.contact.update({
        where: { id: params.id },
        data: {
          ...updates,
          updatedAt: new Date()
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

      return NextResponse.json(contact)
    } catch (error) {
      console.error('Update contact error:', error)
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      )
    }
  }

  /**
   * Delete contact
   */
  static async deleteContact(request: NextRequest, params: { id: string }): Promise<NextResponse> {
    try {
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

  /**
   * Get all companies
   */
  static async getCompanies(request: NextRequest): Promise<NextResponse> {
    try {
      const { searchParams } = new URL(request.url)
      const page = parseInt(searchParams.get('page') || '1')
      const limit = parseInt(searchParams.get('limit') || '10')
      const search = searchParams.get('search') || ''
      const industry = searchParams.get('industry') || ''

      const skip = (page - 1) * limit

      const where: any = {
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

  /**
   * Create new company
   */
  static async createCompany(request: NextRequest): Promise<NextResponse> {
    try {
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
          customData: customData || {}
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

  /**
   * Get specific company
   */
  static async getCompany(request: NextRequest, params: { id: string }): Promise<NextResponse> {
    try {
      const company = await prisma.company.findFirst({
        where: {
          id: params.id,
          isActive: true
        },
        include: {
          contacts: {
            where: { isActive: true },
            include: {
              assignedUser: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true
                }
              }
            }
          },
          deals: {
            where: { isActive: true },
            include: {
              contact: true,
              assignedUser: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true
                }
              }
            }
          }
        }
      })

      if (!company) {
        return NextResponse.json({ error: 'Company not found' }, { status: 404 })
      }

      return NextResponse.json(company)
    } catch (error) {
      console.error('Get company error:', error)
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      )
    }
  }

  /**
   * Update company
   */
  static async updateCompany(request: NextRequest, params: { id: string }): Promise<NextResponse> {
    try {
      const updates = await request.json()

      const company = await prisma.company.update({
        where: { id: params.id },
        data: {
          ...updates,
          updatedAt: new Date()
        }
      })

      return NextResponse.json(company)
    } catch (error) {
      console.error('Update company error:', error)
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      )
    }
  }

  /**
   * Delete company
   */
  static async deleteCompany(request: NextRequest, params: { id: string }): Promise<NextResponse> {
    try {
      await prisma.company.update({
        where: { id: params.id },
        data: { isActive: false }
      })

      return NextResponse.json({ message: 'Company deleted successfully' })
    } catch (error) {
      console.error('Delete company error:', error)
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      )
    }
  }

  /**
   * Get dashboard statistics
   */
  static async getDashboardStats(request: NextRequest): Promise<NextResponse> {
    try {
      const [
        totalContacts,
        totalCompanies,
        totalDeals,
        totalActivities,
        recentContacts,
        recentDeals,
        dealStages,
        contactSources
      ] = await Promise.all([
        prisma.contact.count({ where: { isActive: true } }),
        prisma.company.count({ where: { isActive: true } }),
        prisma.deal.count({ where: { isActive: true } }),
        prisma.activity.count({ where: { isActive: true } }),
        prisma.contact.findMany({
          where: { isActive: true },
          orderBy: { createdAt: 'desc' },
          take: 5,
          include: {
            company: true
          }
        }),
        prisma.deal.findMany({
          where: { isActive: true },
          orderBy: { createdAt: 'desc' },
          take: 5,
          include: {
            contact: true,
            company: true
          }
        }),
        prisma.deal.groupBy({
          by: ['stage'],
          where: { isActive: true },
          _count: { stage: true }
        }),
        prisma.contact.groupBy({
          by: ['source'],
          where: { isActive: true, source: { not: null } },
          _count: { source: true }
        })
      ])

      return NextResponse.json({
        overview: {
          totalContacts,
          totalCompanies,
          totalDeals,
          totalActivities
        },
        recent: {
          contacts: recentContacts,
          deals: recentDeals
        },
        analytics: {
          dealStages,
          contactSources
        }
      })
    } catch (error) {
      console.error('Get dashboard stats error:', error)
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      )
    }
  }
}
