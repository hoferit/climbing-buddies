import { removeFriend } from '@/database/friends';
import { authorizeAndAuthenticate } from '@/utils/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(request: NextRequest): Promise<NextResponse<any>> {
  try {
    // Check authorization and authentication
    const session = await authorizeAndAuthenticate();

    // Retrieve the friendship ID from the request query or body
    const { friendshipId } = await request.json();

    // Remove the friend from the database
    await removeFriend(session.userId, friendshipId);

    // Return a success response
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    const errorMessage = (error as Error).message;

    return NextResponse.json({ error: errorMessage }, { status: 401 });
  }
}
