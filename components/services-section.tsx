"use client"

import * as React from "react"
import {
  Brain,
  Users,
  TrendingUp,
  Lightbulb,
  Target,
  Shield,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/language-context"
import { IOSVideoBackground } from "./ios-video-background"
import { BookingModalV2 } from "./booking-modal-v2"

export function ServicesSection() {
  const { t } = useLanguage()
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null)
  const sectionRef = React.useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = React.useState(false)
  const [showBookingModal, setShowBookingModal] = React.useState(false)

  const services = [
    {
      icon: Brain,
      title: t.services.items.executive.title,
      description: t.services.items.executive.description,
      features: t.services.items.executive.features,
    },
    {
      icon: Users,
      title: t.services.items.team.title,
      description: t.services.items.team.description,
      features: t.services.items.team.features,
    },
    {
      icon: TrendingUp,
      title: t.services.items.strategic.title,
      description: t.services.items.strategic.description,
      features: t.services.items.strategic.features,
    },
    {
      icon: Lightbulb,
      title: t.services.items.innovation.title,
      description: t.services.items.innovation.description,
      features: t.services.items.innovation.features,
    },
    {
      icon: Target,
      title: t.services.items.performance.title,
      description: t.services.items.performance.description,
      features: t.services.items.performance.features,
    },
    {
      icon: Shield,
      title: t.services.items.crisis.title,
      description: t.services.items.crisis.description,
      features: t.services.items.crisis.features,
    },
  ]

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="services" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Blurred Video Background */}
      <div className="absolute inset-0">
        <IOSVideoBackground 
          src="/assets/video/videos/Business_Psychologie_Experten_compressed.mp4"
          blurred={true}
        />
        
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-white/70 dark:bg-zinc-900/75" />
        
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-white/40 dark:from-zinc-900/40 dark:via-transparent dark:to-zinc-900/40" />
      </div>
      <div className="relative container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 px-4 sm:px-0">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-3 sm:mb-4">
            {t.services.title}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            {t.services.subtitle}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={cn(
                "group relative",
                isVisible && "animate-fade-up"
              )}
              style={{
                animationDelay: isVisible ? `${index * 50}ms` : "0ms",
                animationFillMode: "both",
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Card */}
              <div className="relative h-full p-5 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl glass-card transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:-translate-y-2 group cursor-pointer">
                {/* Icon */}
                <div className="mb-4">
                  <div className="inline-flex p-2.5 rounded-xl bg-gray-100 dark:bg-zinc-800/50 transition-all duration-500 group-hover:scale-110 group-hover:bg-gray-200 dark:group-hover:bg-zinc-700/50">
                    <service.icon className="w-6 h-6 transition-transform duration-500 group-hover:rotate-12" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm mb-4">
                  {service.description}
                </p>

                {/* Features - Show on hover */}
                <div
                  className={cn(
                    "space-y-1.5 overflow-hidden transition-all duration-300",
                    hoveredIndex === index ? "max-h-32 opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  {service.features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <div className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA Section */}
        <div className="mt-16 sm:mt-20 text-center">
          <div className="glass-card rounded-2xl p-8 sm:p-12 max-w-3xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-semibold mb-3">
              {t.services.cta.title}
            </h3>
            <p className="text-base sm:text-lg text-muted-foreground mb-6">
              {t.services.cta.subtitle}
            </p>
            <button
              onClick={() => setShowBookingModal(true)}
              className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl group relative overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <span className="relative flex items-center gap-2">
                <span className="hidden sm:inline">{t.services.cta.button}</span>
                <span className="sm:hidden">{t.services.cta.buttonMobile}</span>
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Booking Modal */}
      <BookingModalV2 
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
      />
    </section>
  )
}