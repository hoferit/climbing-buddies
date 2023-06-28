import { getValidSessionByToken } from '@/database/sessions';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function authorizeAndAuthenticate() {
  // 1. Check if the user is authenticated
  const sessionTokenCookie = cookies().get('sessionToken');

  if (!sessionTokenCookie) {
    return NextResponse.json(
      { error: 'You need to be logged in' },
      { status: 401 },
    );
  }

  // 2. retrieve the session for the authenticated user
  const session = await getValidSessionByToken(sessionTokenCookie.value);

  if (!session) {
    return NextResponse.json(
      {
        error: 'Session not found',
      },
      { status: 404 },
    );
  }
}
