/**
 * Event Bus - Core communication system for Zenith OS MAF
 * Enables loose coupling between modules through pub/sub pattern
 */

export interface Event {
  id: string
  type: string
  data: any
  timestamp: Date
  source: string
  target?: string
}

export interface EventHandler {
  (event: Event): Promise<void> | void
}

export interface EventBus {
  emit(event: string, data: any, source?: string, target?: string): void
  on(event: string, handler: EventHandler, moduleId?: string): void
  off(event: string, handler: EventHandler, moduleId?: string): void
  once(event: string, handler: EventHandler, moduleId?: string): void
  getEvents(eventType?: string, moduleId?: string): Event[]
  clearEvents(eventType?: string, moduleId?: string): void
}

export class CoreEventBus implements EventBus {
  private handlers: Map<string, EventHandler[]> = new Map()
  private events: Event[] = []
  private maxEvents: number = 1000

  /**
   * Emit an event
   */
  emit(eventType: string, data: any, source?: string, target?: string): void {
    const event: Event = {
      id: this.generateEventId(),
      type: eventType,
      data,
      timestamp: new Date(),
      source: source || 'system',
      target
    }

    // Store event
    this.events.push(event)
    if (this.events.length > this.maxEvents) {
      this.events.shift() // Remove oldest event
    }

    // Notify handlers
    const eventHandlers = this.handlers.get(eventType) || []
    for (const handler of eventHandlers) {
      try {
        handler(event)
      } catch (error) {
        console.error(`Error in event handler for ${eventType}:`, error)
      }
    }

    console.log(`Event emitted: ${eventType} from ${event.source}`)
  }

  /**
   * Register event handler
   */
  on(eventType: string, handler: EventHandler, moduleId?: string): void {
    if (!this.handlers.has(eventType)) {
      this.handlers.set(eventType, [])
    }

    // Wrap handler to include module context
    const wrappedHandler = async (event: Event) => {
      try {
        await handler(event)
      } catch (error) {
        console.error(`Error in module ${moduleId} handler for ${eventType}:`, error)
      }
    }

    this.handlers.get(eventType)!.push(wrappedHandler)
    console.log(`Handler registered for ${eventType}${moduleId ? ` (module: ${moduleId})` : ''}`)
  }

  /**
   * Remove event handler
   */
  off(eventType: string, handler: EventHandler, moduleId?: string): void {
    const eventHandlers = this.handlers.get(eventType)
    if (!eventHandlers) return

    const index = eventHandlers.indexOf(handler)
    if (index > -1) {
      eventHandlers.splice(index, 1)
      console.log(`Handler removed for ${eventType}${moduleId ? ` (module: ${moduleId})` : ''}`)
    }
  }

  /**
   * Register one-time event handler
   */
  once(eventType: string, handler: EventHandler, moduleId?: string): void {
    const onceHandler = (event: Event) => {
      handler(event)
      this.off(eventType, onceHandler, moduleId)
    }
    this.on(eventType, onceHandler, moduleId)
  }

  /**
   * Get events by type and/or module
   */
  getEvents(eventType?: string, moduleId?: string): Event[] {
    let filteredEvents = this.events

    if (eventType) {
      filteredEvents = filteredEvents.filter(event => event.type === eventType)
    }

    if (moduleId) {
      filteredEvents = filteredEvents.filter(event => 
        event.source === moduleId || event.target === moduleId
      )
    }

    return filteredEvents
  }

  /**
   * Clear events
   */
  clearEvents(eventType?: string, moduleId?: string): void {
    if (eventType && moduleId) {
      this.events = this.events.filter(event => 
        !(event.type === eventType && (event.source === moduleId || event.target === moduleId))
      )
    } else if (eventType) {
      this.events = this.events.filter(event => event.type !== eventType)
    } else if (moduleId) {
      this.events = this.events.filter(event => 
        event.source !== moduleId && event.target !== moduleId
      )
    } else {
      this.events = []
    }
  }

  /**
   * Generate unique event ID
   */
  private generateEventId(): string {
    return `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }
}

/**
 * Core system events
 */
export const CORE_EVENTS = {
  // Module lifecycle events
  MODULE_REGISTERED: 'module.registered',
  MODULE_UNREGISTERED: 'module.unregistered',
  MODULE_ACTIVATED: 'module.activated',
  MODULE_DEACTIVATED: 'module.deactivated',
  MODULE_ERROR: 'module.error',

  // User events
  USER_LOGIN: 'user.login',
  USER_LOGOUT: 'user.logout',
  USER_CREATED: 'user.created',
  USER_UPDATED: 'user.updated',
  USER_DELETED: 'user.deleted',

  // Data events
  DATA_CREATED: 'data.created',
  DATA_UPDATED: 'data.updated',
  DATA_DELETED: 'data.deleted',

  // System events
  SYSTEM_STARTUP: 'system.startup',
  SYSTEM_SHUTDOWN: 'system.shutdown',
  SYSTEM_ERROR: 'system.error',

  // Integration events
  INTEGRATION_CONNECTED: 'integration.connected',
  INTEGRATION_DISCONNECTED: 'integration.disconnected',
  INTEGRATION_ERROR: 'integration.error'
} as const

/**
 * Event middleware for logging and monitoring
 */
export class EventMiddleware {
  private eventBus: EventBus

  constructor(eventBus: EventBus) {
    this.eventBus = eventBus
    this.setupMiddleware()
  }

  private setupMiddleware(): void {
    // Log all events
    this.eventBus.on('*', (event) => {
      console.log(`[EVENT] ${event.type}:`, event.data)
    })

    // Monitor system health
    this.eventBus.on(CORE_EVENTS.SYSTEM_ERROR, (event) => {
      console.error(`[SYSTEM ERROR] ${event.type}:`, event.data)
      // Could send to monitoring service
    })

    // Track module performance
    this.eventBus.on(CORE_EVENTS.MODULE_ERROR, (event) => {
      console.error(`[MODULE ERROR] ${event.data.moduleId}:`, event.data.error)
      // Could update module status in registry
    })
  }
}
