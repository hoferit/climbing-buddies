import { NextRequest, NextResponse } from 'next/server';
import { acceptFriendRequest } from '../../../../database/friends';
import { authorizeAndAuthenticate } from '../../../../utils/auth';

export async function PUT(request: NextRequest): Promise<NextResponse<any>> {
  const authResponse = await authorizeAndAuthenticate();

  // Check if there's an error in the authorization and authentication
  if (authResponse instanceof NextResponse) {
    console.log(authResponse);
    return authResponse; // Return the error response
  }

  // Parse the request body to get the friendship ID
  const { userId, friendId } = await request.json();

  if (!userId || !friendId) {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }

  // Accept the friend request
  try {
    await acceptFriendRequest(userId, friendId);

    // Return the success response
    return NextResponse.json(
      { message: 'Friend request accepted successfully' },
      { status: 200 },
    );
  } catch (error) {
    // Handle the error
    console.error('Error accepting friend request:', error);
    return NextResponse.json(
      { error: 'Failed to accept friend request' },
      { status: 500 },
    );
  }
}
