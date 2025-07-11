"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface DisplayNameModalProps {
  connectedWallet: string
  onSave: (name: string) => void
  onCancel: () => void
  isDark: boolean
}

export default function DisplayNameModal({ connectedWallet, onSave, onCancel, isDark }: DisplayNameModalProps) {
  const [selectedOption, setSelectedOption] = useState("first5")

  // Mock ENS names - in real app this would come from wallet scan
  const mockENSNames = ["artlover.eth", "collector.eth"]

  const getDisplayName = () => {
    switch (selectedOption) {
      case "first5":
        return connectedWallet.slice(0, 7) + "..."
      case "last5":
        return "..." + connectedWallet.slice(-5)
      case "ens":
        return mockENSNames[0] // In real app, user would select from available ENS names
      default:
        return connectedWallet.slice(0, 7) + "..."
    }
  }

  const handleSave = () => {
    onSave(getDisplayName())
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className={`${isDark ? "bg-[#000000] border-white" : "bg-white border-black"} border rounded-2xl p-6 max-w-md w-full mx-4`}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className={`text-lg font-bold ${isDark ? "text-white" : "text-black"}`}>Select Your Display Name</h3>
          <Button onClick={onCancel} variant="ghost" className="p-1">
            <X className={`h-4 w-4 ${isDark ? "text-white" : "text-black"}`} />
          </Button>
        </div>

        <p className={`text-sm mb-6 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          Choose how you want to be identified in the auction chat.
        </p>

        <div className="space-y-4 mb-6">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name="displayName"
              value="first5"
              checked={selectedOption === "first5"}
              onChange={(e) => setSelectedOption(e.target.value)}
              className="w-4 h-4"
            />
            <span className={`${isDark ? "text-white" : "text-black"}`}>
              First 5 Characters ({connectedWallet.slice(0, 7)}...)
            </span>
          </label>

          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name="displayName"
              value="last5"
              checked={selectedOption === "last5"}
              onChange={(e) => setSelectedOption(e.target.value)}
              className="w-4 h-4"
            />
            <span className={`${isDark ? "text-white" : "text-black"}`}>
              Last 5 Characters (...{connectedWallet.slice(-5)})
            </span>
          </label>

          {mockENSNames.length > 0 && (
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="displayName"
                value="ens"
                checked={selectedOption === "ens"}
                onChange={(e) => setSelectedOption(e.target.value)}
                className="w-4 h-4"
              />
              <span className={`${isDark ? "text-white" : "text-black"}`}>ENS Name ({mockENSNames[0]})</span>
            </label>
          )}
        </div>

        <div className="flex space-x-3">
          <Button
            onClick={onCancel}
            variant="outline"
            className={`flex-1 ${isDark ? "bg-[#000000] border-white text-white hover:bg-white hover:text-black" : "bg-white border-black text-black hover:bg-black hover:text-white"} rounded-lg`}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className={`flex-1 ${isDark ? "bg-white text-black hover:bg-gray-200" : "bg-black text-white hover:bg-gray-800"} rounded-lg`}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  )
}
