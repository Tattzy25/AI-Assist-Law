import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  FileText,
  MessageSquare,
  Upload,
  Download,
  CheckCircle,
  Clock,
  AlertCircle,
  Zap,
  Users,
  BookOpen,
  ArrowRight,
  Star,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"

const recentForms = [
  {
    id: "1",
    name: "Form I-485",
    description: "Application for Adjustment of Status",
    progress: 75,
    status: "In Progress",
    lastUpdated: "2 hours ago",
  },
  {
    id: "2",
    name: "Form I-130",
    description: "Petition for Alien Relative",
    progress: 100,
    status: "Completed",
    lastUpdated: "1 day ago",
  },
  {
    id: "3",
    name: "Form N-400",
    description: "Application for Naturalization",
    progress: 25,
    status: "Started",
    lastUpdated: "3 days ago",
  },
]

const quickActions = [
  {
    title: "Start New Form",
    description: "Begin a new immigration application",
    icon: FileText,
    href: "/forms/new",
    color: "bg-blue-500",
  },
  {
    title: "AI Assistant",
    description: "Get instant help with questions",
    icon: MessageSquare,
    href: "/ai-chat",
    color: "bg-green-500",
  },
  {
    title: "Upload Documents",
    description: "Add supporting documents",
    icon: Upload,
    href: "/documents",
    color: "bg-purple-500",
  },
  {
    title: "Templates & Forms",
    description: "Download helpful templates",
    icon: Download,
    href: "/templates",
    color: "bg-orange-500",
  },
]

const popularForms = [
  { name: "I-485 (Green Card)", users: "15.2k", rating: 4.8 },
  { name: "N-400 (Citizenship)", users: "12.1k", rating: 4.9 },
  { name: "I-130 (Family Petition)", users: "9.8k", rating: 4.7 },
  { name: "I-765 (Work Authorization)", users: "8.9k", rating: 4.6 },
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome back!</h1>
              <p className="text-gray-600">Continue your immigration journey with AI assistance</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-green-100 text-green-800">Free Plan</Badge>
              <Button asChild>
                <Link href="/checkout?plan=premium">
                  <Zap className="h-4 w-4 mr-2" />
                  Upgrade to Premium
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickActions.map((action) => (
            <Card key={action.title} className="hover:shadow-lg transition-shadow cursor-pointer" asChild>
              <Link href={action.href}>
                <CardContent className="p-6">
                  <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4`}>
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">{action.title}</h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </CardContent>
              </Link>
            </Card>
          ))}
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
                  Popular Forms
                </CardTitle>
                <CardDescription>Most commonly used immigration forms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {popularForms.map((form) => (
                    <div key={form.name} className="border rounded-lg p-4">
                      <h4 className="font-semibold mb-2">{form.name}</h4>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {form.users} users
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          {form.rating}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Assistant Card */}
            <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center text-green-800">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  AI Assistant
                </CardTitle>
                <CardDescription className="text-green-700">
                  Get instant help with your immigration questions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-green-600 hover:bg-green-700" asChild>
                  <Link href="/ai-chat">Start Chatting</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Upgrade Card */}
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
