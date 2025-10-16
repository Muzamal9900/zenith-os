/**
 * MAF System Page - Demonstrates the Modular Application Framework
 * This page shows the new architecture in action
 */

import dynamic from 'next/dynamic'
import SiteHeader from "@/components/site-header"
import Footer from "@/components/footer"

const MAFDashboard = dynamic(() => import("@/components/maf-dashboard"), { ssr: false })

export default function MAFPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen pt-16 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Modular Application Framework
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              Experience the power of Zenith OS as a true Modular Application Framework. 
              The core system never changes - only modules are added or updated from our library.
            </p>
          </div>
          
          <MAFDashboard />
        </div>
      </main>
      <Footer />
    </>
  )
}
