import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { getDashboardStats, getUserByAuthId, getUserForms } from "@/lib/database"
import {
  FileText,
  MessageSquare,
  Upload,
  Download,
  CheckCircle,
  Clock,
  AlertCircle,
  Zap,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Lock,
  Crown,
} from "lucide-react"
import Link from "next/link"

// Form type descriptions for common immigration forms
const formDescriptions: Record<string, string> = {
  "I-485": "Application for Adjustment of Status",
  "I-130": "Petition for Alien Relative",
  "I-140": "Immigrant Petition for Alien Workers",
  "N-400": "Application for Naturalization",
  "I-765": "Application for Employment Authorization",
  "I-131": "Application for Travel Document",
  "I-589": "Application for Asylum",
  "I-821D": "DACA Consideration Request",
}

// Helper function to format relative time
function formatRelativeTime(date: Date): string {
  const now = new Date()
  const diffInMs = now.getTime() - date.getTime()
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

  if (diffInMinutes < 60) {
    return diffInMinutes <= 1 ? "just now" : `${diffInMinutes} minutes ago`
  } else if (diffInHours < 24) {
    return diffInHours === 1 ? "1 hour ago" : `${diffInHours} hours ago`
  } else if (diffInDays < 7) {
    return diffInDays === 1 ? "1 day ago" : `${diffInDays} days ago`
  } else {
    return date.toLocaleDateString()
  }
}

// Static form information for popular forms section
const popularFormsInfo = [
  { name: "I-485 (Green Card)", formType: "I-485" },
  { name: "N-400 (Citizenship)", formType: "N-400" },
  { name: "I-130 (Family Petition)", formType: "I-130" },
  { name: "I-765 (Work Authorization)", formType: "I-765" },
]

interface FormRecord {
  id: string
  form_type: string
  form_data: Record<string, unknown>
  status: string
  created_at: string
  updated_at: string
}

export default async function DashboardPage() {
  const user = await currentUser()

  if (!user) {
    redirect("/sign-in")
  }

  // Get user data from our database
  const dbUser = await getUserByAuthId(user.id)
  const userStats = dbUser ? await getDashboardStats(dbUser.id) : null
  
  // Fetch user's actual forms from the database
  const userForms = dbUser ? await getUserForms(dbUser.id) : []
  
  // Transform database forms to display format
  const recentForms = (userForms as FormRecord[]).slice(0, 5).map((form) => {
    const formData = form.form_data || {}
    const totalFields = Object.keys(formData).length
    const filledFields = Object.values(formData).filter((v) => v !== null && v !== "").length
    const progress = totalFields > 0 ? Math.round((filledFields / totalFields) * 100) : 0
    
    let status = "Started"
    if (form.status === "completed") {
      status = "Completed"
    } else if (progress > 0 && progress < 100) {
      status = "In Progress"
    }
    
    return {
      id: form.id,
      name: `Form ${form.form_type}`,
      description: formDescriptions[form.form_type] || form.form_type,
      progress: form.status === "completed" ? 100 : progress,
      status,
      lastUpdated: formatRelativeTime(new Date(form.updated_at || form.created_at || Date.now())),
    }
  })

  const userPlan = dbUser?.plan || "free"
  const isPremium = userPlan === "premium" || userPlan.includes("white_label")

  // Define features based on plan
  const freeFeatures = [
    {
      title: "Legal Documents & Templates",
      description: "Access helpful legal documents and templates",
      icon: FileText,
      href: "/templates",
      color: "bg-blue-500",
      available: true,
    },
    {
      title: "Download Blank Forms",
      description: "Download blank immigration forms",
      icon: Download,
      href: "/templates",
      color: "bg-green-500",
      available: true,
    },
    {
      title: "Basic Help Articles",
      description: "Read basic immigration help articles",
      icon: BookOpen,
      href: "/help",
      color: "bg-purple-500",
      available: true,
    },
    {
      title: "Upload Documents (Manual)",
      description: "Upload documents manually",
      icon: Upload,
      href: "/documents",
      color: "bg-orange-500",
      available: true,
    },
  ]

  const premiumFeatures = [
    {
      title: "AI Assistant Chat",
      description: "Full AI legal assistant for instant help",
      icon: MessageSquare,
      href: "/ai-chat",
      color: "bg-green-500",
      available: isPremium,
      premium: true,
    },
    {
      title: "AI Auto-Fill",
      description: "AI automatically fills forms from uploads",
      icon: Zap,
      href: "/forms/new",
      color: "bg-yellow-500",
      available: isPremium,
      premium: true,
    },
    {
      title: "Step-by-Step Wizard",
      description: "Guided form completion wizard",
      icon: ArrowRight,
      href: "/forms/wizard",
      color: "bg-indigo-500",
      available: isPremium,
      premium: true,
    },
    {
      title: "Pre-filled PDF Downloads",
      description: "Download completed, pre-filled PDFs",
      icon: Download,
      href: "/forms",
      color: "bg-red-500",
      available: isPremium,
      premium: true,
    },
  ]

  const allFeatures = [...freeFeatures, ...premiumFeatures]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, {user.firstName || user.emailAddresses[0]?.emailAddress}!
              </h1>
              <p className="text-gray-600">Continue your immigration journey with AI assistance</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge
                className={`${userPlan === "free" ? "bg-green-100 text-green-800" : "bg-purple-100 text-purple-800"}`}
              >
                {userPlan === "free" ? "Free Plan" : "Premium Plan"}
              </Badge>
              {userPlan === "free" && (
                <Button asChild>
                  <Link href="/checkout?plan=premium">
                    <Zap className="h-4 w-4 mr-2" />
                    Upgrade to Premium
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Usage Stats for Premium Users */}
        {isPremium && userStats && (
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">AI Messages</p>
                    <p className="text-2xl font-bold">{userStats.messages_to_ai || 0}</p>
                  </div>
                  <MessageSquare className="h-8 w-8 text-blue-500" />
                </div>
                {userStats.messages_limit !== -1 && (
                  <div className="mt-2">
                    <Progress value={(userStats.messages_to_ai / userStats.messages_limit) * 100} className="h-2" />
                    <p className="text-xs text-gray-500 mt-1">
                      {userStats.messages_to_ai} / {userStats.messages_limit} used
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Forms Auto-Filled</p>
                    <p className="text-2xl font-bold">{userStats.forms_auto_filled || 0}</p>
                  </div>
                  <Zap className="h-8 w-8 text-yellow-500" />
                </div>
                {userStats.forms_limit !== -1 && (
                  <div className="mt-2">
                    <Progress value={(userStats.forms_auto_filled / userStats.forms_limit) * 100} className="h-2" />
                    <p className="text-xs text-gray-500 mt-1">
                      {userStats.forms_auto_filled} / {userStats.forms_limit} used
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">PDFs Generated</p>
                    <p className="text-2xl font-bold">{userStats.pdfs_generated || 0}</p>
                  </div>
                  <Download className="h-8 w-8 text-green-500" />
                </div>
                {userStats.pdfs_limit !== -1 && (
                  <div className="mt-2">
                    <Progress value={(userStats.pdfs_generated / userStats.pdfs_limit) * 100} className="h-2" />
                    <p className="text-xs text-gray-500 mt-1">
                      {userStats.pdfs_generated} / {userStats.pdfs_limit} used
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Documents Uploaded</p>
                    <p className="text-2xl font-bold">{userStats.uploads_count || 0}</p>
                  </div>
                  <Upload className="h-8 w-8 text-purple-500" />
                </div>
                {userStats.uploads_limit !== -1 && (
                  <div className="mt-2">
                    <Progress value={(userStats.uploads_count / userStats.uploads_limit) * 100} className="h-2" />
                    <p className="text-xs text-gray-500 mt-1">
                      {userStats.uploads_count} / {userStats.uploads_limit} used
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Available Features */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Available Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {allFeatures.map((feature) => (
              <Card
                key={feature.title}
                className={`hover:shadow-lg transition-shadow ${feature.available ? "cursor-pointer" : "opacity-60"}`}
                asChild={feature.available}
              >
                {feature.available ? (
                  <Link href={feature.href}>
                    <CardContent className="p-6">
                      <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                        <feature.icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-semibold mb-2 flex items-center">
                        {feature.title}
                        {feature.premium && <Crown className="h-4 w-4 ml-2 text-yellow-500" />}
                      </h3>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </CardContent>
                  </Link>
                ) : (
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 bg-gray-400 rounded-lg flex items-center justify-center mb-4`}>
                      <Lock className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2 flex items-center">
                      {feature.title}
                      <Crown className="h-4 w-4 ml-2 text-yellow-500" />
                    </h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                    <Button size="sm" className="mt-3 w-full" asChild>
                      <Link href="/checkout?plan=premium">Upgrade to Access</Link>
                    </Button>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Forms */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Your Forms
                </CardTitle>
                <CardDescription>Continue working on your immigration applications</CardDescription>
              </CardHeader>
              <CardContent>
                {recentForms.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">No forms yet</h3>
                    <p className="text-gray-500 mb-4">Start your first immigration application</p>
                    <Button asChild>
                      <Link href="/forms/new">Create New Form</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentForms.map((form) => (
                      <div key={form.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-semibold">{form.name}</h4>
                            <p className="text-sm text-gray-600">{form.description}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            {form.status === "Completed" ? (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : form.status === "In Progress" ? (
                              <Clock className="h-5 w-5 text-blue-500" />
                            ) : (
                              <AlertCircle className="h-5 w-5 text-orange-500" />
                            )}
                            <Badge variant={form.status === "Completed" ? "default" : "secondary"}>{form.status}</Badge>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex-1 mr-4">
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span>Progress</span>
                              <span>{form.progress}%</span>
                            </div>
                            <Progress value={form.progress} className="h-2" />
                          </div>
                          <div className="text-sm text-gray-500">{form.lastUpdated}</div>
                        </div>
                        <div className="mt-3 flex justify-end">
                          <Button size="sm" asChild>
                            <Link href={`/forms/${form.id}`}>
                              Continue <ArrowRight className="h-4 w-4 ml-1" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Popular Forms */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Common Forms
                </CardTitle>
                <CardDescription>Commonly used immigration forms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {popularFormsInfo.map((form) => (
                    <Link key={form.name} href={`/forms/${form.formType}`} className="block">
                      <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <h4 className="font-semibold mb-2">{form.name}</h4>
                        <p className="text-sm text-gray-600">
                          {formDescriptions[form.formType] || "Immigration form"}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Assistant Card */}
            <Card
              className={`${isPremium ? "bg-gradient-to-br from-green-50 to-blue-50 border-green-200" : "bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200"}`}
            >
              <CardHeader>
                <CardTitle className={`flex items-center ${isPremium ? "text-green-800" : "text-gray-600"}`}>
                  <MessageSquare className="h-5 w-5 mr-2" />
                  AI Assistant
                  {!isPremium && <Lock className="h-4 w-4 ml-2" />}
                </CardTitle>
                <CardDescription className={isPremium ? "text-green-700" : "text-gray-500"}>
                  {isPremium ? "Get instant help with your immigration questions" : "Upgrade to access AI assistant"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isPremium ? (
                  <Button className="w-full bg-green-600 hover:bg-green-700" asChild>
                    <Link href="/ai-chat">Start Chatting</Link>
                  </Button>
                ) : (
                  <Button className="w-full" asChild>
                    <Link href="/checkout?plan=premium">Upgrade to Access</Link>
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Upgrade Card - Only show for free users */}
            {userPlan === "free" && (
              <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-purple-800">
                    <Zap className="h-5 w-5 mr-2" />
                    Upgrade to Premium
                  </CardTitle>
                  <CardDescription className="text-purple-700">
                    Unlock AI auto-fill, step-by-step guidance, and more
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-2 mb-4 text-purple-700">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-purple-600" />
                      AI auto-fill from documents
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-purple-600" />
                      Download completed PDFs
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-purple-600" />
                      Priority support
                    </li>
                  </ul>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700" asChild>
                    <Link href="/checkout?plan=premium">Upgrade Now - $19.99/mo</Link>
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Help Resources */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Help Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Link href="/help" className="block text-sm text-blue-600 hover:underline">
                    📚 Getting Started Guide
                  </Link>
                  <Link href="/help/forms" className="block text-sm text-blue-600 hover:underline">
                    📝 Form Instructions
                  </Link>
                  <Link href="/help/documents" className="block text-sm text-blue-600 hover:underline">
                    📄 Document Requirements
                  </Link>
                  <Link href="/help/faq" className="block text-sm text-blue-600 hover:underline">
                    ❓ Frequently Asked Questions
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
