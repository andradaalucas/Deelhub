import { type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  const updatedSession = await updateSession(request)
  console.log("user desde middleware", updatedSession);
  return updatedSession
}

export const config = {
  matcher: '/',
}