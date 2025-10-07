import ProtectedRoute from "@/components/protected-route"
import PortalLayout from "@/components/portal-layout"

export default function PortalIntegrationsPage() {
  return (
    <ProtectedRoute>
      <PortalLayout>
        <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Integrations</h1>
              <p className="text-gray-600">Connect your business platform with external services</p>
            </div>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              Add Integration
            </button>
          </div>

          {/* Integration Categories */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Marketing */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Marketing</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                      <span className="text-red-600 text-sm font-semibold">M</span>
                    </div>
                    <span className="font-medium text-gray-900">Mailchimp</span>
                  </div>
                  <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm">Connect</button>
                </div>
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 text-sm font-semibold">H</span>
                    </div>
                    <span className="font-medium text-gray-900">HubSpot</span>
                  </div>
                  <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm">Connect</button>
                </div>
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <span className="text-purple-600 text-sm font-semibold">S</span>
                    </div>
                    <span className="font-medium text-gray-900">SendGrid</span>
                  </div>
                  <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm">Connect</button>
                </div>
              </div>
            </div>

            {/* Analytics */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Analytics</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                      <span className="text-orange-600 text-sm font-semibold">G</span>
                    </div>
                    <span className="font-medium text-gray-900">Google Analytics</span>
                  </div>
                  <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm">Connect</button>
                </div>
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-green-600 text-sm font-semibold">M</span>
                    </div>
                    <span className="font-medium text-gray-900">Mixpanel</span>
                  </div>
                  <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm">Connect</button>
                </div>
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 text-sm font-semibold">A</span>
                    </div>
                    <span className="font-medium text-gray-900">Amplitude</span>
                  </div>
                  <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm">Connect</button>
                </div>
              </div>
            </div>

            {/* Payments */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Payments</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <span className="text-purple-600 text-sm font-semibold">S</span>
                    </div>
                    <span className="font-medium text-gray-900">Stripe</span>
                  </div>
                  <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm">Connect</button>
                </div>
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 text-sm font-semibold">P</span>
                    </div>
                    <span className="font-medium text-gray-900">PayPal</span>
                  </div>
                  <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm">Connect</button>
                </div>
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-green-600 text-sm font-semibold">S</span>
                    </div>
                    <span className="font-medium text-gray-900">Square</span>
                  </div>
                  <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm">Connect</button>
                </div>
              </div>
            </div>
          </div>

          {/* API Documentation */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">API Documentation</h3>
            <p className="text-gray-600 mb-4">
              Build custom integrations using our comprehensive API documentation.
            </p>
            <div className="flex gap-4">
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                View API Docs
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Download SDK
              </button>
            </div>
          </div>
        </div>
      </PortalLayout>
    </ProtectedRoute>
  )
}
