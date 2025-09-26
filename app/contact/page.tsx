import type { Metadata } from "next"
import { ContactSection } from "@/components/sections/contact-section"
import { MetaTags } from "@/components/seo/meta-tags"
import { Breadcrumb } from "@/components/seo/breadcrumb"

export const metadata: Metadata = {
  title: "Contact Me - Personal Blog",
  description: "Get in touch with me for collaborations, projects, or just to say hello. I'd love to hear from you!",
  openGraph: {
    title: "Contact Me - Personal Blog",
    description: "Get in touch with me for collaborations, projects, or just to say hello. I'd love to hear from you!",
    type: "website",
  },
}

export default function ContactPage() {
  const contactData = {
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "San Francisco, CA, USA",
    social: {
      github: "https://github.com/johndoe",
      linkedin: "https://linkedin.com/in/johndoe",
      twitter: "https://twitter.com/johndoe",
    },
  }

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Contact", href: "/contact" },
  ]

  return (
    <>
      <MetaTags
        title="Contact Me - Personal Blog"
        description="Get in touch with me for collaborations, projects, or just to say hello. I'd love to hear from you!"
        canonical="/contact"
      />

      <main className="min-h-screen">
        <div className="container-width section-padding py-8">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        <ContactSection data={contactData} />

        {/* Additional Contact Information */}
        <section className="py-24 bg-muted/30">
          <div className="container-width section-padding">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h2 className="text-3xl sm:text-4xl font-bold">Let's Build Something Amazing Together</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Whether you have a project in mind, need technical consultation, or just want to connect with a fellow
                developer, I'm always excited to meet new people and explore new opportunities.
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-2xl">💼</span>
                  </div>
                  <h3 className="text-xl font-semibold">Project Collaboration</h3>
                  <p className="text-muted-foreground">
                    Looking for a developer to bring your ideas to life? Let's discuss your project requirements.
                  </p>
                </div>

                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-2xl">🎓</span>
                  </div>
                  <h3 className="text-xl font-semibold">Mentorship</h3>
                  <p className="text-muted-foreground">
                    New to development? I offer mentorship and guidance to help you grow your skills.
                  </p>
                </div>

                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-2xl">🎤</span>
                  </div>
                  <h3 className="text-xl font-semibold">Speaking</h3>
                  <p className="text-muted-foreground">
                    Interested in having me speak at your event or podcast? I'd love to share my experience.
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
