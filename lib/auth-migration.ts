// Auth migration to use either local or Supabase authentication
import * as localAuth from './auth'
import * as supabaseStore from './store-migration'

const USE_SUPABASE = process.env.NEXT_PUBLIC_USE_SUPABASE === 'true'

export interface User {
  id: string
  email: string
  name?: string
  role?: 'admin' | 'user'
}

export async function signIn(email: string, password: string): Promise<User | null> {
  if (USE_SUPABASE) {
    const user = await supabaseStore.signIn(email, password)
    if (user) {
      return {
        id: user.id,
        email: user.email,
        name: 'Admin',
        role: 'admin'
      }
    }
    return null
  } else {
    return localAuth.signIn(email, password)
  }
}

export function signOut() {
  if (USE_SUPABASE) {
    return supabaseStore.signOut()
  } else {
    return localAuth.signOut()
  }
}

export function getCurrentUser(): User | null {
  if (USE_SUPABASE) {
    const user = supabaseStore.getCurrentUser()
    if (user) {
      return {
        id: user.id,
        email: user.email,
        name: 'Admin',
        role: 'admin'
      }
    }
    return null
  } else {
    return localAuth.getCurrentUser()
  }
}

export function isAuthenticated(): boolean {
  return getCurrentUser() !== null
}

export function isAdmin(): boolean {
  const user = getCurrentUser()
  return user?.role === 'admin'
}