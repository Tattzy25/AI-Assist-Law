import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  CheckCircle,
  Building,
  Zap,
  Users,
  DollarSign,
  BarChart3,
  Shield,
  Palette,
  ArrowRight,
  Star,
  Sparkles,
  Home,
  FileText,
  CreditCard,
  MessageSquare,
} from "lucide-react"
import Link from "next/link"

export default function WhiteLabelPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg">
                <Building className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Paper Trail Assassin
              </span>
            </Link>

            <nav className="hidden md:flex items-center space-x-6">
              <Link
                href="/"
                className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors"
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
              <Link
                href="/forms"
                className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors"
              >
                <FileText className="h-4 w-4" />
                <span>Forms</span>
              </Link>
              <Link
                href="/pricing"
                className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors"
              >
                <CreditCard className="h-4 w-4" />
                <span>Pricing</span>
              </Link>
              <Link href="/white-label" className="flex items-center space-x-2 text-purple-600 font-semibold">
                <Building className="h-4 w-4" />
                <span>White Label</span>
              </Link>
              <Link
                href="/ai-chat"
                className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors"
              >
                <MessageSquare className="h-4 w-4" />
                <span>AI Chat</span>
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
              asChild
            >
              <Link href="#contact">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="container mx-auto text-center max-w-4xl relative z-10">
          <Badge className="mb-6 bg-gradient-to-r from-purple-400 to-pink-500 text-white hover:from-purple-500 hover:to-pink-600 text-lg px-6 py-3 shadow-lg">
            🏢 For Law Firms & Legal Professionals
          </Badge>
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent mb-8 leading-tight">
            Launch Your Own
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              {" "}
              AI Immigration Platform
            </span>
          </h1>
          <p className="text-2xl text-gray-700 mb-12 leading-relaxed">
            Get our complete immigration AI assistant platform, fully branded as your own. Start generating recurring
            revenue from day one with our proven technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              className="text-xl px-12 py-6 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-xl transform hover:scale-105 transition-all"
              asChild
            >
              <Link href="#contact">
                <Sparkles className="h-6 w-6 mr-3" />
                Schedule Demo
              </Link>
            </Button>
            <Button
              size="lg"
              className="text-xl px-12 py-6 border-2 border-purple-500 text-purple-600 hover:bg-purple-50 bg-transparent shadow-xl transform hover:scale-105 transition-all"
              asChild
            >
              <Link href="#pricing">View Pricing</Link>
            </Button>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-purple-300 to-blue-300 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-300 to-cyan-300 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-pink-200 to-purple-200 rounded-full opacity-10 animate-pulse"></div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4 bg-gradient-to-br from-white via-purple-50/30 to-blue-50/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
              Why Choose White Label?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Launch faster, reduce costs, and focus on what you do best - serving clients
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 bg-gradient-to-br from-white to-yellow-50/50 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-lg">
                  <Zap className="h-12 w-12 text-white" />
                </div>
                <CardTitle className="text-2xl bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                  Launch in Days, Not Months
                </CardTitle>
                <CardDescription className="text-lg">
                  Get your branded platform live in under a week. No development time, no technical headaches.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-white to-green-50/50 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full shadow-lg">
                  <DollarSign className="h-12 w-12 text-white" />
                </div>
                <CardTitle className="text-2xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Recurring Revenue Stream
                </CardTitle>
                <CardDescription className="text-lg">
                  Generate monthly income from client subscriptions. Typical firms see $5K-$50K+ monthly revenue.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-white to-purple-50/50 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-4 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full shadow-lg">
                  <Palette className="h-12 w-12 text-white" />
                </div>
                <CardTitle className="text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  100% Your Brand
                </CardTitle>
                <CardDescription className="text-lg">
                  Complete customization with your logo, colors, domain, and messaging. Clients never see our brand.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-white to-blue-50/50 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-4 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full shadow-lg">
                  <Users className="h-12 w-12 text-white" />
                </div>
                <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Scale Your Practice
                </CardTitle>
                <CardDescription className="text-lg">
                  Handle more clients with AI automation. Reduce manual form review time by 80%.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-white to-red-50/50 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-4 bg-gradient-to-r from-red-400 to-pink-500 rounded-full shadow-lg">
                  <Shield className="h-12 w-12 text-white" />
                </div>
                <CardTitle className="text-2xl bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                  Enterprise Security
                </CardTitle>
                <CardDescription className="text-lg">
                  Bank-level encryption, HIPAA compliance, and secure document handling built-in.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-white to-teal-50/50 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-4 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full shadow-lg">
                  <BarChart3 className="h-12 w-12 text-white" />
                </div>
                <CardTitle className="text-2xl bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                  Analytics & Insights
                </CardTitle>
                <CardDescription className="text-lg">
                  Track client engagement, form completion rates, and revenue metrics with detailed dashboards.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section
        id="pricing"
        className="py-20 px-4 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white relative overflow-hidden"
      >
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">White Label Pricing</h2>
            <p className="text-2xl text-purple-100">Choose the plan that fits your firm's size and needs</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
            {/* Standard White Label */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl">Standard Plan</CardTitle>
                <div className="text-5xl font-bold">
                  $249<span className="text-xl font-normal">/mo</span>
                </div>
                <div className="text-lg text-purple-200">+ $600 setup fee</div>
                <CardDescription className="text-purple-100 text-lg">Perfect for solo practitioners</CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-400 mr-3" />
                    <span className="text-lg">Runs on your main domain</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-400 mr-3" />
                    <span className="text-lg">Solo or small firm branding</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-400 mr-3" />
                    <span className="text-lg">Same premium features for clients</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-400 mr-3" />
                    <span className="text-lg">Basic usage tracking</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-400 mr-3" />
                    <span className="text-lg">Standard onboarding</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-400 mr-3" />
                    <span className="text-lg">Basic support</span>
                  </li>
                </ul>
                <Button className="w-full text-lg py-6 bg-white text-purple-600 hover:bg-gray-100 shadow-lg" asChild>
                  <Link href="/checkout?plan=standard-white-label">Get Started</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Pro White Label */}
            <Card className="bg-white/20 backdrop-blur-sm border-white/30 text-white relative shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105">
              <Badge className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 text-yellow-900 text-lg px-6 py-2">
                Most Popular
              </Badge>
              <CardHeader className="text-center pt-8">
                <CardTitle className="text-3xl">Pro Plan</CardTitle>
                <div className="text-5xl font-bold">
                  $499<span className="text-xl font-normal">/mo</span>
                </div>
                <div className="text-lg text-purple-200">+ $600 setup fee</div>
                <CardDescription className="text-purple-100 text-lg">For growing practices</CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-400 mr-3" />
                    <span className="text-lg">Fully branded for the firm</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-400 mr-3" />
                    <span className="text-lg">Runs on your domain/subdomain</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-400 mr-3" />
                    <span className="text-lg">Admin dashboard for firm</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-400 mr-3" />
                    <span className="text-lg">3-5 firm staff logins</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-400 mr-3" />
                    <span className="text-lg">Same AI + all premium features</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-400 mr-3" />
                    <span className="text-lg">Higher usage limit</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-400 mr-3" />
                    <span className="text-lg">Priority support & onboarding</span>
                  </li>
                </ul>
                <Button
                  className="w-full text-lg py-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-yellow-900 hover:from-yellow-500 hover:to-orange-600 shadow-lg"
                  asChild
                >
                  <Link href="/checkout?plan=pro-white-label">Start Pro</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* AI Options for White Label */}
          <div className="max-w-4xl mx-auto mb-16">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white shadow-2xl">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl flex items-center justify-center">
                  <Zap className="h-8 w-8 mr-3" />
                  AI Options for White Label
                </CardTitle>
                <CardDescription className="text-purple-100 text-lg">
                  Choose how you want to power your AI features
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Bring Your Own API */}
                  <div className="bg-white/10 rounded-lg p-6 border border-white/20">
                    <h3 className="text-2xl font-bold mb-4 text-green-300">🔑 Bring Your Own API Key</h3>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                        <span>Use your own OpenAI, Anthropic, or other AI API</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                        <span>Unlimited usage based on your API limits</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                        <span>Full control over AI model selection</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                        <span>Same monthly price - no additional fees</span>
                      </li>
                    </ul>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-300 mb-2">Same Price</div>
                      <p className="text-green-200">No additional charges</p>
                    </div>
                  </div>

                  {/* Use Our API */}
                  <div className="bg-white/10 rounded-lg p-6 border border-white/20">
                    <h3 className="text-2xl font-bold mb-4 text-blue-300">⚡ Use Our API Infrastructure</h3>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                        <span>No setup required - works immediately</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                        <span>Enterprise-grade reliability & speed</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                        <span>Multiple AI models available</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                        <span>Pay-per-use pricing</span>
                      </li>
                    </ul>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-300 mb-2">$0.40 per 1K chars sent</div>
                      <div className="text-2xl font-bold text-blue-300 mb-2">$0.80 per 1K chars received</div>
                      <p className="text-blue-200">Transparent usage-based pricing</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Lifetime Option */}
          <div className="text-center">
            <Card className="max-w-3xl mx-auto border-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white shadow-2xl transform hover:scale-105 transition-all">
              <CardHeader className="relative overflow-hidden">
                <Badge className="absolute top-4 right-4 bg-red-600 text-white animate-pulse text-lg px-4 py-2">
                  🔥 Limited Time
                </Badge>
                <div className="text-center pt-4">
                  <div className="flex items-center justify-center mb-4">
                    <Star className="h-8 w-8 text-yellow-200 mr-2" />
                    <CardTitle className="text-4xl">Lifetime License</CardTitle>
                    <Star className="h-8 w-8 text-yellow-200 ml-2" />
                  </div>
                  <div className="text-7xl font-bold mb-4">$3,999</div>
                  <CardDescription className="text-yellow-100 text-xl">One-time payment, yours forever</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <p className="text-xl mb-6 leading-relaxed">
                  Get the complete Pro white-label package with lifetime access. No monthly fees, ever. Perfect for
                  established firms looking for long-term value and maximum ROI.
                </p>
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h4 className="font-bold text-lg mb-3">✨ Everything in Pro Plan:</h4>
                    <ul className="space-y-2 text-yellow-100">
                      <li>• Fully branded platform</li>
                      <li>• Unlimited client usage</li>
                      <li>• All AI features included</li>
                      <li>• Priority support forever</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-3">💎 Lifetime Benefits:</h4>
                    <ul className="space-y-2 text-yellow-100">
                      <li>• No recurring monthly fees</li>
                      <li>• All future updates included</li>
                      <li>• Dedicated account manager</li>
                      <li>• API access & integrations</li>
                    </ul>
                  </div>
                </div>
                <Button
                  size="lg"
                  className="w-full text-xl py-6 bg-red-600 hover:bg-red-700 text-white shadow-xl transform hover:scale-105 transition-all"
                  asChild
                >
                  <Link href="/checkout?plan=lifetime">
                    <Sparkles className="h-6 w-6 mr-3" />
                    Claim Lifetime Deal →
                  </Link>
                </Button>
                <div className="mt-4 text-center">
                  <Badge className="bg-red-700 text-white text-lg px-4 py-2">⚡ Only 50 licenses remaining</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-20 animate-pulse"></div>
        </div>
      </section>

      {/* Features Showcase */}
      <section className="py-20 px-4 bg-gradient-to-br from-white via-purple-50/30 to-blue-50/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
              What You Get
            </h2>
            <p className="text-xl text-gray-600">Complete platform with all the features your clients need</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Your Branded Platform Includes:
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-800">Smart Form Builder</h4>
                    <p className="text-gray-600">Wizard-style forms for all major immigration applications</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-800">AI Assistant Integration</h4>
                    <p className="text-gray-600">Powered by GPT for instant legal guidance and form help</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-800">Document Management</h4>
                    <p className="text-gray-600">Secure upload, storage, and organization of client documents</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-800">Client Portal</h4>
                    <p className="text-gray-600">Branded client dashboard for form completion and communication</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-800">Attorney Dashboard</h4>
                    <p className="text-gray-600">Review client forms, manage cases, and track progress</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-100 to-blue-100 rounded-xl p-8 shadow-xl">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg"></div>
                  <span className="font-bold text-xl text-gray-800">Your Law Firm Name</span>
                </div>
                <div className="space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-10 bg-gradient-to-r from-blue-100 to-purple-100 rounded flex items-center px-4">
                    <span className="text-sm bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">
                      Start Immigration Form
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-center text-gray-600 mt-6 text-lg">Preview of your branded platform</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-20 px-4 bg-gradient-to-br from-gray-50 via-purple-50/30 to-blue-50/30">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-600">Schedule a demo or get in touch to discuss your white label needs</p>
          </div>

          <Card className="border-0 bg-gradient-to-br from-white to-purple-50/50 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-2xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Contact Our White Label Team
              </CardTitle>
              <CardDescription className="text-lg">
                We'll respond within 24 hours with a custom proposal
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName" className="text-lg">
                      First Name
                    </Label>
                    <Input id="firstName" placeholder="John" className="mt-2 h-12" />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-lg">
                      Last Name
                    </Label>
                    <Input id="lastName" placeholder="Smith" className="mt-2 h-12" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email" className="text-lg">
                    Email
                  </Label>
                  <Input id="email" type="email" placeholder="john@lawfirm.com" className="mt-2 h-12" />
                </div>
                <div>
                  <Label htmlFor="firmName" className="text-lg">
                    Law Firm Name
                  </Label>
                  <Input id="firmName" placeholder="Smith & Associates" className="mt-2 h-12" />
                </div>
                <div>
                  <Label htmlFor="firmSize" className="text-lg">
                    Firm Size
                  </Label>
                  <Input id="firmSize" placeholder="e.g., 5 attorneys, 50 clients/month" className="mt-2 h-12" />
                </div>
                <div>
                  <Label htmlFor="message" className="text-lg">
                    Tell us about your needs
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="What immigration services do you offer? What's your current process? Any specific requirements?"
                    rows={4}
                    className="mt-2"
                  />
                </div>
                <Button
                  className="w-full text-lg py-6 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-xl"
                  size="lg"
                >
                  <Sparkles className="h-5 w-5 mr-2" />
                  Send Message
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-purple-900 to-blue-900 text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Building className="h-6 w-6" />
            <span className="text-xl font-bold">Paper Trail Assassin</span>
          </div>
          <p className="text-gray-400 mb-4">Empowering law firms with AI-powered immigration solutions</p>
          <div className="flex justify-center space-x-6 text-sm">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </footer>

      {/* Floating AI Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          className="h-14 w-14 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-lg hover:shadow-xl transition-all transform hover:scale-110"
          asChild
        >
          <Link href="/ai-chat">
            <MessageSquare className="h-6 w-6" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
