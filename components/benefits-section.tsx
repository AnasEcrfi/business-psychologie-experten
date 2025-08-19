"use client"

import * as React from "react"
import { TrendingUp, Users, Shield, Target, Zap, Award } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/language-context"
import { BookingModalV2 } from "./booking-modal-v2"

export function BenefitsSection() {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = React.useState(false)
  const [scrollY, setScrollY] = React.useState(0)
  const [showBookingModal, setShowBookingModal] = React.useState(false)
  const sectionRef = React.useRef<HTMLElement>(null)

  const icons = [TrendingUp, Users, Shield, Target, Zap, Award]

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
    
    // Parallax scroll effect
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <section ref={sectionRef} id="benefits" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Modern radial gradient with parallax */}
      <div className="absolute inset-0">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-gradient-radial from-gray-100/40 via-transparent to-transparent dark:from-zinc-800/20"
          style={{ transform: `translate(-50%, calc(-50% + ${scrollY * 0.1}px))` }}
        />
      </div>
      <div className="relative container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-4">
            {t.benefits.title}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t.benefits.subtitle}
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {t.benefits.items.map((benefit, index) => {
            const Icon = icons[index % icons.length]
            return (
              <div
                key={index}
                className={cn(
                  "relative",
                  isVisible && "animate-fade-up"
                )}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: "both",
                }}
              >
                <div className="h-full glass-card rounded-2xl p-6 lg:p-8 hover:scale-105 transition-transform duration-300">
                  {/* Icon */}
                  <div className="inline-flex p-3 rounded-xl bg-gray-100 dark:bg-zinc-800/50 mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                  
                  {/* Description */}
                  <p className="text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {t.benefits.stats.map((stat, index) => (
            <div
              key={index}
              className={cn(
                "text-center",
                isVisible && "animate-fade-up"
              )}
              style={{
                animationDelay: `${(index + 6) * 100}ms`,
                animationFillMode: "both",
              }}
            >
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="relative overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-900 p-8 sm:p-12 border border-gray-200 dark:border-zinc-800">
            <h3 className="text-2xl sm:text-3xl font-semibold mb-3">
              {t.benefits.cta.title}
            </h3>
            <p className="text-base sm:text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              {t.benefits.cta.subtitle}
            </p>
            <button
              onClick={() => setShowBookingModal(true)}
              className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl group relative overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <span className="relative flex items-center gap-2">
                <span className="hidden sm:inline">{t.benefits.cta.button}</span>
                <span className="sm:hidden">{t.benefits.cta.buttonMobile}</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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