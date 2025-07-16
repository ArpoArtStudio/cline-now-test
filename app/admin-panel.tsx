"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Search,
  TrendingUp,
  DollarSign,
  Activity,
  UserPlus,
  Eye,
  Ban,
  Award,
  Gavel,
  Moon,
  Sun,
  X,
  BarChart3,
  LineChart,
  PieChart,
  Upload,
  Calendar,
  Clock,
} from "lucide-react"

import { SalesTrendChart, BidActivityChart, UserGrowthChart, VolumeDistributionChart } from "../components/demo-charts"

interface AdminPanelProps {
  onClose: () => void
  isDark: boolean
  toggleTheme: () => void
}

const ChatDayModal = ({
  date,
  dayName,
  onClose,
  isDark,
}: { date: string; dayName: string; onClose: () => void; isDark: boolean }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-[#000000] border border-black dark:border-white rounded-2xl p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-black dark:text-white">
            Chat History for {date} ({dayName})
          </h3>
          <Button
            onClick={onClose}
            variant="outline"
            className="bg-white dark:bg-[#000000] border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black rounded-lg"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Mock Chat Data */}
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <div className="flex justify-between items-center">
              <div className="text-sm font-medium text-black dark:text-white">0x1234...5678</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">14:30:15</div>
            </div>
            <p className="text-gray-700 dark:text-gray-300">Great artwork!</p>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <div className="flex justify-between items-center">
              <div className="text-sm font-medium text-black dark:text-white">artlover.eth</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">14:32:20</div>
            </div>
            <p className="text-gray-700 dark:text-gray-300">When does bidding end?</p>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <div className="flex justify-between items-center">
              <div className="text-sm font-medium text-black dark:text-white">0x9876...4321</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">09:15:30</div>
            </div>
            <p className="text-gray-700 dark:text-gray-300">This is spam content</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AdminPanel({ onClose, isDark, toggleTheme }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState("analytics")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("7d")
  const [showDetailedChart, setShowDetailedChart] = useState<string | null>(null)

  const [newBlockedWord, setNewBlockedWord] = useState("")
  const [blockedWords, setBlockedWords] = useState(() => {
    if (typeof window !== "undefined") {
      const storedWords = localStorage.getItem("blockedWords")
      return storedWords ? JSON.parse(storedWords) : ["spam", "scam", "hack", "private key", "phishing"]
    }
    return ["spam", "scam", "hack", "private key", "phishing"]
  })
  const [selectedHistoryDays, setSelectedHistoryDays] = useState<string[]>([])
  const [selectedChatDay, setSelectedChatDay] = useState<{ date: string; dayName: string } | null>(null)

  // Mint form state
  const [mintForm, setMintForm] = useState({
    title: "",
    description: "",
    artistName: "",
    startingPrice: "",
    royaltyPercent: "",
    auctionDate: "",
    auctionTime: "",
    duration: "7",
    uploadedImage: null as File | null,
  })

  const [showMintConfirmation, setShowMintConfirmation] = useState(false)

  // Mock chat history data
  const chatHistory = [
    { date: "2024-01-15", dayName: "Today", messageCount: 156, activeUsers: 23, warnings: 2 },
    { date: "2024-01-14", dayName: "Yesterday", messageCount: 203, activeUsers: 31, warnings: 1 },
    { date: "2024-01-13", dayName: "2 days ago", messageCount: 178, activeUsers: 28, warnings: 0 },
    { date: "2024-01-12", dayName: "3 days ago", messageCount: 145, activeUsers: 19, warnings: 3 },
    { date: "2024-01-11", dayName: "4 days ago", messageCount: 167, activeUsers: 25, warnings: 1 },
    { date: "2024-01-10", dayName: "5 days ago", messageCount: 134, activeUsers: 22, warnings: 0 },
    { date: "2024-01-09", dayName: "6 days ago", messageCount: 189, activeUsers: 29, warnings: 2 },
  ]

  // Mock moderation history
  const moderationHistory = [
    {
      id: 1,
      userAddress: "0x1234...5678",
      action: "warned",
      reason: "Inappropriate language",
      date: "2024-01-15 14:30",
      status: "active",
    },
    {
      id: 2,
      userAddress: "0x9876...4321",
      action: "restricted",
      reason: "Spam content",
      date: "2024-01-14 09:15",
      status: "blacklisted",
    },
    {
      id: 3,
      userAddress: "0xABCD...EFGH",
      action: "warned",
      reason: "Rate limit exceeded",
      date: "2024-01-13 16:45",
      status: "active",
    },
  ]

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Check file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        alert("File size must be less than 10MB")
        return
      }
      setMintForm({ ...mintForm, uploadedImage: file })
    }
  }

  const handleMintSubmit = () => {
    // Validate form
    if (
      !mintForm.title ||
      !mintForm.description ||
      !mintForm.artistName ||
      !mintForm.startingPrice ||
      !mintForm.royaltyPercent ||
      !mintForm.auctionDate ||
      !mintForm.auctionTime ||
      !mintForm.uploadedImage
    ) {
      alert("Please fill in all fields and upload an image")
      return
    }

    setShowMintConfirmation(true)
  }

  const confirmMint = () => {
    // In real app, this would mint the NFT and add to upcoming auctions
    alert("NFT minted successfully! It will appear in upcoming auctions.")
    setShowMintConfirmation(false)
    // Reset form
    setMintForm({
      title: "",
      description: "",
      artistName: "",
      startingPrice: "",
      royaltyPercent: "",
      auctionDate: "",
      auctionTime: "",
      duration: "7",
      uploadedImage: null,
    })
  }

  const addBlockedWord = () => {
    if (newBlockedWord.trim() && !blockedWords.includes(newBlockedWord.trim().toLowerCase())) {
      const updatedWords = [...blockedWords, newBlockedWord.trim().toLowerCase()]
      setBlockedWords(updatedWords)
      localStorage.setItem("blockedWords", JSON.stringify(updatedWords))
      setNewBlockedWord("")
    }
  }

  const removeBlockedWord = (word: string) => {
    const updatedWords = blockedWords.filter((w) => w !== word)
    setBlockedWords(updatedWords)
    localStorage.setItem("blockedWords", JSON.stringify(updatedWords))
  }

  const toggleHistorySelection = (date: string) => {
    setSelectedHistoryDays((prev) => (prev.includes(date) ? prev.filter((d) => d !== date) : [...prev, date]))
  }

  const deleteSelectedHistory = () => {
    if (confirm(`Delete chat history for ${selectedHistoryDays.length} selected days?`)) {
      alert(`Deleted chat history for ${selectedHistoryDays.length} days`)
      setSelectedHistoryDays([])
    }
  }

  const viewDayHistory = (date: string, dayName: string) => {
    setSelectedChatDay({ date, dayName })
  }

  const exportSelectedHistory = () => {
    if (selectedHistoryDays.length === 0) {
      alert("Please select days to export")
      return
    }

    const csvContent = [
      "Date,User,Message,Timestamp,Action",
      ...selectedHistoryDays.flatMap((date) => [
        `${date},0x1234...5678,Great artwork!,14:30:15,normal`,
        `${date},artlover.eth,When does bidding end?,14:32:20,normal`,
        `${date},0x9876...4321,This is spam content,09:15:30,flagged`,
      ]),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `chat-history-selected-${new Date().toISOString().split("T")[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  const unblacklistUser = (userAddress: string) => {
    if (confirm(`Unblacklist user ${userAddress}?`)) {
      alert(`User ${userAddress} has been unblacklisted`)
    }
  }

  const timeFrames = [
    { key: "7d", label: "7 Days" },
    { key: "1m", label: "1 Month" },
    { key: "3m", label: "3 Months" },
    { key: "6m", label: "6 Months" },
    { key: "1y", label: "1 Year" },
    { key: "all", label: "All Time" },
  ]

  // Mock data for different time frames
  const getAnalyticsData = (timeFrame: string) => {
    const data = {
      "7d": {
        totalSales: "127.8 ETH",
        totalBids: "1,543",
        totalVolume: "289.2 ETH",
        activeUsers: "234",
        joinedUsers: "156",
        liveUsers: "89",
        growth: {
          sales: "+8.2%",
          bids: "+12.5%",
          volume: "+15.3%",
          active: "+5.7%",
          joined: "+23.1%",
          live: "Current",
        },
      },
      "1m": {
        totalSales: "1,247.8 ETH",
        totalBids: "15,432",
        totalVolume: "2,891.2 ETH",
        activeUsers: "1,234",
        joinedUsers: "567",
        liveUsers: "89",
        growth: {
          sales: "+12.5%",
          bids: "+8.2%",
          volume: "+15.3%",
          active: "+5.7%",
          joined: "+23.1%",
          live: "Current",
        },
      },
      "3m": {
        totalSales: "3,247.8 ETH",
        totalBids: "45,432",
        totalVolume: "7,891.2 ETH",
        activeUsers: "2,234",
        joinedUsers: "1,567",
        liveUsers: "89",
        growth: {
          sales: "+18.5%",
          bids: "+14.2%",
          volume: "+22.3%",
          active: "+8.7%",
          joined: "+31.1%",
          live: "Current",
        },
      },
      "6m": {
        totalSales: "6,247.8 ETH",
        totalBids: "85,432",
        totalVolume: "14,891.2 ETH",
        activeUsers: "3,234",
        joinedUsers: "2,567",
        liveUsers: "89",
        growth: {
          sales: "+25.5%",
          bids: "+19.2%",
          volume: "+28.3%",
          active: "+12.7%",
          joined: "+38.1%",
          live: "Current",
        },
      },
      "1y": {
        totalSales: "12,247.8 ETH",
        totalBids: "185,432",
        totalVolume: "28,891.2 ETH",
        activeUsers: "5,234",
        joinedUsers: "4,567",
        liveUsers: "89",
        growth: {
          sales: "+45.5%",
          bids: "+32.2%",
          volume: "+52.3%",
          active: "+28.7%",
          joined: "+67.1%",
          live: "Current",
        },
      },
      all: {
        totalSales: "25,247.8 ETH",
        totalBids: "385,432",
        totalVolume: "58,891.2 ETH",
        activeUsers: "8,234",
        joinedUsers: "8,567",
        liveUsers: "89",
        growth: {
          sales: "Since launch",
          bids: "Since launch",
          volume: "Since launch",
          active: "Since launch",
          joined: "Since launch",
          live: "Current",
        },
      },
    }
    return data[timeFrame as keyof typeof data] || data["7d"]
  }

  const analytics = getAnalyticsData(selectedTimeFrame)

  const mockUsers = [
    {
      address: "0x1234...5678",
      totalBids: 45,
      auctionsWon: 12,
      totalSpent: "23.4 ETH",
      joinDate: "2024-01-15",
      lastActive: "2 hours ago",
      status: "active",
      reputation: 95,
    },
    {
      address: "0x9876...4321",
      totalBids: 23,
      auctionsWon: 5,
      totalSpent: "8.7 ETH",
      joinDate: "2024-02-20",
      lastActive: "1 day ago",
      status: "active",
      reputation: 87,
    },
    {
      address: "0xABCD...EFGH",
      totalBids: 78,
      auctionsWon: 25,
      totalSpent: "156.2 ETH",
      joinDate: "2023-11-08",
      lastActive: "5 minutes ago",
      status: "blacklisted",
      reputation: 45,
    },
  ]

  const filteredUsers = mockUsers.filter((user) => user.address.toLowerCase().includes(searchTerm.toLowerCase()))

  const toggleUserStatus = (address: string) => {
    console.log(`Toggling status for user: ${address}`)
  }

  const openDetailedChart = (chartType: string) => {
    setShowDetailedChart(chartType)
  }

  const ChartModal = ({ chartType, onClose }: { chartType: string; onClose: () => void }) => {
    const [modalTimeFrame, setModalTimeFrame] = useState("7d")

    const getChartTitle = (type: string) => {
      const titles = {
        sales: "Sales Analytics",
        bids: "Bidding Activity",
        volume: "Trading Volume",
        users: "User Activity",
        joined: "User Growth",
        live: "Live Users",
      }
      return titles[type as keyof typeof titles] || "Analytics"
    }

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-[#000000] border border-black dark:border-white rounded-2xl p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-black dark:text-white">{getChartTitle(chartType)}</h3>
            <Button
              onClick={onClose}
              variant="outline"
              className="bg-white dark:bg-[#000000] border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black rounded-lg"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Time Frame Selector */}
          <div className="flex flex-wrap gap-2 mb-6">
            {timeFrames.map((frame) => (
              <Button
                key={frame.key}
                onClick={() => setModalTimeFrame(frame.key)}
                className={`${
                  modalTimeFrame === frame.key
                    ? "bg-[#000000] dark:bg-white text-white dark:text-[#000000]"
                    : "bg-white dark:bg-[#000000] text-black dark:text-white border border-black dark:border-white"
                } rounded-lg text-sm px-3 py-1`}
              >
                {frame.label}
              </Button>
            ))}
          </div>

          {/* Dynamic Chart based on type and timeframe */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-8 mb-4">
            {chartType === "sales" && <SalesTrendChart isDark={isDark} timeFrame={modalTimeFrame} />}
            {chartType === "bids" && <BidActivityChart isDark={isDark} timeFrame={modalTimeFrame} />}
            {chartType === "users" && <UserGrowthChart isDark={isDark} timeFrame={modalTimeFrame} />}
            {chartType === "volume" && <VolumeDistributionChart isDark={isDark} timeFrame={modalTimeFrame} />}
          </div>

          {/* Chart Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <div className="text-lg font-bold text-black dark:text-white">
                {getAnalyticsData(modalTimeFrame).totalSales}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Peak Value</div>
            </div>
            <div className="text-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <div className="text-lg font-bold text-black dark:text-white">+{Math.floor(Math.random() * 30)}%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Growth</div>
            </div>
            <div className="text-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <div className="text-lg font-bold text-black dark:text-white">{Math.floor(Math.random() * 100)}%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Trend</div>
            </div>
            <div className="text-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <div className="text-lg font-bold text-black dark:text-white">{Math.floor(Math.random() * 50)}%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Volatility</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const MintConfirmationModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-[#000000] border border-black dark:border-white rounded-2xl p-6 max-w-md w-full mx-4">
        <h3 className="text-xl font-bold text-black dark:text-white mb-4">Confirm Mint</h3>
        <div className="space-y-3 mb-6">
          <div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Title:</span>
            <p className="font-semibold text-black dark:text-white">{mintForm.title}</p>
          </div>
          <div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Artist:</span>
            <p className="font-semibold text-black dark:text-white">{mintForm.artistName}</p>
          </div>
          <div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Starting Price:</span>
            <p className="font-semibold text-black dark:text-white">{mintForm.startingPrice} ETH</p>
          </div>
          <div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Royalty:</span>
            <p className="font-semibold text-black dark:text-white">{mintForm.royaltyPercent}%</p>
          </div>
          <div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Auction Start:</span>
            <p className="font-semibold text-black dark:text-white">
              {mintForm.auctionDate} at {mintForm.auctionTime}
            </p>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button
            onClick={() => setShowMintConfirmation(false)}
            variant="outline"
            className="flex-1 bg-white dark:bg-[#000000] border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black rounded-lg"
          >
            Cancel
          </Button>
          <Button
            onClick={confirmMint}
            className="flex-1 bg-[#000000] dark:bg-white text-white dark:text-[#000000] hover:bg-gray-800 dark:hover:bg-gray-200 rounded-lg"
          >
            Confirm Mint
          </Button>
        </div>
      </div>
    </div>
  )

  // Add this useEffect to inject custom CSS
  useEffect(() => {
    const style = document.createElement("style")
    style.textContent = `
    /* Remove blue colors from date/time inputs */
    input[type="date"]::-webkit-calendar-picker-indicator,
    input[type="time"]::-webkit-calendar-picker-indicator {
      filter: invert(1);
    }
    
    input[type="date"]:focus,
    input[type="time"]:focus {
      outline: 2px solid ${isDark ? "#ffffff" : "#000000"};
      outline-offset: 2px;
    }
    
    /* Custom date/time picker styling */
    input[type="date"]::-webkit-datetime-edit-fields-wrapper,
    input[type="time"]::-webkit-datetime-edit-fields-wrapper {
      background: transparent;
    }
    
    input[type="date"]::-webkit-datetime-edit,
    input[type="time"]::-webkit-datetime-edit {
      color: ${isDark ? "#ffffff" : "#000000"};
    }
  `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [isDark])

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? "dark bg-[#000000]" : "bg-white"}`}>
      {/* Header */}
      <header className="border-b border-gray-300 dark:border-white bg-white dark:bg-[#000000]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button
                onClick={onClose}
                variant="outline"
                className="bg-white dark:bg-[#000000] border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black rounded-lg"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Auction
              </Button>
              <h1 className="text-xl font-bold text-black dark:text-white">Admin Panel</h1>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              className="p-2 bg-white dark:bg-[#000000] border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black rounded-lg"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-4 mb-8">
          <Button
            onClick={() => setActiveTab("analytics")}
            className={`${
              activeTab === "analytics"
                ? "bg-[#000000] dark:bg-white text-white dark:text-[#000000]"
                : "bg-white dark:bg-[#000000] text-black dark:text-white border border-black dark:border-white"
            } rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200`}
          >
            Analytics
          </Button>
          <Button
            onClick={() => setActiveTab("users")}
            className={`${
              activeTab === "users"
                ? "bg-[#000000] dark:bg-white text-white dark:text-[#000000]"
                : "bg-white dark:bg-[#000000] text-black dark:text-white border border-black dark:border-white"
            } rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200`}
          >
            User Management
          </Button>
          <Button
            onClick={() => setActiveTab("chat")}
            className={`${
              activeTab === "chat"
                ? "bg-[#000000] dark:bg-white text-white dark:text-[#000000]"
                : "bg-white dark:bg-[#000000] text-black dark:text-white border border-black dark:border-white"
            } rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200`}
          >
            Chat Management
          </Button>
          <Button
            onClick={() => setActiveTab("mint")}
            className={`${
              activeTab === "mint"
                ? "bg-[#000000] dark:bg-white text-white dark:text-[#000000]"
                : "bg-white dark:bg-[#000000] text-black dark:text-white border border-black dark:border-white"
            } rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200`}
          >
            Mint NFT
          </Button>
        </div>

        {/* Mint Tab */}
        {activeTab === "mint" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-black dark:text-white">Mint New NFT</h2>
            </div>

            <Card className="bg-white dark:bg-[#000000] border-black dark:border-white rounded-2xl">
              <CardHeader>
                <CardTitle className="text-black dark:text-white">Create New Auction</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Upload Art */}
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white mb-2">Upload Art</label>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center relative">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {mintForm.uploadedImage ? mintForm.uploadedImage.name : "Click to upload or drag and drop"}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-lg font-medium text-black dark:text-white mb-2">Title</label>
                  <Input
                    value={mintForm.title}
                    onChange={(e) => setMintForm({ ...mintForm, title: e.target.value })}
                    placeholder="Enter artwork title"
                    className="bg-white dark:bg-[#000000] border-black dark:border-white text-black dark:text-white rounded-lg text-lg py-3"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-lg font-medium text-black dark:text-white mb-2">Description</label>
                  <textarea
                    value={mintForm.description}
                    onChange={(e) => setMintForm({ ...mintForm, description: e.target.value })}
                    placeholder="Describe your artwork"
                    rows={4}
                    className="w-full bg-white dark:bg-[#000000] border border-black dark:border-white text-black dark:text-white rounded-lg p-3 text-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                  />
                </div>

                {/* Artist Name */}
                <div>
                  <label className="block text-lg font-medium text-black dark:text-white mb-2">Artist Name</label>
                  <Input
                    value={mintForm.artistName}
                    onChange={(e) => setMintForm({ ...mintForm, artistName: e.target.value })}
                    placeholder="Enter artist name"
                    className="bg-white dark:bg-[#000000] border-black dark:border-white text-black dark:text-white rounded-lg text-lg py-3"
                  />
                </div>

                {/* Starting Price and Royalty - Side by Side */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-lg font-medium text-black dark:text-white mb-2">
                      Starting Price (ETH)
                    </label>
                    <Input
                      type="number"
                      step="0.01"
                      value={mintForm.startingPrice}
                      onChange={(e) => setMintForm({ ...mintForm, startingPrice: e.target.value })}
                      placeholder="0.00"
                      className="bg-white dark:bg-[#000000] border-black dark:border-white text-black dark:text-white rounded-lg text-lg py-3"
                    />
                  </div>
                  <div>
                    <label className="block text-lg font-medium text-black dark:text-white mb-2">
                      Royalty % (Future Sales)
                    </label>
                    <Input
                      type="number"
                      min="0"
                      max="20"
                      value={mintForm.royaltyPercent}
                      onChange={(e) => setMintForm({ ...mintForm, royaltyPercent: e.target.value })}
                      placeholder="5"
                      className="bg-white dark:bg-[#000000] border-black dark:border-white text-black dark:text-white rounded-lg text-lg py-3"
                    />
                  </div>
                </div>

                {/* Auction Date and Time - Side by Side */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-lg font-medium text-black dark:text-white mb-2">Auction Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                      <Input
                        type="date"
                        value={mintForm.auctionDate}
                        onChange={(e) => setMintForm({ ...mintForm, auctionDate: e.target.value })}
                        className="pl-10 bg-white dark:bg-[#000000] border-black dark:border-white text-black dark:text-white rounded-lg text-lg py-3"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-lg font-medium text-black dark:text-white mb-2">
                      Auction Start Time
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                      <Input
                        type="time"
                        value={mintForm.auctionTime}
                        onChange={(e) => setMintForm({ ...mintForm, auctionTime: e.target.value })}
                        className="pl-10 bg-white dark:bg-[#000000] border-black dark:border-white text-black dark:text-white rounded-lg text-lg py-3"
                      />
                    </div>
                  </div>
                </div>

                {/* Auction Duration */}
                <div>
                  <label className="block text-lg font-medium text-black dark:text-white mb-3">Auction Duration</label>

                  {/* Duration Buttons - Smaller and side by side */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {[
                      { key: "1h", label: "1H", value: "1h" },
                      { key: "6h", label: "6H", value: "6h" },
                      { key: "12h", label: "12H", value: "12h" },
                      { key: "24h", label: "1D", value: "24h" },
                      { key: "48h", label: "2D", value: "48h" },
                      { key: "72h", label: "3D", value: "72h" },
                    ].map((duration) => (
                      <Button
                        key={duration.key}
                        onClick={() => setMintForm({ ...mintForm, duration: duration.value })}
                        className={`${
                          mintForm.duration === duration.value
                            ? "bg-[#000000] dark:bg-white text-white dark:text-[#000000]"
                            : "bg-white dark:bg-[#000000] text-black dark:text-white border border-black dark:border-white"
                        } rounded-lg px-3 py-1 text-sm font-medium min-w-[50px]`}
                      >
                        {duration.label}
                      </Button>
                    ))}
                  </div>

                  {/* Custom Duration Input */}
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                    <label className="block text-base font-medium text-black dark:text-white mb-2">
                      Or Set Custom Duration
                    </label>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <Input
                          type="number"
                          min="0"
                          max="3"
                          placeholder="0"
                          className="w-16 text-center bg-white dark:bg-[#000000] border-black dark:border-white text-black dark:text-white rounded-lg text-lg font-bold py-2"
                        />
                        <span className="text-lg font-medium text-black dark:text-white">Days</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Input
                          type="number"
                          min="0"
                          max="23"
                          placeholder="0"
                          className="w-16 text-center bg-white dark:bg-[#000000] border-black dark:border-white text-black dark:text-white rounded-lg text-lg font-bold py-2"
                        />
                        <span className="text-lg font-medium text-black dark:text-white">Hours</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Input
                          type="number"
                          min="1"
                          max="59"
                          placeholder="1"
                          className="w-16 text-center bg-white dark:bg-[#000000] border-black dark:border-white text-black dark:text-white rounded-lg text-lg font-bold py-2"
                        />
                        <span className="text-lg font-medium text-black dark:text-white">Minutes</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      Maximum duration: 3 days. Minimum duration: 1 minute.
                    </p>
                  </div>
                </div>

                {/* Mint Button */}
                <div className="pt-4">
                  <Button
                    onClick={handleMintSubmit}
                    className="w-full bg-[#000000] dark:bg-white text-white dark:text-[#000000] hover:bg-gray-800 dark:hover:bg-gray-200 rounded-lg py-3 text-lg font-semibold"
                  >
                    MINT NOW
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-black dark:text-white">Site Analytics</h2>

              {/* Time Frame Selector */}
              <div className="flex space-x-2">
                {timeFrames.map((frame) => (
                  <Button
                    key={frame.key}
                    onClick={() => setSelectedTimeFrame(frame.key)}
                    className={`${
                      selectedTimeFrame === frame.key
                        ? "bg-[#000000] dark:bg-white text-white dark:text-[#000000]"
                        : "bg-white dark:bg-[#000000] text-black dark:text-white border border-black dark:border-white"
                    } rounded-lg text-sm px-3 py-1`}
                  >
                    {frame.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Analytics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-white dark:bg-[#000000] border-black dark:border-white rounded-2xl">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-black dark:text-white">Total Sales</CardTitle>
                  <DollarSign
                    className="h-4 w-4 text-black dark:text-white cursor-pointer hover:scale-110 transition-transform"
                    onClick={() => openDetailedChart("sales")}
                  />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-black dark:text-white">{analytics.totalSales}</div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{analytics.growth.sales} from last period</p>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-[#000000] border-black dark:border-white rounded-2xl">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-black dark:text-white">Total Bids</CardTitle>
                  <Gavel
                    className="h-4 w-4 text-black dark:text-white cursor-pointer hover:scale-110 transition-transform"
                    onClick={() => openDetailedChart("bids")}
                  />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-black dark:text-white">{analytics.totalBids}</div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{analytics.growth.bids} from last period</p>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-[#000000] border-black dark:border-white rounded-2xl">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-black dark:text-white">Total Volume</CardTitle>
                  <TrendingUp
                    className="h-4 w-4 text-black dark:text-white cursor-pointer hover:scale-110 transition-transform"
                    onClick={() => openDetailedChart("volume")}
                  />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-black dark:text-white">{analytics.totalVolume}</div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{analytics.growth.volume} from last period</p>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-[#000000] border-black dark:border-white rounded-2xl">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-black dark:text-white">Active Users</CardTitle>
                  <Activity
                    className="h-4 w-4 text-black dark:text-white cursor-pointer hover:scale-110 transition-transform"
                    onClick={() => openDetailedChart("users")}
                  />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-black dark:text-white">{analytics.activeUsers}</div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{analytics.growth.active} from last period</p>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-[#000000] border-black dark:border-white rounded-2xl">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-black dark:text-white">Joined Users</CardTitle>
                  <UserPlus
                    className="h-4 w-4 text-black dark:text-white cursor-pointer hover:scale-110 transition-transform"
                    onClick={() => openDetailedChart("joined")}
                  />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-black dark:text-white">{analytics.joinedUsers}</div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{analytics.growth.joined} from last period</p>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-[#000000] border-black dark:border-white rounded-2xl">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-black dark:text-white">Live Users</CardTitle>
                  <Eye
                    className="h-4 w-4 text-black dark:text-white cursor-pointer hover:scale-110 transition-transform"
                    onClick={() => openDetailedChart("live")}
                  />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-black dark:text-white">{analytics.liveUsers}</div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{analytics.growth.live}</p>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Charts Section - NOW DYNAMIC */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-black dark:text-white">Detailed Analytics</h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Sales Chart - Now updates with timeFrame */}
                <Card className="bg-white dark:bg-[#000000] border-black dark:border-white rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-black dark:text-white flex items-center">
                      <LineChart className="h-5 w-5 mr-2" />
                      Sales Trend
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <SalesTrendChart isDark={isDark} timeFrame={selectedTimeFrame} />
                  </CardContent>
                </Card>

                {/* Bid Activity Chart - Now updates with timeFrame */}
                <Card className="bg-white dark:bg-[#000000] border-black dark:border-white rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-black dark:text-white flex items-center">
                      <BarChart3 className="h-5 w-5 mr-2" />
                      Bid Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <BidActivityChart isDark={isDark} timeFrame={selectedTimeFrame} />
                  </CardContent>
                </Card>

                {/* User Growth Chart - Now updates with timeFrame */}
                <Card className="bg-white dark:bg-[#000000] border-black dark:border-white rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-black dark:text-white flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2" />
                      User Growth
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <UserGrowthChart isDark={isDark} timeFrame={selectedTimeFrame} />
                  </CardContent>
                </Card>

                {/* Volume Distribution - Now updates with timeFrame */}
                <Card className="bg-white dark:bg-[#000000] border-black dark:border-white rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-black dark:text-white flex items-center">
                      <PieChart className="h-5 w-5 mr-2" />
                      Volume Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <VolumeDistributionChart isDark={isDark} timeFrame={selectedTimeFrame} />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* User Management Tab */}
        {activeTab === "users" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-black dark:text-white">User Management</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  placeholder="Search wallet addresses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white dark:bg-[#000000] border-black dark:border-white text-black dark:text-white rounded-lg"
                />
              </div>
            </div>

            <div className="grid gap-4">
              {filteredUsers.map((user) => (
                <Card
                  key={user.address}
                  className="bg-white dark:bg-[#000000] border-black dark:border-white rounded-2xl"
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-lg font-bold text-black dark:text-white">{user.address}</span>
                          <Badge
                            className={`${
                              user.status === "active"
                                ? "bg-white dark:bg-white text-black border border-black"
                                : "bg-[#000000] dark:bg-[#000000] text-white border border-white"
                            } rounded-lg`}
                          >
                            {user.status}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Total Bids:</span>
                            <div className="font-bold text-black dark:text-white">{user.totalBids}</div>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Auctions Won:</span>
                            <div className="font-bold text-black dark:text-white flex items-center">
                              <Award className="h-3 w-3 mr-1" />
                              {user.auctionsWon}
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Total Spent:</span>
                            <div className="font-bold text-black dark:text-white">{user.totalSpent}</div>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Reputation:</span>
                            <div className="font-bold text-black dark:text-white">{user.reputation}%</div>
                          </div>
                        </div>

                        <div className="flex space-x-4 text-xs text-gray-600 dark:text-gray-400">
                          <span>Joined: {user.joinDate}</span>
                          <span>Last Active: {user.lastActive}</span>
                        </div>
                      </div>

                      <Button
                        onClick={() => toggleUserStatus(user.address)}
                        className={`${
                          user.status === "active"
                            ? "bg-[#000000] dark:bg-[#000000] text-white border border-white hover:bg-gray-800"
                            : "bg-white dark:bg-white text-black border border-black hover:bg-gray-100"
                        } rounded-lg`}
                      >
                        <Ban className="h-4 w-4 mr-2" />
                        {user.status === "active" ? "Blacklist" : "Unblock"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Chat Management Tab */}
        {activeTab === "chat" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-black dark:text-white">Chat Management</h2>
              <div className="flex space-x-2">
                {selectedHistoryDays.length > 0 && (
                  <div className="flex space-x-2">
                    <Button
                      onClick={exportSelectedHistory}
                      className="bg-[#000000] dark:bg-white text-white dark:text-[#000000] hover:bg-gray-800 dark:hover:bg-gray-200 border-[#000000] dark:border-white rounded-lg"
                    >
                      Export Selected ({selectedHistoryDays.length})
                    </Button>
                    <Button
                      onClick={deleteSelectedHistory}
                      className="bg-red-600 text-white hover:bg-red-700 rounded-lg"
                    >
                      Delete Selected ({selectedHistoryDays.length})
                    </Button>
                  </div>
                )}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <Input
                    placeholder="Search messages, users, keywords..."
                    className="pl-10 bg-white dark:bg-[#000000] border-black dark:border-white text-black dark:text-white rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Chat Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-white dark:bg-[#000000] border-black dark:border-white rounded-2xl">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-black dark:text-white">1,247</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Messages (7d)</p>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-[#000000] border-black dark:border-white rounded-2xl">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-black dark:text-white">89</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Active Chatters</p>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-[#000000] border-black dark:border-white rounded-2xl">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-black dark:text-white">12</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Warnings Issued</p>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-[#000000] border-black dark:border-white rounded-2xl">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-black dark:text-white">3</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Users Restricted</p>
                </CardContent>
              </Card>
            </div>

            {/* Blocked Words Management */}
            <Card className="bg-white dark:bg-[#000000] border-black dark:border-white rounded-2xl">
              <CardHeader>
                <CardTitle className="text-black dark:text-white">Blocked Words Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-2 mb-4">
                  <Input
                    value={newBlockedWord}
                    onChange={(e) => setNewBlockedWord(e.target.value)}
                    placeholder="Add new blocked word..."
                    className="flex-1 bg-white dark:bg-[#000000] border-black dark:border-white text-black dark:text-white rounded-lg"
                  />
                  <Button
                    onClick={addBlockedWord}
                    className="bg-[#000000] dark:bg-white text-white dark:text-[#000000] hover:bg-gray-800 dark:hover:bg-gray-200 rounded-lg"
                  >
                    Add Word
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {blockedWords.map((word) => (
                    <Badge key={word} className="bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-lg">
                      {word}
                      <button onClick={() => removeBlockedWord(word)} className="ml-2 text-red-500 hover:text-red-700">
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 7-Day Chat History */}
            <Card className="bg-white dark:bg-[#000000] border-black dark:border-white rounded-2xl">
              <CardHeader>
                <CardTitle className="text-black dark:text-white flex items-center justify-between">
                  <span>Chat History (Last 7 Days)</span>
                  {selectedHistoryDays.length > 0 && (
                    <Button
                      onClick={deleteSelectedHistory}
                      className="bg-red-600 text-white hover:bg-red-700 rounded-lg text-sm"
                    >
                      Delete Selected ({selectedHistoryDays.length})
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {chatHistory.map((day) => (
                    <div
                      key={day.date}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedHistoryDays.includes(day.date)
                          ? "bg-blue-100 dark:bg-blue-900 border-blue-500"
                          : "bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={selectedHistoryDays.includes(day.date)}
                            onChange={() => toggleHistorySelection(day.date)}
                            className="w-4 h-4"
                          />
                          <div onClick={() => viewDayHistory(day.date, day.dayName)} className="flex-1 hover:underline">
                            <div className="font-semibold text-black dark:text-white">
                              {day.date} ({day.dayName})
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {day.messageCount} messages • {day.activeUsers} active users
                            </div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {day.warnings > 0 && <span className="text-red-500">{day.warnings} warnings</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* User Moderation Table */}
            <Card className="bg-white dark:bg-[#000000] border-black dark:border-white rounded-2xl">
              <CardHeader>
                <CardTitle className="text-black dark:text-white">User Moderation History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-300 dark:border-gray-600">
                        <th className="text-left p-3 text-black dark:text-white">User</th>
                        <th className="text-left p-3 text-black dark:text-white">Action</th>
                        <th className="text-left p-3 text-black dark:text-white">Reason</th>
                        <th className="text-left p-3 text-black dark:text-white">Date</th>
                        <th className="text-left p-3 text-black dark:text-white">Status</th>
                        <th className="text-left p-3 text-black dark:text-white">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {moderationHistory.map((record) => (
                        <tr key={record.id} className="border-b border-gray-200 dark:border-gray-700">
                          <td className="p-3 font-mono text-sm text-black dark:text-white">{record.userAddress}</td>
                          <td className="p-3">
                            <Badge
                              className={`${
                                record.action === "warned"
                                  ? "bg-yellow-500 text-white"
                                  : record.action === "restricted"
                                    ? "bg-red-500 text-white"
                                    : "bg-gray-500 text-white"
                              } rounded-lg`}
                            >
                              {record.action}
                            </Badge>
                          </td>
                          <td className="p-3 text-sm text-gray-700 dark:text-gray-300">{record.reason}</td>
                          <td className="p-3 text-sm text-gray-600 dark:text-gray-400">{record.date}</td>
                          <td className="p-3">
                            <Badge
                              className={`${
                                record.status === "active" ? "bg-green-500 text-white" : "bg-red-500 text-white"
                              } rounded-lg`}
                            >
                              {record.status}
                            </Badge>
                          </td>
                          <td className="p-3">
                            {record.status === "blacklisted" && (
                              <Button
                                onClick={() => unblacklistUser(record.userAddress)}
                                className="bg-green-600 text-white hover:bg-green-700 rounded-lg text-xs px-3 py-1"
                              >
                                Unblacklist
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Chart Modal */}
      {showDetailedChart && <ChartModal chartType={showDetailedChart} onClose={() => setShowDetailedChart(null)} />}

      {/* Mint Confirmation Modal */}
      {showMintConfirmation && <MintConfirmationModal />}
      {selectedChatDay && (
        <ChatDayModal
          date={selectedChatDay.date}
          dayName={selectedChatDay.dayName}
          onClose={() => setSelectedChatDay(null)}
          isDark={isDark}
        />
      )}
    </div>
  )
}
