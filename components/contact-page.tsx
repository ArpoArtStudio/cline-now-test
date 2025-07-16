"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { X, Mail, MessageCircle, Phone, MapPin, Send } from "lucide-react"

interface ContactPageProps {
  onClose: () => void
  isDark: boolean
}

export default function ContactPage({ onClose, isDark }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setSubmitted(true)
    setIsSubmitting(false)

    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: "", email: "", subject: "", message: "" })
    }, 3000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Us",
      details: "hello@arpostudio.com",
      description: "Get in touch for general inquiries",
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "Support",
      details: "support@arpostudio.com",
      description: "Technical support and platform help",
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Business",
      details: "partnerships@arpostudio.com",
      description: "Partnership and business opportunities",
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Location",
      details: "San Francisco, CA",
      description: "Headquarters (Remote-first team)",
    },
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className={`${isDark ? "bg-[#000000] border-white" : "bg-white border-black"} border rounded-2xl max-w-6xl w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col`}
      >
        {/* Header */}
        <div className={`flex justify-between items-center p-6 border-b ${isDark ? "border-white" : "border-black"}`}>
          <h2 className={`text-2xl font-bold ${isDark ? "text-white" : "text-black"}`}>Contact Us</h2>
          <Button onClick={onClose} variant="ghost" className="p-2">
            <X className={`h-5 w-5 ${isDark ? "text-white" : "text-black"}`} />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div>
              <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-black"} mb-4`}>Send us a message</h3>
              <p className={`${isDark ? "text-gray-300" : "text-gray-700"} mb-6`}>
                Have a question, suggestion, or just want to say hello? We'd love to hear from you.
              </p>

              {submitted ? (
                <Card
                  className={`${isDark ? "bg-green-900 border-green-600" : "bg-green-50 border-green-400"} border-2 p-6 text-center`}
                >
                  <div className="text-green-600 mb-2">
                    <Send className="h-12 w-12 mx-auto" />
                  </div>
                  <h4 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">Message Sent!</h4>
                  <p className="text-green-700 dark:text-green-300">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                </Card>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium ${isDark ? "text-white" : "text-black"} mb-2`}>
                        Name *
                      </label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className={`${isDark ? "bg-[#000000] border-white text-white" : "bg-white border-black text-black"} rounded-lg`}
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium ${isDark ? "text-white" : "text-black"} mb-2`}>
                        Email *
                      </label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className={`${isDark ? "bg-[#000000] border-white text-white" : "bg-white border-black text-black"} rounded-lg`}
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium ${isDark ? "text-white" : "text-black"} mb-2`}>
                      Subject *
                    </label>
                    <Input
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className={`${isDark ? "bg-[#000000] border-white text-white" : "bg-white border-black text-black"} rounded-lg`}
                      placeholder="What's this about?"
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium ${isDark ? "text-white" : "text-black"} mb-2`}>
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className={`w-full ${isDark ? "bg-[#000000] border-white text-white" : "bg-white border-black text-black"} border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-offset-2 ${isDark ? "focus:ring-white" : "focus:ring-black"}`}
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full ${isDark ? "bg-white text-black hover:bg-gray-200" : "bg-black text-white hover:bg-gray-800"} rounded-lg py-3`}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              )}
            </div>

            {/* Contact Information */}
            <div>
              <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-black"} mb-4`}>Get in touch</h3>
              <p className={`${isDark ? "text-gray-300" : "text-gray-700"} mb-6`}>
                Choose the best way to reach us based on your needs.
              </p>

              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <Card
                    key={index}
                    className={`${isDark ? "bg-[#000000] border-white" : "bg-white border-black"} border rounded-2xl`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        <div
                          className={`p-2 rounded-lg ${isDark ? "bg-white text-black" : "bg-black text-white"} flex-shrink-0`}
                        >
                          {info.icon}
                        </div>
                        <div>
                          <h4 className={`font-semibold ${isDark ? "text-white" : "text-black"} mb-1`}>{info.title}</h4>
                          <p className={`font-mono text-sm ${isDark ? "text-gray-300" : "text-gray-700"} mb-1`}>
                            {info.details}
                          </p>
                          <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>{info.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* FAQ Section */}
              <div className="mt-8">
                <h4 className={`text-lg font-semibold ${isDark ? "text-white" : "text-black"} mb-4`}>
                  Frequently Asked Questions
                </h4>
                <div className="space-y-3">
                  <details className={`${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    <summary className="cursor-pointer font-medium">How do I connect my wallet?</summary>
                    <p className="mt-2 text-sm">
                      Click the "Connect Wallet" button in the top right corner and select your preferred wallet
                      provider.
                    </p>
                  </details>
                  <details className={`${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    <summary className="cursor-pointer font-medium">What are the bidding fees?</summary>
                    <p className="mt-2 text-sm">
                      We charge a small platform fee on successful auctions. All fees are transparently displayed before
                      bidding.
                    </p>
                  </details>
                  <details className={`${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    <summary className="cursor-pointer font-medium">How do I list my NFT for auction?</summary>
                    <p className="mt-2 text-sm">
                      Currently, listings are curated. Please contact us at partnerships@arpostudio.com to discuss
                      featuring your work.
                    </p>
                  </details>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
