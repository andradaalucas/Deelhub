// @/supabase/middleware.ts
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: "",
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    },
  );

  const user = await supabase.auth.getUser();

  if (request.nextUrl.pathname.startsWith("/dashboard") && user.error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (request.nextUrl.pathname.startsWith("/automation") && user.error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (request.nextUrl.pathname.startsWith("/billing") && user.error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (request.nextUrl.pathname.startsWith("/customers") && user.error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (request.nextUrl.pathname.startsWith("/insights") && user.error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (request.nextUrl.pathname.startsWith("/get-started") && user.error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (request.nextUrl.pathname.startsWith("/vault") && user.error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
}
