import { createFriendship } from '@/database/friends';
import { getValidSessionByToken } from '@/database/sessions';
import { getUserByUsername } from '@/database/users';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest): Promise<NextResponse<any>> {
  // 1. check if the user is authenticated
  const sessionTokenCookie = cookies().get('sessionToken');

  if (!sessionTokenCookie) {
    return NextResponse.json(
      { error: 'You need to be logged in to send a friend request' },
      { status: 401 },
    );
  }

  // 2. retrieve the session for the authenticated user
  const session = await getValidSessionByToken(sessionTokenCookie.value);

  if (!session) {
    return NextResponse.json({ error: 'Session not found' }, { status: 404 });
  }

  // 3. Validate and parse the request body
  const { username } = await request.json();

  if (!username) {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }

  // 4. Fetch the user by username
  const user = await getUserByUsername(username.toLowerCase());

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  // 5. create a friendship between the authenticated user and the requested user.

  await createFriendship(session.userId, user.id);

  // 6. Return the success response
  return NextResponse.json(
    { message: 'Friend request sent successfully' },
    { status: 200 },
  );
}
