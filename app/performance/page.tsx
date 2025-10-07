import PerformanceOptimizer from "@/components/performance-optimizer"
import ProtectedRoute from "@/components/protected-route"
import CRMLayout from "@/components/crm-layout"

export default function PerformancePage() {
  return (
    <ProtectedRoute>
      <CRMLayout>
        <PerformanceOptimizer />
      </CRMLayout>
    </ProtectedRoute>
  )
}
