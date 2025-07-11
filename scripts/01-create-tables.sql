-- Enable RLS (Row Level Security)
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    wallet_address TEXT UNIQUE NOT NULL,
    display_name TEXT,
    ens_name TEXT,
    total_bids INTEGER DEFAULT 0,
    auctions_won INTEGER DEFAULT 0,
    total_spent DECIMAL(18,8) DEFAULT 0,
    reputation INTEGER DEFAULT 100,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'blacklisted')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_active TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- NFTs table
CREATE TABLE IF NOT EXISTS nfts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    artist_name TEXT NOT NULL,
    image_url TEXT NOT NULL,
    ipfs_hash TEXT,
    pinata_pin_id TEXT,
    starting_price DECIMAL(18,8) NOT NULL,
    royalty_percent INTEGER DEFAULT 0,
    creator_id UUID REFERENCES users(id),
    status TEXT DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'live', 'ended', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Auctions table
CREATE TABLE IF NOT EXISTS auctions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nft_id UUID REFERENCES nfts(id) ON DELETE CASCADE,
    current_bid DECIMAL(18,8) DEFAULT 0,
    highest_bidder_id UUID REFERENCES users(id),
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    status TEXT DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'live', 'ended', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bids table
CREATE TABLE IF NOT EXISTS bids (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    auction_id UUID REFERENCES auctions(id) ON DELETE CASCADE,
    bidder_id UUID REFERENCES users(id),
    amount DECIMAL(18,8) NOT NULL,
    is_max_pain BOOLEAN DEFAULT FALSE,
    max_pain_limit DECIMAL(18,8),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Chat messages table
CREATE TABLE IF NOT EXISTS chat_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    auction_id UUID REFERENCES auctions(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id),
    message TEXT NOT NULL,
    message_type TEXT DEFAULT 'user' CHECK (message_type IN ('user', 'system', 'bid')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Analytics table for tracking daily stats
CREATE TABLE IF NOT EXISTS daily_analytics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    date DATE UNIQUE NOT NULL,
    total_sales DECIMAL(18,8) DEFAULT 0,
    total_bids INTEGER DEFAULT 0,
    total_volume DECIMAL(18,8) DEFAULT 0,
    active_users INTEGER DEFAULT 0,
    new_users INTEGER DEFAULT 0,
    messages_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Moderation actions table
CREATE TABLE IF NOT EXISTS moderation_actions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    moderator_id UUID REFERENCES users(id),
    action_type TEXT NOT NULL CHECK (action_type IN ('warned', 'restricted', 'blacklisted', 'unblacklisted')),
    reason TEXT,
    duration_minutes INTEGER, -- for temporary restrictions
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blocked words table
CREATE TABLE IF NOT EXISTS blocked_words (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    word TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_wallet ON users(wallet_address);
CREATE INDEX IF NOT EXISTS idx_auctions_status ON auctions(status);
CREATE INDEX IF NOT EXISTS idx_auctions_times ON auctions(start_time, end_time);
CREATE INDEX IF NOT EXISTS idx_bids_auction ON bids(auction_id);
CREATE INDEX IF NOT EXISTS idx_bids_created ON bids(created_at);
CREATE INDEX IF NOT EXISTS idx_chat_auction ON chat_messages(auction_id);
CREATE INDEX IF NOT EXISTS idx_chat_created ON chat_messages(created_at);
CREATE INDEX IF NOT EXISTS idx_analytics_date ON daily_analytics(date);
