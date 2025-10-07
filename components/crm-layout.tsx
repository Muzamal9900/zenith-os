"use client"

import { useAuth } from "@/contexts/auth-context"
import {
  Activity,
  BarChart3,
  Building2,
  Database,
  FileText,
  Globe,
  Home,
  LogOut, Menu,
  Monitor,
  Settings,
  TrendingUp,
  User,
  Users,
  X
} from "lucide-react"
import { useState } from "react"
import PageTransition from "./page-transition"

interface CRMLayoutProps {
  children: React.ReactNode
}

export default function CRMLayout({ children }: CRMLayoutProps) {
  const { user, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('dashboard')

  const navigationItems = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      icon: Home,
      href: '/crm'
    },
    {
      id: 'contacts',
      name: 'Contacts',
      icon: Users,
      href: '/crm/contacts'
    },
    {
      id: 'deals',
      name: 'Deals',
      icon: TrendingUp,
      href: '/crm/deals'
    },
    {
      id: 'activities',
      name: 'Activities',
      icon: Activity,
      href: '/crm/activities'
    },
    {
      id: 'companies',
      name: 'Companies',
      icon: Building2,
      href: '/crm/companies'
    },
    {
      id: 'reports',
      name: 'Reports',
      icon: BarChart3,
      href: '/crm/reports'
    }
  ]

  const systemItems = [
    {
      id: 'templates',
      name: 'Templates',
      icon: FileText,
      href: '/crm/templates'
    },
    {
      id: 'portal',
      name: 'Portal',
      icon: Globe,
      href: '/portal'
    },
    {
      id: 'performance',
      name: 'Performance',
      icon: Monitor,
      href: '/performance'
    },
    // {
    //   id: 'reports',
    //   name: 'Reports',
    //   icon: BarChart3,
    //   href: '/crm/reports'
    // },
    {
      id: 'settings',
      name: 'Settings',
      icon: Settings,
      href: '/crm/settings'
    }
  ]

  const handleLogout = () => {
    logout()
    // No need to redirect, the auth context will handle it
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <Database className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Zenith CRM</h1>
                <p className="text-xs text-gray-500">{user?.tenant.name}</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto">
            <nav className="p-4 space-y-1">
              {/* Main Navigation */}
              <div className="mb-6">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Main
                </h3>
                <div className="space-y-1">
                  {navigationItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <a
                        key={item.id}
                        href={item.href}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          activeSection === item.id
                            ? 'bg-purple-100 text-purple-700'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                        onClick={() => setActiveSection(item.id)}
                      >
                        <Icon className="w-5 h-5" />
                        {item.name}
                      </a>
                    )
                  })}
                </div>
              </div>

              {/* System Navigation */}
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  System
                </h3>
                <div className="space-y-1">
                  {systemItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <a
                        key={item.id}
                        href={item.href}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          activeSection === item.id
                            ? 'bg-purple-100 text-purple-700'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                        onClick={() => setActiveSection(item.id)}
                      >
                        <Icon className="w-5 h-5" />
                        {item.name}
                      </a>
                    )
                  })}
                </div>
              </div>
            </nav>
          </div>

          {/* User Profile */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user?.email}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Header - Sticky */}
        <header className="sticky top-0 z-30 bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 text-gray-400 hover:text-gray-600"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {navigationItems.find(item => item.id === activeSection)?.name || 'Dashboard'}
                </h2>
                <p className="text-sm text-gray-500">
                  {user?.tenant.industry} • {user?.tenant.name}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <div className="max-w-8xl mx-auto">
            <PageTransition>
              {children}
            </PageTransition>
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
