import { createFriendship } from '@/database/friends';
import { getValidSessionByToken } from '@/database/sessions';
import { getUserByUsername } from '@/database/users';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest): Promise<NextResponse<any>> {
  // 1. Check if the user is authenticated
  const sessionTokenCookie = cookies().get('sessionToken');

  if (!sessionTokenCookie) {
    return NextResponse.json(
      { error: 'You need to be logged in to send a friend request' },
      { status: 401 },
    );
  }

  const session = await getValidSessionByToken(sessionTokenCookie.value);

  if (!session) {
    return NextResponse.json({ error: 'Session not found' }, { status: 404 });
  }

  // 2. Validate and parse the request body
  const { username } = await request.json();
  if (!username) {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }

  // 3. Fetch the user by username
  const user = await getUserByUsername(username);

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  // 4. Create the friend request
  const friendship = await createFriendship(session.userId, user.id);

  if (!friendship) {
    return NextResponse.json(
      { error: 'Failed to send friend request' },
      { status: 500 },
    );
  }

  // 5. Return the success response
  return NextResponse.json(
    { message: 'Friend request sent successfully' },
    { status: 200 },
  );
}
