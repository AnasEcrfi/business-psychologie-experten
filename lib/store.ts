// Mock data store for development
// TODO: Replace with real database

export interface ContactSubmission {
  id: string
  name: string
  email: string
  message: string
  createdAt: Date
  status: 'new' | 'read' | 'replied'
}

export interface TimeSlot {
  id: string
  date: string
  time: string
  available: boolean
  bookedBy?: {
    name: string
    email: string
    phone?: string
  }
}

export interface Booking {
  id: string
  date: string
  time: string
  name: string
  email: string
  phone?: string
  message?: string
  createdAt: Date
  status: 'pending' | 'confirmed' | 'cancelled'
}

// Mock data storage
let contactSubmissions: ContactSubmission[] = []
let timeSlots: TimeSlot[] = []
let bookings: Booking[] = []

// Contact submissions
export function addContactSubmission(data: Omit<ContactSubmission, 'id' | 'createdAt' | 'status'>) {
  const submission: ContactSubmission = {
    ...data,
    id: Date.now().toString(),
    createdAt: new Date(),
    status: 'new'
  }
  contactSubmissions.push(submission)
  
  // Store in localStorage for persistence
  if (typeof window !== 'undefined') {
    localStorage.setItem('contactSubmissions', JSON.stringify(contactSubmissions))
  }
  
  return submission
}

export function getContactSubmissions(): ContactSubmission[] {
  if (typeof window !== 'undefined' && contactSubmissions.length === 0) {
    const stored = localStorage.getItem('contactSubmissions')
    if (stored) {
      contactSubmissions = JSON.parse(stored)
    }
  }
  return contactSubmissions
}

export function updateContactStatus(id: string, status: ContactSubmission['status']) {
  const submission = contactSubmissions.find(s => s.id === id)
  if (submission) {
    submission.status = status
    if (typeof window !== 'undefined') {
      localStorage.setItem('contactSubmissions', JSON.stringify(contactSubmissions))
    }
  }
}

// Time slots management
export function getTimeSlots(startDate: Date, endDate: Date): TimeSlot[] {
  if (typeof window !== 'undefined' && timeSlots.length === 0) {
    const stored = localStorage.getItem('timeSlots')
    if (stored) {
      timeSlots = JSON.parse(stored)
    } else {
      // Generate default time slots for the next 30 days
      generateDefaultTimeSlots()
    }
  }
  
  return timeSlots.filter(slot => {
    const slotDate = new Date(slot.date)
    return slotDate >= startDate && slotDate <= endDate
  })
}

function generateDefaultTimeSlots() {
  const slots: TimeSlot[] = []
  const today = new Date()
  
  // Generate slots for next 30 days
  for (let day = 1; day <= 30; day++) {
    const date = new Date(today)
    date.setDate(today.getDate() + day)
    
    // Skip weekends
    if (date.getDay() === 0 || date.getDay() === 6) continue
    
    // Morning slots (9:00 - 12:00)
    const morningTimes = ['09:00', '10:00', '11:00']
    // Afternoon slots (14:00 - 17:00)
    const afternoonTimes = ['14:00', '15:00', '16:00', '17:00']
    
    const allTimes = [...morningTimes, ...afternoonTimes]
    
    for (const time of allTimes) {
      slots.push({
        id: `${date.toISOString().split('T')[0]}-${time}`,
        date: date.toISOString().split('T')[0],
        time,
        available: true
      })
    }
  }
  
  timeSlots = slots
  if (typeof window !== 'undefined') {
    localStorage.setItem('timeSlots', JSON.stringify(timeSlots))
  }
}

export function updateTimeSlot(id: string, updates: Partial<TimeSlot>) {
  const slot = timeSlots.find(s => s.id === id)
  if (slot) {
    Object.assign(slot, updates)
    if (typeof window !== 'undefined') {
      localStorage.setItem('timeSlots', JSON.stringify(timeSlots))
    }
  }
}

export function addTimeSlots(slots: Omit<TimeSlot, 'id'>[]) {
  const newSlots = slots.map(slot => ({
    ...slot,
    id: `${slot.date}-${slot.time}`
  }))
  
  // Remove duplicates and add new slots
  newSlots.forEach(newSlot => {
    const existingIndex = timeSlots.findIndex(s => s.id === newSlot.id)
    if (existingIndex >= 0) {
      timeSlots[existingIndex] = newSlot
    } else {
      timeSlots.push(newSlot)
    }
  })
  
  if (typeof window !== 'undefined') {
    localStorage.setItem('timeSlots', JSON.stringify(timeSlots))
  }
}

export function removeTimeSlot(id: string) {
  timeSlots = timeSlots.filter(s => s.id !== id)
  if (typeof window !== 'undefined') {
    localStorage.setItem('timeSlots', JSON.stringify(timeSlots))
  }
}

// Bookings
export function addBooking(data: Omit<Booking, 'id' | 'createdAt' | 'status'>): Booking {
  const booking: Booking = {
    ...data,
    id: Date.now().toString(),
    createdAt: new Date(),
    status: 'pending'
  }
  
  bookings.push(booking)
  
  // Mark time slot as booked
  const slotId = `${data.date}-${data.time}`
  updateTimeSlot(slotId, {
    available: false,
    bookedBy: {
      name: data.name,
      email: data.email,
      phone: data.phone
    }
  })
  
  if (typeof window !== 'undefined') {
    localStorage.setItem('bookings', JSON.stringify(bookings))
  }
  
  return booking
}

export function getBookings(): Booking[] {
  if (typeof window !== 'undefined' && bookings.length === 0) {
    const stored = localStorage.getItem('bookings')
    if (stored) {
      bookings = JSON.parse(stored)
    }
  }
  return bookings
}

export function updateBookingStatus(id: string, status: Booking['status']) {
  const booking = bookings.find(b => b.id === id)
  if (booking) {
    booking.status = status
    
    // If cancelled, free up the time slot
    if (status === 'cancelled') {
      const slotId = `${booking.date}-${booking.time}`
      updateTimeSlot(slotId, {
        available: true,
        bookedBy: undefined
      })
    }
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('bookings', JSON.stringify(bookings))
    }
  }
}