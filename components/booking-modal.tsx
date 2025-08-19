"use client"

import * as React from "react"
import { 
  X, 
  Calendar, 
  Clock,
  ChevronLeft,
  ChevronRight,
  User,
  Mail,
  Phone,
  MessageSquare,
  CheckCircle
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/language-context"
import { getTimeSlots, addBooking, TimeSlot } from "@/lib/store"

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
}

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const { t } = useLanguage()
  const [step, setStep] = React.useState<'date' | 'time' | 'details' | 'success'>('date')
  const [currentMonth, setCurrentMonth] = React.useState(new Date())
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = React.useState<string | null>(null)
  const [availableSlots, setAvailableSlots] = React.useState<TimeSlot[]>([])
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    if (isOpen) {
      // Reset state when modal opens
      setStep('date')
      setSelectedDate(null)
      setSelectedTime(null)
      setFormData({ name: '', email: '', phone: '', message: '' })
    }
  }, [isOpen])

  React.useEffect(() => {
    if (selectedDate) {
      // Load available time slots for selected date
      const dateStr = selectedDate.toISOString().split('T')[0]
      const startDate = new Date(dateStr)
      const endDate = new Date(dateStr)
      endDate.setDate(endDate.getDate() + 1)
      
      const slots = getTimeSlots(startDate, endDate)
      const availableOnly = slots.filter(slot => slot.available)
      setAvailableSlots(availableOnly)
    }
  }, [selectedDate])

  if (!isOpen) return null

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    setStep('time')
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
    setStep('details')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedDate || !selectedTime) return

    setLoading(true)
    
    try {
      // Add booking
      const dateStr = selectedDate.toISOString().split('T')[0]
      await addBooking({
        date: dateStr,
        time: selectedTime,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message
      })
      
      setStep('success')
    } catch (error) {
      console.error('Booking failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const getDaysInMonth = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()
    
    const days: (Date | null)[] = []
    
    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    
    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }
    
    return days
  }

  const weekDays = t.language === 'de' 
    ? ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa']
    : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    
  const monthNames = t.language === 'de'
    ? ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 
       'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember']
    : ['January', 'February', 'March', 'April', 'May', 'June',
       'July', 'August', 'September', 'October', 'November', 'December']

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-zinc-800 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">
              {t.language === 'de' ? 'Termin buchen' : 'Book Appointment'}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {t.language === 'de' 
                ? 'Kostenloses Beratungsgespräch' 
                : 'Free Consultation'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          {/* Progress Indicator */}
          {step !== 'success' && (
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                  step === 'date' 
                    ? "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900"
                    : "bg-gray-100 dark:bg-zinc-800"
                )}>
                  <Calendar className="w-5 h-5" />
                </div>
                <div className="w-12 h-0.5 bg-gray-200 dark:bg-zinc-800" />
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                  step === 'time'
                    ? "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900"
                    : step === 'details' || step === 'success'
                    ? "bg-gray-100 dark:bg-zinc-800"
                    : "bg-gray-100 dark:bg-zinc-800 opacity-50"
                )}>
                  <Clock className="w-5 h-5" />
                </div>
                <div className="w-12 h-0.5 bg-gray-200 dark:bg-zinc-800" />
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                  step === 'details'
                    ? "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900"
                    : step === 'success'
                    ? "bg-gray-100 dark:bg-zinc-800"
                    : "bg-gray-100 dark:bg-zinc-800 opacity-50"
                )}>
                  <User className="w-5 h-5" />
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Date Selection */}
          {step === 'date' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">
                  {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2 mb-2">
                {weekDays.map(day => (
                  <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-2">
                {getDaysInMonth().map((date, index) => {
                  if (!date) {
                    return <div key={index} />
                  }
                  
                  const isToday = new Date().toDateString() === date.toDateString()
                  const isPast = date < new Date(new Date().setHours(0, 0, 0, 0))
                  const isWeekend = date.getDay() === 0 || date.getDay() === 6
                  
                  return (
                    <button
                      key={index}
                      onClick={() => handleDateSelect(date)}
                      disabled={isPast || isWeekend}
                      className={cn(
                        "p-3 rounded-xl transition-all hover:scale-105",
                        isToday && "bg-gray-100 dark:bg-zinc-800",
                        !isToday && !isPast && !isWeekend && "hover:bg-gray-50 dark:hover:bg-zinc-800/50",
                        (isPast || isWeekend) && "opacity-30 cursor-not-allowed"
                      )}
                    >
                      <div className="text-sm font-medium">{date.getDate()}</div>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Step 2: Time Selection */}
          {step === 'time' && selectedDate && (
            <div>
              <button
                onClick={() => setStep('date')}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
              >
                <ChevronLeft className="w-4 h-4" />
                {t.language === 'de' ? 'Zurück' : 'Back'}
              </button>
              
              <h3 className="text-lg font-semibold mb-2">
                {selectedDate.toLocaleDateString(t.language === 'de' ? 'de-DE' : 'en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric'
                })}
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                {t.language === 'de' ? 'Wählen Sie eine Uhrzeit' : 'Select a time'}
              </p>

              {availableSlots.length > 0 ? (
                <div className="grid grid-cols-3 gap-3">
                  {availableSlots.map(slot => (
                    <button
                      key={slot.id}
                      onClick={() => handleTimeSelect(slot.time)}
                      className="p-3 rounded-xl bg-gray-100 dark:bg-zinc-800 hover:bg-gray-900 hover:text-white dark:hover:bg-gray-100 dark:hover:text-gray-900 transition-all"
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  {t.language === 'de' 
                    ? 'Keine verfügbaren Termine an diesem Tag' 
                    : 'No available slots on this day'}
                </div>
              )}
            </div>
          )}

          {/* Step 3: Contact Details */}
          {step === 'details' && (
            <div>
              <button
                onClick={() => setStep('time')}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
              >
                <ChevronLeft className="w-4 h-4" />
                {t.language === 'de' ? 'Zurück' : 'Back'}
              </button>
              
              <h3 className="text-lg font-semibold mb-2">
                {t.language === 'de' ? 'Ihre Kontaktdaten' : 'Your Contact Details'}
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                {selectedDate?.toLocaleDateString(t.language === 'de' ? 'de-DE' : 'en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric'
                })} - {selectedTime}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t.language === 'de' ? 'Name' : 'Name'} *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-100 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-zinc-600"
                      placeholder={t.language === 'de' ? 'Ihr Name' : 'Your name'}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t.language === 'de' ? 'E-Mail' : 'Email'} *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-100 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-zinc-600"
                      placeholder={t.language === 'de' ? 'ihre.email@beispiel.de' : 'your.email@example.com'}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t.language === 'de' ? 'Telefon' : 'Phone'}
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-100 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-zinc-600"
                      placeholder={t.language === 'de' ? '+49 123 456789' : '+1 234 567890'}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t.language === 'de' ? 'Nachricht' : 'Message'}
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-100 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-zinc-600"
                      rows={4}
                      placeholder={t.language === 'de' 
                        ? 'Gibt es etwas, das Sie uns mitteilen möchten?' 
                        : 'Is there anything you would like us to know?'}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-all disabled:opacity-50"
                >
                  {loading 
                    ? (t.language === 'de' ? 'Wird gebucht...' : 'Booking...')
                    : (t.language === 'de' ? 'Termin buchen' : 'Book Appointment')}
                </button>
              </form>
            </div>
          )}

          {/* Success Message */}
          {step === 'success' && (
            <div className="text-center py-12">
              <div className="inline-flex p-4 rounded-full bg-green-100 dark:bg-green-900/20 mb-4">
                <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">
                {t.language === 'de' ? 'Termin gebucht!' : 'Appointment Booked!'}
              </h3>
              <p className="text-muted-foreground mb-8">
                {t.language === 'de'
                  ? 'Wir haben Ihnen eine Bestätigungs-E-Mail gesendet.'
                  : 'We have sent you a confirmation email.'}
              </p>
              <button
                onClick={onClose}
                className="px-6 py-3 rounded-xl bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-all"
              >
                {t.language === 'de' ? 'Schließen' : 'Close'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}