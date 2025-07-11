"use client"

import { useState, useCallback } from "react"

export interface Bid {
  id: string
  bidder: string
  amount: number
  timestamp: Date
  isMaxPain?: boolean
}

export interface MaxPainSettings {
  isActive: boolean
  maxAmount: number
  bidder: string
}

export interface AuctionState {
  currentBid: number
  highestBidder: string
  bids: Bid[]
  maxPainSettings: MaxPainSettings | null
}

export function useAuctionState() {
  const [auctionState, setAuctionState] = useState<AuctionState>({
    currentBid: 1.1,
    highestBidder: "",
    bids: [],
    maxPainSettings: null,
  })

  const [bidHistory, setBidHistory] = useState<Bid[]>([])

  // Auto-bid with Max Pain
  const handleMaxPainBid = useCallback(
    (newBid: number, newBidder: string) => {
      if (!auctionState.maxPainSettings?.isActive) return

      const { maxAmount, bidder: maxPainBidder } = auctionState.maxPainSettings

      // Don't auto-bid if the new bidder is the Max Pain user
      if (newBidder === maxPainBidder) return

      // Don't auto-bid if we've reached the max amount
      if (newBid >= maxAmount) return

      // Calculate next bid (1% higher)
      const nextBid = Math.round(newBid * 1.01 * 100) / 100

      // Don't exceed max amount
      if (nextBid > maxAmount) return

      // Place auto-bid after a short delay
      setTimeout(() => {
        const autoBid: Bid = {
          id: Date.now().toString(),
          bidder: maxPainBidder,
          amount: nextBid,
          timestamp: new Date(),
          isMaxPain: true,
        }

        setAuctionState((prev) => ({
          ...prev,
          currentBid: nextBid,
          highestBidder: maxPainBidder,
          bids: [...prev.bids, autoBid],
        }))

        setBidHistory((prev) => [...prev, autoBid])
      }, 1000) // 1 second delay for auto-bid
    },
    [auctionState.maxPainSettings],
  )

  const placeBid = useCallback(
    (amount: number, bidder: string) => {
      // Validation
      if (amount <= auctionState.currentBid) {
        throw new Error(`Bid must be higher than current bid of ${auctionState.currentBid} ETH`)
      }

      if (auctionState.highestBidder === bidder) {
        throw new Error("You are already the highest bidder")
      }

      const newBid: Bid = {
        id: Date.now().toString(),
        bidder,
        amount,
        timestamp: new Date(),
        isMaxPain: false,
      }

      setAuctionState((prev) => ({
        ...prev,
        currentBid: amount,
        highestBidder: bidder,
        bids: [...prev.bids, newBid],
      }))

      setBidHistory((prev) => [...prev, newBid])

      // Trigger Max Pain auto-bid if applicable
      handleMaxPainBid(amount, bidder)

      return newBid
    },
    [auctionState.currentBid, auctionState.highestBidder, handleMaxPainBid],
  )

  const setMaxPain = useCallback((maxAmount: number, bidder: string) => {
    setAuctionState((prev) => ({
      ...prev,
      maxPainSettings: {
        isActive: true,
        maxAmount,
        bidder,
      },
    }))
  }, [])

  const cancelMaxPain = useCallback(() => {
    setAuctionState((prev) => ({
      ...prev,
      maxPainSettings: null,
    }))
  }, [])

  const getMinBid = useCallback(() => {
    return Math.round(auctionState.currentBid * 1.01 * 100) / 100
  }, [auctionState.currentBid])

  const getMaxBid = useCallback(() => {
    return Math.round(auctionState.currentBid * 1.1 * 100) / 100
  }, [auctionState.currentBid])

  return {
    auctionState,
    bidHistory,
    placeBid,
    setMaxPain,
    cancelMaxPain,
    getMinBid,
    getMaxBid,
  }
}
