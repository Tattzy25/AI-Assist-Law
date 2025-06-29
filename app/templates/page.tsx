"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Search, Filter, ArrowLeft, Star, Eye, Clock } from "lucide-react"
import Link from "next/link"

interface Template {
  id: string
  title: string
  description: string
  category: string
  downloads: number
  rating: number
  lastUpdated: string
  isPremium: boolean
  previewUrl?: string
}

const templates: Template[] = [
  {
    id: "i485-template",
    title: "Form I-485 Template",
    description: "Application to Adjust Status to Permanent Resident",
    category: "Green Card",
    downloads: 15420,
    rating: 4.8,
    lastUpdated: "2024-01-15",
    isPremium: false,
  },
  {
    id: "n400-template",
    title: "Form N-400 Template",
    description: "Application for Naturalization (Citizenship)",
    category: "Citizenship",
    downloads: 12350,
    rating: 4.9,
    lastUpdated: "2024-01-10",
    isPremium: false,
  },
  {
    id: "i130-template",
    title: "Form I-130 Template",
    description: "Petition for Alien Relative",
    category: "Family",
    downloads: 9870,
    rating: 4.7,
    lastUpdated: "2024-01-12",
    isPremium: false,
  },
  {
    id: "i765-template",
    title: "Form I-765 Template",
    description: "Application for Employment Authorization",
    category: "Work Authorization",
    downloads: 8920,
    rating: 4.6,
    lastUpdated: "2024-01-08",
    isPremium: false,
  },
  {
    id: "i589-template",
    title: "Form I-589 Template",
    description: "Application for Asylum and for Withholding of Removal",
    category: "Asylum",
    downloads: 5430,
    rating: 4.8,
    lastUpdated: "2024-01-14",
    isPremium: true,
  },
  {
    id: "i821d-template",
    title: "Form I-821D Template",
    description: "Consideration of Deferred Action for Childhood Arrivals",
    category: "DACA",
    downloads: 7650,
    rating: 4.9,
    lastUpdated: "2024-01-11",
    isPremium: true,
  },
]

const categories = ["All", "Green Card", "Citizenship", "Family", "Work Authorization", "Asylum", "DACA"]

export default function TemplatesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [showPremiumOnly, setShowPremiumOnly] = useState(false)

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || template.category === selectedCategory
    const matchesPremium = !showPremiumOnly || template.isPremium

    return matchesSearch && matchesCategory && matchesPremium
  })

  const handleDownload = (templateId: string, isPremium: boolean) => {
    if (isPremium) {
      // Redirect to premium signup
      window.location.href = "/checkout?plan=premium"
    } else {
      // Simulate download
      alert(`Downloading ${templateId}...`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <div>
              <h1 className="text-xl font-semibold">Legal Templates & Forms</h1>
              <p className="text-sm text-gray-600">Download helpful legal documents and templates</p>
            </div>
          </div>
          <Badge variant="secondary">{filteredTemplates.length} templates available</Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">Filter:</span>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Premium Filter */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="premium-only"
              checked={showPremiumOnly}
              onChange={(e) => setShowPremiumOnly(e.target.checked)}
              className="rounded"
            />
            <label htmlFor="premium-only" className="text-sm text-gray-600">
              Show premium templates only
            </label>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-blue-500" />
                      {template.title}
                      {template.isPremium && <Badge className="ml-2 bg-orange-500">Premium</Badge>}
                    </CardTitle>
                    <CardDescription className="mt-2">{template.description}</CardDescription>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <Badge variant="outline">{template.category}</Badge>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    {template.rating}
                  </div>
                  <div className="flex items-center">
                    <Download className="h-4 w-4 mr-1" />
                    {template.downloads.toLocaleString()}
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Updated {new Date(template.lastUpdated).toLocaleDateString()}
                  </div>
                </div>

                <div className="flex space-x-2">
                  {template.previewUrl && (
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                  )}
                  <Button size="sm" className="flex-1" onClick={() => handleDownload(template.id, template.isPremium)}>
                    <Download className="h-4 w-4 mr-2" />
                    {template.isPremium ? "Get Premium" : "Download"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No templates found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Premium CTA */}
        <Card className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Unlock Premium Templates</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Get access to advanced templates, AI auto-fill, and step-by-step guidance for complex immigration forms.
            </p>
            <Button size="lg" asChild>
              <Link href="/checkout?plan=premium">Upgrade to Premium →</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
