import type { Metadata } from "next"
import { BlogPostContent } from "./blog-post-content"

// This would typically fetch the blog post data
async function getBlogPost(slug: string) {
  // Mock data for demonstration
  return {
    id: 1,
    title: "Building Scalable React Applications with TypeScript",
    slug: "building-scalable-react-applications-typescript",
    content: `
      <h2>Introduction</h2>
      <p>Building scalable React applications requires careful planning, proper architecture, and the right tools. TypeScript has become an essential part of the modern React development stack, providing type safety and better developer experience.</p>
      
      <h2>Setting Up Your Project Structure</h2>
      <p>A well-organized project structure is crucial for scalability. Here's how I recommend structuring your React TypeScript project:</p>
      
      <pre><code>src/
  components/
    ui/
    forms/
    layout/
  hooks/
  lib/
  types/
  utils/
  pages/</code></pre>
      
      <h2>Component Architecture</h2>
      <p>When building scalable React applications, component architecture is key. Follow these principles:</p>
      
      <ul>
        <li>Keep components small and focused</li>
        <li>Use composition over inheritance</li>
        <li>Implement proper prop interfaces</li>
        <li>Separate business logic from presentation</li>
      </ul>
      
      <h2>State Management</h2>
      <p>For large applications, proper state management is essential. Consider these options:</p>
      
      <h3>Context API</h3>
      <p>Great for simple state sharing across components without prop drilling.</p>
      
      <h3>Zustand</h3>
      <p>A lightweight state management solution that works well with TypeScript.</p>
      
      <h3>Redux Toolkit</h3>
      <p>For complex applications with intricate state logic.</p>
      
      <h2>TypeScript Best Practices</h2>
      <p>Here are some TypeScript best practices for React applications:</p>
      
      <pre><code>interface Props {
  title: string;
  description?: string;
  onSubmit: (data: FormData) => void;
}

const MyComponent: React.FC<Props> = ({ title, description, onSubmit }) => {
  // Component implementation
};</code></pre>
      
      <h2>Testing Strategy</h2>
      <p>A comprehensive testing strategy should include:</p>
      
      <ul>
        <li>Unit tests for individual components</li>
        <li>Integration tests for component interactions</li>
        <li>End-to-end tests for critical user flows</li>
      </ul>
      
      <h2>Performance Optimization</h2>
      <p>To ensure your application performs well at scale:</p>
      
      <ul>
        <li>Use React.memo for expensive components</li>
        <li>Implement code splitting with React.lazy</li>
        <li>Optimize bundle size with tree shaking</li>
        <li>Use proper key props in lists</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Building scalable React applications with TypeScript requires attention to architecture, state management, testing, and performance. By following these practices, you'll create maintainable applications that can grow with your needs.</p>
    `,
    summary:
      "Learn the best practices for structuring large React applications with TypeScript, proper state management, and component architecture.",
    thumbnail: "/react-typescript-code-editor.jpg",
    category: "React",
    tags: ["React", "TypeScript", "Architecture", "Scalability", "Best Practices"],
    views: 2450,
    isFeatured: true,
    status: "published" as const,
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-16T14:20:00Z",
    author: {
      id: 1,
      name: "John Developer",
      avatar: "/developer-avatar.png",
    },
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getBlogPost(params.slug)

  if (!post) {
    return {
      title: "Post Not Found | Personal Blog - John Developer",
      description: "The blog post you're looking for doesn't exist.",
    }
  }

  return {
    title: `${post.title} | Personal Blog - John Developer`,
    description: post.summary,
    keywords: post.tags,
    authors: [{ name: post.author.name }],
    openGraph: {
      title: post.title,
      description: post.summary,
      url: `/blog/${post.slug}`,
      type: "article",
      publishedTime: post.createdAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      section: post.category,
      tags: post.tags,
      images: [
        {
          url: post.thumbnail || "/og-blog-post.jpg",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
      images: [post.thumbnail || "/og-blog-post.jpg"],
    },
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return <BlogPostContent slug={params.slug} />
}
