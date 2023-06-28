import { rejectFriendship } from '@/database/friends';
import { getValidSessionByToken } from '@/database/sessions';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(
  request: NextRequest,
): Promise<NextResponse<{ success: boolean } | { error: string }>> {
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

  // 3. Reject the friendship request
  const rejectedFriendship = await rejectFriendship(friendshipId);

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!rejectedFriendship) {
    return NextResponse.json(
      { error: 'Failed to reject friend request' },
      { status: 500 },
    );
  }

  // 4. Return a success response
  return NextResponse.json({ success: true }, { status: 200 });
}
