"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Eye, Clock, ArrowLeft } from "lucide-react"
import { getBlogStats, type BlogPost } from "@/lib/api"
import { Breadcrumb } from "@/components/seo/breadcrumb"
import { StructuredData } from "@/components/seo/structured-data"

interface BlogPostContentProps {
  slug: string
}

export function BlogPostContent({ slug }: BlogPostContentProps) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [blogStats, setBlogStats] = useState({ totalPosts: 0, totalViews: 0 })
  const [loading, setLoading] = useState(true)
  const [readingTime, setReadingTime] = useState(5)

  // Mock blog post data
  const mockBlogPost: BlogPost = {
    id: 1,
    title: "Building Scalable React Applications with TypeScript",
    slug: "building-scalable-react-applications-typescript",
    content: `
      <h2>Introduction</h2>
      <p>Building scalable React applications requires careful planning, proper architecture, and the right tools. TypeScript has become an essential part of the modern React development stack, providing type safety and better developer experience.</p>
      
      <h2>Setting Up Your Project Structure</h2>
      <p>A well-organized project structure is crucial for scalability. Here's how I recommend structuring your React TypeScript project:</p>
      
      <pre><code>src/
  components/
    ui/
    forms/
    layout/
  hooks/
  lib/
  types/
  utils/
  pages/</code></pre>
      
      <h2>Component Architecture</h2>
      <p>When building scalable React applications, component architecture is key. Follow these principles:</p>
      
      <ul>
        <li>Keep components small and focused</li>
        <li>Use composition over inheritance</li>
        <li>Implement proper prop interfaces</li>
        <li>Separate business logic from presentation</li>
      </ul>
      
      <h2>State Management</h2>
      <p>For large applications, proper state management is essential. Consider these options:</p>
      
      <h3>Context API</h3>
      <p>Great for simple state sharing across components without prop drilling.</p>
      
      <h3>Zustand</h3>
      <p>A lightweight state management solution that works well with TypeScript.</p>
      
      <h3>Redux Toolkit</h3>
      <p>For complex applications with intricate state logic.</p>
      
      <h2>TypeScript Best Practices</h2>
      <p>Here are some TypeScript best practices for React applications:</p>
      
      <pre><code>interface Props {
  title: string;
  description?: string;
  onSubmit: (data: FormData) => void;
}

const MyComponent: React.FC<Props> = ({ title, description, onSubmit }) => {
  // Component implementation
};</code></pre>
      
      <h2>Testing Strategy</h2>
      <p>A comprehensive testing strategy should include:</p>
      
      <ul>
        <li>Unit tests for individual components</li>
        <li>Integration tests for component interactions</li>
        <li>End-to-end tests for critical user flows</li>
      </ul>
      
      <h2>Performance Optimization</h2>
      <p>To ensure your application performs well at scale:</p>
      
      <ul>
        <li>Use React.memo for expensive components</li>
        <li>Implement code splitting with React.lazy</li>
        <li>Optimize bundle size with tree shaking</li>
        <li>Use proper key props in lists</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Building scalable React applications with TypeScript requires attention to architecture, state management, testing, and performance. By following these practices, you'll create maintainable applications that can grow with your needs.</p>
    `,
    summary:
      "Learn the best practices for structuring large React applications with TypeScript, proper state management, and component architecture.",
    thumbnail: "/react-typescript-code-editor.jpg",
    category: "React",
    tags: ["React", "TypeScript", "Architecture", "Scalability", "Best Practices"],
    views: 2450,
    isFeatured: true,
    status: "published",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-16T14:20:00Z",
    author: {
      id: 1,
      name: "John Developer",
      avatar: "/developer-avatar.png",
    },
  }

  // Mock comments data
  const mockComments = [
    {
      id: 1,
      author: "Sarah Chen",
      content: "Great article! The section on component architecture really helped me restructure my current project.",
      date: "2024-01-16T09:15:00Z",
      avatar: "/diverse-user-avatars.png",
    },
    {
      id: 2,
      author: "Mike Rodriguez",
      content: "Thanks for the TypeScript examples. The interface patterns you showed are exactly what I needed.",
      date: "2024-01-16T14:30:00Z",
      avatar: "/diverse-user-avatars.png",
    },
  ]

  useEffect(() => {
    async function loadData() {
      try {
        // Load blog stats
        try {
          const stats = await getBlogStats()
          setBlogStats(stats)
        } catch (error) {
          console.error("Failed to load blog stats:", error)
          setBlogStats({ totalPosts: 25, totalViews: 15420 })
        }

        // Load post (using mock data for now)
        setPost(mockBlogPost)

        // Calculate reading time (rough estimate: 200 words per minute)
        const wordCount = mockBlogPost.content.replace(/<[^>]*>/g, "").split(" ").length
        setReadingTime(Math.ceil(wordCount / 200))
      } catch (error) {
        console.error("Failed to load blog post:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar totalPosts={blogStats.totalPosts} totalViews={blogStats.totalViews} />
        <div className="container-width section-padding py-24">
          <div className="animate-pulse space-y-8">
            <div className="bg-muted rounded-lg h-64" />
            <div className="space-y-4">
              <div className="bg-muted rounded h-8 w-3/4" />
              <div className="bg-muted rounded h-4 w-1/2" />
              <div className="space-y-2">
                <div className="bg-muted rounded h-4" />
                <div className="bg-muted rounded h-4" />
                <div className="bg-muted rounded h-4 w-2/3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar totalPosts={blogStats.totalPosts} totalViews={blogStats.totalViews} />
        <div className="container-width section-padding py-24">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Post Not Found</h1>
            <p className="text-muted-foreground">The blog post you're looking for doesn't exist.</p>
            <Button asChild>
              <Link href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <StructuredData type="article" blogPost={post} />

      <Navbar totalPosts={blogStats.totalPosts} totalViews={blogStats.totalViews} />

      <div className="container-width section-padding pt-8">
        <Breadcrumb items={[{ label: "Blog", href: "/blog" }, { label: post.title }]} />
      </div>

      {/* Hero Image */}
      <div className="relative h-[60vh] overflow-hidden">
        <Image
          src={post.thumbnail || "/placeholder.svg?height=600&width=1200&query=blog hero"}
          alt={post.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container-width section-padding">
            <div className="max-w-4xl">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Badge className="bg-primary text-primary-foreground">{post.category}</Badge>
                  {post.isFeatured && <Badge className="bg-accent text-accent-foreground">Featured</Badge>}
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">{post.title}</h1>
                <div className="flex items-center gap-6 text-white/80 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{readingTime} min read</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    <span>{post.views.toLocaleString()} views</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
