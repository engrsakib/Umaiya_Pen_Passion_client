// PDF generation utility using jsPDF
export async function generateBlogPDF(blogPost: any, watermark = true) {
  // Dynamic import to avoid SSR issues
  const { jsPDF } = await import("jspdf")

  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 20
  const maxWidth = pageWidth - margin * 2

  let yPosition = margin

  // Add watermark if enabled
  if (watermark) {
    doc.setTextColor(200, 200, 200)
    doc.setFontSize(50)
    doc.text("DEMO", pageWidth / 2, pageHeight / 2, {
      align: "center",
      angle: 45,
    })
  }

  // Reset color for content
  doc.setTextColor(0, 0, 0)

  // Title
  doc.setFontSize(20)
  doc.setFont(undefined, "bold")
  const titleLines = doc.splitTextToSize(blogPost.title, maxWidth)
  doc.text(titleLines, margin, yPosition)
  yPosition += titleLines.length * 10 + 10

  // Author and date
  doc.setFontSize(12)
  doc.setFont(undefined, "normal")
  doc.text(`By ${blogPost.author.name}`, margin, yPosition)
  yPosition += 8
  doc.text(`Published: ${new Date(blogPost.createdAt).toLocaleDateString()}`, margin, yPosition)
  yPosition += 15

  // Category and tags
  doc.text(`Category: ${blogPost.category}`, margin, yPosition)
  yPosition += 8
  doc.text(`Tags: ${blogPost.tags.join(", ")}`, margin, yPosition)
  yPosition += 20

  // Content
  doc.setFontSize(11)
  const contentLines = doc.splitTextToSize(blogPost.content, maxWidth)

  for (let i = 0; i < contentLines.length; i++) {
    if (yPosition > pageHeight - margin) {
      doc.addPage()
      yPosition = margin

      // Add watermark to new page
      if (watermark) {
        doc.setTextColor(200, 200, 200)
        doc.setFontSize(50)
        doc.text("DEMO", pageWidth / 2, pageHeight / 2, {
          align: "center",
          angle: 45,
        })
        doc.setTextColor(0, 0, 0)
      }
    }

    doc.text(contentLines[i], margin, yPosition)
    yPosition += 6
  }

  // Footer with website info
  doc.setFontSize(8)
  doc.setTextColor(128, 128, 128)
  doc.text("Generated from Personal Blog Site", margin, pageHeight - 10)

  return doc
}

export function downloadPDF(doc: any, filename: string) {
  doc.save(filename)
}

export function openPDFInNewTab(doc: any) {
  const pdfBlob = doc.output("blob")
  const url = URL.createObjectURL(pdfBlob)
  window.open(url, "_blank")
}
