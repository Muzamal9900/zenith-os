import ProtectedRoute from "@/components/protected-route"
import CRMLayout from "@/components/crm-layout"
import DealsPage from "@/components/deals-page"

export default function DealsCRMPage() {
  return (
    <ProtectedRoute>
      <CRMLayout>
        <DealsPage />
      </CRMLayout>
    </ProtectedRoute>
  )
}
