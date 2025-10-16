/**
 * Portal Dashboard - Main dashboard with CRM widgets
 * This page displays the CRM tools and widgets on the main dashboard
 */

import ProtectedRoute from "@/components/protected-route"
import PortalLayout from "@/components/portal-layout"
import CRMDashboardWidgets from "@/components/crm-dashboard-widgets"

export default function PortalDashboardPage() {
  return (
    <ProtectedRoute>
      <PortalLayout>
        <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-2 duration-300 bg-gray-900/50">
          <CRMDashboardWidgets />
        </div>
      </PortalLayout>
    </ProtectedRoute>
  )
}
