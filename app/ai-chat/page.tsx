"use client"

import type React from "react"

import { useState } from "react"
import { useChat } from "@ai-sdk/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquare, Send, Bot, User, AlertCircle, Lightbulb, ArrowLeft, Upload, FileText } from "lucide-react"
import Link from "next/link"

export default function AIChat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
  })

  const [selectedFiles, setSelectedFiles] = useState<File[]>([])

  const quickQuestions = [
    { category: "Forms", questions: ["What is Form I-485?", "How to fill out I-130?", "N-400 requirements"] },
    { category: "Process", questions: ["Green card timeline", "Interview preparation", "Status check"] },
    { category: "Documents", questions: ["Required documents", "Translation needs", "Photo requirements"] },
    { category: "Eligibility", questions: ["Who can apply?", "Income requirements", "Background check"] },
  ]

  const handleQuickQuestion = (question: string) => {
    handleSubmit(new Event("submit") as any, {
      data: { message: question },
    })
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFiles(Array.from(e.target.files))
    }
  }

  const handleSendWithFiles = (e: React.FormEvent) => {
    e.preventDefault()

    let messageContent = input
    if (selectedFiles.length > 0) {
      const fileNames = selectedFiles.map((f) => f.name).join(", ")
      messageContent = input || `I've uploaded these files: ${fileNames}. Can you help me with them?`
    }

    handleSubmit(e, {
      data: { message: messageContent },
    })

    setSelectedFiles([])
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
            <div className="flex items-center space-x-2">
              <Bot className="h-6 w-6 text-blue-600" />
              <h1 className="text-xl font-semibold">AI Immigration Assistant</h1>
            </div>
          </div>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            {isLoading ? "Thinking..." : "Online"}
          </Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Quick Questions Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Lightbulb className="h-5 w-5 mr-2" />
                  Quick Questions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {quickQuestions.map((category) => (
                    <div key={category.category}>
                      <h3 className="font-medium text-sm text-gray-700 mb-2">{category.category}</h3>
                      <div className="space-y-1">
                        {category.questions.map((question) => (
                          <Button
                            key={question}
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start text-left h-auto p-2 text-xs"
                            onClick={() => handleQuickQuestion(question)}
                            disabled={isLoading}
                          >
                            {question}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  Important Note
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  This AI assistant provides general guidance only. For complex cases or legal advice, please consult
                  with a qualified immigration attorney.
                </p>
                <Button size="sm" className="w-full mt-3" asChild>
                  <Link href="/attorneys">Find Attorney</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Chat with AI Assistant
                </CardTitle>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 flex flex-col">
                <ScrollArea className="flex-1 pr-4">
                  <div className="space-y-4">
                    {messages.length === 0 && (
                      <div className="flex justify-start">
                        <div className="flex items-start space-x-2">
                          <div className="p-2 rounded-full bg-gray-200">
                            <Bot className="h-4 w-4 text-gray-600" />
                          </div>
                          <div className="p-3 rounded-lg bg-gray-100 text-gray-900">
                            <p className="text-sm">
                              Hi! I'm your AI immigration assistant. I can help you understand forms, requirements, and
                              guide you through the immigration process. What would you like to know?
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`flex items-start space-x-2 max-w-[80%] ${message.role === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
                        >
                          <div
                            className={`p-2 rounded-full ${message.role === "user" ? "bg-blue-600" : "bg-gray-200"}`}
                          >
                            {message.role === "user" ? (
                              <User className="h-4 w-4 text-white" />
                            ) : (
                              <Bot className="h-4 w-4 text-gray-600" />
                            )}
                          </div>
                          <div
                            className={`p-3 rounded-lg ${
                              message.role === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                            }`}
                          >
                            <p className="text-sm whitespace-pre-line">{message.content}</p>
                          </div>
                        </div>
                      </div>
                    ))}

                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="flex items-start space-x-2">
                          <div className="p-2 rounded-full bg-gray-200">
                            <Bot className="h-4 w-4 text-gray-600" />
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
                </ScrollArea>

                {/* File Previews */}
                {selectedFiles.length > 0 && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-blue-900">{selectedFiles.length} file(s) selected</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setSelectedFiles([])}
                        className="h-6 w-6 p-0 text-blue-600 hover:text-blue-800"
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

                {/* Input */}
                <form onSubmit={handleSendWithFiles} className="flex space-x-2 mt-4">
                  <Input
                    placeholder="Ask me anything about immigration..."
                    value={input}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="flex-1"
                  />
                  <input
                    type="file"
                    id="file-upload"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.txt"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById("file-upload")?.click()}
                    disabled={isLoading}
                  >
                    <Upload className="h-4 w-4" />
                  </Button>
                  <Button type="submit" disabled={isLoading || (!input.trim() && selectedFiles.length === 0)}>
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
