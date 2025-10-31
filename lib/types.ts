export interface Companion {
  id: string
  user_id: string
  display_name: string
  category: "women" | "men" | "trans"
  age: number
  location: string
  bio: string | null
  rate_per_hour: number
  avatar_url: string | null
  images: string[] | null
  verified: boolean
  available: boolean
  rating: number
  total_reviews: number
  created_at: string
  updated_at: string
}

export interface Booking {
  id: string
  client_id: string
  companion_id: string
  booking_date: string
  duration_hours: number
  total_amount: number
  delivery_address: string
  special_requests: string | null
  status: "pending" | "confirmed" | "completed" | "cancelled"
  created_at: string
  updated_at: string
}

export interface Review {
  id: string
  booking_id: string
  client_id: string
  companion_id: string
  rating: number
  comment: string | null
  created_at: string
}

export interface Profile {
  id: string
  email: string
  full_name: string | null
  phone: string | null
  created_at: string
}
