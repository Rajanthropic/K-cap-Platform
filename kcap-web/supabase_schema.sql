-- Users / Kreons
CREATE TYPE user_role AS ENUM ('admin', 'management', 'kreon');

CREATE TABLE users (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  username text UNIQUE,
  role user_role DEFAULT 'kreon',
  batch_id uuid,
  avatar_url text,
  bio text,
  college text,
  city text,
  state text,
  address_line text,
  pincode text,
  phone text,
  instagram_handle text,
  youtube_channel text,
  twitter_handle text,
  linkedin_url text,
  hobbies text[],        
  games_playing text[],  
  movies_watching text[],
  shows_watching text[],
  books_reading text[],
  kreds integer DEFAULT 0,
  is_active boolean DEFAULT true,
  joined_at timestamptz DEFAULT now(),
  last_active_at timestamptz DEFAULT now()
);

-- Batches
CREATE TABLE batches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  start_date date,
  kreon_count integer DEFAULT 0
);

ALTER TABLE users ADD CONSTRAINT fk_batch FOREIGN KEY (batch_id) REFERENCES batches(id);

-- Timeline Events
CREATE TYPE event_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE event_type AS ENUM ('watch_party', 'gaming_session', 'learning_program', 'other');

CREATE TABLE timeline_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_by uuid REFERENCES users(id),
  title text NOT NULL,
  event_type event_type NOT NULL,
  description text,
  scheduled_at timestamptz NOT NULL,
  platform_link text,
  status event_status DEFAULT 'pending',
  approved_by uuid REFERENCES users(id),
  approved_at timestamptz,
  rejection_reason text,
  max_participants integer
);

-- Missions
CREATE TYPE mission_type AS ENUM ('content', 'offline_event', 'hybrid', 'other');
CREATE TYPE mission_status AS ENUM ('draft', 'active', 'closed', 'archived');

CREATE TABLE missions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_by uuid REFERENCES users(id),
  title text NOT NULL,
  description text,
  mission_type mission_type NOT NULL,
  start_date date,
  end_date date,
  status mission_status DEFAULT 'draft',
  total_kreds integer DEFAULT 0,
  targets jsonb,               
  tier_rewards jsonb,          
  required_fields jsonb,       
  asset_drive_url text,
  assets_provided text[],
  max_participants integer,
  is_visible boolean DEFAULT true
);

-- Mission Enrollments
CREATE TYPE enrollment_status AS ENUM ('enrolled', 'active', 'submitted', 'approved', 'rejected', 'declined');

CREATE TABLE mission_enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  mission_id uuid REFERENCES missions(id),
  kreon_id uuid REFERENCES users(id),
  status enrollment_status DEFAULT 'enrolled',
  decline_reason text,
  enrolled_at timestamptz DEFAULT now(),
  prerequisite_data jsonb,     
  kreds_earned integer DEFAULT 0,
  bonus_kreds integer DEFAULT 0,
  performance_pct numeric       
);

-- Mission Deliverables
CREATE TABLE mission_deliverables (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  enrollment_id uuid REFERENCES mission_enrollments(id),
  drive_link text,
  report_text text,
  notes text,
  attachments text[],
  submitted_at timestamptz DEFAULT now(),
  reviewed_by uuid REFERENCES users(id),
  reviewed_at timestamptz,
  review_notes text
);

-- Kreds Transactions
CREATE TYPE tx_type AS ENUM ('mission_reward', 'bonus', 'redemption', 'admin_adjustment');

CREATE TABLE credit_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  kreon_id uuid REFERENCES users(id),
  amount integer NOT NULL,
  type tx_type NOT NULL,
  reference_id uuid,
  note text,
  created_at timestamptz DEFAULT now()
);

-- Shop Items
CREATE TYPE shop_category AS ENUM ('gift_card', 'kreo_merch', 'gaming', 'voucher', 'other');

CREATE TABLE shop_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  category shop_category NOT NULL,
  kred_cost integer NOT NULL,
  stock_count integer DEFAULT 0,
  image_url text,
  is_available boolean DEFAULT true,
  brand text
);

-- Redemptions
CREATE TYPE redemption_status AS ENUM ('pending', 'processing', 'fulfilled', 'cancelled');

CREATE TABLE redemptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  kreon_id uuid REFERENCES users(id),
  shop_item_id uuid REFERENCES shop_items(id),
  kreds_spent integer NOT NULL,
  status redemption_status DEFAULT 'pending',
  shipping_address jsonb,
  fulfillment_notes text,
  created_at timestamptz DEFAULT now()
);
