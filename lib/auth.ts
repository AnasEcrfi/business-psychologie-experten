// Mock authentication for development
// TODO: Replace with real authentication system

export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'user'
}

// Mock user for testing
const MOCK_ADMIN: User = {
  id: '1',
  email: 'admin@businesspsychologie.de',
  name: 'Admin',
  role: 'admin'
}

// Mock credentials
const MOCK_CREDENTIALS = {
  email: 'admin@businesspsychologie.de',
  password: 'admin123'
}

export async function signIn(email: string, password: string): Promise<User | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  if (email === MOCK_CREDENTIALS.email && password === MOCK_CREDENTIALS.password) {
    // Store in sessionStorage for now
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('user', JSON.stringify(MOCK_ADMIN))
    }
    return MOCK_ADMIN
  }
  
  return null
}

export function signOut() {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('user')
  }
}

export function getCurrentUser(): User | null {
  if (typeof window !== 'undefined') {
    const userStr = sessionStorage.getItem('user')
    if (userStr) {
      return JSON.parse(userStr)
    }
  }
  return null
}

export function isAuthenticated(): boolean {
  return getCurrentUser() !== null
}

export function isAdmin(): boolean {
  const user = getCurrentUser()
  return user?.role === 'admin'
}