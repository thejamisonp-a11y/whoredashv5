import { CompanionCard } from "@/components/companion-card"
import type { Companion } from "@/lib/types"

interface CompanionGridProps {
  companions: Companion[]
}

export function CompanionGrid({ companions }: CompanionGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {companions.map((companion) => (
        <CompanionCard key={companion.id} companion={companion} />
      ))}
    </div>
  )
}
