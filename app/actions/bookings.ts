"use server"

import { createClient } from "@/lib/supabase/server"

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
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("bookings")
    .insert({
      companion_id: params.companionId,
      client_id: params.clientId,
      booking_date: params.bookingDate,
      duration_hours: params.durationHours,
      total_amount: params.totalAmount,
      delivery_address: params.deliveryAddress,
      special_requests: params.specialRequests,
      status: "pending",
    })
    .select()
    .single()

  if (error) {
    console.error("[v0] Error creating booking:", error)
    return { error: error.message }
  }

  return { bookingId: data.id }
}

export async function updateBookingStatus(bookingId: string, status: string) {
  const supabase = await createClient()

  const { error } = await supabase.from("bookings").update({ status }).eq("id", bookingId)

  if (error) {
    console.error("[v0] Error updating booking status:", error)
    throw new Error(error.message)
  }

  return { success: true }
}
