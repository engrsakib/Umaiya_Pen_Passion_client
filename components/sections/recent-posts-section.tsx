import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowRight } from "lucide-react"

interface RecentPost {
  id: number
  title: string
  summary: string
  date: string
  category: string
  slug?: string
  readTime?: number
}

interface RecentPostsSectionProps {
  posts: RecentPost[]
}

export function RecentPostsSection({ posts }: RecentPostsSectionProps) {
  return (
    <section className="py-24">
      <div className="container-width section-padding">
        <div className="flex items-center justify-between mb-16">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Recent Posts</h2>
            <p className="text-lg text-muted-foreground">Latest insights and tutorials from my blog</p>
          </div>
          <Link
            href="/blog"
            className="hidden sm:inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
          >
            View all posts
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-8">
          {posts.map((post, index) => (
            <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-3 gap-0">
                  {/* Image */}
                  <div className="relative aspect-video md:aspect-square overflow-hidden">
                    <Image
                      src={`/.jpg?height=300&width=400&query=${post.category} blog post`}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:bg-gradient-to-r" />
                    <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">{post.category}</Badge>
                  </div>

                  {/* Content */}
                  <div className="md:col-span-2 p-6 md:p-8 flex flex-col justify-center">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(post.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{post.readTime || 5} min read</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h3 className="text-2xl font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                          <Link href={`/blog/${post.slug || post.id}`}>{post.title}</Link>
                        </h3>
                        <p className="text-muted-foreground line-clamp-3 leading-relaxed">{post.summary}</p>
                      </div>

                      <Link
                        href={`/blog/${post.slug || post.id}`}
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
                      >
                        Read more
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mobile view all link */}
        <div className="text-center mt-12 sm:hidden">
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
