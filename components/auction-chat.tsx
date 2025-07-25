"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, HelpCircle, Send, ChevronDown, Pin } from "lucide-react"
import ChatRules from "./chat-rules"
import { useAuction } from "./auction-context"

interface Message {
  id: string
  user: string
  message: string
  timestamp: Date
  userBadge: string
  badgeColor: string
}

interface AuctionChatProps {
  displayName: string
  connectedWallet: string
  onClose: () => void
  isDark: boolean
}

export default function AuctionChat({ displayName, connectedWallet, onClose, isDark }: AuctionChatProps) {
  const { auctionState, placeBid, getMinBid, getMaxBid } = useAuction()
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [showRules, setShowRules] = useState(false)
  const [showQuickBid, setShowQuickBid] = useState(false)
  const [messageCount, setMessageCount] = useState(0)
  const [lastMessageTime, setLastMessageTime] = useState(0)
  const [isRestricted, setIsRestricted] = useState(false)
  const [restrictionTime, setRestrictionTime] = useState(0)
  const [isPinned, setIsPinned] = useState(false)
  const [pinnedSide, setPinnedSide] = useState<"left" | "right">("right")
  const [isMobile, setIsMobile] = useState(false)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [showPinDropdown, setShowPinDropdown] = useState(false)

  // Mock user bid count for badge calculation
  const userBidCount = 15 // This would come from your user data

  const getUserBadge = (bidCount: number) => {
    if (bidCount >= 50)
      return { badge: "Legendary Bidder", color: "border-2 border-black dark:border-white", level: "L6" }
    if (bidCount >= 40) return { badge: "Elite Bidder", color: "bg-purple-500", level: "L5" }
    if (bidCount >= 30) return { badge: "Pro Bidder", color: "bg-yellow-500", level: "L4" }
    if (bidCount >= 20) return { badge: "Active Bidder", color: "bg-orange-500", level: "L3" }
    if (bidCount >= 10) return { badge: "Eager Bidder", color: "bg-lime-500", level: "L2" }
    return { badge: "New Bidder", color: "bg-blue-400", level: "L1" }
  }

  const userBadgeInfo = getUserBadge(userBidCount)

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setIsFullScreen(true)
      }
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Handle body class for pinning
  useEffect(() => {
    if (isPinned) {
      document.body.classList.add(`chat-pinned-${pinnedSide}`)
    } else {
      document.body.classList.remove("chat-pinned-left", "chat-pinned-right")
    }

    return () => {
      document.body.classList.remove("chat-pinned-left", "chat-pinned-right")
    }
  }, [isPinned, pinnedSide])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Rate limiting check
  const checkRateLimit = () => {
    const now = Date.now()
    if (now - lastMessageTime < 1000) {
      setMessageCount((prev) => prev + 1)
      if (messageCount >= 4) {
        setIsRestricted(true)
        setRestrictionTime(10)
        return false
      }
    } else {
      setMessageCount(0)
    }
    setLastMessageTime(now)
    return true
  }

  // Content filtering
  const filterMessage = (message: string) => {
    const prohibitedWords = ["spam", "scam", "hack", "private key"]
    const lowerMessage = message.toLowerCase()

    for (const word of prohibitedWords) {
      if (lowerMessage.includes(word)) {
        return false
      }
    }

    if (message.length > 42) return false
    if (message.includes("http")) return false

    return true
  }

  const handleSendMessage = () => {
    if (!inputMessage.trim() || isRestricted) return

    if (!checkRateLimit()) {
      const rateLimitMessage: Message = {
        id: Date.now().toString(),
        user: "System",
        message: "Rate limit exceeded. Please slow down.",
        timestamp: new Date(),
        userBadge: "System",
        badgeColor: "bg-red-500",
      }
      setMessages((prev) => [...prev, rateLimitMessage])
      return
    }

    if (!filterMessage(inputMessage)) {
      const filterMessage: Message = {
        id: Date.now().toString(),
        user: "System",
        message: "Message violates chat rules. Please review the guidelines.",
        timestamp: new Date(),
        userBadge: "System",
        badgeColor: "bg-red-500",
      }
      setMessages((prev) => [...prev, filterMessage])
      return
    }

    const newMessage: Message = {
      id: Date.now().toString(),
      user: displayName,
      message: inputMessage.trim(),
      timestamp: new Date(),
      userBadge: userBadgeInfo.badge,
      badgeColor: userBadgeInfo.color,
    }

    setMessages((prev) => [...prev, newMessage])
    setInputMessage("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleQuickBid = (bidType: "min" | "max") => {
    try {
      const bidAmount = bidType === "min" ? getMinBid() : getMaxBid()
      placeBid(bidAmount, connectedWallet)

      // Add system message to chat
      const systemMessage: Message = {
        id: Date.now().toString(),
        user: "System",
        message: `${displayName} placed a ${bidType === "min" ? "minimum" : "maximum"} bid of ${bidAmount.toFixed(2)} ETH`,
        timestamp: new Date(),
        userBadge: "System",
        badgeColor: "bg-gray-500",
      }
      setMessages((prev) => [...prev, systemMessage])
    } catch (error) {
      // Add system error message to chat
      const errorMessage: Message = {
        id: Date.now().toString(),
        user: "System",
        message: `Error: ${error instanceof Error ? error.message : "Failed to place bid"}`,
        timestamp: new Date(),
        userBadge: "System",
        badgeColor: "bg-red-500",
      }
      setMessages((prev) => [...prev, errorMessage])
    }
  }

  // Restriction countdown
  useEffect(() => {
    if (restrictionTime > 0) {
      const timer = setTimeout(() => {
        setRestrictionTime((prev) => prev - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (isRestricted && restrictionTime === 0) {
      setIsRestricted(false)
    }
  }, [restrictionTime, isRestricted])

  const chatClasses =
    isFullScreen && isMobile
      ? "fixed inset-0 z-50"
      : isPinned
        ? `fixed top-16 ${pinnedSide}-0 bottom-0 z-50 w-80`
        : "fixed bottom-4 right-4 z-50 w-80"

  const chatHeight = isFullScreen && isMobile ? "h-full" : isPinned ? "h-full" : "h-[500px]"

  return (
    <>
      <div className={chatClasses}>
        <div
          className={`${chatHeight} ${isDark ? "bg-[#000000] border-white" : "bg-white border-black"} border rounded-2xl shadow-2xl flex flex-col ${isFullScreen && isMobile ? "rounded-none" : ""}`}
        >
          {/* Header */}
          <div className={`flex justify-between items-center p-4 border-b ${isDark ? "border-white" : "border-black"}`}>
            <h3 className={`font-bold ${isDark ? "text-white" : "text-black"}`}>Auction Chat</h3>
            <div className="flex space-x-2">
              {!isMobile && (
                <div className="relative">
                  <Button onClick={() => setShowPinDropdown(!showPinDropdown)} variant="ghost" className="p-1">
                    <Pin className={`h-4 w-4 ${isDark ? "text-white" : "text-black"}`} />
                  </Button>
                  {showPinDropdown && (
                    <div
                      className={`absolute right-0 top-8 ${isDark ? "bg-[#000000] border-white" : "bg-white border-black"} border rounded-lg shadow-lg z-10 min-w-[120px]`}
                    >
                      <button
                        onClick={() => {
                          setPinnedSide("left")
                          setIsPinned(true)
                          setShowPinDropdown(false)
                        }}
                        className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 ${isDark ? "text-white" : "text-black"}`}
                      >
                        Pin Left
                      </button>
                      <button
                        onClick={() => {
                          setPinnedSide("right")
                          setIsPinned(true)
                          setShowPinDropdown(false)
                        }}
                        className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 ${isDark ? "text-white" : "text-black"}`}
                      >
                        Pin Right
                      </button>
                      <button
                        onClick={() => {
                          setIsPinned(false)
                          setShowPinDropdown(false)
                        }}
                        className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 ${isDark ? "text-white" : "text-black"}`}
                      >
                        Unpin
                      </button>
                    </div>
                  )}
                </div>
              )}
              <Button onClick={() => setShowRules(true)} variant="ghost" className="p-1">
                <HelpCircle className={`h-4 w-4 ${isDark ? "text-white" : "text-black"}`} />
              </Button>
              <Button onClick={onClose} variant="ghost" className="p-1">
                <X className={`h-4 w-4 ${isDark ? "text-white" : "text-black"}`} />
              </Button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.length === 0 ? (
              <div className="text-center">
                <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  No messages yet. Start the conversation!
                </p>
                <div className={`mt-4 text-sm font-medium ${isDark ? "text-white" : "text-black"}`}>
                  Current Bid: {auctionState.currentBid.toFixed(2)} ETH
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {messages.map((msg) => (
                  <div key={msg.id} className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span
                        className={`text-sm font-medium px-2 py-1 rounded-full ${
                          msg.badgeColor.includes("border")
                            ? `${msg.badgeColor} ${isDark ? "text-white bg-transparent" : "text-black bg-transparent"}`
                            : `${msg.badgeColor} text-white`
                        }`}
                      >
                        {msg.user}
                      </span>
                    </div>
                    <p className={`text-sm ${isDark ? "text-white" : "text-black"}`}>{msg.message}</p>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Quick Bid Section */}
          <div className={`px-4 py-2 border-t ${isDark ? "border-white" : "border-black"}`}>
            <Button
              onClick={() => setShowQuickBid(!showQuickBid)}
              className={`w-full flex items-center justify-between text-xs py-2 ${isDark ? "bg-[#000000] text-white border border-white hover:bg-white hover:text-black" : "bg-white text-black border border-black hover:bg-black hover:text-white"} rounded-lg`}
            >
              <span>Quick Bid</span>
              <ChevronDown className="h-3 w-3" />
            </Button>

            {showQuickBid && (
              <div className="mt-2 space-y-1">
                <Button
                  onClick={() => handleQuickBid("min")}
                  disabled={auctionState.highestBidder === connectedWallet}
                  className={`w-full text-xs py-1 ${isDark ? "bg-white text-black hover:bg-gray-200" : "bg-black text-white hover:bg-gray-800"} rounded disabled:opacity-50`}
                >
                  Min Bid (1%) - {getMinBid().toFixed(2)} ETH
                </Button>
                <Button
                  onClick={() => handleQuickBid("max")}
                  disabled={auctionState.highestBidder === connectedWallet}
                  className={`w-full text-xs py-1 ${isDark ? "bg-[#000000] text-white border border-white hover:bg-white hover:text-black" : "bg-white text-black border border-black hover:bg-black hover:text-white"} rounded disabled:opacity-50`}
                >
                  Max Bid (10%) - {getMaxBid().toFixed(2)} ETH
                </Button>
              </div>
            )}
          </div>

          {/* Message Input */}
          <div className={`p-4 border-t ${isDark ? "border-white" : "border-black"}`}>
            <div className="flex space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={isRestricted ? `Restricted for ${restrictionTime}s` : "Type a message"}
                disabled={isRestricted}
                maxLength={42}
                className={`flex-1 text-sm ${isDark ? "bg-[#000000] border-white text-white" : "bg-white border-black text-black"} rounded-lg`}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isRestricted}
                className={`${isDark ? "bg-white text-black hover:bg-gray-200" : "bg-black text-white hover:bg-gray-800"} rounded-lg`}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                {inputMessage.length}/42 characters
              </span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  userBadgeInfo.color.includes("border")
                    ? `${userBadgeInfo.color} ${isDark ? "text-white bg-transparent" : "text-black bg-transparent"}`
                    : `${userBadgeInfo.color} text-white`
                }`}
              >
                {userBadgeInfo.badge}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Rules Modal */}
      {showRules && <ChatRules onClose={() => setShowRules(false)} isDark={isDark} />}
    </>
  )
}
