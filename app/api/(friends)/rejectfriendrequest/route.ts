import { rejectFriendRequest } from '@/database/friends';
import { authorizeAndAuthenticate } from '@/utils/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(request: NextRequest): Promise<NextResponse<any>> {
  const authResponse = await authorizeAndAuthenticate();

  // Check if there's an error in the authorization and authentication
  if (authResponse instanceof NextResponse) {
    return authResponse; // Return the error response
  }

  // Parse the request body to get the friendship ID
  const { userId, friendId } = await request.json();

  // Reject the friend request
  try {
    await rejectFriendRequest(userId, friendId);

    // Return a success response
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to reject friend request' },
      { status: 500 },
    );
  }
}
