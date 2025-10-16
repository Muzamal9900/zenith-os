/**
 * Core API Route - Main entry point for Zenith OS MAF core system
 * This route handles all core system operations
 */

import { NextRequest, NextResponse } from 'next/server'
import { getCore } from '../../../core'

// Initialize core system
let core: any = null

async function getCoreInstance() {
  if (!core) {
    try {
      const { initializeCore } = await import('../../../core')
      core = await initializeCore()
    } catch (error) {
      console.error('Failed to initialize core:', error)
      throw error
    }
  }
  return core
}

// GET /api/core - Get core system information
export async function GET(request: NextRequest) {
  try {
    const coreInstance = await getCoreInstance()
    
    if (!coreInstance.isReady()) {
      return NextResponse.json(
        { error: 'Core system not ready' },
        { status: 503 }
      )
    }

    const systemConfig = coreInstance.getConfigManager().getSystemConfig()
    const moduleRegistry = coreInstance.getModuleRegistry()
    
    // Get active modules
    const activeModules = moduleRegistry.getActiveModules()
    const allModules = Array.from(moduleRegistry.modules.values())

    return NextResponse.json({
      system: {
        name: systemConfig.app.name,
        version: systemConfig.app.version,
        environment: systemConfig.app.environment,
        status: 'ready'
      },
      modules: {
        total: allModules.length,
        active: activeModules.length,
        list: allModules.map(module => ({
          id: module.config.id,
          name: module.config.name,
          version: module.config.version,
          status: module.status,
          category: module.config.category
        }))
      },
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Core API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/core - Initialize or perform core operations
export async function POST(request: NextRequest) {
  try {
    const { action, data } = await request.json()
    const coreInstance = await getCoreInstance()

    switch (action) {
      case 'initialize':
        if (coreInstance.isReady()) {
          return NextResponse.json({ message: 'Core already initialized' })
        }
        await coreInstance.initialize()
        return NextResponse.json({ message: 'Core initialized successfully' })

      case 'shutdown':
        await coreInstance.shutdown()
        core = null
        return NextResponse.json({ message: 'Core shutdown successfully' })

      case 'register-module':
        const moduleRegistry = coreInstance.getModuleRegistry()
        await moduleRegistry.register(data.module)
        return NextResponse.json({ message: 'Module registered successfully' })

      case 'activate-module':
        const moduleRegistry2 = coreInstance.getModuleRegistry()
        await moduleRegistry2.activate(data.moduleId)
        return NextResponse.json({ message: 'Module activated successfully' })

      case 'deactivate-module':
        const moduleRegistry3 = coreInstance.getModuleRegistry()
        await moduleRegistry3.deactivate(data.moduleId)
        return NextResponse.json({ message: 'Module deactivated successfully' })

      default:
        return NextResponse.json(
          { error: 'Unknown action' },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error('Core API POST error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
