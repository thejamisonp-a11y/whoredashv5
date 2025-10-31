import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, Heart, Users, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-4">About whoredash</h1>
            <p className="text-xl text-muted-foreground">
              The premier platform connecting verified companions with discerning clients
            </p>
          </div>

          <div className="prose prose-lg max-w-none mb-16">
            <p className="text-muted-foreground text-lg leading-relaxed">
              Founded in 2024, whoredash revolutionizes the companion booking industry by providing a safe, discreet,
              and professional platform for connecting clients with verified companions. We believe in transparency,
              safety, and exceptional service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <Card>
              <CardContent className="p-8">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">Safety First</h3>
                <p className="text-muted-foreground">
                  Every companion is thoroughly vetted, verified, and background checked to ensure your safety and peace
                  of mind.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">Premium Experience</h3>
                <p className="text-muted-foreground">
                  We curate only the highest quality companions who are professional, reliable, and dedicated to
                  providing exceptional experiences.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">Diverse Selection</h3>
                <p className="text-muted-foreground">
                  With over 15,000 verified companions across all categories, you'll find the perfect match for your
                  preferences and needs.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">Fast & Reliable</h3>
                <p className="text-muted-foreground">
                  Average response time of 28 minutes and 99.2% satisfaction rate. We deliver on our promises, every
                  time.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-primary/5 rounded-lg p-8 mb-16">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Stats</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">15,000+</div>
                <div className="text-sm text-muted-foreground">Verified Companions</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">50,000+</div>
                <div className="text-sm text-muted-foreground">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">99.2%</div>
                <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">28 min</div>
                <div className="text-sm text-muted-foreground">Avg Response Time</div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
            <p className="text-muted-foreground mb-6">
              Whether you're looking to book a companion or become one, whoredash is your trusted platform
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/browse">Find a Companion</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent">
                <Link href="/auth/sign-up">Become a Companion</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
