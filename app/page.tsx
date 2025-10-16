import dynamic from 'next/dynamic'
import SiteHeader from "@/components/site-header"
import Footer from "@/components/footer"

const HeroSection = dynamic(() => import("@/components/hero-section"), { ssr: false })
const ProblemSection = dynamic(() => import("@/components/problem-section"), { ssr: false })
const OperatingSystemSection = dynamic(() => import("@/components/operating-system-section"), { ssr: false })
const InteractiveOSDemo = dynamic(() => import("@/components/interactive-os-demo"), { ssr: false })
const CRMDemo = dynamic(() => import("@/components/crm-demo"), { ssr: false })
const ThreeModules = dynamic(() => import("@/components/three-modules"), { ssr: false })
const ClientPathways = dynamic(() => import("@/components/client-pathways"), { ssr: false })
const WhiteLabelShowcase = dynamic(() => import("@/components/white-label-showcase"), { ssr: false })
const TechnicalExcellence = dynamic(() => import("@/components/technical-excellence"), { ssr: false })
const CTASection = dynamic(() => import("@/components/cta-section"), { ssr: false })

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Elegant Global Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(120,119,198,0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(59,130,246,0.03),transparent_50%)]" />
        
        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px'
          }} />
        </div>
      </div>
      
      <SiteHeader />
      <main className="relative min-h-screen pt-16">
        <HeroSection />
        <ProblemSection />
        <OperatingSystemSection />
        <InteractiveOSDemo />
        <CRMDemo />
        <ThreeModules />
        <ClientPathways />
        <WhiteLabelShowcase />
        <TechnicalExcellence />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
