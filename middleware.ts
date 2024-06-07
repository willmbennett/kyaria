import { NextResponse } from 'next/server';
import authConfig from "./auth.config"
import NextAuth from "next-auth"

// Define the list of public routes
const publicRoutes = [
    "/",
    "/about",
    "/pricing",
    "/contact",
    "/return",
    /^\/auth/,
    /^\/blog/,
    /^\/policies/
];

const { auth } = NextAuth(authConfig)
export default auth(async function middleware(req) {
    const { pathname } = req.nextUrl;
    console.log(req.auth)
    // Check if the current path is in the list of public routes
    const isPublicRoute = publicRoutes.some(route =>
        typeof route === "string" ? pathname === route : route.test(pathname)
    );

    if (!req.auth && !isPublicRoute) {
        const newUrl = new URL("/auth/signin", req.nextUrl.origin);
        return NextResponse.redirect(newUrl);
    }

    return NextResponse.next();
})

export const config = {
    matcher: [
        // Match all routes except for API routes and Next.js static files
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};
