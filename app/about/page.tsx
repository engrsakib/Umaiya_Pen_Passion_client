import type { Metadata } from "next"
import { AboutSection } from "@/components/sections/about-section"
import { MetaTags } from "@/components/seo/meta-tags"
import { Breadcrumb } from "@/components/seo/breadcrumb"

export const metadata: Metadata = {
  title: "About Me - Personal Blog",
  description: "Learn more about my background, experience, and technical skills as a developer and content creator.",
  openGraph: {
    title: "About Me - Personal Blog",
    description: "Learn more about my background, experience, and technical skills as a developer and content creator.",
    type: "website",
  },
}

export default function AboutPage() {
  const aboutData = {
    name: "John Doe",
    education: "Bachelor's in Computer Science, University of Technology",
    bio: "I'm a passionate full-stack developer with over 5 years of experience building modern web applications. I love creating efficient, scalable solutions and sharing knowledge through writing and teaching. When I'm not coding, you'll find me exploring new technologies, contributing to open source projects, or mentoring aspiring developers.",
    image: "/professional-developer-portrait.png",
    achievements: [
      "Built and deployed 50+ production applications",
      "Contributed to 20+ open source projects",
      "Mentored 100+ junior developers",
      "Speaker at 15+ tech conferences",
      "Published 200+ technical articles",
      "Led development teams of 5-10 engineers",
    ],
    skills: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "Python",
      "PostgreSQL",
      "MongoDB",
      "AWS",
      "Docker",
      "Kubernetes",
      "GraphQL",
      "REST APIs",
      "Git",
      "CI/CD",
      "Agile",
      "TDD",
      "System Design",
    ],
  }

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
  ]

  return (
    <>
      <MetaTags
        title="About Me - Personal Blog"
        description="Learn more about my background, experience, and technical skills as a developer and content creator."
        canonical="/about"
      />

      <main className="min-h-screen">
        <div className="container-width section-padding py-8">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        <AboutSection data={aboutData} />

        {/* Additional About Content */}
        <section className="py-24">
          <div className="container-width section-padding">
            <div className="max-w-4xl mx-auto space-y-12">
              <div className="text-center">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">My Journey</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  From curious beginner to experienced developer, here's how my passion for technology evolved.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold">Early Days</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    My journey into programming started during college when I built my first website. The thrill of
                    seeing code come to life in the browser sparked a passion that continues to drive me today.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    I spent countless hours learning HTML, CSS, and JavaScript, building small projects and gradually
                    working my way up to more complex applications.
                  </p>
                </div>

                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold">Professional Growth</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    After graduation, I joined a startup where I wore many hats - from frontend development to backend
                    architecture, DevOps, and team leadership.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    This experience taught me the importance of clean code, scalable architecture, and effective
                    communication in building successful products.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
