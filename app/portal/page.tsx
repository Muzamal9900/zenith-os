import ProtectedRoute from "@/components/protected-route"
import PortalLayout from "@/components/portal-layout"
import PortalDashboard from "@/components/portal-dashboard"

export default function PortalPage() {
  return (
    <ProtectedRoute>
      <PortalLayout>
        <PortalDashboard />
      </PortalLayout>
    </ProtectedRoute>
  )
}