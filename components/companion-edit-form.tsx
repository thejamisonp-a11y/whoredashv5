"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { updateCompanionProfile } from "@/app/actions/companions"
import type { Companion } from "@/lib/types"

interface CompanionEditFormProps {
  companion: Companion
  userId: string
}

export function CompanionEditForm({ companion, userId }: CompanionEditFormProps) {
  const router = useRouter()
  const [displayName, setDisplayName] = useState(companion.display_name)
  const [category, setCategory] = useState(companion.category)
  const [age, setAge] = useState(companion.age.toString())
  const [location, setLocation] = useState(companion.location)
  const [bio, setBio] = useState(companion.bio)
  const [ratePerHour, setRatePerHour] = useState(companion.rate_per_hour.toString())
  const [available, setAvailable] = useState(companion.available)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const result = await updateCompanionProfile({
        companionId: companion.id,
        displayName,
        category: category as "women" | "men" | "trans",
        age: Number.parseInt(age),
        location,
        bio,
        ratePerHour: Number.parseInt(ratePerHour),
        available,
      })

      if (result.error) {
        throw new Error(result.error)
      }

      setSuccess(true)
      router.refresh()
      setTimeout(() => {
        router.push("/companion-dashboard")
      }, 1500)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update profile")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="displayName">Display Name</Label>
            <Input
              id="displayName"
              placeholder="Your stage name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="women">Women</SelectItem>
                <SelectItem value="men">Men</SelectItem>
                <SelectItem value="trans">Trans</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                placeholder="25"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
                min="18"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ratePerHour">Rate per Hour ($)</Label>
              <Input
                id="ratePerHour"
                type="number"
                placeholder="200"
                value={ratePerHour}
                onChange={(e) => setRatePerHour(e.target.value)}
                required
                min="1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="New York, NY"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              placeholder="Tell clients about yourself..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={6}
              required
            />
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-0.5">
              <Label htmlFor="available">Availability Status</Label>
              <p className="text-sm text-muted-foreground">
                {available ? "You are currently accepting bookings" : "You are not accepting bookings"}
              </p>
            </div>
            <Switch id="available" checked={available} onCheckedChange={setAvailable} />
          </div>

          {error && <div className="p-3 bg-destructive/10 text-destructive rounded-md text-sm">{error}</div>}

          {success && (
            <div className="p-3 bg-green-50 text-green-900 rounded-md text-sm">
              Profile updated successfully! Redirecting...
            </div>
          )}

          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1 bg-transparent"
              onClick={() => router.push("/companion-dashboard")}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
