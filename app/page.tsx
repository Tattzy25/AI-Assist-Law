"use client"

import type React from "react"
import { useState } from "react"
import { useChat } from "@ai-sdk/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle,
  Users,
  FileText,
  MessageSquare,
  Shield,
  Zap,
  Globe,
  Scale,
  Star,
  Play,
  Sparkles,
  Upload,
} from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [showAIWidget, setShowAIWidget] = useState(false)
  const [isAIMaximized, setIsAIMaximized] = useState(false)

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "1",
        role: "assistant",
        content:
          "Hi! I'm your AI immigration assistant. I can help you understand forms, requirements, and guide you through the immigration process. What would you like to know?",
      },
    ],
  })

  const quickQuestions = [
    "What is I-485?",
    "How long does it take?",
    "What documents do I need?",
    "How much does it cost?",
  ]

  const handleQuickQuestion = (question: string) => {
    handleSubmit(new Event("submit") as any, {
      data: { message: question },
    })
  }

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!input.trim() && selectedFiles.length === 0) return

    let messageContent = input
    if (selectedFiles.length > 0) {
      const fileNames = selectedFiles.map((f) => f.name).join(", ")
      messageContent = input || `I've uploaded these files: ${fileNames}. Can you help me with them?`
    }

    handleSubmit(e || (new Event("submit") as any), {
      data: { message: messageContent },
    })

    setSelectedFiles([])
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
      {/* Header */}
      <header className="border-b bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 backdrop-blur-sm sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Scale className="h-8 w-8 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">Paper Trail Assassin</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/features" className="text-white/80 hover:text-white transition-colors font-medium">
              Features
            </Link>
            <Link href="/pricing" className="text-white/80 hover:text-white transition-colors font-medium">
              Pricing
            </Link>
            <Link href="/white-label" className="text-white/80 hover:text-white transition-colors font-medium">
              White Label
            </Link>
            <Button
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 bg-white/5 backdrop-blur-sm"
            >
              <Link href="/ai-chat">Try AI Assistant</Link>
            </Button>
            <Button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white shadow-lg transform hover:scale-105 transition-all">
              <Link href="/dashboard">
                <Sparkles className="h-4 w-4 mr-2" />
                Start Free →
              </Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="container mx-auto text-center max-w-5xl relative z-10">
          <Badge className="mb-6 bg-gradient-to-r from-green-400 to-emerald-500 text-white hover:from-green-500 hover:to-emerald-600 text-lg px-6 py-3 shadow-lg">
            🚀 Join 50,000+ People Getting Immigration Help
          </Badge>
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent mb-8 leading-tight">
            Get Your
            <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
              {" "}
              Green Card
            </span>
            <br />
            <span className="bg-gradient-to-r from-lime-400 to-green-400 bg-clip-text text-transparent">3x Faster</span>{" "}
            with AI
          </h1>
          <p className="text-2xl text-gray-700 mb-12 leading-relaxed max-w-3xl mx-auto">
            Stop paying $5,000+ to lawyers. Our AI fills out your immigration forms in minutes, catches errors before
            USCIS does, and guides you step-by-step to approval.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Button
              size="lg"
              className="text-xl px-12 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-xl transform hover:scale-105 transition-all"
            >
              <Link href="/dashboard">
                <Sparkles className="h-6 w-6 mr-3" />
                Start My Application FREE →
              </Link>
            </Button>
            <Button
              size="lg"
              className="text-xl px-12 py-6 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 shadow-xl transform hover:scale-105 transition-all text-white"
            >
              <Link href="/ai-chat">
                <Play className="h-6 w-6 mr-3" />
                Try AI Assistant
              </Link>
            </Button>
          </div>

          {/* Social Proof */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-gray-600">
            <div className="flex items-center">
              <div className="flex -space-x-2 mr-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 border-2 border-white shadow-lg"
                  ></div>
                ))}
              </div>
              <span className="font-semibold">2,847 approvals this month</span>
            </div>
            <div className="flex items-center">
              <div className="flex text-yellow-400 mr-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <span className="font-semibold">4.9/5 from 12,000+ reviews</span>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-purple-300 to-blue-300 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-300 to-cyan-300 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-pink-200 to-purple-200 rounded-full opacity-10 animate-pulse"></div>
        </div>
      </section>

      {/* Interactive Features Grid */}
      <section className="py-20 px-4 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
              Why 50,000+ People Choose Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stop wasting months on paperwork. Get approved faster with AI that knows immigration law better than most
              lawyers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* AI Form Builder - CLICKABLE */}
            <Card className="border-0 bg-gradient-to-br from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 transition-all cursor-pointer group hover:shadow-2xl transform hover:scale-105 duration-300">
              <Link href="/dashboard">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full group-hover:from-blue-600 group-hover:to-purple-600 transition-all shadow-lg">
                    <FileText className="h-12 w-12 text-white" />
                  </div>
                  <CardTitle className="text-2xl mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Smart Form Builder
                  </CardTitle>
                  <CardDescription className="text-lg">
                    AI fills out I-485, I-130, N-400 and 50+ other forms automatically.
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">
                      {" "}
                      Takes 10 minutes, not 10 hours.
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg transform group-hover:scale-105 transition-all">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Start Building Forms →
                  </Button>
                  <p className="text-sm text-gray-500 mt-2">✓ Free to try • ✓ No credit card needed</p>
                </CardContent>
              </Link>
            </Card>

            {/* AI Assistant - CLICKABLE */}
            <Card className="border-0 bg-gradient-to-br from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 transition-all cursor-pointer group hover:shadow-2xl transform hover:scale-105 duration-300">
              <Link href="/ai-chat">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full group-hover:from-green-600 group-hover:to-emerald-600 transition-all shadow-lg">
                    <MessageSquare className="h-12 w-12 text-white" />
                  </div>
                  <CardTitle className="text-2xl mb-3 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    24/7 AI Legal Assistant
                  </CardTitle>
                  <CardDescription className="text-lg">
                    Ask any immigration question and get instant answers.
                    <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent font-semibold">
                      {" "}
                      Trained on 100,000+ successful cases.
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg transform group-hover:scale-105 transition-all">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Ask AI Now →
                  </Button>
                  <p className="text-sm text-gray-500 mt-2">✓ Instant answers • ✓ Available 24/7</p>
                </CardContent>
              </Link>
            </Card>

            {/* Error Detection - CLICKABLE */}
            <Card className="border-0 bg-gradient-to-br from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transition-all cursor-pointer group hover:shadow-2xl transform hover:scale-105 duration-300">
              <Link href="/dashboard">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full group-hover:from-purple-600 group-hover:to-pink-600 transition-all shadow-lg">
                    <Shield className="h-12 w-12 text-white" />
                  </div>
                  <CardTitle className="text-2xl mb-3 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Error Detection
                  </CardTitle>
                  <CardDescription className="text-lg">
                    AI catches 99.7% of mistakes before you submit.
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-semibold">
                      {" "}
                      No more RFEs or denials.
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg transform group-hover:scale-105 transition-all">
                    <Shield className="h-4 w-4 mr-2" />
                    Check My Forms →
                  </Button>
                  <p className="text-sm text-gray-500 mt-2">✓ Prevent rejections • ✓ Save months of delays</p>
                </CardContent>
              </Link>
            </Card>

            {/* Auto-Fill - CLICKABLE */}
            <Card className="border-0 bg-gradient-to-br from-orange-50 to-red-50 hover:from-orange-100 hover:to-red-100 transition-all cursor-pointer group hover:shadow-2xl transform hover:scale-105 duration-300">
              <Link href="/dashboard">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full group-hover:from-orange-600 group-hover:to-red-600 transition-all shadow-lg">
                    <Zap className="h-12 w-12 text-white" />
                  </div>
                  <CardTitle className="text-2xl mb-3 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                    AI Auto-Fill
                  </CardTitle>
                  <CardDescription className="text-lg">
                    Upload your passport, AI fills everything else.
                    <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent font-semibold">
                      {" "}
                      90% faster than manual entry.
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg transform group-hover:scale-105 transition-all">
                    <Zap className="h-4 w-4 mr-2" />
                    Try Auto-Fill →
                  </Button>
                  <p className="text-sm text-gray-500 mt-2">✓ Upload docs • ✓ AI does the rest</p>
                </CardContent>
              </Link>
            </Card>

            {/* Attorney Network - CLICKABLE */}
            <Card className="border-0 bg-gradient-to-br from-red-50 to-pink-50 hover:from-red-100 hover:to-pink-100 transition-all cursor-pointer group hover:shadow-2xl transform hover:scale-105 duration-300">
              <Link href="/attorneys">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-full group-hover:from-red-600 group-hover:to-pink-600 transition-all shadow-lg">
                    <Users className="h-12 w-12 text-white" />
                  </div>
                  <CardTitle className="text-2xl mb-3 bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                    Expert Attorney Network
                  </CardTitle>
                  <CardDescription className="text-lg">
                    Need human help? Connect with top immigration lawyers.
                    <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent font-semibold">
                      {" "}
                      50% cheaper than traditional firms.
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white shadow-lg transform group-hover:scale-105 transition-all">
                    <Users className="h-4 w-4 mr-2" />
                    Find Attorney →
                  </Button>
                  <p className="text-sm text-gray-500 mt-2">✓ Vetted lawyers • ✓ Fixed pricing</p>
                </CardContent>
              </Link>
            </Card>

            {/* Multilingual - CLICKABLE */}
            <Card className="border-0 bg-gradient-to-br from-teal-50 to-cyan-50 hover:from-teal-100 hover:to-cyan-100 transition-all cursor-pointer group hover:shadow-2xl transform hover:scale-105 duration-300">
              <Link href="/dashboard">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-4 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full group-hover:from-teal-600 group-hover:to-cyan-600 transition-all shadow-lg">
                    <Globe className="h-12 w-12 text-white" />
                  </div>
                  <CardTitle className="text-2xl mb-3 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                    Multilingual Support
                  </CardTitle>
                  <CardDescription className="text-lg">
                    Available in Spanish, Chinese, Hindi, and 12+ languages.
                    <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent font-semibold">
                      {" "}
                      Voice guidance included.
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white shadow-lg transform group-hover:scale-105 transition-all">
                    <Globe className="h-4 w-4 mr-2" />
                    Choose Language →
                  </Button>
                  <p className="text-sm text-gray-500 mt-2">✓ 15 languages • ✓ Voice narration</p>
                </CardContent>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof / Testimonials */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
              Real People, Real Results
            </h2>
            <p className="text-xl text-gray-600">See why thousands trust us with their immigration journey</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-white to-blue-50/50 shadow-xl border-0 hover:shadow-2xl transition-all transform hover:scale-105">
              <CardContent className="p-8">
                <div className="flex text-yellow-400 mb-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 text-lg">
                  "Got my green card approved in 8 months instead of the usual 2+ years. The AI caught 3 errors that
                  would have caused delays. Worth every penny!"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-green-400 rounded-full mr-4"></div>
                  <div>
                    <p className="font-semibold">Maria Rodriguez</p>
                    <p className="text-gray-600">I-485 Approved • Mexico → USA</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-white to-purple-50/50 shadow-xl border-0 hover:shadow-2xl transition-all transform hover:scale-105">
              <CardContent className="p-8">
                <div className="flex text-yellow-400 mb-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 text-lg">
                  "Saved $4,500 in lawyer fees. The AI assistant answered all my questions instantly. My N-400 was
                  approved without any RFEs!"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-4"></div>
                  <div>
                    <p className="font-semibold">David Chen</p>
                    <p className="text-gray-600">N-400 Approved • China → USA</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-white to-green-50/50 shadow-xl border-0 hover:shadow-2xl transition-all transform hover:scale-105">
              <CardContent className="p-8">
                <div className="flex text-yellow-400 mb-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 text-lg">
                  "As a single mom, I couldn't afford a lawyer. This platform guided me through my entire DACA renewal.
                  Approved in 3 months!"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mr-4"></div>
                  <div>
                    <p className="font-semibold">Ana Gutierrez</p>
                    <p className="text-gray-600">DACA Renewed • Dreamer</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="transform hover:scale-110 transition-all">
              <div className="text-5xl font-bold mb-2">50,000+</div>
              <p className="text-blue-100 text-lg">Applications Completed</p>
            </div>
            <div className="transform hover:scale-110 transition-all">
              <div className="text-5xl font-bold mb-2">97.3%</div>
              <p className="text-purple-100 text-lg">Approval Rate</p>
            </div>
            <div className="transform hover:scale-110 transition-all">
              <div className="text-5xl font-bold mb-2">$4,500</div>
              <p className="text-pink-100 text-lg">Average Savings vs Lawyers</p>
            </div>
            <div className="transform hover:scale-110 transition-all">
              <div className="text-5xl font-bold mb-2">8 min</div>
              <p className="text-blue-100 text-lg">Average Form Completion</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20 px-4 bg-gradient-to-br from-white via-purple-50/30 to-blue-50/30">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
            Start Free, Upgrade When Ready
          </h2>
          <p className="text-xl text-gray-600 mb-12">No hidden fees. No surprises. Cancel anytime.</p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-0 bg-gradient-to-br from-white to-gray-50 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Free</CardTitle>
                <div className="text-4xl font-bold bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent">
                  $0
                </div>
                <CardDescription>Perfect for exploring</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full mb-4 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white">
                  <Link href="/dashboard">Start Free</Link>
                </Button>
                <ul className="text-left space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Legal docs & templates
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Download blank forms
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Basic help articles
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-blue-50 to-purple-50 shadow-2xl relative transform scale-105">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-500 to-pink-500 text-white">
                Most Popular
              </Badge>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Premium</CardTitle>
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  $19.99<span className="text-lg">/mo</span>
                </div>
                <CardDescription>Everything you need</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full mb-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg">
                  <Link href="/checkout?plan=premium">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Start Premium Trial
                  </Link>
                </Button>
                <ul className="text-left space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Full AI assistant chat
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    AI auto-fill uploads
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Step-by-step wizard
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Pre-filled PDF downloads
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12">
            <Button
              size="lg"
              className="text-xl px-12 py-6 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-xl transform hover:scale-105 transition-all"
            >
              <Link href="/pricing">
                <Sparkles className="h-5 w-5 mr-2" />
                View All Pricing →
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
        <div className="container mx-auto text-center max-w-4xl relative z-10">
          <h2 className="text-5xl font-bold mb-6">Ready to Get Approved?</h2>
          <p className="text-2xl mb-12 text-blue-100">
            Join 50,000+ people who got their immigration status faster with AI
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
            <Button
              size="lg"
              className="text-xl px-12 py-6 bg-white text-purple-600 hover:bg-gray-100 shadow-xl transform hover:scale-105 transition-all"
            >
              <Link href="/dashboard">
                <Sparkles className="h-6 w-6 mr-3" />
                Start My Application FREE →
              </Link>
            </Button>
            <Button
              size="lg"
              className="text-xl px-12 py-6 border-2 border-white text-white hover:bg-white hover:text-purple-600 bg-transparent shadow-xl transform hover:scale-105 transition-all"
            >
              <Link href="/ai-chat">
                <MessageSquare className="h-6 w-6 mr-3" />
                Ask AI Assistant →
              </Link>
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-blue-100">
            <div className="flex items-center">
              <CheckCircle className="h-6 w-6 mr-2" />
              <span>Free to start</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-6 w-6 mr-2" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-6 w-6 mr-2" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>

        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-20 animate-pulse"></div>
        </div>
      </section>

      {/* Floating AI Trigger Button */}
      {!showAIWidget && (
        <div className="fixed bottom-6 right-6 z-40">
          <Button
            size="lg"
            className="rounded-full w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 shadow-2xl transform hover:scale-110 transition-all animate-bounce"
            onClick={() => setShowAIWidget(true)}
          >
            <MessageSquare className="h-8 w-8 text-white" />
          </Button>
          <div className="absolute -top-2 -left-2 w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
        </div>
      )}

      {/* Floating AI Widget */}
      {showAIWidget && (
        <div
          className={`fixed ${
            isAIMaximized ? "inset-0 z-50" : "bottom-6 right-6 w-96 h-[500px] z-50"
          } transition-all duration-300`}
        >
          <div className={`bg-white rounded-lg shadow-2xl border ${isAIMaximized ? "h-full" : "h-full"} flex flex-col`}>
            {/* Widget Header */}
            <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-t-lg">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5" />
                <span className="font-semibold">AI Assistant</span>
                <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-white/20 h-8 w-8 p-0"
                  onClick={() => setIsAIMaximized(!isAIMaximized)}
                >
                  {isAIMaximized ? "🗗" : "🗖"}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-white/20 h-8 w-8 p-0"
                  onClick={() => setShowAIWidget(false)}
                >
                  ✕
                </Button>
              </div>
            </div>

            {/* Widget Content */}
            <div className="flex-1 p-4 overflow-hidden">
              <div className="h-full flex flex-col">
                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto mb-4 space-y-3">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex items-start space-x-2 ${message.role === "user" ? "justify-end" : ""}`}
                    >
                      {message.role === "assistant" && (
                        <div className="p-2 rounded-full bg-gradient-to-r from-green-500 to-blue-500">
                          <MessageSquare className="h-4 w-4 text-white" />
                        </div>
                      )}
                      <div
                        className={`rounded-lg p-3 max-w-[80%] ${
                          message.role === "user"
                            ? "bg-gradient-to-r from-green-500 to-blue-500 text-white ml-auto"
                            : "bg-gray-100"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        {message.files && message.files.length > 0 && (
                          <div className="mt-2 grid grid-cols-2 gap-2">
                            {message.files.map((file, index) => (
                              <div key={index} className="flex items-center space-x-2 p-2 bg-white/20 rounded">
                                {file.type.startsWith("image/") ? (
                                  <img
                                    src={URL.createObjectURL(file) || "/placeholder.svg"}
                                    alt={file.name}
                                    className="w-6 h-6 object-cover rounded"
                                  />
                                ) : (
                                  <FileText className="h-6 w-6 text-white" />
                                )}
                                <span className="text-xs truncate">{file.name}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex items-start space-x-2">
                        <div className="p-2 rounded-full bg-gradient-to-r from-green-500 to-blue-500">
                          <MessageSquare className="h-4 w-4 text-white" />
                        </div>
                        <div className="p-3 rounded-lg bg-gray-100">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Quick Questions */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {quickQuestions.map((question) => (
                      <Button
                        key={question}
                        size="sm"
                        variant="outline"
                        className="text-xs bg-gradient-to-r from-green-50 to-blue-50 hover:from-green-100 hover:to-blue-100"
                        onClick={() => handleQuickQuestion(question)}
                      >
                        {question}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* File Previews */}
                {selectedFiles.length > 0 && (
                  <div className="mb-3 p-3 bg-gray-50 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">{selectedFiles.length} file(s) selected</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setSelectedFiles([])}
                        className="h-6 w-6 p-0 text-gray-500 hover:text-gray-700"
                      >
                        ✕
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedFiles.map((file, index) => (
                        <div key={index} className="flex items-center space-x-2 p-2 bg-white rounded border">
                          {file.type.startsWith("image/") ? (
                            <img
                              src={URL.createObjectURL(file) || "/placeholder.svg"}
                              alt={file.name}
                              className="w-8 h-8 object-cover rounded"
                            />
                          ) : (
                            <FileText className="h-8 w-8 text-blue-500" />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium truncate">{file.name}</p>
                            <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input Area */}
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Ask me anything..."
                    value={input}
                    onChange={handleInputChange}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <input
                    type="file"
                    id="chat-file-upload"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.txt"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        setSelectedFiles(Array.from(e.target.files))
                      }
                    }}
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    className="px-3 border-green-500 text-green-600 hover:bg-green-50 bg-transparent"
                    onClick={() => document.getElementById("chat-file-upload")?.click()}
                  >
                    <Upload className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    className="px-3 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                    onClick={handleSendMessage}
                  >
                    Send
                  </Button>
                </div>

                {/* Maximize Link */}
                {!isAIMaximized && (
                  <div className="mt-2 text-center">
                    <Button variant="link" size="sm" className="text-xs">
                      <Link href="/ai-chat">Open Full Chat →</Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-purple-900 to-blue-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
                  <Scale className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">Paper Trail Assassin</span>
              </div>
              <p className="text-gray-300 mb-4">Making immigration accessible through AI technology.</p>
              <div className="flex space-x-4">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                >
                  <Link href="/dashboard">Start Free</Link>
                </Button>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link href="/dashboard" className="hover:text-white transition-colors">
                    AI Form Builder
                  </Link>
                </li>
                <li>
                  <Link href="/ai-chat" className="hover:text-white transition-colors">
                    AI Assistant
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/attorneys" className="hover:text-white transition-colors">
                    Find Attorney
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Immigration</h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link href="/forms/greencard" className="hover:text-white transition-colors">
                    Green Card
                  </Link>
                </li>
                <li>
                  <Link href="/forms/citizenship" className="hover:text-white transition-colors">
                    Citizenship
                  </Link>
                </li>
                <li>
                  <Link href="/forms/daca" className="hover:text-white transition-colors">
                    DACA
                  </Link>
                </li>
                <li>
                  <Link href="/forms/asylum" className="hover:text-white transition-colors">
                    Asylum
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link href="/help" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition-colors">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>
              &copy; 2024 Paper Trail Assassin. All rights reserved. •{" "}
              <Link href="/pricing" className="hover:text-white transition-colors">
                Pricing
              </Link>{" "}
              •{" "}
              <Link href="/attorneys" className="hover:text-white transition-colors">
                For Attorneys
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
