"use server"

import { query } from "@/lib/db/neon"

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
  const { data, error } = await query(
    `INSERT INTO companions (
      user_id, display_name, category, age, location, bio, 
      rate_per_hour, available, verified
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING id`,
    [
      params.userId,
      params.displayName,
      params.category,
      params.age,
      params.location,
      params.bio,
      params.ratePerHour,
      true,
      false,
    ],
  )

  if (error) {
    console.error("[v0] Error creating companion profile:", error)
    return { error: error.message || "Failed to create companion profile" }
  }

  return { success: true, companionId: data?.[0]?.id }
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
  const { error } = await query(
    `UPDATE companions SET 
      display_name = $1, category = $2, age = $3, location = $4, 
      bio = $5, rate_per_hour = $6, available = $7, updated_at = NOW()
    WHERE id = $8`,
    [
      params.displayName,
      params.category,
      params.age,
      params.location,
      params.bio,
      params.ratePerHour,
      params.available,
      params.companionId,
    ],
  )

  if (error) {
    console.error("[v0] Error updating companion profile:", error)
    return { error: error.message || "Failed to update companion profile" }
  }

  return { success: true }
}
