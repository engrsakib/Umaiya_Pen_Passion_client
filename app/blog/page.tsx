import type { Metadata } from "next"
import { BlogPageContent } from "./blog-page-content"

export const metadata: Metadata = {
  title: "Blog | Personal Blog - John Developer",
  description:
    "Insights, tutorials, and thoughts on web development, career growth, and technology trends. Explore articles on React, TypeScript, JavaScript, and more.",
  keywords: [
    "blog",
    "web development",
    "react",
    "typescript",
    "javascript",
    "tutorials",
    "career advice",
    "programming",
  ],
  openGraph: {
    title: "Blog | Personal Blog - John Developer",
    description: "Insights, tutorials, and thoughts on web development, career growth, and technology trends.",
    url: "/blog",
    type: "website",
    images: [
      {
        url: "/og-blog.jpg",
        width: 1200,
        height: 630,
        alt: "Blog - Personal Blog - John Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Personal Blog - John Developer",
    description: "Insights, tutorials, and thoughts on web development, career growth, and technology trends.",
    images: ["/og-blog.jpg"],
  },
  alternates: {
    canonical: "/blog",
  },
}

export default function BlogPage() {
  return <BlogPageContent />
}
