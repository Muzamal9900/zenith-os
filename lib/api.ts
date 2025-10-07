import { AuthUser } from './auth'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || ''

interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}

class ApiClient {
  private baseURL: string
  private token: string | null = null

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL
  }

  setToken(token: string) {
    this.token = token
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    }

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      })

      const data = await response.json()

      if (!response.ok) {
        return { error: data.error || 'Request failed' }
      }

      return { data }
    } catch (error) {
      console.error('API request failed:', error)
      return { error: 'Network error' }
    }
  }

  // Authentication
  async login(email: string, password: string) {
    return this.request<{ user: AuthUser; token: string }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  }

  async register(data: {
    email: string
    password: string
    firstName: string
    lastName: string
    tenantName: string
    industry: string
  }) {
    return this.request<{ user: AuthUser; token: string }>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async getCurrentUser() {
    return this.request<AuthUser>('/api/auth/me')
  }

  // Contacts
  async getContacts(params?: {
    page?: number
    limit?: number
    search?: string
    status?: string
    industry?: string
  }) {
    const searchParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString())
        }
      })
    }
    
    return this.request<{
      contacts: any[]
      pagination: {
        page: number
        limit: number
        total: number
        pages: number
      }
    }>(`/api/contacts?${searchParams.toString()}`)
  }

  async getContact(id: string) {
    return this.request<any>(`/api/contacts/${id}`)
  }

  async createContact(data: any) {
    return this.request<any>('/api/contacts', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async updateContact(id: string, data: any) {
    return this.request<any>(`/api/contacts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async deleteContact(id: string) {
    return this.request<any>(`/api/contacts/${id}`, {
      method: 'DELETE',
    })
  }

  // Deals
  async getDeals(params?: {
    page?: number
    limit?: number
    search?: string
    stage?: string
    industry?: string
  }) {
    const searchParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString())
        }
      })
    }
    
    return this.request<{
      deals: any[]
      pagination: {
        page: number
        limit: number
        total: number
        pages: number
      }
    }>(`/api/deals?${searchParams.toString()}`)
  }

  async getDeal(id: string) {
    return this.request<any>(`/api/deals/${id}`)
  }

  async createDeal(data: any) {
    return this.request<any>('/api/deals', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async updateDeal(id: string, data: any) {
    return this.request<any>(`/api/deals/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async deleteDeal(id: string) {
    return this.request<any>(`/api/deals/${id}`, {
      method: 'DELETE',
    })
  }

  // Activities
  async getActivities(params?: {
    page?: number
    limit?: number
    type?: string
    status?: string
    contactId?: string
    dealId?: string
  }) {
    const searchParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString())
        }
      })
    }
    
    return this.request<{
      activities: any[]
      pagination: {
        page: number
        limit: number
        total: number
        pages: number
      }
    }>(`/api/activities?${searchParams.toString()}`)
  }

  async createActivity(data: any) {
    return this.request<any>('/api/activities', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async updateActivity(id: string, data: any) {
    return this.request<any>(`/api/activities/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async deleteActivity(id: string) {
    return this.request<any>(`/api/activities/${id}`, {
      method: 'DELETE',
    })
  }

  // Companies
  async getCompanies(params?: {
    page?: number
    limit?: number
    search?: string
    industry?: string
  }) {
    const searchParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString())
        }
      })
    }
    
    return this.request<{
      companies: any[]
      pagination: {
        page: number
        limit: number
        total: number
        pages: number
      }
    }>(`/api/companies?${searchParams.toString()}`)
  }

  async createCompany(data: any) {
    return this.request<any>('/api/companies', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  // Dashboard Stats
  async getDashboardStats() {
    return this.request<{
      totalContacts: number
      totalDeals: number
      totalValue: number
      wonDeals: number
      lostDeals: number
      activeDeals: number
      thisMonthRevenue: number
      lastMonthRevenue: number
      revenueGrowth: number
      conversionRate: number
      averageDealSize: number
      pipelineValue: number
    }>('/api/dashboard/stats')
  }

  // Reports
  async getReports() {
    return this.request<any[]>('/api/reports')
  }

  async createReport(data: any) {
    return this.request<any>('/api/reports', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  // Custom Fields
  async getCustomFields() {
    return this.request<any[]>('/api/custom-fields')
  }

  async createCustomField(data: any) {
    return this.request<any>('/api/custom-fields', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  // Workflows
  async getWorkflows() {
    return this.request<any[]>('/api/workflows')
  }

  async createWorkflow(data: any) {
    return this.request<any>('/api/workflows', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }
}

export const apiClient = new ApiClient()
export default apiClient
