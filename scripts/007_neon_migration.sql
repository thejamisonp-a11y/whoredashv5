-- Migration script to ensure all tables exist in Neon database
-- This script is idempotent and can be run multiple times safely

-- Create profiles table if not exists
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create companions table if not exists
CREATE TABLE IF NOT EXISTS companions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  category TEXT NOT NULL,
  age INTEGER,
  location TEXT,
  bio TEXT,
  avatar_url TEXT,
  rate_per_hour INTEGER NOT NULL,
  verified BOOLEAN DEFAULT false,
  available BOOLEAN DEFAULT true,
  rating NUMERIC DEFAULT 5.0,
  total_reviews INTEGER DEFAULT 0,
  images TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create bookings table if not exists
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  companion_id UUID REFERENCES companions(id) ON DELETE CASCADE,
  booking_date TIMESTAMPTZ NOT NULL,
  duration_hours INTEGER NOT NULL,
  total_amount INTEGER NOT NULL,
  delivery_address TEXT NOT NULL,
  special_requests TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create reviews table if not exists
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
  companion_id UUID REFERENCES companions(id) ON DELETE CASCADE,
  client_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_companions_user_id ON companions(user_id);
CREATE INDEX IF NOT EXISTS idx_companions_available ON companions(available);
CREATE INDEX IF NOT EXISTS idx_companions_category ON companions(category);
CREATE INDEX IF NOT EXISTS idx_bookings_client_id ON bookings(client_id);
CREATE INDEX IF NOT EXISTS idx_bookings_companion_id ON bookings(companion_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_reviews_companion_id ON reviews(companion_id);
