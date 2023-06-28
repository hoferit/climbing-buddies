import { rejectFriendship } from '@/database/friends';
import { authorizeAndAuthenticate } from '@/utils/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(
  request: NextRequest,
): Promise<NextResponse<{ success: boolean } | { error: string }>> {
  const authResponse = await authorizeAndAuthenticate();

  // Check if there's an error in the authorization and authentication
  if (authResponse instanceof NextResponse) {
    return authResponse; // Return the error response
  }

  // Parse the request body to get the friendship ID
  const { friendshipId } = await request.json();

  // Reject the friendship request
  const rejectedFriendship = await rejectFriendship(friendshipId);

  if (!rejectedFriendship) {
    return NextResponse.json(
      { error: 'Failed to reject friend request' },
      { status: 500 },
    );
  }

  // Return a success response
  return NextResponse.json({ success: true }, { status: 200 });
}
