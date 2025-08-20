import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function cleanupTestData() {
  try {
    console.log('🧹 Starting cleanup of test data...\n')

    // Delete all bookings
    console.log('Deleting all bookings...')
    const { data: bookings, error: bookingsError } = await supabase
      .from('bookings')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000') // Delete all rows
      .select()

    if (bookingsError) {
      console.error('Error deleting bookings:', bookingsError)
    } else {
      console.log(`✅ Deleted ${bookings?.length || 0} bookings`)
    }

    // Delete all contact submissions
    console.log('\nDeleting all contact submissions...')
    const { data: contacts, error: contactsError } = await supabase
      .from('contact_submissions')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000') // Delete all rows
      .select()

    if (contactsError) {
      console.error('Error deleting contact submissions:', contactsError)
    } else {
      console.log(`✅ Deleted ${contacts?.length || 0} contact submissions`)
    }

    // Reset all time slots to available
    console.log('\nResetting all time slots to available...')
    const { data: timeSlots, error: timeSlotsError } = await supabase
      .from('time_slots')
      .update({ available: true })
      .eq('available', false)
      .select()

    if (timeSlotsError) {
      console.error('Error resetting time slots:', timeSlotsError)
    } else {
      console.log(`✅ Reset ${timeSlots?.length || 0} time slots to available`)
    }

    console.log('\n🎉 Cleanup completed successfully!')
    console.log('The database is now clean and ready for production.')

  } catch (error) {
    console.error('Unexpected error during cleanup:', error)
  }
}

cleanupTestData()