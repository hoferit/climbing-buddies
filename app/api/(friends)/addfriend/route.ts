import { addFriend } from '@/database/friends';
import { authorizeAndAuthenticate } from '@/utils/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest): Promise<NextResponse<any>> {
  try {
    // Check authorization and authentication
    const session = await authorizeAndAuthenticate();

    // Retrieve the friend ID from the request body
    const { friendId } = await request.json();

    // Add the friend to the database
    await addFriend(session.userId, friendId);

    // Return a success response
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    const errorMessage = (error as Error).message;

    return NextResponse.json({ error: errorMessage }, { status: 401 });
  }
}
