"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useAuth } from './auth-context'
import apiClient from '@/lib/api'

interface CRMContextType {
  // Data
  contacts: any[]
  deals: any[]
  activities: any[]
  companies: any[]
  stats: any | null
  
  // Loading states
  isLoading: boolean
  isContactsLoading: boolean
  isDealsLoading: boolean
  isActivitiesLoading: boolean
  isStatsLoading: boolean
  
  // Pagination
  contactsPagination: any
  dealsPagination: any
  activitiesPagination: any
  
  // Filters
  contactsFilter: any
  dealsFilter: any
  activitiesFilter: any
  
  // Actions
  loadContacts: (params?: any) => Promise<void>
  loadDeals: (params?: any) => Promise<void>
  loadActivities: (params?: any) => Promise<void>
  loadCompanies: (params?: any) => Promise<void>
  loadStats: () => Promise<void>
  createContact: (data: any) => Promise<any>
  updateContact: (id: string, data: any) => Promise<any>
  deleteContact: (id: string) => Promise<any>
  createDeal: (data: any) => Promise<any>
  updateDeal: (id: string, data: any) => Promise<any>
  deleteDeal: (id: string) => Promise<any>
  createActivity: (data: any) => Promise<any>
  updateActivity: (id: string, data: any) => Promise<any>
  deleteActivity: (id: string) => Promise<any>
  createCompany: (data: any) => Promise<any>
  refreshData: () => Promise<void>
  
  // Error handling
  error: string | null
  clearError: () => void
}

const CRMContext = createContext<CRMContextType | undefined>(undefined)

export function CRMProvider({ children }: { children: ReactNode }) {
  const { user, token } = useAuth()
  
  // Data state
  const [contacts, setContacts] = useState<any[]>([])
  const [deals, setDeals] = useState<any[]>([])
  const [activities, setActivities] = useState<any[]>([])
  const [companies, setCompanies] = useState<any[]>([])
  const [stats, setStats] = useState<any>(null)
  
  // Loading states
  const [isLoading, setIsLoading] = useState(false)
  const [isContactsLoading, setIsContactsLoading] = useState(false)
  const [isDealsLoading, setIsDealsLoading] = useState(false)
  const [isActivitiesLoading, setIsActivitiesLoading] = useState(false)
  const [isStatsLoading, setIsStatsLoading] = useState(false)
  
  // Pagination
  const [contactsPagination, setContactsPagination] = useState<any>(null)
  const [dealsPagination, setDealsPagination] = useState<any>(null)
  const [activitiesPagination, setActivitiesPagination] = useState<any>(null)
  
  // Filters
  const [contactsFilter, setContactsFilter] = useState<any>({})
  const [dealsFilter, setDealsFilter] = useState<any>({})
  const [activitiesFilter, setActivitiesFilter] = useState<any>({})
  
  // Error handling
  const [error, setError] = useState<string | null>(null)

  // Set API token when user changes
  useEffect(() => {
    if (token) {
      apiClient.setToken(token)
    }
  }, [token])

  // Load contacts
  const loadContacts = async (params?: any) => {
    try {
      setIsContactsLoading(true)
      setError(null)
      
      const response = await apiClient.getContacts({ ...contactsFilter, ...params })
      
      if (response.error) {
        setError(response.error)
        return
      }
      
      setContacts(response.data?.contacts || [])
      setContactsPagination(response.data?.pagination || null)
    } catch (err) {
      setError('Failed to load contacts')
      console.error('Load contacts error:', err)
    } finally {
      setIsContactsLoading(false)
    }
  }

  // Load deals
  const loadDeals = async (params?: any) => {
    try {
      setIsDealsLoading(true)
      setError(null)
      
      const response = await apiClient.getDeals({ ...dealsFilter, ...params })
      
      if (response.error) {
        setError(response.error)
        return
      }
      
      setDeals(response.data?.deals || [])
      setDealsPagination(response.data?.pagination || null)
    } catch (err) {
      setError('Failed to load deals')
      console.error('Load deals error:', err)
    } finally {
      setIsDealsLoading(false)
    }
  }

  // Load activities
  const loadActivities = async (params?: any) => {
    try {
      setIsActivitiesLoading(true)
      setError(null)
      
      const response = await apiClient.getActivities({ ...activitiesFilter, ...params })
      
      if (response.error) {
        setError(response.error)
        return
      }
      
      setActivities(response.data?.activities || [])
      setActivitiesPagination(response.data?.pagination || null)
    } catch (err) {
      setError('Failed to load activities')
      console.error('Load activities error:', err)
    } finally {
      setIsActivitiesLoading(false)
    }
  }

  // Load companies
  const loadCompanies = async (params?: any) => {
    try {
      setIsLoading(true)
      setError(null)
      
      const response = await apiClient.getCompanies(params)
      
      if (response.error) {
        setError(response.error)
        return
      }
      
      setCompanies(response.data?.companies || [])
    } catch (err) {
      setError('Failed to load companies')
      console.error('Load companies error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  // Load dashboard stats
  const loadStats = async () => {
    try {
      setIsStatsLoading(true)
      setError(null)
      
      const response = await apiClient.getDashboardStats()
      
      if (response.error) {
        setError(response.error)
        return
      }
      
      setStats(response.data)
    } catch (err) {
      setError('Failed to load stats')
      console.error('Load stats error:', err)
    } finally {
      setIsStatsLoading(false)
    }
  }

  // Create contact
  const createContact = async (data: any) => {
    try {
      setError(null)
      
      const response = await apiClient.createContact(data)
      
      if (response.error) {
        setError(response.error)
        return null
      }
      
      // Refresh contacts list
      await loadContacts()
      return response.data
    } catch (err) {
      setError('Failed to create contact')
      console.error('Create contact error:', err)
      return null
    }
  }

  // Update contact
  const updateContact = async (id: string, data: any) => {
    try {
      setError(null)
      
      const response = await apiClient.updateContact(id, data)
      
      if (response.error) {
        setError(response.error)
        return null
      }
      
      // Refresh contacts list
      await loadContacts()
      return response.data
    } catch (err) {
      setError('Failed to update contact')
      console.error('Update contact error:', err)
      return null
    }
  }

  // Delete contact
  const deleteContact = async (id: string) => {
    try {
      setError(null)
      
      const response = await apiClient.deleteContact(id)
      
      if (response.error) {
        setError(response.error)
        return false
      }
      
      // Refresh contacts list
      await loadContacts()
      return true
    } catch (err) {
      setError('Failed to delete contact')
      console.error('Delete contact error:', err)
      return false
    }
  }

  // Create deal
  const createDeal = async (data: any) => {
    try {
      setError(null)
      
      const response = await apiClient.createDeal(data)
      
      if (response.error) {
        setError(response.error)
        return null
      }
      
      // Refresh deals list
      await loadDeals()
      return response.data
    } catch (err) {
      setError('Failed to create deal')
      console.error('Create deal error:', err)
      return null
    }
  }

  // Update deal
  const updateDeal = async (id: string, data: any) => {
    try {
      setError(null)
      
      const response = await apiClient.updateDeal(id, data)
      
      if (response.error) {
        setError(response.error)
        return null
      }
      
      // Refresh deals list
      await loadDeals()
      return response.data
    } catch (err) {
      setError('Failed to update deal')
      console.error('Update deal error:', err)
      return null
    }
  }

  // Delete deal
  const deleteDeal = async (id: string) => {
    try {
      setError(null)
      
      const response = await apiClient.deleteDeal(id)
      
      if (response.error) {
        setError(response.error)
        return false
      }
      
      // Refresh deals list
      await loadDeals()
      return true
    } catch (err) {
      setError('Failed to delete deal')
      console.error('Delete deal error:', err)
      return false
    }
  }

  // Create activity
  const createActivity = async (data: any) => {
    try {
      setError(null)
      
      const response = await apiClient.createActivity(data)
      
      if (response.error) {
        setError(response.error)
        return null
      }
      
      // Refresh activities list
      await loadActivities()
      return response.data
    } catch (err) {
      setError('Failed to create activity')
      console.error('Create activity error:', err)
      return null
    }
  }

  // Update activity
  const updateActivity = async (id: string, data: any) => {
    try {
      setError(null)
      
      const response = await apiClient.updateActivity(id, data)
      
      if (response.error) {
        setError(response.error)
        return null
      }
      
      // Refresh activities list
      await loadActivities()
      return response.data
    } catch (err) {
      setError('Failed to update activity')
      console.error('Update activity error:', err)
      return null
    }
  }

  // Delete activity
  const deleteActivity = async (id: string) => {
    try {
      setError(null)
      
      const response = await apiClient.deleteActivity(id)
      
      if (response.error) {
        setError(response.error)
        return false
      }
      
      // Refresh activities list
      await loadActivities()
      return true
    } catch (err) {
      setError('Failed to delete activity')
      console.error('Delete activity error:', err)
      return false
    }
  }

  // Create company
  const createCompany = async (data: any) => {
    try {
      setError(null)
      
      const response = await apiClient.createCompany(data)
      
      if (response.error) {
        setError(response.error)
        return null
      }
      
      // Refresh companies list
      await loadCompanies()
      return response.data
    } catch (err) {
      setError('Failed to create company')
      console.error('Create company error:', err)
      return null
    }
  }

  // Refresh all data
  const refreshData = async () => {
    try {
      setIsLoading(true)
      await Promise.all([
        loadContacts(),
        loadDeals(),
        loadActivities(),
        loadCompanies(),
        loadStats()
      ])
    } catch (err) {
      setError('Failed to refresh data')
      console.error('Refresh data error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  // Clear error
  const clearError = () => setError(null)

  const value: CRMContextType = {
    // Data
    contacts,
    deals,
    activities,
    companies,
    stats,
    
    // Loading states
    isLoading,
    isContactsLoading,
    isDealsLoading,
    isActivitiesLoading,
    isStatsLoading,
    
    // Pagination
    contactsPagination,
    dealsPagination,
    activitiesPagination,
    
    // Filters
    contactsFilter,
    dealsFilter,
    activitiesFilter,
    
    // Actions
    loadContacts,
    loadDeals,
    loadActivities,
    loadCompanies,
    loadStats,
    createContact,
    updateContact,
    deleteContact,
    createDeal,
    updateDeal,
    deleteDeal,
    createActivity,
    updateActivity,
    deleteActivity,
    createCompany,
    refreshData,
    
    // Error handling
    error,
    clearError
  }

  return (
    <CRMContext.Provider value={value}>
      {children}
    </CRMContext.Provider>
  )
}

export function useCRM() {
  const context = useContext(CRMContext)
  if (context === undefined) {
    throw new Error('useCRM must be used within a CRMProvider')
  }
  return context
}
