# KCAP — Creon Campus Ambassador Platform
## Product Requirements Document (PRD)
**Version:** 1.0  
**Status:** Draft  
**Stack:** React + shadcn/ui · Supabase · Vercel

---

## 1. Product Overview

### 1.1 Vision
KCAP (Krio Campus Ambassador Platform) is a gamified, social-first web platform that serves as the single operational hub for all Campus Ambassadors ("Creons"). It combines community features (profiles, timelines, events), mission management (task assignment, deliverable submission, approval workflows), a token economy (CRIO credits), a rewards shop, and a competitive leaderboard — all wrapped in an experience compelling enough that Creons voluntarily share it on Instagram and Twitter, organically marketing the brand.

### 1.2 Goals
| # | Goal |
|---|------|
| G1 | Provide a self-serve onboarding flow for new and existing Creons |
| G2 | Streamline mission creation, acceptance, execution, and approval |
| G3 | Drive engagement through a transparent credit/token economy |
| G4 | Foster healthy competition via leaderboards without demotivating participants |
| G5 | Generate shareable, branded end-of-mission/end-of-term report cards |
| G6 | Scale to 15+ batches (~225+ active Creons) with monthly batch additions |

### 1.3 Non-Goals (v1.0)
- Native mobile app (mobile-responsive web only)
- Real-time chat / DMs between Creons
- Third-party SSO beyond email
- Automated payouts / payment gateway integrations

---

## 2. User Roles & Permissions

| Role | Count | Description |
|------|-------|-------------|
| **Admin** | 1 | Superuser. Full CRUD across every entity. Can promote/demote users, delete accounts, override any action. |
| **Management** | Up to 3 | Can create and manage missions, approve/reject timeline events, approve mission submissions, award bonus credits, view all Creon activity feeds, and remove inactive Creons. |
| **Creon** | Unlimited | Campus Ambassadors. Can register, build a profile, request timeline events, browse and enroll in missions, submit deliverables, earn CRIO credits, and redeem them in the shop. |

### 2.1 Permission Matrix

| Feature | Admin | Management | Creon |
|---------|-------|------------|-------|
| Manage user roles | ✅ | ❌ | ❌ |
| Create missions | ✅ | ✅ | ❌ |
| Approve timeline events | ✅ | ✅ | ❌ |
| View all Creon activity | ✅ | ✅ | ❌ |
| Remove Creons | ✅ | ✅ | ❌ |
| Award bonus credits | ✅ | ✅ | ❌ |
| Register / self-onboard | N/A | N/A | ✅ |
| Request timeline events | ❌ | ❌ | ✅ |
| Enroll in missions | ❌ | ❌ | ✅ |
| Decline missions | ❌ | ❌ | ✅ |
| Submit deliverables | ❌ | ❌ | ✅ |
| Redeem credits in shop | ❌ | ❌ | ✅ |
| View leaderboard | ✅ | ✅ | ✅ |

---

## 3. System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Vercel (Frontend)                    │
│                  React + shadcn/ui + TailwindCSS            │
│   Pages: Auth · Profile · Timeline · Missions ·             │
│          Leaderboard · Shop · Admin Dashboard               │
└─────────────────────────────────┬───────────────────────────┘
                                  │ HTTPS / REST
┌─────────────────────────────────▼───────────────────────────┐
│                    Supabase (Backend-as-a-Service)           │
│  ┌──────────────┐  ┌─────────────────┐  ┌────────────────┐  │
│  │  Auth        │  │  PostgreSQL DB   │  │  Storage       │  │
│  │  (Email OTP) │  │  (RLS policies) │  │  (Avatars,     │  │
│  └──────────────┘  └─────────────────┘  │   assets,      │  │
│                                         │   deliverables) │  │
│  ┌──────────────┐  ┌─────────────────┐  └────────────────┘  │
│  │  Edge Funcs  │  │  Realtime       │                       │
│  │  (Email      │  │  (Leaderboard   │                       │
│  │   triggers)  │  │   updates)      │                       │
│  └──────────────┘  └─────────────────┘                       │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. Database Schema (High-Level)

### 4.1 Core Tables

```sql
-- Users / Creons
users (
  id uuid PK,
  email text UNIQUE,
  full_name text,
  username text UNIQUE,
  role enum('admin','management','creon'),
  batch_id uuid FK,
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
  hobbies text[],        -- e.g. ["Gaming","Cinema","Music"]
  games_playing text[],  -- e.g. ["Valorant","Chess"]
  movies_watching text[],
  shows_watching text[],
  books_reading text[],
  crio_credits integer DEFAULT 0,
  is_active boolean DEFAULT true,
  joined_at timestamptz,
  last_active_at timestamptz
)

-- Batches
batches (
  id uuid PK,
  name text,             -- e.g. "Batch 15"
  start_date date,
  creon_count integer
)

-- Timeline Events
timeline_events (
  id uuid PK,
  created_by uuid FK users,
  title text,
  event_type enum('watch_party','gaming_session','learning_program','other'),
  description text,
  scheduled_at timestamptz,
  platform_link text,
  status enum('pending','approved','rejected'),
  approved_by uuid FK users,
  approved_at timestamptz,
  rejection_reason text,
  max_participants integer
)

-- Missions
missions (
  id uuid PK,
  created_by uuid FK users,
  title text,
  description text,
  mission_type enum('content','offline_event','hybrid','other'),
  start_date date,
  end_date date,
  status enum('draft','active','closed','archived'),
  total_credits integer,       -- 100% credit value
  targets jsonb,               -- [{metric, goal, unit}]
  tier_rewards jsonb,          -- [{min_pct, max_pct, credits}]
  required_fields jsonb,       -- prerequisite data fields
  asset_drive_url text,
  assets_provided text[],
  max_participants integer,
  is_visible boolean DEFAULT true
)

-- Mission Enrollments
mission_enrollments (
  id uuid PK,
  mission_id uuid FK,
  creon_id uuid FK,
  status enum('enrolled','active','submitted','approved','rejected','declined'),
  decline_reason text,
  enrolled_at timestamptz,
  prerequisite_data jsonb,     -- address, sizes, etc.
  credits_earned integer,
  bonus_credits integer DEFAULT 0,
  performance_pct numeric       -- % of targets hit
)

-- Mission Deliverables
mission_deliverables (
  id uuid PK,
  enrollment_id uuid FK,
  drive_link text,
  report_text text,
  notes text,
  attachments text[],
  submitted_at timestamptz,
  reviewed_by uuid FK users,
  reviewed_at timestamptz,
  review_notes text
)

-- CRIO Credit Transactions
credit_transactions (
  id uuid PK,
  creon_id uuid FK,
  amount integer,              -- positive = earned, negative = spent
  type enum('mission_reward','bonus','redemption','admin_adjustment'),
  reference_id uuid,           -- mission_enrollment_id or redemption_id
  note text,
  created_at timestamptz
)

-- Shop Items
shop_items (
  id uuid PK,
  name text,
  description text,
  category enum('gift_card','crio_merch','gaming','voucher','other'),
  credit_cost integer,
  stock_count integer,
  image_url text,
  is_available boolean DEFAULT true,
  brand text                   -- e.g. "Valorant", "Amazon", "CRIO"
)

-- Redemptions
redemptions (
  id uuid PK,
  creon_id uuid FK,
  shop_item_id uuid FK,
  credits_spent integer,
  status enum('pending','processing','fulfilled','cancelled'),
  shipping_address jsonb,
  fulfillment_notes text,
  created_at timestamptz
)
```

---

## 5. Feature Specifications

---

### 5.1 Authentication & Onboarding

#### 5.1.1 Creon Self-Registration
- Public signup page accessible at `/register`
- Fields: Full Name, Email, College, Batch selection (dropdown)
- Email OTP verification via Supabase Auth
- On first login → redirect to **Profile Setup Wizard** (multi-step)
- Existing Creons (pre-KCAP) can claim their account using their registered email; Management can bulk-import existing users via CSV upload

#### 5.1.2 Profile Setup Wizard (Creon)
Multi-step form on first login:

| Step | Fields |
|------|--------|
| 1. Basic Info | Avatar upload, Username, Bio, Phone |
| 2. Location | Address Line, City, State, Pincode |
| 3. Social Links | Instagram, YouTube, Twitter, LinkedIn |
| 4. Interests | Hobbies (multi-select), Games Playing, Movies Watching, Shows Watching, Books Reading |
| 5. Done | Welcome screen with platform tour prompt |

All fields except email and full name are editable later from the Profile page.

#### 5.1.3 Admin / Management Accounts
- Created manually by Admin via the dashboard (no public signup)
- Role assignment: Admin sets role at creation

---

### 5.2 Profile Page

**Route:** `/u/:username`

**Sections:**
- **Header:** Avatar, name, username, college, batch badge, CRIO credit balance, join date
- **About:** Bio, location, social links
- **Interests:** Hobbies, games, movies, shows, books — displayed as styled tags (inspired by Letterboxd/Last.fm)
- **Activity Stats:** Missions completed, total credits earned, missions declined, events hosted
- **Mission History:** Card list of past missions with status and credits earned
- **Timeline Posts:** Events the user has proposed or hosted
- **Shareable Report Card Button:** Generates a branded PNG/image card summarizing the Creon's activity (see §5.7)

**Edit Profile:** Accessible only by the profile owner; inline editing or modal form.

---

### 5.3 Timeline Tab

**Route:** `/timeline`

The Timeline is the community social feed — a chronological/filtered list of events.

#### 5.3.1 Creon: Raise an Event Request

Creons can submit a **Timeline Event Request** via a "+" button or "Host an Event" CTA.

**Request Form Fields:**
| Field | Type | Required |
|-------|------|----------|
| Event Title | Text | ✅ |
| Event Type | Select: Watch Party / Gaming Session / Learning Program / Other | ✅ |
| Description | Rich text | ✅ |
| Scheduled Date & Time | DateTime picker | ✅ |
| Platform / Join Link | URL | ✅ |
| Max Participants | Number | ❌ |
| Cover Image | File upload | ❌ |

**Status flow:**  
`Pending` → Management/Admin reviews → `Approved` or `Rejected` (with reason)

#### 5.3.2 Admin/Management: Approve Events

- Management dashboard shows a queue of **Pending Requests**
- One-click Approve or Reject with optional rejection reason
- On approval: Supabase Edge Function triggers an email blast to **all active Creons** with event details and join link

#### 5.3.3 Timeline Feed (All Users)

- Displays **Approved** upcoming and past events
- Filter by: Event Type, Date Range, Upcoming Only
- Each card shows: Cover image, title, type badge, host name, date/time, join link, participant count
- Creons can RSVP ("I'm In") — tracked for engagement metrics
- Management sees pending items in a separate "Awaiting Approval" tab

#### 5.3.4 Email Notification Template

```
Subject: 🎉 New Event on KCAP: [Event Title]

Hey [Creon Name],

[Host Name] is hosting a [Event Type] — [Event Title]!

📅 Date & Time: [Scheduled At]
📍 Platform: [Platform Link]

[Description]

Join Now → [Link]

— The KCAP Team
```

---

### 5.4 Missions Tab

**Route:** `/missions`

#### 5.4.1 Mission Creation (Admin / Management)

**Mission Form Fields:**
| Field | Type | Description |
|-------|------|-------------|
| Title | Text | Mission name |
| Type | Select: Content / Offline Event / Hybrid / Other | |
| Description | Rich text | Full brief, expectations, context |
| Start Date / End Date | Date pickers | Mission window |
| Total Credits | Number | Max 100% payout value |
| Targets | Dynamic rows | e.g. "Post 10 reels", "Conduct 1 event", "Get 500 views" |
| Reward Tiers | Dynamic rows | e.g. 0-30% → 20 credits, 30-70% → 50 credits, 70-100% → 90 credits |
| Assets Provided | File uploads + Drive link | Brand kits, guidelines, templates |
| Prerequisite Fields | Custom form builder | Fields Creons must fill before enrolling (e.g. T-shirt size, shipping address override) |
| Max Participants | Number | Optional cap |
| Visibility | Toggle | Draft vs Published |

#### 5.4.2 Mission Card (Creon View)

Each mission is displayed as a card with:
- Title, Type badge, Date range
- Description excerpt
- Targets summary
- Credits available (total value)
- Enrolled count / max participants
- Status: Open / Closed / Full
- CTA: **Enroll** or **Decline**

#### 5.4.3 Mission Enrollment Flow

1. Creon clicks **Enroll**
2. System shows prerequisite form (dynamic fields defined by Management)
3. Creon fills in required data → submits
4. Enrollment is created with status `enrolled` → transitions to `active` once mission starts
5. Creon receives mission assets (drive links, files) on the mission detail page

#### 5.4.4 Mission Decline Flow

1. Creon clicks **Decline** on an active mission they're enrolled in (or on a new open mission)
2. Modal prompts for a **Decline Reason** (free text, required)
3. Enrollment status set to `declined`; reason stored
4. Management feed shows this decline with reason, attributed to the Creon

#### 5.4.5 Deliverable Submission (Creon)

When a Creon is ready to submit:

**Submission Form:**
| Field | Type |
|-------|------|
| Google Drive Link | URL |
| Report / Summary | Rich text |
| Notes | Text area |
| Additional Attachments | File uploads |
| Self-Reported Progress | Per-target number inputs (e.g. "I posted 8 reels") |

After submission → status moves to `submitted`.

#### 5.4.6 Mission Review & Credit Award (Management)

Management sees all `submitted` enrollments. For each:
- View deliverables, drive links, report
- Compare self-reported vs expected targets
- System auto-calculates performance % and **suggested credits** based on reward tiers
- Management can override credits (within total mission cap)
- Management can add **Bonus Credits** (no cap restriction — bonus is additive)
- Approve submission → credit transaction created → Creon notified

#### 5.4.7 Credit Calculation Logic

```
performance_pct = (achieved / target) * 100

# Match against reward tiers
for tier in mission.tier_rewards:
    if tier.min_pct <= performance_pct <= tier.max_pct:
        base_credits = tier.credits
        break

total_credits = base_credits + bonus_credits
```

---

### 5.5 Creon Activity Feed (Management/Admin View)

**Route:** `/dashboard/activity`

A management-only view showing:
- All Creons listed with last active date
- Missions enrolled / declined / submitted in last 30/60/90 days
- Color-coded activity indicators: 🟢 Active (last 30d) · 🟡 At Risk (31–60d) · 🔴 Inactive (60d+)
- Per-Creon action: **Remove from Platform** (soft delete, sets `is_active = false`)
- Filter by: Batch, Activity Status, Mission Participation
- Decline reason feed: chronological list of all declines with reasons

---

### 5.6 Leaderboard Tab

**Route:** `/leaderboard`

#### 5.6.1 Leaderboard Views
| View | Metric |
|------|--------|
| All-Time Credits | Total CRIO credits earned |
| Current Mission | Real-time % completion of active mission targets |
| Events | Total events hosted & approved |
| Monthly | Credits earned in current calendar month |

#### 5.6.2 Design Principles
- Show **top 10** with full detail; below rank 10 shows the viewing Creon's own rank
- Each row: Rank badge, Avatar, Name, College, Batch, Metric value, Progress bar
- Outperformers (>100% target) get a ⚡ "Overachiever" badge
- Framing copy: "You're 120 credits away from #3 — keep going!" (personalized nudge, never shaming language)
- Leaderboard updates via Supabase Realtime subscriptions

---

### 5.7 Shop / Redeem Tab

**Route:** `/shop`

#### 5.7.1 Shop Catalog
- Grid of **Shop Items** (cards with image, name, credit cost, category, stock status)
- Filter by: Category (Gift Cards, CRIO Merch, Gaming, Vouchers)
- Each item shows current price in CRIO credits and Creon's current balance for context

#### 5.7.2 Redemption Flow
1. Creon clicks **Redeem** on an item
2. Confirmation modal: shows credit cost, current balance, resulting balance post-redemption
3. If shipping required: auto-fills saved address from profile (editable)
4. Confirm → `redemption` record created, credits deducted atomically (DB transaction)
5. Management notified of new redemption order
6. Status tracked: `pending` → `processing` → `fulfilled`

#### 5.7.3 Redemption History
- Creon can view all past redemptions with status under `/shop/history`

---

### 5.8 Shareable Report Card

Accessible from Profile page — generates a **branded PNG card** summarizing:
- Creon's name, avatar, college, batch
- Total missions completed
- Total CRIO credits earned
- Top mission performance highlight
- Events hosted
- Leaderboard rank
- KCAP + CRIO branding, QR code linking to the platform

**Implementation:** Canvas API or `html2canvas` rendering a styled card component → downloadable PNG.

Designed to be Instagram-story-sized (9:16) and square (1:1) — toggle between formats.

---

### 5.9 Notification System

| Trigger | Recipient | Channel |
|---------|-----------|---------|
| Timeline event approved | All active Creons | Email + In-app |
| New mission published | All active Creons | Email + In-app |
| Mission submission reviewed | Submitting Creon | Email + In-app |
| Credits awarded | Creon | In-app |
| Redemption status update | Creon | Email + In-app |
| Creon goes inactive (60d) | Management | In-app dashboard alert |

In-app notifications: Bell icon in nav with unread count badge; notification drawer with mark-as-read.

---

## 6. Navigation Structure

```
KCAP App
├── / (Landing / Login)
├── /register
├── /timeline
├── /missions
│   ├── /missions/:id
│   └── /missions/:id/submit
├── /leaderboard
├── /shop
│   └── /shop/history
├── /u/:username (Profile)
├── /notifications
└── /dashboard (Admin + Management only)
    ├── /dashboard/activity
    ├── /dashboard/missions
    ├── /dashboard/timeline
    ├── /dashboard/shop
    └── /dashboard/users
```

---

## 7. Tech Stack Details

| Layer | Technology | Notes |
|-------|-----------|-------|
| Frontend Framework | React 18 | Vite or Next.js App Router |
| UI Components | shadcn/ui + Tailwind CSS | Use shadcn primitives; extend with custom styles |
| State Management | Zustand or React Query (TanStack) | Server state via React Query; client state via Zustand |
| Backend | Supabase | Auth, DB, Storage, Realtime, Edge Functions |
| Hosting | Vercel | Auto-deploy from GitHub; preview deploys per PR |
| Email | Supabase Edge Functions + Resend | Transactional emails |
| Image Generation | html2canvas / Canvas API | Report card generation |
| Forms | React Hook Form + Zod | Validation |
| Rich Text | TipTap | Mission descriptions, deliverable reports |
| File Storage | Supabase Storage | Avatars, mission assets, deliverables |

---

## 8. Security & Access Control

- **Row Level Security (RLS)** on all Supabase tables
  - Creons can only read/write their own data
  - Management can read all Creon data; write missions and approvals
  - Admin has unrestricted access
- **Role stored in `users.role`**, verified server-side via RLS policies — not trusted from client
- **File uploads** scanned for type (images: jpg/png/webp; docs: pdf, common office formats only)
- **Email verification** required before platform access
- **Soft deletes** only — `is_active = false`; data retained for audit

---

## 9. MVP Scope (Phase 1)

| Feature | In MVP |
|---------|--------|
| Auth + Onboarding | ✅ |
| Profile page | ✅ |
| Timeline (create, approve, view) | ✅ |
| Missions (create, enroll, decline, submit, review) | ✅ |
| CRIO Credits (earn, balance display) | ✅ |
| Leaderboard (all-time credits) | ✅ |
| Shop + Redemptions | ✅ |
| Email notifications (event approval, mission publish) | ✅ |
| Report Card generator | ❌ Phase 2 |
| Advanced leaderboard views | ❌ Phase 2 |
| Bulk CSV import for existing Creons | ✅ |
| Management activity feed / inactivity alerts | ✅ |

---

## 10. Success Metrics

| Metric | Target (3 months post-launch) |
|--------|-------------------------------|
| Creon onboarding rate (existing) | ≥ 80% of existing Creons claimed accounts |
| Mission participation rate | ≥ 70% of active Creons per mission |
| Mission completion rate | ≥ 60% of enrolled Creons submit deliverables |
| Timeline events per month | ≥ 10 approved events |
| Shop redemptions | ≥ 20 redemptions in first 90 days |
| Report cards shared on social | ≥ 15 shares per mission cycle |

---

## 11. Open Questions

1. **Batch naming convention** — auto-incremented ("Batch 16") or custom names?
2. **Credit expiry** — do CRIO credits expire after inactivity?
3. **Mission visibility** — can Creons see missions they didn't enroll in after the mission closes?
4. **Co-hosting timeline events** — can multiple Creons be listed as hosts?
5. **Minimum credits for shop items** — is there a floor to prevent trivial redemptions?
6. **Waitlist for missions** — if max participants is hit, do Creons join a waitlist?

---

*Document Owner: CRIO Brand Team*  
*Last Updated: June 2026*
