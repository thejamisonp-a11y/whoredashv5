"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

export function BrowseFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [category, setCategory] = useState(searchParams.get("category") || "")
  const [location, setLocation] = useState(searchParams.get("location") || "")
  const [minRate, setMinRate] = useState(searchParams.get("minRate") || "")
  const [maxRate, setMaxRate] = useState(searchParams.get("maxRate") || "")

  const handleFilter = () => {
    const params = new URLSearchParams()
    if (category) params.set("category", category)
    if (location) params.set("location", location)
    if (minRate) params.set("minRate", minRate)
    if (maxRate) params.set("maxRate", maxRate)

    router.push(`/browse?${params.toString()}`)
  }

  const handleReset = () => {
    setCategory("")
    setLocation("")
    setMinRate("")
    setMaxRate("")
    router.push("/browse")
  }

  return (
    <div className="bg-card rounded-lg border p-6">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger id="category">
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="women">Women</SelectItem>
              <SelectItem value="men">Men</SelectItem>
              <SelectItem value="trans">Trans</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="minRate">Min Rate ($/hr)</Label>
          <Input
            id="minRate"
            type="number"
            placeholder="Min"
            value={minRate}
            onChange={(e) => setMinRate(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="maxRate">Max Rate ($/hr)</Label>
          <Input
            id="maxRate"
            type="number"
            placeholder="Max"
            value={maxRate}
            onChange={(e) => setMaxRate(e.target.value)}
          />
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <Button onClick={handleFilter} className="flex-1">
          Apply Filters
        </Button>
        <Button onClick={handleReset} variant="outline">
          Reset
        </Button>
      </div>
    </div>
  )
}
