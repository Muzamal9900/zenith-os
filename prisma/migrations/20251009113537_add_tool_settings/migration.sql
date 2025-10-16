/*
  Warnings:

  - You are about to drop the `crm_tools` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "crm_tools" DROP CONSTRAINT "crm_tools_createdById_fkey";

-- DropForeignKey
ALTER TABLE "crm_tools" DROP CONSTRAINT "crm_tools_tenantId_fkey";

-- DropTable
DROP TABLE "crm_tools";

-- DropEnum
DROP TYPE "CrmToolCategory";

-- DropEnum
DROP TYPE "CrmToolSize";

-- CreateTable
CREATE TABLE "tool_settings" (
    "id" TEXT NOT NULL,
    "toolId" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "onDashboard" BOOLEAN NOT NULL DEFAULT false,
    "settings" JSONB NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tool_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_tools" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "size" TEXT NOT NULL DEFAULT 'medium',
    "settings" JSONB NOT NULL DEFAULT '{}',
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "onDashboard" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_tools_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tool_settings_toolId_key" ON "tool_settings"("toolId");
