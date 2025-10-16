/**
 * Zenith OS Core - Main entry point for the Modular Application Framework
 * This initializes and orchestrates all core systems
 */

import { ModuleRegistry } from './modules/registry'
import { CoreAPIGateway } from './api-gateway/gateway'
import { CoreEventBus, EventMiddleware } from './events/event-bus'
import { ConfigManager } from './config/config'

export class ZenithCore {
  private moduleRegistry: ModuleRegistry
  private apiGateway: CoreAPIGateway
  private eventBus: CoreEventBus
  private configManager: ConfigManager
  private isInitialized: boolean = false

  constructor() {
    // Initialize core systems
    this.eventBus = new CoreEventBus()
    this.configManager = new ConfigManager()
    this.apiGateway = new CoreAPIGateway(this.moduleRegistry)
    this.moduleRegistry = new ModuleRegistry(this.eventBus, this.apiGateway)

    // Setup event middleware
    new EventMiddleware(this.eventBus)
  }

  /**
   * Initialize the core system
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) {
      console.log('Core already initialized')
      return
    }

    try {
      console.log('Initializing Zenith OS Core...')

      // Load system configuration
      const systemConfig = this.configManager.getSystemConfig()
      console.log(`Starting ${systemConfig.app.name} v${systemConfig.app.version}`)

      // Initialize database connection
      await this.initializeDatabase()

      // Load and register core modules
      await this.loadCoreModules()

      // Setup API routes
      await this.setupAPIRoutes()

      // Start event system
      this.startEventSystem()

      this.isInitialized = true
      console.log('Zenith OS Core initialized successfully')

      // Emit system startup event
      this.eventBus.emit('system.startup', {
        timestamp: new Date(),
        version: systemConfig.app.version,
        environment: systemConfig.app.environment
      })

    } catch (error) {
      console.error('Failed to initialize Zenith OS Core:', error)
      this.eventBus.emit('system.error', {
        error: error.message,
        timestamp: new Date()
      })
      throw error
    }
  }

  /**
   * Shutdown the core system
   */
  async shutdown(): Promise<void> {
    if (!this.isInitialized) {
      return
    }

    try {
      console.log('Shutting down Zenith OS Core...')

      // Deactivate all modules
      const activeModules = this.moduleRegistry.getActiveModules()
      for (const module of activeModules) {
        try {
          await this.moduleRegistry.deactivate(module.config.id)
        } catch (error) {
          console.error(`Error deactivating module ${module.config.id}:`, error)
        }
      }

      // Emit system shutdown event
      this.eventBus.emit('system.shutdown', {
        timestamp: new Date()
      })

      // Close database connections
      await this.closeDatabase()

      this.isInitialized = false
      console.log('Zenith OS Core shutdown complete')

    } catch (error) {
      console.error('Error during shutdown:', error)
      throw error
    }
  }

  /**
   * Get module registry
   */
  getModuleRegistry(): ModuleRegistry {
    return this.moduleRegistry
  }

  /**
   * Get API gateway
   */
  getAPIGateway(): CoreAPIGateway {
    return this.apiGateway
  }

  /**
   * Get event bus
   */
  getEventBus(): CoreEventBus {
    return this.eventBus
  }

  /**
   * Get config manager
   */
  getConfigManager(): ConfigManager {
    return this.configManager
  }

  /**
   * Check if core is initialized
   */
  isReady(): boolean {
    return this.isInitialized
  }

  /**
   * Initialize database connection
   */
  private async initializeDatabase(): Promise<void> {
    const dbConfig = this.configManager.getSystemConfig().database
    console.log('Connecting to database...')
    
    // In production, this would establish actual database connection
    // For now, just log the configuration
    console.log(`Database URL: ${dbConfig.url}`)
    console.log(`Max connections: ${dbConfig.maxConnections}`)
  }

  /**
   * Load core modules
   */
  private async loadCoreModules(): Promise<void> {
    const moduleConfig = this.configManager.getSystemConfig().modules
    
    if (moduleConfig.autoLoad) {
      console.log('Auto-loading modules...')
      // In production, this would scan the modules directory and load them
      // For now, just log the configuration
      console.log(`Module load path: ${moduleConfig.loadPath}`)
      console.log(`Max modules: ${moduleConfig.maxModules}`)
    }
  }

  /**
   * Setup core API routes
   */
  private async setupAPIRoutes(): Promise<void> {
    console.log('Setting up core API routes...')

    // Register core system routes
    await this.apiGateway.registerRoute({
      path: '/api/core/health',
      method: 'GET',
      handler: 'healthCheck',
      permissions: []
    })

    await this.apiGateway.registerRoute({
      path: '/api/core/modules',
      method: 'GET',
      handler: 'listModules',
      permissions: ['admin.read']
    })

    await this.apiGateway.registerRoute({
      path: '/api/core/modules/:moduleId',
      method: 'POST',
      handler: 'activateModule',
      permissions: ['admin.write']
    })

    await this.apiGateway.registerRoute({
      path: '/api/core/modules/:moduleId',
      method: 'DELETE',
      handler: 'deactivateModule',
      permissions: ['admin.write']
    })

    console.log('Core API routes registered')
  }

  /**
   * Start event system
   */
  private startEventSystem(): void {
    console.log('Starting event system...')
    
    // Setup core event handlers
    this.eventBus.on('module.registered', (event) => {
      console.log(`Module registered: ${event.data.moduleId}`)
    })

    this.eventBus.on('module.activated', (event) => {
      console.log(`Module activated: ${event.data.moduleId}`)
    })

    this.eventBus.on('module.error', (event) => {
      console.error(`Module error: ${event.data.moduleId} - ${event.data.error}`)
    })

    console.log('Event system started')
  }

  /**
   * Close database connections
   */
  private async closeDatabase(): Promise<void> {
    console.log('Closing database connections...')
    // In production, this would close actual database connections
  }
}

// Global core instance
let coreInstance: ZenithCore | null = null

/**
 * Get the global core instance
 */
export function getCore(): ZenithCore {
  if (!coreInstance) {
    coreInstance = new ZenithCore()
  }
  return coreInstance
}

/**
 * Initialize the global core instance
 */
export async function initializeCore(): Promise<ZenithCore> {
  const core = getCore()
  await core.initialize()
  return core
}

/**
 * Shutdown the global core instance
 */
export async function shutdownCore(): Promise<void> {
  if (coreInstance) {
    await coreInstance.shutdown()
    coreInstance = null
  }
}

// Export core systems for direct access
export { ModuleRegistry } from './modules/registry'
export { CoreAPIGateway } from './api-gateway/gateway'
export { CoreEventBus } from './events/event-bus'
export { ConfigManager } from './config/config'
export * from './modules/types'
export * from './events/event-bus'
