import { HeroSection } from "@/components/hero-section"
import { StatsSection } from "@/components/stats-section"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <HeroSection />
        <StatsSection />
      </main>
    </div>
  )
}
