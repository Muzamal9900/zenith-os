"use client"

import { ReactNode } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Cpu, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

interface OnboardingLayoutProps {
  children: ReactNode
  currentStep?: number
  totalSteps?: number
  onLogout?: () => void
  sidebar?: ReactNode
}

export default function OnboardingLayout({ 
  children, 
  currentStep = 1, 
  totalSteps = 4,
  onLogout,
  sidebar
}: OnboardingLayoutProps) {
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    onLogout?.()
  }

  const progressPercentage = (currentStep / totalSteps) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 flex">
      {/* Background Pattern */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(120,119,198,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(59,130,246,0.08),transparent_50%)]" />
        
        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px'
          }} />
        </div>
      </div>

      {/* Sidebar */}
      {sidebar && (
        <div className="relative z-10 flex-shrink-0">
          {sidebar}
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-20 bg-gray-900/80 backdrop-blur-xl border-b border-gray-700/50 shadow-lg shadow-black/20">
          <div className="px-6 h-16 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 shadow-lg shadow-indigo-500/25" />
              <div>
                <h1 className="text-lg font-semibold text-white">Zenith by Unite Group</h1>
                <p className="text-xs text-gray-400">White Label OS Setup</p>
              </div>
            </div>

            {/* User Info & Logout */}
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-white">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-gray-400">{user?.tenant?.name}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center gap-2 text-gray-300 hover:text-white border-gray-600 hover:border-gray-500 bg-gray-800/50 hover:bg-gray-700/50"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 relative z-10 py-8">
          <div className="px-6">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="relative z-10 bg-gray-900/60 backdrop-blur-sm border-t border-gray-700/50">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4" />
                <span>Powered by Zenith OS</span>
              </div>
              <div className="flex items-center gap-4">
                <span>Step {currentStep} of {totalSteps}</span>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalSteps }, (_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                        i < currentStep 
                          ? 'bg-indigo-500' 
                          : i === currentStep - 1 
                          ? 'bg-purple-500' 
                          : 'bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
