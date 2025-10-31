"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin } from "lucide-react"
import { format } from "date-fns"
import { updateBookingStatus } from "@/app/actions/bookings"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface Booking {
  id: string
  booking_date: string
  duration_hours: number
  total_amount: number
  delivery_address: string
  status: string
  profiles: {
    full_name: string | null
    email: string
  }
}

interface CompanionBookingsListProps {
  bookings: Booking[]
  companionId: string
}

export function CompanionBookingsList({ bookings, companionId }: CompanionBookingsListProps) {
  const router = useRouter()
  const [loadingId, setLoadingId] = useState<string | null>(null)

  if (bookings.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No bookings found</p>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/10 text-yellow-500"
      case "confirmed":
        return "bg-blue-500/10 text-blue-500"
      case "completed":
        return "bg-green-500/10 text-green-500"
      case "cancelled":
        return "bg-red-500/10 text-red-500"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const handleStatusUpdate = async (bookingId: string, newStatus: string) => {
    setLoadingId(bookingId)
    try {
      await updateBookingStatus(bookingId, newStatus)
      router.refresh()
    } catch (error) {
      console.error("[v0] Error updating booking:", error)
    } finally {
      setLoadingId(null)
    }
  }

  return (
    <div className="space-y-4 mt-4">
      {bookings.map((booking) => (
        <Card key={booking.id}>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-lg">{booking.profiles.full_name || "Anonymous"}</h3>
                    <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{booking.profiles.email}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">${booking.total_amount}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{format(new Date(booking.booking_date), "MMM d, yyyy")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>
                    {format(new Date(booking.booking_date), "h:mm a")} • {booking.duration_hours}h
                  </span>
                </div>
                <div className="flex items-center gap-2 md:col-span-2">
                  <MapPin className="w-4 h-4" />
                  <span>{booking.delivery_address}</span>
                </div>
              </div>

              {booking.status === "pending" && (
                <div className="flex gap-2 pt-4 border-t">
                  <Button
                    onClick={() => handleStatusUpdate(booking.id, "confirmed")}
                    disabled={loadingId === booking.id}
                    className="flex-1"
                  >
                    Accept
                  </Button>
                  <Button
                    onClick={() => handleStatusUpdate(booking.id, "cancelled")}
                    disabled={loadingId === booking.id}
                    variant="outline"
                    className="flex-1 bg-transparent"
                  >
                    Decline
                  </Button>
                </div>
              )}

              {booking.status === "confirmed" && (
                <div className="pt-4 border-t">
                  <Button
                    onClick={() => handleStatusUpdate(booking.id, "completed")}
                    disabled={loadingId === booking.id}
                    className="w-full"
                  >
                    Mark as Completed
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
