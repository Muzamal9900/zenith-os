import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getUserFromRequest } from "@/lib/auth"

// GET /api/websites - Get all websites for the current tenant
export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request)
    
    if (!user) {
      return NextResponse.json([])
    }

    const websites = await prisma.website.findMany({
      where: { tenantId: user.tenantId },
      orderBy: { createdAt: "desc" }
    })

    return NextResponse.json(websites)
  } catch (error) {
    console.error("Error fetching websites:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// POST /api/websites - Create a new website
export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request)
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { url, title, description } = body

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 })
    }

    // Validate URL format
    try {
      new URL(url)
    } catch {
      return NextResponse.json({ error: "Invalid URL format" }, { status: 400 })
    }

    // Check if website already exists for this tenant
    const existingWebsite = await prisma.website.findFirst({
      where: { 
        tenantId: user.tenantId,
        url: url
      }
    })

    if (existingWebsite) {
      return NextResponse.json({ error: "Website already exists" }, { status: 409 })
    }

    // Create website
    const website = await prisma.website.create({
      data: {
        url,
        title: title || null,
        description: description || null,
        status: "CONNECTED",
        tenantId: user.tenantId
      }
    })

    return NextResponse.json(website, { status: 201 })
  } catch (error) {
    console.error("Error creating website:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

