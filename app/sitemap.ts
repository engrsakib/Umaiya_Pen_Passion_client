import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://johndeveloper.blog"

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ]

  // Dynamic blog posts (in a real app, this would fetch from your database)
  const blogPosts = [
    {
      url: `${baseUrl}/blog/getting-started-react-typescript`,
      lastModified: new Date("2024-01-15"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/advanced-javascript-patterns`,
      lastModified: new Date("2024-01-10"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/building-career-developer`,
      lastModified: new Date("2024-01-05"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/css-grid-vs-flexbox`,
      lastModified: new Date("2024-01-01"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
  ]

  return [...staticPages, ...blogPosts]
}
