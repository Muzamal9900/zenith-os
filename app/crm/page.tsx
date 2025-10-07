import FunctionalCRMDashboard from "@/components/functional-crm-dashboard"
import ProtectedRoute from "@/components/protected-route"
import CRMLayout from "@/components/crm-layout"

export default function CRMPage() {
  return (
    <ProtectedRoute>
      <CRMLayout>
        <FunctionalCRMDashboard />
      </CRMLayout>
    </ProtectedRoute>
  )
}