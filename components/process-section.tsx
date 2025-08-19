"use client"

import * as React from "react"
import { Search, Lightbulb, Rocket, Trophy } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/language-context"
import { IOSVideoBackground } from "./ios-video-background"

export function ProcessSection() {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = React.useState(false)
  const sectionRef = React.useRef<HTMLElement>(null)

  const steps = [
    {
      icon: Search,
      title: t.process.steps.analysis.title,
      description: t.process.steps.analysis.description,
    },
    {
      icon: Lightbulb,
      title: t.process.steps.strategy.title,
      description: t.process.steps.strategy.description,
    },
    {
      icon: Rocket,
      title: t.process.steps.implementation.title,
      description: t.process.steps.implementation.description,
    },
    {
      icon: Trophy,
      title: t.process.steps.success.title,
      description: t.process.steps.success.description,
    },
  ]

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
    <section ref={sectionRef} id="process" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Blurred Video Background */}
      <div className="absolute inset-0">
        <IOSVideoBackground 
          src="/assets/video/videos/Business_Psychologie_Experten_compressed.mp4"
          blurred={true}
        />
        
        {/* Lighter overlay for better video visibility */}
        <div className="absolute inset-0 bg-white/60 dark:bg-zinc-900/70" />
        
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/30 dark:from-zinc-900/30 dark:via-transparent dark:to-zinc-900/30" />
      </div>
      <div className="relative container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 px-4 sm:px-0">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-3 sm:mb-4">
            {t.process.title}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            {t.process.subtitle}
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {steps.map((step, index) => (
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
              {/* Connection Line (Desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-full h-0.5 bg-border" />
              )}
              
              {/* Step Card */}
              <div className="relative glass-card rounded-xl sm:rounded-2xl p-5 sm:p-6 text-center">
                {/* Icon */}
                <div className="inline-flex p-3 rounded-xl bg-gray-100 dark:bg-zinc-800/50 mb-4">
                  <step.icon className="w-6 h-6" />
                </div>
                
                {/* Step Number */}
                <div className="text-sm text-muted-foreground mb-2">
                  {t.process.step} {index + 1}
                </div>
                
                {/* Title */}
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                
                {/* Description */}
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}