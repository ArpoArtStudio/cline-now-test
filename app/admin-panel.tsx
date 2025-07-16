"use client"

import { useState } from "react"
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
} from "lucide-react"

interface AdminPanelProps {
  onClose: () => void
  isDark: boolean
  toggleTheme: () => void
}

export default function AdminPanel({ onClose, isDark, toggleTheme }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState("analytics")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("7d")
  const [showDetailedChart, setShowDetailedChart] = useState<string | null>(null)

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

          {/* Mock Chart Area */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-8 mb-4">
            <div className="flex items-center justify-center h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 dark:text-gray-400">
                  {getChartTitle(chartType)} Chart for {timeFrames.find((f) => f.key === modalTimeFrame)?.label}
                </p>
                <p className="text-sm text-gray-400 mt-2">Interactive chart would be rendered here</p>
              </div>
            </div>
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
        </div>

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

            {/* Detailed Charts Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-black dark:text-white">Detailed Analytics</h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Sales Chart */}
                <Card className="bg-white dark:bg-[#000000] border-black dark:border-white rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-black dark:text-white flex items-center">
                      <LineChart className="h-5 w-5 mr-2" />
                      Sales Trend
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 h-48 flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600">
                      <div className="text-center">
                        <LineChart className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                          Sales trend chart for {timeFrames.find((f) => f.key === selectedTimeFrame)?.label}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Bid Activity Chart */}
                <Card className="bg-white dark:bg-[#000000] border-black dark:border-white rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-black dark:text-white flex items-center">
                      <BarChart3 className="h-5 w-5 mr-2" />
                      Bid Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 h-48 flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600">
                      <div className="text-center">
                        <BarChart3 className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                          Bid activity chart for {timeFrames.find((f) => f.key === selectedTimeFrame)?.label}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* User Growth Chart */}
                <Card className="bg-white dark:bg-[#000000] border-black dark:border-white rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-black dark:text-white flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2" />
                      User Growth
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 h-48 flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600">
                      <div className="text-center">
                        <TrendingUp className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                          User growth chart for {timeFrames.find((f) => f.key === selectedTimeFrame)?.label}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Volume Distribution */}
                <Card className="bg-white dark:bg-[#000000] border-black dark:border-white rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-black dark:text-white flex items-center">
                      <PieChart className="h-5 w-5 mr-2" />
                      Volume Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 h-48 flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600">
                      <div className="text-center">
                        <PieChart className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                          Volume distribution for {timeFrames.find((f) => f.key === selectedTimeFrame)?.label}
                        </p>
                      </div>
                    </div>
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
                <Button className="bg-[#000000] dark:bg-white text-white dark:text-[#000000] hover:bg-gray-800 dark:hover:bg-gray-200 border-[#000000] dark:border-white rounded-lg">
                  Export Chat History
                </Button>
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
                    placeholder="Add new blocked word..."
                    className="flex-1 bg-white dark:bg-[#000000] border-black dark:border-white text-black dark:text-white rounded-lg"
                  />
                  <Button className="bg-[#000000] dark:bg-white text-white dark:text-[#000000] hover:bg-gray-800 dark:hover:bg-gray-200 rounded-lg">
                    Add Word
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["spam", "scam", "hack", "private key", "phishing"].map((word) => (
                    <Badge key={word} className="bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-lg">
                      {word}
                      <button className="ml-2 text-red-500 hover:text-red-700">×</button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Chat Messages */}
            <Card className="bg-white dark:bg-[#000000] border-black dark:border-white rounded-2xl">
              <CardHeader>
                <CardTitle className="text-black dark:text-white">Recent Messages (Last 24h)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {[
                    { user: "0x1234...5678", message: "Great artwork!", time: "2 min ago", status: "normal" },
                    { user: "artlover.eth", message: "When does bidding end?", time: "5 min ago", status: "normal" },
                    { user: "0x9876...4321", message: "This is spam content", time: "10 min ago", status: "flagged" },
                  ].map((msg, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg ${msg.status === "flagged" ? "bg-red-100 dark:bg-red-900" : "bg-gray-50 dark:bg-gray-900"}`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="font-mono text-sm font-bold text-black dark:text-white">{msg.user}</span>
                          <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{msg.message}</p>
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{msg.time}</div>
                      </div>
                      {msg.status === "flagged" && (
                        <div className="mt-2 flex space-x-2">
                          <Button size="sm" className="bg-red-600 text-white hover:bg-red-700 rounded text-xs">
                            Delete
                          </Button>
                          <Button size="sm" className="bg-yellow-600 text-white hover:bg-yellow-700 rounded text-xs">
                            Warn User
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Chart Modal */}
      {showDetailedChart && <ChartModal chartType={showDetailedChart} onClose={() => setShowDetailedChart(null)} />}
    </div>
  )
}
