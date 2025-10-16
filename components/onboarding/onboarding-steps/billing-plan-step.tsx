"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreditCard, ArrowRight, ArrowLeft, CheckCircle, Star } from "lucide-react"
import { BillingPlanData } from "@/modules/onboarding/types"

interface BillingPlanStepProps {
  initialData?: Partial<BillingPlanData>
  onNext: (data: BillingPlanData) => void
  onBack?: () => void
  isLoading?: boolean
}

const billingPlans = [
  {
    id: "per-lead",
    name: "Per Lead",
    description: "Pay only for qualified leads you receive",
    price: "$5-25",
    unit: "per lead",
    features: [
      "Pay only for qualified leads",
      "No monthly commitments",
      "Perfect for testing new markets",
      "Scalable with your growth"
    ],
    recommended: false
  },
  {
    id: "per-job",
    name: "Per Job",
    description: "Pay for each completed job or project",
    price: "$50-500",
    unit: "per job",
    features: [
      "Pay per completed project",
      "Higher value transactions",
      "Ideal for service businesses",
      "Performance-based pricing"
    ],
    recommended: true
  },
  {
    id: "monthly-subscription",
    name: "Monthly Subscription",
    description: "Unlimited access with predictable monthly billing",
    price: "$99-999",
    unit: "per month",
    features: [
      "Unlimited leads and jobs",
      "Predictable monthly cost",
      "All features included",
      "Priority support"
    ],
    recommended: false
  }
]

export default function BillingPlanStep({ 
  initialData = {}, 
  onNext, 
  onBack,
  isLoading = false 
}: BillingPlanStepProps) {
  const [formData, setFormData] = useState<BillingPlanData>({
    planType: initialData.planType || "per-job",
    billingCycle: initialData.billingCycle || "monthly",
    customPricing: initialData.customPricing || {}
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.planType) {
      newErrors.planType = "Please select a billing plan"
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

  const handlePlanChange = (planType: string) => {
    setFormData(prev => ({
      ...prev,
      planType: planType as any,
      customPricing: {}
    }))
  }

  const handleCustomPricingChange = (field: string, value: string) => {
    const numericValue = parseFloat(value) || 0
    setFormData(prev => ({
      ...prev,
      customPricing: {
        ...prev.customPricing,
        [field]: numericValue
      }
    }))
  }

  const selectedPlan = billingPlans.find(plan => plan.id === formData.planType)

  return (
    <Card className="w-full max-w-8xl mx-auto bg-gray-800/50 border-gray-700">
      <CardHeader className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <CreditCard className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold text-white">Billing Plan</CardTitle>
        <CardDescription className="text-lg text-gray-400">
          Select your preferred monetization model.
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {errors.planType && (
            <div className="p-4 bg-red-900/30 border border-red-500/50 rounded-lg">
              <p className="text-sm text-red-400">{errors.planType}</p>
            </div>
          )}

          {/* Billing Plan Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Choose Your Billing Model</h3>
            
            <RadioGroup
              value={formData.planType}
              onValueChange={handlePlanChange}
              className="space-y-4 flex flex-wrap gap-4 justify-center items-center"
            >
              {billingPlans.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                    formData.planType === plan.id
                      ? "border-orange-500 bg-orange-900/30 shadow-lg"
                      : "border-gray-600 bg-gray-700/50 hover:border-gray-500 hover:bg-gray-700/70"
                  }`}
                >
                  {/* Recommended Badge */}
                  {plan.recommended && (
                    <div className="absolute -top-3 left-6 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      Recommended
                    </div>
                  )}

                  <div className="flex items-start gap-4">
                    <RadioGroupItem
                      value={plan.id}
                      id={plan.id}
                      className="mt-1"
                      disabled={isLoading}
                    />
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Label
                          htmlFor={plan.id}
                          className="text-lg font-semibold text-white cursor-pointer"
                        >
                          {plan.name}
                        </Label>
                        <div className="text-lg font-bold text-orange-400">
                          {plan.price}
                        </div>
                        <div className="text-sm text-gray-400">
                          {plan.unit}
                        </div>
                      </div>
                      
                      <p className="text-gray-400 mb-4">
                        {plan.description}
                      </p>

                      <ul className="space-y-2">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm text-gray-300">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Billing Cycle (for subscription plans) */}
          {formData.planType === "monthly-subscription" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Billing Cycle</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-gray-600 rounded-lg">
                  <RadioGroup
                    value={formData.billingCycle}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, billingCycle: value as any }))}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="monthly" id="monthly" />
                      <Label htmlFor="monthly" className="text-sm font-medium text-gray-300">
                        Monthly Billing
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yearly" id="yearly" />
                      <Label htmlFor="yearly" className="text-sm font-medium text-gray-300">
                        Yearly Billing (Save 20%)
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
          )}

          {/* Custom Pricing (Optional) */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Custom Pricing (Optional)</h3>
            <p className="text-sm text-gray-400">
              Set custom pricing for your specific needs. Leave blank to use default pricing.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {formData.planType === "per-lead" && (
                <div className="space-y-2">
                  <Label htmlFor="leadPrice" className="text-sm font-medium text-gray-300">
                    Lead Price ($)
                  </Label>
                  <Input
                    id="leadPrice"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="10.00"
                    value={formData.customPricing?.leadPrice || ""}
                    onChange={(e) => handleCustomPricingChange("leadPrice", e.target.value)}
                    className="w-full"
                    disabled={isLoading}
                  />
                </div>
              )}

              {formData.planType === "per-job" && (
                <div className="space-y-2">
                  <Label htmlFor="jobPrice" className="text-sm font-medium text-gray-300">
                    Job Price ($)
                  </Label>
                  <Input
                    id="jobPrice"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="100.00"
                    value={formData.customPricing?.jobPrice || ""}
                    onChange={(e) => handleCustomPricingChange("jobPrice", e.target.value)}
                    className="w-full"
                    disabled={isLoading}
                  />
                </div>
              )}

              {formData.planType === "monthly-subscription" && (
                <div className="space-y-2">
                  <Label htmlFor="monthlyPrice" className="text-sm font-medium text-gray-300">
                    Monthly Price ($)
                  </Label>
                  <Input
                    id="monthlyPrice"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="199.00"
                    value={formData.customPricing?.monthlyPrice || ""}
                    onChange={(e) => handleCustomPricingChange("monthlyPrice", e.target.value)}
                    className="w-full"
                    disabled={isLoading}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Plan Summary */}
          {selectedPlan && (
            <div className="p-6 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl">
              <h4 className="font-semibold text-orange-900 mb-3">Selected Plan Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-orange-700">Plan:</span>
                  <span className="font-medium text-orange-900">{selectedPlan.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-orange-700">Pricing:</span>
                  <span className="font-medium text-orange-900">
                    {formData.customPricing?.leadPrice || formData.customPricing?.jobPrice || formData.customPricing?.monthlyPrice 
                      ? `$${formData.customPricing?.leadPrice || formData.customPricing?.jobPrice || formData.customPricing?.monthlyPrice}`
                      : selectedPlan.price
                    }
                  </span>
                </div>
                {formData.planType === "monthly-subscription" && (
                  <div className="flex justify-between">
                    <span className="text-orange-700">Billing Cycle:</span>
                    <span className="font-medium text-orange-900 capitalize">{formData.billingCycle}</span>
                  </div>
                )}
              </div>
            </div>
          )}

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
              className="flex items-center gap-2 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 ml-auto"
            >
              {isLoading ? (
                "Processing..."
              ) : (
                <>
                  Complete Setup
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
