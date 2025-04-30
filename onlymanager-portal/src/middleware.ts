import { type NextRequest, NextResponse } from 'next/server'; // Import NextResponse
import { updateSession } from '@/lib/supabase/middleware';
import { createServerClient, type CookieOptions } from '@supabase/ssr'; // Import Supabase client

export async function middleware(request: NextRequest) {
  // updateSession checks and refreshes the user's session
  // It also handles redirecting unauthenticated users for specific paths
  const response = await updateSession(request); // Get response with updated cookies

  // Ensure environment variables are defined (needed for direct client creation)
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Middleware: Missing Supabase env vars");
    // Allow request to proceed but log error, or redirect to an error page
    return response;
  }

  // Create a Supabase client to check auth status using the request/response objects
  // This pattern is specific to middleware
  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          // Ensure response object is mutable if needed, or clone request cookies
          request.cookies.set({ name, value, ...options });
          // The response object from updateSession should already have cookies set
          // response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options });
          // response.cookies.set({ name, value: '', ...options });
        },
      },
    }
  );

  // Get user session
  const { data: { session } } = await supabase.auth.getSession();

  const { pathname } = request.nextUrl;

  // If user is not logged in and tries to access protected routes (e.g., /dashboard) or the root path
  if (!session && (pathname.startsWith('/dashboard') || pathname === '/')) {
    // Redirect to login page
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/login';
    return NextResponse.redirect(redirectUrl);
  }

  // If user is logged in and tries to access login or signup page, redirect to dashboard
  if (session && (pathname === '/login' || pathname === '/signup')) { // Added /signup check
     const redirectUrl = request.nextUrl.clone();
     redirectUrl.pathname = '/dashboard'; // Or the default dashboard page
     return NextResponse.redirect(redirectUrl);
  }


  // Allow the request to proceed with potentially updated cookies from updateSession
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    // Apply middleware specifically to dashboard routes as well if needed,
    // although the above pattern should cover it unless explicitly excluded.
    // '/dashboard/:path*',
  ],
};
