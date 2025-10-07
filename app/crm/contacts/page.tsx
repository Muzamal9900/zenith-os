import ProtectedRoute from "@/components/protected-route"
import CRMLayout from "@/components/crm-layout"
import ContactsPage from "@/components/contacts-page"

export default function ContactsCRMPage() {
  return (
    <ProtectedRoute>
      <CRMLayout>
        <ContactsPage />
      </CRMLayout>
    </ProtectedRoute>
  )
}
