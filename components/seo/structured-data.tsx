import type { BlogPost } from "@/lib/api"

interface StructuredDataProps {
  type: "website" | "article" | "breadcrumb"
  data?: any
  blogPost?: BlogPost
}

export function StructuredData({ type, data, blogPost }: StructuredDataProps) {
  let structuredData: any = {}

  switch (type) {
    case "website":
      structuredData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Personal Blog - John Developer",
        description: "Full-stack developer sharing insights on React, TypeScript, and modern web development",
        url: "https://johndeveloper.blog",
        author: {
          "@type": "Person",
          name: "John Developer",
          jobTitle: "Full-Stack Developer",
          url: "https://johndeveloper.blog",
          sameAs: [
            "https://github.com/johndeveloper",
            "https://linkedin.com/in/johndeveloper",
            "https://twitter.com/johndeveloper",
          ],
        },
        potentialAction: {
          "@type": "SearchAction",
          target: "https://johndeveloper.blog/blog?search={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      }
      break

    case "article":
      if (blogPost) {
        structuredData = {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: blogPost.title,
          description: blogPost.summary,
          image: blogPost.thumbnail
            ? `https://johndeveloper.blog${blogPost.thumbnail}`
            : "https://johndeveloper.blog/og-image.jpg",
          author: {
            "@type": "Person",
            name: blogPost.author.name,
            url: "https://johndeveloper.blog",
          },
          publisher: {
            "@type": "Organization",
            name: "Personal Blog - John Developer",
            logo: {
              "@type": "ImageObject",
              url: "https://johndeveloper.blog/logo.png",
            },
          },
          datePublished: blogPost.createdAt,
          dateModified: blogPost.updatedAt,
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://johndeveloper.blog/blog/${blogPost.slug}`,
          },
          keywords: blogPost.tags.join(", "),
          articleSection: blogPost.category,
          wordCount: blogPost.content.replace(/<[^>]*>/g, "").split(" ").length,
          inLanguage: "en-US",
          copyrightYear: new Date(blogPost.createdAt).getFullYear(),
          copyrightHolder: {
            "@type": "Person",
            name: "John Developer",
          },
        }
      }
      break

    case "breadcrumb":
      structuredData = data
      break
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
}
