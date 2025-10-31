"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Star, MapPin, CheckCircle2, Clock, DollarSign } from "lucide-react"
import type { Companion } from "@/lib/types"
import { useRouter } from "next/navigation"

interface CompanionProfileProps {
  companion: Companion
}

export function CompanionProfile({ companion }: CompanionProfileProps) {
  const router = useRouter()

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="col-span-2 aspect-[16/9] relative bg-muted rounded-lg overflow-hidden">
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

          {companion.images &&
            companion.images.slice(0, 4).map((image, idx) => (
              <div key={idx} className="aspect-square relative bg-muted rounded-lg overflow-hidden">
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${companion.display_name} ${idx + 1}`}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-4xl font-bold">{companion.display_name}</h1>
                  {companion.verified && (
                    <Badge className="bg-primary text-primary-foreground">
                      <CheckCircle2 className="w-4 h-4 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <span className="text-lg">{companion.age} years old</span>
                  <Badge variant="secondary" className="capitalize">
                    {companion.category}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-muted-foreground" />
                <span className="text-lg">{companion.location}</span>
              </div>

              {companion.rating > 0 && (
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-lg font-semibold">{companion.rating.toFixed(1)}</span>
                  <span className="text-muted-foreground">({companion.total_reviews} reviews)</span>
                </div>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">About</h2>
            <p className="text-muted-foreground leading-relaxed">{companion.bio || "No bio available."}</p>
          </div>
        </div>
      </div>

      <div className="lg:col-span-1">
        <Card className="sticky top-24">
          <CardContent className="p-6">
            <div className="space-y-6">
              <div>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-bold text-primary">${companion.rate_per_hour}</span>
                  <span className="text-muted-foreground">/hour</span>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="w-5 h-5 text-muted-foreground" />
                    <span>Average response: 28 minutes</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <DollarSign className="w-5 h-5 text-muted-foreground" />
                    <span>Minimum booking: 1 hour</span>
                  </div>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full"
                onClick={() => router.push(`/booking/${companion.id}`)}
                disabled={!companion.available}
              >
                {companion.available ? "Book Now" : "Currently Unavailable"}
              </Button>

              <div className="pt-4 border-t">
                <p className="text-xs text-muted-foreground text-center">
                  All companions are verified and background checked for your safety
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
