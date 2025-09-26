"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Eye, ArrowRight } from "lucide-react"
import type { BlogPost } from "@/lib/api"

interface FeaturedPostsSectionProps {
  featuredPostIds: number[]
}

// Mock data for featured posts (replace with actual API call)
const mockFeaturedPosts: BlogPost[] = [
  {
    id: 1,
    title: "Building Scalable React Applications with TypeScript",
    slug: "building-scalable-react-applications-typescript",
    content: "",
    summary:
      "Learn the best practices for structuring large React applications with TypeScript, proper state management, and component architecture.",
    thumbnail: "/react-typescript-code-editor.jpg",
    category: "React",
    tags: ["React", "TypeScript", "Architecture"],
    views: 2450,
    isFeatured: true,
    status: "published",
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
    author: {
      id: 1,
      name: "John Developer",
      avatar: "/developer-avatar.png",
    },
  },
  {
    id: 2,
    title: "The Future of Web Development: Trends to Watch in 2024",
    slug: "future-web-development-trends-2024",
    content: "",
    summary:
      "Exploring emerging trends and technologies that will shape the future of web development, from AI integration to new frameworks.",
    thumbnail: "/futuristic-web-development.png",
    category: "Tech",
    tags: ["Web Development", "Trends", "Future"],
    views: 1890,
    isFeatured: true,
    status: "published",
    createdAt: "2024-01-10T00:00:00Z",
    updatedAt: "2024-01-10T00:00:00Z",
    author: {
      id: 1,
      name: "John Developer",
      avatar: "/developer-avatar.png",
    },
  },
  {
    id: 3,
    title: "Mastering Next.js 14: App Router and Server Components",
    slug: "mastering-nextjs-14-app-router-server-components",
    content: "",
    summary:
      "Deep dive into Next.js 14's App Router, Server Components, and how to build performant full-stack applications.",
    thumbnail: "/next-js-14-app-router.jpg",
    category: "Next.js",
    tags: ["Next.js", "React", "Server Components"],
    views: 3120,
    isFeatured: true,
    status: "published",
    createdAt: "2024-01-05T00:00:00Z",
    updatedAt: "2024-01-05T00:00:00Z",
    author: {
      id: 1,
      name: "John Developer",
      avatar: "/developer-avatar.png",
    },
  },
]

export function FeaturedPostsSection({ featuredPostIds }: FeaturedPostsSectionProps) {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, fetch featured posts by IDs
    // For now, use mock data
    setPosts(mockFeaturedPosts)
    setLoading(false)
  }, [featuredPostIds])

  if (loading) {
    return (
      <section className="py-24">
        <div className="container-width section-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Featured Posts</h2>
            <p className="text-lg text-muted-foreground">My most popular and impactful articles</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
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
      </section>
    )
  }

  return (
    <section className="py-24">
      <div className="container-width section-padding">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Featured Posts</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            My most popular and impactful articles on web development, career growth, and technical insights
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={post.thumbnail || "/placeholder.svg?height=300&width=400&query=blog post"}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">{post.category}</Badge>
              </div>

              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">{post.summary}</p>
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        <span>{post.views.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {post.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm font-medium"
                  >
                    Read more
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
          >
            View all posts
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
