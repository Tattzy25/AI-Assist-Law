"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Upload, FileText, ImageIcon, CheckCircle, AlertCircle, ArrowLeft, Eye, Download, Trash2 } from "lucide-react"
import Link from "next/link"

interface UploadedFile {
  id: string
  name: string
  type: string
  size: string
  status: "uploading" | "completed" | "error"
  progress: number
  category: string
}

export default function DocumentsPage() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
    {
      id: "1",
      name: "passport-main-page.jpg",
      type: "image/jpeg",
      size: "2.4 MB",
      status: "completed",
      progress: 100,
      category: "Identity Documents",
    },
    {
      id: "2",
      name: "birth-certificate.pdf",
      type: "application/pdf",
      size: "1.2 MB",
      status: "completed",
      progress: 100,
      category: "Identity Documents",
    },
  ])

  const [dragActive, setDragActive] = useState(false)

  const documentCategories = [
    {
      name: "Identity Documents",
      description: "Passport, birth certificate, driver's license",
      required: true,
      examples: ["Passport (all pages)", "Birth Certificate", "Driver's License"],
    },
    {
      name: "Immigration Documents",
      description: "I-94, visa, previous applications",
      required: true,
      examples: ["I-94 Arrival/Departure Record", "Current Visa", "Previous USCIS Notices"],
    },
    {
      name: "Financial Documents",
      description: "Tax returns, bank statements, employment letter",
      required: false,
      examples: ["Tax Returns (3 years)", "Bank Statements", "Employment Letter", "Pay Stubs"],
    },
    {
      name: "Family Documents",
      description: "Marriage certificate, divorce decree, children's documents",
      required: false,
      examples: ["Marriage Certificate", "Divorce Decree", "Children's Birth Certificates"],
    },
  ]

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleFiles = (files: FileList) => {
    Array.from(files).forEach((file) => {
      const newFile: UploadedFile = {
        id: Date.now().toString() + Math.random(),
        name: file.name,
        type: file.type,
        size: (file.size / (1024 * 1024)).toFixed(1) + " MB",
        status: "uploading",
        progress: 0,
        category: "Uncategorized",
      }

      setUploadedFiles((prev) => [...prev, newFile])

      // Simulate upload progress
      let progress = 0
      const interval = setInterval(() => {
        progress += Math.random() * 30
        if (progress >= 100) {
          progress = 100
          clearInterval(interval)
          setUploadedFiles((prev) =>
            prev.map((f) => (f.id === newFile.id ? { ...f, status: "completed", progress: 100 } : f)),
          )
        } else {
          setUploadedFiles((prev) =>
            prev.map((f) => (f.id === newFile.id ? { ...f, progress: Math.round(progress) } : f)),
          )
        }
      }, 200)
    })
  }

  const removeFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== id))
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
              <h1 className="text-xl font-semibold">Document Upload</h1>
              <p className="text-sm text-gray-600">Upload your documents for AI processing</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary">{uploadedFiles.length} files uploaded</Badge>
            <Button asChild>
              <Link href="/dashboard">Continue to Forms</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Upload Area */}
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="h-5 w-5 mr-2" />
                  Upload Documents
                </CardTitle>
                <CardDescription>
                  Drag and drop files or click to browse. Supported formats: PDF, JPG, PNG (max 10MB each)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                    dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Upload className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Drop files here or click to upload</h3>
                  <p className="text-gray-600 mb-4">PDF, JPG, PNG up to 10MB each</p>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                    id="file-upload"
                    onChange={(e) => e.target.files && handleFiles(e.target.files)}
                  />
                  <Button asChild>
                    <label htmlFor="file-upload" className="cursor-pointer">
                      Choose Files
                    </label>
                  </Button>
                </div>

                {/* AI Tips */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">💡 AI Tips for Better Results</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Take clear, well-lit photos of documents</li>
                    <li>• Ensure all text is readable and not cut off</li>
                    <li>• Upload all pages of multi-page documents</li>
                    <li>• Use PDF format when possible for best quality</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Uploaded Files */}
            <Card>
              <CardHeader>
                <CardTitle>Uploaded Files ({uploadedFiles.length})</CardTitle>
                <CardDescription>Manage your uploaded documents</CardDescription>
              </CardHeader>
              <CardContent>
                {uploadedFiles.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No files uploaded yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {uploadedFiles.map((file) => (
                      <div key={file.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                        <div className="flex-shrink-0">
                          {file.type.startsWith("image/") ? (
                            <ImageIcon className="h-8 w-8 text-blue-500" />
                          ) : (
                            <FileText className="h-8 w-8 text-red-500" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{file.name}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>{file.size}</span>
                            <Badge variant="outline" className="text-xs">
                              {file.category}
                            </Badge>
                          </div>
                          {file.status === "uploading" && <Progress value={file.progress} className="mt-2 h-2" />}
                        </div>
                        <div className="flex items-center space-x-2">
                          {file.status === "completed" && <CheckCircle className="h-5 w-5 text-green-500" />}
                          {file.status === "error" && <AlertCircle className="h-5 w-5 text-red-500" />}
                          <Button size="sm" variant="ghost">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => removeFile(file.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Document Categories Guide */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Document Categories</CardTitle>
                <CardDescription>What documents do you need?</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {documentCategories.map((category) => (
                    <div key={category.name}>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{category.name}</h3>
                        {category.required && <Badge variant="destructive">Required</Badge>}
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{category.description}</p>
                      <ul className="text-sm space-y-1">
                        {category.examples.map((example) => (
                          <li key={example} className="flex items-center text-gray-700">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                            {example}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Next Steps</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-sm">Upload documents</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                    <span className="text-sm text-gray-500">AI processes documents</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                    <span className="text-sm text-gray-500">Auto-fill forms</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                    <span className="text-sm text-gray-500">Review and submit</span>
                  </div>
                </div>
                <Button className="w-full mt-6" asChild>
                  <Link href="/dashboard">Continue to Forms →</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
