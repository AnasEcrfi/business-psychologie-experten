import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if coming soon mode is enabled
  const COMING_SOON_MODE = false // DISABLED - Site is now live!
  
  // Allow access to coming-soon page itself and legal pages
  if (
    request.nextUrl.pathname === '/coming-soon' ||
    request.nextUrl.pathname === '/datenschutz' ||
    request.nextUrl.pathname === '/agb' ||
    request.nextUrl.pathname === '/impressum'
  ) {
    return NextResponse.next()
  }
  
  // Allow access to admin routes (they have their own authentication)
  if (request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.next()
  }
  
  // Allow access to auth routes
  if (request.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.next()
  }
  
  // Allow access to static files and API routes
  if (
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.startsWith('/api') ||
    request.nextUrl.pathname.includes('.')
  ) {
    return NextResponse.next()
  }
  
  // Check for admin access (keeping for potential future use)
  const hasAccess = request.cookies.get('bpe_access')?.value === 'granted'
  
  // If coming soon mode is enabled and no access, redirect to coming soon
  if (COMING_SOON_MODE && !hasAccess) {
    return NextResponse.redirect(new URL('/coming-soon', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}