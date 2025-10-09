import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const {
      companyName,
      tagline,
      industry,
      brandVoice,
      brandPersonality,
      brandGuidelines,
      primaryColor,
      secondaryColor,
      accentColor,
      fontFamily
    } = body

    // Validate required fields
    if (!companyName) {
      return NextResponse.json(
        { success: false, error: 'Company name is required' },
        { status: 400 }
      )
    }

    // Check if OpenAI API key is available
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { success: false, error: 'OpenAI API key not configured' },
        { status: 500 }
      )
    }

    // Create comprehensive prompt for brand guidelines
    const prompt = `You are a professional brand strategist and marketing expert. Create comprehensive brand guidelines for "${companyName}" based on the following brand details:

Company Information:
- Company Name: ${companyName}
- Tagline: ${tagline || 'Not specified'}
- Industry: ${industry || 'Not specified'}

Brand Identity:
- Brand Voice: ${brandVoice || 'Not specified'}
- Brand Personality: ${brandPersonality || 'Not specified'}
- Existing Brand Guidelines: ${brandGuidelines || 'None provided'}

Visual Identity:
- Primary Color: ${primaryColor}
- Secondary Color: ${secondaryColor}
- Accent Color: ${accentColor}
- Font Family: ${fontFamily}

Please create comprehensive brand guidelines that include:

1. BRAND OVERVIEW
   - Brand mission and vision
   - Brand positioning
   - Target audience definition

2. BRAND VOICE & TONE
   - Detailed voice guidelines
   - Tone variations for different contexts
   - Do's and don'ts for communication

3. VISUAL IDENTITY GUIDELINES
   - Color usage guidelines
   - Typography guidelines
   - Logo usage rules
   - Spacing and layout principles

4. BRAND PERSONALITY APPLICATION
   - How to embody the brand personality
   - Personality traits in action
   - Consistency guidelines

5. INDUSTRY-SPECIFIC GUIDELINES
   - Industry best practices
   - Competitive positioning
   - Market-specific considerations

6. IMPLEMENTATION GUIDELINES
   - Brand consistency rules
   - Quality standards
   - Approval processes

Make the guidelines professional, actionable, and specific to this company. Use clear headings and bullet points for easy reading. Focus on practical implementation rather than theoretical concepts.`

    // Generate brand guidelines using OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a professional brand strategist with expertise in creating comprehensive brand guidelines. You provide clear, actionable, and professional brand guidance that helps companies maintain consistent brand identity across all touchpoints."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 2000,
      temperature: 0.7,
    })

    const guidelines = completion.choices[0]?.message?.content

    if (!guidelines) {
      throw new Error('Failed to generate guidelines')
    }

    return NextResponse.json({
      success: true,
      guidelines: guidelines,
      message: 'Brand guidelines generated successfully'
    })

  } catch (error) {
    console.error('Error generating brand guidelines:', error)
    
    // Handle specific OpenAI errors
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return NextResponse.json(
          { success: false, error: 'OpenAI API key is invalid or missing' },
          { status: 500 }
        )
      }
      if (error.message.includes('rate limit')) {
        return NextResponse.json(
          { success: false, error: 'Rate limit exceeded. Please try again later.' },
          { status: 429 }
        )
      }
    }

    return NextResponse.json(
      { success: false, error: 'Failed to generate brand guidelines. Please try again.' },
      { status: 500 }
    )
  }
}
