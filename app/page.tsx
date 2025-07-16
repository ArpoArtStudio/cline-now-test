"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Moon, Sun, Wallet, Clock, Users, TrendingUp, ChevronUp } from "lucide-react"
import ChatButton from "../components/chat-button"

export default function AuctionSite() {
  const [isDark, setIsDark] = useState(false)
  const [currentBid, setCurrentBid] = useState(1.1)
  const [bidAmount, setBidAmount] = useState(2.2)
  const [timeLeft] = useState({ days: 2, hours: 1, minutes: 57, seconds: 12 })
  const [isHighestBidder] = useState(false)
  const [connectedWallet, setConnectedWallet] = useState("")

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  const incrementBid = () => {
    setBidAmount((prev) => Math.round((prev + 0.1) * 10) / 10)
  }

  const connectWallet = () => {
    setConnectedWallet("0xF1Ed4C4cE65B6353B71f2304b3fD7641a436675F")
  }

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

  // ---------------------------------------------------------------------------
  // Guard against "Cannot redefine property: ethereum"
  // Only create a mock if no wallet provider has injected one yet.
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).ethereum === undefined) {
      Object.defineProperty(window, "ethereum", {
        value: {}, // light stub – extend as needed
        writable: false,
        configurable: false,
      })
    }
  }, [])

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? "dark bg-[#000000]" : "bg-white"}`}>
      {/* Header */}
      <header className="border-b border-gray-300 dark:border-white bg-white dark:bg-[#000000]">
        <div className="max-w-full mx-auto px-6 sm:px-8 lg:px-12">
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
                className="bg-[#000000] dark:bg-white text-white dark:text-[#000000] hover:bg-gray-800 dark:hover:bg-gray-200 border-[#000000] dark:border-white rounded-lg"
              >
                <Wallet className="h-4 w-4 mr-2" />
                {connectedWallet ? `${connectedWallet.slice(0, 6)}...${connectedWallet.slice(-4)}` : "Connect Wallet"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Live Auction Section */}
      <section className="py-6 bg-white dark:bg-[#000000]">
        <div className="max-w-full mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6 items-start">
            {/* Artwork Image - Takes up 3/4 of the width on large screens */}
            <div className="lg:col-span-3 flex justify-center">
              <div className="relative w-full max-w-4xl">
                <img
                  src="/placeholder.svg?height=600&width=800&text=Digital Dreams: Neon Cityscape"
                  alt="Digital Dreams: Neon Cityscape"
                  className="w-full h-auto object-cover rounded-2xl shadow-2xl border border-black dark:border-white"
                />
                <Badge className="absolute top-4 left-4 bg-black dark:bg-white text-white dark:text-black border border-white dark:border-black rounded-lg">
                  <div className="w-2 h-2 bg-white dark:bg-black rounded-full mr-2 animate-pulse"></div>
                  Live
                </Badge>
              </div>
            </div>

            {/* Auction Details - Takes up 1/4 of the width on large screens */}
            <div className="lg:col-span-1 w-full">
              <div className="bg-gray-100 dark:bg-[#000000] rounded-2xl p-4 border border-[#000000] dark:border-white h-fit flex flex-col">
                {/* Title Section - Bigger and Bold */}
                <div className="mb-4">
                  <h2 className="text-2xl font-black text-black dark:text-white mb-2">
                    Digital Dreams: Neon Cityscape
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">by FutureMuse</p>
                </div>

                {/* About Section - Medium Size */}
                <div className="mb-4">
                  <p className="text-lg font-semibold text-gray-500 dark:text-gray-400 mb-2">About this piece</p>
                  <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                    A stunning piece that encapsulates a futuristic neon cityscape with digital cores and cosmic
                    spirits.
                  </p>

                  {/* Auction Details Grid */}
                  <div className="grid grid-cols-2 gap-4 text-xs mb-3">
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Edition:</span>
                      <div className="font-semibold text-black dark:text-white">1 of 1</div>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Category:</span>
                      <div className="font-semibold text-black dark:text-white">Digital Art</div>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Created:</span>
                      <div className="font-semibold text-black dark:text-white">2024</div>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Size:</span>
                      <div className="font-semibold text-black dark:text-white">4K Resolution</div>
                    </div>
                  </div>
                </div>

                {/* Current Bid Section - Bold Price */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Current Bid</span>
                    <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
                      <Users className="h-4 w-4" />
                      <span>24 bidders</span>
                    </div>
                  </div>
                  <div className="text-2xl font-black text-black dark:text-white mb-3">{currentBid.toFixed(1)} ETH</div>

                  {isHighestBidder && (
                    <div className="text-sm text-green-600 dark:text-green-400 mb-3">You are the highest bidder</div>
                  )}
                </div>

                {/* Countdown Timer - Centered Numbers */}
                <div className="mb-5">
                  <div className="grid grid-cols-4 gap-3">
                    {[
                      { label: "Days", value: timeLeft.days },
                      { label: "Hours", value: timeLeft.hours },
                      { label: "Minutes", value: timeLeft.minutes },
                      { label: "Seconds", value: timeLeft.seconds },
                    ].map((item, index) => (
                      <div key={index} className="text-center">
                        <div className="bg-white dark:bg-[#000000] rounded-lg p-4 shadow-sm border border-[#000000] dark:border-white flex items-center justify-center">
                          <div className="text-xl font-black text-[#000000] dark:text-white">
                            {item.value.toString().padStart(2, "0")}
                          </div>
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">{item.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bidding Section */}
                <div className="space-y-4">
                  {/* Min and Max Bid buttons */}
                  <Button className="w-full bg-[#000000] dark:bg-[#000000] text-white border border-white py-4 rounded-lg hover:bg-gray-800 text-sm">
                    <TrendingUp className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span>Min Bid (1%) - {(currentBid * 1.01).toFixed(2)} ETH</span>
                  </Button>

                  <Button className="w-full bg-white dark:bg-white text-black border border-black py-4 rounded-lg hover:bg-gray-100 text-sm">
                    <TrendingUp className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span>Max Bid (10%) - {(currentBid * 1.1).toFixed(2)} ETH</span>
                  </Button>

                  {/* Custom Bid Section - Aligned Max Pain and Input */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="flex-1 relative">
                        <input
                          type="number"
                          value={bidAmount.toFixed(1)}
                          onChange={(e) => {
                            const value = Number.parseFloat(e.target.value) || currentBid * 2
                            setBidAmount(Math.max(currentBid * 2, value))
                          }}
                          className="w-full bg-white dark:bg-[#000000] border border-black dark:border-white text-black dark:text-white font-bold py-4 px-4 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white text-center text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          min={currentBid * 2}
                          step="0.1"
                        />
                        <div className="absolute right-2 top-0 h-full flex items-center">
                          <button
                            onClick={incrementBid}
                            className="p-2 text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800 rounded"
                            type="button"
                          >
                            <ChevronUp className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      <Button
                        className="bg-[#000000] dark:bg-white text-white dark:text-[#000000] rounded-lg border border-[#000000] dark:border-white hover:bg-gray-800 dark:hover:bg-gray-200 py-4 px-6 text-sm font-semibold whitespace-nowrap h-[56px]"
                        disabled={isHighestBidder}
                      >
                        Max Pain
                      </Button>
                    </div>

                    <Button className="w-full bg-white dark:bg-[#000000] text-black dark:text-white border border-black dark:border-white font-semibold rounded-lg hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black py-4 text-sm">
                      I'm Out, Thanks
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Auctions Section */}
      <section className="py-12 bg-gray-50 dark:bg-[#000000]">
        <div className="max-w-full mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-4">Upcoming Auctions</h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
              Discover extraordinary digital artworks scheduled for upcoming auctions. Get ready to bid on the next wave
              of digital masterpieces.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingAuctions.map((auction) => (
              <Card
                key={auction.id}
                className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-[#000000] border-[#000000] dark:border-white rounded-2xl"
              >
                <div className="relative">
                  <img
                    src="/placeholder.svg?height=300&width=400&text=NFT Artwork"
                    alt={auction.title}
                    className="w-full h-64 object-cover border-b border-black dark:border-white"
                  />
                  <Badge className="absolute top-3 right-3 bg-black dark:bg-white text-white dark:text-black border border-white dark:border-black rounded-lg">
                    Upcoming
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-black dark:text-white mb-2">{auction.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">by {auction.artist}</p>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Starting Bid</p>
                      <p className="text-lg font-bold text-black dark:text-white">{auction.startingBid}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Clock className="h-4 w-4 mr-1" />
                        {auction.status}
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full bg-white dark:bg-[#000000] border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black rounded-lg"
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
      <ChatButton isDark={isDark} connectedWallet={connectedWallet} currentBid={currentBid} />
    </div>
  )
}
