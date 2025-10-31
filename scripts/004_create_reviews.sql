-- Create reviews table
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid references public.bookings(id) on delete cascade,
  client_id uuid references auth.users(id) on delete cascade,
  companion_id uuid references public.companions(id) on delete cascade,
  rating integer not null check (rating >= 1 and rating <= 5),
  comment text,
  created_at timestamp with time zone default now()
);

alter table public.reviews enable row level security;

-- Anyone can view reviews
create policy "reviews_select_all"
  on public.reviews for select
  using (true);

-- Clients can insert reviews for their bookings
create policy "reviews_insert_client"
  on public.reviews for insert
  with check (
    auth.uid() = client_id and
    exists (
      select 1 from public.bookings
      where id = booking_id
      and client_id = auth.uid()
      and status = 'completed'
    )
  );

-- Create trigger to update companion rating
create or replace function public.update_companion_rating()
returns trigger
language plpgsql
security definer
as $$
begin
  update public.companions
  set 
    rating = (
      select avg(rating)::numeric(3,2)
      from public.reviews
      where companion_id = new.companion_id
    ),
    total_reviews = (
      select count(*)
      from public.reviews
      where companion_id = new.companion_id
    )
  where id = new.companion_id;
  return new;
end;
$$;

drop trigger if exists on_review_created on public.reviews;

create trigger on_review_created
  after insert on public.reviews
  for each row
  execute function public.update_companion_rating();

-- Create index
create index reviews_companion_idx on public.reviews(companion_id);
