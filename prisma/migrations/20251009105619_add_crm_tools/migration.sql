-- CreateEnum
CREATE TYPE "CrmToolCategory" AS ENUM ('ANALYTICS', 'COMMUNICATION', 'MANAGEMENT', 'AUTOMATION', 'CUSTOM');

-- CreateEnum
CREATE TYPE "CrmToolSize" AS ENUM ('SMALL', 'MEDIUM', 'LARGE');

-- CreateTable
CREATE TABLE "crm_tools" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" "CrmToolCategory" NOT NULL,
    "size" "CrmToolSize" NOT NULL DEFAULT 'MEDIUM',
    "icon" TEXT NOT NULL DEFAULT 'Settings',
    "config" JSONB NOT NULL DEFAULT '{}',
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "onDashboard" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tenantId" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,

    CONSTRAINT "crm_tools_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "crm_tools" ADD CONSTRAINT "crm_tools_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "crm_tools" ADD CONSTRAINT "crm_tools_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
