// Auth migration to use either local or Supabase authentication
import * as localAuth from './auth'
import * as supabaseAuth from './supabase-auth'

const USE_SUPABASE = process.env.NEXT_PUBLIC_USE_SUPABASE === 'true'

export interface User {
  id: string
  email: string
  name?: string
  role?: 'admin' | 'user'
}

export async function signIn(email: string, password: string): Promise<User | null> {
  if (USE_SUPABASE) {
    return supabaseAuth.signIn(email, password)
  } else {
    return localAuth.signIn(email, password)
  }
}

export async function signOut() {
  if (USE_SUPABASE) {
    return supabaseAuth.signOut()
  } else {
    return localAuth.signOut()
  }
}

export async function getCurrentUser(): Promise<User | null> {
  if (USE_SUPABASE) {
    return supabaseAuth.getCurrentUser()
  } else {
    return localAuth.getCurrentUser()
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser()
  return user !== null
}

export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentUser()
  return user?.role === 'admin'
}