import { cookies } from 'next/headers';
import { getValidSessionByToken } from '../database/sessions';
import { AuthRequiredError } from '../lib/exceptions';

export async function authorizeAndAuthenticate() {
  // Check if user is authenticated
  const sessionTokenCookie = cookies().get('sessionToken');

  if (!sessionTokenCookie) {
    throw new AuthRequiredError('You need to be logged in');
  }

  // Retrieve the session for the authenticated user
  const session = await getValidSessionByToken(sessionTokenCookie.value);
  if (!session) {
    throw new AuthRequiredError('Session not found');
  }

  return session; // Return the session object
}

export async function fetchWithAuthCheck(url: string, options: RequestInit) {
  const response = await fetch(url, options);

  if (response.status === 401) {
    // user is not authenticated, show alert

    throw new Error('Unauthorized'); // So caller knows to not process the response
  }

  return response;
}
