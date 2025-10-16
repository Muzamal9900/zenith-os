"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Settings, ArrowRight, ArrowLeft } from "lucide-react"
import { SignUpData } from "@/modules/onboarding/types"

interface SignUpStepProps {
  initialData?: Partial<SignUpData>
  onNext: (data: SignUpData) => void
  onBack?: () => void
  isLoading?: boolean
}

const businessTypes = [
  "Consulting",
  "Marketing Agency", 
  "Web Development",
  "Design Studio",
  "Digital Marketing",
  "Content Creation",
  "E-commerce",
  "SaaS",
  "Other"
]

export default function SignUpStep({ 
  initialData = {}, 
  onNext, 
  onBack,
  isLoading = false 
}: SignUpStepProps) {
  const [formData, setFormData] = useState<SignUpData>({
    businessType: initialData.businessType || "",
    contactEmail: initialData.contactEmail || "",
    contactPhone: initialData.contactPhone || "",
    businessAddress: initialData.businessAddress || ""
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.businessType) {
      newErrors.businessType = "Business type is required"
    }

    if (!formData.contactEmail.trim()) {
      newErrors.contactEmail = "Contact email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
      newErrors.contactEmail = "Please enter a valid email address"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onNext(formData)
    }
  }

  const handleInputChange = (field: keyof SignUpData) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gray-800/50 border-gray-700">
      <CardHeader className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <Settings className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold text-white">Sign-Up</CardTitle>
        <CardDescription className="text-lg text-gray-400">
          Create your tenant account to get started.
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="businessType" className="text-sm font-medium text-gray-300">
                Business Type *
              </Label>
              <Select 
                value={formData.businessType} 
                onValueChange={(value) => handleInputChange("businessType")(value)}
                disabled={isLoading}
              >
                <SelectTrigger className={`w-full bg-gray-700/50 border-gray-600 text-white ${errors.businessType ? "border-red-500" : ""}`}>
                  <SelectValue placeholder="Select business type" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  {businessTypes.map((type) => (
                    <SelectItem key={type} value={type} className="text-white hover:bg-gray-700">
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.businessType && (
                <p className="text-sm text-red-400">{errors.businessType}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactEmail" className="text-sm font-medium text-gray-300">
                Contact Email *
              </Label>
              <Input
                id="contactEmail"
                type="email"
                placeholder="contact@yourbusiness.com"
                value={formData.contactEmail}
                onChange={(e) => handleInputChange("contactEmail")(e.target.value)}
                className={`w-full bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 ${errors.contactEmail ? "border-red-500" : ""}`}
                disabled={isLoading}
              />
              {errors.contactEmail && (
                <p className="text-sm text-red-400">{errors.contactEmail}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactPhone" className="text-sm font-medium text-gray-300">
                Contact Phone
              </Label>
              <Input
                id="contactPhone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={formData.contactPhone}
                onChange={(e) => handleInputChange("contactPhone")(e.target.value)}
                className="w-full bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="businessAddress" className="text-sm font-medium text-gray-300">
                Business Address
              </Label>
              <Textarea
                id="businessAddress"
                placeholder="Enter your business address"
                value={formData.businessAddress}
                onChange={(e) => handleInputChange("businessAddress")(e.target.value)}
                rows={3}
                className="w-full resize-none bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="flex justify-between pt-6">
            {onBack && (
              <Button
                type="button"
                variant="outline"
                onClick={onBack}
                disabled={isLoading}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            )}
            
            <Button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 ml-auto"
            >
              {isLoading ? (
                "Processing..."
              ) : (
                <>
                  Next Step
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
