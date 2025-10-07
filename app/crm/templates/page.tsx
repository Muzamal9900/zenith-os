import IndustryTemplates from "@/components/industry-templates"
import ProtectedRoute from "@/components/protected-route"
import CRMLayout from "@/components/crm-layout"

export default function CRMTemplatesPage() {
  return (
    <ProtectedRoute>
      <CRMLayout>
        <IndustryTemplates />
      </CRMLayout>
    </ProtectedRoute>
  )
}
