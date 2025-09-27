// API utility functions for the blog
const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || (typeof window !== "undefined" ? window.location.origin : "http://localhost:5000")

export interface BlogPost {
  id: number
  title: string
  slug: string
  content: string
  summary: string
  thumbnail?: string
  category: string
  tags: string[]
  views: number
  isFeatured: boolean
  status: "draft" | "published"
  createdAt: string
  updatedAt: string
  author: {
    id: number
    name: string
    avatar?: string
  }
}

export interface BlogStats {
  totalPosts: number
  totalViews: number
}

export interface AuthResponse {
  accessToken: string
  refreshToken: string
  user: {
    id: number
    name: string
    email: string
    avatar?: string
  }
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  // For demo purposes, use mock login
  const { mockLogin } = await import("./auth")
  return mockLogin(email, password)

  // Real implementation would be:
  const response = await fetch(`${BASE_URL}/api/v1/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })

  if (!response.ok) {
    throw new Error('Login failed')
  }

  return response.json()
}

// Blog functions
export async function getBlogs(page = 1, limit = 10): Promise<{ posts: BlogPost[]; total: number }> {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/blogs/?page=${page}&limit=${limit}`)

    if (!response.ok) {
      throw new Error("Failed to fetch blogs")
    }

    return response.json()
  } catch (error) {
    console.error("Failed to fetch blogs:", error)
    // Return mock data as fallback
    return {
      posts: [],
      total: 0,
    }
  }
}

export async function getBlogBySlug(slug: string): Promise<BlogPost> {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/blogs/${slug}`)

    if (!response.ok) {
      throw new Error("Failed to fetch blog")
    }

    return response.json()
  } catch (error) {
    console.error("Failed to fetch blog:", error)
    throw error
  }
}

export async function getBlogStats(): Promise<BlogStats> {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000)

    const response = await fetch(`${BASE_URL}/api/v1/blogs/count`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      console.warn(`Blog stats API returned ${response.status}: ${response.statusText}`)
      throw new Error(`HTTP ${response.status}`)
    }

    const contentType = response.headers.get("content-type")
    if (!contentType || !contentType.includes("application/json")) {
      console.warn("Blog stats API returned non-JSON response")
      throw new Error("Invalid content type")
    }

    const data = await response.json()

    // Correct way to access
    const stats = data.data
    if (
      typeof stats.totalPosts !== "number" ||
      typeof stats.totalWebViews !== "number"
    ) {
      throw new Error("Invalid response structure")
    }


    return {
      totalPosts: stats.totalPosts,
      totalViews: stats.totalWebViews,
    }
  } catch (error) {
    if (error instanceof Error) {
      console.warn("Blog stats API unavailable:", error.message)
    } else {
      console.warn("Blog stats API unavailable:", error)
    }

    return {
      totalPosts: 25,
      totalViews: 15420,
    }
  }
}

export async function createBlog(data: Partial<BlogPost>, token: string): Promise<BlogPost> {
  const response = await fetch(`${BASE_URL}/api/v1/blogs/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error("Failed to create blog")
  }

  return response.json()
}

export async function updateBlog(id: number, data: Partial<BlogPost>, token: string): Promise<BlogPost> {
  const response = await fetch(`${BASE_URL}/api/v1/blogs/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error("Failed to update blog")
  }

  return response.json()
}

export async function deleteBlog(id: number, token: string): Promise<void> {
  const response = await fetch(`${BASE_URL}/api/v1/blogs/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error("Failed to delete blog")
  }
}

// Utility function to get auth token
export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem("accessToken")
}

// Utility function to get user info
export function getUserInfo() {
  if (typeof window === "undefined") return null

  const userId = localStorage.getItem("userId")
  const name = localStorage.getItem("name")
  const avatar = localStorage.getItem("avatar")

  if (!userId) return null

  return { id: userId, name, avatar }
}
