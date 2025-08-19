"use client"

import * as React from "react"
import { 
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  Plus,
  X,
  User,
  Mail,
  Phone,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react"
import { 
  getTimeSlots, 
  addTimeSlots, 
  removeTimeSlot,
  getBookings,
  updateBookingStatus,
  TimeSlot,
  Booking
} from "@/lib/store"
import { cn } from "@/lib/utils"

export default function AdminCalendar() {
  const [currentDate, setCurrentDate] = React.useState(() => {
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth(), 1)
  })
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null)
  const [timeSlots, setTimeSlots] = React.useState<TimeSlot[]>([])
  const [bookings, setBookings] = React.useState<Booking[]>([])
  const [showAddModal, setShowAddModal] = React.useState(false)
  const [selectedBooking, setSelectedBooking] = React.useState<Booking | null>(null)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    loadData()
  }, [currentDate])

  const loadData = () => {
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
    
    const slots = getTimeSlots(startOfMonth, endOfMonth)
    const allBookings = getBookings()
    
    setTimeSlots(slots)
    setBookings(allBookings)
  }

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
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

  const getSlotsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0]
    return timeSlots.filter(slot => slot.date === dateStr)
  }

  const getBookingsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0]
    return bookings.filter(booking => booking.date === dateStr)
  }

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const handleDateClick = (date: Date) => {
    setSelectedDate(date)
  }

  const handleAddTimeSlots = (date: Date, times: string[]) => {
    const dateStr = date.toISOString().split('T')[0]
    const newSlots = times.map(time => ({
      date: dateStr,
      time,
      available: true
    }))
    
    addTimeSlots(newSlots)
    loadData()
  }

  const handleRemoveSlot = (slotId: string) => {
    if (confirm('Are you sure you want to remove this time slot?')) {
      removeTimeSlot(slotId)
      loadData()
    }
  }

  const handleBookingStatusChange = (bookingId: string, status: Booking['status']) => {
    updateBookingStatus(bookingId, status)
    loadData()
    setSelectedBooking(null)
  }

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  if (!mounted) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 dark:bg-zinc-800 rounded w-1/4 mb-4"></div>
        <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-1/2 mb-8"></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-96 bg-gray-200 dark:bg-zinc-800 rounded-2xl"></div>
          <div className="h-96 bg-gray-200 dark:bg-zinc-800 rounded-2xl"></div>
        </div>
      </div>
    )
  }
  
  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Calendar Management</h1>
        <p className="text-muted-foreground">
          Manage available time slots and bookings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <div className="flex gap-2">
              <button
                onClick={handlePrevMonth}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNextMonth}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Week Days */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {weekDays.map(day => (
              <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-2">
            {getDaysInMonth().map((date, index) => {
              if (!date) {
                return <div key={index} />
              }
              
              const slots = getSlotsForDate(date)
              const dayBookings = getBookingsForDate(date)
              const today = new Date()
              today.setHours(0, 0, 0, 0)
              const isSelected = selectedDate?.toDateString() === date.toDateString()
              const isToday = today.toDateString() === date.toDateString()
              const isPast = date < today
              
              return (
                <button
                  key={index}
                  onClick={() => handleDateClick(date)}
                  disabled={isPast}
                  className={cn(
                    "relative p-3 rounded-xl transition-all hover:scale-105",
                    isSelected && "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900",
                    !isSelected && isToday && "bg-gray-100 dark:bg-zinc-800",
                    !isSelected && !isToday && "hover:bg-gray-50 dark:hover:bg-zinc-800/50",
                    isPast && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <div className="text-sm font-medium">{date.getDate()}</div>
                  
                  {/* Indicators */}
                  <div className="flex gap-1 mt-1 justify-center">
                    {slots.length > 0 && (
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    )}
                    {dayBookings.length > 0 && (
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    )}
                  </div>
                </button>
              )
            })}
          </div>

          {/* Legend */}
          <div className="flex gap-4 mt-6 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-muted-foreground">Available Slots</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="text-muted-foreground">Bookings</span>
            </div>
          </div>
        </div>

        {/* Day Detail */}
        <div className="glass-card rounded-2xl p-6">
          {selectedDate ? (
            <>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">
                  {selectedDate.toLocaleDateString('en-US', { 
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric'
                  })}
                </h3>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="p-2 rounded-lg bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Time Slots */}
              <div className="space-y-2 max-h-[500px] overflow-y-auto">
                {getSlotsForDate(selectedDate)
                  .sort((a, b) => a.time.localeCompare(b.time))
                  .map(slot => {
                    const booking = bookings.find(b => 
                      b.date === slot.date && b.time === slot.time
                    )
                    
                    return (
                      <div
                        key={slot.id}
                        className={cn(
                          "p-3 rounded-lg border",
                          slot.available 
                            ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                            : "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span className="font-medium">{slot.time}</span>
                          </div>
                          
                          {slot.available ? (
                            <button
                              onClick={() => handleRemoveSlot(slot.id)}
                              className="p-1 rounded hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors"
                            >
                              <X className="w-4 h-4 text-red-600 dark:text-red-400" />
                            </button>
                          ) : (
                            <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                              Booked
                            </span>
                          )}
                        </div>
                        
                        {booking && (
                          <div className="mt-2 pt-2 border-t border-blue-200 dark:border-blue-800">
                            <button
                              onClick={() => setSelectedBooking(booking)}
                              className="w-full text-left text-sm hover:bg-blue-100 dark:hover:bg-blue-900/30 -m-1 p-1 rounded transition-colors"
                            >
                              <p className="font-medium">{booking.name}</p>
                              <p className="text-xs text-muted-foreground">{booking.email}</p>
                            </button>
                          </div>
                        )}
                      </div>
                    )
                  })}
                  
                {getSlotsForDate(selectedDate).length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No time slots for this day
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Select a date to view details
            </div>
          )}
        </div>
      </div>

      {/* Add Time Slots Modal */}
      {showAddModal && selectedDate && (
        <AddTimeSlotsModal
          date={selectedDate}
          onAdd={handleAddTimeSlots}
          onClose={() => setShowAddModal(false)}
        />
      )}

      {/* Booking Detail Modal */}
      {selectedBooking && (
        <BookingDetailModal
          booking={selectedBooking}
          onStatusChange={handleBookingStatusChange}
          onClose={() => setSelectedBooking(null)}
        />
      )}
    </div>
  )
}

// Add Time Slots Modal Component
function AddTimeSlotsModal({ 
  date, 
  onAdd, 
  onClose 
}: { 
  date: Date
  onAdd: (date: Date, times: string[]) => void
  onClose: () => void
}) {
  const [selectedTimes, setSelectedTimes] = React.useState<string[]>([])
  
  const timeOptions = [
    '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ]
  
  const handleSubmit = () => {
    if (selectedTimes.length > 0) {
      onAdd(date, selectedTimes)
      onClose()
    }
  }
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 max-w-md w-full">
        <h3 className="text-xl font-semibold mb-4">Add Time Slots</h3>
        <p className="text-sm text-muted-foreground mb-4">
          {date.toLocaleDateString('en-US', { 
            weekday: 'long',
            month: 'long',
            day: 'numeric'
          })}
        </p>
        
        <div className="grid grid-cols-2 gap-2 mb-6">
          {timeOptions.map(time => (
            <button
              key={time}
              onClick={() => {
                setSelectedTimes(prev =>
                  prev.includes(time)
                    ? prev.filter(t => t !== time)
                    : [...prev, time]
                )
              }}
              className={cn(
                "p-2 rounded-lg transition-colors",
                selectedTimes.includes(time)
                  ? "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900"
                  : "bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700"
              )}
            >
              {time}
            </button>
          ))}
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={handleSubmit}
            disabled={selectedTimes.length === 0}
            className="flex-1 py-2 rounded-xl bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            Add Selected
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-xl bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

// Booking Detail Modal Component
function BookingDetailModal({
  booking,
  onStatusChange,
  onClose
}: {
  booking: Booking
  onStatusChange: (id: string, status: Booking['status']) => void
  onClose: () => void
}) {
  const getStatusBadge = () => {
    switch (booking.status) {
      case 'pending':
        return (
          <span className="px-2 py-1 rounded-lg bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 text-xs font-medium">
            Pending
          </span>
        )
      case 'confirmed':
        return (
          <span className="px-2 py-1 rounded-lg bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-medium">
            Confirmed
          </span>
        )
      case 'cancelled':
        return (
          <span className="px-2 py-1 rounded-lg bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 text-xs font-medium">
            Cancelled
          </span>
        )
    }
  }
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 max-w-md w-full">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-semibold">Booking Details</h3>
          {getStatusBadge()}
        </div>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2 text-sm">
            <User className="w-4 h-4 text-muted-foreground" />
            <span>{booking.name}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <span>{booking.email}</span>
          </div>
          
          {booking.phone && (
            <div className="flex items-center gap-2 text-sm">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span>{booking.phone}</span>
            </div>
          )}
          
          <div className="flex items-center gap-2 text-sm">
            <CalendarIcon className="w-4 h-4 text-muted-foreground" />
            <span>
              {new Date(booking.date).toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric'
              })} at {booking.time}
            </span>
          </div>
          
          {booking.message && (
            <div className="pt-3 border-t">
              <p className="text-sm font-medium mb-1">Message:</p>
              <p className="text-sm text-muted-foreground">{booking.message}</p>
            </div>
          )}
        </div>
        
        <div className="flex gap-3">
          {booking.status === 'pending' && (
            <>
              <button
                onClick={() => onStatusChange(booking.id, 'confirmed')}
                className="flex-1 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white font-medium transition-colors"
              >
                Confirm
              </button>
              <button
                onClick={() => onStatusChange(booking.id, 'cancelled')}
                className="flex-1 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium transition-colors"
              >
                Cancel
              </button>
            </>
          )}
          
          {booking.status === 'confirmed' && (
            <button
              onClick={() => onStatusChange(booking.id, 'cancelled')}
              className="flex-1 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium transition-colors"
            >
              Cancel Booking
            </button>
          )}
          
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-xl bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}