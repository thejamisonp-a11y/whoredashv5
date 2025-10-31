"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { useEffect, useState } from "react"
import type { User } from "@supabase/supabase-js"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Image from "next/image"

export function SiteHeader() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const supabase = createClient()

    supabase.auth
      .getUser()
      .then(({ data: { user }, error }) => {
        // Only log actual errors, not missing sessions (which is expected for public pages)
        if (error && error.message !== "Auth session missing!") {
          console.error("[v0] Error fetching user:", error)
        }
        setUser(user)
      })
      .catch((err) => {
        console.error("[v0] Unhandled error in getUser:", err)
      })

    // Subscribe to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const handleSignOut = async () => {
    const supabase = createClient()
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error("[v0] Error signing out:", error)
      return
    }
    router.push("/")
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-primary">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logo.png"
            alt="whoredash"
            width={160}
            height={40}
            className="mx-0 my-14 px-0 py-12 leading-8 text-lg font-serif rounded-md w-40 h-64"
            priority
          />
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/browse"
            className="text-sm font-medium text-primary-foreground hover:opacity-80 transition-opacity"
          >
            Browse
          </Link>
          <Link
            href="/how-it-works"
            className="text-sm font-medium text-primary-foreground hover:opacity-80 transition-opacity"
          >
            How It Works
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-primary-foreground hover:opacity-80 transition-opacity"
          >
            About
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar>
                    <AvatarFallback className="bg-primary-foreground text-primary">
                      {user.email?.[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">My Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/companion-dashboard">Companion Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button
                variant="ghost"
                className="text-primary-foreground hover:bg-primary-foreground/10"
                onClick={() => router.push("/auth/login")}
              >
                Sign In
              </Button>
              <Button
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90"
                onClick={() => router.push("/auth/sign-up")}
              >
                Join as Companion
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="bg-accent py-2 px-4 text-center">
        <p className="text-sm text-primary-foreground">
          🔥 DEMO: Experience our platform features • Sample booking flow!
        </p>
      </div>
    </header>
  )
}
