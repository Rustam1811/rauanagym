import { NextResponse } from 'next/server';

// Middleware - runs on every request
export function middleware() {
  // For now, just allow all requests
  // TODO: Add authentication checks when auth is ready
  
  // You can add authentication logic here later:
  // Example:
  // const path = request.nextUrl.pathname;
  // const publicPaths = ['/', '/hero/phone-login', '/hero/email-login'];
  // if (!isPublicPath && !isAuthenticated) {
  //   return NextResponse.redirect(new URL('/hero/phone-login', request.url));
  // }
  
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
