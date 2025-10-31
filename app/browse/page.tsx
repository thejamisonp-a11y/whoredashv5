import { query } from "@/lib/db/neon"
import { CompanionGrid } from "@/components/companion-grid"
import { BrowseFilters } from "@/components/browse-filters"
import type { Companion } from "@/lib/types"

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; location?: string; minRate?: string; maxRate?: string }>
}) {
  const params = await searchParams

  let sqlQuery = `
    SELECT * FROM companions 
    WHERE available = true
  `
  const queryParams: any[] = []
  let paramIndex = 1

  if (params.category) {
    sqlQuery += ` AND category = $${paramIndex}`
    queryParams.push(params.category)
    paramIndex++
  }

  if (params.location) {
    sqlQuery += ` AND location ILIKE $${paramIndex}`
    queryParams.push(`%${params.location}%`)
    paramIndex++
  }

  if (params.minRate) {
    sqlQuery += ` AND rate_per_hour >= $${paramIndex}`
    queryParams.push(Number.parseInt(params.minRate))
    paramIndex++
  }

  if (params.maxRate) {
    sqlQuery += ` AND rate_per_hour <= $${paramIndex}`
    queryParams.push(Number.parseInt(params.maxRate))
    paramIndex++
  }

  sqlQuery += ` ORDER BY rating DESC`

  const { data: companions, error } = await query<Companion>(sqlQuery, queryParams)

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
