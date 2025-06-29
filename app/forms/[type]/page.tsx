"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  ArrowRight,
  Save,
  Zap,
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  FileText,
  Upload,
} from "lucide-react"
import Link from "next/link"

interface FormStep {
  id: string
  title: string
  description: string
  fields: FormField[]
}

interface FormField {
  id: string
  label: string
  type: "text" | "email" | "date" | "select" | "textarea" | "checkbox" | "file"
  required?: boolean
  options?: string[]
  placeholder?: string
  aiHint?: string
}

export default function FormBuilder({ params }: { params: { type: string } }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [aiSuggestions, setAiSuggestions] = useState<Record<string, string>>({})

  // Sample form structure - in real app, this would come from API
  const formSteps: FormStep[] = [
    {
      id: "personal-info",
      title: "Personal Information",
      description: "Basic information about the applicant",
      fields: [
        { id: "firstName", label: "First Name", type: "text", required: true, placeholder: "Enter your first name" },
        { id: "lastName", label: "Last Name", type: "text", required: true, placeholder: "Enter your last name" },
        { id: "dateOfBirth", label: "Date of Birth", type: "date", required: true },
        {
          id: "countryOfBirth",
          label: "Country of Birth",
          type: "select",
          required: true,
          options: ["United States", "Mexico", "Canada", "India", "China", "Other"],
        },
        { id: "email", label: "Email Address", type: "email", required: true, placeholder: "your.email@example.com" },
      ],
    },
    {
      id: "immigration-history",
      title: "Immigration History",
      description: "Previous immigration status and history",
      fields: [
        {
          id: "currentStatus",
          label: "Current Immigration Status",
          type: "select",
          required: true,
          options: ["F-1 Student", "H-1B Worker", "Tourist/B-2", "Undocumented", "Other"],
        },
        { id: "entryDate", label: "Date of Last Entry to US", type: "date", required: true },
        { id: "i94Number", label: "I-94 Number", type: "text", placeholder: "Enter your I-94 number if available" },
        {
          id: "previousApplications",
          label: "Have you filed any previous immigration applications?",
          type: "checkbox",
        },
        {
          id: "previousDetails",
          label: "Details of Previous Applications",
          type: "textarea",
          placeholder: "Describe any previous immigration applications...",
        },
      ],
    },
    {
      id: "documents",
      title: "Supporting Documents",
      description: "Upload required documents",
      fields: [
        {
          id: "passport",
          label: "Passport",
          type: "file",
          required: true,
          aiHint: "Upload clear photos of all passport pages",
        },
        { id: "i94", label: "I-94 Record", type: "file", aiHint: "Download from CBP website or upload photo" },
        { id: "visa", label: "Current Visa", type: "file", aiHint: "Photo of visa stamp in passport" },
        { id: "birthCertificate", label: "Birth Certificate", type: "file", required: true },
        { id: "marriageCertificate", label: "Marriage Certificate (if applicable)", type: "file" },
      ],
    },
  ]

  const currentStepData = formSteps[currentStep]
  const progress = ((currentStep + 1) / formSteps.length) * 100

  const handleInputChange = (fieldId: string, value: any) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }))
    // Clear error when user starts typing
    if (errors[fieldId]) {
      setErrors((prev) => ({ ...prev, [fieldId]: "" }))
    }
  }

  const validateStep = () => {
    const newErrors: Record<string, string> = {}

    currentStepData.fields.forEach((field) => {
      if (field.required && !formData[field.id]) {
        newErrors[field.id] = `${field.label} is required`
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep()) {
      if (currentStep < formSteps.length - 1) {
        setCurrentStep(currentStep + 1)
      }
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleAIAutoFill = async () => {
    // Simulate AI auto-fill
    const suggestions = {
      firstName: "Based on your passport, we suggest: John",
      lastName: "Based on your passport, we suggest: Smith",
      countryOfBirth: "Based on your documents: Mexico",
    }
    setAiSuggestions(suggestions)
  }

  const renderField = (field: FormField) => {
    const hasError = errors[field.id]
    const hasSuggestion = aiSuggestions[field.id]

    return (
      <div key={field.id} className="space-y-2">
        <Label htmlFor={field.id} className="flex items-center">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </Label>

        {hasSuggestion && (
          <div className="p-2 bg-blue-50 border border-blue-200 rounded-md text-sm">
            <div className="flex items-center text-blue-700">
              <Zap className="h-4 w-4 mr-1" />
              AI Suggestion: {hasSuggestion}
            </div>
            <Button
              size="sm"
              variant="link"
              className="p-0 h-auto text-blue-600"
              onClick={() => handleInputChange(field.id, hasSuggestion.split(": ")[1])}
            >
              Use this suggestion
            </Button>
          </div>
        )}

        {field.type === "text" || field.type === "email" ? (
          <Input
            id={field.id}
            type={field.type}
            placeholder={field.placeholder}
            value={formData[field.id] || ""}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            className={hasError ? "border-red-500" : ""}
          />
        ) : field.type === "date" ? (
          <Input
            id={field.id}
            type="date"
            value={formData[field.id] || ""}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            className={hasError ? "border-red-500" : ""}
          />
        ) : field.type === "select" ? (
          <Select value={formData[field.id] || ""} onValueChange={(value) => handleInputChange(field.id, value)}>
            <SelectTrigger className={hasError ? "border-red-500" : ""}>
              <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : field.type === "textarea" ? (
          <Textarea
            id={field.id}
            placeholder={field.placeholder}
            value={formData[field.id] || ""}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            className={hasError ? "border-red-500" : ""}
            rows={4}
          />
        ) : field.type === "checkbox" ? (
          <div className="flex items-center space-x-2">
            <Checkbox
              id={field.id}
              checked={formData[field.id] || false}
              onCheckedChange={(checked) => handleInputChange(field.id, checked)}
            />
            <Label htmlFor={field.id} className="text-sm font-normal">
              Yes
            </Label>
          </div>
        ) : field.type === "file" ? (
          <div className="space-y-2">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-500">PDF, JPG, PNG up to 10MB</p>
            </div>
            {field.aiHint && (
              <p className="text-xs text-blue-600 flex items-center">
                <MessageSquare className="h-3 w-3 mr-1" />
                {field.aiHint}
              </p>
            )}
          </div>
        ) : null}

        {hasError && (
          <p className="text-sm text-red-500 flex items-center">
            <AlertTriangle className="h-4 w-4 mr-1" />
            {hasError}
          </p>
        )}
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
              <Link href="/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <div>
              <h1 className="text-xl font-semibold">Form I-485: Application for Adjustment of Status</h1>
              <p className="text-sm text-gray-600">
                Step {currentStep + 1} of {formSteps.length}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </Button>
            <Button variant="outline" size="sm" onClick={handleAIAutoFill}>
              <Zap className="h-4 w-4 mr-2" />
              AI Auto-Fill
            </Button>
            <Button variant="outline" size="sm">
              <MessageSquare className="h-4 w-4 mr-2" />
              Ask AI
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm text-gray-600">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Step Navigation */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Form Steps</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {formSteps.map((step, index) => (
                    <div
                      key={step.id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        index === currentStep
                          ? "bg-blue-100 border border-blue-300"
                          : index < currentStep
                            ? "bg-green-50 border border-green-200"
                            : "bg-gray-50 border border-gray-200"
                      }`}
                      onClick={() => setCurrentStep(index)}
                    >
                      <div className="flex items-center space-x-2">
                        {index < currentStep ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <div
                            className={`w-5 h-5 rounded-full border-2 ${
                              index === currentStep ? "border-blue-500 bg-blue-500" : "border-gray-300"
                            }`}
                          >
                            {index === currentStep && <div className="w-full h-full bg-blue-500 rounded-full" />}
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-sm">{step.title}</p>
                          <p className="text-xs text-gray-600">{step.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Form Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  {currentStepData.title}
                </CardTitle>
                <CardDescription>{currentStepData.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">{currentStepData.fields.map(renderField)}</div>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t">
                  <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 0}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>

                  <div className="flex space-x-2">
                    <Button variant="outline">
                      <Save className="h-4 w-4 mr-2" />
                      Save & Exit
                    </Button>
                    {currentStep === formSteps.length - 1 ? (
                      <Button className="bg-green-600 hover:bg-green-700">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Complete Form
                      </Button>
                    ) : (
                      <Button onClick={handleNext}>
                        Next
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
