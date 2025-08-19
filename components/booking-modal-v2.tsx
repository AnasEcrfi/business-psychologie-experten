"use client"

import * as React from "react"
import { 
  X, 
  Calendar, 
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
import { getTimeSlots, addBooking, TimeSlot } from "@/lib/store-with-notifications"

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
}

export function BookingModalV2({ isOpen, onClose }: BookingModalProps) {
  const { language } = useLanguage()
  const [step, setStep] = React.useState<'calendar' | 'details' | 'success'>('calendar')
  const [currentMonth, setCurrentMonth] = React.useState(() => {
    const now = new Date()
    // Reset to start of month to avoid time differences
    return new Date(now.getFullYear(), now.getMonth(), 1)
  })
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = React.useState<string | null>(null)
  const [availableSlots, setAvailableSlots] = React.useState<TimeSlot[]>([])
  const [monthSlots, setMonthSlots] = React.useState<Map<string, TimeSlot[]>>(new Map())
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [loading, setLoading] = React.useState(false)

  const formatDateString = (date: Date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const loadMonthSlots = React.useCallback(async () => {
    const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1)
    const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0)
    
    const slots = await getTimeSlots(startOfMonth, endOfMonth)
    
    // Group slots by date
    const slotMap = new Map<string, TimeSlot[]>()
    if (Array.isArray(slots)) {
      slots.forEach(slot => {
        const dateKey = slot.date
        if (!slotMap.has(dateKey)) {
          slotMap.set(dateKey, [])
        }
        slotMap.get(dateKey)?.push(slot)
      })
    }
    
    setMonthSlots(slotMap)
    
    // Also update slots for selected date if any
    if (selectedDate) {
      const dateStr = formatDateString(selectedDate)
      const dateSlots = slotMap.get(dateStr) || []
      setAvailableSlots(dateSlots.filter(s => s.available))
    }
  }, [currentMonth, selectedDate])

  // Load available slots for the current month
  React.useEffect(() => {
    if (isOpen) {
      loadMonthSlots()
    }
  }, [isOpen, loadMonthSlots])

  // Reset state when modal opens/closes
  React.useEffect(() => {
    if (isOpen) {
      setStep('calendar')
      setSelectedDate(null)
      setSelectedTime(null)
      setFormData({ name: '', email: '', phone: '', message: '' })
    }
  }, [isOpen])


  // Load slots for selected date
  React.useEffect(() => {
    if (selectedDate) {
      const dateStr = selectedDate.toISOString().split('T')[0]
      const slots = monthSlots.get(dateStr) || []
      setAvailableSlots(slots.sort((a, b) => a.time.localeCompare(b.time)))
    }
  }, [selectedDate, monthSlots])

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    setSelectedTime(null)
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
      const dateStr = selectedDate.toISOString().split('T')[0]
      await addBooking({
        date: dateStr,
        time: selectedTime,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message
      })
      
      // Reload slots to reflect the booking
      await loadMonthSlots()
      setStep('success')
    } catch {
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

  const hasAvailableSlots = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0]
    const slots = monthSlots.get(dateStr)
    return slots && slots.length > 0
  }

  if (!isOpen) return null

  const weekDays = language === 'de' 
    ? ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa']
    : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    
  const monthNames = language === 'de'
    ? ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 
       'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember']
    : ['January', 'February', 'March', 'April', 'May', 'June',
       'July', 'August', 'September', 'October', 'November', 'December']

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] animate-fade-in"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-[101] p-4 pointer-events-none">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden pointer-events-auto animate-scale-in shadow-2xl relative">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 dark:border-zinc-800 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold">
                {language === 'de' ? 'Termin buchen' : 'Book Appointment'}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {language === 'de' 
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
            {step === 'calendar' && (
              <div>
                {/* Month Navigation */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">
                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                      disabled={currentMonth.getMonth() === new Date().getMonth() && currentMonth.getFullYear() === new Date().getFullYear()}
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
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {weekDays.map(day => (
                    <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                      {day}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-7 gap-1">
                  {getDaysInMonth().map((date, index) => {
                    if (!date) {
                      return <div key={index} />
                    }
                    
                    const today = new Date()
                    today.setHours(0, 0, 0, 0)
                    const isToday = date.toDateString() === today.toDateString()
                    const isPast = date < today
                    const isSelected = selectedDate?.toDateString() === date.toDateString()
                    const hasSlots = hasAvailableSlots(date)
                    
                    return (
                      <button
                        key={index}
                        onClick={() => hasSlots && !isPast && handleDateSelect(date)}
                        disabled={isPast || !hasSlots}
                        className={cn(
                          "relative p-3 rounded-xl transition-all",
                          isSelected && "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900",
                          !isSelected && isToday && "bg-gray-100 dark:bg-zinc-800",
                          !isSelected && !isToday && hasSlots && !isPast && "hover:bg-gray-50 dark:hover:bg-zinc-800/50",
                          (isPast || !hasSlots) && "opacity-30 cursor-not-allowed"
                        )}
                      >
                        <div className="text-sm font-medium">{date.getDate()}</div>
                        {hasSlots && !isPast && (
                          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-green-500" />
                        )}
                      </button>
                    )
                  })}
                </div>

                {/* Selected Date Time Slots */}
                {selectedDate && (
                  <div className="mt-8">
                    <h4 className="text-sm font-medium mb-4">
                      {language === 'de' ? 'Verfügbare Zeiten' : 'Available Times'}
                    </h4>
                    {availableSlots.length > 0 ? (
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {availableSlots.map(slot => (
                          <button
                            key={slot.id}
                            onClick={() => handleTimeSelect(slot.time)}
                            className={cn(
                              "p-2.5 rounded-lg text-sm font-medium transition-all",
                              selectedTime === slot.time
                                ? "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900"
                                : "bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700"
                            )}
                          >
                            {slot.time}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        {language === 'de' 
                          ? 'Keine verfügbaren Zeiten' 
                          : 'No available times'}
                      </p>
                    )}

                    {selectedTime && (
                      <button
                        onClick={() => setStep('details')}
                        className="mt-6 w-full py-3 rounded-xl bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-all"
                      >
                        {language === 'de' ? 'Weiter' : 'Continue'}
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}

            {step === 'details' && (
              <div>
                <button
                  onClick={() => setStep('calendar')}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
                >
                  <ChevronLeft className="w-4 h-4" />
                  {language === 'de' ? 'Zurück' : 'Back'}
                </button>
                
                <div className="glass-card rounded-xl p-4 mb-6">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">
                        {selectedDate?.toLocaleDateString(language === 'de' ? 'de-DE' : 'en-US', {
                          weekday: 'long',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                      <p className="text-sm text-muted-foreground">{selectedTime}</p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {language === 'de' ? 'Name' : 'Name'} *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-100 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-zinc-600"
                        placeholder={language === 'de' ? 'Ihr Name' : 'Your name'}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {language === 'de' ? 'E-Mail' : 'Email'} *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-100 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-zinc-600"
                        placeholder={language === 'de' ? 'ihre.email@beispiel.de' : 'your.email@example.com'}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {language === 'de' ? 'Telefon' : 'Phone'}
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-100 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-zinc-600"
                        placeholder={language === 'de' ? '+49 123 456789' : '+1 234 567890'}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {language === 'de' ? 'Nachricht' : 'Message'}
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-100 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-zinc-600"
                        rows={3}
                        placeholder={language === 'de' 
                          ? 'Optional: Ihre Nachricht' 
                          : 'Optional: Your message'}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-all disabled:opacity-50"
                  >
                    {loading 
                      ? (language === 'de' ? 'Wird gebucht...' : 'Booking...')
                      : (language === 'de' ? 'Termin buchen' : 'Book Appointment')}
                  </button>
                </form>
              </div>
            )}

            {step === 'success' && (
              <div className="text-center py-12">
                <div className="inline-flex p-4 rounded-full bg-green-100 dark:bg-green-900/20 mb-4">
                  <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-2xl font-semibold mb-2">
                  {language === 'de' ? 'Termin gebucht!' : 'Appointment Booked!'}
                </h3>
                <p className="text-muted-foreground mb-2">
                  {language === 'de'
                    ? 'Wir haben Ihnen eine Bestätigungs-E-Mail gesendet.'
                    : 'We have sent you a confirmation email.'}
                </p>
                <p className="text-sm text-muted-foreground mb-8">
                  {selectedDate?.toLocaleDateString(language === 'de' ? 'de-DE' : 'en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric'
                  })} - {selectedTime}
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-3 rounded-xl bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-all"
                >
                  {language === 'de' ? 'Schließen' : 'Close'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}