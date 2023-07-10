import { NextRequest, NextResponse } from 'next/server';
import { checkFriendship } from '../../../../database/friends';
import { authorizeAndAuthenticate } from '../../../../utils/auth';

export async function POST(request: NextRequest): Promise<NextResponse<any>> {
  try {
    // Check authorization and authentication
    await authorizeAndAuthenticate();

    // Parse the request body
    const { userId, friendId } = await request.json();

    // Check the friendship
    const isFriend = await checkFriendship(userId, friendId);

    // Return the result
    return NextResponse.json({ isFriend }, { status: 200 });
  } catch (error) {
    const errorMessage = (error as Error).message;

    return NextResponse.json({ error: errorMessage }, { status: 401 });
  }
}
