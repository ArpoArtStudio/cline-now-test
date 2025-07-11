-- Insert sample blocked words
INSERT INTO blocked_words (word) VALUES 
('spam'), ('scam'), ('hack'), ('private key'), ('phishing'), ('rugpull'), ('ponzi')
ON CONFLICT (word) DO NOTHING;

-- Insert sample users
INSERT INTO users (wallet_address, display_name, total_bids, auctions_won, total_spent, reputation) VALUES 
('0xF1Ed4C4cE65B6353B71f2304b3fD7641a436675F', 'Admin', 0, 0, 0, 100),
('0x1234567890123456789012345678901234567890', 'CryptoCollector', 45, 12, 23.4, 95),
('0x9876543210987654321098765432109876543210', 'ArtLover', 23, 5, 8.7, 87),
('0xABCDEF1234567890ABCDEF1234567890ABCDEF12', 'DigitalDreamer', 78, 25, 156.2, 45)
ON CONFLICT (wallet_address) DO NOTHING;

-- Insert sample NFT and auction (current live auction)
WITH sample_user AS (
    SELECT id FROM users WHERE wallet_address = '0xF1Ed4C4cE65B6353B71f2304b3fD7641a436675F' LIMIT 1
)
INSERT INTO nfts (title, description, artist_name, image_url, starting_price, royalty_percent, creator_id, status)
SELECT 
    'Digital Dreams: Neon Cityscape',
    'A stunning piece that encapsulates a futuristic neon cityscape with digital cores and cosmic spirits.',
    'FutureMuse',
    '/placeholder.svg?height=700&width=900&text=Digital Dreams: Neon Cityscape',
    1.0,
    5,
    sample_user.id,
    'live'
FROM sample_user;

-- Insert current auction
WITH sample_nft AS (
    SELECT id FROM nfts WHERE title = 'Digital Dreams: Neon Cityscape' LIMIT 1
)
INSERT INTO auctions (nft_id, current_bid, start_time, end_time, status)
SELECT 
    sample_nft.id,
    1.1,
    NOW() - INTERVAL '1 hour',
    NOW() + INTERVAL '2 days 1 hour 57 minutes',
    'live'
FROM sample_nft;

-- Insert some sample bids
WITH sample_auction AS (
    SELECT a.id as auction_id FROM auctions a 
    JOIN nfts n ON a.nft_id = n.id 
    WHERE n.title = 'Digital Dreams: Neon Cityscape' LIMIT 1
),
sample_users AS (
    SELECT id, wallet_address FROM users WHERE wallet_address != '0xF1Ed4C4cE65B6353B71f2304b3fD7641a436675F'
)
INSERT INTO bids (auction_id, bidder_id, amount, created_at)
SELECT 
    sample_auction.auction_id,
    sample_users.id,
    CASE 
        WHEN sample_users.wallet_address = '0x1234567890123456789012345678901234567890' THEN 1.05
        WHEN sample_users.wallet_address = '0x9876543210987654321098765432109876543210' THEN 1.1
        ELSE 0.95
    END,
    NOW() - INTERVAL '30 minutes' + (RANDOM() * INTERVAL '25 minutes')
FROM sample_auction, sample_users;

-- Insert sample analytics data for the past 30 days
INSERT INTO daily_analytics (date, total_sales, total_bids, total_volume, active_users, new_users, messages_count)
SELECT 
    (CURRENT_DATE - INTERVAL '1 day' * generate_series(0, 29))::DATE as date,
    (RANDOM() * 50 + 10)::DECIMAL(18,8) as total_sales,
    (RANDOM() * 200 + 50)::INTEGER as total_bids,
    (RANDOM() * 100 + 20)::DECIMAL(18,8) as total_volume,
    (RANDOM() * 100 + 20)::INTEGER as active_users,
    (RANDOM() * 20 + 5)::INTEGER as new_users,
    (RANDOM() * 300 + 100)::INTEGER as messages_count;
