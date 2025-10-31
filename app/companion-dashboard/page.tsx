import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CompanionBookingsList } from "@/components/companion-bookings-list"
import { CompanionProfileCard } from "@/components/companion-profile-card"
import { Calendar, DollarSign, Star, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function CompanionDashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: companion } = await supabase.from("companions").select("*").eq("user_id", user.id).single()

  if (!companion) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Create Your Companion Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                You don't have a companion profile yet. Create one to start receiving bookings.
              </p>
              <Button asChild>
                <Link href="/companion-dashboard/setup">Create Profile</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const { data: bookings } = await supabase
    .from("bookings")
    .select("*, profiles(full_name, email)")
    .eq("companion_id", companion.id)
    .order("created_at", { ascending: false })

  const pendingBookings = bookings?.filter((b) => b.status === "pending") || []
  const confirmedBookings = bookings?.filter((b) => b.status === "confirmed") || []
  const completedBookings = bookings?.filter((b) => b.status === "completed") || []

  const totalEarnings = completedBookings.reduce((sum, booking) => sum + booking.total_amount, 0)

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Companion Dashboard</h1>
          <p className="text-muted-foreground">Manage your profile and bookings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{bookings?.length || 0}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingBookings.length}</div>
              <p className="text-xs text-muted-foreground">Awaiting response</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{companion.rating.toFixed(1)}</div>
              <p className="text-xs text-muted-foreground">{companion.total_reviews} reviews</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalEarnings}</div>
              <p className="text-xs text-muted-foreground">Lifetime</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                  </TabsList>
                  <TabsContent value="all">
                    <CompanionBookingsList bookings={bookings || []} companionId={companion.id} />
                  </TabsContent>
                  <TabsContent value="pending">
                    <CompanionBookingsList bookings={pendingBookings} companionId={companion.id} />
                  </TabsContent>
                  <TabsContent value="confirmed">
                    <CompanionBookingsList bookings={confirmedBookings} companionId={companion.id} />
                  </TabsContent>
                  <TabsContent value="completed">
                    <CompanionBookingsList bookings={completedBookings} companionId={companion.id} />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <CompanionProfileCard companion={companion} />
          </div>
        </div>
      </div>
    </div>
  )
}
