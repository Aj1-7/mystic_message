import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export { default } from 'next-auth/middleware';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  // If user is authenticated and trying to access public routes, redirect them
  if (
    token &&
    (
      url.pathname === '/' ||
      url.pathname === '/sign-in' ||
      url.pathname === '/sign-up' ||
      url.pathname === '/verify'
    )
  ) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // If user is not authenticated and trying to access protected routes
  if (
    !token &&
    (
      url.pathname.startsWith('/dashboard') ||
      url.pathname.startsWith('/home') // Assuming /home is a protected page
    )
  ) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  // Otherwise, allow the request to continue
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/sign-in',
    '/sign-up',
    '/verify/:path*',
    '/dashboard/:path*',
    '/home/:path*',
  ],
};
