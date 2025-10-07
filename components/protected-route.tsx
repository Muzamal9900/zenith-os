"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { Database, Loader2 } from 'lucide-react'

interface ProtectedRouteProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export default function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [hasChecked, setHasChecked] = useState(false)

  useEffect(() => {
    // Only check authentication once on mount
    if (!isLoading && !hasChecked) {
      if (!user) {
        // Redirect to login if not authenticated
        router.push('/login')
      } else {
        setHasChecked(true)
      }
    }
  }, [user, isLoading, router, hasChecked])

  if (user && hasChecked) {
    return <>{children}</>
  }

  // If no user and we've checked, return null (will redirect)
  return null
}
