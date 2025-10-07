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
    <header className="fixed top-0 inset-x-0 z-50 bg-white/70 backdrop-blur-md border-b border-gray-200">
      <nav className="container mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2" aria-label="Zenith by Unite Group">
          <div className="w-7 h-7 rounded-md gradient-navy-purple" />
          <span className="text-sm md:text-base font-semibold tracking-tight">Zenith by Unite Group</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {user ? (
            // Authenticated navigation
            <>
              <Link href="/portal" className="text-sm text-gray-700 hover:text-gray-900 transition-colors">
                Portal
              </Link>
              <Link href="/portal/crm" className="text-sm text-gray-700 hover:text-gray-900 transition-colors">
                CRM
              </Link>
              <Link href="/portal/analytics" className="text-sm text-gray-700 hover:text-gray-900 transition-colors">
                Analytics
              </Link>
              <Link href="/performance" className="text-sm text-gray-700 hover:text-gray-900 transition-colors">
                Performance
              </Link>
            </>
          ) : (
            // Public navigation
            <>
              <Link href="/pricing" className="text-sm text-gray-700 hover:text-gray-900 transition-colors">
                Pricing
              </Link>
              <Link href="/about" className="text-sm text-gray-700 hover:text-gray-900 transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-sm text-gray-700 hover:text-gray-900 transition-colors">
                Contact
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          {user ? (
            // Authenticated user menu
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="hidden sm:block">
                  <div className="font-medium">{user.firstName} {user.lastName}</div>
                  <div className="text-xs text-gray-500">{user.tenant.name}</div>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            // Public user actions
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="outline" className="text-sm font-semibold rounded-md">
                  Login
                </Button>
              </Link>
              <Link href="/demo">
                <Button className="gradient-purple-magenta text-white text-sm font-semibold rounded-md">
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
