"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Download } from "lucide-react"

interface HeroData {
  title: string
  tagline: string
  subtitle: string
  image: string
  buttons: Array<{
    text: string
    href: string
    variant: "primary" | "secondary"
  }>
}

interface HeroSectionProps {
  data: HeroData
}

export function HeroSection({ data }: HeroSectionProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20" />

      <div className="container-width section-padding relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                <span className="block">{data.title}</span>
              </h1>
              <p className="text-xl sm:text-2xl text-primary font-medium">{data.tagline}</p>
              <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">{data.subtitle}</p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {data.buttons.map((button, index) => (
                <Button
                  key={index}
                  asChild
                  variant={button.variant === "primary" ? "default" : "outline"}
                  size="lg"
                  className="group"
                >
                  <Link href={button.href}>
                    {button.text}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              ))}
            </div>

            {/* Quick stats */}
            <div className="flex items-center gap-8 pt-8 border-t border-border">
              <div>
                <div className="text-2xl font-bold text-primary">1+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Projects Completed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">15+</div>
                <div className="text-sm text-muted-foreground">Open Source</div>
              </div>
            </div>
          </div>

          {/* Profile image */}
          <div className="relative">
            <div className="relative w-full max-w-lg mx-auto">
              <div className="aspect-square relative rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
                <Image
                  src={data.image || "/placeholder.svg"}
                  alt={data.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-card border border-border rounded-lg p-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium">Available for work</span>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-card border border-border rounded-lg p-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <Download className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Download Resume</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
