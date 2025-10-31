import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, Calendar, CheckCircle2, Star } from "lucide-react"
import Link from "next/link"

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-4">How It Works</h1>
            <p className="text-xl text-muted-foreground">Book verified companions in just a few simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <Card>
              <CardContent className="p-8">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Search className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">1. Browse Companions</h3>
                <p className="text-muted-foreground">
                  Search through our verified companions by category, location, and rate. View detailed profiles with
                  photos, bios, and reviews.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">2. Book Your Date</h3>
                <p className="text-muted-foreground">
                  Select your preferred date, time, and duration. Enter your delivery address and any special requests
                  for a personalized experience.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">3. Get Confirmed</h3>
                <p className="text-muted-foreground">
                  Your companion reviews and confirms your booking. Average response time is just 28 minutes. Track your
                  booking status in real-time.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">4. Enjoy & Review</h3>
                <p className="text-muted-foreground">
                  Meet your companion at the scheduled time. After your experience, leave a review to help others make
                  informed decisions.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-primary/5 rounded-lg p-8 mb-16">
            <h2 className="text-3xl font-bold mb-4">Safety & Verification</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                All companions on whoredash are thoroughly verified and background checked. We prioritize your safety
                and privacy with:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Identity verification for all companions</li>
                <li>Background checks and screening</li>
                <li>Secure payment processing</li>
                <li>24/7 customer support</li>
                <li>Discreet and confidential service</li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground mb-6">
              Join thousands of satisfied clients who trust whoredash for premium companion services
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/browse">Browse Companions</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent">
                <Link href="/auth/sign-up">Create Account</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
