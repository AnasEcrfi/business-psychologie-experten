-- Fix Row Level Security Policies for Business Psychologie Experten

-- Drop existing policies first
DROP POLICY IF EXISTS "Anyone can create contact submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Only admins can view contact submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Only admins can update contact submissions" ON contact_submissions;

DROP POLICY IF EXISTS "Anyone can view available time slots" ON time_slots;
DROP POLICY IF EXISTS "Admins can view all time slots" ON time_slots;
DROP POLICY IF EXISTS "Only admins can manage time slots" ON time_slots;

DROP POLICY IF EXISTS "Anyone can create bookings" ON bookings;
DROP POLICY IF EXISTS "Only admins can view bookings" ON bookings;
DROP POLICY IF EXISTS "Only admins can update bookings" ON bookings;

-- Temporarily disable RLS for easier development
ALTER TABLE contact_submissions DISABLE ROW LEVEL SECURITY;
ALTER TABLE time_slots DISABLE ROW LEVEL SECURITY;
ALTER TABLE bookings DISABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;

-- Alternative: Create more permissive policies for development
-- Uncomment below if you want to keep RLS enabled but with permissive policies

/*
-- Enable RLS
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE time_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Create permissive policies for contact_submissions
CREATE POLICY "Enable all for contact_submissions" ON contact_submissions
  FOR ALL USING (true) WITH CHECK (true);

-- Create permissive policies for time_slots
CREATE POLICY "Enable read for time_slots" ON time_slots
  FOR SELECT USING (true);
  
CREATE POLICY "Enable insert for time_slots" ON time_slots
  FOR INSERT WITH CHECK (true);
  
CREATE POLICY "Enable update for time_slots" ON time_slots
  FOR UPDATE USING (true);
  
CREATE POLICY "Enable delete for time_slots" ON time_slots
  FOR DELETE USING (true);

-- Create permissive policies for bookings
CREATE POLICY "Enable all for bookings" ON bookings
  FOR ALL USING (true) WITH CHECK (true);
*/