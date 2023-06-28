import { getFriendRequestsByUserId } from '@/database/friends';
import { authorizeAndAuthenticate } from '@/utils/auth';
import { NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse<any>> {
  try {
    // Check authorization and authentication
    const session = await authorizeAndAuthenticate();

    // Retrieve the friend requests for the user
    const friendRequests = await getFriendRequestsByUserId(session.userId);

    // Return the friend requests
    return NextResponse.json(
      { friendRequests: friendRequests || [] },
      { status: 200 },
    );
  } catch (error) {
    const errorMessage = (error as Error).message;

    return NextResponse.json({ error: errorMessage }, { status: 401 });
  }
}
