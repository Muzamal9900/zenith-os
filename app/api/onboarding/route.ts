import { NextRequest, NextResponse } from "next/server"
import { getUserFromRequest } from "@/lib/auth"
import { OnboardingHandler } from "@/modules/onboarding"

export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request)
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const onboardingState = await OnboardingHandler.getOnboardingState(user.tenantId)
    
    if (!onboardingState) {
      // Initialize onboarding if it doesn't exist
      const newState = await OnboardingHandler.initializeOnboarding(user.tenantId)
      return NextResponse.json(newState)
    }

    return NextResponse.json(onboardingState)
  } catch (error) {
    console.error("Error fetching onboarding state:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request)
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { action } = body

    switch (action) {
      case 'initialize':
        const newState = await OnboardingHandler.initializeOnboarding(user.tenantId)
        return NextResponse.json(newState)
      
      case 'reset':
        const resetState = await OnboardingHandler.resetOnboarding(user.tenantId)
        return NextResponse.json(resetState)
      
      case 'complete':
        const completedState = await OnboardingHandler.completeOnboarding(user.tenantId)
        return NextResponse.json(completedState)
      
      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }
  } catch (error) {
    console.error("Error processing onboarding action:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
