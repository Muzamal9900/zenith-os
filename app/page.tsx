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
    <>
      <SiteHeader />
      <main className="min-h-screen pt-16">
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
    </>
  )
}
