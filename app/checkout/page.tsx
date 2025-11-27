"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ArrowLeft, CreditCard, Shield, Lock } from "lucide-react"
import Link from "next/link"

interface PlanDetails {
  name: string
  price: string
  setupFee?: string
  description: string
  features: string[]
  isPopular?: boolean
}

const plans: Record<string, PlanDetails> = {
  premium: {
    name: "Premium",
    price: "$19.99/month",
    description: "Full AI-powered immigration assistance",
    features: [
      "Full AI legal assistant chat",
      "AI auto-fill for uploads",
      "Step-by-step wizard builder",
      "Pre-filled PDF downloads",
      "Save work, return anytime",
      "Personal dashboard",
      "Email/PDF output",
      "Priority support",
    ],
    isPopular: true,
  },
  "standard-white-label": {
    name: "Standard White Label",
    price: "$249/month",
    setupFee: "$600 setup fee",
    description: "Perfect for solo practitioners",
    features: [
      "Runs on your main domain",
      "Solo or small firm branding",
      "Same premium features for clients",
      "Basic usage tracking",
      "Standard onboarding",
      "Basic support",
    ],
  },
  "pro-white-label": {
    name: "Pro White Label",
    price: "$499/month",
    setupFee: "$600 setup fee",
    description: "For growing practices",
    features: [
      "Fully branded for the firm",
      "Runs on your domain/subdomain",
      "Admin dashboard for firm",
      "3-5 firm staff logins",
      "Same AI + all premium features",
      "Higher usage limit",
      "Priority support & onboarding",
    ],
    isPopular: true,
  },
}

export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const planId = searchParams.get("plan") || "premium"
  const plan = plans[planId]

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    company: "",
    phone: "",
  })

  const [isProcessing, setIsProcessing] = useState(false)
  const [paypalError, setPaypalError] = useState<string | null>(null)
  const scriptRef = useRef<HTMLScriptElement | null>(null)

  useEffect(() => {
    // PayPal SDK integration
    // The PAYPAL_CLIENT_ID should be set in environment variables for production
    const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
    
    if (!paypalClientId) {
      setPaypalError("Payment system is being configured. Please contact support or try again later.")
      return
    }
    
    const script = document.createElement("script")
    script.src = `https://www.paypal.com/sdk/js?client-id=${paypalClientId}&vault=true&intent=subscription`
    script.async = true
    script.onerror = () => {
      setPaypalError("Failed to load payment system. Please try again later.")
    }
    document.body.appendChild(script)
    scriptRef.current = script

    return () => {
      if (scriptRef.current && document.body.contains(scriptRef.current)) {
        document.body.removeChild(scriptRef.current)
      }
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handlePayPalPayment = () => {
    if (paypalError) {
      alert(paypalError)
      return
    }
    
    setIsProcessing(true)

    // PayPal subscription creation
    // In production, this will use the PayPal SDK to create and process subscriptions
    // The PayPal buttons should render once the SDK is loaded
    // Check if PayPal SDK is loaded on the window object
    const windowWithPaypal = window as typeof window & { paypal?: unknown }
    if (typeof window !== "undefined" && windowWithPaypal.paypal) {
      // PayPal SDK is loaded, subscription will be handled by PayPal buttons
      setIsProcessing(false)
    } else {
      setIsProcessing(false)
      alert("Payment system is initializing. Please wait a moment and try again.")
    }
  }

  if (!plan) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Plan not found</h1>
          <Button asChild>
            <Link href="/pricing">Back to Pricing</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/pricing">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Pricing
              </Link>
            </Button>
            <div>
              <h1 className="text-xl font-semibold">Checkout</h1>
              <p className="text-sm text-gray-600">Complete your subscription</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-green-500" />
            <span className="text-sm text-gray-600">Secure Checkout</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Plan Summary */}
          <div>
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    {plan.name}
                    {plan.isPopular && <Badge className="ml-2 bg-blue-500">Most Popular</Badge>}
                  </CardTitle>
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="text-3xl font-bold text-blue-600">{plan.price}</div>
                  {plan.setupFee && <div className="text-sm text-gray-600">{plan.setupFee}</div>}
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">What's included:</h4>
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {planId === "premium" && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">🎉 7-Day Free Trial</h4>
                    <p className="text-sm text-blue-800">
                      Try all premium features free for 7 days. Cancel anytime during the trial period with no charges.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Security Features */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lock className="h-5 w-5 mr-2" />
                  Secure & Trusted
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>256-bit SSL encryption</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>PCI DSS compliant</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Cancel anytime</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>30-day money-back guarantee</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Payment Information
                </CardTitle>
                <CardDescription>Enter your details to complete your subscription</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {planId.includes("white-label") && (
                    <>
                      <div>
                        <Label htmlFor="company">Law Firm Name</Label>
                        <Input
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </>
                  )}

                  {/* PayPal Payment Button */}
                  <div className="mt-6">
                    {paypalError ? (
                      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-4">
                        <p className="text-yellow-800 text-sm">{paypalError}</p>
                        <p className="text-yellow-700 text-xs mt-2">
                          Please contact us at support@papertrailassassin.com for assistance.
                        </p>
                      </div>
                    ) : null}
                    <Button
                      type="button"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                      onClick={handlePayPalPayment}
                      disabled={isProcessing || !!paypalError}
                    >
                      {isProcessing ? (
                        "Processing..."
                      ) : paypalError ? (
                        "Payment Unavailable"
                      ) : (
                        <>
                          Pay with PayPal - {plan.price}
                          {plan.setupFee && ` + ${plan.setupFee}`}
                        </>
                      )}
                    </Button>

                    <div className="mt-4 text-center">
                      <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                        <span>Powered by PayPal</span>
                        <span>•</span>
                        <span>Secure payments</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 text-xs text-gray-500 text-center">
                    By completing this purchase, you agree to our{" "}
                    <Link href="/terms" className="text-blue-600 hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-blue-600 hover:underline">
                      Privacy Policy
                    </Link>
                    .
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Contact Support */}
            <Card className="mt-6">
              <CardContent className="p-4">
                <div className="text-center">
                  <h4 className="font-semibold mb-2">Need Help?</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Our team is here to help with any questions about your subscription.
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/contact">Contact Support</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
