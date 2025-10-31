-- Create bookings table
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references auth.users(id) on delete cascade,
  companion_id uuid references public.companions(id) on delete cascade,
  booking_date timestamp with time zone not null,
  duration_hours integer not null,
  total_amount integer not null,
  delivery_address text not null,
  special_requests text,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table public.bookings enable row level security;

-- Clients can view their own bookings
create policy "bookings_select_own_client"
  on public.bookings for select
  using (auth.uid() = client_id);

-- Companions can view bookings for their profile
create policy "bookings_select_own_companion"
  on public.bookings for select
  using (
    auth.uid() in (
      select user_id from public.companions where id = companion_id
    )
  );

-- Clients can insert their own bookings
create policy "bookings_insert_client"
  on public.bookings for insert
  with check (auth.uid() = client_id);

-- Clients can update their own bookings
create policy "bookings_update_client"
  on public.bookings for update
  using (auth.uid() = client_id);

-- Companions can update bookings for their profile
create policy "bookings_update_companion"
  on public.bookings for update
  using (
    auth.uid() in (
      select user_id from public.companions where id = companion_id
    )
  );

-- Create indexes
create index bookings_client_idx on public.bookings(client_id);
create index bookings_companion_idx on public.bookings(companion_id);
create index bookings_status_idx on public.bookings(status);
