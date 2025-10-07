import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create industries
  const industries = [
    { name: 'Restoration', industry: 'restoration' },
    { name: 'Healthcare', industry: 'healthcare' },
    { name: 'Logistics', industry: 'logistics' },
    { name: 'Real Estate', industry: 'real-estate' },
    { name: 'FinTech', industry: 'fintech' }
  ]

  const tenants = []
  for (const industry of industries) {
    const tenant = await prisma.tenant.create({
      data: {
        name: `${industry.name} Demo Company`,
        industry: industry.industry,
        domain: `${industry.industry}-demo.zenith.com`,
        settings: {
          industry: industry.industry,
          features: {
            customFields: true,
            workflows: true,
            integrations: true,
            analytics: true
          }
        }
      }
    })
    tenants.push(tenant)
  }

  // Create admin users for each tenant
  const hashedPassword = await bcrypt.hash('admin123', 12)
  
  for (const tenant of tenants) {
    const adminUser = await prisma.user.create({
      data: {
        email: `admin@${tenant.domain}`,
        password: hashedPassword,
        firstName: 'Admin',
        lastName: 'User',
        role: 'ADMIN',
        tenantId: tenant.id
      }
    })

    // Create demo users
    const demoUsers = [
      {
        email: `manager@${tenant.domain}`,
        firstName: 'Manager',
        lastName: 'User',
        role: 'MANAGER'
      },
      {
        email: `user@${tenant.domain}`,
        firstName: 'Regular',
        lastName: 'User',
        role: 'USER'
      }
    ]

    for (const userData of demoUsers) {
      await prisma.user.create({
        data: {
          ...userData,
          password: hashedPassword,
          tenantId: tenant.id
        }
      })
    }
  }

  // Create companies
  const companies = []
  for (const tenant of tenants) {
    const company = await prisma.company.create({
      data: {
        name: `${tenant.name} Inc.`,
        website: `https://${tenant.domain}`,
        industry: tenant.industry,
        size: 'MEDIUM',
        description: `Leading ${tenant.industry} company`,
        address: {
          street: '123 Business St',
          city: 'Business City',
          state: 'BC',
          zipCode: '12345',
          country: 'USA'
        },
        tenantId: tenant.id
      }
    })
    companies.push(company)
  }

  // Create contacts
  const contacts = []
  for (let i = 0; i < tenants.length; i++) {
    const tenant = tenants[i]
    const company = companies[i]
    
    const contact = await prisma.contact.create({
      data: {
        firstName: 'John',
        lastName: 'Smith',
        email: `john@${tenant.domain}`,
        phone: '(555) 123-4567',
        title: 'CEO',
        status: 'CUSTOMER',
        source: 'Website',
        tags: ['VIP', 'High Value'],
        customData: {
          industry: tenant.industry,
          preferences: {
            communication: 'email',
            timezone: 'EST'
          }
        },
        notes: 'High-value client with multiple projects',
        tenantId: tenant.id,
        companyId: company.id
      }
    })
    contacts.push(contact)
  }

  // Create deals
  for (let i = 0; i < tenants.length; i++) {
    const tenant = tenants[i]
    const contact = contacts[i]
    const company = companies[i]
    
    await prisma.deal.create({
      data: {
        title: `${tenant.industry.charAt(0).toUpperCase() + tenant.industry.slice(1)} Management System`,
        description: `Complete ${tenant.industry} management solution`,
        value: 15000 + (i * 5000),
        stage: 'Proposal',
        probability: 75,
        closeDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        source: 'Website',
        tags: ['Software', 'Management'],
        customData: {
          industry: tenant.industry,
          requirements: ['Custom fields', 'Workflows', 'Integrations']
        },
        tenantId: tenant.id,
        contactId: contact.id,
        companyId: company.id
      }
    })
  }

  // Create activities
  for (let i = 0; i < tenants.length; i++) {
    const tenant = tenants[i]
    const contact = contacts[i]
    
    await prisma.activity.create({
      data: {
        type: 'CALL',
        title: `Initial consultation with ${contact.firstName} ${contact.lastName}`,
        description: 'Discussing requirements and timeline',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        status: 'PENDING',
        priority: 'HIGH',
        customData: {
          duration: 60,
          type: 'consultation'
        },
        tenantId: tenant.id,
        contactId: contact.id
      }
    })
  }

  // Create custom fields for each industry
  const industryFields = {
    restoration: [
      { name: 'Damage Type', type: 'SELECT', required: true, options: ['Water', 'Fire', 'Mould', 'Storm', 'Other'] },
      { name: 'Insurance Provider', type: 'TEXT', required: true },
      { name: 'Claim Number', type: 'TEXT', required: false },
      { name: 'Emergency Contact', type: 'TEXT', required: true }
    ],
    healthcare: [
      { name: 'Patient ID', type: 'TEXT', required: true },
      { name: 'Date of Birth', type: 'DATE', required: true },
      { name: 'Insurance Provider', type: 'TEXT', required: true },
      { name: 'Policy Number', type: 'TEXT', required: true }
    ],
    logistics: [
      { name: 'Tracking Number', type: 'TEXT', required: true },
      { name: 'Package Weight', type: 'NUMBER', required: true },
      { name: 'Delivery Address', type: 'TEXT', required: true },
      { name: 'Special Instructions', type: 'TEXTAREA', required: false }
    ],
    'real-estate': [
      { name: 'Property Type', type: 'SELECT', required: true, options: ['Residential', 'Commercial', 'Land', 'Investment'] },
      { name: 'Budget Range', type: 'TEXT', required: true },
      { name: 'Preferred Location', type: 'TEXT', required: true },
      { name: 'Financing Status', type: 'SELECT', required: true, options: ['Pre-approved', 'Pre-qualified', 'Cash', 'Need Financing'] }
    ],
    fintech: [
      { name: 'Investment Amount', type: 'NUMBER', required: true },
      { name: 'Risk Tolerance', type: 'SELECT', required: true, options: ['Conservative', 'Moderate', 'Aggressive'] },
      { name: 'Investment Goals', type: 'TEXT', required: true },
      { name: 'Time Horizon', type: 'SELECT', required: true, options: ['Short-term', 'Medium-term', 'Long-term'] }
    ]
  }

  for (const tenant of tenants) {
    const fields = industryFields[tenant.industry as keyof typeof industryFields] || []
    
    for (const field of fields) {
      await prisma.customField.create({
        data: {
          name: field.name,
          type: field.type as any,
          required: field.required,
          options: field.options || [],
          order: fields.indexOf(field),
          tenantId: tenant.id
        }
      })
    }
  }

  // Create workflows
  const workflowTemplates = {
    restoration: {
      name: 'Emergency Response Workflow',
      description: 'Complete emergency response and restoration process',
      steps: [
        { name: 'Emergency Call Received', order: 1, estimatedTime: '5 minutes' },
        { name: 'Damage Assessment', order: 2, estimatedTime: '2 hours' },
        { name: 'Insurance Claim Filing', order: 3, estimatedTime: '1 hour' },
        { name: 'Work Authorization', order: 4, estimatedTime: '1 day' },
        { name: 'Restoration Work', order: 5, estimatedTime: '3-7 days' },
        { name: 'Project Completion', order: 6, estimatedTime: '2 hours' }
      ]
    },
    healthcare: {
      name: 'Patient Onboarding Workflow',
      description: 'Complete patient registration and care process',
      steps: [
        { name: 'Patient Registration', order: 1, estimatedTime: '15 minutes' },
        { name: 'Insurance Verification', order: 2, estimatedTime: '10 minutes' },
        { name: 'Appointment Scheduling', order: 3, estimatedTime: '5 minutes' },
        { name: 'Medical Consultation', order: 4, estimatedTime: '30-60 minutes' },
        { name: 'Treatment Plan', order: 5, estimatedTime: '20 minutes' },
        { name: 'Follow-up Scheduling', order: 6, estimatedTime: '5 minutes' }
      ]
    }
  }

  for (const tenant of tenants) {
    const template = workflowTemplates[tenant.industry as keyof typeof workflowTemplates]
    if (template) {
      await prisma.workflow.create({
        data: {
          name: template.name,
          description: template.description,
          industry: tenant.industry,
          steps: template.steps,
          tenantId: tenant.id
        }
      })
    }
  }

  console.log('✅ Database seeded successfully!')
  console.log(`📊 Created ${tenants.length} tenants`)
  console.log(`👥 Created users for each tenant`)
  console.log(`🏢 Created companies and contacts`)
  console.log(`💰 Created deals and activities`)
  console.log(`⚙️ Created custom fields and workflows`)
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
