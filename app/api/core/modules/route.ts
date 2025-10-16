/**
 * Module Management API - Handle module operations in Zenith OS MAF
 */

import { NextRequest, NextResponse } from 'next/server'
import { getCore } from '../../../../core'

// GET /api/core/modules - List all modules
export async function GET(request: NextRequest) {
  try {
    const core = await getCore()
    const moduleRegistry = core.getModuleRegistry()
    
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const status = searchParams.get('status')

    let modules = Array.from(moduleRegistry.modules.values())

    // Filter by category
    if (category) {
      modules = modules.filter(module => module.config.category === category)
    }

    // Filter by status
    if (status) {
      modules = modules.filter(module => module.status === status)
    }

    const moduleList = modules.map(module => ({
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
      routes: module.config.routes.length,
      components: module.config.components.length,
      apis: module.config.apis.length,
      permissions: module.config.permissions.length
    }))

    return NextResponse.json({
      modules: moduleList,
      total: moduleList.length,
      categories: [...new Set(modules.map(m => m.config.category))],
      statuses: [...new Set(modules.map(m => m.status))]
    })
  } catch (error) {
    console.error('Get modules error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/core/modules - Register a new module
export async function POST(request: NextRequest) {
  try {
    const moduleData = await request.json()
    const core = await getCore()
    const moduleRegistry = core.getModuleRegistry()

    // Validate module data
    if (!moduleData.id || !moduleData.name || !moduleData.version) {
      return NextResponse.json(
        { error: 'Module must have id, name, and version' },
        { status: 400 }
      )
    }

    // Create module object
    const module = {
      config: moduleData,
      status: 'installed' as const,
      installedAt: new Date(),
      lastUpdated: new Date()
    }

    // Register module
    await moduleRegistry.register(module)

    return NextResponse.json({
      message: 'Module registered successfully',
      module: {
        id: module.config.id,
        name: module.config.name,
        version: module.config.version,
        status: module.status
      }
    }, { status: 201 })
  } catch (error) {
    console.error('Register module error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
