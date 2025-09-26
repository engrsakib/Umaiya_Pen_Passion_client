import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Hash } from "lucide-react"

interface CategoriesSectionProps {
  categories: string[]
}

// Mock category data with post counts
const categoryData = [
  { name: "Islam", count: 15, color: "bg-blue-500/10 text-blue-700 dark:text-blue-300" },
  { name: "Environment", count: 8, color: "bg-green-500/10 text-green-700 dark:text-green-300" },
  { name: "Disaster Management", count: 12, color: "bg-purple-500/10 text-purple-700 dark:text-purple-300" },
  { name: "Sustainabilit", count: 20, color: "bg-orange-500/10 text-orange-700 dark:text-orange-300" },
  { name: "Motivations", count: 18, color: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-300" },
  { name: "Science and Technology", count: 14, color: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-300" },
]

export function CategoriesSection({ categories }: CategoriesSectionProps) {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container-width section-padding">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Explore Topics</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover articles organized by categories and topics that interest you most
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryData.map((category) => (
            <Card key={category.name} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
              <CardContent className="p-6">
                <Link href={`/blog?category=${encodeURIComponent(category.name)}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg ${category.color}`}>
                      <Hash className="h-6 w-6" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {category.count} posts
                    </Badge>
                  </div>

                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>

                  <p className="text-muted-foreground text-sm">
                    Explore {category.count} articles about {category.name.toLowerCase()}
                  </p>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* All Categories Link */}
        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
          >
            Browse all categories
            <Hash className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
