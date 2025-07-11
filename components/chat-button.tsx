"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import DisplayNameModal from "./display-name-modal"
import AuctionChat from "./auction-chat"

interface ChatButtonProps {
  isDark: boolean
  connectedWallet: string
}

export default function ChatButton({ isDark, connectedWallet }: ChatButtonProps) {
  const [showDisplayNameModal, setShowDisplayNameModal] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [displayName, setDisplayName] = useState("")

  const handleChatClick = () => {
    if (!connectedWallet) {
      // This should trigger a notification in the parent component
      return
    }

    if (!displayName) {
      setShowDisplayNameModal(true)
    } else {
      setShowChat(true)
    }
  }

  const handleDisplayNameSave = (name: string) => {
    setDisplayName(name)
    setShowDisplayNameModal(false)
    setShowChat(true)
  }

  return (
    <>
      {/* Floating Chat Button - moved more to corner */}
      <div className="fixed bottom-4 right-4 z-40">
        <Button
          onClick={handleChatClick}
          className={`w-14 h-14 rounded-full shadow-lg hover:scale-110 transition-all duration-200 ${
            isDark ? "bg-white text-black hover:bg-gray-100" : "bg-black text-white hover:bg-gray-800"
          }`}
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>

      {/* Display Name Modal */}
      {showDisplayNameModal && (
        <DisplayNameModal
          connectedWallet={connectedWallet}
          onSave={handleDisplayNameSave}
          onCancel={() => setShowDisplayNameModal(false)}
          isDark={isDark}
        />
      )}

      {/* Auction Chat */}
      {showChat && (
        <AuctionChat
          displayName={displayName}
          connectedWallet={connectedWallet}
          onClose={() => setShowChat(false)}
          isDark={isDark}
        />
      )}
    </>
  )
}
