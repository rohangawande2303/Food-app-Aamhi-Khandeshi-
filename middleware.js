import { withClerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default withClerkMiddleware((req) => {
  // Define protected routes
  const protectedRoutes = ["/checkout", "/profile"];

  // Check if the request path matches a protected route
  if (protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    const { user } = req.auth;
    if (!user) {
      // Redirect to the dynamic sign-in page if the user is not authenticated
      const signInUrl = new URL("/sign-in", req.url);
      return NextResponse.redirect(signInUrl);
    }
  }

  return NextResponse.next();
});

// Apply the middleware to the specified routes
export const config = {
  matcher: ["/checkout", "/profile", "/sign-in/(.*)"], // Routes to apply the middleware
};
