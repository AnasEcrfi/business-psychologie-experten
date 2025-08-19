"use client"

import * as React from "react"
import { CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/language-context"

export function ChallengesSection() {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = React.useState(false)
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

  return (
    <section ref={sectionRef} id="challenges" className="py-24 lg:py-32 relative section-fade-edge">
      {/* Modern gradient mesh */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/80 via-white to-gray-100/50 dark:from-zinc-900/80 dark:via-zinc-900/50 dark:to-zinc-800/30" />
        <div className="absolute inset-0 backdrop-blur-3xl" />
      </div>
      <div className="relative container mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-12 px-4 sm:px-0">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-3 sm:mb-4 leading-tight">
              {t.challenges.title}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              {t.challenges.subtitle}
            </p>
          </div>

          {/* Challenges Grid */}
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12 px-4 sm:px-0">
            {t.challenges.items.map((item, index) => (
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
                <div className="glass-card rounded-xl sm:rounded-2xl p-4 sm:p-6 flex items-start gap-3 sm:gap-4">
                  <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center px-4 sm:px-0">
            <p className="text-base sm:text-lg font-medium mb-4 sm:mb-6">
              {t.challenges.cta}
            </p>
            <button className="w-full sm:w-auto px-6 sm:px-8 py-3 rounded-xl font-medium bg-primary text-primary-foreground hover:opacity-90 transition-all">
              {t.challenges.button}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}