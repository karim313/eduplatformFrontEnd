import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const protectedPages = ['/dashboard', '/profile', '/payment-success', '/payment-cancel'];
const authPages = ['/signin', '/signup', '/forgot-password', '/reset-password'];

export default async function proxy(req: NextRequest) {
    const token = await getToken({ req });
    const { pathname } = req.nextUrl;

    // Check if the current path starts with any of the protected pages
    if (protectedPages.some(page => pathname.startsWith(page))) {
        if (token) {
            return NextResponse.next();
        } else {
            // Use req.url as the base URL
            const signInUrl = new URL('/signin', req.url);
            signInUrl.searchParams.set('callbackUrl', req.url); // Optional: Redirect back after login
            return NextResponse.redirect(signInUrl);
        }
    }

    // Check if the current path starts with any of the auth pages
    if (authPages.some(page => pathname.startsWith(page))) {
        if (token) {
            // User is logged in but trying to access signin/signup -> Redirect to dashboard
            return NextResponse.redirect(new URL('/', req.url));
        } else {
            // User is NOT logged in and on signin/signup -> Allow request (Don't redirect to signin!)
            return NextResponse.next();
        }
    }

    return NextResponse.next();
}