import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseReqResClient } from "./utils/supabase/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createSupabaseReqResClient(request, response);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Define public routes that don't require authentication
  const publicRoutes = ['/login', '/signup', '/reset-password'];

  // Check if the current path is a public route
  const isPublicRoute = publicRoutes.some(route => 
    request.nextUrl.pathname === route || 
    request.nextUrl.pathname.startsWith(`${route}/`)
  );

  // Protect root route and other routes except public routes
  if (!user && request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Protect account and other private routes
  if (!user && request.nextUrl.pathname.startsWith("/customers")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (!user && request.nextUrl.pathname.startsWith("/insights")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (!user && request.nextUrl.pathname.startsWith("/automation")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (!user && request.nextUrl.pathname.startsWith("/billing")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // You can add more route protections here as needed
  // For example:
  // if (!user && request.nextUrl.pathname.startsWith("/dashboard")) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public routes
     */
    '/((?!_next/static|_next/image|favicon.ico|login|signup|reset-password).*)'
  ],
};