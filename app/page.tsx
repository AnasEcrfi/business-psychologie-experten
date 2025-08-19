import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { ChallengesSection } from "@/components/challenges-section"
import { ServicesSection } from "@/components/services-section"
import { IppdSection } from "@/components/ippd-section"
import { AboutSection } from "@/components/about-section"
import { ProcessSection } from "@/components/process-section"
import { BenefitsSection } from "@/components/benefits-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { StickyCTA } from "@/components/sticky-cta"

export default function Home() {
  return (
    <main id="main" className="min-h-screen">
      <Navigation />
      <HeroSection />
      <ChallengesSection />
      <ServicesSection />
      <IppdSection />
      <AboutSection />
      <ProcessSection />
      <BenefitsSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
      <StickyCTA />
    </main>
  )
}