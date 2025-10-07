import ProtectedRoute from "@/components/protected-route"
import CRMLayout from "@/components/crm-layout"
import ReportsPage from "@/components/reports-page"

export default function CRMReportsPage() {
  return (
    <ProtectedRoute>
      <CRMLayout>
        <ReportsPage />
      </CRMLayout>
    </ProtectedRoute>
  )
}