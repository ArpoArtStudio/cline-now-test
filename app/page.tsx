"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Moon, Sun, Wallet, Clock, TrendingUp, ChevronUp, Settings } from "lucide-react"
import ChatButton from "../components/chat-button"
import AdminPanel from "./admin-panel"
import { AuctionProvider, useAuction } from "../components/auction-context"
import BidNotification from "../components/bid-notification"
import MaxPainModal from "../components/max-pain-modal"
import EthereumFix from "../components/ethereum-fix"

function AuctionSiteContent() {
  const { auctionState, placeBid, setMaxPain, cancelMaxPain, getMinBid, getMaxBid } = useAuction()
  const [isDark, setIsDark] = useState(false)
  const [bidAmount, setBidAmount] = useState(2.2)
  const [timeLeft] = useState({ days: 2, hours: 1, minutes: 57, seconds: 12 })
  const [connectedWallet, setConnectedWallet] = useState("")
  const [showAdminPanel, setShowAdminPanel] = useState(false)
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null)
  const [showMaxPainModal, setShowMaxPainModal] = useState(false)

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  const incrementBid = () => {
    setBidAmount((prev) => Math.round((prev + 0.1) * 10) / 10)
  }

  const connectWallet = () => {
    setConnectedWallet("0xF1Ed4C4cE65B6353B71f2304b3fD7641a436675F")
  }

  // Check if connected wallet is admin
  const isAdmin = connectedWallet === "0xF1Ed4C4cE65B6353B71f2304b3fD7641a436675F"

  // Check if user is highest bidder
  const isHighestBidder = auctionState.highestBidder === connectedWallet

  // Check if user has Max Pain active
  const hasMaxPainActive =
    auctionState.maxPainSettings?.isActive && auctionState.maxPainSettings.bidder === connectedWallet

  const upcomingAuctions = [
    {
      id: 1,
      title: "Abstract Consciousness",
      artist: "VisionaryArt",
      startingBid: "1.00 ETH",
      status: "Starting in 2h",
    },
    {
      id: 2,
      title: "Matrix Reality",
      artist: "CyberVision",
      startingBid: "0.80 ETH",
      status: "Starting in 4h",
    },
    {
      id: 3,
      title: "Ocean Wave Dynamics",
      artist: "NatureTech",
      startingBid: "1.20 ETH",
      status: "Starting in 6h",
    },
  ]

  const handleBid = (bidType: "min" | "max" | "custom") => {
    if (!connectedWallet) {
      setNotification({ message: "Please connect your wallet to bid", type: "error" })
      return
    }

    try {
      let amount: number

      switch (bidType) {
        case "min":
          amount = getMinBid()
          break
        case "max":
          amount = getMaxBid()
          break
        case "custom":
          amount = bidAmount
          break
      }

      placeBid(amount, connectedWallet)
      setNotification({
        message: `Bid placed successfully: ${amount.toFixed(2)} ETH`,
        type: "success",
      })
    } catch (error) {
      setNotification({
        message: error instanceof Error ? error.message : "Failed to place bid",
        type: "error",
      })
    }
  }

  const handleMaxPain = () => {
    if (!connectedWallet) {
      setNotification({ message: "Please connect your wallet to use Max Pain", type: "error" })
      return
    }

    if (hasMaxPainActive) {
      // Cancel existing Max Pain
      cancelMaxPain()
      setNotification({ message: "Max Pain cancelled", type: "success" })
    } else {
      // Show Max Pain modal
      setShowMaxPainModal(true)
    }
  }

  const handleMaxPainConfirm = (maxAmount: number) => {
    setMaxPain(maxAmount, connectedWallet)
    setShowMaxPainModal(false)
    setNotification({
      message: `Max Pain activated up to ${maxAmount.toFixed(2)} ETH`,
      type: "success",
    })
  }

  const handleOptOut = () => {
    if (hasMaxPainActive) {
      cancelMaxPain()
    }
    setNotification({ message: "You have opted out of this auction", type: "success" })
  }

  // Update bid amount when current bid changes
  useEffect(() => {
    setBidAmount(Math.max(bidAmount, auctionState.currentBid * 1.01))
  }, [auctionState.currentBid, bidAmount])

  if (showAdminPanel) {
    return <AdminPanel onClose={() => setShowAdminPanel(false)} isDark={isDark} toggleTheme={toggleTheme} />
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? "dark bg-[#000000]" : "bg-white"}`}>
      {/* Notification */}
      {notification && (
        <BidNotification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
          isDark={isDark}
        />
      )}

      {/* Max Pain Modal */}
      {showMaxPainModal && (
        <MaxPainModal
          onConfirm={handleMaxPainConfirm}
          onCancel={() => setShowMaxPainModal(false)}
          currentBid={auctionState.currentBid}
          isDark={isDark}
        />
      )}

      {/* Header */}
      <header className="border-b border-gray-300 dark:border-white bg-white dark:bg-[#000000]">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-[#000000] dark:bg-white rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white dark:bg-[#000000] rounded-sm"></div>
              </div>
              <span className="text-xl font-bold text-black dark:text-white">Arpo Studio</span>
            </div>

            {/* Right side controls */}
            <div className="flex items-center space-x-4">
              {isAdmin && (
                <Button
                  onClick={() => setShowAdminPanel(true)}
                  variant="outline"
                  size="sm"
                  className="p-2 bg-white dark:bg-[#000000] border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black rounded-lg"
                >
                  <Settings className="h-4 w-4" />
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={toggleTheme}
                className="p-2 bg-white dark:bg-[#000000] border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black rounded-lg"
              >
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <Button
                onClick={connectWallet}
                className="bg-[#000000] dark:bg-white text-white dark:text-[#000000] hover:bg-[#333333] dark:hover:bg-[#cccccc] border-[#000000] dark:border-white rounded-lg"
              >
                <Wallet className="h-4 w-4 mr-2" />
                {connectedWallet ? `${connectedWallet.slice(0, 6)}...${connectedWallet.slice(-4)}` : "Connect Wallet"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Live Auction Section */}
      <section className="bg-white dark:bg-[#000000] min-h-[calc(100vh-64px)]">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full py-6">
            {/* Artwork Image - Takes up 2/3 of the width */}
            <div className="lg:col-span-2 flex justify-center items-center">
              <div className="relative w-full h-full max-h-[calc(100vh-120px)]">
                <img
                  src="/placeholder.svg?height=700&width=900&text=Digital Dreams: Neon Cityscape"
                  alt="Digital Dreams: Neon Cityscape"
                  className="w-full h-full object-cover rounded-2xl shadow-2xl border border-black dark:border-white"
                />
                <Badge className="absolute top-4 left-4 bg-black dark:bg-white text-white dark:text-black border border-white dark:border-black rounded-lg">
                  <div className="w-2 h-2 bg-white dark:bg-black rounded-full mr-2 animate-pulse"></div>
                  Live
                </Badge>
                {hasMaxPainActive && (
                  <Badge className="absolute top-4 right-4 bg-red-600 text-white border border-white rounded-lg">
                    Max Pain Active
                  </Badge>
                )}
              </div>
            </div>

            {/* Auction Details - Takes up 1/3 of the width */}
            <div className="lg:col-span-1 w-full">
              <div className="bg-white dark:bg-[#000000] rounded-2xl p-6 border border-[#000000] dark:border-white h-full flex flex-col">
                {/* Title Section */}
                <div className="mb-4">
                  <h1 className="text-2xl font-bold text-black dark:text-white mb-1 leading-tight">
                    Digital Dreams: Neon Cityscape
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">by FutureMuse</p>
                </div>

                {/* About Section */}
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-black dark:text-white mb-3">About this piece</h2>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    A stunning piece that encapsulates a futuristic neon cityscape with digital cores and cosmic
                    spirits.
                  </p>
                </div>

                {/* Current Bid Section */}
                <div className="mb-6">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Current bid</p>
                  <p className="text-3xl font-bold text-black dark:text-white">
                    {auctionState.currentBid.toFixed(2)} ETH
                  </p>
                </div>

                {/* Countdown Section */}
                <div className="rounded-lg p-4 mb-6 bg-white">
                  <div className="flex items-center justify-center mb-3">
                    <Clock className="h-4 w-4 mr-2 text-black" />
                    <span className="text-sm text-black">Auction ending in</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="flex space-x-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-black">{timeLeft.days.toString().padStart(2, "0")}</div>
                        <div className="text-xs text-black mt-1">Days</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-black">
                          {timeLeft.hours.toString().padStart(2, "0")}
                        </div>
                        <div className="text-xs text-black mt-1">Hours</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-black">
                          {timeLeft.minutes.toString().padStart(2, "0")}
                        </div>
                        <div className="text-xs text-black mt-1">Minutes</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-black">
                          {timeLeft.seconds.toString().padStart(2, "0")}
                        </div>
                        <div className="text-xs text-black mt-1">Seconds</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bidding Section - EXACT MATCH TO SCREENSHOTS */}
                <div className="space-y-3 flex-1 flex flex-col justify-end">
                  {/* Min Bid Button - BLACK with WHITE text and WHITE border (ALWAYS) */}
                  <div
                    onClick={() => !isHighestBidder && handleBid("min")}
                    className={`w-full py-4 rounded-xl text-sm font-medium flex items-center justify-center cursor-pointer transition-opacity ${
                      isHighestBidder ? "opacity-50 cursor-not-allowed" : "hover:opacity-80"
                    }`}
                    style={{
                      backgroundColor: "#000000",
                      color: "#ffffff",
                      border: "2px solid #ffffff",
                    }}
                  >
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Min Bid (1%) - {getMinBid().toFixed(2)} ETH
                  </div>

                  {/* Max Bid Button - WHITE with BLACK text and BLACK border (ALWAYS) */}
                  <div
                    onClick={() => !isHighestBidder && handleBid("max")}
                    className={`w-full py-4 rounded-xl text-sm font-medium flex items-center justify-center cursor-pointer transition-opacity ${
                      isHighestBidder ? "opacity-50 cursor-not-allowed" : "hover:opacity-80"
                    }`}
                    style={{
                      backgroundColor: "#ffffff",
                      color: "#000000",
                      border: "2px solid #000000",
                    }}
                  >
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Max Bid (10%) - {getMaxBid().toFixed(2)} ETH
                  </div>

                  {/* Bottom Row */}
                  <div className="flex items-center space-x-2">
                    {/* Custom Bid Input - WHITE with BLACK text and BLACK border (ALWAYS) */}
                    <div className="relative w-16">
                      <input
                        type="number"
                        value={bidAmount.toFixed(1)}
                        onChange={(e) => {
                          const value = Number.parseFloat(e.target.value) || auctionState.currentBid * 1.01
                          setBidAmount(Math.max(auctionState.currentBid * 1.01, value))
                        }}
                        style={{
                          backgroundColor: "#ffffff",
                          color: "#000000",
                          border: "2px solid #000000",
                        }}
                        className="w-full font-bold py-2 px-2 pr-6 rounded-xl focus:outline-none focus:ring-2 focus:ring-black text-center text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        min={auctionState.currentBid * 1.01}
                        step="0.1"
                      />
                      <div className="absolute right-1 top-0 h-full flex items-center">
                        <button
                          onClick={incrementBid}
                          className="p-1 text-black hover:bg-gray-200 rounded"
                          type="button"
                        >
                          <ChevronUp className="h-3 w-3" />
                        </button>
                      </div>
                    </div>

                    {/* Max Pain Button - BLACK with WHITE text (ALWAYS) */}
                    <div
                      onClick={() => !(isHighestBidder && !hasMaxPainActive) && handleMaxPain()}
                      className={`rounded-xl py-2 px-4 text-sm font-semibold whitespace-nowrap transition-opacity cursor-pointer ${
                        isHighestBidder && !hasMaxPainActive ? "opacity-50 cursor-not-allowed" : "hover:opacity-80"
                      }`}
                      style={{
                        backgroundColor: hasMaxPainActive ? "#dc2626" : "#000000",
                        color: "#ffffff",
                        border: "none",
                      }}
                    >
                      {hasMaxPainActive ? "Cancel Max Pain" : "Max Pain"}
                    </div>

                    {/* I'm Out, Thanks Button - BLACK with WHITE text (ALWAYS) */}
                    <div
                      onClick={handleOptOut}
                      className="flex-1 font-medium rounded-xl py-2 text-sm transition-opacity cursor-pointer hover:opacity-80 text-center"
                      style={{
                        backgroundColor: "#000000",
                        color: "#ffffff",
                        border: "none",
                      }}
                    >
                      I'm Out, Thanks
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Auctions Section */}
      <section className="py-8 sm:py-12 bg-gray-50 dark:bg-[#000000]">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-black dark:text-white mb-2 sm:mb-4">
              Upcoming Auctions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {upcomingAuctions.map((auction) => (
              <Card
                key={auction.id}
                className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-[#000000] border-[#000000] dark:border-white rounded-2xl"
              >
                <div className="relative">
                  <img
                    src="/placeholder.svg?height=300&width=400&text=NFT Artwork"
                    alt={auction.title}
                    className="w-full h-48 sm:h-64 object-cover border-b border-black dark:border-white"
                  />
                  <Badge className="absolute top-3 right-3 bg-black dark:bg-white text-white dark:text-black border border-white dark:border-black rounded-lg text-xs">
                    Upcoming
                  </Badge>
                </div>
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-black dark:text-white mb-2 leading-tight">
                    {auction.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">by {auction.artist}</p>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Starting Bid</p>
                      <p className="text-base sm:text-lg font-bold text-black dark:text-white">{auction.startingBid}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                        <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                        <span className="whitespace-nowrap">{auction.status}</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full bg-white dark:bg-[#000000] border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black rounded-lg text-sm"
                  >
                    Set Reminder
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Chat Button */}
      <ChatButton isDark={isDark} connectedWallet={connectedWallet} />
    </div>
  )
}

export default function AuctionSite() {
  return (
    <AuctionProvider>
      {/* Prevent "Cannot redefine property: ethereum" errors at runtime */}
      <EthereumFix />
      <AuctionSiteContent />
    </AuctionProvider>
  )
}
