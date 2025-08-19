// Migration helper to switch between local and Supabase storage
import * as localStore from './store'
import * as supabaseStore from './supabase-store'

// Environment variable to control which store to use
const USE_SUPABASE = process.env.NEXT_PUBLIC_USE_SUPABASE === 'true'

// Export the appropriate store functions based on configuration
export const getContactSubmissions = USE_SUPABASE 
  ? supabaseStore.getContactSubmissions 
  : localStore.getContactSubmissions

export const addContactSubmission = USE_SUPABASE
  ? supabaseStore.addContactSubmission
  : localStore.addContactSubmission

export const updateContactStatus = USE_SUPABASE
  ? supabaseStore.updateContactStatus
  : localStore.updateContactStatus

export const getTimeSlots = USE_SUPABASE
  ? supabaseStore.getTimeSlots
  : localStore.getTimeSlots

export const addTimeSlots = USE_SUPABASE
  ? supabaseStore.addTimeSlots
  : localStore.addTimeSlots

export const removeTimeSlot = USE_SUPABASE
  ? supabaseStore.removeTimeSlot
  : localStore.removeTimeSlot

export const getBookings = USE_SUPABASE
  ? supabaseStore.getBookings
  : localStore.getBookings

export const addBooking = USE_SUPABASE
  ? supabaseStore.addBooking
  : localStore.addBooking

export const updateBookingStatus = USE_SUPABASE
  ? supabaseStore.updateBookingStatus
  : localStore.updateBookingStatus

// Auth functions are in separate auth modules
export { signIn, signOut, getCurrentUser } from './auth-migration'

// Export types from local store for compatibility
export type { ContactSubmission, TimeSlot, Booking } from './store'