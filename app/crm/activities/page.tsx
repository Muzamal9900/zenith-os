import ProtectedRoute from "@/components/protected-route"
import CRMLayout from "@/components/crm-layout"
import ActivitiesPage from "@/components/activities-page"

export default function ActivitiesCRMPage() {
  return (
    <ProtectedRoute>
      <CRMLayout>
        <ActivitiesPage />
      </CRMLayout>
    </ProtectedRoute>
  )
}
