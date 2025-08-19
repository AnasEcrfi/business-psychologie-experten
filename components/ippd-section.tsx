"use client"

import * as React from "react"
import { Brain, Sparkles, Layers, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/language-context"
import { BookingModalV2 } from "./booking-modal-v2"

export function IppdSection() {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = React.useState(false)
  const [showBookingModal, setShowBookingModal] = React.useState(false)
  const sectionRef = React.useRef<HTMLElement>(null)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const phases = [
    { icon: Brain, color: "text-purple-600 dark:text-purple-400" },
    { icon: Sparkles, color: "text-blue-600 dark:text-blue-400" },
    { icon: Layers, color: "text-green-600 dark:text-green-400" },
  ]

  return (
    <section ref={sectionRef} id="ippd" className="py-24 lg:py-32 relative overflow-hidden bg-gray-50/50 dark:bg-zinc-900/30">
      {/* Noise texture overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-white/80 dark:from-zinc-900/80 dark:via-transparent dark:to-zinc-900/80" />
        <svg className="absolute inset-0 w-full h-full opacity-5">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>
      <div className="relative container mx-auto px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-zinc-800/50 mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">{t.ippd.badge}</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-4">
              {t.ippd.title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.ippd.subtitle}
            </p>
          </div>

          {/* Method Overview */}
          <div className="glass-card rounded-2xl p-8 lg:p-12 mb-12">
            <p className="text-lg leading-relaxed mb-8">
              {t.ippd.description}
            </p>

            {/* Phases */}
            <div className="grid md:grid-cols-3 gap-6">
              {t.ippd.phases.map((phase, index) => {
                const Icon = phases[index].icon
                return (
                  <div
                    key={index}
                    className={cn(
                      "relative",
                      isVisible && "animate-fade-up"
                    )}
                    style={{
                      animationDelay: `${index * 150}ms`,
                      animationFillMode: "both",
                    }}
                  >
                    <div className="text-center">
                      {/* Icon */}
                      <div className={cn("inline-flex p-4 rounded-2xl bg-gray-100 dark:bg-zinc-800/50 mb-4", phases[index].color)}>
                        <Icon className="w-8 h-8" />
                      </div>
                      
                      {/* Phase Name */}
                      <h3 className="text-xl font-semibold mb-2">{phase.name}</h3>
                      
                      {/* Description */}
                      <p className="text-sm text-muted-foreground">
                        {phase.description}
                      </p>
                    </div>

                    {/* Arrow */}
                    {index < phases.length - 1 && (
                      <ArrowRight className="hidden md:block absolute top-16 -right-3 w-6 h-6 text-muted-foreground" />
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Benefits of IPPD */}
          <div className="grid md:grid-cols-2 gap-6">
            {t.ippd.benefits.map((benefit, index) => (
              <div
                key={index}
                className={cn(
                  "relative",
                  isVisible && "animate-fade-up"
                )}
                style={{
                  animationDelay: `${(index + 3) * 100}ms`,
                  animationFillMode: "both",
                }}
              >
                <div className="glass-card rounded-2xl p-6">
                  <h4 className="font-semibold mb-2">{benefit.title}</h4>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-br from-gray-100/60 to-gray-50/60 dark:from-zinc-800/60 dark:to-zinc-900/60 rounded-2xl p-8 sm:p-12 backdrop-blur-sm">
              <h3 className="text-2xl sm:text-3xl font-semibold mb-3">
                {t.ippd.ctaSection.title}
              </h3>
              <p className="text-base sm:text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                {t.ippd.ctaSection.subtitle}
              </p>
              <button
                onClick={() => setShowBookingModal(true)}
                className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl group relative overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 dark:via-black/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <span className="relative flex items-center gap-2">
                  <span className="hidden sm:inline">{t.ippd.ctaSection.button}</span>
                  <span className="sm:hidden">{t.ippd.ctaSection.buttonMobile}</span>
                  <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
            </div>
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