import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import crypto from 'crypto'

// Load environment variables
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Simple hash function for the password
function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex')
}

async function createAdminUser() {
  try {
    console.log('Creating admin user...')
    
    const email = 'support@businesspsychologieexperten.de'
    const password = 'Tolea0117!!'
    const passwordHash = hashPassword(password)
    
    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('admin_users')
      .select('email')
      .eq('email', email)
      .single()
    
    if (existingUser) {
      // Update existing user's password
      const { error: updateError } = await supabase
        .from('admin_users')
        .update({ password_hash: passwordHash })
        .eq('email', email)
      
      if (updateError) {
        console.error('Error updating admin user:', updateError)
      } else {
        console.log('✅ Admin user password updated successfully!')
        console.log('Email:', email)
        console.log('Password:', password)
      }
    } else {
      // Create new user
      const { error: insertError } = await supabase
        .from('admin_users')
        .insert({
          email: email,
          password_hash: passwordHash
        })
      
      if (insertError) {
        console.error('Error creating admin user:', insertError)
      } else {
        console.log('✅ Admin user created successfully!')
        console.log('Email:', email)
        console.log('Password:', password)
      }
    }
    
    console.log('\nYou can now login at: /admin/login')
    
  } catch (error) {
    console.error('Unexpected error:', error)
  }
}

createAdminUser()