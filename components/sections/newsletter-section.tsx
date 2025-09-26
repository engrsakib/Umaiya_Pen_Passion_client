"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, CheckCircle, AlertCircle } from "lucide-react"
import { newsletterSchema, type NewsletterFormData } from "@/lib/validations"

interface NewsletterData {
  cta: string
  subtitle: string
  image: string
}

interface NewsletterSectionProps {
  data: NewsletterData
}

export function NewsletterSection({ data }: NewsletterSectionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  })

  const onSubmit = async (data: NewsletterFormData) => {
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In a real app, make API call to subscribe user
      console.log("Newsletter subscription:", data)

      setSubmitStatus("success")
      reset()
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container-width section-padding">
        <Card className="max-w-4xl mx-auto overflow-hidden">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Content */}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-bold">Stay Updated</h2>
                    </div>
                    <p className="text-lg text-muted-foreground leading-relaxed">{data.cta}</p>
                    <p className="text-muted-foreground">{data.subtitle}</p>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <Input
                            {...register("email")}
                            type="email"
                            placeholder="Enter your email address"
                            className="h-12"
                            disabled={isSubmitting}
                          />
                          {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
                        </div>
                        <Button type="submit" size="lg" disabled={isSubmitting} className="px-8">
                          {isSubmitting ? "Subscribing..." : "Subscribe"}
                        </Button>
                      </div>
                    </div>

                    {submitStatus === "success" && (
                      <div className="flex items-center gap-2 text-green-600 text-sm">
                        <CheckCircle className="h-4 w-4" />
                        <span>Successfully subscribed! Check your email for confirmation.</span>
                      </div>
                    )}

                    {submitStatus === "error" && (
                      <div className="flex items-center gap-2 text-destructive text-sm">
                        <AlertCircle className="h-4 w-4" />
                        <span>Something went wrong. Please try again.</span>
                      </div>
                    )}
                  </form>

                  <p className="text-xs text-muted-foreground">
                    No spam, unsubscribe at any time. I respect your privacy.
                  </p>
                </div>
              </div>

              {/* Image */}
              <div className="relative min-h-[300px] bg-gradient-to-br from-primary/10 to-accent/10">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4 p-8">
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                      <Mail className="h-8 w-8 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Join 1,000+ developers</div>
                      <div className="text-xs text-muted-foreground">Weekly insights & tutorials</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
