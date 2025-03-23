import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request) {
  const path = request.nextUrl.pathname;
  
  // Define public paths that don't require authentication
  const publicPaths = ['/', '/api/auth', '/api/search'];
  const isPublicPath = publicPaths.some(publicPath => 
    path === publicPath || path.startsWith(`${publicPath}/`)
  );

  // Check if path is for API
  const isApiPath = path.startsWith('/api');
  
  // Verify authentication for protected routes
  if (!isPublicPath) {
    const token = await getToken({ 
      req: request,
      secret: process.env.NEXTAUTH_SECRET 
    });

    // Redirect unauthenticated users to login
    if (!token) {
      return NextResponse.redirect(new URL('/api/auth/signin', request.url));
    }
    
    // Handle vendor-specific routes
    if (path.startsWith('/vendor') && token.user.role !== 'vendor') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }
  
  return NextResponse.next();
}

// Configure which paths this middleware will run on
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public/images).*)',
  ],
};
