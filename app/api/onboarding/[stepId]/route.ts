import { NextRequest, NextResponse } from "next/server"
import { getUserFromRequest } from "@/lib/auth"
import { OnboardingHandler, OnboardingLifecycle } from "@/modules/onboarding"
import { OnboardingStepId } from "@/modules/onboarding/types"

export async function PUT(
  request: NextRequest,
  { params }: { params: { stepId: string } }
) {
  try {
    const user = await getUserFromRequest(request)
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const stepId = params.stepId as OnboardingStepId
    const body = await request.json()

    // Validate step ID
    const validStepIds = ['signup', 'configuration', 'tool-selection', 'billing-plan']
    if (!validStepIds.includes(stepId)) {
      return NextResponse.json({ error: "Invalid step ID" }, { status: 400 })
    }

    // Update the step and trigger lifecycle actions
    const updatedState = await OnboardingLifecycle.onStepComplete(
      user.tenantId,
      stepId,
      body
    )

    return NextResponse.json(updatedState)
  } catch (error) {
    console.error("Error updating onboarding step:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { stepId: string } }
) {
  try {
    const user = await getUserFromRequest(request)
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const stepId = params.stepId as OnboardingStepId
    const onboardingState = await OnboardingHandler.getOnboardingState(user.tenantId)
    
    if (!onboardingState) {
      return NextResponse.json({ error: "Onboarding state not found" }, { status: 404 })
    }

    const step = onboardingState.steps.find(s => s.id === stepId)
    if (!step) {
      return NextResponse.json({ error: "Step not found" }, { status: 404 })
    }

    return NextResponse.json(step)
  } catch (error) {
    console.error("Error fetching onboarding step:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
