// Supabase Auth Implementation
import { supabase } from './supabase'

export interface User {
  id: string
  email: string
  role?: 'admin' | 'user'
}

// Sign up new admin user (only for initial setup)
export async function signUpAdmin(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        role: 'admin'
      }
    }
  })
  
  if (error) {
    console.error('Sign up error:', error)
    return null
  }
  
  return data.user
}

// Sign in with Supabase Auth
export async function signIn(email: string, password: string): Promise<User | null> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  
  if (error) {
    console.error('Sign in error:', error)
    return null
  }
  
  if (data.user) {
    return {
      id: data.user.id,
      email: data.user.email!,
      role: data.user.user_metadata?.role || 'user'
    }
  }
  
  return null
}

// Sign out
export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error('Sign out error:', error)
  }
}

// Get current user
export async function getCurrentUser(): Promise<User | null> {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (user) {
    return {
      id: user.id,
      email: user.email!,
      role: user.user_metadata?.role || 'user'
    }
  }
  
  return null
}

// Check if authenticated
export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser()
  return user !== null
}

// Check if admin
export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentUser()
  return user?.role === 'admin'
}

// Session management
export async function getSession() {
  const { data: { session } } = await supabase.auth.getSession()
  return session
}

// Listen to auth state changes
export function onAuthStateChange(callback: (user: User | null) => void) {
  return supabase.auth.onAuthStateChange((event, session) => {
    if (session?.user) {
      callback({
        id: session.user.id,
        email: session.user.email!,
        role: session.user.user_metadata?.role || 'user'
      })
    } else {
      callback(null)
    }
  })
}

// Reset password
export async function resetPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/admin/reset-password`,
  })
  
  if (error) {
    console.error('Password reset error:', error)
    return false
  }
  
  return true
}

// Update password
export async function updatePassword(newPassword: string) {
  const { error } = await supabase.auth.updateUser({
    password: newPassword
  })
  
  if (error) {
    console.error('Password update error:', error)
    return false
  }
  
  return true
}