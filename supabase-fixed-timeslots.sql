-- Fixed Time Slots Configuration Table
CREATE TABLE IF NOT EXISTS fixed_time_slots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6), -- 0=Sunday, 6=Saturday
  start_time VARCHAR(10) NOT NULL, -- Format: HH:MM
  end_time VARCHAR(10) NOT NULL,   -- Format: HH:MM
  enabled BOOLEAN DEFAULT true,
  duration_type VARCHAR(20) DEFAULT 'forever' CHECK (duration_type IN ('forever', 'weeks', 'months', 'until_date')),
  duration_value INTEGER, -- Number of weeks/months (only used if duration_type is 'weeks' or 'months')
  valid_until DATE, -- Only used if duration_type is 'until_date'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create index for better performance
CREATE INDEX idx_fixed_time_slots_day ON fixed_time_slots(day_of_week);
CREATE INDEX idx_fixed_time_slots_enabled ON fixed_time_slots(enabled);
CREATE INDEX idx_fixed_time_slots_valid_until ON fixed_time_slots(valid_until);

-- Create update trigger for updated_at column
CREATE TRIGGER update_fixed_time_slots_updated_at BEFORE UPDATE ON fixed_time_slots
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS)
ALTER TABLE fixed_time_slots ENABLE ROW LEVEL SECURITY;

-- Policies for fixed_time_slots
CREATE POLICY "Anyone can view enabled fixed time slots" ON fixed_time_slots
  FOR SELECT TO anon USING (enabled = true);

CREATE POLICY "Only admins can manage fixed time slots" ON fixed_time_slots
  FOR ALL TO authenticated USING (true);

-- Function to generate time slots from fixed configurations
CREATE OR REPLACE FUNCTION generate_time_slots_from_fixed(start_date DATE, end_date DATE)
RETURNS TABLE (
  slot_date DATE,
  slot_time VARCHAR(10)
) AS $$
DECLARE
  current_date DATE;
  fixed_slot RECORD;
  current_time TIME;
  end_time TIME;
BEGIN
  current_date := start_date;
  
  WHILE current_date <= end_date LOOP
    -- Get fixed slots for this day of week
    FOR fixed_slot IN 
      SELECT * FROM fixed_time_slots 
      WHERE day_of_week = EXTRACT(DOW FROM current_date)::INTEGER
        AND enabled = true
        AND (
          (duration_type = 'forever') OR
          (duration_type = 'until_date' AND (valid_until IS NULL OR valid_until >= current_date)) OR
          (duration_type = 'weeks' AND created_at + (duration_value || ' weeks')::INTERVAL >= current_date) OR
          (duration_type = 'months' AND created_at + (duration_value || ' months')::INTERVAL >= current_date)
        )
    LOOP
      -- Generate 30-minute slots between start and end time
      current_time := fixed_slot.start_time::TIME;
      end_time := fixed_slot.end_time::TIME;
      
      WHILE current_time < end_time LOOP
        slot_date := current_date;
        slot_time := TO_CHAR(current_time, 'HH24:MI');
        RETURN NEXT;
        current_time := current_time + INTERVAL '30 minutes';
      END LOOP;
    END LOOP;
    
    current_date := current_date + INTERVAL '1 day';
  END LOOP;
END;
$$ LANGUAGE plpgsql;