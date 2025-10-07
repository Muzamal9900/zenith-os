import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Suspense } from "react"
import { AuthProvider } from "@/contexts/auth-context"
import { CRMProvider } from "@/contexts/crm-context"
import { ToastProvider } from "@/components/ui/toast"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Zenith by Unite Group | White-Label SaaS business platform",
  description:
    "The foundational software framework for modern business. Launch faster, scale smarter, own your ecosystem.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} antialiased`}>
        <AuthProvider>
          <CRMProvider>
            <ToastProvider>
              <Suspense fallback={null}>{children}</Suspense>
            </ToastProvider>
          </CRMProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
