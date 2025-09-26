import { type NextRequest, NextResponse } from "next/server"

// Mock blog data (same as in route.ts)
const mockBlogs = [
  {
    id: 1,
    title: "Getting Started with React and TypeScript",
    slug: "getting-started-react-typescript",
    content:
      "React and TypeScript make a powerful combination for building scalable web applications. In this comprehensive guide, we'll explore how to set up a React project with TypeScript, understand the benefits of static typing, and learn best practices for component development.\n\nTypeScript brings static typing to JavaScript, which helps catch errors at compile time rather than runtime. When combined with React, it provides excellent developer experience with better IntelliSense, refactoring capabilities, and overall code quality.\n\nLet's start by creating a new React project with TypeScript support using Create React App...",
    summary: "Learn how to combine React with TypeScript for better development experience and type safety.",
    thumbnail: "/react-typescript-code-editor.jpg",
    category: "React",
    tags: ["React", "TypeScript", "JavaScript", "Frontend"],
    views: 1250,
    isFeatured: true,
    status: "published" as const,
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
    author: {
      id: 1,
      name: "John Doe",
      avatar: "/diverse-user-avatars.png",
    },
  },
  {
    id: 2,
    title: "Advanced JavaScript Patterns You Should Know",
    slug: "advanced-javascript-patterns",
    content:
      "JavaScript is a versatile language with many powerful patterns that can help you write cleaner, more maintainable code. In this article, we'll explore advanced patterns including the Module Pattern, Observer Pattern, Factory Pattern, and more.\n\nThe Module Pattern is one of the most important patterns in JavaScript. It allows you to create encapsulated code that doesn't pollute the global namespace. Here's how it works...\n\nThe Observer Pattern is particularly useful for creating event-driven architectures. It defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified automatically.",
    summary:
      "Explore advanced JavaScript patterns including Module, Observer, and Factory patterns with practical examples.",
    thumbnail: "/javascript-code-patterns.jpg",
    category: "JavaScript",
    tags: ["JavaScript", "Design Patterns", "Advanced", "Programming"],
    views: 890,
    isFeatured: true,
    status: "published" as const,
    createdAt: "2024-01-10T14:30:00Z",
    updatedAt: "2024-01-10T14:30:00Z",
    author: {
      id: 1,
      name: "John Doe",
      avatar: "/diverse-user-avatars.png",
    },
  },
  {
    id: 3,
    title: "Building Your Career as a Developer",
    slug: "building-career-developer",
    content:
      "Building a successful career as a developer requires more than just technical skills. In this comprehensive guide, we'll discuss career planning, skill development, networking, and strategies for advancing in the tech industry.\n\nFirst, let's talk about the importance of continuous learning. The tech industry moves fast, and staying current with new technologies, frameworks, and best practices is crucial for career growth.\n\nNetworking is another critical aspect of career development. Building relationships with other developers, attending conferences, contributing to open source projects, and engaging with the developer community can open doors to new opportunities.",
    summary: "A comprehensive guide to building and advancing your career as a software developer.",
    thumbnail: "/career-growth-developer.jpg",
    category: "Career",
    tags: ["Career", "Professional Development", "Tech Industry", "Growth"],
    views: 2100,
    isFeatured: false,
    status: "published" as const,
    createdAt: "2024-01-05T09:15:00Z",
    updatedAt: "2024-01-05T09:15:00Z",
    author: {
      id: 1,
      name: "John Doe",
      avatar: "/diverse-user-avatars.png",
    },
  },
  {
    id: 4,
    title: "CSS Grid vs Flexbox: When to Use Which",
    slug: "css-grid-vs-flexbox",
    content:
      "CSS Grid and Flexbox are both powerful layout systems, but they serve different purposes. Understanding when to use each one is crucial for creating efficient and maintainable layouts.\n\nFlexbox is designed for one-dimensional layouts - either a row or a column. It's perfect for distributing space along a single axis and aligning items within a container. Common use cases include navigation bars, button groups, and centering content.\n\nCSS Grid, on the other hand, is designed for two-dimensional layouts. It allows you to work with both rows and columns simultaneously, making it ideal for complex page layouts, card grids, and any design that requires precise control over both dimensions.",
    summary: "Learn the differences between CSS Grid and Flexbox and when to use each layout system.",
    thumbnail: "/css-grid-flexbox-layout.jpg",
    category: "CSS",
    tags: ["CSS", "Layout", "Grid", "Flexbox", "Frontend"],
    views: 1680,
    isFeatured: true,
    status: "published" as const,
    createdAt: "2024-01-01T16:45:00Z",
    updatedAt: "2024-01-01T16:45:00Z",
    author: {
      id: 1,
      name: "John Doe",
      avatar: "/diverse-user-avatars.png",
    },
  },
]

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params

    // Try to find by slug first, then by ID if slug is numeric
    let blog = mockBlogs.find((blog) => blog.slug === slug)

    // If not found by slug and the slug is numeric, try finding by ID
    if (!blog && !isNaN(Number(slug))) {
      const id = Number(slug)
      blog = mockBlogs.find((blog) => blog.id === id)
    }

    if (!blog) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }

    // Increment view count (in real app, this would update the database)
    blog.views += 1

    return NextResponse.json(blog)
  } catch (error) {
    console.error("Error fetching blog:", error)
    return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const authHeader = request.headers.get("authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { slug } = params
    const body = await request.json()

    // Find by slug first, then by ID if slug is numeric
    let blogIndex = mockBlogs.findIndex((blog) => blog.slug === slug)

    if (blogIndex === -1 && !isNaN(Number(slug))) {
      const id = Number(slug)
      blogIndex = mockBlogs.findIndex((blog) => blog.id === id)
    }

    if (blogIndex === -1) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }

    // Update blog post
    const updatedBlog = {
      ...mockBlogs[blogIndex],
      ...body,
      updatedAt: new Date().toISOString(),
    }

    mockBlogs[blogIndex] = updatedBlog

    return NextResponse.json(updatedBlog)
  } catch (error) {
    console.error("Error updating blog:", error)
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const authHeader = request.headers.get("authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { slug } = params

    // Find by slug first, then by ID if slug is numeric
    let blogIndex = mockBlogs.findIndex((blog) => blog.slug === slug)

    if (blogIndex === -1 && !isNaN(Number(slug))) {
      const id = Number(slug)
      blogIndex = mockBlogs.findIndex((blog) => blog.id === id)
    }

    if (blogIndex === -1) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }

    // Delete blog post
    mockBlogs.splice(blogIndex, 1)

    return NextResponse.json({ message: "Blog post deleted successfully" })
  } catch (error) {
    console.error("Error deleting blog:", error)
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 })
  }
}
