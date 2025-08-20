import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface FixedTimeSlotDB {
  id?: string
  day_of_week: number
  start_time: string
  end_time: string
  enabled: boolean
  duration_type: 'forever' | 'weeks' | 'months' | 'until_date'
  duration_value?: number
  valid_until?: string
  created_at?: string
  updated_at?: string
}

// Get all fixed time slots
export async function getFixedTimeSlots() {
  try {
    const { data, error } = await supabase
      .from('fixed_time_slots')
      .select('*')
      .order('day_of_week', { ascending: true })
      .order('start_time', { ascending: true })

    if (error) {
      // Table doesn't exist yet, return default slots
      console.log('Fixed time slots table not found, using defaults')
      return [
        {
          id: '1',
          day_of_week: 1,
          start_time: '13:00',
          end_time: '15:00',
          enabled: true,
          duration_type: 'forever' as const,
          created_at: new Date().toISOString()
        },
        {
          id: '2',
          day_of_week: 2,
          start_time: '11:00',
          end_time: '13:00',
          enabled: true,
          duration_type: 'forever' as const,
          created_at: new Date().toISOString()
        }
      ]
    }

    return data || []
  } catch {
    // Return default slots if there's any error
    return [
      {
        id: '1',
        day_of_week: 1,
        start_time: '13:00',
        end_time: '15:00',
        enabled: true,
        duration_type: 'forever' as const,
        created_at: new Date().toISOString()
      },
      {
        id: '2',
        day_of_week: 2,
        start_time: '11:00',
        end_time: '13:00',
        enabled: true,
        duration_type: 'forever' as const,
        created_at: new Date().toISOString()
      }
    ]
  }
}

// Save fixed time slots (replace all existing)
export async function saveFixedTimeSlots(slots: FixedTimeSlotDB[]) {
  try {
    // First, delete all existing slots
    const { error: deleteError } = await supabase
      .from('fixed_time_slots')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000') // Delete all rows

    if (deleteError) {
      console.log('Fixed time slots table not ready, storing in memory only')
      // Table doesn't exist yet, we'll just work with in-memory slots
      return slots
    }

    // Then insert new slots
    if (slots.length > 0) {
      const { data, error } = await supabase
        .from('fixed_time_slots')
        .insert(slots.map(slot => ({
          day_of_week: slot.day_of_week,
          start_time: slot.start_time,
          end_time: slot.end_time,
          enabled: slot.enabled,
          duration_type: slot.duration_type,
          duration_value: slot.duration_value,
          valid_until: slot.valid_until
        })))
        .select()

      if (error) {
        console.log('Could not save to database, using in-memory slots')
        return slots
      }

      return data
    }

    return []
  } catch {
    console.log('Using in-memory fixed time slots')
    return slots
  }
}

// Generate time slots for a date range based on fixed configurations
export async function generateTimeSlotsFromFixed(startDate: Date, endDate: Date) {
  const fixedSlots = await getFixedTimeSlots()
  const generatedSlots: { date: string; time: string }[] = []
  
  const currentDate = new Date(startDate)
  currentDate.setHours(0, 0, 0, 0)
  
  const end = new Date(endDate)
  end.setHours(23, 59, 59, 999)
  
  while (currentDate <= end) {
    const dayOfWeek = currentDate.getDay()
    
    // Get fixed slots for this day of week
    const daySlots = fixedSlots.filter(slot => {
      if (slot.day_of_week !== dayOfWeek || !slot.enabled) return false
      
      const now = new Date()
      const slotCreatedAt = slot.created_at ? new Date(slot.created_at) : now
      
      // Check if slot is still valid based on duration type
      switch (slot.duration_type) {
        case 'forever':
          return true
          
        case 'until_date':
          if (!slot.valid_until) return true
          return new Date(slot.valid_until) >= currentDate
          
        case 'weeks':
          if (!slot.duration_value) return false
          const weeksEnd = new Date(slotCreatedAt)
          weeksEnd.setDate(weeksEnd.getDate() + (slot.duration_value * 7))
          return weeksEnd >= currentDate
          
        case 'months':
          if (!slot.duration_value) return false
          const monthsEnd = new Date(slotCreatedAt)
          monthsEnd.setMonth(monthsEnd.getMonth() + slot.duration_value)
          return monthsEnd >= currentDate
          
        default:
          return true
      }
    })
    
    // Generate 30-minute slots for each valid fixed slot
    daySlots.forEach(slot => {
      const [startHour, startMinute] = slot.start_time.split(':').map(Number)
      const [endHour, endMinute] = slot.end_time.split(':').map(Number)
      
      const currentTime = new Date(currentDate)
      currentTime.setHours(startHour, startMinute, 0, 0)
      
      const endTime = new Date(currentDate)
      endTime.setHours(endHour, endMinute, 0, 0)
      
      while (currentTime < endTime) {
        const timeStr = `${String(currentTime.getHours()).padStart(2, '0')}:${String(currentTime.getMinutes()).padStart(2, '0')}`
        const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`
        
        generatedSlots.push({
          date: dateStr,
          time: timeStr
        })
        
        // Add 30 minutes
        currentTime.setMinutes(currentTime.getMinutes() + 30)
      }
    })
    
    // Move to next day
    currentDate.setDate(currentDate.getDate() + 1)
  }
  
  return generatedSlots
}

// Apply fixed time slots to the calendar (create actual time_slots entries)
export async function applyFixedTimeSlotsToCalendar(startDate: Date, endDate: Date) {
  const generatedSlots = await generateTimeSlotsFromFixed(startDate, endDate)
  
  if (generatedSlots.length === 0) return []
  
  // Insert slots that don't already exist
  const promises = generatedSlots.map(async (slot) => {
    // Check if slot already exists
    const { data: existing } = await supabase
      .from('time_slots')
      .select('id')
      .eq('date', slot.date)
      .eq('time', slot.time)
      .single()
    
    if (!existing) {
      // Create new slot
      return supabase
        .from('time_slots')
        .insert({
          date: slot.date,
          time: slot.time,
          available: true
        })
        .select()
    }
    
    return null
  })
  
  const results = await Promise.all(promises)
  return results.filter(r => r !== null)
}