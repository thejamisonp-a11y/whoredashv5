"use server"

import { query } from "@/lib/db/neon"

interface CreateBookingParams {
  companionId: string
  clientId: string
  bookingDate: string
  durationHours: number
  totalAmount: number
  deliveryAddress: string
  specialRequests: string | null
}

export async function createBooking(params: CreateBookingParams) {
  const { data, error } = await query(
    `INSERT INTO bookings (
      companion_id, client_id, booking_date, duration_hours, 
      total_amount, delivery_address, special_requests, status
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING id`,
    [
      params.companionId,
      params.clientId,
      params.bookingDate,
      params.durationHours,
      params.totalAmount,
      params.deliveryAddress,
      params.specialRequests,
      "pending",
    ],
  )

  if (error) {
    console.error("[v0] Error creating booking:", error)
    return { error: error.message || "Failed to create booking" }
  }

  return { bookingId: data?.[0]?.id }
}

export async function updateBookingStatus(bookingId: string, status: string) {
  const { error } = await query("UPDATE bookings SET status = $1, updated_at = NOW() WHERE id = $2", [
    status,
    bookingId,
  ])

  if (error) {
    console.error("[v0] Error updating booking status:", error)
    throw new Error(error.message || "Failed to update booking status")
  }

  return { success: true }
}
