"use client"

import * as React from "react"
import { ArrowDown } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { IOSVideoBackground } from "./ios-video-background"
import { BookingModalV2 } from "./booking-modal-v2"

export function HeroSection() {
  const { t } = useLanguage()
  const [mounted, setMounted] = React.useState(false)
  const [showBookingModal, setShowBookingModal] = React.useState(false)
  
  React.useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Video Background */}
      <div className="absolute inset-0 -z-10">
        {/* Fallback gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900" />
        
        {/* Video element with iOS compatibility */}
        <IOSVideoBackground 
          src="/assets/video/videos/Business_Psychologie_Experten_compressed.mp4"
        />
        
        {/* Video Overlay for better text readability - softer overlay */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float-delayed" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-8 text-center">
        {/* Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight mb-4 sm:mb-6 animate-fade-up text-white drop-shadow-lg leading-tight">
          <span className="block">{t.hero.title1}</span>
          <span className="block mt-1 sm:mt-2 text-white/90">{t.hero.title2}</span>
        </h1>

        {/* Subheadline */}
        <div className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8 sm:mb-12 animate-fade-up animation-delay-100 drop-shadow space-y-1 px-4 sm:px-0">
          <p className="leading-relaxed">{t.hero.subtitle1}</p>
          <p className="leading-relaxed">{t.hero.subtitle2}</p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center animate-fade-up animation-delay-200 px-4 sm:px-0">
          <button
            onClick={() => setShowBookingModal(true)}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-white text-black font-medium transition-all hover:bg-white/90 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] active:scale-[0.98] min-w-[200px] shadow-lg group relative overflow-hidden text-sm sm:text-base"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <span className="relative">{t.hero.cta1}</span>
          </button>
          <button
            onClick={() => {
              const element = document.getElementById("services")
              if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "start" })
              }
            }}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl backdrop-blur-md bg-white/10 text-white border border-white/20 font-medium transition-all hover:bg-white/20 hover:border-white/40 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] active:scale-[0.98] min-w-[200px] group relative overflow-hidden text-sm sm:text-base"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <span className="relative">{t.hero.cta2}</span>
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      {mounted && (
        <div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 cursor-pointer animate-bounce"
          onClick={() => {
            const element = document.getElementById("services")
            if (element) {
              element.scrollIntoView({ behavior: "smooth", block: "start" })
            }
          }}
        >
          <div className="p-2.5 rounded-full backdrop-blur-md bg-white/10 border border-white/20">
            <ArrowDown className="w-4 h-4 text-white" />
          </div>
        </div>
      )}
      
      {/* Booking Modal */}
      <BookingModalV2 
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
      />
    </section>
  )
}