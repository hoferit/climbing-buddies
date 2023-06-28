import { getFriendList } from '@/database/friends';
import { getValidSessionByToken } from '@/database/sessions';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse<any>> {
  // Check if the user is authenticated
  const sessionTokenCookie = cookies().get('sessionToken');

  if (!sessionTokenCookie) {
    return NextResponse.json(
      { error: 'You need to be logged in to send a friend request' },
      { status: 401 },
    );
  }

  // Retrieve the session for the authenticated user
  const session = await getValidSessionByToken(sessionTokenCookie.value);

  if (!session) {
    return NextResponse.json({ error: 'Session not found' }, { status: 404 });
  }
  // Retrieve the friend list for the user
  const friendList = await getFriendList(session.userId);

  // Return the friend list
  return NextResponse.json({ friendList }, { status: 200 });
}
