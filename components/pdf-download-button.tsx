"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, FileText, ExternalLink } from "lucide-react"
import { generateBlogPDF, downloadPDF, openPDFInNewTab } from "@/lib/pdf-generator"
import type { BlogPost } from "@/lib/api"

interface PDFDownloadButtonProps {
  blogPost: BlogPost
  variant?: "download" | "preview" | "both"
  className?: string
}

export function PDFDownloadButton({ blogPost, variant = "both", className = "" }: PDFDownloadButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGeneratePDF = async (action: "download" | "preview") => {
    setIsGenerating(true)

    try {
      const doc = await generateBlogPDF(blogPost, true)
      const filename = `${blogPost.slug}.pdf`

      if (action === "download") {
        downloadPDF(doc, filename)
      } else {
        openPDFInNewTab(doc)
      }
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("Failed to generate PDF. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  if (variant === "download") {
    return (
      <Button
        onClick={() => handleGeneratePDF("download")}
        disabled={isGenerating}
        className={className}
        variant="outline"
      >
        <Download className="w-4 h-4 mr-2" />
        {isGenerating ? "Generating..." : "Download PDF"}
      </Button>
    )
  }

  if (variant === "preview") {
    return (
      <Button
        onClick={() => handleGeneratePDF("preview")}
        disabled={isGenerating}
        className={className}
        variant="outline"
      >
        <ExternalLink className="w-4 h-4 mr-2" />
        {isGenerating ? "Generating..." : "Preview PDF"}
      </Button>
    )
  }

  return (
    <div className={`flex gap-2 ${className}`}>
      <Button onClick={() => handleGeneratePDF("preview")} disabled={isGenerating} variant="outline" size="sm">
        <FileText className="w-4 h-4 mr-2" />
        {isGenerating ? "Generating..." : "Preview"}
      </Button>
      <Button onClick={() => handleGeneratePDF("download")} disabled={isGenerating} variant="outline" size="sm">
        <Download className="w-4 h-4 mr-2" />
        {isGenerating ? "Generating..." : "Download"}
      </Button>
    </div>
  )
}
