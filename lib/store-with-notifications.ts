// Wrapper functions that add email notifications to store operations
import * as storeMigration from './store-migration'
import { sendBookingNotification, sendContactFormNotification } from './email-service'

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

// Wrap addContactSubmission to send email notification
export async function addContactSubmission(submission: {
  name: string
  email: string
  message: string
}) {
  // First, save the submission
  const result = await storeMigration.addContactSubmission(submission)
  
  // Then send email notification (don't fail if email fails)
  try {
    await sendContactFormNotification({
      ...submission,
      submittedAt: new Date().toISOString()
    })
    console.log('Contact form notification sent successfully')
  } catch (error) {
    console.error('Failed to send contact form notification:', error)
    // Don't throw - we still want to save the submission even if email fails
  }
  
  return result
}

// Wrap addBooking to send email notification
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
  
  // Then send email notification (don't fail if email fails)
  try {
    await sendBookingNotification(booking)
    console.log('Booking notification sent successfully')
  } catch (error) {
    console.error('Failed to send booking notification:', error)
    // Don't throw - we still want to save the booking even if email fails
  }
  
  return result
}