import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { origin } = new URL(request.url);

  return NextResponse.redirect(origin, {
    headers: {
      'Set-Cookie': `user-logged=; Path=/; max-age=0;`,
    },
  })
}