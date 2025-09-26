import { z } from "zod"

// Contact form validation
export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export type ContactFormData = z.infer<typeof contactSchema>

// Newsletter subscription validation
export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})

export type NewsletterFormData = z.infer<typeof newsletterSchema>

// Login form validation
export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export type LoginFormData = z.infer<typeof loginSchema>

// Blog post validation
export const blogPostSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  content: z.string().min(50, "Content must be at least 50 characters"),
  summary: z.string().min(20, "Summary must be at least 20 characters"),
  category: z.string().min(1, "Please select a category"),
  tags: z.array(z.string()).min(1, "Please add at least one tag"),
  thumbnail: z.string().url().optional(),
  status: z.enum(["draft", "published"]),
  isFeatured: z.boolean().default(false),
})

export type BlogPostFormData = z.infer<typeof blogPostSchema>
