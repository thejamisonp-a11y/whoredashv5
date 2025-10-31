import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, CheckCircle2 } from "lucide-react"
import type { Companion } from "@/lib/types"

interface CompanionCardProps {
  companion: Companion
}

export function CompanionCard({ companion }: CompanionCardProps) {
  return (
    <Link href={`/companion/${companion.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
        <div className="aspect-[3/4] relative bg-muted">
          {companion.avatar_url ? (
            <img
              src={companion.avatar_url || "/placeholder.svg"}
              alt={companion.display_name}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-4xl text-muted-foreground">{companion.display_name[0]}</span>
            </div>
          )}
          {companion.verified && (
            <div className="absolute top-2 right-2">
              <Badge className="bg-primary text-primary-foreground">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            </div>
          )}
        </div>

        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-lg">{companion.display_name}</h3>
              <p className="text-sm text-muted-foreground">{companion.age} years old</p>
            </div>
            <Badge variant="secondary" className="capitalize">
              {companion.category}
            </Badge>
          </div>

          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
            <MapPin className="w-4 h-4" />
            <span>{companion.location}</span>
          </div>

          {companion.rating > 0 && (
            <div className="flex items-center gap-1 text-sm">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{companion.rating.toFixed(1)}</span>
              <span className="text-muted-foreground">({companion.total_reviews} reviews)</span>
            </div>
          )}
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <div className="w-full">
            <p className="text-2xl font-bold text-primary">${companion.rate_per_hour}/hr</p>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
