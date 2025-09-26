"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
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
import { X, Plus, Save, Eye, AlertCircle, CheckCircle, Download } from "lucide-react"
import { blogPostSchema, type BlogPostFormData } from "@/lib/validations"
import { createBlog, getAuthToken } from "@/lib/api"
import { generateBlogPDF, downloadPDF, openPDFInNewTab } from "@/lib/pdf-generator"

const categories = ["Tech", "Career", "Tutorial", "Web Development", "JavaScript", "React", "Next.js"]

export default function AddPostPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")
  const [previewMode, setPreviewMode] = useState(false)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BlogPostFormData>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      status: "draft",
      isFeatured: false,
    },
  })

  const watchedContent = watch("content")
  const watchedTitle = watch("title")
  const watchedSummary = watch("summary")
  const watchedCategory = watch("category")

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

      await createBlog({ ...data, tags }, token)
      setSuccess("Post created successfully!")

      setTimeout(() => {
        router.push("/dashboard/posts")
      }, 1500)
    } catch (error) {
      console.error("Create post error:", error)
      setError("Failed to create post. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const generatePDF = async (action: "download" | "preview" = "download") => {
    setIsGeneratingPDF(true)

    try {
      // Create a mock blog post object for PDF generation
      const mockPost = {
        id: Date.now(),
        title: watchedTitle || "Untitled Post",
        slug: (watchedTitle || "untitled-post").toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        content: watchedContent || "No content provided",
        summary: watchedSummary || "No summary provided",
        category: watchedCategory || "Uncategorized",
        tags: tags,
        views: 0,
        isFeatured: false,
        status: "draft" as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        author: {
          id: 1,
          name: "John Developer",
          avatar: "/diverse-user-avatars.png",
        },
      }

      const doc = await generateBlogPDF(mockPost, true)
      const filename = `${mockPost.slug}.pdf`

      if (action === "download") {
        downloadPDF(doc, filename)
      } else {
        openPDFInNewTab(doc)
      }
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("Failed to generate PDF. Please try again.")
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  return (
    <div className="container-width section-padding py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Create New Post</h1>
            <p className="text-muted-foreground mt-2">Write and publish your blog post</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setPreviewMode(!previewMode)}>
              <Eye className="h-4 w-4 mr-2" />
              {previewMode ? "Edit" : "Preview"}
            </Button>
            <Button variant="outline" onClick={() => generatePDF("preview")} disabled={isGeneratingPDF}>
              <Eye className="h-4 w-4 mr-2" />
              {isGeneratingPDF ? "Generating..." : "Preview PDF"}
            </Button>
            <Button variant="outline" onClick={() => generatePDF("download")} disabled={isGeneratingPDF}>
              <Download className="h-4 w-4 mr-2" />
              {isGeneratingPDF ? "Generating..." : "Download PDF"}
            </Button>
          </div>
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
              {!previewMode ? (
                <>
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
                        placeholder="Write your post content here... You can use HTML tags for formatting."
                        rows={20}
                        disabled={isSubmitting}
                        className="font-mono text-sm"
                      />
                      {errors.content && <p className="text-sm text-destructive mt-2">{errors.content.message}</p>}
                      <p className="text-xs text-muted-foreground mt-2">
                        Tip: You can use HTML tags like &lt;h2&gt;, &lt;p&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;ul&gt;,
                        &lt;li&gt;, etc.
                      </p>
                    </CardContent>
                  </Card>
                </>
              ) : (
                /* Preview Mode */
                <Card>
                  <CardHeader>
                    <CardTitle>Preview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <article className="prose prose-lg max-w-none dark:prose-invert">
                      <h1>{watchedTitle || "Untitled Post"}</h1>
                      <p className="lead text-muted-foreground">{watchedSummary || "No summary provided"}</p>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: watchedContent || "<p>No content provided</p>",
                        }}
                      />
                    </article>
                  </CardContent>
                </Card>
              )}
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
                  <p className="text-xs text-muted-foreground mt-2">Optional: Add a thumbnail image URL</p>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="space-y-2">
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  <Save className="h-4 w-4 mr-2" />
                  {isSubmitting ? "Creating..." : "Create Post"}
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
