"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, AlertTriangle } from "lucide-react"

interface MaxPainModalProps {
  onConfirm: (maxAmount: number) => void
  onCancel: () => void
  currentBid: number
  isDark: boolean
}

export default function MaxPainModal({ onConfirm, onCancel, currentBid, isDark }: MaxPainModalProps) {
  const [maxAmount, setMaxAmount] = useState((currentBid * 2).toFixed(2))
  const [error, setError] = useState("")

  const handleConfirm = () => {
    const amount = Number.parseFloat(maxAmount)
    if (amount <= currentBid) {
      setError(`Max Pain amount must be higher than current bid of ${currentBid} ETH`)
      return
    }
    onConfirm(amount)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className={`${
          isDark ? "bg-[#000000] border-white" : "bg-white border-black"
        } border rounded-2xl p-6 max-w-md w-full mx-4`}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className={`text-lg font-bold ${isDark ? "text-white" : "text-black"}`}>Set Max Pain Threshold</h3>
          <Button onClick={onCancel} variant="ghost" className="p-1">
            <X className={`h-4 w-4 ${isDark ? "text-white" : "text-black"}`} />
          </Button>
        </div>

        <div
          className={`mb-4 p-3 rounded-lg ${
            isDark ? "bg-yellow-900 border-yellow-600" : "bg-yellow-50 border-yellow-400"
          } border flex items-start space-x-2`}
        >
          <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-yellow-800 dark:text-yellow-200">
            <p className="font-semibold mb-1">Max Pain Auto-Bidding</p>
            <p>
              You will automatically outbid others until you reach your maximum threshold. This cannot be undone once
              activated.
            </p>
          </div>
        </div>

        <div className="mb-4">
          <label className={`block text-sm font-medium ${isDark ? "text-white" : "text-black"} mb-2`}>
            Maximum Bid Amount (ETH)
          </label>
          <Input
            type="number"
            step="0.01"
            value={maxAmount}
            onChange={(e) => setMaxAmount(e.target.value)}
            className={`${
              isDark ? "bg-[#000000] border-white text-white" : "bg-white border-black text-black"
            } rounded-lg`}
            placeholder="Enter max amount"
          />
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          <p className={`text-xs mt-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}>Current bid: {currentBid} ETH</p>
        </div>

        <div className="flex space-x-3">
          <Button
            onClick={onCancel}
            variant="outline"
            className={`flex-1 ${
              isDark
                ? "bg-[#000000] border-white text-white hover:bg-white hover:text-black"
                : "bg-white border-black text-black hover:bg-black hover:text-white"
            } rounded-lg`}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            className={`flex-1 ${
              isDark ? "bg-white text-black hover:bg-gray-200" : "bg-black text-white hover:bg-gray-800"
            } rounded-lg`}
          >
            Activate Max Pain
          </Button>
        </div>
      </div>
    </div>
  )
}
