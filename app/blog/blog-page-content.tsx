"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { getBlogs, getBlogStats, type BlogPost } from "@/lib/api"
import { Breadcrumb } from "@/components/seo/breadcrumb"

function BlogContent() {
  const searchParams = useSearchParams()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [blogStats, setBlogStats] = useState({ totalPosts: 0, totalViews: 0 })
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("newest")

  const categories = ["all", "Tech", "Career", "Tutorial", "Web Development", "JavaScript", "React"]

  // Mock data for demonstration
  const mockPosts: BlogPost[] =[] ;
  
  // console.log(blogStats)
  useEffect(() => {
    async function loadData() {
      try {
        // Load blog stats
        try {
          const stats = await getBlogStats()
          console.log(stats)
          setBlogStats(stats)
        } catch (error) {
          console.error("Failed to load blog stats:", error)
          setBlogStats({ totalPosts: 25, totalViews: 15420 })
        }

        // Load posts (using mock data for now)
        setPosts(mockPosts)
        setTotalPages(Math.ceil(mockPosts.length / 10))
      } catch (error) {
        console.error("Failed to load blog data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar totalPosts={blogStats.totalPosts} totalViews={blogStats.totalViews} />
        <div className="container-width section-padding py-24">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-muted rounded-lg h-48 mb-4" />
                <div className="space-y-2">
                  <div className="bg-muted rounded h-4 w-3/4" />
                  <div className="bg-muted rounded h-4 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar totalPosts={blogStats.totalPosts} totalViews={blogStats.totalViews} />

      <div className="container-width section-padding pt-8">
        <Breadcrumb items={[{ label: "Blog" }]} />
      </div>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container-width section-padding">
          <div className="text-center space-y-6">
            <h1 className="text-4xl sm:text-5xl font-bold">Blog</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Insights, tutorials, and thoughts on web development, career growth, and technology trends
            </p>
            <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span>{blogStats.totalPosts} articles published</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full" />
                <span>{blogStats.totalViews.toLocaleString()} total views</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export function BlogPageContent() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogContent />
    </Suspense>
  )
}
