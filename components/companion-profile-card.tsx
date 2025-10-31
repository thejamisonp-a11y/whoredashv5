import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle2, MapPin, Star } from "lucide-react"
import Link from "next/link"
import type { Companion } from "@/lib/types"

interface CompanionProfileCardProps {
  companion: Companion
}

export function CompanionProfileCard({ companion }: CompanionProfileCardProps) {
  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle>Your Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="aspect-square relative bg-muted rounded-lg overflow-hidden">
          {companion.avatar_url ? (
            <img
              src={companion.avatar_url || "/placeholder.svg"}
              alt={companion.display_name}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-6xl text-muted-foreground">{companion.display_name[0]}</span>
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-xl">{companion.display_name}</h3>
            {companion.verified && (
              <Badge className="bg-primary text-primary-foreground">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
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
        </div>

        <div className="pt-4 border-t">
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-3xl font-bold text-primary">${companion.rate_per_hour}</span>
            <span className="text-muted-foreground">/hour</span>
          </div>
          <Badge variant={companion.available ? "default" : "secondary"} className="mb-4">
            {companion.available ? "Available" : "Unavailable"}
          </Badge>
        </div>

        <div className="space-y-2">
          <Button asChild className="w-full bg-transparent" variant="outline">
            <Link href={`/companion/${companion.id}`}>View Public Profile</Link>
          </Button>
          <Button asChild className="w-full bg-transparent" variant="outline">
            <Link href="/companion-dashboard/edit">Edit Profile</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
