"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useChatbot } from "@/contexts/chatbot-context"
import { cn } from "@/lib/utils"
import {
  AlertCircle,
  Bot,
  Check,
  ChevronDown,
  Copy,
  Loader2,
  Maximize2,
  MessageCircle,
  Minimize2,
  Send,
  Sparkles,
  Trash2,
  User,
  X
} from "lucide-react"
import { useEffect, useRef, useState } from "react"

interface ChatbotProps {
  className?: string
}

export default function Chatbot({ className }: ChatbotProps) {
  const {
    isOpen,
    isMinimized,
    messages,
    isLoading,
    error,
    setIsOpen,
    setIsMinimized,
    clearMessages,
    sendMessage
  } = useChatbot()
  
  const [input, setInput] = useState("")
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null)
  const [showScrollButton, setShowScrollButton] = useState(false)
  const [feedbackGiven, setFeedbackGiven] = useState<Set<string>>(new Set())
  const [userFeedbackHistory, setUserFeedbackHistory] = useState<Map<string, string>>(new Map())
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ 
          behavior: "smooth",
          block: "end",
          inline: "nearest"
        })
      }
      setShowScrollButton(false)
    }, 150)
  }

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget
    const isAtBottom = Math.abs(scrollHeight - scrollTop - clientHeight) < 5
    setShowScrollButton(!isAtBottom)
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isLoading) {
      scrollToBottom()
    }
  }, [isLoading])

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return

    const messageContent = input.trim()
    setInput("")
    await sendMessage(messageContent)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const clearConversation = () => {
    clearMessages()
    setFeedbackGiven(new Set())
    setUserFeedbackHistory(new Map())
  }

  const handleFeedback = (messageId: string, feedbackType: 'helpful' | 'explain' | 'another' | 'pricing' | 'features' | 'setup' | 'trial') => {
    setFeedbackGiven(prev => new Set(prev).add(messageId))
    setUserFeedbackHistory(prev => new Map(prev).set(messageId, feedbackType))
    
    let userQuestion = ""
    switch (feedbackType) {
      case 'helpful':
        userQuestion = "This was helpful! Can you show me more about your platform features?"
        break
      case 'explain':
        userQuestion = "Can you explain this in more detail?"
        break
      case 'another':
        userQuestion = "I have another question about your platform"
        break
      case 'pricing':
        userQuestion = "What are your pricing options?"
        break
      case 'features':
        userQuestion = "What features do you offer?"
        break
      case 'setup':
        userQuestion = "How can I get started?"
        break
      case 'trial':
        userQuestion = "I'd like to start a free trial"
        break
    }
    
    if (userQuestion) {
      // Send as user message, not assistant response
      sendMessage(userQuestion)
    }
  }

  const copyMessage = async (content: string, messageId: string) => {
    try {
      await navigator.clipboard.writeText(content)
      setCopiedMessageId(messageId)
      setTimeout(() => setCopiedMessageId(null), 2000)
    } catch (err) {
      console.error('Failed to copy message:', err)
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const getContextualButtons = (messageId: string, messageContent: string) => {
    // Don't show buttons for the first welcome message
    if (messageId === '1') return []
    
    // Don't show buttons if user has already given feedback on this message
    if (feedbackGiven.has(messageId)) return []
    
    const content = messageContent.toLowerCase()
    
    // Context-aware buttons based on the response content
    if (content.includes('crm') || content.includes('contact') || content.includes('deal')) {
      return [
        { type: 'helpful', label: '👍 Yes, this helps', emoji: '👍' },
        { type: 'explain', label: '🤔 Explain CRM features more', emoji: '🤔' },
        { type: 'another', label: '❓ Ask about something else', emoji: '❓' }
      ]
    }
    
    if (content.includes('analytics') || content.includes('report') || content.includes('data')) {
      return [
        { type: 'helpful', label: '👍 Yes, this helps', emoji: '👍' },
        { type: 'explain', label: '🤔 Explain analytics more', emoji: '🤔' },
        { type: 'another', label: '❓ Ask about something else', emoji: '❓' }
      ]
    }
    
    if (content.includes('website') || content.includes('customize') || content.includes('brand')) {
      return [
        { type: 'helpful', label: '👍 Yes, this helps', emoji: '👍' },
        { type: 'explain', label: '🤔 Explain customization more', emoji: '🤔' },
        { type: 'another', label: '❓ Ask about something else', emoji: '❓' }
      ]
    }
    
    if (content.includes('pricing') || content.includes('cost') || content.includes('plan')) {
      return [
        { type: 'helpful', label: '👍 Yes, this helps', emoji: '👍' },
        { type: 'explain', label: '🤔 Explain pricing more', emoji: '🤔' },
        { type: 'another', label: '❓ Ask about something else', emoji: '❓' }
      ]
    }
    
    if (content.includes('trial') || content.includes('demo') || content.includes('start')) {
      return [
        { type: 'helpful', label: '👍 Yes, this helps', emoji: '👍' },
        { type: 'explain', label: '🤔 Explain getting started more', emoji: '🤔' },
        { type: 'another', label: '❓ Ask about something else', emoji: '❓' }
      ]
    }
    
    // Default buttons for general responses
    return [
      { type: 'helpful', label: '👍 Yes, this helps', emoji: '👍' },
      { type: 'explain', label: '🤔 Explain more', emoji: '🤔' },
      { type: 'another', label: '❓ Ask about something else', emoji: '❓' }
    ]
  }

  const renderMarkdown = (text: string) => {
    return text
      // Bold text **text** -> <strong>text</strong>
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Italic text *text* -> <em>text</em>
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Code blocks `code` -> <code>code</code>
      .replace(/`(.*?)`/g, '<code class="bg-gray-200 px-1 py-0.5 rounded text-xs">$1</code>')
      // Line breaks
      .replace(/\n/g, '<br>')
      // Bullet points - item -> <li>item</li>
      .replace(/^\- (.*$)/gm, '<li class="ml-4">$1</li>')
      // Numbered lists 1. item -> <li>item</li>
      .replace(/^\d+\. (.*$)/gm, '<li class="ml-4">$1</li>')
      // Wrap consecutive <li> elements in <ul>
      .replace(/(<li[^>]*>.*<\/li>)/g, (match) => {
        if (match.includes('<ul>')) return match
        return `<ul class="list-disc list-inside space-y-1">${match}</ul>`
      })
      // Headers ## Header -> <h3>Header</h3>
      .replace(/^## (.*$)/gm, '<h3 class="font-semibold text-base mt-2 mb-1">$1</h3>')
      // Headers ### Header -> <h4>Header</h4>
      .replace(/^### (.*$)/gm, '<h4 class="font-medium text-sm mt-2 mb-1">$1</h4>')
  }

  return (
    <div className={cn("fixed bottom-4 right-4 z-50", className)}>
      {!isOpen ? (
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      ) : (
        <Card className={cn(
          "w-96 h-[600px] shadow-2xl border-0 bg-white",
          isMinimized && "h-16"
        )}>
          <CardHeader className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <span className="text-white font-bold text-lg">L</span>
                </div>
                <div>
                  <CardTitle className="text-lg font-semibold text-white">Liza</CardTitle>
                  <p className="text-sm text-white/80">Business Assistant</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-white/80 hover:text-white hover:bg-white/20"
                >
                  {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white hover:bg-white/20"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          {!isMinimized && (
            <>
              <CardContent className="p-0 flex flex-col h-[500px] relative">
                <ScrollArea 
                  className="flex-1 p-4" 
                  style={{ maxHeight: '400px' }}
                  onScrollCapture={handleScroll}
                >
                  <div className="space-y-4">
                    {/* Predefined Questions */}
                    {messages.length === 1 && (
                      <div className="mb-6">
                        <h4 className="text-sm font-medium text-gray-700 mb-3">Quick Questions:</h4>
                        <div className="grid grid-cols-1 gap-2">
                          {[
                            "What is this portal for?",
                            "How do I manage contacts in CRM?",
                            "How to create a new deal?",
                            "What analytics are available?",
                            "How to customize my website?",
                            "What integrations are supported?"
                          ].map((question, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              onClick={async () => {
                                await sendMessage(question)
                              }}
                              className="justify-start text-left h-auto p-3 text-xs"
                            >
                              {question}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}

                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={cn(
                          "flex gap-3",
                          message.role === 'user' ? 'justify-end' : 'justify-start'
                        )}
                      >
                        {message.role === 'assistant' && (
                          <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <Bot className="h-4 w-4 text-blue-600" />
                          </div>
                        )}
                        
                        <div className={cn(
                          "max-w-[80%] rounded-2xl px-4 py-3 relative group",
                          message.role === 'user' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-100 text-gray-900'
                        )}>
                          <div className="flex items-start justify-between gap-2">
                            <div 
                              className="text-sm max-w-none"
                              dangerouslySetInnerHTML={{ 
                                __html: renderMarkdown(message.content)
                              }}
                            />
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyMessage(message.content, message.id)}
                                className="h-6 w-6 p-0 hover:bg-white/20"
                              >
                                {copiedMessageId === message.id ? (
                                  <Check className="h-3 w-3" />
                                ) : (
                                  <Copy className="h-3 w-3" />
                                )}
                              </Button>
                            </div>
                          </div>
                          <div className="text-xs opacity-70 mt-1">
                            {formatTime(message.timestamp)}
                          </div>
                          
                          {/* Contextual Feedback Buttons for Assistant Messages */}
                          {message.role === 'assistant' && !feedbackGiven.has(message.id) && getContextualButtons(message.id, message.content).length > 0 && (
                            <div className="mt-3 space-y-2">
                              <p className="text-xs text-gray-500">
                                Is this response helpful or do you need more explanation?
                              </p>
                              <div className="flex flex-col gap-2">
                                {getContextualButtons(message.id, message.content).map((button, index) => (
                                  <Button
                                    key={index}
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleFeedback(message.id, button.type as any)}
                                    className="justify-start text-xs h-8 w-full"
                                  >
                                    {button.label}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {message.role === 'user' && (
                          <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-gray-600" />
                          </div>
                        )}
                      </div>
                    ))}

                    {isLoading && (
                      <div className="flex gap-3 justify-start">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Bot className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="bg-gray-100 rounded-2xl px-4 py-3">
                          <div className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span className="text-sm text-gray-600">Liza is thinking...</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {error && (
                      <div className="flex gap-3 justify-start">
                        <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                          <AlertCircle className="h-4 w-4 text-red-600" />
                        </div>
                        <div className="bg-red-50 border border-red-200 rounded-2xl px-4 py-3">
                          <p className="text-sm text-red-600">{error}</p>
                        </div>
                      </div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                {/* Scroll to Bottom Button */}
                {showScrollButton && (
                  <Button
                    onClick={scrollToBottom}
                    className="absolute bottom-20 right-4 h-8 w-8 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg z-10"
                    size="sm"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                )}

                <div className="border-t p-4">
                  <div className="flex gap-2">
                    <Input
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      disabled={isLoading}
                      className="flex-1"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!input.trim() || isLoading}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        <Sparkles className="h-3 w-3 mr-1" />
                        Smart Assistant
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearConversation}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      New Chat
                    </Button>
                  </div>
                </div>
              </CardContent>
            </>
          )}
        </Card>
      )}
    </div>
  )
}
