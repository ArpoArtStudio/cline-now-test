"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X, Linkedin, Twitter, Mail, Github } from "lucide-react"

interface TeamPageProps {
  onClose: () => void
  isDark: boolean
}

export default function TeamPage({ onClose, isDark }: TeamPageProps) {
  const teamMembers = [
    {
      id: 1,
      name: "Alex Chen",
      role: "Founder & CEO",
      bio: "Blockchain enthusiast with 8+ years in fintech. Previously led product at major crypto exchanges. Passionate about democratizing access to digital assets through innovative auction mechanisms.",
      image: "/placeholder.svg?height=300&width=300&text=Alex Chen",
      linkedin: "https://linkedin.com/in/alexchen",
      twitter: "https://twitter.com/alexchen",
      email: "alex@arpostudio.com",
      github: "https://github.com/alexchen",
    },
    {
      id: 2,
      name: "Sarah Rodriguez",
      role: "Head of Design & UX",
      bio: "Award-winning designer with expertise in Web3 interfaces. Former design lead at top NFT marketplaces. Believes in creating intuitive experiences that bridge traditional and decentralized worlds.",
      image: "/placeholder.svg?height=300&width=300&text=Sarah Rodriguez",
      linkedin: "https://linkedin.com/in/sarahrodriguez",
      twitter: "https://twitter.com/sarahrodriguez",
      email: "sarah@arpostudio.com",
      github: "https://github.com/sarahrodriguez",
    },
    {
      id: 3,
      name: "Marcus Thompson",
      role: "CTO & Smart Contract Lead",
      bio: "Full-stack developer and smart contract security expert. 10+ years in software engineering with focus on blockchain infrastructure. Committed to building secure, scalable auction protocols.",
      image: "/placeholder.svg?height=300&width=300&text=Marcus Thompson",
      linkedin: "https://linkedin.com/in/marcusthompson",
      twitter: "https://twitter.com/marcusthompson",
      email: "marcus@arpostudio.com",
      github: "https://github.com/marcusthompson",
    },
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className={`${isDark ? "bg-[#000000] border-white" : "bg-white border-black"} border rounded-2xl max-w-6xl w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col`}
      >
        {/* Header */}
        <div className={`flex justify-between items-center p-6 border-b ${isDark ? "border-white" : "border-black"}`}>
          <h2 className={`text-2xl font-bold ${isDark ? "text-white" : "text-black"}`}>Meet Our Team</h2>
          <Button onClick={onClose} variant="ghost" className="p-2">
            <X className={`h-5 w-5 ${isDark ? "text-white" : "text-black"}`} />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="text-center mb-8">
            <p className={`text-lg ${isDark ? "text-gray-300" : "text-gray-700"} max-w-3xl mx-auto`}>
              We're a passionate team of innovators, designers, and technologists united by our vision to revolutionize
              the auction experience through blockchain technology. Our diverse backgrounds in fintech, design, and
              smart contract development drive us to create transparent, fair, and accessible auction platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <Card
                key={member.id}
                className={`${isDark ? "bg-[#000000] border-white" : "bg-white border-black"} border rounded-2xl overflow-hidden`}
              >
                <div className="relative">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-black"} mb-1`}>{member.name}</h3>
                  <p className={`text-sm font-semibold ${isDark ? "text-gray-400" : "text-gray-600"} mb-4`}>
                    {member.role}
                  </p>
                  <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"} mb-6 leading-relaxed`}>
                    {member.bio}
                  </p>

                  {/* Social Links */}
                  <div className="flex space-x-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`p-2 ${isDark ? "hover:bg-white hover:text-black" : "hover:bg-black hover:text-white"} rounded-lg`}
                      onClick={() => window.open(member.linkedin, "_blank")}
                    >
                      <Linkedin className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`p-2 ${isDark ? "hover:bg-white hover:text-black" : "hover:bg-black hover:text-white"} rounded-lg`}
                      onClick={() => window.open(member.twitter, "_blank")}
                    >
                      <Twitter className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`p-2 ${isDark ? "hover:bg-white hover:text-black" : "hover:bg-black hover:text-white"} rounded-lg`}
                      onClick={() => window.open(`mailto:${member.email}`, "_blank")}
                    >
                      <Mail className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`p-2 ${isDark ? "hover:bg-white hover:text-black" : "hover:bg-black hover:text-white"} rounded-lg`}
                      onClick={() => window.open(member.github, "_blank")}
                    >
                      <Github className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Join Us Section */}
          <div className="mt-12 text-center">
            <Card
              className={`${isDark ? "bg-[#000000] border-white" : "bg-white border-black"} border rounded-2xl p-8`}
            >
              <h3 className={`text-2xl font-bold ${isDark ? "text-white" : "text-black"} mb-4`}>Join Our Team</h3>
              <p className={`text-lg ${isDark ? "text-gray-300" : "text-gray-700"} mb-6 max-w-2xl mx-auto`}>
                We're always looking for talented individuals who share our passion for innovation and blockchain
                technology. If you're interested in shaping the future of decentralized auctions, we'd love to hear from
                you.
              </p>
              <Button
                className={`${isDark ? "bg-white text-black hover:bg-gray-200" : "bg-black text-white hover:bg-gray-800"} rounded-lg px-8 py-3`}
                onClick={() => window.open("mailto:careers@arpostudio.com", "_blank")}
              >
                View Open Positions
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
