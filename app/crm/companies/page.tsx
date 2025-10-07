import ProtectedRoute from "@/components/protected-route"
import CRMLayout from "@/components/crm-layout"
import CompaniesPage from "@/components/companies-page"

export default function CRMCompaniesPage() {
  return (
    <ProtectedRoute>
      <CRMLayout>
        <CompaniesPage />
      </CRMLayout>
    </ProtectedRoute>
  )
}