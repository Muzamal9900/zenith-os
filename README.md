# Zenith OS - Professional White-Label business platform

A comprehensive, multi-tenant CRM and business management platform designed for any industry. Built with Next.js, TypeScript, Prisma, and Tailwind CSS.

## 🚀 Features

### Core Functionality
- **Multi-tenant Architecture** - Isolated data for each client
- **Industry-Specific Templates** - Pre-built workflows for different sectors
- **Professional CRM** - Complete contact, deal, and activity management
- **Custom Fields** - Flexible data structure for any industry
- **Workflow Automation** - Automated business processes
- **Real-time Analytics** - Performance metrics and reporting
- **Role-based Access Control** - Granular permissions system

### Industry Support
- **Restoration** - Water damage, fire restoration, mould remediation
- **Healthcare** - Patient management, appointments, medical records
- **Logistics** - Fleet tracking, route optimization, delivery management
- **Real Estate** - Property listings, client portals, transaction management
- **FinTech** - Investment management, portfolio tracking, risk assessment

### Technical Features
- **JWT Authentication** - Secure user authentication
- **RESTful APIs** - Comprehensive backend API
- **Database Schema** - Prisma ORM with PostgreSQL
- **Responsive Design** - Works on all devices
- **Professional UI** - Modern, clean interface
- **Real-time Updates** - Live data synchronization

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **Radix UI** - Accessible components

### Backend
- **Prisma** - Database ORM
- **PostgreSQL** - Primary database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Next.js API Routes** - Backend API

### Database Schema
- **Multi-tenant** - Tenant isolation
- **User Management** - Roles and permissions
- **Contact Management** - Customer data
- **Deal Pipeline** - Sales tracking
- **Activity Tracking** - Task management
- **Custom Fields** - Industry-specific data
- **Workflows** - Business process automation

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### 1. Clone the Repository
```bash
git clone <repository-url>
cd zenith-os
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/zenith_crm?schema=public"

# JWT Secret
JWT_SECRET="your-super-secret-jwt-key-here"

# Next.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-here"
```

### 4. Database Setup
```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed database with demo data
npm run db:seed
```

### 5. Start Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 🗄️ Database Schema

### Core Tables
- **tenants** - Multi-tenant organization data
- **users** - User accounts with roles
- **contacts** - Customer/lead information
- **companies** - Business entities
- **deals** - Sales pipeline management
- **activities** - Task and interaction tracking
- **custom_fields** - Industry-specific data fields
- **workflows** - Business process automation

### Relationships
- Each tenant has multiple users, contacts, deals, and activities
- Contacts can be associated with companies and deals
- Activities are linked to contacts, deals, and users
- Custom fields provide industry-specific data structure

## 🔐 Authentication

### User Roles
- **SUPER_ADMIN** - Full system access
- **ADMIN** - Tenant administration
- **MANAGER** - Team management
- **USER** - Standard user access
- **VIEWER** - Read-only access

### API Endpoints
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/change-password` - Change password

## 🎨 UI Components

### Professional Dashboard
- **Overview** - Key metrics and analytics
- **Contacts** - Customer management
- **Deals** - Sales pipeline
- **Activities** - Task management
- **Reports** - Performance analytics

### Industry Templates
- **Restoration** - Emergency response workflows
- **Healthcare** - Patient management systems
- **Logistics** - Fleet and delivery tracking
- **Real Estate** - Property and transaction management
- **FinTech** - Investment and portfolio management

## 📊 API Documentation

### Contacts API
```typescript
// Get all contacts
GET /api/contacts?page=1&limit=10&search=john&status=customer

// Create contact
POST /api/contacts
{
  "firstName": "John",
  "lastName": "Smith",
  "email": "john@example.com",
  "phone": "(555) 123-4567",
  "status": "LEAD"
}

// Update contact
PUT /api/contacts/[id]
{
  "firstName": "John",
  "lastName": "Smith",
  "status": "CUSTOMER"
}

// Delete contact
DELETE /api/contacts/[id]
```

### Deals API
```typescript
// Get all deals
GET /api/deals?page=1&limit=10&stage=proposal

// Create deal
POST /api/deals
{
  "title": "Water Damage Restoration",
  "value": 15000,
  "stage": "Proposal",
  "probability": 75,
  "contactId": "contact-id"
}
```

## 🚀 Deployment

### Production Setup
1. **Database** - Set up PostgreSQL production database
2. **Environment** - Configure production environment variables
3. **Build** - Run `npm run build`
4. **Deploy** - Deploy to your preferred platform (Vercel, AWS, etc.)

### Environment Variables
```env
DATABASE_URL="postgresql://user:pass@host:5432/db"
JWT_SECRET="production-secret-key"
NEXTAUTH_URL="https://your-domain.com"
```

## 📈 Performance

### Optimization Features
- **Database Indexing** - Optimized queries
- **Caching** - Redis for session management
- **CDN** - Static asset delivery
- **Lazy Loading** - Component-based loading
- **Pagination** - Efficient data loading

### Monitoring
- **Error Tracking** - Comprehensive error logging
- **Performance Metrics** - Response time monitoring
- **User Analytics** - Usage tracking
- **Database Monitoring** - Query performance

## 🔧 Customization

### Industry Templates
Each industry comes with pre-built:
- **Custom Fields** - Industry-specific data
- **Workflows** - Business process automation
- **Reports** - Performance metrics
- **Integrations** - Third-party connections

### Adding New Industries
1. Create industry template in `prisma/seed.ts`
2. Add custom fields and workflows
3. Update UI components
4. Test with demo data

## 📝 Development

### Project Structure
```
zenith-os/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── crm/               # CRM pages
│   └── login/             # Authentication
├── components/            # React components
├── contexts/              # React contexts
├── lib/                   # Utility functions
├── prisma/                # Database schema
└── public/                # Static assets
```

### Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema changes
npm run db:migrate  # Run migrations
npm run db:studio    # Open Prisma Studio
npm run db:seed      # Seed database
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is proprietary software. All rights reserved.

## 🆘 Support

For support and questions:
- **Email** - support@zenith.com
- **Documentation** - [docs.zenith.com](https://docs.zenith.com)
- **Issues** - GitHub Issues

## 🎯 Roadmap

### Phase 1 - Core CRM ✅
- [x] Multi-tenant architecture
- [x] User authentication
- [x] Contact management
- [x] Deal pipeline
- [x] Activity tracking

### Phase 2 - Industry Features 🚧
- [ ] Advanced workflows
- [ ] Custom integrations
- [ ] Mobile app
- [ ] Advanced analytics

### Phase 3 - Enterprise 🔮
- [ ] White-label customization
- [ ] Advanced security
- [ ] Enterprise integrations
- [ ] Global deployment

---

**Zenith OS** - The professional business platform for modern business. 🚀
