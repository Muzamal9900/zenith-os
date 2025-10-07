import ProtectedRoute from "@/components/protected-route"
import PortalLayout from "@/components/portal-layout"
import ReportsPage from "@/components/reports-page"

export default function PortalCRMReportsPage() {
  return (
    <ProtectedRoute>
      <PortalLayout>
        <ReportsPage />
      </PortalLayout>
    </ProtectedRoute>
  )
}
