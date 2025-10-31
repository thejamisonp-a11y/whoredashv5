"use server"

import { createClient } from "@/lib/supabase/server"

interface CreateCompanionProfileParams {
  userId: string
  displayName: string
  category: "women" | "men" | "trans"
  age: number
  location: string
  bio: string
  ratePerHour: number
}

export async function createCompanionProfile(params: CreateCompanionProfileParams) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("companions")
    .insert({
      user_id: params.userId,
      display_name: params.displayName,
      category: params.category,
      age: params.age,
      location: params.location,
      bio: params.bio,
      rate_per_hour: params.ratePerHour,
      available: true,
      verified: false,
    })
    .select()
    .single()

  if (error) {
    console.error("[v0] Error creating companion profile:", error)
    return { error: error.message }
  }

  return { success: true, companionId: data.id }
}

interface UpdateCompanionProfileParams {
  companionId: string
  displayName: string
  category: "women" | "men" | "trans"
  age: number
  location: string
  bio: string
  ratePerHour: number
  available: boolean
}

export async function updateCompanionProfile(params: UpdateCompanionProfileParams) {
  const supabase = await createClient()

  const { error } = await supabase
    .from("companions")
    .update({
      display_name: params.displayName,
      category: params.category,
      age: params.age,
      location: params.location,
      bio: params.bio,
      rate_per_hour: params.ratePerHour,
      available: params.available,
    })
    .eq("id", params.companionId)

  if (error) {
    console.error("[v0] Error updating companion profile:", error)
    return { error: error.message }
  }

  return { success: true }
}
