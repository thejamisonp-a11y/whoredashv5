import { createClient } from "@/lib/supabase/server"
import { notFound, redirect } from "next/navigation"
import { BookingForm } from "@/components/booking-form"
import type { Companion } from "@/lib/types"

export default async function BookingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect(`/auth/login?redirect=/booking/${id}`)
  }

  const { data: companion, error } = await supabase.from("companions").select("*").eq("id", id).single()

  if (error || !companion || !companion.available) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Complete Your Booking</h1>
          <p className="text-muted-foreground mb-8">Fill in the details below to book your companion</p>

          <BookingForm companion={companion as Companion} userId={user.id} />
        </div>
      </div>
    </div>
  )
}
