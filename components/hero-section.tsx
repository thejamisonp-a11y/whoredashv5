"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Flame, CheckCircle, Star, Users } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function HeroSection() {
  const router = useRouter()
  const [address, setAddress] = useState("")

  const handleSearch = () => {
    if (address) {
      router.push(`/browse?location=${encodeURIComponent(address)}`)
    } else {
      router.push("/browse")
    }
  }

  return (
    <section className="py-16 md:py-24 px-4">
      <div className="container max-w-5xl mx-auto">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance">
              Premium Companions
              <br />
              Delivered <span className="text-primary">Fast & Discreet</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Verified, professional companions available 24/7. Average delivery time: 30 minutes.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="font-medium">100% Verified</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
              <span className="font-medium">4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              <span className="font-medium">50k+ Happy Clients</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 flex-1 sm:flex-initial px-8"
              onClick={() => router.push("/browse?category=women")}
            >
              <Flame className="h-5 w-5 mr-2" />
              Women
              <span className="ml-2 text-xs opacity-90">12,000+ available</span>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="flex-1 sm:flex-initial px-8 bg-transparent"
              onClick={() => router.push("/browse?category=men")}
            >
              🔥 Men
              <span className="ml-2 text-xs">5,000+ available</span>
            </Button>
          </div>

          <div className="max-w-2xl mx-auto">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto px-8 bg-transparent"
              onClick={() => router.push("/browse?category=trans")}
            >
              🦋 Trans
              <span className="ml-2 text-xs">3,000+ available</span>
            </Button>
          </div>

          <div className="max-w-2xl mx-auto mt-12">
            <div className="flex flex-col sm:flex-row gap-3 p-6 bg-card rounded-xl shadow-lg border">
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
                <Input
                  placeholder="Enter your delivery address"
                  className="pl-10 h-12 text-base"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
              <Button size="lg" className="bg-primary hover:bg-primary/90 h-12 px-8" onClick={handleSearch}>
                <Flame className="h-5 w-5 mr-2" />
                Find Companions Now
              </Button>
            </div>

            <div className="mt-6">
              <Link href="/browse" className="text-primary hover:underline font-medium">
                Or browse all available companions →
              </Link>
            </div>
          </div>

          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg max-w-2xl mx-auto">
            <p className="text-sm text-blue-900">
              🚀 <strong>Demo Platform:</strong> Experience our booking flow with sample data
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
