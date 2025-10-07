import { NextRequest, NextResponse } from 'next/server'
import { register } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, password, firstName, lastName, tenantName, industry } = await request.json()

    if (!email || !password || !firstName || !lastName || !tenantName || !industry) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    const result = await register(email, password, firstName, lastName, tenantName, industry)

    if (result.error) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      )
    }

    return NextResponse.json({
      user: result.user,
      token: result.token
    })
  } catch (error) {
    console.error('Registration API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
