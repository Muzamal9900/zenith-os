"use client"

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

interface PageTransitionProps {
  children: React.ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [displayChildren, setDisplayChildren] = useState(children)
  const pathname = usePathname()

  useEffect(() => {
    // Start transition
    setIsLoading(true)
    
    // Small delay to ensure smooth transition
    const timer = setTimeout(() => {
      setDisplayChildren(children)
      setIsLoading(false)
    }, 150)

    return () => clearTimeout(timer)
  }, [pathname, children])

  return (
    <div className={`transition-all duration-300 ease-in-out ${
      isLoading ? 'opacity-0 transform translate-y-2' : 'opacity-100 transform translate-y-0'
    }`}>
      {displayChildren}
    </div>
  )
}
