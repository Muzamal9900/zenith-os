/**
 * MAF Dashboard - Main dashboard for the Modular Application Framework
 * This component demonstrates the new architecture in action
 */

'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Settings, 
  Puzzle, 
  Activity, 
  Users, 
  Building2, 
  BarChart3,
  Play,
  Pause,
  Trash2,
  Download,
  Upload
} from "lucide-react"

interface Module {
  id: string
  name: string
  version: string
  description: string
  author: string
  category: string
  status: 'installed' | 'active' | 'inactive' | 'error'
  installedAt: string
  activatedAt?: string
  lastUpdated: string
  error?: string
  dependencies: any[]
  routes: number
  components: number
  apis: number
  permissions: number
}

interface SystemInfo {
  system: {
    name: string
    version: string
    environment: string
    status: string
  }
  modules: {
    total: number
    active: number
    list: Module[]
  }
  timestamp: string
}

export default function MAFDashboard() {
  const [systemInfo, setSystemInfo] = useState<SystemInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadSystemInfo()
  }, [])

  const loadSystemInfo = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/core')
      if (!response.ok) {
        throw new Error('Failed to load system information')
      }
      const data = await response.json()
      setSystemInfo(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  const handleModuleAction = async (moduleId: string, action: string) => {
    try {
      const response = await fetch(`/api/core/modules/${moduleId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action })
      })

      if (!response.ok) {
        throw new Error(`Failed to ${action} module`)
      }

      // Reload system info
      await loadSystemInfo()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-yellow-100 text-yellow-800'
      case 'error': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'crm': return <Users className="h-4 w-4" />
      case 'website': return <Building2 className="h-4 w-4" />
      case 'analytics': return <BarChart3 className="h-4 w-4" />
      default: return <Puzzle className="h-4 w-4" />
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 mb-4">{error}</p>
        <Button onClick={loadSystemInfo}>Retry</Button>
      </div>
    )
  }

  if (!systemInfo) {
    return <div>No system information available</div>
  }

  return (
    <div className="space-y-6">
      {/* System Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            System Overview
          </CardTitle>
          <CardDescription>
            Zenith OS Modular Application Framework
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{systemInfo.system.name}</div>
              <div className="text-sm text-gray-600">System Name</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{systemInfo.system.version}</div>
              <div className="text-sm text-gray-600">Version</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold capitalize">{systemInfo.system.environment}</div>
              <div className="text-sm text-gray-600">Environment</div>
            </div>
            <div className="text-center">
              <Badge className={getStatusColor(systemInfo.system.status)}>
                {systemInfo.system.status}
              </Badge>
              <div className="text-sm text-gray-600 mt-1">Status</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Module Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Puzzle className="h-4 w-4 text-muted-foreground" />
              <div className="ml-2">
                <p className="text-sm font-medium leading-none">Total Modules</p>
                <p className="text-2xl font-bold">{systemInfo.modules.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Activity className="h-4 w-4 text-muted-foreground" />
              <div className="ml-2">
                <p className="text-sm font-medium leading-none">Active Modules</p>
                <p className="text-2xl font-bold">{systemInfo.modules.active}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Settings className="h-4 w-4 text-muted-foreground" />
              <div className="ml-2">
                <p className="text-sm font-medium leading-none">System Status</p>
                <p className="text-2xl font-bold capitalize">{systemInfo.system.status}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modules Management */}
      <Card>
        <CardHeader>
          <CardTitle>Module Management</CardTitle>
          <CardDescription>
            Manage your installed modules and their status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All ({systemInfo.modules.total})</TabsTrigger>
              <TabsTrigger value="active">Active ({systemInfo.modules.active})</TabsTrigger>
              <TabsTrigger value="inactive">Inactive</TabsTrigger>
              <TabsTrigger value="error">Errors</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              {systemInfo.modules.list.map((module) => (
                <Card key={module.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {getCategoryIcon(module.category)}
                        <div>
                          <h3 className="font-semibold">{module.name}</h3>
                          <p className="text-sm text-gray-600">{module.description}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="outline">v{module.version}</Badge>
                            <Badge className={getStatusColor(module.status)}>
                              {module.status}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              {module.routes} routes, {module.components} components
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {module.status === 'active' ? (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleModuleAction(module.id, 'deactivate')}
                          >
                            <Pause className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleModuleAction(module.id, 'activate')}
                          >
                            <Play className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleModuleAction(module.id, 'uninstall')}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    {module.error && (
                      <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-600">
                        Error: {module.error}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* System Actions */}
      <Card>
        <CardHeader>
          <CardTitle>System Actions</CardTitle>
          <CardDescription>
            Manage the core system and modules
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Button onClick={loadSystemInfo}>
              <Activity className="h-4 w-4 mr-2" />
              Refresh Status
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Config
            </Button>
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Import Module
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
