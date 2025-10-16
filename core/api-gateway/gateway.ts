/**
 * API Gateway - Core routing and request handling for Zenith OS MAF
 * This acts as the communication bus between frontend and modules
 */

import { NextRequest, NextResponse } from 'next/server'
import { ModuleRegistry } from '../modules/registry'

export interface Route {
  path: string
  method: string
  handler: string
  middleware?: string[]
  permissions?: string[]
  rateLimit?: number
}

export interface APIGateway {
  registerRoute(route: Route): Promise<void>
  unregisterRoute(path: string): Promise<void>
  handleRequest(request: NextRequest): Promise<NextResponse>
  validateRequest(request: NextRequest, route: Route): Promise<boolean>
  checkPermissions(user: any, permissions: string[]): Promise<boolean>
}

export class CoreAPIGateway implements APIGateway {
  private routes: Map<string, Route> = new Map()
  private moduleRegistry: ModuleRegistry
  private rateLimitStore: Map<string, { count: number; resetTime: number }> = new Map()

  constructor(moduleRegistry: ModuleRegistry) {
    this.moduleRegistry = moduleRegistry
  }

  /**
   * Register a new route
   */
  async registerRoute(route: Route): Promise<void> {
    const key = `${route.method}:${route.path}`
    this.routes.set(key, route)
    console.log(`Registered route: ${route.method} ${route.path}`)
  }

  /**
   * Unregister a route
   */
  async unregisterRoute(path: string): Promise<void> {
    for (const [key, route] of this.routes.entries()) {
      if (route.path === path) {
        this.routes.delete(key)
        console.log(`Unregistered route: ${route.method} ${route.path}`)
      }
    }
  }

  /**
   * Handle incoming API requests
   */
  async handleRequest(request: NextRequest): Promise<NextResponse> {
    try {
      const method = request.method
      const pathname = request.nextUrl.pathname

      // Find matching route
      const route = this.findRoute(method, pathname)
      if (!route) {
        return NextResponse.json(
          { error: 'Route not found' },
          { status: 404 }
        )
      }

      // Validate request
      const isValid = await this.validateRequest(request, route)
      if (!isValid) {
        return NextResponse.json(
          { error: 'Invalid request' },
          { status: 400 }
        )
      }

      // Check rate limiting
      if (route.rateLimit) {
        const rateLimitOk = await this.checkRateLimit(request, route)
        if (!rateLimitOk) {
          return NextResponse.json(
            { error: 'Rate limit exceeded' },
            { status: 429 }
          )
        }
      }

      // Check permissions
      if (route.permissions && route.permissions.length > 0) {
        const user = await this.getUserFromRequest(request)
        const hasPermission = await this.checkPermissions(user, route.permissions)
        if (!hasPermission) {
          return NextResponse.json(
            { error: 'Insufficient permissions' },
            { status: 403 }
          )
        }
      }

      // Execute middleware
      if (route.middleware && route.middleware.length > 0) {
        const middlewareResult = await this.executeMiddleware(request, route.middleware)
        if (middlewareResult.error) {
          return NextResponse.json(
            { error: middlewareResult.error },
            { status: middlewareResult.status || 400 }
          )
        }
      }

      // Route to module handler
      const response = await this.routeToHandler(request, route)
      return response

    } catch (error) {
      console.error('API Gateway error:', error)
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      )
    }
  }

  /**
   * Find matching route for request
   */
  private findRoute(method: string, pathname: string): Route | undefined {
    // First try exact match
    const exactKey = `${method}:${pathname}`
    let route = this.routes.get(exactKey)
    if (route) return route

    // Then try pattern matching
    for (const [key, route] of this.routes.entries()) {
      if (this.matchesRoute(method, pathname, route)) {
        return route
      }
    }

    return undefined
  }

  /**
   * Check if request matches route pattern
   */
  private matchesRoute(method: string, pathname: string, route: Route): boolean {
    if (route.method !== method) return false

    const routeParts = route.path.split('/')
    const pathParts = pathname.split('/')

    if (routeParts.length !== pathParts.length) return false

    for (let i = 0; i < routeParts.length; i++) {
      const routePart = routeParts[i]
      const pathPart = pathParts[i]

      // Skip dynamic segments (starting with :)
      if (routePart.startsWith(':')) continue

      // Exact match required for static segments
      if (routePart !== pathPart) return false
    }

    return true
  }

  /**
   * Validate request format and content
   */
  async validateRequest(request: NextRequest, route: Route): Promise<boolean> {
    // Basic validation - can be extended
    if (['POST', 'PUT', 'PATCH'].includes(route.method)) {
      try {
        await request.json()
      } catch {
        return false
      }
    }
    return true
  }

  /**
   * Check user permissions
   */
  async checkPermissions(user: any, permissions: string[]): Promise<boolean> {
    if (!user) return false

    // Check if user has any of the required permissions
    const userPermissions = user.permissions || []
    return permissions.some(permission => userPermissions.includes(permission))
  }

  /**
   * Check rate limiting
   */
  async checkRateLimit(request: NextRequest, route: Route): Promise<boolean> {
    const clientId = this.getClientId(request)
    const key = `${clientId}:${route.path}`
    const now = Date.now()
    const windowMs = 60000 // 1 minute window

    const current = this.rateLimitStore.get(key)
    if (!current || now > current.resetTime) {
      this.rateLimitStore.set(key, { count: 1, resetTime: now + windowMs })
      return true
    }

    if (current.count >= route.rateLimit!) {
      return false
    }

    current.count++
    return true
  }

  /**
   * Execute middleware chain
   */
  async executeMiddleware(request: NextRequest, middleware: string[]): Promise<{ error?: string; status?: number }> {
    for (const middlewareName of middleware) {
      try {
        const result = await this.runMiddleware(middlewareName, request)
        if (result.error) {
          return result
        }
      } catch (error) {
        return { error: `Middleware ${middlewareName} failed`, status: 500 }
      }
    }
    return {}
  }

  /**
   * Run individual middleware
   */
  private async runMiddleware(name: string, request: NextRequest): Promise<{ error?: string; status?: number }> {
    // This would load and execute the actual middleware
    // For now, just return success
    console.log(`Executing middleware: ${name}`)
    return {}
  }

  /**
   * Route request to module handler
   */
  private async routeToHandler(request: NextRequest, route: Route): Promise<NextResponse> {
    try {
      // Extract module ID from route path
      const pathParts = route.path.split('/')
      const moduleId = pathParts[3] // /api/modules/{moduleId}/...

      // Get module from registry
      const module = this.moduleRegistry.getModule(moduleId)
      if (!module) {
        return NextResponse.json(
          { error: 'Module not found' },
          { status: 404 }
        )
      }

      // Load and execute handler
      const handler = await this.loadHandler(module.config.id, route.handler)
      const response = await handler(request, route)
      
      return response
    } catch (error) {
      console.error('Handler execution error:', error)
      return NextResponse.json(
        { error: 'Handler execution failed' },
        { status: 500 }
      )
    }
  }

  /**
   * Load module handler
   */
  private async loadHandler(moduleId: string, handlerName: string): Promise<Function> {
    // This would dynamically load the handler from the module
    // For now, return a placeholder
    return async (request: NextRequest, route: Route) => {
      return NextResponse.json({ message: `Handler ${handlerName} from module ${moduleId}` })
    }
  }

  /**
   * Get client ID for rate limiting
   */
  private getClientId(request: NextRequest): string {
    // Try to get user ID first, then fall back to IP
    const userId = request.headers.get('x-user-id')
    if (userId) return userId

    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : request.ip || 'unknown'
    return ip
  }

  /**
   * Get user from request
   */
  private async getUserFromRequest(request: NextRequest): Promise<any> {
    // This would extract user from JWT token or session
    const token = request.headers.get('authorization')
    if (!token) return null

    // Decode and validate token
    // Return user object with permissions
    return {
      id: 'user-123',
      permissions: ['read', 'write']
    }
  }
}
