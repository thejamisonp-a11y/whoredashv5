import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { CompanionProfile } from "@/components/companion-profile"
import { CompanionReviews } from "@/components/companion-reviews"
import type { Companion } from "@/lib/types"

export default async function CompanionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: companion, error } = await supabase.from("companions").select("*").eq("id", id).single()

  if (error || !companion) {
    notFound()
  }

  const { data: reviews } = await supabase
    .from("reviews")
    .select("*, profiles(full_name)")
    .eq("companion_id", id)
    .order("created_at", { ascending: false })

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <CompanionProfile companion={companion as Companion} />
        <div className="mt-12">
          <CompanionReviews reviews={(reviews as any[]) || []} />
        </div>
      </div>
    </div>
  )
}
