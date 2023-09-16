import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(req: NextRequest) {
  // Get the pathname of the request (e.g. /, /protected)
  const path = req.nextUrl.pathname;

  // If it's the root path, just render it
  if (path === '/') {
    return NextResponse.next();
  }

  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const protectedPaths = ['/profile', '/jobs']
  const isProtected = containsOption(path, protectedPaths);

  if (!session && isProtected) {
    return NextResponse.redirect(new URL('/', req.url));
  } else if (session && (path === '/restore' || path === '/register')) {
    return NextResponse.redirect(new URL('/jobs', req.url));
  }
  return NextResponse.next();
}

function containsOption(string: string, options: string[]) {
  for (let i = 0; i < options.length; i++) {
    if (string.includes(options[i])) {
      return true;
    }
  }
  return false;
}