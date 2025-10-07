import ProtectedRoute from "@/components/protected-route"
import CRMLayout from "@/components/crm-layout"
import SettingsPage from "@/components/settings-page"

export default function SettingsCRMPage() {
  return (
    <ProtectedRoute>
      <CRMLayout>
        <SettingsPage />
      </CRMLayout>
    </ProtectedRoute>
  )
}
