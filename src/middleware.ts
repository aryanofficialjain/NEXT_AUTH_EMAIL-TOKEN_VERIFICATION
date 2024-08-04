import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value || "";
  const { pathname } = request.nextUrl;

  // List of public routes
  const publicRoutes = ['/login', '/signup', 'verifyemail'];
  // List of protected routes
  const protectedRoutes = ['/profile'];

  // Redirect logged in users away from public routes
  if (publicRoutes.includes(pathname) && token) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  // Redirect not logged in users away from protected routes
  if (protectedRoutes.includes(pathname) && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Allow the request to proceed if it doesn't match any conditions
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login', '/profile', '/signup', '/verifyemail'], // Adjust the paths as needed
};