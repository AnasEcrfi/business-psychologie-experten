// Client-safe wrapper that calls API endpoint for email notifications
import * as storeMigration from './store-migration'

// Re-export all functions that don't need notifications
export {
  getContactSubmissions,
  updateContactStatus,
  getTimeSlots,
  addTimeSlots,
  removeTimeSlot,
  getBookings,
  updateBookingStatus,
  signIn,
  signOut,
  getCurrentUser
} from './store-migration'

// Export types
export type { ContactSubmission, TimeSlot, Booking } from './store-migration'

// Wrap addContactSubmission to send email notification via API
export async function addContactSubmission(submission: {
  name: string
  email: string
  message: string
}) {
  // First, save the submission
  const result = await storeMigration.addContactSubmission(submission)
  
  // Then send email notification via API (don't fail if email fails)
  try {
    const response = await fetch('/api/send-notification', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'contact',
        data: {
          ...submission,
          submittedAt: new Date().toISOString()
        }
      })
    })
    
    if (response.ok) {
      console.log('Contact form notification sent successfully')
    }
  } catch (error) {
    console.error('Failed to send contact form notification:', error)
    // Don't throw - we still want to save the submission even if email fails
  }
  
  return result
}

// Wrap addBooking to send email notification via API
export async function addBooking(booking: {
  date: string
  time: string
  name: string
  email: string
  phone?: string
  message?: string
}) {
  // First, save the booking
  const result = await storeMigration.addBooking(booking)
  
  // Then send email notification via API (don't fail if email fails)
  try {
    const response = await fetch('/api/send-notification', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'booking',
        data: booking
      })
    })
    
    if (response.ok) {
      console.log('Booking notification sent successfully')
    }
  } catch (error) {
    console.error('Failed to send booking notification:', error)
    // Don't throw - we still want to save the booking even if email fails
  }
  
  return result
}