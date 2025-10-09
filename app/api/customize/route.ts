import { NextRequest, NextResponse } from 'next/server'

// Mock database - in production, this would be a real database
let customizeSettings = {
  branding: {
    companyName: "Your Company",
    tagline: "",
    logo: "",
    primaryColor: "#8b5cf6",
    secondaryColor: "#06b6d4",
    accentColor: "#10b981",
    fontFamily: "Inter",
    brandPersonality: "",
    brandVoice: "",
    brandGuidelines: "",
    industry: ""
  },
  industry: {
    type: "restoration",
    businessType: "Water Damage Restoration",
    targetMarket: "Property owners and insurance companies",
    customFields: []
  },
  modules: {
    website: true,
    crm: true,
    analytics: true,
    ecommerce: false,
    blog: false,
    support: false
  },
  integrations: {
    googleAnalytics: {enabled: false, trackingId: ""},
    mailchimp: {enabled: false, apiKey: ""},
    stripe: {enabled: false, publishableKey: ""},
    slack: {enabled: false, webhookUrl: ""}
  },
  theme: {
    mode: "light",
    sidebarStyle: "default",
    headerStyle: "default"
  }
}

// Color validation function
const validateAndNormalizeColor = (color: string): string => {
  if (!color) return "#000000"
  
  // Remove any whitespace
  color = color.trim()
  
  // If it's a valid hex color, return it
  if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color)) {
    return color.toUpperCase()
  }
  
  // If it's a 3-digit hex, convert to 6-digit
  if (/^#([A-Fa-f0-9]{3})$/.test(color)) {
    const hex = color.slice(1)
    return `#${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`.toUpperCase()
  }
  
  // If it's not a valid hex, return the original value
  return color
}

// Normalize settings data
const normalizeSettings = (settings: any) => {
  if (settings.branding) {
    // Normalize color values
    if (settings.branding.primaryColor) {
      settings.branding.primaryColor = validateAndNormalizeColor(settings.branding.primaryColor)
    }
    if (settings.branding.secondaryColor) {
      settings.branding.secondaryColor = validateAndNormalizeColor(settings.branding.secondaryColor)
    }
    if (settings.branding.accentColor) {
      settings.branding.accentColor = validateAndNormalizeColor(settings.branding.accentColor)
    }
  }
  return settings
}

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: customizeSettings
    })
  } catch (error) {
    console.error('Error fetching customize settings:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch settings' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.branding) {
      return NextResponse.json(
        { success: false, error: 'Branding settings are required' },
        { status: 400 }
      )
    }

    // Normalize the settings
    const normalizedSettings = normalizeSettings(body)
    
    // Update the settings
    customizeSettings = {
      ...customizeSettings,
      ...normalizedSettings
    }

    // In production, save to database here
    console.log('Settings saved:', customizeSettings)

    return NextResponse.json({
      success: true,
      data: customizeSettings,
      message: 'Settings saved successfully'
    })
  } catch (error) {
    console.error('Error saving customize settings:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to save settings' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Normalize the settings
    const normalizedSettings = normalizeSettings(body)
    
    // Update the settings
    customizeSettings = {
      ...customizeSettings,
      ...normalizedSettings
    }

    // In production, update in database here
    console.log('Settings updated:', customizeSettings)

    return NextResponse.json({
      success: true,
      data: customizeSettings,
      message: 'Settings updated successfully'
    })
  } catch (error) {
    console.error('Error updating customize settings:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update settings' },
      { status: 500 }
    )
  }
}
