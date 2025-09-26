import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { CheckCircle } from "lucide-react"

interface AboutData {
  name: string
  education: string
  bio: string
  image: string
  achievements: string[]
  skills: string[]
}

interface AboutSectionProps {
  data: AboutData
}

export function AboutSection({ data }: AboutSectionProps) {
  return (
    <section id="about" className="py-24 bg-muted/30">
      <div className="container-width section-padding">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="relative w-full max-w-md mx-auto">
              <div className="aspect-[4/5] relative rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
                <Image
                  src={data.image || "/placeholder.svg"}
                  alt={data.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Decorative elements */}
              <div className="absolute -z-10 top-8 left-8 w-full h-full border-2 border-primary/20 rounded-2xl" />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold">About Me</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">{data.bio}</p>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Education</h3>
                <p className="text-muted-foreground">{data.education}</p>
              </div>
            </div>

            {/* Achievements */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Key Achievements</h3>
              <div className="space-y-3">
                {data.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Technical Skills</h3>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
