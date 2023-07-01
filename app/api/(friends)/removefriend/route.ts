import { removeFriend } from '@/database/friends'; // Make sure this path points to your removeFriend function
import { authorizeAndAuthenticate } from '@/utils/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest): Promise<NextResponse<any>> {
  try {
    // 1. Check authorization and authentication
    const session = await authorizeAndAuthenticate();

    // 2. Retrieve the user ids from the request body
    const { friendId } = await request.json();

    // 3. Remove the friend for the user
    await removeFriend(session.userId, friendId);

    // 4. Return a success response
    return NextResponse.json(
      { message: 'Friend removed successfully' },
      { status: 200 },
    );
  } catch (error) {
    const errorMessage = (error as Error).message;

    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
