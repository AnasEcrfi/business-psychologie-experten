"use client"

import * as React from "react"
import { Calendar } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/language-context"
import { BookingModalV2 } from "./booking-modal-v2"
import { ModalPortal } from "./modal-portal"

export function StickyCTA() {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = React.useState(false)
  const [showBookingModal, setShowBookingModal] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 30% of the page
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      setIsVisible(scrollPercentage > 30 && scrollPercentage < 85)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleBookingClick = () => {
    setShowBookingModal(true)
  }

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-50 transition-all duration-700 ease-out",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"
      )}
    >
      <button
        onClick={handleBookingClick}
        className="group flex items-center gap-2.5 px-5 py-3 rounded-full bg-gray-900/90 dark:bg-gray-100/90 backdrop-blur-md text-white dark:text-gray-900 shadow-lg hover:shadow-xl hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 hover:scale-[1.05] active:scale-[0.98]"
        aria-label="Kontakt aufnehmen"
      >
        <Calendar className="w-4 h-4" />
        <span className="hidden sm:inline-block text-sm font-medium">
          {t.stickyCta.desktop}
        </span>
        <span className="sm:hidden text-sm font-medium">
          {t.stickyCta.mobile}
        </span>
      </button>
      
      {/* Booking Modal */}
      <ModalPortal>
        <BookingModalV2 
          isOpen={showBookingModal}
          onClose={() => setShowBookingModal(false)}
        />
      </ModalPortal>
    </div>
  )
}