"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, ArrowLeft, AlertCircle, CheckCircle } from "lucide-react"
import { login } from "@/lib/api"
import { loginSchema, type LoginFormData } from "@/lib/validations"

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("accessToken")
    if (token) {
      router.push("/dashboard")
    }
  }, [router])

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true)
    setError("")
    setSuccess("")

    try {
      const response = await login(data.email, data.password)

      // Store auth data in localStorage
      localStorage.setItem("accessToken", response.accessToken)
      localStorage.setItem("refreshToken", response.refreshToken)
      localStorage.setItem("userId", response.user.id.toString())
      localStorage.setItem("name", response.user.name)
      if (response.user.avatar) {
        localStorage.setItem("avatar", response.user.avatar)
      }

      setSuccess("Login successful! Redirecting...")

      // Redirect to dashboard after a short delay
      setTimeout(() => {
        router.push("/dashboard")
        window.location.reload() // Refresh to update navbar
      }, 1500)
    } catch (error) {
      console.error("Login error:", error)
      setError("Invalid email or password. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <div className="container-width section-padding py-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </div>

      <div className="container-width section-padding">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Side - Image */}
          <div className="relative hidden lg:block">
            <div className="relative aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl" />
              <Image
                src="/developer-login-illustration.jpg"
                alt="Developer Login"
                fill
                className="object-cover rounded-2xl"
                sizes="50vw"
              />

              {/* Floating elements */}
              <div className="absolute top-8 left-8 bg-card border border-border rounded-lg p-4 shadow-lg">
                <div className="space-y-2">
                  <div className="text-sm font-medium">Welcome back!</div>
                  <div className="text-xs text-muted-foreground">Access your dashboard</div>
                </div>
              </div>

              <div className="absolute bottom-8 right-8 bg-card border border-border rounded-lg p-4 shadow-lg">
                <div className="space-y-2">
                  <div className="text-sm font-medium">Secure Login</div>
                  <div className="text-xs text-muted-foreground">Your data is protected</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <Card className="shadow-lg">
              <CardHeader className="space-y-4 text-center">
                <div className="flex items-center justify-center">
                  <div className="h-12 w-12 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-lg">JD</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <CardTitle className="text-2xl">Welcome Back</CardTitle>
                  <p className="text-muted-foreground">Sign in to access your dashboard</p>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {success && (
                  <Alert className="border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200">
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>{success}</AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </label>
                    <Input
                      {...register("email")}
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      disabled={isSubmitting}
                      className="h-11"
                    />
                    {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium">
                      Password
                    </label>
                    <div className="relative">
                      <Input
                        {...register("password")}
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        disabled={isSubmitting}
                        className="h-11 pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isSubmitting}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                    {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="remember" className="rounded border-border" />
                      <label htmlFor="remember" className="text-sm text-muted-foreground">
                        Remember me
                      </label>
                    </div>
                    <Link
                      href="/auth/forgot-password"
                      className="text-sm text-primary hover:text-primary/80 transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <Button type="submit" className="w-full h-11" disabled={isSubmitting}>
                    {isSubmitting ? "Signing in..." : "Sign In"}
                  </Button>
                </form>

                <div className="text-center text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <Link
                    href="/auth/register"
                    className="text-primary hover:text-primary/80 transition-colors font-medium"
                  >
                    Sign up
                  </Link>
                </div>

                {/* Demo Credentials */}
                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <div className="text-sm text-center space-y-2">
                    <div className="font-medium text-muted-foreground">Demo Credentials:</div>
                    <div className="text-xs text-muted-foreground">
                      Email: admin@example.com
                      <br />
                      Password: password123
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
