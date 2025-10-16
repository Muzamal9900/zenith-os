/**
 * CRM Module API - Routes requests to the CRM module handlers
 * This demonstrates how modules integrate with the core API Gateway
 */

import { NextRequest, NextResponse } from 'next/server'
import { CRMHandlers } from '../../../../modules/crm/handlers'

// GET /api/modules/crm - Get CRM module data (contacts, companies, etc.)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || 'contacts'

    switch (type) {
      case 'contacts':
        return await CRMHandlers.getContacts(request)
      case 'companies':
        return await CRMHandlers.getCompanies(request)
      case 'dashboard':
        return await CRMHandlers.getDashboardStats(request)
      default:
        return NextResponse.json(
          { error: 'Invalid type parameter' },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error('CRM module API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/modules/crm - Create new CRM data
export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || 'contacts'

    switch (type) {
      case 'contacts':
        return await CRMHandlers.createContact(request)
      case 'companies':
        return await CRMHandlers.createCompany(request)
      default:
        return NextResponse.json(
          { error: 'Invalid type parameter' },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error('CRM module API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
