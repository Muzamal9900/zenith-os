import ProtectedRoute from "@/components/protected-route"
import PortalLayout from "@/components/portal-layout"
import ContactsPage from "@/components/contacts-page"

export default function PortalCRMContactsPage() {
  return (
    <ProtectedRoute>
      <PortalLayout>
        <ContactsPage />
      </PortalLayout>
    </ProtectedRoute>
  )
}
