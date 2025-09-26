import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()

    // Validate required fields
    if (!body.title || !body.content || !body.category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Generate slug from title
    const slug = body.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")

    // Create new blog post (in real app, this would save to database)
    const newBlog = {
      id: Date.now(), // Simple ID generation for demo
      title: body.title,
      slug,
      content: body.content,
      summary: body.summary || body.content.substring(0, 200) + "...",
      thumbnail: body.thumbnail,
      category: body.category,
      tags: body.tags || [],
      views: 0,
      isFeatured: body.isFeatured || false,
      status: body.status || "published",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      author: {
        id: 1,
        name: "John Doe",
        avatar: "/diverse-user-avatars.png",
      },
    }

    return NextResponse.json(newBlog, { status: 201 })
  } catch (error) {
    console.error("Error creating blog:", error)
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 })
  }
}
