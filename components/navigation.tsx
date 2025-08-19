"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "./theme-toggle"
import { LanguageSwitch } from "./language-switch"
import { useLanguage } from "@/contexts/language-context"
import { BookingModalV2 } from "./booking-modal-v2"

export function Navigation() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [activeSection, setActiveSection] = React.useState("home")
  const [showBookingModal, setShowBookingModal] = React.useState(false)
  const { t, language } = useLanguage()

  const navItems = [
    { href: "#home", label: t.nav.home },
    { href: "#services", label: t.nav.services },
    { href: "#about", label: t.nav.about },
    { href: "#process", label: t.nav.process },
    { href: "#testimonials", label: t.nav.testimonials },
    { href: "#contact", label: t.nav.contact },
  ]

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
      
      // Update active section based on scroll position
      const sections = ['home', 'services', 'about', 'process', 'testimonials', 'contact']
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.replace("#", "")
    const element = document.getElementById(targetId)
    
    if (element) {
      const offset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - offset
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
    }
    
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      {/* Desktop Navigation */}
      <nav
        className={cn(
          "fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden lg:block",
          "transition-all duration-300",
          isScrolled ? "top-4" : "top-6"
        )}
      >
        <div className="ios-blur rounded-2xl px-1 py-1 shadow-sm">
          <div className="flex items-center gap-0.5">
            {/* BPE Logo */}
            <Link
              href="#home"
              onClick={(e) => handleNavClick(e, "#home")}
              className="px-3 py-1.5 mr-2 text-xl font-bold gradient-text"
            >
              BPE
            </Link>
            <div className="w-px h-6 bg-border/50 mr-1" />
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-medium",
                  "transition-all duration-200",
                  "hover:bg-black/5 dark:hover:bg-white/5",
                  activeSection === item.href.slice(1) &&
                    "bg-black/10 dark:bg-white/10"
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="ml-2 pl-2 border-l border-border/50 flex items-center gap-1">
              {/* Booking Button */}
              <button
                onClick={() => setShowBookingModal(true)}
                className="px-3 py-1.5 rounded-xl bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-all flex items-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{language === 'de' ? 'Termin' : 'Book'}</span>
              </button>
              <LanguageSwitch />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Button */}
      <div className="fixed top-3 right-3 sm:top-4 sm:right-4 z-50 lg:hidden flex items-center gap-2">
        <LanguageSwitch className="ios-blur rounded-xl" />
        <ThemeToggle className="ios-blur rounded-xl" />
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2.5 sm:p-3 rounded-xl ios-blur shadow-sm transition-all hover:scale-105 active:scale-95"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden",
          "transition-all duration-300",
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Menu Panel */}
        <div
          className={cn(
            "absolute right-3 sm:right-4 top-16 sm:top-20 left-3 sm:left-4 max-w-sm ml-auto",
            "ios-blur rounded-xl sm:rounded-2xl p-2 shadow-lg",
            "transition-all duration-300",
            isMobileMenuOpen 
              ? "translate-y-0 opacity-100 scale-100" 
              : "-translate-y-4 opacity-0 scale-95"
          )}
        >
          <div className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={cn(
                  "block px-4 py-2.5 sm:py-3 rounded-xl text-sm font-medium",
                  "transition-all duration-200",
                  "hover:bg-black/5 dark:hover:bg-white/5",
                  activeSection === item.href.slice(1) &&
                    "bg-black/10 dark:bg-white/10"
                )}
              >
                {item.label}
              </Link>
            ))}
            {/* Mobile Booking Button */}
            <button
              onClick={() => {
                setShowBookingModal(true)
                setIsMobileMenuOpen(false)
              }}
              className="block w-full px-4 py-2.5 sm:py-3 rounded-xl bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-all text-center"
            >
              <span className="flex items-center justify-center gap-2">
                <Calendar className="w-4 h-4" />
                {language === 'de' ? 'Termin vereinbaren' : 'Book Appointment'}
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
    </>
  )
}