import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database
export interface User {
  id: string
  wallet_address: string
  display_name?: string
  ens_name?: string
  total_bids: number
  auctions_won: number
  total_spent: number
  reputation: number
  status: "active" | "blacklisted"
  created_at: string
  last_active: string
}

export interface NFT {
  id: string
  title: string
  description?: string
  artist_name: string
  image_url: string
  ipfs_hash?: string
  pinata_pin_id?: string
  starting_price: number
  royalty_percent: number
  creator_id: string
  status: "upcoming" | "live" | "ended" | "cancelled"
  created_at: string
}

export interface Auction {
  id: string
  nft_id: string
  current_bid: number
  highest_bidder_id?: string
  start_time: string
  end_time: string
  status: "upcoming" | "live" | "ended" | "cancelled"
  created_at: string
  nft?: NFT
  highest_bidder?: User
}

export interface Bid {
  id: string
  auction_id: string
  bidder_id: string
  amount: number
  is_max_pain: boolean
  max_pain_limit?: number
  created_at: string
  bidder?: User
}

export interface ChatMessage {
  id: string
  auction_id: string
  user_id: string
  message: string
  message_type: "user" | "system" | "bid"
  created_at: string
  user?: User
}

export interface DailyAnalytics {
  id: string
  date: string
  total_sales: number
  total_bids: number
  total_volume: number
  active_users: number
  new_users: number
  messages_count: number
  created_at: string
}
