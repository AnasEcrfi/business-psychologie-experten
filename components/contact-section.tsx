"use client"

import * as React from "react"
import { Mail, Phone, MapPin, Send, CheckCircle, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/language-context"
import { addContactSubmission } from "@/lib/store-with-notifications"
import { BookingModalV2 } from "./booking-modal-v2"

export function ContactSection() {
  const { t, language } = useLanguage()
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)
  const [showBookingModal, setShowBookingModal] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Save to store
      await addContactSubmission({
        name: formData.name,
        email: formData.email,
        message: formData.message
      })
      
      setIsSuccess(true)
      setFormData({ name: "", email: "", message: "" })
      
      // Reset success state after 3 seconds
      setTimeout(() => {
        setIsSuccess(false)
      }, 3000)
    } catch {
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <section id="contact" className="py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 px-4 sm:px-0">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-3 sm:mb-4">
            {t.contact.title}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            {t.contact.subtitle}
          </p>
        </div>

        {/* Booking CTA Card */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="glass-card rounded-2xl p-8 sm:p-10 text-center">
            <div className="inline-flex p-4 rounded-2xl bg-gray-100 dark:bg-zinc-800/50 mb-4">
              <Calendar className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-semibold mb-3">
              {language === 'de' ? 'Kostenloses Beratungsgespräch' : 'Free Consultation'}
            </h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              {language === 'de' 
                ? 'Buchen Sie direkt online einen Termin für Ihr unverbindliches Erstgespräch'
                : 'Book your free initial consultation directly online'}
            </p>
            <button
              onClick={() => setShowBookingModal(true)}
              className="px-8 py-3 rounded-xl bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl group relative overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 dark:via-black/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <span className="relative flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                {language === 'de' ? 'Termin vereinbaren' : 'Book Appointment'}
              </span>
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">{t.contact.heading}</h3>
              <p className="text-muted-foreground">
                {t.contact.description}
              </p>
            </div>

            {/* Contact Items */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="p-2.5 rounded-xl bg-gray-100 dark:bg-zinc-800/50">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">{t.contact.info.email}</div>
                  <a href={`mailto:${t.contact.info.emailValue}`} className="hover:underline">
                    {t.contact.info.emailValue}
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="p-2.5 rounded-xl bg-gray-100 dark:bg-zinc-800/50">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">{t.contact.info.phone}</div>
                  <a href={`tel:${t.contact.info.phoneValue.replace(/\s/g, '')}`} className="hover:underline">
                    {t.contact.info.phoneValue}
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="p-2.5 rounded-xl bg-gray-100 dark:bg-zinc-800/50">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">{t.contact.info.location}</div>
                  <div>{t.contact.info.locationValue}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                {t.contact.form.name}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-gray-50 dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-gray-900/20 dark:focus:ring-white/20 transition-colors text-sm sm:text-base"
                placeholder={t.contact.form.placeholder.name}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                {t.contact.form.email}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-gray-50 dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-gray-900/20 dark:focus:ring-white/20 transition-colors text-sm sm:text-base"
                placeholder={t.contact.form.placeholder.email}
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                {t.contact.form.message}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-gray-50 dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800 resize-none focus:outline-none focus:ring-2 focus:ring-gray-900/20 dark:focus:ring-white/20 transition-colors text-sm sm:text-base"
                placeholder={t.contact.form.placeholder.message}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || isSuccess}
              className={cn(
                "w-full px-6 py-3.5 rounded-xl font-medium",
                "bg-primary text-primary-foreground",
                "transition-all duration-300 hover:opacity-90 active:scale-[0.98]",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "flex items-center justify-center gap-2",
                "relative overflow-hidden"
              )}
            >
              <div className={cn(
                "flex items-center gap-2 transition-all duration-300",
                isSuccess && "opacity-0 scale-90"
              )}>
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>{t.contact.form.submitting}</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>{t.contact.form.submit}</span>
                  </>
                )}
              </div>
              
              {/* Success State */}
              <div className={cn(
                "absolute inset-0 flex items-center justify-center gap-2",
                "transition-all duration-300 text-green-600 dark:text-green-400",
                isSuccess ? "opacity-100 scale-100" : "opacity-0 scale-110"
              )}>
                <CheckCircle className="w-5 h-5 animate-[checkmark_0.3s_ease-out]" />
                <span className="font-medium">{t.contact.form.success}</span>
              </div>
            </button>
          </form>
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