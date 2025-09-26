"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/sections/hero-section"
import { AboutSection } from "@/components/sections/about-section"
import { FeaturedPostsSection } from "@/components/sections/featured-posts-section"
import { CategoriesSection } from "@/components/sections/categories-section"
import { RecentPostsSection } from "@/components/sections/recent-posts-section"
import { NewsletterSection } from "@/components/sections/newsletter-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { ContactSection } from "@/components/sections/contact-section"
import { getBlogStats } from "@/lib/api"

interface HomeData {
  hero: any
  about: any
  featuredPosts: number[]
  categories: string[]
  recentPosts: any[]
  newsletter: any
  testimonials: any[]
  contact: any
}

export default function HomePage() {
  const [homeData, setHomeData] = useState<HomeData | null>(null)
  const [blogStats, setBlogStats] = useState({ totalPosts: 25, totalViews: 15420 }) // Set default values immediately
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        // Load home.json data
        const response = await fetch("/home.json")
        const data = await response.json()
        setHomeData(data)

        const stats = await getBlogStats()
        setBlogStats(stats)
      } catch (error) {
        console.error("Failed to load home data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading || !homeData) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar totalPosts={blogStats.totalPosts} totalViews={blogStats.totalViews} />
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar totalPosts={blogStats.totalPosts} totalViews={blogStats.totalViews} />

      <main>
        <HeroSection data={homeData.hero} />
        <AboutSection data={homeData.about} />
        <FeaturedPostsSection featuredPostIds={homeData.featuredPosts} />
        <CategoriesSection categories={homeData.categories} />
        <RecentPostsSection posts={homeData.recentPosts} />
        <NewsletterSection data={homeData.newsletter} />
        <TestimonialsSection testimonials={homeData.testimonials} />
        <ContactSection data={homeData.contact} />
      </main>

      {/* Footer */}
      <footer className="bg-muted/50 border-t border-border py-12">
        <div className="container-width section-padding">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">JD</span>
              </div>
              <span className="font-semibold text-lg">John Developer</span>
            </div>
            <p className="text-muted-foreground">© 2025 John Developer. All rights reserved.</p>
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <a href="/privacy" className="hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="/sitemap.xml" className="hover:text-primary transition-colors">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
