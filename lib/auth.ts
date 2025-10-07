import { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export interface AuthUser {
  id: string
  email: string
  firstName: string
  lastName: string
  role: string
  tenantId: string
  tenant: {
    id: string
    name: string
    industry: string
  }
}

export interface JWTPayload {
  userId: string
  tenantId: string
  role: string
  iat: number
  exp: number
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

// Verify password
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

// Generate JWT token
export function generateToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

// Verify JWT token
export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload
  } catch (error) {
    return null
  }
}

// Get user from request
export async function getUserFromRequest(request: NextRequest): Promise<AuthUser | null> {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) return null

    const payload = verifyToken(token)
    if (!payload) return null

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      include: {
        tenant: {
          select: {
            id: true,
            name: true,
            industry: true
          }
        }
      }
    })

    if (!user || !user.isActive) return null

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      tenantId: user.tenantId,
      tenant: user.tenant
    }
  } catch (error) {
    console.error('Error getting user from request:', error)
    return null
  }
}

// Check user permissions
export function hasPermission(userRole: string, requiredRole: string): boolean {
  const roleHierarchy = {
    'SUPER_ADMIN': 5,
    'ADMIN': 4,
    'MANAGER': 3,
    'USER': 2,
    'VIEWER': 1
  }

  return (roleHierarchy[userRole as keyof typeof roleHierarchy] || 0) >= 
         (roleHierarchy[requiredRole as keyof typeof roleHierarchy] || 0)
}

// Middleware for protected routes
export function requireAuth(requiredRole: string = 'USER') {
  return async (request: NextRequest): Promise<{ user: AuthUser | null; error?: string }> => {
    const user = await getUserFromRequest(request)
    
    if (!user) {
      return { user: null, error: 'Authentication required' }
    }

    if (!hasPermission(user.role, requiredRole)) {
      return { user: null, error: 'Insufficient permissions' }
    }

    return { user }
  }
}

// Login function
export async function login(email: string, password: string): Promise<{ user: AuthUser | null; token: string | null; error?: string }> {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        tenant: {
          select: {
            id: true,
            name: true,
            industry: true,
            isActive: true
          }
        }
      }
    })

    if (!user || !user.isActive || !user.tenant.isActive) {
      return { user: null, token: null, error: 'Invalid credentials' }
    }

    const isValidPassword = await verifyPassword(password, user.password)
    if (!isValidPassword) {
      return { user: null, token: null, error: 'Invalid credentials' }
    }

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() }
    })

    const authUser: AuthUser = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      tenantId: user.tenantId,
      tenant: user.tenant
    }

    const token = generateToken({
      userId: user.id,
      tenantId: user.tenantId,
      role: user.role
    })

    return { user: authUser, token }
  } catch (error) {
    console.error('Login error:', error)
    return { user: null, token: null, error: 'Login failed' }
  }
}

// Register function
export async function register(
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  tenantName: string,
  industry: string
): Promise<{ user: AuthUser | null; token: string | null; error?: string }> {
  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return { user: null, token: null, error: 'User already exists' }
    }

    // Create tenant
    const tenant = await prisma.tenant.create({
      data: {
        name: tenantName,
        industry,
        settings: {}
      }
    })

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        role: 'ADMIN',
        tenantId: tenant.id
      },
      include: {
        tenant: {
          select: {
            id: true,
            name: true,
            industry: true
          }
        }
      }
    })

    const authUser: AuthUser = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      tenantId: user.tenantId,
      tenant: user.tenant
    }

    const token = generateToken({
      userId: user.id,
      tenantId: user.tenantId,
      role: user.role
    })

    return { user: authUser, token }
  } catch (error) {
    console.error('Registration error:', error)
    return { user: null, token: null, error: 'Registration failed' }
  }
}

// Change password
export async function changePassword(
  userId: string,
  currentPassword: string,
  newPassword: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      return { success: false, error: 'User not found' }
    }

    const isValidPassword = await verifyPassword(currentPassword, user.password)
    if (!isValidPassword) {
      return { success: false, error: 'Current password is incorrect' }
    }

    const hashedPassword = await hashPassword(newPassword)
    
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword }
    })

    return { success: true }
  } catch (error) {
    console.error('Change password error:', error)
    return { success: false, error: 'Password change failed' }
  }
}

// Reset password
export async function resetPassword(
  email: string,
  newPassword: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return { success: false, error: 'User not found' }
    }

    const hashedPassword = await hashPassword(newPassword)
    
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword }
    })

    return { success: true }
  } catch (error) {
    console.error('Reset password error:', error)
    return { success: false, error: 'Password reset failed' }
  }
}
