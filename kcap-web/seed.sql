-- Clear existing data (if any) to prevent duplicates during seeding
TRUNCATE TABLE redemptions, shop_items, credit_transactions, mission_deliverables, mission_enrollments, missions, timeline_events, users, batches CASCADE;

-- Insert Batches
INSERT INTO batches (id, name, start_date, kreon_count) VALUES
('b1111111-1111-1111-1111-111111111111', 'Batch 14', '2025-08-01', 40),
('b2222222-2222-2222-2222-222222222222', 'Batch 15', '2026-06-01', 80);

-- Insert Users (Kreons)
-- Note: auth.users fk is bypassed for the sake of seeding dummy data by temporarily disabling the constraint, 
-- or we can just insert fake UUIDs and assume they exist in auth.users if the constraint isn't enforced, 
-- but wait, `id uuid PRIMARY KEY REFERENCES auth.users(id)` might fail if the user doesn't exist in Supabase auth.
-- Let's drop the foreign key constraint to auth.users for seeding purposes, as we are bypassing auth.
ALTER TABLE users DROP CONSTRAINT IF EXISTS users_id_fkey;

INSERT INTO users (id, email, full_name, username, role, batch_id, college, kreds, is_active) VALUES
('11111111-1111-1111-1111-111111111111', 'admin@kcap.com', 'Admin User', 'admin', 'admin', NULL, 'Kreo HQ', 9999, true),
('22222222-2222-2222-2222-222222222222', 'john@example.com', 'John Doe', 'johndoe', 'kreon', 'b2222222-2222-2222-2222-222222222222', 'IIT Bombay', 1200, true),
('33333333-3333-3333-3333-333333333333', 'alice@example.com', 'Alice Johnson', 'alicej', 'kreon', 'b1111111-1111-1111-1111-111111111111', 'NIT Trichy', 2450, true),
('44444444-4444-4444-4444-444444444444', 'bob@example.com', 'Bob Smith', 'bobsmith', 'kreon', 'b1111111-1111-1111-1111-111111111111', 'IIT Delhi', 2100, true);

-- Re-add the constraint later when real auth is set up.

-- Insert Missions
INSERT INTO missions (id, created_by, title, description, mission_type, start_date, end_date, status, total_kreds, max_participants, is_visible) VALUES
('55555555-5555-5555-5555-555555555555', '11111111-1111-1111-1111-111111111111', 'Instagram Reel: Kreo Unboxing', 'Create an engaging unboxing video of your Kreo starter kit.', 'content', '2026-06-05', '2026-06-20', 'active', 150, 50, true),
('66666666-6666-6666-6666-666666666666', '11111111-1111-1111-1111-111111111111', 'Campus Valorant Tournament', 'Organize and host a localized Valorant 5v5 tournament on your campus.', 'offline_event', '2026-06-10', '2026-06-25', 'active', 500, 10, true),
('77777777-7777-7777-7777-777777777777', '11111111-1111-1111-1111-111111111111', 'Discord Watch Party', 'Host a watch party on the Kreo community Discord for the VCT Masters.', 'hybrid', '2026-06-15', '2026-06-16', 'active', 100, 100, true);

-- Insert Shop Items
INSERT INTO shop_items (id, name, description, category, kred_cost, stock_count, image_url, brand) VALUES
('88888888-8888-8888-8888-888888888888', 'Amazon Gift Card - ₹500', 'Redeem for a ₹500 Amazon Gift Card', 'gift_card', 500, 25, 'https://placehold.co/400x250/FF9900/FFFFFF?text=Amazon+Gift+Card', 'Amazon'),
('99999999-9999-9999-9999-999999999999', 'Kreo Exclusive Hoodie', 'Premium quality Kreo branded hoodie', 'kreo_merch', 1500, 10, 'https://placehold.co/400x250/111827/FFFFFF?text=Kreo+Hoodie', 'Kreo'),
('00000000-0000-0000-0000-000000000000', 'Valorant Points (1000 VP)', 'Get 1000 VP added to your Riot account', 'gaming', 1000, 50, 'https://placehold.co/400x250/FA4454/FFFFFF?text=Valorant+Points', 'Riot Games');

-- Insert Timeline Events
INSERT INTO timeline_events (id, created_by, title, event_type, description, scheduled_at, platform_link, status) VALUES
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '22222222-2222-2222-2222-222222222222', 'Valorant Custom Lobbies', 'gaming_session', 'Let us play some chill 10-man custom lobbies!', '2026-06-18 18:00:00+00', 'https://discord.gg/kreo', 'approved');

