import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest){
  const redirectTo = request.cookies.get('redirectTo')?.value
  const redirectURL = redirectTo ?? new URL('/', request.url)
  const cookieExpiresInSeconds = 60 * 60 * 24 * 5;

  return NextResponse.redirect(redirectURL, {
    headers: {
      'Set-Cookie': `user-logged=true; Path=/; max-age=${cookieExpiresInSeconds};`,
    },
  })
}