/**
 * Individual Module Management API - Handle specific module operations
 */

import { NextRequest, NextResponse } from 'next/server'
import { getCore } from '../../../../../core'

// GET /api/core/modules/[moduleId] - Get specific module
export async function GET(
  request: NextRequest,
  { params }: { params: { moduleId: string } }
) {
  try {
    const core = await getCore()
    const moduleRegistry = core.getModuleRegistry()
    
    const module = moduleRegistry.getModule(params.moduleId)
    
    if (!module) {
      return NextResponse.json(
        { error: 'Module not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      id: module.config.id,
      name: module.config.name,
      version: module.config.version,
      description: module.config.description,
      author: module.config.author,
      category: module.config.category,
      status: module.status,
      installedAt: module.installedAt,
      activatedAt: module.activatedAt,
      lastUpdated: module.lastUpdated,
      error: module.error,
      dependencies: module.config.dependencies,
      routes: module.config.routes,
      components: module.config.components,
      apis: module.config.apis,
      permissions: module.config.permissions,
      settings: module.config.settings
    })
  } catch (error) {
    console.error('Get module error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/core/modules/[moduleId] - Activate module
export async function POST(
  request: NextRequest,
  { params }: { params: { moduleId: string } }
) {
  try {
    const { action } = await request.json()
    const core = await getCore()
    const moduleRegistry = core.getModuleRegistry()
    
    const module = moduleRegistry.getModule(params.moduleId)
    
    if (!module) {
      return NextResponse.json(
        { error: 'Module not found' },
        { status: 404 }
      )
    }

    switch (action) {
      case 'activate':
        await moduleRegistry.activate(params.moduleId)
        return NextResponse.json({ message: 'Module activated successfully' })

      case 'deactivate':
        await moduleRegistry.deactivate(params.moduleId)
        return NextResponse.json({ message: 'Module deactivated successfully' })

      case 'install':
        // This would trigger module installation
        return NextResponse.json({ message: 'Module installation initiated' })

      case 'uninstall':
        // This would trigger module uninstallation
        return NextResponse.json({ message: 'Module uninstallation initiated' })

      case 'update':
        const { version } = await request.json()
        // This would trigger module update
        return NextResponse.json({ message: `Module update to v${version} initiated` })

      default:
        return NextResponse.json(
          { error: 'Unknown action' },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error('Module action error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/core/modules/[moduleId] - Unregister module
export async function DELETE(
  request: NextRequest,
  { params }: { params: { moduleId: string } }
) {
  try {
    const core = await getCore()
    const moduleRegistry = core.getModuleRegistry()
    
    const module = moduleRegistry.getModule(params.moduleId)
    
    if (!module) {
      return NextResponse.json(
        { error: 'Module not found' },
        { status: 404 }
      )
    }

    // Unregister module
    await moduleRegistry.unregister(params.moduleId)

    return NextResponse.json({ message: 'Module unregistered successfully' })
  } catch (error) {
    console.error('Unregister module error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
