import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin')) {
    // For now, allow all admin access (will check phone in AuthContext)
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
