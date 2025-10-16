"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Database, 
  Mail, 
  Lock, 
  User, 
  Building2, 
  Shield,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  Search,
  X
} from 'lucide-react'

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [tenantName, setTenantName] = useState('')
  const [industry, setIndustry] = useState('')
  const [industrySearch, setIndustrySearch] = useState('')
  const [showIndustryDropdown, setShowIndustryDropdown] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { user, login, register } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push('/portal')
    }
  }, [user, router])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('[data-industry-dropdown]')) {
        setShowIndustryDropdown(false)
      }
    }

    if (showIndustryDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showIndustryDropdown])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    const result = await login(email, password)
    
    if (result.success) {
      setSuccess('Login successful! Redirecting...')
      setTimeout(() => router.push('/portal'), 1000)
    } else {
      setError(result.error || 'Login failed')
    }
    
    setIsLoading(false)
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    const result = await register({
      email,
      password,
      firstName,
      lastName,
      tenantName,
      industry
    })
    
    if (result.success) {
      setSuccess('Registration successful! Redirecting...')
      setTimeout(() => router.push('/onboarding'), 1000)
    } else {
      setError(result.error || 'Registration failed')
    }
    
    setIsLoading(false)
  }

  const industries = [
    { value: 'restoration', label: 'Restoration' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'logistics', label: 'Logistics' },
    { value: 'real-estate', label: 'Real Estate' },
    { value: 'fintech', label: 'FinTech' },
    { value: 'education', label: 'Education' },
    { value: 'retail', label: 'Retail' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'technology', label: 'Technology' },
    { value: 'consulting', label: 'Consulting' },
    { value: 'legal', label: 'Legal Services' },
    { value: 'marketing', label: 'Marketing & Advertising' },
    { value: 'construction', label: 'Construction' },
    { value: 'automotive', label: 'Automotive' },
    { value: 'food-beverage', label: 'Food & Beverage' },
    { value: 'hospitality', label: 'Hospitality' },
    { value: 'nonprofit', label: 'Non-Profit' },
    { value: 'government', label: 'Government' },
    { value: 'other', label: 'Other' }
  ]

  const filteredIndustries = industries.filter(industry =>
    industry.label.toLowerCase().includes(industrySearch.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">


        <Card className="backdrop-blur-md bg-white/10 border-white/20">
          <CardHeader>
            <CardTitle className="text-white text-center">Welcome to Zenith</CardTitle>
            <CardDescription className="text-purple-200 text-center">
              {isLogin ? 'Sign in to your account' : 'Create your account'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={isLogin ? 'login' : 'register'} onValueChange={(value) => setIsLogin(value === 'login')}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="text-white">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-300"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="text-white">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="login-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-gray-300"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Signing in...</span>
                      </div>
                    ) : (
                      'Sign In'
                    )}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-firstName" className="text-white">First Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="register-firstName"
                          type="text"
                          placeholder="First name"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-300"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-lastName" className="text-white">Last Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="register-lastName"
                          type="text"
                          placeholder="Last name"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-300"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-email" className="text-white">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-300"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-password" className="text-white">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="register-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-gray-300"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-tenantName" className="text-white">Company Name</Label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="register-tenantName"
                        type="text"
                        placeholder="Your company name"
                        value={tenantName}
                        onChange={(e) => setTenantName(e.target.value)}
                        className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-300"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-industry" className="text-white">Industry</Label>
                    <div className="relative" data-industry-dropdown>
                      <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="register-industry"
                        type="text"
                        placeholder="Search or type your industry"
                        value={industrySearch}
                        onChange={(e) => {
                          setIndustrySearch(e.target.value)
                          setIndustry(e.target.value.toLowerCase().replace(/\s+/g, '-'))
                          setShowIndustryDropdown(true)
                        }}
                        onFocus={() => setShowIndustryDropdown(true)}
                        className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-gray-300"
                        required
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                        {industrySearch && (
                          <button
                            type="button"
                            onClick={() => {
                              setIndustrySearch('')
                              setIndustry('')
                              setShowIndustryDropdown(false)
                            }}
                            className="text-gray-400 hover:text-gray-300 p-1"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => setShowIndustryDropdown(!showIndustryDropdown)}
                          className="text-gray-400 hover:text-gray-300 p-1"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </button>
                      </div>
                      
                      {/* Dropdown */}
                      {showIndustryDropdown && (
                        <div className="absolute z-50 w-full mt-1 bg-white/95 backdrop-blur-md border border-white/20 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                          {filteredIndustries.length > 0 ? (
                            filteredIndustries.map((ind) => (
                              <button
                                key={ind.value}
                                type="button"
                                onClick={() => {
                                  setIndustry(ind.value)
                                  setIndustrySearch(ind.label)
                                  setShowIndustryDropdown(false)
                                }}
                                className="w-full px-4 py-3 text-left text-gray-900 hover:bg-purple-50 transition-colors flex items-center gap-3"
                              >
                                <Shield className="w-4 h-4 text-purple-600" />
                                {ind.label}
                              </button>
                            ))
                          ) : (
                            <div className="px-4 py-3 text-gray-500 text-sm">
                              No industries found. Type to add custom industry.
                            </div>
                          )}
                          
                          {/* Custom industry option */}
                          {industrySearch && !industries.find(ind => ind.label.toLowerCase() === industrySearch.toLowerCase()) && (
                            <button
                              type="button"
                              onClick={() => {
                                setIndustry(industrySearch.toLowerCase().replace(/\s+/g, '-'))
                                setShowIndustryDropdown(false)
                              }}
                              className="w-full px-4 py-3 text-left text-gray-900 hover:bg-purple-50 transition-colors flex items-center gap-3 border-t border-gray-200"
                            >
                              <Search className="w-4 h-4 text-green-600" />
                              Add "{industrySearch}" as custom industry
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-purple-200 mt-1">
                      Search from popular industries or type your own custom industry
                    </p>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Creating account...</span>
                      </div>
                    ) : (
                      'Create Account'
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>


            {/* Error/Success Messages */}
            {error && (
              <Alert className="mt-4 bg-red-500/10 border-red-500/20">
                <AlertCircle className="h-4 w-4 text-red-400" />
                <AlertDescription className="text-red-200">{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="mt-4 bg-green-500/10 border-green-500/20">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <AlertDescription className="text-green-200">{success}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
