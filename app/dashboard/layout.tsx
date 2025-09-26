import type React from "react"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Navbar } from "@/components/navbar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Navbar />
        {children}
      </div>
    </ProtectedRoute>
  )
}
