"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { ChatbotProvider } from "@/contexts/chatbot-context"
import PageTransition from "./page-transition"
import Chatbot from "./chatbot"
import { 
  Users, TrendingUp, Activity, Settings, BarChart3, 
  Database, Globe, Shield, Zap, Palette, Monitor,
  Bell, User, LogOut, Menu, X, ChevronDown,
  Home, Building2, Target, FileText, Calendar,
  Phone, Mail, DollarSign, PieChart, LineChart,
  Cpu, Layers, Box, Code, HardDrive, Network
} from "lucide-react"

interface PortalLayoutProps {
  children: React.ReactNode
}

export default function PortalLayout({ children }: PortalLayoutProps) {
  const { user, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('overview')
  const [expandedMenus, setExpandedMenus] = useState<string[]>([])

  // Auto-expand CRM menu if on CRM pages
  useEffect(() => {
    if (pathname.startsWith('/portal/crm')) {
      setActiveSection('crm')
      if (!expandedMenus.includes('crm')) {
        setExpandedMenus(prev => [...prev, 'crm'])
      }
    } else if (pathname === '/portal') {
      setActiveSection('overview')
    } else if (pathname.startsWith('/portal/website')) {
      setActiveSection('website')
    } else if (pathname.startsWith('/portal/analytics')) {
      setActiveSection('analytics')
    } else if (pathname.startsWith('/portal/customize')) {
      setActiveSection('customize')
    } else if (pathname.startsWith('/portal/integrations')) {
      setActiveSection('integrations')
    } else if (pathname.startsWith('/portal/settings')) {
      setActiveSection('settings')
    }
  }, [pathname, expandedMenus])

  const mainModules = [
    {
      id: 'overview',
      name: 'Overview',
      icon: Home,
      href: '/portal'
    },
    {
      id: 'website',
      name: 'Website',
      icon: Globe,
      href: '/portal/website'
    },
    {
      id: 'crm',
      name: 'CRM',
      icon: Users,
      href: '/portal/crm',
      submenu: [
        { name: 'Overview', href: '/portal/crm' },
        { name: 'Contacts', href: '/portal/crm/contacts' },
        { name: 'Deals', href: '/portal/crm/deals' },
        { name: 'Activities', href: '/portal/crm/activities' },
        { name: 'Companies', href: '/portal/crm/companies' },
        { name: 'Reports', href: '/portal/crm/reports' }
      ]
    },
    {
      id: 'analytics',
      name: 'Analytics',
      icon: BarChart3,
      href: '/portal/analytics'
    }
  ]

  const systemModules = [
    {
      id: 'customize',
      name: 'Customize',
      icon: Palette,
      href: '/portal/customize'
    },
    {
      id: 'integrations',
      name: 'Integrations',
      icon: Network,
      href: '/portal/integrations'
    },
    {
      id: 'settings',
      name: 'Settings',
      icon: Settings,
      href: '/portal/settings'
    }
  ]

  const handleLogout = () => {
    logout()
  }

  const toggleMenu = (menuId: string) => {
    setExpandedMenus(prev => 
      prev.includes(menuId) 
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    )
  }

  const handleNavigation = (href: string, menuId: string) => {
    router.push(href)
    setActiveSection(menuId)
    setSidebarOpen(false) // Close mobile sidebar after navigation
  }

  return (
    <ChatbotProvider>
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
                <Cpu className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Zenith</h1>
                <p className="text-xs text-gray-500">Business Platform</p>
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
          <nav className="flex-1 px-4 py-6 space-y-8">
            {/* Main Modules */}
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Main Modules
              </h3>
              <div className="space-y-1">
                {mainModules.map((item) => {
                  const Icon = item.icon
                  const isExpanded = expandedMenus.includes(item.id)
                  const hasSubmenu = item.submenu && item.submenu.length > 0
                  
                  return (
                    <div key={item.id}>
                      <div
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                          activeSection === item.id
                            ? 'bg-purple-100 text-purple-700'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                        onClick={() => {
                          if (hasSubmenu) {
                            toggleMenu(item.id)
                          } else {
                            handleNavigation(item.href, item.id)
                          }
                        }}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="flex-1">{item.name}</span>
                        {hasSubmenu && (
                          <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                        )}
                      </div>
                      
                      {hasSubmenu && isExpanded && (
                        <div className="ml-6 mt-1 space-y-1">
                          {item.submenu.map((subItem, index) => (
                            <button
                              key={index}
                              onClick={() => handleNavigation(subItem.href, item.id)}
                              className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                            >
                              {subItem.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* System Modules */}
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                System
              </h3>
              <div className="space-y-1">
                {systemModules.map((item) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavigation(item.href, item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left ${
                        activeSection === item.id
                          ? 'bg-purple-100 text-purple-700'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {item.name}
                    </button>
                  )
                })}
              </div>
            </div>
          </nav>

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
                  {mainModules.find(item => item.id === activeSection)?.name || 'Portal'}
                </h2>
                <p className="text-sm text-gray-500 capitalize">
                  {user?.tenant.industry} • {user?.tenant.name}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1 bg-green-100 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-700 font-medium">System Ready</span>
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

      {/* AI Chatbot */}
      <Chatbot />
      </div>
    </ChatbotProvider>
  )
}
