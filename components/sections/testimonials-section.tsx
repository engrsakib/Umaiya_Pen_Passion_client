import { Card, CardContent } from "@/components/ui/card"
import { Quote, Star } from "lucide-react"

interface Testimonial {
  quote: string
  author: string
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[]
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  return (
    <section className="py-24">
      <div className="container-width section-padding">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">What People Say</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Feedback from colleagues, clients, and fellow developers I've worked with
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <div className="relative">
                    <Quote className="h-8 w-8 text-primary/20 absolute -top-2 -left-2" />
                    <blockquote className="text-muted-foreground leading-relaxed pl-6">
                      "{testimonial.quote}"
                    </blockquote>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <cite className="font-medium text-foreground not-italic">{testimonial.author}</cite>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <div className="max-w-2xl mx-auto space-y-4">
            <h3 className="text-2xl font-semibold">Ready to work together?</h3>
            <p className="text-muted-foreground">I'm always interested in new opportunities and collaborations</p>
          </div>
        </div>
      </div>
    </section>
  )
}
