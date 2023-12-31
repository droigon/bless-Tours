// export { default } from "next-auth/middleware";
import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    
    
    

    if (
      req.nextUrl.pathname.startsWith("/admin") &&
      req.nextauth.token?.ROLE !== "ADMIN"
    )
      return NextResponse.rewrite(
        new URL("/auth/login?message=You Are Not Authorized!", req.url)
      );
    if (
      req.nextUrl.pathname.startsWith("/vendor") &&
      req.nextauth.token?.ROLE !== "VENDOR"
    )
      if (
        req.nextUrl.pathname.startsWith("/user") &&
        req.nextauth.token?.ROLE !== "USER"
      )
        // return NextResponse.rewrite(
        //   new URL("/auth/login?message=You Are Not Authorized!", req.url)
        // );
        if (
          req.nextUrl.pathname.startsWith("/booking") &&
          req.nextauth.token?.ROLE !== "USER"
        )
          // return NextResponse.rewrite(
          //   new URL("/auth/login?message=You Are Not Authorized!", req.url)
          // );
          return NextResponse.rewrite(
            new URL("/auth/login?message=You Are Not Authorized!", req.url)
          );
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    "/admin/:path*",
    // "/user/:path*",
    "/vendor/:path*",
    "/booking/:path*",
  ],
};
