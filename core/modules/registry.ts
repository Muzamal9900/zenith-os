/**
 * Module Registry - Core system for managing modules in Zenith OS MAF
 * This is the "operating system kernel" that manages all modules
 */

import { Module, ModuleConfig, ModuleRegistry as IModuleRegistry } from './types'

export class ModuleRegistry implements IModuleRegistry {
  private modules: Map<string, Module> = new Map()
  private eventBus: EventBus
  private apiGateway: APIGateway

  constructor(eventBus: EventBus, apiGateway: APIGateway) {
    this.eventBus = eventBus
    this.apiGateway = apiGateway
  }

  /**
   * Register a new module in the system
   */
  async register(module: Module): Promise<void> {
    try {
      // Validate module configuration
      this.validateModule(module.config)

      // Check dependencies
      await this.checkDependencies(module.config.dependencies)

      // Install module
      if (module.config.database?.migrations) {
        await this.runMigrations(module.config.id, module.config.database.migrations)
      }

      // Register routes with API gateway
      await this.registerRoutes(module.config)

      // Register components
      await this.registerComponents(module.config)

      // Store module
      this.modules.set(module.config.id, module)

      // Emit module registered event
      this.eventBus.emit('module.registered', {
        moduleId: module.config.id,
        version: module.config.version
      })

      console.log(`Module ${module.config.id} v${module.config.version} registered successfully`)
    } catch (error) {
      console.error(`Failed to register module ${module.config.id}:`, error)
      throw error
    }
  }

  /**
   * Unregister a module from the system
   */
  async unregister(moduleId: string): Promise<void> {
    const module = this.modules.get(moduleId)
    if (!module) {
      throw new Error(`Module ${moduleId} not found`)
    }

    try {
      // Deactivate if active
      if (module.status === 'active') {
        await this.deactivate(moduleId)
      }

      // Unregister routes
      await this.unregisterRoutes(module.config)

      // Unregister components
      await this.unregisterComponents(module.config)

      // Remove from registry
      this.modules.delete(moduleId)

      // Emit module unregistered event
      this.eventBus.emit('module.unregistered', { moduleId })

      console.log(`Module ${moduleId} unregistered successfully`)
    } catch (error) {
      console.error(`Failed to unregister module ${moduleId}:`, error)
      throw error
    }
  }

  /**
   * Activate a module
   */
  async activate(moduleId: string): Promise<void> {
    const module = this.modules.get(moduleId)
    if (!module) {
      throw new Error(`Module ${moduleId} not found`)
    }

    if (module.status === 'active') {
      return // Already active
    }

    try {
      // Check dependencies are active
      await this.checkActiveDependencies(module.config.dependencies)

      // Activate module
      module.status = 'active'
      module.activatedAt = new Date()

      // Emit module activated event
      this.eventBus.emit('module.activated', { moduleId })

      console.log(`Module ${moduleId} activated successfully`)
    } catch (error) {
      module.status = 'error'
      module.error = error.message
      console.error(`Failed to activate module ${moduleId}:`, error)
      throw error
    }
  }

  /**
   * Deactivate a module
   */
  async deactivate(moduleId: string): Promise<void> {
    const module = this.modules.get(moduleId)
    if (!module) {
      throw new Error(`Module ${moduleId} not found`)
    }

    if (module.status !== 'active') {
      return // Not active
    }

    try {
      // Check if other modules depend on this one
      await this.checkDependents(moduleId)

      // Deactivate module
      module.status = 'inactive'
      module.activatedAt = undefined

      // Emit module deactivated event
      this.eventBus.emit('module.deactivated', { moduleId })

      console.log(`Module ${moduleId} deactivated successfully`)
    } catch (error) {
      console.error(`Failed to deactivate module ${moduleId}:`, error)
      throw error
    }
  }

  /**
   * Get a specific module
   */
  getModule(moduleId: string): Module | undefined {
    return this.modules.get(moduleId)
  }

  /**
   * Get all active modules
   */
  getActiveModules(): Module[] {
    return Array.from(this.modules.values()).filter(m => m.status === 'active')
  }

  /**
   * Get modules by category
   */
  getModulesByCategory(category: string): Module[] {
    return Array.from(this.modules.values()).filter(m => m.config.category === category)
  }

  /**
   * Validate module configuration
   */
  private validateModule(config: ModuleConfig): void {
    if (!config.id || !config.name || !config.version) {
      throw new Error('Module must have id, name, and version')
    }

    if (!config.category) {
      throw new Error('Module must have a category')
    }

    // Validate version format
    if (!/^\d+\.\d+\.\d+$/.test(config.version)) {
      throw new Error('Version must be in format x.y.z')
    }
  }

  /**
   * Check module dependencies
   */
  private async checkDependencies(dependencies: any[]): Promise<void> {
    for (const dep of dependencies) {
      const module = this.modules.get(dep.moduleId)
      if (!module) {
        if (dep.required) {
          throw new Error(`Required dependency ${dep.moduleId} not found`)
        }
        continue
      }

      // Check version compatibility
      if (!this.isVersionCompatible(module.config.version, dep.version)) {
        throw new Error(`Dependency ${dep.moduleId} version mismatch`)
      }
    }
  }

  /**
   * Check if dependencies are active
   */
  private async checkActiveDependencies(dependencies: any[]): Promise<void> {
    for (const dep of dependencies) {
      const module = this.modules.get(dep.moduleId)
      if (module && module.status !== 'active') {
        throw new Error(`Dependency ${dep.moduleId} is not active`)
      }
    }
  }

  /**
   * Check if other modules depend on this one
   */
  private async checkDependents(moduleId: string): Promise<void> {
    for (const module of this.modules.values()) {
      if (module.status === 'active') {
        const hasDependency = module.config.dependencies.some(dep => dep.moduleId === moduleId)
        if (hasDependency) {
          throw new Error(`Cannot deactivate ${moduleId}: ${module.config.id} depends on it`)
        }
      }
    }
  }

  /**
   * Register module routes with API gateway
   */
  private async registerRoutes(config: ModuleConfig): Promise<void> {
    for (const route of config.routes) {
      await this.apiGateway.registerRoute({
        path: `/api/modules/${config.id}${route.path}`,
        method: route.method,
        handler: route.handler,
        middleware: route.middleware,
        permissions: route.permissions
      })
    }
  }

  /**
   * Unregister module routes
   */
  private async unregisterRoutes(config: ModuleConfig): Promise<void> {
    for (const route of config.routes) {
      await this.apiGateway.unregisterRoute(`/api/modules/${config.id}${route.path}`)
    }
  }

  /**
   * Register module components
   */
  private async registerComponents(config: ModuleConfig): Promise<void> {
    // This would integrate with the frontend component registry
    console.log(`Registering ${config.components.length} components for ${config.id}`)
  }

  /**
   * Unregister module components
   */
  private async unregisterComponents(config: ModuleConfig): Promise<void> {
    // This would remove components from the frontend registry
    console.log(`Unregistering components for ${config.id}`)
  }

  /**
   * Run database migrations for a module
   */
  private async runMigrations(moduleId: string, migrations: string[]): Promise<void> {
    // This would run the module's database migrations
    console.log(`Running ${migrations.length} migrations for ${moduleId}`)
  }

  /**
   * Check version compatibility
   */
  private isVersionCompatible(installedVersion: string, requiredVersion: string): boolean {
    // Simple version compatibility check
    // In production, this would use semantic versioning
    return installedVersion >= requiredVersion
  }
}

// Placeholder interfaces for dependencies
interface EventBus {
  emit(event: string, data: any): void
}

interface APIGateway {
  registerRoute(route: any): Promise<void>
  unregisterRoute(path: string): Promise<void>
}
