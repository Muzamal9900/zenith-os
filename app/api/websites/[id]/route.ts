import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getUserFromRequest } from "@/lib/auth"

// GET /api/websites/[id] - Get a specific website
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getUserFromRequest(request)
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const website = await prisma.website.findFirst({
      where: { 
        id: params.id,
        tenantId: user.tenantId 
      }
    })

    if (!website) {
      return NextResponse.json({ error: "Website not found" }, { status: 404 })
    }

    return NextResponse.json(website)
  } catch (error) {
    console.error("Error fetching website:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// PUT /api/websites/[id] - Update a website
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getUserFromRequest(request)
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { url, title, description } = body

    // Check if website exists and belongs to user's tenant
    const existingWebsite = await prisma.website.findFirst({
      where: { 
        id: params.id,
        tenantId: user.tenantId 
      }
    })

    if (!existingWebsite) {
      return NextResponse.json({ error: "Website not found" }, { status: 404 })
    }

    // Validate URL if provided
    if (url) {
      try {
        new URL(url)
      } catch {
        return NextResponse.json({ error: "Invalid URL format" }, { status: 400 })
      }

      // Check if URL is already used by another website
      const duplicateWebsite = await prisma.website.findFirst({
        where: { 
          tenantId: user.tenantId,
          url: url,
          id: { not: params.id }
        }
      })

      if (duplicateWebsite) {
        return NextResponse.json({ error: "URL already exists" }, { status: 409 })
      }
    }

    // Update website
    const updatedWebsite = await prisma.website.update({
      where: { id: params.id },
      data: {
        ...(url && { url }),
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(url && { status: "CONNECTED" })
      }
    })

    return NextResponse.json(updatedWebsite)
  } catch (error) {
    console.error("Error updating website:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// DELETE /api/websites/[id] - Delete a website
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getUserFromRequest(request)
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if website exists and belongs to user's tenant
    const website = await prisma.website.findFirst({
      where: { 
        id: params.id,
        tenantId: user.tenantId 
      }
    })

    if (!website) {
      return NextResponse.json({ error: "Website not found" }, { status: 404 })
    }

    // Delete website
    await prisma.website.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: "Website deleted successfully" })
  } catch (error) {
    console.error("Error deleting website:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

