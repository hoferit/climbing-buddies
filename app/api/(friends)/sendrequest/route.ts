import { createFriendship } from '@/database/friends';
import { getUserByUsername } from '@/database/users';
import { authorizeAndAuthenticate } from '@/utils/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest): Promise<NextResponse<any>> {
  try {
    // Check authorization and authentication
    const session = await authorizeAndAuthenticate();

    // Validate and parse the request body
    const { username } = await request.json();

    if (!username) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    // Fetch the user by username
    const user = await getUserByUsername(username.toLowerCase());

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // create a friendship between the authenticated user and the requested user.

    await createFriendship(session.userId, user.id);

    // Return the success response
    return NextResponse.json(
      { message: 'Friend request sent successfully' },
      { status: 200 },
    );
  } catch (error) {
    const errorMessage = (error as Error).message;

    return NextResponse.json({ error: errorMessage }, { status: 401 });
  }
}
