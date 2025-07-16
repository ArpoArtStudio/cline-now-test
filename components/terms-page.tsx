"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X, Shield, AlertTriangle, Scale, FileText } from "lucide-react"

interface TermsPageProps {
  onClose: () => void
  isDark: boolean
}

export default function TermsPage({ onClose, isDark }: TermsPageProps) {
  const sections = [
    {
      icon: <FileText className="h-6 w-6" />,
      title: "1. Acceptance of Terms",
      content: `By accessing and using Arpo Studio ("the Platform"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service. These Terms of Service ("Terms") govern your use of our decentralized auction platform for NFTs and digital assets.`,
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "2. Platform Description",
      content: `Arpo Studio is a blockchain-based auction platform that facilitates the buying and selling of NFTs and digital assets through smart contracts. Our platform features:
      
      • Decentralized smart contract execution for all transactions
      • 1% and 10% bidding options for user convenience
      • Automated royalty distribution to creators
      • Real-time chat functionality with moderation
      • Max Pain auto-bidding features
      • Transparent, publicly auditable transactions`,
    },
    {
      icon: <Scale className="h-6 w-6" />,
      title: "3. User Responsibilities",
      content: `Users are responsible for:
      
      • Maintaining the security of their cryptocurrency wallets
      • Ensuring they have sufficient funds for bids and gas fees
      • Complying with all applicable laws and regulations
      • Providing accurate information during registration
      • Respecting intellectual property rights
      • Following community guidelines and chat rules
      • Understanding the risks associated with blockchain transactions`,
    },
    {
      icon: <AlertTriangle className="h-6 w-6" />,
      title: "4. Bidding and Transactions",
      content: `All bids placed on the platform are:
      
      • Legally binding commitments to purchase
      • Executed through immutable smart contracts
      • Subject to blockchain network fees (gas fees)
      • Final and irreversible once confirmed on the blockchain
      • Subject to a platform fee as disclosed at the time of bidding
      
      Users acknowledge that blockchain transactions cannot be reversed, and Arpo Studio cannot recover funds sent to incorrect addresses or lost due to user error.`,
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "5. Intellectual Property",
      content: `Users warrant that they own or have the necessary rights to list NFTs on the platform. By listing an NFT, users grant Arpo Studio a non-exclusive license to display and promote the work. Users retain all ownership rights to their intellectual property, subject to the rights granted to purchasers through NFT ownership.
      
      Arpo Studio respects intellectual property rights and will respond to valid DMCA takedown notices.`,
    },
    {
      icon: <AlertTriangle className="h-6 w-6" />,
      title: "6. Disclaimers and Limitations",
      content: `THE PLATFORM IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. ARPO STUDIO DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING:
      
      • Merchantability and fitness for a particular purpose
      • Uninterrupted or error-free service
      • Security of user funds or data
      • Accuracy of third-party content
      • Compatibility with all devices or browsers
      
      Users acknowledge the experimental nature of blockchain technology and accept all associated risks.`,
    },
    {
      icon: <Scale className="h-6 w-6" />,
      title: "7. Limitation of Liability",
      content: `TO THE MAXIMUM EXTENT PERMITTED BY LAW, ARPO STUDIO SHALL NOT BE LIABLE FOR:
      
      • Direct, indirect, incidental, or consequential damages
      • Loss of profits, data, or use
      • Damages resulting from blockchain network issues
      • Third-party actions or content
      • Smart contract vulnerabilities or exploits
      • Market volatility or investment losses
      
      Our total liability shall not exceed the fees paid by the user in the 12 months preceding the claim.`,
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "8. Privacy and Data Protection",
      content: `We collect minimal personal information and prioritize user privacy:
      
      • Wallet addresses are publicly visible on the blockchain
      • Chat messages are stored for moderation purposes
      • We do not sell personal data to third parties
      • Users can request data deletion (subject to blockchain immutability)
      • We comply with applicable data protection regulations
      
      For detailed information, please review our Privacy Policy.`,
    },
    {
      icon: <AlertTriangle className="h-6 w-6" />,
      title: "9. Prohibited Activities",
      content: `Users may not:
      
      • Engage in market manipulation or wash trading
      • List counterfeit or infringing content
      • Use the platform for money laundering or illegal activities
      • Attempt to exploit smart contract vulnerabilities
      • Spam or harass other users
      • Use automated tools without permission
      • Circumvent platform security measures`,
    },
    {
      icon: <Scale className="h-6 w-6" />,
      title: "10. Dispute Resolution",
      content: `Any disputes arising from the use of the platform shall be resolved through:
      
      • Good faith negotiation between parties
      • Binding arbitration if negotiation fails
      • Arbitration conducted under the rules of the American Arbitration Association
      • Proceedings held in San Francisco, California
      • California state law governs these terms
      
      Users waive the right to participate in class action lawsuits.`,
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "11. Modifications and Termination",
      content: `Arpo Studio reserves the right to:
      
      • Modify these terms with 30 days notice
      • Suspend or terminate user accounts for violations
      • Discontinue the platform with reasonable notice
      • Update smart contracts for security or functionality improvements
      
      Continued use after modifications constitutes acceptance of new terms.`,
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "12. Contact Information",
      content: `For questions about these Terms of Service, please contact us at:
      
      Email: legal@arpostudio.com
      Address: Arpo Studio Legal Department, San Francisco, CA
      
      Last Updated: January 15, 2024
      
      These terms are effective immediately and supersede all previous versions.`,
    },
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className={`${isDark ? "bg-[#000000] border-white" : "bg-white border-black"} border rounded-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col`}
      >
        {/* Header */}
        <div className={`flex justify-between items-center p-6 border-b ${isDark ? "border-white" : "border-black"}`}>
          <h2 className={`text-2xl font-bold ${isDark ? "text-white" : "text-black"}`}>Terms & Conditions</h2>
          <Button onClick={onClose} variant="ghost" className="p-2">
            <X className={`h-5 w-5 ${isDark ? "text-white" : "text-black"}`} />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Introduction */}
          <div className="mb-8">
            <p className={`text-lg ${isDark ? "text-gray-300" : "text-gray-700"} leading-relaxed`}>
              Welcome to Arpo Studio. These Terms and Conditions ("Terms") govern your use of our decentralized auction
              platform. Please read them carefully before using our services. By accessing or using Arpo Studio, you
              agree to be bound by these Terms.
            </p>
          </div>

          {/* Terms Sections */}
          <div className="space-y-6">
            {sections.map((section, index) => (
              <Card
                key={index}
                className={`${isDark ? "bg-[#000000] border-white" : "bg-white border-black"} border rounded-2xl`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div
                      className={`p-2 rounded-lg ${isDark ? "bg-white text-black" : "bg-black text-white"} flex-shrink-0 mt-1`}
                    >
                      {section.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-lg font-bold ${isDark ? "text-white" : "text-black"} mb-3`}>
                        {section.title}
                      </h3>
                      <div
                        className={`${isDark ? "text-gray-300" : "text-gray-700"} leading-relaxed whitespace-pre-line`}
                      >
                        {section.content}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <Card
              className={`${isDark ? "bg-[#000000] border-white" : "bg-white border-black"} border rounded-2xl p-6`}
            >
              <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"} mb-4`}>
                By using Arpo Studio, you acknowledge that you have read, understood, and agree to be bound by these
                Terms and Conditions.
              </p>
              <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-500"}`}>
                Last updated: January 15, 2024 • Version 1.0
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
