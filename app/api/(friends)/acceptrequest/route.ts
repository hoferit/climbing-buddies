import { acceptFriendship } from '@/database/friends';
import { getValidSessionByToken } from '@/database/sessions';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(request: NextRequest): Promise<NextResponse<any>> {
  // 1. Check if the user is authenticated
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

  // 3. Parse the request body to get the friendship ID
  const { friendshipId } = await request.json();

  if (!friendshipId) {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }

  // 4. Accept the friend request
  const updatedFriendship = await acceptFriendship(friendshipId);

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!updatedFriendship) {
    return NextResponse.json(
      { error: 'Failed to accept friend request' },
      { status: 500 },
    );
  }

  // 5. Return the success response
  return NextResponse.json(
    { message: 'Friend request accepted successfully' },
    { status: 200 },
  );
}
