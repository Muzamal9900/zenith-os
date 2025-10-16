import ProtectedRoute from "@/components/protected-route"
import PortalLayout from "@/components/portal-layout"
import CRMTools from "@/components/crm-tools"

export default function PortalCRMPage() {
  return (
    <ProtectedRoute>
      <PortalLayout>
        <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-2 duration-300">

          {/* CRM Tools Section */}
          <CRMTools />

          {/* MAF System Integration */}
          <div className="bg-gray-800/50 p-6 rounded-xl shadow-sm border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Modular Application Framework</h3>
            <p className="text-gray-400 mb-4">
              The CRM functionality is now available as a module in the Zenith OS MAF system. 
              Access the full CRM features through the modular framework.
            </p>
            <div className="flex gap-4">
              <a href="/maf" className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                Access MAF System
              </a>
              <button className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors">
                View Module Docs
              </button>
            </div>
          </div>
        </div>
      </PortalLayout>
    </ProtectedRoute>
  )
}
