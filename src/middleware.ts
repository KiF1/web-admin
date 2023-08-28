import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest){
  const { origin } = new URL(request.url);
  const tokenRole = request.cookies.get('token_role')?.value
  const value = tokenRole?.split('|');
  const token = value !== undefined ? value[0] : ''

  if(!token){
    return NextResponse.redirect(origin, {
      headers: {
        'Set-Cookie': `redirectTo=${request.url}; Path=/; HttOnly; max-age=20;`,
      }
    })
  }
  return NextResponse.next()
}

export const config = {
  matcher: '/dashboard/:path*'
}