import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://anhjeoaxbkmprplhelso.supabase.co"
  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFuaGplb2F4YmttcHJwbGhlbHNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEzMjk5NDQsImV4cCI6MjA3NjkwNTk0NH0.wytva7wak-dQLGWLvSimJT2aekOXfS7zY6Zd2jEkLRM"

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
