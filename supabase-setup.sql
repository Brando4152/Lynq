-- ================================================
-- NEXUS Link-in-Bio — Supabase Setup
-- Run this in your Supabase SQL Editor
-- ================================================

-- 1. PROFILES TABLE
create table profiles (
  id uuid references auth.users primary key,
  username text unique not null,
  display_name text,
  bio text,
  avatar_url text,
  theme text default 'cyber',
  accent text default '#00f5ff',
  link_style text default 'solid',
  created_at timestamptz default now()
);

-- 2. LINKS TABLE
create table links (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  title text not null,
  url text not null,
  icon text default '🔗',
  position int default 0,
  clicks int default 0,
  created_at timestamptz default now()
);

-- 3. ROW LEVEL SECURITY
alter table profiles enable row level security;
alter table links enable row level security;

-- Profiles: anyone can read, only owner can write
create policy "Public profiles are viewable by everyone"
  on profiles for select using (true);

create policy "Users can insert their own profile"
  on profiles for insert with check (auth.uid() = id);

create policy "Users can update their own profile"
  on profiles for update using (auth.uid() = id);

-- Links: anyone can read, only owner can write, anyone can update clicks
create policy "Public links are viewable by everyone"
  on links for select using (true);

create policy "Users can insert their own links"
  on links for insert with check (auth.uid() = user_id);

create policy "Users can update their own links"
  on links for update using (auth.uid() = user_id);

create policy "Anyone can increment click count"
  on links for update using (true) with check (true);

create policy "Users can delete their own links"
  on links for delete using (auth.uid() = user_id);

-- ================================================
-- After running this, go to:
-- Supabase Dashboard → Authentication → URL Configuration
-- Add your site URL and set redirect URLs
-- ================================================
