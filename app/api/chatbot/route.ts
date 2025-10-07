import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory } = await request.json()

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { 
          response: "I'm sorry, but the AI assistant is not properly configured. Please contact your administrator to set up the OpenAI API key." 
        },
        { status: 200 }
      )
    }

    // Build conversation context
    const messages = [
      {
        role: 'system',
        content: `You are Liza, a conversion-focused SaaS business assistant for Zenith OS, a comprehensive business platform. Your primary goal is to help users understand the value and drive them toward trial signup or demo booking.

**Your Role**: Act as a SaaS expert who understands business growth, conversion optimization, and customer success. You're here to:
1. Identify user pain points and business challenges
2. Show how Zenith OS solves their specific problems
3. Guide users toward high-value features and benefits
4. Drive conversions through trial signups, demos, and feature exploration

**PLATFORM CAPABILITIES:**
- **CRM Management**: Contact management, deal tracking, company profiles, activity logging
- **Analytics & Reporting**: Business insights, performance metrics, data visualization  
- **Website Management**: Customization, branding, content management
- **Portal Features**: User management, integrations, settings

**RESPONSE STYLE (Like ChatGPT/Gemini):**
- Always end responses with a follow-up question to keep the conversation flowing
- Ask questions like: "Would you like me to show you how this works?" or "What's your biggest business challenge right now?"
- Be conversational and engaging
- Make users feel heard and understood

**CONVERSION STRATEGY:**
- Always focus on business outcomes and ROI
- Ask qualifying questions to understand their business size and needs
- Highlight specific features that solve their pain points
- Use social proof and success stories when relevant
- Guide toward trial signup or demo booking
- Emphasize time-saving and revenue-generating benefits

**Tone**: Professional, enthusiastic about business growth, solution-oriented, and conversion-focused. Always tie features back to business value. Keep responses concise but compelling. Always end with a question to engage the user.`
      }
    ]

    // Add conversation history for context
    if (conversationHistory && conversationHistory.length > 0) {
      conversationHistory.forEach((msg: any) => {
        messages.push({
          role: msg.role === 'user' ? 'user' : 'assistant',
          content: msg.content
        })
      })
    }

    // Add current message
    messages.push({
      role: 'user',
      content: message
    })

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages as any,
      max_tokens: 500,
      temperature: 0.7,
      presence_penalty: 0.1,
      frequency_penalty: 0.1,
    })

    const response = completion.choices[0]?.message?.content || 'I apologize, but I could not generate a response.'

    return NextResponse.json({ response })

  } catch (error) {
    console.error('OpenAI API error:', error)
    
    // Handle specific OpenAI errors
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return NextResponse.json(
          { 
            response: "I'm sorry, but there's an issue with the AI service configuration. Please contact your administrator." 
          },
          { status: 200 }
        )
      }
      
      if (error.message.includes('rate limit')) {
        return NextResponse.json(
          { 
            response: "I'm experiencing high demand right now. Please try again in a moment." 
          },
          { status: 200 }
        )
      }
    }

    return NextResponse.json(
      { 
        response: "I apologize, but I'm having trouble processing your request right now. Please try again later." 
      },
      { status: 200 }
    )
  }
}
