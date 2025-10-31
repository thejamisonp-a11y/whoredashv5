import { createClient } from "@/lib/supabase/server"
import { notFound, redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Calendar, Clock, MapPin, DollarSign } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"

export default async function BookingConfirmationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: booking, error } = await supabase
    .from("bookings")
    .select("*, companions(*)")
    .eq("id", id)
    .eq("client_id", user.id)
    .single()

  if (error || !booking) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <CheckCircle2 className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-2">Booking Confirmed!</h1>
            <p className="text-muted-foreground">Your booking has been successfully created</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Booking Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4 pb-4 border-b">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                  {booking.companions.avatar_url ? (
                    <img
                      src={booking.companions.avatar_url || "/placeholder.svg"}
                      alt={booking.companions.display_name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-2xl">{booking.companions.display_name[0]}</span>
                  )}
                </div>
                <div>
                  <p className="font-semibold text-lg">{booking.companions.display_name}</p>
                  <p className="text-sm text-muted-foreground">{booking.companions.location}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Date</p>
                    <p className="text-muted-foreground">
                      {format(new Date(booking.booking_date), "EEEE, MMMM d, yyyy")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Time & Duration</p>
                    <p className="text-muted-foreground">
                      {format(new Date(booking.booking_date), "h:mm a")} • {booking.duration_hours}{" "}
                      {booking.duration_hours === 1 ? "hour" : "hours"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-muted-foreground">{booking.delivery_address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <DollarSign className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Total Amount</p>
                    <p className="text-2xl font-bold text-primary">${booking.total_amount}</p>
                  </div>
                </div>

                {booking.special_requests && (
                  <div className="pt-4 border-t">
                    <p className="font-medium mb-1">Special Requests</p>
                    <p className="text-muted-foreground">{booking.special_requests}</p>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t space-y-3">
                <Button asChild className="w-full" size="lg">
                  <Link href="/dashboard">View My Bookings</Link>
                </Button>
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link href="/browse">Browse More Companions</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
