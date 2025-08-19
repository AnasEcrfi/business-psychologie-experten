-- Supabase Auth Setup for Business Psychologie Experten

-- Enable Auth for the project (this is usually done in Supabase Dashboard)
-- But we need to set up the right policies and triggers

-- Create a profiles table that syncs with auth.users
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE,
  role TEXT DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'role', 'user')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update the RLS policies for our tables to use Supabase Auth

-- Contact Submissions: Anyone can create, only authenticated can read
DROP POLICY IF EXISTS "Enable all for contact_submissions" ON contact_submissions;

CREATE POLICY "Anyone can create contact submissions" ON contact_submissions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated users can view contact submissions" ON contact_submissions
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update contact submissions" ON contact_submissions
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Time Slots: Public can view available, authenticated can manage
DROP POLICY IF EXISTS "Enable read for time_slots" ON time_slots;
DROP POLICY IF EXISTS "Enable insert for time_slots" ON time_slots;
DROP POLICY IF EXISTS "Enable update for time_slots" ON time_slots;
DROP POLICY IF EXISTS "Enable delete for time_slots" ON time_slots;

CREATE POLICY "Anyone can view available time slots" ON time_slots
  FOR SELECT USING (available = true OR auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage time slots" ON time_slots
  FOR ALL USING (auth.role() = 'authenticated');

-- Bookings: Anyone can create, only authenticated can view/manage
DROP POLICY IF EXISTS "Enable all for bookings" ON bookings;

CREATE POLICY "Anyone can create bookings" ON bookings
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated users can view bookings" ON bookings
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update bookings" ON bookings
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Enable RLS on all tables
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE time_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Create the first admin user (run this in SQL Editor after setup)
-- Note: Replace with your actual email and password
/*
-- To create an admin user, run this in your Supabase SQL Editor:
-- (First create the user through Supabase Auth Dashboard or using the signup function)

UPDATE auth.users 
SET raw_user_meta_data = jsonb_set(
  COALESCE(raw_user_meta_data, '{}'::jsonb),
  '{role}',
  '"admin"'
)
WHERE email = 'admin@businesspsychologie.de';

-- Also update the profile
UPDATE public.profiles
SET role = 'admin'
WHERE email = 'admin@businesspsychologie.de';
*/