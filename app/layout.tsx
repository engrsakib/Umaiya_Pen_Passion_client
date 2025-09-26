import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ThemeProvider } from "@/components/theme-provider"
import { StructuredData } from "@/components/seo/structured-data"
import { Suspense } from "react"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Personal Blog - John Developer | Full-Stack Developer & Technical Writer",
  description:
    "Full-stack developer sharing insights on React, TypeScript, and modern web development. Explore tutorials, career advice, and technical deep-dives.",
  generator: "Next.js",
  keywords: [
    "web development",
    "react",
    "nextjs",
    "typescript",
    "javascript",
    "programming",
    "blog",
    "tutorials",
    "career advice",
  ],
  authors: [{ name: "John Developer", url: "https://johndeveloper.blog" }],
  creator: "John Developer",
  publisher: "John Developer",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://johndeveloper.blog"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://johndeveloper.blog",
    title: "Personal Blog - John Developer | Full-Stack Developer & Technical Writer",
    description:
      "Full-stack developer sharing insights on React, TypeScript, and modern web development. Explore tutorials, career advice, and technical deep-dives.",
    siteName: "Personal Blog - John Developer",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Personal Blog - John Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Personal Blog - John Developer | Full-Stack Developer & Technical Writer",
    description:
      "Full-stack developer sharing insights on React, TypeScript, and modern web development. Explore tutorials, career advice, and technical deep-dives.",
    creator: "@johndeveloper",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <StructuredData type="website" />
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//vercel.live" />
        <link rel="dns-prefetch" href="//vitals.vercel-analytics.com" />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Suspense fallback={<div className="min-h-screen bg-background" />}>{children}</Suspense>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
