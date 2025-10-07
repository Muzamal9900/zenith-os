import ProtectedRoute from "@/components/protected-route"
import PortalLayout from "@/components/portal-layout"
import DealsPage from "@/components/deals-page"

export default function PortalCRMDealsPage() {
  return (
    <ProtectedRoute>
      <PortalLayout>
        <DealsPage />
      </PortalLayout>
    </ProtectedRoute>
  )
}
