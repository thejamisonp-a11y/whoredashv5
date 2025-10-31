-- Create companions table
create table if not exists public.companions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  display_name text not null,
  category text not null check (category in ('women', 'men', 'trans')),
  age integer not null,
  location text not null,
  bio text,
  rate_per_hour integer not null,
  avatar_url text,
  images text[],
  verified boolean default false,
  available boolean default true,
  rating numeric(3,2) default 0,
  total_reviews integer default 0,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table public.companions enable row level security;

-- Anyone can view available companions
create policy "companions_select_all"
  on public.companions for select
  using (available = true);

-- Companions can insert their own profile
create policy "companions_insert_own"
  on public.companions for insert
  with check (auth.uid() = user_id);

-- Companions can update their own profile
create policy "companions_update_own"
  on public.companions for update
  using (auth.uid() = user_id);

-- Companions can delete their own profile
create policy "companions_delete_own"
  on public.companions for delete
  using (auth.uid() = user_id);

-- Create index for faster queries
create index companions_category_idx on public.companions(category);
create index companions_location_idx on public.companions(location);
create index companions_available_idx on public.companions(available);
