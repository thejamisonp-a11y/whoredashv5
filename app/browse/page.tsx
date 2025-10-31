import { createClient } from "@/lib/supabase/server"
import { CompanionGrid } from "@/components/companion-grid"
import { BrowseFilters } from "@/components/browse-filters"
import type { Companion } from "@/lib/types"

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; location?: string; minRate?: string; maxRate?: string }>
}) {
  const params = await searchParams
  const supabase = await createClient()

  let query = supabase.from("companions").select("*").eq("available", true).order("rating", { ascending: false })

  if (params.category) {
    query = query.eq("category", params.category)
  }

  if (params.location) {
    query = query.ilike("location", `%${params.location}%`)
  }

  if (params.minRate) {
    query = query.gte("rate_per_hour", Number.parseInt(params.minRate))
  }

  if (params.maxRate) {
    query = query.lte("rate_per_hour", Number.parseInt(params.maxRate))
  }

  const { data: companions, error } = await query

  if (error) {
    console.error("[v0] Error fetching companions:", error)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Browse Companions</h1>
          <p className="text-muted-foreground">Find your perfect match from our verified companions</p>
        </div>

        <BrowseFilters />

        <div className="mt-8">
          {companions && companions.length > 0 ? (
            <CompanionGrid companions={companions as Companion[]} />
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No companions found matching your criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
