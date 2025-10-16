import { NextRequest, NextResponse } from "next/server"
import { getUserFromRequest } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request)
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get enabled tools for the tenant
    const tenantTools = await prisma.tenantTool.findMany({
      where: {
        tenantId: user.tenantId,
        isEnabled: true
      },
      select: {
        toolId: true,
        configuration: true,
        createdAt: true
      }
    })

    return NextResponse.json({
      tools: tenantTools.map(tool => ({
        id: tool.toolId,
        configuration: tool.configuration,
        enabledAt: tool.createdAt
      }))
    })
  } catch (error) {
    console.error("Error fetching tenant tools:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
