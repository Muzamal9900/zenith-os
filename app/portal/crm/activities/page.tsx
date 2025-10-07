import ProtectedRoute from "@/components/protected-route"
import PortalLayout from "@/components/portal-layout"
import ActivitiesPage from "@/components/activities-page"

export default function PortalCRMActivitiesPage() {
  return (
    <ProtectedRoute>
      <PortalLayout>
        <ActivitiesPage />
      </PortalLayout>
    </ProtectedRoute>
  )
}
