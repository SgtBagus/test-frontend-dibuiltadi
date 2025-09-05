import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value || null
  const { pathname, host } = req.nextUrl

  const isAuthRoute = pathname.startsWith('/auth')

  // force http kalau dev, biar nggak jadi https
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https'
  const baseUrl = `${protocol}://${host}`

  if (!token && !isAuthRoute) {
    return NextResponse.redirect(`${baseUrl}/auth/login`)
  }

  if (token && isAuthRoute) {
    return NextResponse.redirect(`${baseUrl}/`)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next|static|favicon.ico).*)']
}
