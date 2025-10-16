/**
 * Core Module Interface for Zenith OS MAF
 * This defines the contract that all modules must implement
 */

export interface ModuleRoute {
  path: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  handler: string
  middleware?: string[]
  permissions?: string[]
}

export interface ModuleComponent {
  id: string
  name: string
  path: string
  type: 'page' | 'widget' | 'modal' | 'component'
  permissions?: string[]
  dependencies?: string[]
}

export interface ModuleAPI {
  endpoint: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  handler: string
  permissions?: string[]
  rateLimit?: number
}

export interface ModulePermission {
  id: string
  name: string
  description: string
  category: string
}

export interface ModuleDependency {
  moduleId: string
  version: string
  required: boolean
}

export interface ModuleConfig {
  id: string
  name: string
  version: string
  description: string
  author: string
  category: 'crm' | 'website' | 'analytics' | 'integration' | 'industry'
  dependencies: ModuleDependency[]
  routes: ModuleRoute[]
  components: ModuleComponent[]
  apis: ModuleAPI[]
  permissions: ModulePermission[]
  settings: Record<string, any>
  database?: {
    migrations: string[]
    seeders: string[]
  }
}

export interface Module {
  config: ModuleConfig
  status: 'installed' | 'active' | 'inactive' | 'error'
  installedAt: Date
  activatedAt?: Date
  lastUpdated: Date
  error?: string
}

export interface ModuleRegistry {
  modules: Map<string, Module>
  register(module: Module): Promise<void>
  unregister(moduleId: string): Promise<void>
  activate(moduleId: string): Promise<void>
  deactivate(moduleId: string): Promise<void>
  getModule(moduleId: string): Module | undefined
  getActiveModules(): Module[]
  getModulesByCategory(category: string): Module[]
}

export interface ModuleLifecycle {
  install(): Promise<void>
  uninstall(): Promise<void>
  activate(): Promise<void>
  deactivate(): Promise<void>
  update(version: string): Promise<void>
  migrate(fromVersion: string, toVersion: string): Promise<void>
}

export interface ModuleContext {
  moduleId: string
  tenantId: string
  userId: string
  permissions: string[]
  config: Record<string, any>
  events: EventBus
  api: APIClient
  database: DatabaseClient
}

export interface EventBus {
  emit(event: string, data: any): void
  on(event: string, handler: Function): void
  off(event: string, handler: Function): void
}

export interface APIClient {
  get(url: string, options?: any): Promise<any>
  post(url: string, data: any, options?: any): Promise<any>
  put(url: string, data: any, options?: any): Promise<any>
  delete(url: string, options?: any): Promise<any>
}

export interface DatabaseClient {
  query(sql: string, params?: any[]): Promise<any>
  transaction(callback: Function): Promise<any>
  migrate(migrations: string[]): Promise<void>
}
