// Authentication utility functions
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

export function getStoredUser(): User | null {
  if (typeof window === "undefined") return null

  const userId = localStorage.getItem("userId")
  const name = localStorage.getItem("name")
  const email = localStorage.getItem("email")
  const avatar = localStorage.getItem("avatar")

  if (!userId || !name) return null

  return {
    id: userId,
    name,
    email: email || "",
    avatar: avatar || undefined,
  }
}

export function clearAuthData(): void {
  if (typeof window === "undefined") return

  localStorage.removeItem("accessToken")
  localStorage.removeItem("refreshToken")
  localStorage.removeItem("userId")
  localStorage.removeItem("name")
  localStorage.removeItem("email")
  localStorage.removeItem("avatar")
}

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false

  const token = localStorage.getItem("accessToken")
  return !!token
}

// Mock login function for demo purposes
export async function mockLogin(email: string, password: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Demo credentials
  if (email === "admin@example.com" && password === "password123") {
    return {
      accessToken: "mock-access-token-" + Date.now(),
      refreshToken: "mock-refresh-token-" + Date.now(),
      user: {
        id: 1,
        name: "John Developer",
        email: "admin@example.com",
        avatar: "/developer-avatar.png",
      },
    }
  }

  throw new Error("Invalid credentials")
}
