import ProtectedRoute from "@/components/protected-route"
import PortalLayout from "@/components/portal-layout"

export default function PortalWebsitePage() {
  return (
    <ProtectedRoute>
      <PortalLayout>
        <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Website Module</h1>
              <p className="text-gray-600">Manage your website and digital presence</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                Module Locked
              </div>
            </div>
          </div>

          {/* Website Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">W</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Website Status</h3>
                  <p className="text-sm text-gray-600">Not configured</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                This module is part of your business platform but requires customization for your industry.
              </p>
              <button className="w-full px-4 py-2 bg-gray-100 text-gray-400 rounded-lg cursor-not-allowed">
                Configure Website
              </button>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 font-semibold">D</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Domain Setup</h3>
                  <p className="text-sm text-gray-600">Not configured</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Connect your custom domain and configure DNS settings.
              </p>
              <button className="w-full px-4 py-2 bg-gray-100 text-gray-400 rounded-lg cursor-not-allowed">
                Setup Domain
              </button>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-purple-600 font-semibold">S</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">SEO & Analytics</h3>
                  <p className="text-sm text-gray-600">Not configured</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Configure search engine optimization and analytics tracking.
              </p>
              <button className="w-full px-4 py-2 bg-gray-100 text-gray-400 rounded-lg cursor-not-allowed">
                Configure SEO
              </button>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Website Module Ready for Customization</h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              This module is part of your business platform. Contact our team to customize it for your industry and branding needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Contact Development Team
              </button>
              <button className="px-6 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                View Documentation
              </button>
            </div>
          </div>
        </div>
      </PortalLayout>
    </ProtectedRoute>
  )
}
