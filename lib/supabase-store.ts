// Supabase Store Functions
import { supabase } from './supabase'

// Contact Submissions
export async function getContactSubmissions() {
  const { data, error } = await supabase
    .from('contact_submissions')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching contact submissions:', error)
    return []
  }
  
  return data || []
}

export async function addContactSubmission(submission: {
  name: string
  email: string
  message: string
}) {
  const { data, error } = await supabase
    .from('contact_submissions')
    .insert([submission])
    .select()
    .single()
  
  if (error) {
    console.error('Error adding contact submission:', error)
    throw error
  }
  
  return data
}

export async function updateContactStatus(id: string, status: 'new' | 'read' | 'replied') {
  const { error } = await supabase
    .from('contact_submissions')
    .update({ status })
    .eq('id', id)
  
  if (error) {
    console.error('Error updating contact status:', error)
    throw error
  }
}

// Time Slots
export async function getTimeSlots(startDate?: Date, endDate?: Date) {
  let query = supabase
    .from('time_slots')
    .select('*')
    .order('date', { ascending: true })
    .order('time', { ascending: true })
  
  if (startDate) {
    query = query.gte('date', startDate.toISOString().split('T')[0])
  }
  
  if (endDate) {
    query = query.lte('date', endDate.toISOString().split('T')[0])
  }
  
  const { data, error } = await query
  
  if (error) {
    console.error('Error fetching time slots:', error)
    return []
  }
  
  return data || []
}

export async function addTimeSlots(slots: Array<{
  date: string
  time: string
  available?: boolean
}>) {
  const { data, error } = await supabase
    .from('time_slots')
    .upsert(slots.map(slot => ({
      ...slot,
      available: slot.available ?? true
    })))
    .select()
  
  if (error) {
    console.error('Error adding time slots:', error)
    throw error
  }
  
  return data
}

export async function removeTimeSlot(id: string) {
  const { error } = await supabase
    .from('time_slots')
    .delete()
    .eq('id', id)
  
  if (error) {
    console.error('Error removing time slot:', error)
    throw error
  }
}

// Bookings
export async function getBookings() {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching bookings:', error)
    return []
  }
  
  return data || []
}

export async function addBooking(booking: {
  date: string
  time: string
  name: string
  email: string
  phone?: string
  message?: string
}) {
  // Start a transaction
  const { data: bookingData, error: bookingError } = await supabase
    .from('bookings')
    .insert([booking])
    .select()
    .single()
  
  if (bookingError) {
    console.error('Error adding booking:', bookingError)
    throw bookingError
  }
  
  // Mark the time slot as unavailable
  const { error: slotError } = await supabase
    .from('time_slots')
    .update({ available: false })
    .eq('date', booking.date)
    .eq('time', booking.time)
  
  if (slotError) {
    console.error('Error updating time slot availability:', slotError)
    // Note: In production, you might want to rollback the booking here
  }
  
  return bookingData
}

export async function updateBookingStatus(id: string, status: 'pending' | 'confirmed' | 'cancelled') {
  // Get the booking first to know which slot to update
  const { data: booking } = await supabase
    .from('bookings')
    .select('date, time')
    .eq('id', id)
    .single()
  
  // Update booking status
  const { error: bookingError } = await supabase
    .from('bookings')
    .update({ status })
    .eq('id', id)
  
  if (bookingError) {
    console.error('Error updating booking status:', bookingError)
    throw bookingError
  }
  
  // If cancelled, make the slot available again
  if (status === 'cancelled' && booking) {
    const { error: slotError } = await supabase
      .from('time_slots')
      .update({ available: true })
      .eq('date', booking.date)
      .eq('time', booking.time)
    
    if (slotError) {
      console.error('Error updating time slot availability:', slotError)
    }
  }
}

// Auth functions
export async function signIn(email: string, password: string) {
  // For now, using simple check. In production, use Supabase Auth
  const { data, error } = await supabase
    .from('admin_users')
    .select('*')
    .eq('email', email)
    .eq('password_hash', password)
    .single()
  
  if (error || !data) {
    return null
  }
  
  // Store in session
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('admin_user', JSON.stringify(data))
  }
  
  return data
}

export async function signOut() {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('admin_user')
  }
}

export async function getCurrentUser() {
  if (typeof window !== 'undefined') {
    const user = sessionStorage.getItem('admin_user')
    return user ? JSON.parse(user) : null
  }
  return null
}