-- Seed sample companion data for demo purposes
-- Note: This uses placeholder data. In production, real companion profiles would be added through the UI.

-- Insert sample companions (using random UUIDs for demo)
INSERT INTO public.companions (id, display_name, category, age, location, bio, rate_per_hour, verified, available, rating, total_reviews)
VALUES
  (gen_random_uuid(), 'Sophia Rose', 'women', 25, 'New York, NY', 'Professional model and companion with 5 years of experience. I love art, fine dining, and meaningful conversations.', 300, true, true, 4.9, 127),
  (gen_random_uuid(), 'Isabella Grace', 'women', 28, 'Los Angeles, CA', 'Elegant and sophisticated companion. Fluent in English and French. Perfect for business events and social gatherings.', 350, true, true, 4.8, 98),
  (gen_random_uuid(), 'Emma Laurent', 'women', 24, 'Miami, FL', 'Fun-loving and adventurous. I enjoy beach activities, dancing, and exploring new restaurants.', 250, true, true, 5.0, 156),
  (gen_random_uuid(), 'Olivia Chen', 'women', 26, 'San Francisco, CA', 'Tech-savvy companion with a passion for innovation and culture. Great for networking events.', 320, true, true, 4.7, 89),
  (gen_random_uuid(), 'Marcus Steel', 'men', 29, 'New York, NY', 'Former athlete and fitness enthusiast. Professional, discreet, and great company for any occasion.', 280, true, true, 4.9, 76),
  (gen_random_uuid(), 'James Anderson', 'men', 32, 'Chicago, IL', 'Business professional by day, charming companion by night. Well-traveled and cultured.', 300, true, true, 4.8, 64),
  (gen_random_uuid(), 'Alex Rivera', 'trans', 27, 'Austin, TX', 'Vibrant personality with a love for music and art. Open-minded and accepting of all.', 270, true, true, 5.0, 92),
  (gen_random_uuid(), 'Jordan Blake', 'trans', 25, 'Seattle, WA', 'Creative soul with a passion for fashion and design. Great conversationalist and listener.', 260, true, true, 4.9, 71)
ON CONFLICT (id) DO NOTHING;
