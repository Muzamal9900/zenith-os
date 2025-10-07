import ProtectedRoute from "@/components/protected-route"
import PortalLayout from "@/components/portal-layout"
import CompaniesPage from "@/components/companies-page"

export default function PortalCRMCompaniesPage() {
  return (
    <ProtectedRoute>
      <PortalLayout>
        <CompaniesPage />
      </PortalLayout>
    </ProtectedRoute>
  )
}
