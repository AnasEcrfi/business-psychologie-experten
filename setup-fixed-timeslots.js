import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function setupFixedTimeSlots() {
  try {
    console.log('Creating fixed_time_slots table...')
    
    // Create the table
    const { error: createTableError } = await supabase.rpc('exec_sql', {
      sql: `
        -- Fixed Time Slots Configuration Table
        CREATE TABLE IF NOT EXISTS fixed_time_slots (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
          start_time VARCHAR(10) NOT NULL,
          end_time VARCHAR(10) NOT NULL,
          enabled BOOLEAN DEFAULT true,
          duration_type VARCHAR(20) DEFAULT 'forever' CHECK (duration_type IN ('forever', 'weeks', 'months', 'until_date')),
          duration_value INTEGER,
          valid_until DATE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
        );

        -- Create indexes
        CREATE INDEX IF NOT EXISTS idx_fixed_time_slots_day ON fixed_time_slots(day_of_week);
        CREATE INDEX IF NOT EXISTS idx_fixed_time_slots_enabled ON fixed_time_slots(enabled);
        CREATE INDEX IF NOT EXISTS idx_fixed_time_slots_valid_until ON fixed_time_slots(valid_until);

        -- Create update trigger
        CREATE TRIGGER update_fixed_time_slots_updated_at BEFORE UPDATE ON fixed_time_slots
          FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

        -- Enable RLS
        ALTER TABLE fixed_time_slots ENABLE ROW LEVEL SECURITY;

        -- Create policies
        CREATE POLICY "Anyone can view enabled fixed time slots" ON fixed_time_slots
          FOR SELECT TO anon USING (enabled = true);

        CREATE POLICY "Only admins can manage fixed time slots" ON fixed_time_slots
          FOR ALL TO authenticated USING (true);
      `
    })

    if (createTableError) {
      // If exec_sql doesn't work, try direct execution
      console.log('Using alternative method to create table...')
      
      // First check if table exists
      const { data: tables } = await supabase
        .from('information_schema.tables')
        .select('table_name')
        .eq('table_schema', 'public')
        .eq('table_name', 'fixed_time_slots')
      
      if (!tables || tables.length === 0) {
        console.error('Table needs to be created manually. Please run supabase-fixed-timeslots.sql in your Supabase dashboard.')
      }
    }

    console.log('Inserting default fixed time slots...')
    
    // Clear existing slots
    await supabase
      .from('fixed_time_slots')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000')

    // Insert default slots for Monday and Tuesday
    const defaultSlots = [
      {
        day_of_week: 1, // Monday
        start_time: '13:00',
        end_time: '15:00',
        enabled: true,
        duration_type: 'forever'
      },
      {
        day_of_week: 2, // Tuesday
        start_time: '11:00',
        end_time: '13:00',
        enabled: true,
        duration_type: 'forever'
      }
    ]

    const { error: insertError } = await supabase
      .from('fixed_time_slots')
      .insert(defaultSlots)

    if (insertError) {
      console.error('Error inserting default slots:', insertError)
    } else {
      console.log('✅ Default fixed time slots created successfully!')
      console.log('- Monday: 13:00-15:00 (forever)')
      console.log('- Tuesday: 11:00-13:00 (forever)')
    }

    // Now apply these slots to the next 12 months
    console.log('\nGenerating time slots for the next 12 months...')
    
    const startDate = new Date()
    const endDate = new Date()
    endDate.setMonth(endDate.getMonth() + 12)
    
    let currentDate = new Date(startDate)
    let slotsCreated = 0
    
    while (currentDate <= endDate) {
      const dayOfWeek = currentDate.getDay()
      
      // Check if it's Monday (1) or Tuesday (2)
      if (dayOfWeek === 1 || dayOfWeek === 2) {
        const dateStr = currentDate.toISOString().split('T')[0]
        const slot = defaultSlots.find(s => s.day_of_week === dayOfWeek)
        
        if (slot) {
          const [startHour, startMinute] = slot.start_time.split(':').map(Number)
          const [endHour, endMinute] = slot.end_time.split(':').map(Number)
          
          let currentTime = new Date(currentDate)
          currentTime.setHours(startHour, startMinute, 0, 0)
          
          const endTime = new Date(currentDate)
          endTime.setHours(endHour, endMinute, 0, 0)
          
          while (currentTime < endTime) {
            const timeStr = `${String(currentTime.getHours()).padStart(2, '0')}:${String(currentTime.getMinutes()).padStart(2, '0')}`
            
            // Check if slot already exists
            const { data: existing } = await supabase
              .from('time_slots')
              .select('id')
              .eq('date', dateStr)
              .eq('time', timeStr)
              .single()
            
            if (!existing) {
              // Create new slot
              await supabase
                .from('time_slots')
                .insert({
                  date: dateStr,
                  time: timeStr,
                  available: true
                })
              slotsCreated++
            }
            
            // Add 30 minutes
            currentTime.setMinutes(currentTime.getMinutes() + 30)
          }
        }
      }
      
      // Move to next day
      currentDate.setDate(currentDate.getDate() + 1)
    }
    
    console.log(`✅ Created ${slotsCreated} time slots for the next 12 months!`)

  } catch (error) {
    console.error('Setup error:', error)
  }
}

setupFixedTimeSlots()