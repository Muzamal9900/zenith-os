"use client"

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'

interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
  isTyping?: boolean
}

interface ChatbotContextType {
  isOpen: boolean
  isMinimized: boolean
  messages: Message[]
  isLoading: boolean
  error: string | null
  setIsOpen: (open: boolean) => void
  setIsMinimized: (minimized: boolean) => void
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void
  clearMessages: () => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  sendMessage: (content: string) => Promise<void>
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined)

export function ChatbotProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm Liza, your business assistant. Can I assist you today?",
      role: 'assistant',
      timestamp: new Date()
    }
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const addMessage = useCallback((message: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date()
    }
    setMessages(prev => [...prev, newMessage])
  }, [])

  const clearMessages = useCallback(() => {
    setMessages([
      {
        id: '1',
        content: "Hello! I'm Liza, your business assistant. Can I assist you today?",
        role: 'assistant',
        timestamp: new Date()
      }
    ])
    setError(null)
  }, [])

  const setLoading = useCallback((loading: boolean) => {
    setIsLoading(loading)
  }, [])

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      role: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: content.trim(),
          conversationHistory: messages.slice(-10) // Send last 10 messages for context
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response from AI')
      }

      const data = await response.json()
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        role: 'assistant',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (err) {
      setError('Sorry, I encountered an error. Please try again.')
      console.error('Chatbot error:', err)
    } finally {
      setIsLoading(false)
    }
  }, [messages, isLoading])

  const value: ChatbotContextType = {
    isOpen,
    isMinimized,
    messages,
    isLoading,
    error,
    setIsOpen,
    setIsMinimized,
    addMessage,
    clearMessages,
    setLoading,
    setError,
    sendMessage
  }

  return (
    <ChatbotContext.Provider value={value}>
      {children}
    </ChatbotContext.Provider>
  )
}

export function useChatbot() {
  const context = useContext(ChatbotContext)
  if (context === undefined) {
    throw new Error('useChatbot must be used within a ChatbotProvider')
  }
  return context
}
