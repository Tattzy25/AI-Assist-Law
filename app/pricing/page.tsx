import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, X, ArrowLeft, Sparkles } from "lucide-react"
import Link from "next/link"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
      {/* Header */}
      <header className="border-b bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 backdrop-blur-sm sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-white">Pricing</span>
            </div>
          </div>
          <Button className="bg-white/20 hover:bg-white/30 text-white border-white/30" asChild>
            <Link href="/dashboard">Start Free Trial</Link>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="container mx-auto text-center max-w-4xl relative z-10">
          <Badge className="mb-6 bg-gradient-to-r from-green-400 to-emerald-500 text-white hover:from-green-500 hover:to-emerald-600 text-lg px-6 py-3 shadow-lg">
            🚀 Join 50,000+ People Getting Immigration Help
          </Badge>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent mb-8 leading-tight">
            Simple, Transparent Pricing
          </h1>
          <p className="text-2xl text-gray-700 mb-12 leading-relaxed">
            Start free, upgrade when you need more. No hidden fees, no surprises.
          </p>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-purple-300 to-blue-300 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-300 to-cyan-300 rounded-full opacity-20 animate-pulse"></div>
        </div>
      </section>

      {/* Main Pricing Tiers */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
            {/* Free Tier */}
            <Card className="border-0 bg-gradient-to-br from-white to-gray-50 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent">
                  Free
                </CardTitle>
                <div className="text-6xl font-bold bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent">
                  $0
                </div>
                <CardDescription className="text-lg text-gray-600">Perfect for exploring</CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                    <span className="text-lg">Helpful legal docs & templates</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                    <span className="text-lg">Download blank forms</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                    <span className="text-lg">Upload own docs (manual only)</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                    <span className="text-lg">Basic help articles</span>
                  </li>
                  <li className="flex items-center">
                    <X className="h-6 w-6 text-gray-400 mr-3" />
                    <span className="text-lg text-gray-500">No AI chat assistant</span>
                  </li>
                  <li className="flex items-center">
                    <X className="h-6 w-6 text-gray-400 mr-3" />
                    <span className="text-lg text-gray-500">No AI auto-fill</span>
                  </li>
                </ul>
                <Button
                  className="w-full text-lg py-6 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white shadow-lg"
                  asChild
                >
                  <Link href="/dashboard">Get Started Free</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Premium Tier */}
            <Card className="border-0 bg-gradient-to-br from-blue-50 to-purple-50 shadow-2xl relative transform scale-105">
              <Badge className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-lg px-6 py-2">
                Most Popular
              </Badge>
              <CardHeader className="text-center pt-8">
                <CardTitle className="text-3xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Premium
                </CardTitle>
                <div className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  $19.99<span className="text-2xl">/mo</span>
                </div>
                <CardDescription className="text-lg text-gray-600">For serious applicants</CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                    <span className="text-lg">
                      <strong>Full AI legal assistant chat</strong>
                    </span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                    <span className="text-lg">
                      <strong>AI auto-fill for uploads</strong>
                    </span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                    <span className="text-lg">
                      <strong>Step-by-step wizard builder</strong>
                    </span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                    <span className="text-lg">
                      <strong>Pre-filled PDF downloads</strong>
                    </span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                    <span className="text-lg">
                      <strong>Save work, return anytime</strong>
                    </span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                    <span className="text-lg">
                      <strong>Personal dashboard</strong>
                    </span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                    <span className="text-lg">
                      <strong>Email/PDF output</strong>
                    </span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                    <span className="text-lg">Priority support</span>
                  </li>
                </ul>
                <Button
                  className="w-full text-lg py-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-xl"
                  asChild
                >
                  <Link href="/checkout?plan=premium">
                    <Sparkles className="h-5 w-5 mr-2" />
                    Start Premium Trial
                  </Link>
                </Button>
                <p className="text-center text-gray-500 mt-3">7-day free trial • Cancel anytime</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 via-purple-50/30 to-blue-50/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <Card className="border-0 bg-gradient-to-br from-white to-blue-50/50 shadow-xl hover:shadow-2xl transition-all">
              <CardContent className="p-8">
                <h3 className="font-bold text-xl mb-3 text-gray-800">Can I cancel anytime?</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Yes, you can cancel your subscription at any time with just one click. No long-term contracts, no
                  cancellation fees, no questions asked. Your access continues until the end of your current billing
                  period.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-white to-purple-50/50 shadow-xl hover:shadow-2xl transition-all">
              <CardContent className="p-8">
                <h3 className="font-bold text-xl mb-3 text-gray-800">Do you offer refunds?</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  We offer a 30-day money-back guarantee for all paid plans. If you're not completely satisfied with our
                  service, we'll refund your payment in full. For white-label plans, setup fees are refundable within
                  the first 14 days.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-white to-green-50/50 shadow-xl hover:shadow-2xl transition-all">
              <CardContent className="p-8">
                <h3 className="font-bold text-xl mb-3 text-gray-800">Is my data secure?</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Absolutely. We use bank-level 256-bit SSL encryption and are fully compliant with GDPR, CCPA, and
                  other privacy regulations. Your documents and personal information are stored securely and never
                  shared with third parties. We're SOC 2 Type II certified.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-white to-orange-50/50 shadow-xl hover:shadow-2xl transition-all">
              <CardContent className="p-8">
                <h3 className="font-bold text-xl mb-3 text-gray-800">What forms do you support?</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  We support 50+ USCIS forms including I-485 (Green Card), I-130 (Family Petition), I-140 (Employment),
                  N-400 (Citizenship), I-765 (Work Authorization), I-131 (Travel Document), I-589 (Asylum), I-821D
                  (DACA), and many more. New forms are added regularly based on user demand.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-white to-pink-50/50 shadow-xl hover:shadow-2xl transition-all">
              <CardContent className="p-8">
                <h3 className="font-bold text-xl mb-3 text-gray-800">How does the white-label API pricing work?</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  You have two options: bring your own API key (same monthly price, unlimited usage based on your
                  limits) or use our infrastructure at $0.40 per 1,000 characters sent and $0.80 per 1,000 characters
                  received. Most firms save money by using their own API keys for high-volume usage.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-white to-cyan-50/50 shadow-xl hover:shadow-2xl transition-all">
              <CardContent className="p-8">
                <h3 className="font-bold text-xl mb-3 text-gray-800">What's included in the lifetime deal?</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  The lifetime license includes everything in our Pro white-label plan forever: fully branded platform,
                  unlimited clients, all AI features, priority support, future updates, dedicated account manager, and
                  API access. No monthly fees ever. Limited to 50 licenses total.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
        <div className="container mx-auto text-center max-w-4xl relative z-10">
          <h2 className="text-5xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-2xl mb-12 text-blue-100">
            Join thousands of people who got approved faster with our AI assistant
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              className="text-xl px-12 py-6 bg-white text-purple-600 hover:bg-gray-100 shadow-xl transform hover:scale-105 transition-all"
              asChild
            >
              <Link href="/dashboard">
                <Sparkles className="h-6 w-6 mr-3" />
                Start Free Trial →
              </Link>
            </Button>
            <Button
              size="lg"
              className="text-xl px-12 py-6 border-2 border-white text-white hover:bg-white hover:text-purple-600 bg-transparent shadow-xl transform hover:scale-105 transition-all"
              asChild
            >
              <Link href="/ai-chat">Try AI Assistant →</Link>
            </Button>
          </div>
        </div>

        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-20 animate-pulse"></div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-purple-900 to-blue-900 text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <p className="text-gray-300">&copy; 2024 Paper Trail Assassin. All rights reserved.</p>
          <div className="flex justify-center space-x-6 mt-4">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/dashboard" className="hover:text-white transition-colors">
              Dashboard
            </Link>
            <Link href="/ai-chat" className="hover:text-white transition-colors">
              AI Assistant
            </Link>
            <Link href="/white-label" className="hover:text-white transition-colors">
              White Label
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
