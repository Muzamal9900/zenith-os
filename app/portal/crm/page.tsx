import ProtectedRoute from "@/components/protected-route"
import PortalLayout from "@/components/portal-layout"
import FunctionalCRMDashboard from "@/components/functional-crm-dashboard"

export default function PortalCRMPage() {
  return (
    <ProtectedRoute>
      <PortalLayout>
        <FunctionalCRMDashboard />
      </PortalLayout>
    </ProtectedRoute>
  )
}
