import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { CompanionSetupForm } from "@/components/companion-setup-form"

export default async function CompanionSetupPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: existingCompanion } = await supabase.from("companions").select("*").eq("user_id", user.id).single()

  if (existingCompanion) {
    redirect("/companion-dashboard")
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Create Your Companion Profile</h1>
          <p className="text-muted-foreground mb-8">Fill in your details to start receiving bookings</p>

          <CompanionSetupForm userId={user.id} />
        </div>
      </div>
    </div>
  )
}
