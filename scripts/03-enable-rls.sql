-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE nfts ENABLE ROW LEVEL SECURITY;
ALTER TABLE auctions ENABLE ROW LEVEL SECURITY;
ALTER TABLE bids ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE moderation_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocked_words ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (since this is a public auction site)
CREATE POLICY "Public read access" ON users FOR SELECT USING (true);
CREATE POLICY "Public read access" ON nfts FOR SELECT USING (true);
CREATE POLICY "Public read access" ON auctions FOR SELECT USING (true);
CREATE POLICY "Public read access" ON bids FOR SELECT USING (true);
CREATE POLICY "Public read access" ON chat_messages FOR SELECT USING (true);
CREATE POLICY "Public read access" ON daily_analytics FOR SELECT USING (true);
CREATE POLICY "Public read access" ON blocked_words FOR SELECT USING (true);

-- Allow users to insert their own data
CREATE POLICY "Users can insert own data" ON users FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can insert bids" ON bids FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can insert messages" ON chat_messages FOR INSERT WITH CHECK (true);

-- Admin policies (you'll need to set up admin role)
CREATE POLICY "Admin full access" ON users FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE wallet_address = '0xF1Ed4C4cE65B6353B71f2304b3fD7641a436675F')
);
CREATE POLICY "Admin full access" ON nfts FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE wallet_address = '0xF1Ed4C4cE65B6353B71f2304b3fD7641a436675F')
);
CREATE POLICY "Admin full access" ON auctions FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE wallet_address = '0xF1Ed4C4cE65B6353B71f2304b3fD7641a436675F')
);
CREATE POLICY "Admin full access" ON moderation_actions FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE wallet_address = '0xF1Ed4C4cE65B6353B71f2304b3fD7641a436675F')
);
