"use client"

import { useState, useEffect } from "react"
import { 
  Zap, Database, Globe, Monitor, Smartphone, 
  BarChart3, TrendingUp, Clock, CheckCircle, 
  AlertCircle, RefreshCw, Settings, Shield,
  ArrowUp, ArrowDown, ArrowRight, Target
} from "lucide-react"

export default function PerformanceOptimizer() {
  const [performanceMetrics, setPerformanceMetrics] = useState({
    pageLoadTime: 1.2,
    apiResponseTime: 150,
    databaseQueries: 12,
    cacheHitRate: 94,
    memoryUsage: 68,
    cpuUsage: 45,
    activeConnections: 156,
    errorRate: 0.2
  })

  const [optimizations, setOptimizations] = useState([
    {
      id: 'database',
      name: 'Database Optimization',
      description: 'Optimize database queries and indexing',
      impact: 'high',
      effort: 'medium',
      status: 'pending',
      metrics: {
        before: 250,
        after: 150,
        improvement: 40
      }
    },
    {
      id: 'caching',
      name: 'Caching Strategy',
      description: 'Implement Redis caching for frequently accessed data',
      impact: 'high',
      effort: 'low',
      status: 'completed',
      metrics: {
        before: 60,
        after: 94,
        improvement: 57
      }
    },
    {
      id: 'cdn',
      name: 'CDN Implementation',
      description: 'Deploy content delivery network for static assets',
      impact: 'medium',
      effort: 'low',
      status: 'pending',
      metrics: {
        before: 2.5,
        after: 1.2,
        improvement: 52
      }
    },
    {
      id: 'compression',
      name: 'Asset Compression',
      description: 'Enable gzip compression for text assets',
      impact: 'medium',
      effort: 'low',
      status: 'completed',
      metrics: {
        before: 100,
        after: 30,
        improvement: 70
      }
    },
    {
      id: 'lazy-loading',
      name: 'Lazy Loading',
      description: 'Implement lazy loading for images and components',
      impact: 'medium',
      effort: 'medium',
      status: 'pending',
      metrics: {
        before: 3.2,
        after: 1.8,
        improvement: 44
      }
    },
    {
      id: 'pagination',
      name: 'Data Pagination',
      description: 'Implement pagination for large datasets',
      impact: 'high',
      effort: 'medium',
      status: 'pending',
      metrics: {
        before: 5000,
        after: 50,
        improvement: 99
      }
    }
  ])

  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const runPerformanceAnalysis = () => {
    setIsAnalyzing(true)
    // Simulate analysis
    setTimeout(() => {
      setPerformanceMetrics(prev => ({
        ...prev,
        pageLoadTime: Math.max(0.8, prev.pageLoadTime - 0.2),
        apiResponseTime: Math.max(100, prev.apiResponseTime - 20),
        cacheHitRate: Math.min(98, prev.cacheHitRate + 2),
        memoryUsage: Math.max(50, prev.memoryUsage - 5)
      }))
      setIsAnalyzing(false)
    }, 2000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200'
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-600 bg-red-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case 'high': return 'text-red-600 bg-red-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-8xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Performance Optimizer</h1>
              <p className="text-gray-600 mt-2">Monitor and optimize your system performance</p>
            </div>
            <button
              onClick={runPerformanceAnalysis}
              disabled={isAnalyzing}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50"
            >
              {isAnalyzing ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Zap className="w-4 h-4" />
              )}
              {isAnalyzing ? 'Analyzing...' : 'Run Analysis'}
            </button>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Page Load Time</p>
                <p className="text-2xl font-semibold text-gray-900">{performanceMetrics.pageLoadTime}s</p>
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <ArrowDown className="w-3 h-3" />
                  -0.3s from last week
                </p>
              </div>
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">API Response</p>
                <p className="text-2xl font-semibold text-gray-900">{performanceMetrics.apiResponseTime}ms</p>
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <ArrowDown className="w-3 h-3" />
                  -25ms from last week
                </p>
              </div>
              <Globe className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Cache Hit Rate</p>
                <p className="text-2xl font-semibold text-gray-900">{performanceMetrics.cacheHitRate}%</p>
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <ArrowUp className="w-3 h-3" />
                  +3% from last week
                </p>
              </div>
              <Database className="w-8 h-8 text-purple-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Memory Usage</p>
                <p className="text-2xl font-semibold text-gray-900">{performanceMetrics.memoryUsage}%</p>
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <ArrowDown className="w-3 h-3" />
                  -8% from last week
                </p>
              </div>
              <Monitor className="w-8 h-8 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Performance Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance Trends</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">Performance chart would be displayed here</p>
              <p className="text-sm text-gray-500">Integration with analytics service required</p>
            </div>
          </div>
        </div>

        {/* Optimization Recommendations */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Optimization Recommendations</h3>
          <div className="space-y-4">
            {optimizations.map((optimization) => (
              <div key={optimization.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{optimization.name}</h4>
                      <p className="text-sm text-gray-600">{optimization.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(optimization.status)}`}>
                      {optimization.status}
                    </span>
                    <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                      {optimization.status === 'completed' ? 'View' : 'Apply'}
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-gray-700">Impact:</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getImpactColor(optimization.impact)}`}>
                        {optimization.impact}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-gray-700">Effort:</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getEffortColor(optimization.effort)}`}>
                        {optimization.effort}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-gray-700">Improvement:</span>
                      <span className="text-sm font-semibold text-green-600">
                        +{optimization.metrics.improvement}%
                      </span>
                    </div>
                  </div>
                </div>

                {optimization.status === 'completed' && (
                  <div className="mt-3 p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">Optimization Applied</span>
                    </div>
                    <div className="mt-2 text-sm text-green-700">
                      Performance improved from {optimization.metrics.before}ms to {optimization.metrics.after}ms
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* System Health */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-900">Database</span>
                </div>
                <span className="text-sm text-green-600">Healthy</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-900">API Services</span>
                </div>
                <span className="text-sm text-green-600">Healthy</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-900">Cache</span>
                </div>
                <span className="text-sm text-yellow-600">Warning</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-900">CDN</span>
                </div>
                <span className="text-sm text-green-600">Healthy</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Resource Usage</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">CPU Usage</span>
                  <span className="text-sm text-gray-600">{performanceMetrics.cpuUsage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full" 
                    style={{ width: `${performanceMetrics.cpuUsage}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Memory Usage</span>
                  <span className="text-sm text-gray-600">{performanceMetrics.memoryUsage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" 
                    style={{ width: `${performanceMetrics.memoryUsage}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Active Connections</span>
                  <span className="text-sm text-gray-600">{performanceMetrics.activeConnections}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" 
                    style={{ width: `${(performanceMetrics.activeConnections / 200) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
