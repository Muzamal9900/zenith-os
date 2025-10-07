import { Building2 } from "lucide-react"

export default function Footer() {
  const links = {
    company: [
      { name: "About", href: "/about" },
      { name: "Contact", href: "/contact" },
    ],
    resources: [
      { name: "Documentation", href: "/docs" },
      { name: "Technical Overview", href: "/docs#technical-overview" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/legal/privacy" },
      { name: "Terms of Service", href: "/legal/terms" },
    ],
  }

  return (
    <footer className="gradient-charcoal-black py-16">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row gap-12  flex-1 justify-between mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 gradient-purple-magenta rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Zenith</h3>
                <p className="text-white/60 text-sm">by Unite Group</p>
              </div>
            </div>
            <p className="text-white/70 text-sm mb-4 max-w-md leading-relaxed">
              The business platform for Modern Business
            </p>
            <p className="text-white/50 text-xs">A foundational software framework for enterprises worldwide.</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {links.company.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-white/70 hover:text-white text-sm transition-colors duration-200">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              {links.resources.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-white/70 hover:text-white text-sm transition-colors duration-200">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              {links.legal.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-white/70 hover:text-white text-sm transition-colors duration-200">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-sm">© {new Date().getFullYear()} Unite Group. All rights reserved.</p>
          <div className="flex gap-6">
            {links.legal.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-white/50 hover:text-white/70 text-xs transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
