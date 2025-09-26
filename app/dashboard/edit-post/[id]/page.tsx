"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { X, Plus, Save, ArrowLeft, AlertCircle, CheckCircle } from "lucide-react"
import { blogPostSchema, type BlogPostFormData } from "@/lib/validations"
import { updateBlog, getAuthToken, type BlogPost } from "@/lib/api"

const categories = ["Tech", "Career", "Tutorial", "Web Development", "JavaScript", "React", "Next.js"]

// Mock post data for editing
const mockPost: BlogPost = {
  id: 1,
  title: "Building Scalable React Applications with TypeScript",
  slug: "building-scalable-react-applications-typescript",
  content: `
    <h2>Introduction</h2>
    <p>Building scalable React applications requires careful planning, proper architecture, and the right tools.</p>
    
    <h2>Setting Up Your Project Structure</h2>
    <p>A well-organized project structure is crucial for scalability.</p>
  `,
  summary: "Learn the best practices for structuring large React applications with TypeScript.",
  thumbnail: "/react-typescript-code-editor.jpg",
  category: "React",
  tags: ["React", "TypeScript", "Architecture"],
  views: 2450,
  isFeatured: true,
  status: "published",
  createdAt: "2024-01-15T00:00:00Z",
  updatedAt: "2024-01-15T00:00:00Z",
  author: {
    id: 1,
    name: "John Developer",
    avatar: "/developer-avatar.png",
  },
}

export default function EditPostPage() {
  const params = useParams()
  const router = useRouter()
  const postId = Number.parseInt(params.id as string)

  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BlogPostFormData>({
    resolver: zodResolver(blogPostSchema),
  })

  useEffect(() => {
    // Load post data (using mock data for now)
    if (postId === 1) {
      setPost(mockPost)
      setValue("title", mockPost.title)
      setValue("summary", mockPost.summary)
      setValue("content", mockPost.content)
      setValue("category", mockPost.category)
      setValue("thumbnail", mockPost.thumbnail)
      setValue("status", mockPost.status)
      setValue("isFeatured", mockPost.isFeatured)
      setTags(mockPost.tags)
      setValue("tags", mockPost.tags)
    }
    setLoading(false)
  }, [postId, setValue])

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      const newTags = [...tags, tagInput.trim()]
      setTags(newTags)
      setValue("tags", newTags)
      setTagInput("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove)
    setTags(newTags)
    setValue("tags", newTags)
  }

  const onSubmit = async (data: BlogPostFormData) => {
    setIsSubmitting(true)
    setError("")
    setSuccess("")

    try {
      const token = getAuthToken()
      if (!token) {
        throw new Error("No authentication token found")
      }

      await updateBlog(postId, { ...data, tags }, token)
      setSuccess("Post updated successfully!")

      setTimeout(() => {
        router.push("/dashboard/posts")
      }, 1500)
    } catch (error) {
      console.error("Update post error:", error)
      setError("Failed to update post. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="container-width section-padding py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/4" />
          <div className="h-64 bg-muted rounded" />
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="container-width section-padding py-8">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Post Not Found</h1>
          <p className="text-muted-foreground">The post you're trying to edit doesn't exist.</p>
          <Button onClick={() => router.push("/dashboard/posts")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Posts
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container-width section-padding py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Edit Post</h1>
            <p className="text-muted-foreground mt-2">Update your blog post</p>
          </div>
          <Button variant="outline" onClick={() => router.push("/dashboard/posts")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Posts
          </Button>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-6 border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title */}
              <Card>
                <CardHeader>
                  <CardTitle>Post Title</CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    {...register("title")}
                    placeholder="Enter your post title..."
                    className="text-lg"
                    disabled={isSubmitting}
                  />
                  {errors.title && <p className="text-sm text-destructive mt-2">{errors.title.message}</p>}
                </CardContent>
              </Card>

              {/* Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    {...register("summary")}
                    placeholder="Write a brief summary of your post..."
                    rows={3}
                    disabled={isSubmitting}
                  />
                  {errors.summary && <p className="text-sm text-destructive mt-2">{errors.summary.message}</p>}
                </CardContent>
              </Card>

              {/* Content */}
              <Card>
                <CardHeader>
                  <CardTitle>Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    {...register("content")}
                    placeholder="Write your post content here..."
                    rows={20}
                    disabled={isSubmitting}
                    className="font-mono text-sm"
                  />
                  {errors.content && <p className="text-sm text-destructive mt-2">{errors.content.message}</p>}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Publish Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Publish Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={watch("status")}
                      onValueChange={(value: "draft" | "published") => setValue("status", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="featured"
                      checked={watch("isFeatured")}
                      onCheckedChange={(checked) => setValue("isFeatured", checked)}
                    />
                    <Label htmlFor="featured">Featured Post</Label>
                  </div>
                </CardContent>
              </Card>

              {/* Category */}
              <Card>
                <CardHeader>
                  <CardTitle>Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <Select value={watch("category")} onValueChange={(value) => setValue("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && <p className="text-sm text-destructive mt-2">{errors.category.message}</p>}
                </CardContent>
              </Card>

              {/* Tags */}
              <Card>
                <CardHeader>
                  <CardTitle>Tags</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      placeholder="Add a tag..."
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                    />
                    <Button type="button" variant="outline" size="icon" onClick={addTag}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <button type="button" onClick={() => removeTag(tag)} className="ml-1 hover:text-destructive">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>

                  {errors.tags && <p className="text-sm text-destructive">{errors.tags.message}</p>}
                </CardContent>
              </Card>

              {/* Thumbnail */}
              <Card>
                <CardHeader>
                  <CardTitle>Thumbnail URL</CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    {...register("thumbnail")}
                    placeholder="https://example.com/image.jpg"
                    disabled={isSubmitting}
                  />
                  {errors.thumbnail && <p className="text-sm text-destructive mt-2">{errors.thumbnail.message}</p>}
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="space-y-2">
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  <Save className="h-4 w-4 mr-2" />
                  {isSubmitting ? "Updating..." : "Update Post"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => router.push("/dashboard/posts")}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
