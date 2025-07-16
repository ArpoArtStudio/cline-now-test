"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, ExternalLink, Copy } from "lucide-react"

interface SoldNFT {
  id: number
  title: string
  artist: string
  soldPrice: string
  soldDate: string
  currentOwner: string
  imageUrl: string
  description: string
  category: string
}

interface SoldRecentPageProps {
  onClose: () => void
  isDark: boolean
}

export default function SoldRecentPage({ onClose, isDark }: SoldRecentPageProps) {
  const [selectedNFT, setSelectedNFT] = useState<SoldNFT | null>(null)

  const recentlySoldNFTs: SoldNFT[] = [
    {
      id: 1,
      title: "Cosmic Dreamscape",
      artist: "DigitalVision",
      soldPrice: "2.45 ETH",
      soldDate: "2024-01-14",
      currentOwner: "0x1234567890123456789012345678901234567890",
      imageUrl: "/placeholder.svg?height=400&width=400&text=Cosmic Dreamscape",
      description: "A mesmerizing journey through digital cosmos with vibrant colors and ethereal forms.",
      category: "Digital Art",
    },
    {
      id: 2,
      title: "Urban Symphony",
      artist: "CityBeats",
      soldPrice: "1.89 ETH",
      soldDate: "2024-01-13",
      currentOwner: "0x9876543210987654321098765432109876543210",
      imageUrl: "/placeholder.svg?height=400&width=400&text=Urban Symphony",
      description: "Street art meets digital innovation in this powerful urban composition.",
      category: "Digital Art",
    },
    {
      id: 3,
      title: "Nature's Code",
      artist: "EcoTech",
      soldPrice: "3.12 ETH",
      soldDate: "2024-01-12",
      currentOwner: "0xABCDEF1234567890ABCDEF1234567890ABCDEF12",
      imageUrl: "/placeholder.svg?height=400&width=400&text=Nature's Code",
      description: "Where organic forms meet algorithmic beauty in perfect harmony.",
      category: "Digital Art",
    },
    {
      id: 4,
      title: "Vintage Vinyl Collection",
      artist: "RetroSounds",
      soldPrice: "0.95 ETH",
      soldDate: "2024-01-11",
      currentOwner: "0x5555777799991111333355557777999911113333",
      imageUrl: "/placeholder.svg?height=400&width=400&text=Vintage Vinyl",
      description: "Rare vinyl records from the golden age of music, digitally preserved.",
      category: "Music",
    },
    {
      id: 5,
      title: "Handcrafted Pottery Set",
      artist: "ClayMaster",
      soldPrice: "1.67 ETH",
      soldDate: "2024-01-10",
      currentOwner: "0x2222444466668888AAAA2222444466668888AAAA",
      imageUrl: "/placeholder.svg?height=400&width=400&text=Pottery Set",
      description: "Authentic handcrafted pottery with centuries-old techniques.",
      category: "Real World",
    },
    {
      id: 6,
      title: "Electronic Beats Vol.1",
      artist: "SynthWave",
      soldPrice: "0.78 ETH",
      soldDate: "2024-01-09",
      currentOwner: "0x7777999911113333555577779999111133335555",
      imageUrl: "/placeholder.svg?height=400&width=400&text=Electronic Beats",
      description: "Original electronic music compositions with exclusive rights.",
      category: "Music",
    },
  ]

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // Could add a toast notification here
  }

  const openEtherscan = (address: string) => {
    window.open(`https://etherscan.io/address/${address}`, "_blank")
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className={`${isDark ? "bg-[#000000] border-white" : "bg-white border-black"} border rounded-2xl max-w-7xl w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col`}
      >
        {/* Header */}
        <div className={`flex justify-between items-center p-6 border-b ${isDark ? "border-white" : "border-black"}`}>
          <h2 className={`text-2xl font-bold ${isDark ? "text-white" : "text-black"}`}>Recently Sold</h2>
          <Button onClick={onClose} variant="ghost" className="p-2">
            <X className={`h-5 w-5 ${isDark ? "text-white" : "text-black"}`} />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentlySoldNFTs.map((nft) => (
              <Card
                key={nft.id}
                className={`${isDark ? "bg-[#000000] border-white" : "bg-white border-black"} border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer`}
              >
                <div onClick={() => setSelectedNFT(nft)}>
                  <img
                    src={nft.imageUrl || "/placeholder.svg"}
                    alt={nft.title}
                    className="w-full h-64 object-cover border-b border-black dark:border-white"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className={`text-lg font-bold ${isDark ? "text-white" : "text-black"}`}>{nft.title}</h3>
                    <Badge className={`${isDark ? "bg-white text-black" : "bg-black text-white"} rounded-lg text-xs`}>
                      {nft.category}
                    </Badge>
                  </div>
                  <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"} mb-3`}>by {nft.artist}</p>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>Sold for:</span>
                      <span className={`text-sm font-bold ${isDark ? "text-white" : "text-black"}`}>
                        {nft.soldPrice}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>Date:</span>
                      <span className={`text-sm ${isDark ? "text-white" : "text-black"}`}>{nft.soldDate}</span>
                    </div>
                    <div className="mt-3">
                      <span className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>Current Owner:</span>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`text-xs font-mono ${isDark ? "text-white" : "text-black"}`}>
                          {nft.currentOwner.slice(0, 10)}...{nft.currentOwner.slice(-8)}
                        </span>
                        <Button
                          onClick={() => copyToClipboard(nft.currentOwner)}
                          variant="ghost"
                          className="p-1 h-6 w-6"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                        <Button onClick={() => openEtherscan(nft.currentOwner)} variant="ghost" className="p-1 h-6 w-6">
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Enlarged Image Modal */}
      {selectedNFT && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-60"
          onClick={() => setSelectedNFT(null)}
        >
          <div className="max-w-4xl max-h-[90vh] p-4">
            <img
              src={selectedNFT.imageUrl || "/placeholder.svg"}
              alt={selectedNFT.title}
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <div
              className={`mt-4 p-4 ${isDark ? "bg-[#000000] border-white" : "bg-white border-black"} border rounded-lg`}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-black"} mb-2`}>{selectedNFT.title}</h3>
              <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"} mb-2`}>by {selectedNFT.artist}</p>
              <p className={`text-sm ${isDark ? "text-white" : "text-black"} mb-4`}>{selectedNFT.description}</p>
              <div className="flex justify-between items-center">
                <span className={`text-lg font-bold ${isDark ? "text-white" : "text-black"}`}>
                  Sold for: {selectedNFT.soldPrice}
                </span>
                <Button
                  onClick={() => setSelectedNFT(null)}
                  className={`${isDark ? "bg-white text-black" : "bg-black text-white"} rounded-lg`}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
