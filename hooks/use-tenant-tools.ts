import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/auth-context'

export interface TenantTool {
  id: string
  configuration: Record<string, any>
  enabledAt: string
}

export interface TenantToolsResponse {
  tools: TenantTool[]
}

export function useTenantTools() {
  const [tools, setTools] = useState<TenantTool[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { token } = useAuth()

  const fetchTools = async () => {
    if (!token) return

    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('/api/tenant/tools', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch tools')
      }

      const data: TenantToolsResponse = await response.json()
      setTools(data.tools)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      console.error('Error fetching tenant tools:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTools()
  }, [token])

  return {
    tools,
    loading,
    error,
    refetch: fetchTools
  }
}
