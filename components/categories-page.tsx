"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X, Palette, Music, Globe, Gamepad2, Camera, Zap } from "lucide-react"

interface Category {
  id: string
  name: string
  icon: React.ReactNode
  count: number
  description: string
  recentSales: string
  items: Array<{
    id: number
    title: string
    artist: string
    soldPrice: string
    soldDate: string
    imageUrl: string
  }>
}

interface CategoriesPageProps {
  onClose: () => void
  isDark: boolean
}

export default function CategoriesPage({ onClose, isDark }: CategoriesPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)

  const categories: Category[] = [
    {
      id: "digital-art",
      name: "Digital Art",
      icon: <Palette className="h-8 w-8" />,
      count: 156,
      description: "Digital paintings, illustrations, and generative art pieces",
      recentSales: "45.2 ETH",
      items: [
        {
          id: 1,
          title: "Cosmic Dreamscape",
          artist: "DigitalVision",
          soldPrice: "2.45 ETH",
          soldDate: "2024-01-14",
          imageUrl: "/placeholder.svg?height=300&width=300&text=Cosmic Art",
        },
        {
          id: 2,
          title: "Urban Symphony",
          artist: "CityBeats",
          soldPrice: "1.89 ETH",
          soldDate: "2024-01-13",
          imageUrl: "/placeholder.svg?height=300&width=300&text=Urban Art",
        },
      ],
    },
    {
      id: "music",
      name: "Music",
      icon: <Music className="h-8 w-8" />,
      count: 89,
      description: "Original compositions, beats, and exclusive music rights",
      recentSales: "23.7 ETH",
      items: [
        {
          id: 3,
          title: "Vintage Vinyl Collection",
          artist: "RetroSounds",
          soldPrice: "0.95 ETH",
          soldDate: "2024-01-11",
          imageUrl: "/placeholder.svg?height=300&width=300&text=Vinyl Music",
        },
        {
          id: 4,
          title: "Electronic Beats Vol.1",
          artist: "SynthWave",
          soldPrice: "0.78 ETH",
          soldDate: "2024-01-09",
          imageUrl: "/placeholder.svg?height=300&width=300&text=Electronic Music",
        },
      ],
    },
    {
      id: "real-world",
      name: "Real World",
      icon: <Globe className="h-8 w-8" />,
      count: 67,
      description: "Physical items, collectibles, and real-world assets",
      recentSales: "18.9 ETH",
      items: [
        {
          id: 5,
          title: "Handcrafted Pottery Set",
          artist: "ClayMaster",
          soldPrice: "1.67 ETH",
          soldDate: "2024-01-10",
          imageUrl: "/placeholder.svg?height=300&width=300&text=Pottery",
        },
      ],
    },
    {
      id: "gaming",
      name: "Gaming",
      icon: <Gamepad2 className="h-8 w-8" />,
      count: 34,
      description: "Game assets, characters, and virtual items",
      recentSales: "12.4 ETH",
      items: [
        {
          id: 6,
          title: "Legendary Sword NFT",
          artist: "GameForge",
          soldPrice: "3.21 ETH",
          soldDate: "2024-01-08",
          imageUrl: "/placeholder.svg?height=300&width=300&text=Gaming Sword",
        },
      ],
    },
    {
      id: "photography",
      name: "Photography",
      icon: <Camera className="h-8 w-8" />,
      count: 78,
      description: "Professional photography and visual storytelling",
      recentSales: "15.6 ETH",
      items: [
        {
          id: 7,
          title: "Mountain Sunrise",
          artist: "NatureShot",
          soldPrice: "1.23 ETH",
          soldDate: "2024-01-07",
          imageUrl: "/placeholder.svg?height=300&width=300&text=Mountain Photo",
        },
      ],
    },
    {
      id: "utility",
      name: "Utility",
      icon: <Zap className="h-8 w-8" />,
      count: 23,
      description: "Functional NFTs with real-world utility and benefits",
      recentSales: "8.3 ETH",
      items: [
        {
          id: 8,
          title: "VIP Access Pass",
          artist: "EventCorp",
          soldPrice: "2.10 ETH",
          soldDate: "2024-01-06",
          imageUrl: "/placeholder.svg?height=300&width=300&text=VIP Pass",
        },
      ],
    },
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className={`${isDark ? "bg-[#000000] border-white" : "bg-white border-black"} border rounded-2xl max-w-7xl w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col`}
      >
        {/* Header */}
        <div className={`flex justify-between items-center p-6 border-b ${isDark ? "border-white" : "border-black"}`}>
          <h2 className={`text-2xl font-bold ${isDark ? "text-white" : "text-black"}`}>Categories</h2>
          <Button onClick={onClose} variant="ghost" className="p-2">
            <X className={`h-5 w-5 ${isDark ? "text-white" : "text-black"}`} />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {!selectedCategory ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <Card
                  key={category.id}
                  className={`${isDark ? "bg-[#000000] border-white" : "bg-white border-black"} border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer`}
                  onClick={() => setSelectedCategory(category)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className={`p-3 rounded-lg ${isDark ? "bg-white text-black" : "bg-black text-white"}`}>
                        {category.icon}
                      </div>
                      <div>
                        <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-black"}`}>{category.name}</h3>
                        <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                          {category.count} items sold
                        </p>
                      </div>
                    </div>
                    <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"} mb-4`}>
                      {category.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>Recent Sales:</span>
                      <span className={`text-lg font-bold ${isDark ? "text-white" : "text-black"}`}>
                        {category.recentSales}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div>
              <div className="flex items-center space-x-4 mb-6">
                <Button
                  onClick={() => setSelectedCategory(null)}
                  variant="outline"
                  className={`${isDark ? "bg-[#000000] border-white text-white hover:bg-white hover:text-black" : "bg-white border-black text-black hover:bg-black hover:text-white"} rounded-lg`}
                >
                  ← Back to Categories
                </Button>
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${isDark ? "bg-white text-black" : "bg-black text-white"}`}>
                    {selectedCategory.icon}
                  </div>
                  <h3 className={`text-2xl font-bold ${isDark ? "text-white" : "text-black"}`}>
                    {selectedCategory.name}
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {selectedCategory.items.map((item) => (
                  <Card
                    key={item.id}
                    className={`${isDark ? "bg-[#000000] border-white" : "bg-white border-black"} border rounded-2xl overflow-hidden`}
                  >
                    <img
                      src={item.imageUrl || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-48 object-cover border-b border-black dark:border-white"
                    />
                    <CardContent className="p-4">
                      <h4 className={`text-lg font-bold ${isDark ? "text-white" : "text-black"} mb-1`}>{item.title}</h4>
                      <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"} mb-3`}>by {item.artist}</p>
                      <div className="flex justify-between items-center">
                        <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>Sold for:</span>
                        <span className={`text-lg font-bold ${isDark ? "text-white" : "text-black"}`}>
                          {item.soldPrice}
                        </span>
                      </div>
                      <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-500"} mt-2`}>{item.soldDate}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
