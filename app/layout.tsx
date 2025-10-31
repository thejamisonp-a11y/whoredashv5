import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SiteHeader } from "@/components/site-header"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Whoredash - Premium Companions Delivered Fast & Discreet",
  description:
    "Verified, professional companions available 24/7. Average delivery time: 30 minutes. 100% verified, 4.9/5 rating, 50k+ happy clients.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html className="border-0 py-[0]" lang="en">
      <body className={`font-sans antialiased`}>
        <SiteHeader />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
