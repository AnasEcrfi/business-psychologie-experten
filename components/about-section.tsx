"use client"

import * as React from "react"
import { Award, Users, Target, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/language-context"

export function AboutSection() {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = React.useState(false)
  const [counters, setCounters] = React.useState<number[]>([0, 0, 0, 0])
  const sectionRef = React.useRef<HTMLElement>(null)

  const stats = [
    { value: "500", suffix: "+", label: t.about.stats.projects, icon: Target },
    { value: "98", suffix: "%", label: t.about.stats.satisfaction, icon: Award },
    { value: "15", suffix: "+", label: t.about.stats.experience, icon: Zap },
    { value: "50", suffix: "+", label: t.about.stats.experts, icon: Users },
  ]

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Start counter animation
          const targets = [500, 98, 15, 50]
          targets.forEach((target, index) => {
            let current = 0
            const increment = target / 50
            const timer = setInterval(() => {
              current += increment
              if (current >= target) {
                current = target
                clearInterval(timer)
              }
              setCounters(prev => {
                const newCounters = [...prev]
                newCounters[index] = Math.floor(current)
                return newCounters
              })
            }, 30)
          })
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
    <section ref={sectionRef} id="about" className="py-24 lg:py-32 relative overflow-hidden bg-gradient-to-b from-white via-gray-50/30 to-white dark:from-zinc-900 dark:via-zinc-900/70 dark:to-zinc-900">
      {/* Modern glass overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 backdrop-blur-[100px]" />
      </div>
      <div className="relative container mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className={cn(
            "space-y-6",
            isVisible && "animate-fade-up"
          )}>
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-4">
                {t.about.title}
              </h2>
              <p className="text-lg text-muted-foreground mb-4">
                {t.about.description1}
              </p>
              <p className="text-lg text-muted-foreground">
                {t.about.description2}
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-3">
              {t.about.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateX(0)" : "translateX(-20px)",
                    transition: `all 0.5s ease ${index * 0.1 + 0.3}s`,
                  }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-foreground" />
                  <span className="text-base">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 lg:gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={cn(
                  "relative group",
                  isVisible && "animate-scale"
                )}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: "both",
                }}
              >
                {/* Card */}
                <div className="relative h-full p-6 lg:p-8 rounded-2xl glass-card text-center transition-transform duration-300 hover:scale-105">
                  {/* Icon */}
                  <div className="inline-flex p-2.5 rounded-xl bg-gray-100 dark:bg-zinc-800/50 mb-3">
                    <stat.icon className="w-5 h-5" />
                  </div>
                  
                  {/* Value */}
                  <div className="text-2xl md:text-3xl font-semibold mb-1 tabular-nums">
                    {counters[index]}{stat.suffix}
                  </div>
                  
                  {/* Label */}
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}