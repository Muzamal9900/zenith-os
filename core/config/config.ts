/**
 * Core Configuration System for Zenith OS MAF
 * Manages system-wide and module-specific configuration
 */

export interface SystemConfig {
  app: {
    name: string
    version: string
    environment: 'development' | 'staging' | 'production'
    debug: boolean
  }
  database: {
    url: string
    maxConnections: number
    timeout: number
  }
  auth: {
    jwtSecret: string
    jwtExpiry: string
    refreshTokenExpiry: string
    passwordMinLength: number
  }
  api: {
    baseUrl: string
    rateLimit: {
      windowMs: number
      maxRequests: number
    }
    cors: {
      origin: string[]
      credentials: boolean
    }
  }
  modules: {
    autoLoad: boolean
    loadPath: string
    maxModules: number
  }
  events: {
    maxEvents: number
    retentionDays: number
  }
  logging: {
    level: 'debug' | 'info' | 'warn' | 'error'
    format: 'json' | 'text'
    output: 'console' | 'file' | 'both'
  }
}

export interface ModuleConfig {
  [moduleId: string]: {
    enabled: boolean
    settings: Record<string, any>
    permissions: string[]
    dependencies: string[]
  }
}

export interface TenantConfig {
  [tenantId: string]: {
    name: string
    industry: string
    modules: ModuleConfig
    branding: {
      logo?: string
      colors?: {
        primary: string
        secondary: string
        accent: string
      }
      fonts?: {
        primary: string
        secondary: string
      }
    }
    settings: Record<string, any>
  }
}

export class ConfigManager {
  private systemConfig: SystemConfig
  private moduleConfigs: Map<string, any> = new Map()
  private tenantConfigs: Map<string, TenantConfig[string]> = new Map()
  private configWatchers: Map<string, Function[]> = new Map()

  constructor() {
    this.systemConfig = this.loadSystemConfig()
    this.loadModuleConfigs()
    this.loadTenantConfigs()
  }

  /**
   * Get system configuration
   */
  getSystemConfig(): SystemConfig {
    return { ...this.systemConfig }
  }

  /**
   * Update system configuration
   */
  updateSystemConfig(updates: Partial<SystemConfig>): void {
    this.systemConfig = { ...this.systemConfig, ...updates }
    this.saveSystemConfig()
    this.notifyWatchers('system', this.systemConfig)
  }

  /**
   * Get module configuration
   */
  getModuleConfig(moduleId: string): any {
    return this.moduleConfigs.get(moduleId) || {}
  }

  /**
   * Update module configuration
   */
  updateModuleConfig(moduleId: string, config: any): void {
    this.moduleConfigs.set(moduleId, config)
    this.saveModuleConfig(moduleId, config)
    this.notifyWatchers(`module.${moduleId}`, config)
  }

  /**
   * Get tenant configuration
   */
  getTenantConfig(tenantId: string): TenantConfig[string] | undefined {
    return this.tenantConfigs.get(tenantId)
  }

  /**
   * Update tenant configuration
   */
  updateTenantConfig(tenantId: string, config: TenantConfig[string]): void {
    this.tenantConfigs.set(tenantId, config)
    this.saveTenantConfig(tenantId, config)
    this.notifyWatchers(`tenant.${tenantId}`, config)
  }

  /**
   * Watch for configuration changes
   */
  watchConfig(path: string, callback: Function): void {
    if (!this.configWatchers.has(path)) {
      this.configWatchers.set(path, [])
    }
    this.configWatchers.get(path)!.push(callback)
  }

  /**
   * Stop watching configuration
   */
  unwatchConfig(path: string, callback: Function): void {
    const watchers = this.configWatchers.get(path)
    if (watchers) {
      const index = watchers.indexOf(callback)
      if (index > -1) {
        watchers.splice(index, 1)
      }
    }
  }

  /**
   * Load system configuration from environment and files
   */
  private loadSystemConfig(): SystemConfig {
    return {
      app: {
        name: process.env.APP_NAME || 'Zenith OS',
        version: process.env.APP_VERSION || '1.0.0',
        environment: (process.env.NODE_ENV as any) || 'development',
        debug: process.env.DEBUG === 'true'
      },
      database: {
        url: process.env.DATABASE_URL || '',
        maxConnections: parseInt(process.env.DB_MAX_CONNECTIONS || '10'),
        timeout: parseInt(process.env.DB_TIMEOUT || '30000')
      },
      auth: {
        jwtSecret: process.env.JWT_SECRET || 'default-secret',
        jwtExpiry: process.env.JWT_EXPIRY || '1h',
        refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRY || '7d',
        passwordMinLength: parseInt(process.env.PASSWORD_MIN_LENGTH || '8')
      },
      api: {
        baseUrl: process.env.API_BASE_URL || 'http://localhost:3000',
        rateLimit: {
          windowMs: parseInt(process.env.RATE_LIMIT_WINDOW || '60000'),
          maxRequests: parseInt(process.env.RATE_LIMIT_MAX || '100')
        },
        cors: {
          origin: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:3000'],
          credentials: process.env.CORS_CREDENTIALS === 'true'
        }
      },
      modules: {
        autoLoad: process.env.MODULES_AUTO_LOAD === 'true',
        loadPath: process.env.MODULES_PATH || './modules',
        maxModules: parseInt(process.env.MAX_MODULES || '50')
      },
      events: {
        maxEvents: parseInt(process.env.MAX_EVENTS || '1000'),
        retentionDays: parseInt(process.env.EVENT_RETENTION_DAYS || '30')
      },
      logging: {
        level: (process.env.LOG_LEVEL as any) || 'info',
        format: (process.env.LOG_FORMAT as any) || 'text',
        output: (process.env.LOG_OUTPUT as any) || 'console'
      }
    }
  }

  /**
   * Load module configurations
   */
  private loadModuleConfigs(): void {
    // In production, this would load from database or config files
    // For now, initialize with empty configs
    console.log('Loading module configurations...')
  }

  /**
   * Load tenant configurations
   */
  private loadTenantConfigs(): void {
    // In production, this would load from database
    // For now, initialize with empty configs
    console.log('Loading tenant configurations...')
  }

  /**
   * Save system configuration
   */
  private saveSystemConfig(): void {
    // In production, this would save to database or config files
    console.log('Saving system configuration...')
  }

  /**
   * Save module configuration
   */
  private saveModuleConfig(moduleId: string, config: any): void {
    // In production, this would save to database
    console.log(`Saving configuration for module ${moduleId}...`)
  }

  /**
   * Save tenant configuration
   */
  private saveTenantConfig(tenantId: string, config: TenantConfig[string]): void {
    // In production, this would save to database
    console.log(`Saving configuration for tenant ${tenantId}...`)
  }

  /**
   * Notify configuration watchers
   */
  private notifyWatchers(path: string, config: any): void {
    const watchers = this.configWatchers.get(path)
    if (watchers) {
      watchers.forEach(callback => {
        try {
          callback(config)
        } catch (error) {
          console.error(`Error in config watcher for ${path}:`, error)
        }
      })
    }
  }
}

/**
 * Default module configurations
 */
export const DEFAULT_MODULE_CONFIGS = {
  crm: {
    enabled: true,
    settings: {
      autoSave: true,
      defaultView: 'list',
      itemsPerPage: 25,
      enableNotifications: true
    },
    permissions: ['crm.read', 'crm.write'],
    dependencies: []
  },
  website: {
    enabled: true,
    settings: {
      theme: 'default',
      enableBlog: false,
      enableEcommerce: false,
      seoOptimization: true
    },
    permissions: ['website.read', 'website.write'],
    dependencies: []
  },
  analytics: {
    enabled: true,
    settings: {
      trackingEnabled: true,
      dataRetention: 365,
      realTimeUpdates: true
    },
    permissions: ['analytics.read'],
    dependencies: ['crm']
  }
}

/**
 * Configuration validation schemas
 */
export const CONFIG_SCHEMAS = {
  system: {
    type: 'object',
    required: ['app', 'database', 'auth', 'api'],
    properties: {
      app: {
        type: 'object',
        required: ['name', 'version', 'environment'],
        properties: {
          name: { type: 'string', minLength: 1 },
          version: { type: 'string', pattern: '^\\d+\\.\\d+\\.\\d+$' },
          environment: { type: 'string', enum: ['development', 'staging', 'production'] }
        }
      }
    }
  }
}
