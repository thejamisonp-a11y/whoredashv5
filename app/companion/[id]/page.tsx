import { query } from "@/lib/db/neon"
import { notFound } from "next/navigation"
import { CompanionProfile } from "@/components/companion-profile"
import { CompanionReviews } from "@/components/companion-reviews"
import type { Companion } from "@/lib/types"

export default async function CompanionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const { data: companions } = await query<Companion>("SELECT * FROM companions WHERE id = $1", [id])

  const companion = companions?.[0]

  if (!companion) {
    notFound()
  }

  const { data: reviews } = await query(
    `SELECT r.*, p.full_name 
     FROM reviews r 
     LEFT JOIN profiles p ON r.client_id = p.id 
     WHERE r.companion_id = $1 
     ORDER BY r.created_at DESC`,
    [id],
  )

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <CompanionProfile companion={companion} />
        <div className="mt-12">
          <CompanionReviews reviews={reviews || []} />
        </div>
      </div>
    </div>
  )
}
