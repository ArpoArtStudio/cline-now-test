"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
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
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    
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
      [e.target.name]: e.target.value
    })
  }

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Us",
      details: "hello@arpostudio.com",
      description: "Get in touch for general inquiries"
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "Support",
      details: "support@arpostudio.com",
      description: "Technical support and platform help"
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Business",
      details: "partnerships@arpostudio.com",
      description: "Partnership and business opportunities"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Location",
      details: "San Francisco, CA",
      description: "Headquarters (Remote-first team)"
    }
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`${isDark ? "bg-[#000000] border-white" : "bg-white border-black"} border rounded-2xl max-w-6xl w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col`}>
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
                <Card className={`${isDark ? "bg-green-900 border-green-600" : "bg-green-50 border-green-400"} border-2 p-6 text-center`}>
                  <div className="text-green-600 mb-2">
                    <Send className="h-12 w-12 mx-auto" />
                  </div>
                  <h4 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">Message Sent!</h4>
                  <p className="text-green-700 dark:text-green-300">
                    Thank you for reaching out. We'll get back to you within \
