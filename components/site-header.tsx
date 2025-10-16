"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { User, LogOut, Database } from "lucide-react"

export default function SiteHeader() {
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-lg shadow-black/5">
      <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/85 to-white/90" />
      <nav className="container mx-auto max-w-7xl px-6 h-16 flex items-center justify-between relative z-10">
        <Link href="/" className="flex items-center gap-3 group" aria-label="Zenith by Unite Group">
          <div className="w-8 h-8 rounded-xl gradient-navy-purple shadow-lg shadow-indigo-500/25 group-hover:shadow-xl group-hover:shadow-indigo-500/40 transition-all duration-300 group-hover:scale-105" />
          <span className="text-sm md:text-base font-semibold tracking-tight text-gray-800 group-hover:text-indigo-700 transition-colors duration-300">Zenith by Unite Group</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {user ? (
            // Authenticated navigation
            <>
              <Link href="/portal" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-all duration-300 hover:scale-105 relative group">
                Portal
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="/maf" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-all duration-300 hover:scale-105 relative group">
                MAF System
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="/portal/analytics" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-all duration-300 hover:scale-105 relative group">
                Analytics
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="/performance" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-all duration-300 hover:scale-105 relative group">
                Performance
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </>
          ) : (
            // Public navigation
            <>
              <Link href="/pricing" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-all duration-300 hover:scale-105 relative group">
                Pricing
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-all duration-300 hover:scale-105 relative group">
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="/contact" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-all duration-300 hover:scale-105 relative group">
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            // Authenticated user menu
            <div className="flex items-center gap-3">
             <Link href="/portal">
              <Button 
                variant="outline" 
                className="text-sm font-semibold rounded-xl border-2 border-indigo-200/60 bg-white/80 backdrop-blur-sm text-indigo-700 hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-800 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-indigo-100/50 px-6 py-2.5"
              >
                Portal
              </Button>
             </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50/80 backdrop-blur-sm rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-md hover:shadow-gray-100/50 border border-gray-200/60 hover:border-gray-300/60"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline font-medium">Logout</span>
              </button>
            </div>
          ) : (
            // Public user actions
            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button 
                  variant="outline" 
                  className="text-sm font-semibold rounded-xl border-2 border-gray-200/60 bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gray-100/50 px-6 py-2.5"
                >
                  Login
                </Button>
              </Link>
              <Link href="/demo">
                <Button 
                  className="text-sm font-semibold rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-200/50 px-6 py-2.5 border-0"
                >
                  Request Demo
                </Button>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}
