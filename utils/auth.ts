import { getValidSessionByToken } from '@/database/sessions';
import { cookies } from 'next/headers';

export async function authorizeAndAuthenticate() {
  // Check if the user is authenticated
  const sessionTokenCookie = cookies().get('sessionToken');

  if (!sessionTokenCookie) {
    throw new Error('You need to be logged in');
  }

  // Retrieve the session for the authenticated user
  const session = await getValidSessionByToken(sessionTokenCookie.value);

  if (!session) {
    throw new Error('Session not found');
  }

  return session; // Return the session object
}
