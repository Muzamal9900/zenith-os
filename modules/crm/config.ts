/**
 * CRM Module Configuration for Zenith OS MAF
 * This defines the CRM module as a plugin in the modular system
 */

import { ModuleConfig } from '../../core/modules/types'

export const CRM_MODULE_CONFIG: ModuleConfig = {
  id: 'crm',
  name: 'Customer Relationship Management',
  version: '1.0.0',
  description: 'Complete CRM system with contacts, deals, activities, and companies management',
  author: 'Zenith OS Team',
  category: 'crm',
  dependencies: [],
  routes: [
    {
      path: '/contacts',
      method: 'GET',
      handler: 'getContacts',
      permissions: ['crm.contacts.read']
    },
    {
      path: '/contacts',
      method: 'POST',
      handler: 'createContact',
      permissions: ['crm.contacts.write']
    },
    {
      path: '/contacts/:id',
      method: 'GET',
      handler: 'getContact',
      permissions: ['crm.contacts.read']
    },
    {
      path: '/contacts/:id',
      method: 'PUT',
      handler: 'updateContact',
      permissions: ['crm.contacts.write']
    },
    {
      path: '/contacts/:id',
      method: 'DELETE',
      handler: 'deleteContact',
      permissions: ['crm.contacts.delete']
    },
    {
      path: '/companies',
      method: 'GET',
      handler: 'getCompanies',
      permissions: ['crm.companies.read']
    },
    {
      path: '/companies',
      method: 'POST',
      handler: 'createCompany',
      permissions: ['crm.companies.write']
    },
    {
      path: '/companies/:id',
      method: 'GET',
      handler: 'getCompany',
      permissions: ['crm.companies.read']
    },
    {
      path: '/companies/:id',
      method: 'PUT',
      handler: 'updateCompany',
      permissions: ['crm.companies.write']
    },
    {
      path: '/companies/:id',
      method: 'DELETE',
      handler: 'deleteCompany',
      permissions: ['crm.companies.delete']
    },
    {
      path: '/deals',
      method: 'GET',
      handler: 'getDeals',
      permissions: ['crm.deals.read']
    },
    {
      path: '/deals',
      method: 'POST',
      handler: 'createDeal',
      permissions: ['crm.deals.write']
    },
    {
      path: '/deals/:id',
      method: 'GET',
      handler: 'getDeal',
      permissions: ['crm.deals.read']
    },
    {
      path: '/deals/:id',
      method: 'PUT',
      handler: 'updateDeal',
      permissions: ['crm.deals.write']
    },
    {
      path: '/deals/:id',
      method: 'DELETE',
      handler: 'deleteDeal',
      permissions: ['crm.deals.delete']
    },
    {
      path: '/activities',
      method: 'GET',
      handler: 'getActivities',
      permissions: ['crm.activities.read']
    },
    {
      path: '/activities',
      method: 'POST',
      handler: 'createActivity',
      permissions: ['crm.activities.write']
    },
    {
      path: '/activities/:id',
      method: 'GET',
      handler: 'getActivity',
      permissions: ['crm.activities.read']
    },
    {
      path: '/activities/:id',
      method: 'PUT',
      handler: 'updateActivity',
      permissions: ['crm.activities.write']
    },
    {
      path: '/activities/:id',
      method: 'DELETE',
      handler: 'deleteActivity',
      permissions: ['crm.activities.delete']
    },
    {
      path: '/dashboard/stats',
      method: 'GET',
      handler: 'getDashboardStats',
      permissions: ['crm.dashboard.read']
    }
  ],
  components: [
    {
      id: 'crm-dashboard',
      name: 'CRM Dashboard',
      path: '/modules/crm/dashboard',
      type: 'page',
      permissions: ['crm.dashboard.read']
    },
    {
      id: 'contacts-list',
      name: 'Contacts List',
      path: '/modules/crm/contacts',
      type: 'page',
      permissions: ['crm.contacts.read']
    },
    {
      id: 'contact-form',
      name: 'Contact Form',
      path: '/modules/crm/components/contact-form',
      type: 'modal',
      permissions: ['crm.contacts.write']
    },
    {
      id: 'companies-list',
      name: 'Companies List',
      path: '/modules/crm/companies',
      type: 'page',
      permissions: ['crm.companies.read']
    },
    {
      id: 'company-form',
      name: 'Company Form',
      path: '/modules/crm/components/company-form',
      type: 'modal',
      permissions: ['crm.companies.write']
    },
    {
      id: 'deals-list',
      name: 'Deals List',
      path: '/modules/crm/deals',
      type: 'page',
      permissions: ['crm.deals.read']
    },
    {
      id: 'deal-form',
      name: 'Deal Form',
      path: '/modules/crm/components/deal-form',
      type: 'modal',
      permissions: ['crm.deals.write']
    },
    {
      id: 'activities-list',
      name: 'Activities List',
      path: '/modules/crm/activities',
      type: 'page',
      permissions: ['crm.activities.read']
    },
    {
      id: 'activity-form',
      name: 'Activity Form',
      path: '/modules/crm/components/activity-form',
      type: 'modal',
      permissions: ['crm.activities.write']
    },
    {
      id: 'crm-widget',
      name: 'CRM Widget',
      path: '/modules/crm/widgets/crm-widget',
      type: 'widget',
      permissions: ['crm.dashboard.read']
    }
  ],
  apis: [
    {
      endpoint: '/api/modules/crm/contacts',
      method: 'GET',
      handler: 'getContacts',
      permissions: ['crm.contacts.read'],
      rateLimit: 100
    },
    {
      endpoint: '/api/modules/crm/contacts',
      method: 'POST',
      handler: 'createContact',
      permissions: ['crm.contacts.write'],
      rateLimit: 50
    },
    {
      endpoint: '/api/modules/crm/companies',
      method: 'GET',
      handler: 'getCompanies',
      permissions: ['crm.companies.read'],
      rateLimit: 100
    },
    {
      endpoint: '/api/modules/crm/companies',
      method: 'POST',
      handler: 'createCompany',
      permissions: ['crm.companies.write'],
      rateLimit: 50
    },
    {
      endpoint: '/api/modules/crm/deals',
      method: 'GET',
      handler: 'getDeals',
      permissions: ['crm.deals.read'],
      rateLimit: 100
    },
    {
      endpoint: '/api/modules/crm/deals',
      method: 'POST',
      handler: 'createDeal',
      permissions: ['crm.deals.write'],
      rateLimit: 50
    },
    {
      endpoint: '/api/modules/crm/activities',
      method: 'GET',
      handler: 'getActivities',
      permissions: ['crm.activities.read'],
      rateLimit: 100
    },
    {
      endpoint: '/api/modules/crm/activities',
      method: 'POST',
      handler: 'createActivity',
      permissions: ['crm.activities.write'],
      rateLimit: 50
    },
    {
      endpoint: '/api/modules/crm/dashboard/stats',
      method: 'GET',
      handler: 'getDashboardStats',
      permissions: ['crm.dashboard.read'],
      rateLimit: 200
    }
  ],
  permissions: [
    {
      id: 'crm.contacts.read',
      name: 'Read Contacts',
      description: 'View contact information',
      category: 'contacts'
    },
    {
      id: 'crm.contacts.write',
      name: 'Write Contacts',
      description: 'Create and edit contacts',
      category: 'contacts'
    },
    {
      id: 'crm.contacts.delete',
      name: 'Delete Contacts',
      description: 'Delete contacts',
      category: 'contacts'
    },
    {
      id: 'crm.companies.read',
      name: 'Read Companies',
      description: 'View company information',
      category: 'companies'
    },
    {
      id: 'crm.companies.write',
      name: 'Write Companies',
      description: 'Create and edit companies',
      category: 'companies'
    },
    {
      id: 'crm.companies.delete',
      name: 'Delete Companies',
      description: 'Delete companies',
      category: 'companies'
    },
    {
      id: 'crm.deals.read',
      name: 'Read Deals',
      description: 'View deal information',
      category: 'deals'
    },
    {
      id: 'crm.deals.write',
      name: 'Write Deals',
      description: 'Create and edit deals',
      category: 'deals'
    },
    {
      id: 'crm.deals.delete',
      name: 'Delete Deals',
      description: 'Delete deals',
      category: 'deals'
    },
    {
      id: 'crm.activities.read',
      name: 'Read Activities',
      description: 'View activity information',
      category: 'activities'
    },
    {
      id: 'crm.activities.write',
      name: 'Write Activities',
      description: 'Create and edit activities',
      category: 'activities'
    },
    {
      id: 'crm.activities.delete',
      name: 'Delete Activities',
      description: 'Delete activities',
      category: 'activities'
    },
    {
      id: 'crm.dashboard.read',
      name: 'Read Dashboard',
      description: 'View CRM dashboard and statistics',
      category: 'dashboard'
    }
  ],
  settings: {
    autoSave: true,
    defaultView: 'list',
    itemsPerPage: 25,
    enableNotifications: true,
    enableEmailIntegration: false,
    enableCalendarIntegration: false,
    customFields: [],
    workflows: [],
    reports: []
  },
  database: {
    migrations: [
      '001_create_crm_tables.sql',
      '002_add_custom_fields.sql',
      '003_add_workflows.sql'
    ],
    seeders: [
      '001_seed_default_data.sql'
    ]
  }
}
