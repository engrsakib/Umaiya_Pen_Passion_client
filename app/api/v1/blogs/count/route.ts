import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Mock data for demo - in real app, this would query your database
    const stats = {
      totalPosts: 25,
      totalViews: 15420,
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error("Error fetching blog stats:", error)
    return NextResponse.json({ error: "Failed to fetch blog stats" }, { status: 500 })
  }
}
