import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database tables
export interface ContactSubmission {
  id: string
  name: string
  email: string
  message: string
  status: 'new' | 'read' | 'replied'
  created_at: string
}

export interface TimeSlot {
  id: string
  date: string
  time: string
  available: boolean
  created_at: string
}

export interface Booking {
  id: string
  date: string
  time: string
  name: string
  email: string
  phone?: string
  message?: string
  status: 'pending' | 'confirmed' | 'cancelled'
  created_at: string
}

export interface AdminUser {
  id: string
  email: string
  created_at: string
}