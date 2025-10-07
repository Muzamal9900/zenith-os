"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Send, CheckCircle, ArrowRight, Building, Users, Target } from "lucide-react"
import SiteHeader from "@/components/site-header"
import Footer from "@/components/footer"

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in")
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = sectionRef.current?.querySelectorAll(".fade-in-element")
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsLoading(false)
    setIsSubmitted(true)
  }

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Get a response within 24 hours",
      value: "hello@zenith-os.com",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak with our team directly",
      value: "+1 (555) 123-4567",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Come see us in person",
      value: "San Francisco, CA",
      color: "from-green-500 to-emerald-500"
    }
  ]

  const benefits = [
    {
      icon: Building,
      title: "Industry Expertise",
      description: "Custom solutions for your specific industry needs"
    },
    {
      icon: Users,
      title: "Dedicated Support",
      description: "Personal account manager and technical support"
    },
    {
      icon: Target,
      title: "Proven Results",
      description: "Track record of successful implementations"
    }
  ]

  if (isSubmitted) {
    return (
      <main className="py-16 md:py-24 gradient-navy-purple min-h-screen flex items-center">
        <div className="container mx-auto max-w-4xl px-6 text-center">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-12">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6 animate-bounce" />
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Thank You!</h1>
            <p className="text-lg text-white/90 mb-8">
              We've received your request and will get back to you within 1 business day to schedule your personalized demo.
            </p>
            <Button
              onClick={() => setIsSubmitted(false)}
              className="bg-white text-purple-900 hover:bg-white/90 font-semibold px-8 py-6 text-base rounded-lg transition-all duration-300 hover:scale-105"
            >
              Send Another Request
            </Button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <>
      <SiteHeader />
      <main className="py-16 md:py-24 pt-32" ref={sectionRef}>
      {/* Hero Section */}
      <section className="gradient-navy-purple py-20 mb-16">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="text-center mb-16">
            <h1 className="fade-in-element text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              Let's Build Your{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                business platform
              </span>
            </h1>
            <p className="fade-in-element text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Tell us about your business goals and we'll show you how Zenith can be customized for your industry.
            </p>
          </div>

          {/* Contact Methods */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {contactMethods.map((method, index) => {
              const Icon = method.icon
              return (
                <div
                  key={method.title}
                  className="fade-in-element bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center hover:bg-white/15 transition-all duration-300 hover:scale-105"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${method.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">{method.title}</h3>
                  <p className="text-white/70 text-sm mb-3">{method.description}</p>
                  <p className="text-white/90 font-medium">{method.value}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <div className="container mx-auto max-w-6xl px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Form Section */}
          <div className="fade-in-element">
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Request Your Demo</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Get a personalized demonstration of how Zenith can be customized for your specific industry and business needs.
              </p>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6" aria-label="Contact form">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                      Full name *
            </label>
            <input
              id="fullName"
              name="fullName"
              required
                      className="w-full border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      placeholder="John Doe"
            />
          </div>
                  <div className="space-y-2">
                    <label htmlFor="workEmail" className="text-sm font-medium text-gray-700">
                      Work email *
            </label>
            <input
              id="workEmail"
              name="workEmail"
              type="email"
              required
                      className="w-full border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      placeholder="john@company.com"
            />
          </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-medium text-gray-700">
                    Company *
            </label>
            <input
              id="company"
              name="company"
              required
                    className="w-full border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    placeholder="Your Company Name"
            />
          </div>

                <div className="space-y-2">
                  <label htmlFor="industry" className="text-sm font-medium text-gray-700">
                    Industry
                  </label>
                  <select
                    id="industry"
                    name="industry"
                    className="w-full border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Select your industry</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="finance">Finance</option>
                    <option value="retail">Retail</option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="education">Education</option>
                    <option value="technology">Technology</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="goals" className="text-sm font-medium text-gray-700">
                    What are you looking to achieve? *
            </label>
            <textarea
              id="goals"
              name="goals"
                    rows={4}
              required
                    className="w-full border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    placeholder="Describe your business goals and how you envision using our business platform..."
            />
          </div>

                <Button
            type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Processing...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <Send className="w-5 h-5" />
                      <span>Request Demo</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  )}
                </Button>

                <p className="text-xs text-gray-500 text-center">
            By submitting this form you agree to our{" "}
                  <a className="underline hover:text-purple-600 transition-colors" href="/legal/privacy">
              Privacy Policy
            </a>{" "}
            and{" "}
                  <a className="underline hover:text-purple-600 transition-colors" href="/legal/terms">
              Terms of Service
            </a>
            .
          </p>
        </form>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="fade-in-element space-y-8" style={{ animationDelay: "300ms" }}>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Zenith?</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Our business platform is designed to adapt to any industry, providing you with the foundation to build your unique business ecosystem.
              </p>
            </div>

            <div className="space-y-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <div
                    key={benefit.title}
                    className="flex items-start gap-4 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-100 hover:shadow-lg transition-all duration-300"
                    style={{ animationDelay: `${(index + 1) * 150}ms` }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg mb-2">{benefit.title}</h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* CTA Card */}
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="text-purple-100 mb-6">
                Join hundreds of businesses that have transformed their operations with Zenith.
              </p>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  <span>Free consultation</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  <span>Custom demo</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  <span>No commitment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <Footer />
    </>
  )
}
