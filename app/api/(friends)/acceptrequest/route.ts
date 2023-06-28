import { acceptFriendship } from '@/database/friends';
import { authorizeAndAuthenticate } from '@/utils/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(request: NextRequest): Promise<NextResponse<any>> {
  const authResponse = await authorizeAndAuthenticate();

  // Check if there's an error in the authorization and authentication
  if (authResponse instanceof NextResponse) {
    return authResponse; // Return the error response
  }
  // Parse the request body to get the friendship ID
  const { friendshipId } = await request.json();

  if (!friendshipId) {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }

  // Accept the friend request
  const updatedFriendship = await acceptFriendship(friendshipId);

  if (!updatedFriendship) {
    return NextResponse.json(
      { error: 'Failed to accept friend request' },
      { status: 500 },
    );
  }

  // Return the success response
  return NextResponse.json(
    { message: 'Friend request accepted successfully' },
    { status: 200 },
  );
}
